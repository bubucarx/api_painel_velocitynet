const fs = require("fs");
const path = require("path");
const Plans = require("../models/Plans");
const CardPLans = require("../models/CardPlans");

exports.cardPlansGet = async (req, res) => {
  const cardPlans = await CardPLans.find({});
  try {
    res.status(200).json(cardPlans);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.cardPlansCreate = async (req, res) => {
  const { idPlans } = req.body;
  const file = req.file.filename;

  const cardPlans = new CardPLans({
    name: file,
    idPlans: idPlans,
  });

  try {
    await cardPlans.save();
    res.status(200).json({ msg: "Imagem salva" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.plansDelete = async (req, res) => {
  const { id } = req.body;
  try {
    await CardPLans.deleteOne({ _id: id });
    res.status(200).json({ msg: "Imagem deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

// exports.plansPatch = async (req, res) => {
//   const file = req.file;
//   const name = req.file.originalname;
//   const { id } = req.body;

//   if (!file) {
//     res.status(422).json({ msg: "Imagem inválida" });
//   }

//   try {
//     await Plans.updateOne({ _id: id }, { $set: { name: name } });
//     res.status(200).json({
//       msg: "Imagem alterada com sucesso",
//     });
//   } catch (error) {
//     res.status(500).json({ msg: "Erro no servidor" });
//   }
// };
