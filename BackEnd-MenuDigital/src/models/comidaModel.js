const moongose = require("mongoose");
const { Schema } = moongose;

const comida = new Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 15,
  },
  Price: {
    type: Number,
    required: true,
    min: 100,
    max: 100000
  },
  Image: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  }
},{
    versionKey: false,
    collection: "Comidas"    
});

const comidaModal = moongose.model("Comidas", comida);

module.exports = comidaModal;
