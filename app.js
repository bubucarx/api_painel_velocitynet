require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const multer = require("multer");

const storage = require("./src/middleware/storage");
const storageArray = require("./src/middleware/storageArray");

const upload = multer({ storage });

const uploadArray = multer({ storage: storageArray });

const cors = require("cors");

const checkToken = require("./src/middleware/checktoken");
const sliderController = require("./src/controllers/sliderController");
const loginController = require("./src/controllers/loginController");
const descriptionController = require("./src/controllers/descriptionController");
const offerController = require("./src/controllers/offerController");
const tvController = require("./src/controllers/tvController");
const categoryController = require("./src/controllers/categoryController");
const plansController = require("./src/controllers/plansController");
const additionalController = require("./src/controllers/additionalController");
const categoryPlanController = require("./src/controllers/categoryPlanController");
const cardPlanController = require("./src/controllers/cardPlanController");
const ComplementController = require("./src/controllers/ComplementController");
const RouterController = require("./src/controllers/routerController");
//importando o as propriedades da pasta CandidateController
const CandidateController = require("./src/controllers/CandidateController");
const { combosImagesGet } = require("./src/controllers/combosController");
const combosController = require("./src/controllers/combosController");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/api/v1/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a nossa api!" });
});

app.get("/api/v1/uploads/:nomeDoArquivo", sliderController.verArquivo);

////////////////////////////////////////////////// COMBOS ///////////////////////////////////////////////////////////
app.get("/api/v1/combos", combosController.combosImagesGet);
app.post("/api/v1/combos", combosController.combosImagesPost);
app.delete("/api/v1/combos/:id", combosController.combosImagesDelete);
////////////////////////////////////////////////// COMBOS ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// SLIDER ///////////////////////////////////////////////////////////
app.get("/api/v1/slider", sliderController.sliderGet);
app.get("/api/v1/slider-all", sliderController.sliderGetAll);
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
///////////////////////////////////////////////// SLIDER ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// LOGIN ///////////////////////////////////////////////////////////
app.post("/api/v1/login", loginController.login);
app.post("/api/v1/auth/login", loginController.authLogin);
app.post("/api/v1/auth/register", loginController.authRegister);
app.get("/api/v1/auth/users", loginController.authUser);
app.put("/api/v1/auth/password/:id", loginController.authPassword);
///////////////////////////////////////////////// LOGIN ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// CARD ///////////////////////////////////////////////////////////
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
app.delete("/api/v1/card/:id", checkToken, descriptionController.cardDelete);
///////////////////////////////////////////////// CARD ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// OFERTA ///////////////////////////////////////////////////////////
app.get("/api/v1/offer", offerController.offerGet);
app.post(
  "/api/v1/offer",
  checkToken,
  upload.single("image"),
  offerController.offerPost
);
app.patch(
  "/api/v1/offer/:id?",
  checkToken,
  upload.single("image"),
  offerController.offerPatch
);
app.delete("/api/v1/offer", checkToken, offerController.offerDelete);
///////////////////////////////////////////////// OFERTA ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// TV ///////////////////////////////////////////////////////////
app.get("/api/v1/tv", tvController.tvGet);
app.post("/api/v1/tv", checkToken, upload.single("image"), tvController.tvPost);
app.patch(
  "/api/v1/tv/:id?",
  checkToken,
  upload.single("image"),
  tvController.tvPatch
);

app.delete("/api/v1/tv", checkToken, tvController.tvDelete);
///////////////////////////////////////////////// TV ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// PLANO  ///////////////////////////////////////////////////////////

app.get("/api/v1/plans", plansController.plansGet);
app.post(
  "/api/v1/plans/create",
  checkToken,
  uploadArray.array("images"),
  plansController.plansCreate
);
app.delete("/api/v1/plans/delete", checkToken, plansController.plansDelete);

app.patch(
  "/api/v1/plans/update",
  uploadArray.array("images"),
  checkToken,
  plansController.plansPatch
);

// app.patch(
//   "/api/v1/plans/update-imagem",
//   upload.single("image"),
//   checkToken,
//   plansController.plansPatchImagem
// );

// app.patch(
//   "/api/v1/plans/update-plan-base",
//   upload.single("image"),
//   checkToken,
//   plansController.plansPatchPlanBase
// );

///////////////////////////////////////////////// PLANO ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// ADDITIONAL ///////////////////////////////////////////////////////////
app.get("/api/v1/additional", additionalController.additionalGet);
app.post(
  "/api/v1/additional/create",
  checkToken,
  upload.single("image"),
  additionalController.additionalCreate
);
app.patch(
  "/api/v1/additional/update",
  checkToken,
  upload.single("image"),
  additionalController.additionalPatch
);
app.delete(
  "/api/v1/additional/delete",
  checkToken,
  additionalController.additionalDelete
);

////////////////////////ADDITIONAL//////////////////////// ADDITIONAL ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// CATEGORY PLAN ///////////////////////////////////////////////////////////////////////////
app.get(
  "/api/v1/category-plan",
  // checkToken,
  categoryPlanController.categoryPlanGet
);

app.post(
  "/api/v1/category-plan/create",
  checkToken,
  upload.single("image"),
  categoryPlanController.categoryPlanCreate
);

app.patch(
  "/api/v1/category-plan/patch",
  checkToken,
  upload.single("image"),
  categoryPlanController.categoryPlanPatch
);

app.patch(
  "/api/v1/category-plan/create-card",
  checkToken,
  uploadArray.array("images"),
  categoryPlanController.categoryPlanCreateCard
);

app.delete(
  "/api/v1/category-plan/delete-card",
  checkToken,
  categoryPlanController.categoryPlanDeleteCard
);

app.delete(
  "/api/v1/category-plan/delete",
  checkToken,
  categoryPlanController.categoryPlanDelete
);
///////////////////////////////////////////////// CATEGORY PLAN ///////////////////////////////////////////////////////////

// ///////////////////////////////////////////////// ROUTER ///////////////////////////////////////////////////////////
app.get("/api/v1/router", RouterController.routerGet);
app.post("/api/v1/router/create", checkToken, RouterController.routerCreate);
app.delete("/api/v1/router/delete", checkToken, RouterController.routerDelete);
app.patch("/api/v1/router/update", checkToken, RouterController.routerPatch);
// ///////////////////////////////////////////////// ROUTER ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// COMPLEMENT INFORMATION ///////////////////////////////////////////////////////////
app.get("/api/v1/complement", ComplementController.complementGet);

app.post("/api/v1/complement-get-id", ComplementController.complementGetByID);

app.post(
  "/api/v1/complement/create",
  checkToken,
  upload.single("image"),
  ComplementController.complementCreate
);

app.patch(
  "/api/v1/complement/update",
  checkToken,
  upload.single("image"),

  ComplementController.complementPatch
);

app.delete(
  "/api/v1/complement/delete",
  checkToken,
  ComplementController.complementDelete
);

///////////////////////////////////////////////// COMPLEMENT INFORMATION ///////////////////////////////////////////////////////////

////////////////////////////////////////////////////// CANDIDATE ////////////////////////////////////////////////////////////////////

app.get(
  "/api/v1/candidate/get",

  CandidateController.candidateGet
);

app.post(
  "/api/v1/candidate/post",
  upload.single("image"),
  CandidateController.CandidatePost
  //tiago
);

app.post("/api/v1/candidate/delete", CandidateController.CandidateDelete);

////////////////////////////////////////////////////  CANDIDATE  ///////////////////////////////////////////////////////////////////

////////////////////////////////////////////////// email controllers ///////////////////////////////////////////////////////////////

app.use("/api/v1", require("./src/controllers/emailControllers"));
////////////////////////////////////////////////// email controllers ///////////////////////////////////////////////////////////////////

mongoose
  .connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // ssl: true,
  })
  .then(() => {
    app.listen(3000);
    console.log("Conectado ao banco");
  })
  .catch((err) => console.log(err));
