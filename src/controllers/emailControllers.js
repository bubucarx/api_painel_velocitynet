const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;
  const attachment = req.file ? req.file : null;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Faltam campos obrigatórios' });
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    attachments: attachment
      ? [{
          filename: attachment.originalname,
          path: attachment.path
        }]
      : []
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ msg: 'Erro ao enviar email' });
  }
};
