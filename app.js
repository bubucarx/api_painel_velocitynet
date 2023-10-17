require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const User = require("./src/models/User");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const novoNomeArquivo = file.originalname;

    cb(null, `${novoNomeArquivo}`);
  },
});

const upload = multer({ storage });

app.post("/slider", checkToken, upload.single("foto"), async (req, res) => {
  const file = req.file;

  if (!file) {
    res.status(422).json({ msg: "Imagem inválida" });
  }

  try {
    res.status(200).json({ msg: "Imagem salva" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

app.get("/listar-imagens", (req, res) => {
  const pastaUploads = path.join(__dirname, "uploads");
  const imagens = [];
  const host = "http://localhost:3000/uploads";

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
});

app.get("/uploads/:nomeDoArquivo", (req, res) => {
  const pastaUploads = path.join(__dirname, "uploads");
  const nomeDoArquivo = req.params.nomeDoArquivo;

  const caminhoDoArquivo = path.join(pastaUploads, nomeDoArquivo);

  fs.access(caminhoDoArquivo, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("Imagem não encontrada");
    }

    res.sendFile(caminhoDoArquivo);
  });
});

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "acesso negado" });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token inválido" });
  }
}

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a nossa api!" });
});

app.post("/login", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "acesso negado" });
  }

  try {
    const secret = process.env.SECRET;
    decode = jwt.verify(token, secret);
    res.status(200).json(decode);
  } catch (error) {
    res.status(400).json({ msg: "Token inválido" });
  }
});

app.post("/auth/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ msg: "O email e obrigatorio" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha e obrigatorio" });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    email,
    password: passwordHash,
  });

  try {
    await user.save();

    res.status(201).json({ msg: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      secret
    );
    res.status(200).json({ msg: "Autenticação realizada com sucesso", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => {
    app.listen(3000);
    console.log("Conectado ao banco");
  })
  .catch((err) => console.log(err));
