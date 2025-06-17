const combosImages = require("../models/combos")
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage })

exports.combosImagesGet = async (req, res) => {
    try {
        const images = await combosImages.find();
        res.send(images)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

exports.combosImagesPost = [
    upload.single('image'),
    async (req, res) => {
        try {
            const novaImagens = new combosImages({
                image: req.file.path,
            });
            await novaImagens.save();
            res.send(novaImagens);
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
];

exports.combosImagesDelete = async (req, res) => {
    try {
        const id = req.params.id;

        const imagem = await combosImages.findById(id);
        if(!imagem){
            return res.status(404).send({ error: "Imagem não encontrada"});
        }

        const filePath = path.join(__dirname, '..', imagem.image);
        fs.unlink(filePath, (err) => {
            if(err){
                console.error("Error ao deletar arquivo", err);
            }
        });

        await combosImages.findByIdAndDelete(id);
        res.send({message: "Imagem deletada com Sucesso"});
    } catch (error) {
        res.status(500).send({ error: error.message})
    }
}