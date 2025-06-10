const express = require('express');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');
require('dotenv').config();
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Rota POST para envio de e-mail
router.post('/send-email', upload.single('anexo'), async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    // Verifica campos obrigatórios
    if (!to || !subject || !text) {
      return res.status(400).json({ error: 'Faltam campos obrigatórios: to, subject ou text' });
    }

    // Verifica se o arquivo foi recebido
    if (req.file) {
      console.log('Arquivo recebido:', req.file.originalname);
    } else {
      console.log('Nenhum arquivo foi anexado.');
    }

    // Configura opções do e-mail
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      attachments: req.file ? [{
        filename: req.file.originalname,
        path: req.file.path
      }] : []
    };

    // Envia o e-mail
    await transporter.sendMail(mailOptions);

    // Remove o arquivo temporário após envio (boas práticas)
    if (req.file) {
      fs.unlink(req.file.path, err => {
        if (err) console.warn('Erro ao remover arquivo temporário:', err);
      });
    }

    res.status(200).json({ message: 'Email enviado com sucesso!' });

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ error: 'Erro ao enviar email', detalhes: error.message });
  }
});

module.exports = router;
