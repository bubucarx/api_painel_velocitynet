const express = require('express');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuração melhorada do Multer
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1 // Apenas 1 arquivo por vez
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Tipo de arquivo não permitido'));
    }
    cb(null, true);
  }
});

// Configuração mais robusta do transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true para 465, false para outras portas
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD
  },
  connectionTimeout: 30000, // 30 segundos
  socketTimeout: 30000,
  tls: {
    rejectUnauthorized: false // Para evitar problemas com certificados
  }
});

// Middleware para verificar se é mobile
const isMobileMiddleware = (req, res, next) => {
  const isMobile = /Mobile|Android|iP(hone|od)|IEMobile/.test(req.headers['user-agent']);
  req.isMobile = isMobile;
  next();
};

router.post('/send-email', isMobileMiddleware, upload.single('anexo'), async (req, res) => {
  try {
    // Verificação dos campos obrigatórios
    const { to, subject, text } = req.body;
    if (!to || !subject || !text) {
      return res.status(400).json({ error: 'Faltam campos obrigatórios (to, subject, text)' });
    }

    // Validação do email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      return res.status(400).json({ error: 'Email do destinatário inválido' });
    }

    // Configurações específicas para mobile
    if (req.isMobile) {
      console.log('Dispositivo móvel detectado - aplicando configurações especiais');
      transporter.options.connectionTimeout = 45000; // Aumenta timeout para mobile
      transporter.options.socketTimeout = 45000;
    }

    // Preparação do email
    const mailOptions = {
      from: `"Seu Serviço" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      text,
      attachments: []
    };

    // Adiciona anexo se existir
    if (req.file) {
      mailOptions.attachments.push({
        filename: req.file.originalname || 'anexo',
        path: req.file.path,
        contentType: req.file.mimetype
      });
    }

    // Envio do email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.messageId);

    // Remove o arquivo temporário após o envio
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Erro ao remover arquivo temporário:', err);
      });
    }

    res.status(200).json({ 
      success: true,
      message: 'Email enviado com sucesso!',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Erro detalhado:', {
      timestamp: new Date().toISOString(),
      isMobile: req.isMobile,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: error.code,
        response: error.response
      },
      request: {
        headers: req.headers,
        body: req.body,
        file: req.file ? {
          originalname: req.file.originalname,
          size: req.file.size,
          mimetype: req.file.mimetype
        } : null
      }
    });

    // Remove o arquivo temporário em caso de erro
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Erro ao remover arquivo temporário:', err);
      });
    }

    // Resposta de erro detalhada
    const errorResponse = {
      error: 'Erro ao enviar email',
      details: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        code: error.code,
        type: error.name
      } : undefined
    };

    // Códigos de status específicos para diferentes erros
    if (error.code === 'EAUTH') {
      res.status(401).json({ ...errorResponse, error: 'Falha na autenticação do email' });
    } else if (error.code === 'EENVELOPE') {
      res.status(400).json({ ...errorResponse, error: 'Dados do email inválidos' });
    } else if (error instanceof multer.MulterError) {
      res.status(413).json({ ...errorResponse, error: 'Erro no upload do arquivo' });
    } else {
      res.status(500).json(errorResponse);
    }
  }
});

module.exports = router;