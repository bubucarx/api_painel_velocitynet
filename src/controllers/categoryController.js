const fs = require("fs");
const path = require("path");
const Category = require("../models/Category");

exports.categoryGet = async (req, res) => {
  const category = await Category.find({});
  try {
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.categoryPost = async (req, res) => {
  const file = req.file;
  const name = req.file.originalname;

  const category = new Category({
    name: name,
  });

  if (!file) {
    res.status(422).json({ msg: "Imagem inválida" });
  }

  try {
    await category.save();
    res.status(200).json({ msg: "Imagem salva" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.categoryPatch = async (req, res) => {
  const file = req.file;
  const name = req.file.originalname;
  const { id } = req.body;

  if (!file) {
    res.status(422).json({ msg: "Imagem inválida" });
  }

  try {
    await Category.updateOne({ _id: id }, { $set: { name: name } });
    res.status(200).json({
      msg: "Imagem alterada com sucesso",
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.categoryDelete = async (req, res) => {
  const { id } = req.body;
  try {
    await Category.deleteOne({ _id: id });
    res.status(200).json({ msg: "Imagem deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};
