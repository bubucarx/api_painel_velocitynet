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
    complementar: complementar,
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
    await Plan.deleteOne({ _id: id });
    res.status(200).json({ msg: "Plano deletado com sucesso!" });
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
//     await Plan.updateOne(
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
