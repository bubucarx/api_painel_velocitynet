const fs = require("fs");
const path = require("path");

const pastaUploads = path.join(__dirname, "..", "..", "uploads");
const imagens = [];
const host = "http://localhost:3000/uploads";

exports.listarSlider = async (req, res) => {
  fs.readdir(pastaUploads, (err, files) => {
    if (err) {
      return res.status(500).send("Erro ao listar imagens");
    }

    files.forEach((file) => {
      if (
        file.endsWith(".jpg") ||
        file.endsWith(".png") ||
        file.endsWith(".jpeg")
      ) {
        imagens.push(`${host}/${file}`);
      }
    });

    res.status(200).json(imagens);
  });
};

exports.slider = async (req, res) => {
  const file = req.file;

  if (!file) {
    res.status(422).json({ msg: "Imagem inválida" });
  }

  try {
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
