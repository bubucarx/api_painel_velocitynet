const Benefits = require("../models/Benefits");

exports.benefitsGet = async (req, res) => {
  const benefits = await Benefits.find({});
  try {
    res.status(200).json(benefits);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.benefitsCreate = async (req, res) => {
  const { name, preco } = req.body;
  const file = req.file.filename;

  const benefits = new Benefits({
    nome: name,
    image: file,
    preco: preco,
  });

  try {
    await benefits.save();
    res.status(200).json({ msg: "Benefício cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.benefitsDelete = async (req, res) => {
  const { id } = req.body;
  try {
    await Benefits.deleteOne({ _id: id });
    res.status(200).json({ msg: "Benefício deletado com sucesso!" });
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
