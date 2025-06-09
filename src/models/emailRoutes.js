const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const emailController = require('../controllers/emailController');

router.post('/send-email', upload.single('anexo'), emailController.sendEmail);

module.exports = router;
