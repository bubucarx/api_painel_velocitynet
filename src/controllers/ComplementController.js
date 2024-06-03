const Complement = require("../models/Complement");

exports.complementGetByID = async (req, res) => {
  const { idPlan } = req.body;
  const complement = await Complement.find({ idPlan: idPlan });
  try {
    res.status(200).json(complement);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.complementGet = async (req, res) => {
  const complement = await Complement.find({});
  try {
    res.status(200).json(complement);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.complementCreate = async (req, res) => {
  const { nome, idPlan } = req.body;
  const image = req.file.filename;

  const id = idPlan ?? undefined;

  const complement = new Complement({
    nome: nome,
    image: image,
    idPlan: id,
  });

  try {
    await complement.save();
    res.status(200).json({ msg: "Complemento cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.complementDelete = async (req, res) => {
  const { id } = req.body;
  try {
    await Complement.deleteOne({ _id: id });
    res.status(200).json({ msg: "Complemento deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.complementPatch = async (req, res) => {
  const { id, nome, idPlan, status } = req.body;

  const fileds = {};

  if (!req.file) {
    fileds.image = undefined;
  } else {
    fileds.image = req.file.filename;
  }

  fileds.nome = nome ?? undefined;
  fileds.idPlan = idPlan ?? undefined;
  fileds.status = status ?? undefined;

  try {
    await Complement.updateOne({ _id: id }, { $set: fileds });
    res.status(200).json({
      msg: "Complemento alterado com sucesso",
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
