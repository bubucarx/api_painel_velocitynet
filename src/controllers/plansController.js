const Plan = require("../models/Plan");

exports.plansGet = async (req, res) => {
  const plan = await Plan.find({});
  try {
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.plansCreate = async (req, res) => {
  const { nome, descricao, idCategoria, preco, complementar } = req.body;

  const images = req.files;
  const arrayImages = [];

  let jsonString = complementar;

  jsonString = jsonString.trim();

  let jsonObject = JSON.parse(jsonString);

  for (const image of images) {
    arrayImages.push(image["filename"]);
  }

  const logo = arrayImages[0];
  const imageBase = arrayImages[1];

  const plans = new Plan({
    nome: nome,
    imagem: logo,
    planoBase: imageBase,
    descricao: descricao,
    idCategoria: idCategoria,
    preco: preco,
    complementar: jsonObject,
  });
  try {
    await plans.save();
    res.status(200).json({ msg: "Plano cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.plansDelete = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await Plan.deleteOne({ _id: id });
    if (result.deletedCount == 0) {
      return res.status(200).json({ msg: "Esse plano não existe" });
    }
    res.status(200).json({ msg: "Plano deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.plansPatch = async (req, res) => {
  const { id, nome, descricao, preco, complementar } = req.body;

  const fileds = {};

  fileds.nome = nome ?? undefined;
  fileds.descricao = descricao ?? undefined;
  fileds.preco = preco ?? undefined;
  fileds.complementar = complementar ?? undefined;

  try {
    const result = await Plan.updateOne({ _id: id }, { $set: fileds });
    if (result.modifiedCount == 0) {
      return res.status(200).json({ msg: "Esse plano não existe" });
    }
    res.status(200).json({
      msg: "Plano atualizado com sucesso!",
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.plansPatchImagem = async (req, res) => {
  const { id } = req.body;

  const image = req.file.filename;
  try {
    const result = await Plan.updateOne(
      { _id: id },
      {
        imagem: image,
      }
    );
    if (result.modifiedCount == 0) {
      return res.status(200).json({ msg: "Esse plano não existe" });
    }
    res.status(200).json({ msg: "Plano atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.plansPatchPlanBase = async (req, res) => {
  const { id } = req.body;

  const image = req.file.filename;
  try {
    const result = await Plan.updateOne(
      { _id: id },
      {
        planoBase: image,
      }
    );
    if (result.modifiedCount == 0) {
      return res.status(200).json({ msg: "Esse plano não existe" });
    }
    res.status(200).json({ msg: "Plano atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
