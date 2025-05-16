//recebendo as propriedades do banco de dados
const mongoose = require("mongoose");
const { Schema } = mongoose;
//objetos a ser recebido
const Candidate = mongoose.model("candidate", {
  nome: String,
  telefone: String, 
  email: String,
  dataNascimento: Date,
  conteSobreVoce: String,
  funcaoEsc: String,
  anexo: String,
  dataEnvio: Date,
});
//exportar os dados candidate
module.exports = Candidate;
