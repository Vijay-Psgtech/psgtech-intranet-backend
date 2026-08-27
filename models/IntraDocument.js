const mongoose = require("mongoose");

const IntraDocSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["CT", "PTC"],
    default: "CT",
  },
  flashtext: {
    type: String,
    required: true,
  },
  urltext: {
    type: String
  },
  filename: {
    type: String
  }
});

module.exports = mongoose.model("IntraDocs", IntraDocSchema);
