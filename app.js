require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const multer = require("multer");

const storage = require("./src/middleware/storage");

const upload = multer({ storage });

const cors = require("cors");

const checkToken = require("./src/middleware/checktoken");
const sliderController = require("./src/controllers/sliderController");
const loginController = require("./src/controllers/loginController");
const cardController = require("./src/controllers/cardController");
const offerController = require("./src/controllers/offerController");
const tvController = require("./src/controllers/tvController");
const plansController = require("./src/controllers/plansController");

app.use(express.json());
app.use(cors());

app.get("/api/v1/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a nossa api!" });
});

app.get("/api/v1/slider", sliderController.sliderGet);
app.get("/api/v1/uploads/:nomeDoArquivo", sliderController.verArquivo);
app.post(
  "/api/v1/slider",
  checkToken,
  upload.single("foto"),
  sliderController.sliderPost
);

app.get("/api/v1/plans", plansController.plansGet);
app.post("/api/v1/plans", upload.single("foto"), plansController.plansPost);

app.post("/api/v1/login", loginController.login);
app.post("/api/v1/auth/login", loginController.authLogin);
app.post("/api/v1/auth/register", loginController.authRegister);

app.get("/api/v1/card-title", cardController.cardTitleSectionGet);
app.post("/api/v1/card-title", cardController.cardTitleSectionPost);
app.patch("/api/v1/card-title", cardController.cardTitleSectionPatch);

app.get("/api/v1/card", cardController.cardGet);
app.post("/api/v1/card", cardController.cardPost);
app.patch("/api/v1/card", cardController.cardPatch);
app.delete("/api/v1/card", cardController.cardDelete);

app.get("/api/v1/offer", offerController.offerGet);
app.post("/api/v1/offer", upload.single("foto"), offerController.offerPost);
app.patch("/api/v1/offer", upload.single("foto"), offerController.offerPatch);
app.delete("/api/v1/offer", offerController.offerDelete);

app.get("/api/v1/tv", tvController.tvGet);
app.post("/api/v1/tv", upload.single("foto"), tvController.tvPost);
app.patch("/api/v1/tv", upload.single("foto"), tvController.tvPatch);
app.delete("/api/v1/tv", tvController.tvDelete);

mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => {
    app.listen(3000);
    console.log("Conectado ao banco");
  })
  .catch((err) => console.log("Erro para se conectar no banco"));
