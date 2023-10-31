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
const descriptionController = require("./src/controllers/descriptionController");
const offerController = require("./src/controllers/offerController");
const tvController = require("./src/controllers/tvController");
const plansController = require("./src/controllers/plansController");

app.use(express.json());
app.use(cors());

app.get("/api/v1/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a nossa api!" });
});

app.get("/api/v1/slider", sliderController.sliderGet);
app.post(
  "/api/v1/slider",
  checkToken,
  upload.single("image"),
  sliderController.sliderPost
);
app.delete("/api/v1/slider", checkToken, sliderController.sliderDelete);
app.patch(
  "/api/v1/slider",
  checkToken,
  upload.single("image"),
  sliderController.sliderPatch
);
app.get("/api/v1/uploads/:nomeDoArquivo", sliderController.verArquivo);

app.get("/api/v1/plans", plansController.plansGet);
app.post(
  "/api/v1/plans",
  checkToken,
  upload.single("image"),
  plansController.plansPost
);
app.delete("/api/v1/plans", checkToken, plansController.plansDelete);

app.post("/api/v1/login", loginController.login);
app.post("/api/v1/auth/login", loginController.authLogin);
// app.post("/api/v1/auth/register", loginController.authRegister);

app.get("/api/v1/card-title", descriptionController.cardTitleSectionGet);
app.post(
  "/api/v1/card-title",
  checkToken,
  descriptionController.cardTitleSectionPost
);
app.patch(
  "/api/v1/card-title",
  checkToken,
  descriptionController.cardTitleSectionPatch
);

app.get("/api/v1/card", descriptionController.cardGet);
app.post("/api/v1/card", checkToken, descriptionController.cardPost);
app.patch("/api/v1/card", checkToken, descriptionController.cardPatch);
app.delete("/api/v1/card", checkToken, descriptionController.cardDelete);

app.get("/api/v1/offer", offerController.offerGet);
app.post(
  "/api/v1/offer",
  checkToken,
  upload.single("image"),
  offerController.offerPost
);
app.patch(
  "/api/v1/offer",
  checkToken,
  upload.single("image"),
  offerController.offerPatch
);
app.delete("/api/v1/offer", checkToken, offerController.offerDelete);

app.get("/api/v1/tv", tvController.tvGet);
app.post("/api/v1/tv", checkToken, upload.single("image"), tvController.tvPost);
app.patch(
  "/api/v1/tv",
  checkToken,
  upload.single("image"),
  tvController.tvPatch
);
app.delete("/api/v1/tv", checkToken, tvController.tvDelete);

mongoose
  .connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
  })
  .then(() => {
    app.listen(3000);
    console.log("Conectado ao banco");
  })
  .catch((err) => console.log(err));
