const fs = require("fs");
const path = require("path");
const Plans = require("../models/Plans");

exports.plansGet = async (req, res) => {
  const plans = await Plans.find({}, { _id: 0, name: 1 });
  try {
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.plansPost = async (req, res) => {
  const file = req.file;
  const name = req.file.originalname;

  const plans = new Plans({
    name: name,
  });

  if (!file) {
    res.status(422).json({ msg: "Imagem inválida" });
  }

  try {
    await plans.save();
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
