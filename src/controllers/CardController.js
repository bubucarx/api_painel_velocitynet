const CardSectionTitle = require("../models/CardSectionTitle");

exports.cardTitleSectionCreate = async (req, res) => {
  const { name } = req.body;

  const cardTitle = new CardSectionTitle({
    name,
  });

  try {
    await cardTitle.save();
    res.status(200).json({ msg: "Titulo da sessão card salvo com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor" });
  }
};

exports.cardTitleSectionFind = async (req, res) => {
  const cardTitle = await CardSectionTitle.findOne({});

  try {
    res.status(200).json(cardTitle);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor" });
  }
};

exports.cardTitleSectionUpdate = async (req, res) => {
  const { id, name } = req.body;

  try {
    await CardSectionTitle.updateOne({ _id: id }, { $set: { name: name } });
    res.status(200).json({
      msg: "Title da seção card alterado com sucesso",
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor" });
  }
};
