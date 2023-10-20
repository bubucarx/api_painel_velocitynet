const Offer = require("../models/Offer");
exports.offer = async (req, res) => {
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
