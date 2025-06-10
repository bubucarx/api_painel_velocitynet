const express = require('express');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');
require('dotenv').config();

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD
  },
  connectionTimeout: 30000,
  socketTimeout: 30000
});

router.post('/send-email', upload.single('anexo'), async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    if (!to || !subject || !text) {
      return res.status(400).json({ error: 'Faltam campos obrigatórios' });
    }

    const mailOptions = {
      from: `"Seu Serviço" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      text,
      attachments: req.file ? [{
        filename: req.file.originalname || 'anexo',
        path: req.file.path
      }] : []
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Email enviado com sucesso!' });

  } catch (error) {
    console.error('Erro detalhado:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      response: error.response
    });
    
    // Resposta de erro
    res.status(500).json({ 
      error: 'Erro ao enviar email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;