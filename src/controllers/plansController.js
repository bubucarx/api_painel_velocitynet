const fs = require("fs");
const path = require("path");
const Plans = require("../models/Plans");

exports.plansGet = async (req, res) => {
  const plans = await Plans.find({});
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

exports.plansPatch = async (req, res) => {
  const file = req.file;
  const name = req.file.originalname;
  const { id } = req.body;

  if (!file) {
    res.status(422).json({ msg: "Imagem inválida" });
  }

  try {
    await Plans.updateOne({ _id: id }, { $set: { name: name } });
    res.status(200).json({
      msg: "Imagem alterada com sucesso",
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.plansDelete = async (req, res) => {
  const { id } = req.body;
  try {
    await Plans.deleteOne({ _id: id });
    res.status(200).json({ msg: "Imagem deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};
