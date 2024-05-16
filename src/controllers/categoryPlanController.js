const CategoryPlan = require("../models/CategoryPlan");
const Category = require("../models/CategoryPlan");

exports.categoryPlanGet = async (req, res) => {
  const categoryPlan = await Category.find({});
  try {
    res.status(200).json(categoryPlan);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.categoryPlanCreate = async (req, res) => {
  const { nome, subTitulo, visualizacao } = req.body;
  const image = req.file.filename;

  const categoryPlan = new CategoryPlan({
    nome: nome,
    logo: image,
    subTitulo: subTitulo,
    visualizacao: visualizacao,
  });

  try {
    await categoryPlan.save();
    res.status(200).json({ msg: "Categoria cadastrada com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.categoryPlanCreateCard = async (req, res) => {
  const { idCategory } = req.body;
  const files = req.files;
  try {
    for (const file of files) {
      await CategoryPlan.updateOne(
        { _id: idCategory },
        { $push: { images: file.filename } }
      );
    }
    res.status(200).json({ msg: "Card cadastrado com sucesso!" });
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

exports.categoryPlanDeleteCard = async (req, res) => {
  const { cardName, idCategory } = req.body;
  try {
    await CategoryPlan.updateOne(
      { _id: idCategory },
      { $pull: { images: cardName } }
    );
    res.status(200).json({ msg: "Categoria deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.categoryPlanPatch = async (req, res) => {
  const { id, nome, subTitulo, visualizacao, status } = req.body;

  var file = "";

  if (!req.file) {
    file = undefined;
  } else {
    file = req.file.originalname;
  }

  try {
    await CategoryPlan.updateOne(
      { _id: id },
      {
        $set: {
          nome: nome,
          logo: file,
          subTitulo: subTitulo,
          visualizacao: visualizacao,
          status: status,
        },
      }
    );
    res.status(200).json({
      msg: "Categoria alterada com sucesso",
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
