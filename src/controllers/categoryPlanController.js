const CategoryPlan = require("../models/CategoryPlan");
const Category = require("../models/CategoryPlan");

exports.categoryPlanGet = async (req, res) => {
  const category = await Category.find({});
  try {
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.categoryPlanCreate = async (req, res) => {
  const { name, preco } = req.body;

  const benefits = new CategoryPlan({
    nome: name,
    preco: preco,
  });

  try {
    await benefits.save();
    res.status(200).json({ msg: "Categoria cadastrada com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.categoryPlanDelete = async (req, res) => {
  const { id } = req.body;
  try {
    await CategoryPlan.deleteOne({ _id: id });
    res.status(200).json({ msg: "Categoria deletada com sucesso!" });
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
//       { $set: { name: name, image: file, tipoPlano: tipoPlano, preco: preco } }
//     );
//     res.status(200).json({
//       msg: "Imagem alterada com sucesso",
//     });
//   } catch (error) {
//     res.status(500).json({ msg: "Erro no servidor" });
//   }
// };
