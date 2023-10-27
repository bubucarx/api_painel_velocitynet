const Offer = require("../models/Offer");

exports.offerGet = async (req, res) => {
  const offer = await Offer.find();

  try {
    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.offerPost = async (req, res) => {
  const { title, description, value } = req.body;
  const image = req.file.originalname;

  const offer = new Offer({
    title: title,
    description: description,
    value: value,
    image: image,
  });

  try {
    await offer.save();
    res.status(200).json({ msg: "Oferta salva com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.offerPatch = async (req, res) => {
  const { id, title, description, value } = req.body;
  const image = req.file ? req.file.originalname : null;

  try {
    await Offer.updateOne(
      { _id: id },
      {
        $set: {
          title: title,
          description: description,
          value: value,
          image: image,
        },
      }
    );
    res.status(200).json({ msg: "Oferta atualizada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor" });
  }
};

exports.offerDelete = async (req, res) => {
  const { id } = req.body;

  try {
    await Offer.deleteOne({ _id: id });
    res.status(200).json({ msg: "Oferta deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};
