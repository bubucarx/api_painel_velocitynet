const fs = require("fs");
const path = require("path");
const Plans = require("../models/Category");
const CardPLans = require("../models/Plan");

exports.cardPlansGet = async (req, res) => {
  const cardPlans = await CardPLans.find({});
  try {
    res.status(200).json(cardPlans);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.cardPlansCreate = async (req, res) => {
  const { idPlans, name, tipoPlano, preco } = req.body;
  const file = req.file.filename;

  const cardPlans = new CardPLans({
    nome: name,
    image: file,
    idPlans: idPlans,
    tipoPlano: tipoPlano,
    preco: preco,
  });

  try {
    await cardPlans.save();
    res.status(200).json({ msg: "Card cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.cardPlansDelete = async (req, res) => {
  const { id } = req.body;
  try {
    await CardPLans.deleteOne({ _id: id });
    res.status(200).json({ msg: "Card deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

// exports.cardPlansPatch = async (req, res) => {
//   const { id, name, tipoPlano, preco } = req.body;

//   const file = "";

//   if (req.file) {
//     file = req.file.originalname;
//   }

//   try {
//     await CardPLans.updateOne(
//       { _id: id },
//       { $set: { name: name, image: file, tipoPlano: tipoPlano, preco: preco } }
//     );
//     res.status(200).json({
//       msg: "Card atualizado com sucesso!",
//     });
//   } catch (error) {
//     res.status(500).json({ msg: "Erro no servidor" });
//   }
// };
