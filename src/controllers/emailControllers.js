const { error } = require('console');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const multer =  require('multer');
const path = require('path');
require('dotenv').config()


const upload = multer({dest: 'uploads/'});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD
    }
});


router.post('/send-email', upload.single('anexo'), async (req, res)=>{
 try {
    const{to, subject, text} = req.body;
    
    if (!to || !subject || !text){
        return res.status(400).json({error: 'Faltam campos obrigatorios: to, subject e text'});
    }
    
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: to,
        subject: subject,
        text: text,
        attachments: req.file ? [{
            filename: req.file.originalname,
            path: req.file.path
        }] : []
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({message: 'Email enviado com sucesso!'});

 } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({error: 'Errp ao enviar email'});
 }
});

module.exports = router;
