const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/send-email', upload.single('anexo'), emailController.sendEmail);

module.exports = router;
