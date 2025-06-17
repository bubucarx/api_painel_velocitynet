const mongoose = require('mongoose');

const Imagens = mongoose.model('Imagens', {
    image: String,
})

module.exports = Imagens;