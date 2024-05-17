const multer = require("multer");
const crypto = require("crypto");

function createHash(data) {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: async function async(req, file, cb) {
    const nomeArquivo = file.originalname;
    const date = Date.now();
    const newName = `${nomeArquivo} ${date}`;
    console.log(newName);
    const hashValue = createHash(newName);
    console.log(hashValue);
    const type = file.mimetype.split("/")[1];
    const name = hashValue + "." + type;
    cb(null, name);
  },
});

module.exports = storage;
