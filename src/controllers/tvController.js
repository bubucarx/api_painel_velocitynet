const Tv = require("../models/Tv");

exports.tvGet = async (req, res) => {
  const tv = await Tv.find();

  try {
    res.status(200).json(tv);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.tvPost = async (req, res) => {
  const { title, description, value } = req.body;
  const image = req.file ? req.file.originalname : null;

  const offer = new Tv({
    title: title,
    description: description,
    value: value,
    image: image,
  });

  try {
    await offer.save();
    res.status(200).json({ msg: "Tv salva com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.tvPatch = async (req, res) => {
  const { id, title, description, value } = req.body;
  const image = req.file ? req.file.originalname : null;

  try {
    await Tv.updateOne(
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
    res.status(200).json({ msg: "Tv atualizada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.tvDelete = async (req, res) => {
  const { id } = req.body;

  try {
    await Tv.deleteOne({ _id: id });
    res.status(200).json({ msg: "Tv deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};
