const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: async function async(req, file, cb) {
    const nomeArquivo = file.originalname;
    console.log(nomeArquivo);
    cb(null, nomeArquivo);
  },
});

module.exports = storage;
