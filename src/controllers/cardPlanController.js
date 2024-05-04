const CardPlan = require("../models/CardPlan");

exports.cardPlanGet = async (req, res) => {
  const cardPlan = await CardPlan.find({});
  try {
    res.status(200).json(cardPlan);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.cardPlanCreate = async (req, res) => {
  const { idCategory } = req.body;
  const file = req.file.filename;

  const cardPlan = new CardPlan({
    idCategory: idCategory,
    imagem: file,
  });

  try {
    await cardPlan.save();
    res.status(200).json({ msg: "Card cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.cardPlanDelete = async (req, res) => {
  const { id } = req.body;
  try {
    await CardPlan.deleteOne({ _id: id });
    res.status(200).json({ msg: "Card deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

// exports.plansPatch = async (req, res) => {
//   const file = req.file.originalname;
//   const { id, name, tipoPlano, preco } = req.body;

//   try {
//     await Plans.updateOne(
//       { _id: id },
//       { $set: { nome: name, image: file, tipoPlano: tipoPlano, preco: preco } }
//     );
//     res.status(200).json({
//       msg: "Imagem alterada com sucesso",
//     });
//   } catch (error) {
//     res.status(500).json({ msg: "Erro no servidor" });
//   }
// };
