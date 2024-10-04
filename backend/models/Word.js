const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  cantonese: String,
  english: String,
  partOfSpeech: String,
  exampleSentence: String,
});

module.exports = mongoose.model('Word', wordSchema);
