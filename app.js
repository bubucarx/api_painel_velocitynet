require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const multer = require("multer");

const storage = require("./src/middleware/storage");

const upload = multer({ storage });

const checkToken = require("./src/middleware/checktoken");
const sliderController = require("./src/controllers/sliderController");
const loginController = require("./src/controllers/loginController");
const cardController = require("./src/controllers/cardController");
const offerController = require("./src/controllers/offerController");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a nossa api!" });
});

app.get("/listar-slider", sliderController.listarSlider);

app.get("/uploads/:nomeDoArquivo", sliderController.verArquivo);

app.post("/slider", checkToken, upload.single("foto"), sliderController.slider);

app.post("/login", loginController.login);

app.post("/auth/login", loginController.authLogin);

app.post("/auth/register", loginController.authRegister);

app.post("/card-title", cardController.cardTitleSectionCreate);

app.get("/card-title", cardController.cardTitleSectionFind);

app.patch("/card-title", cardController.cardTitleSectionUpdate);

app.post("/card", cardController.card);

app.get("/card", cardController.cardFind);

app.patch("/card", cardController.cardUpdate);

app.delete("/card", cardController.cardDelete);

app.post("/offer-image", upload.single("foto"), offerController.offer);

mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => {
    app.listen(3000);
    console.log("Conectado ao banco");
  })
  .catch((err) => console.log("Erro para se conectar no banco"));
