const AdditionalInformation = require("../models/AdditionalInformation");

exports.additionalInformationGet = async (req, res) => {
  const additionalInformation = await AdditionalInformation.find({});
  try {
    res.status(200).json(additionalInformation);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.additionalInformationCreate = async (req, res) => {
  const { nome, idPlan } = req.body;
  const image = req.file.filename;

  console.log(image);

  const additionalInformation = new AdditionalInformation({
    nome: nome,
    image: image,
  });

  try {
    await additionalInformation.save();
    res
      .status(200)
      .json({ msg: "Informação adicional cadastrada com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.additionalInformationDelete = async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  try {
    await AdditionalInformation.deleteOne({ _id: id });
    res.status(200).json({ msg: "Informação adicional deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.plansPatch = async (req, res) => {
  const image = req.file.filename;
  const { id, name, tipoPlano, preco } = req.body;

  try {
    await Plans.updateOne(
      { _id: id },
      { $set: { name: name, image: file, tipoPlano: tipoPlano, preco: preco } }
    );
    res.status(200).json({
      msg: "Imagem alterada com sucesso",
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
