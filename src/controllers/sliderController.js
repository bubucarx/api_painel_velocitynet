const fs = require("fs");
const path = require("path");
const Slider = require("../models/Slider");

const pastaUploads = path.join(__dirname, "..", "..", "uploads");
const imagens = [];
const host = "http://localhost:3000/api/v1/uploads";

exports.sliderGet = async (req, res) => {
  const slider = await Slider.find({}, { _id: 0, name: 1 });
  try {
    res.status(200).json(slider);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.sliderPost = async (req, res) => {
  const file = req.file;
  const name = req.file.originalname;

  const slider = new Slider({
    name: name,
  });

  if (!file) {
    res.status(422).json({ msg: "Imagem inválida" });
  }

  try {
    await slider.save();
    res.status(200).json({ msg: "Imagem salva" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.verArquivo = async (req, res) => {
  const pastaUploads = path.join(__dirname, "..", "..", "uploads");
  const nomeDoArquivo = req.params.nomeDoArquivo;

  const caminhoDoArquivo = path.join(pastaUploads, nomeDoArquivo);

  fs.access(caminhoDoArquivo, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("Imagem não encontrada");
    }

    res.sendFile(caminhoDoArquivo);
  });
};
