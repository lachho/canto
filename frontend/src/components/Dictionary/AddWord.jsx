import React from 'react';
import '../../styles/Input.css';
import { toNumber, toAccent } from '../Convert';

const AddWord = (
  { 
    onAddWord,
    english, 
    setEnglish, 
    chinese, 
    setChinese, 
    yale, 
    setYale, 
    tone, 
    setTone, 
    tags, 
    setTags
  }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    if (english && yale && tone) {
      const tagString = tags;
      const wordData = { english, chinese, yale, tone, tagString };
      onAddWord(wordData);
    }
  };

  const handleYaleChange = (e) => {
    const yaleInput = e.target.value;
    setYale(yaleInput);
    const convertedTone = toNumber(yaleInput);
    setTone(convertedTone);
  };
  
  // Handle changes in the Number Tone input field
  const handleToneChange = (e) => {
    const toneInput = e.target.value;
    setTone(toneInput);
    const convertedYale = toAccent(toneInput);
    setYale(convertedYale);
  };  

  return (
    <form onSubmit={handleSubmit} className="textbox">
      <input
        type="text"
        placeholder="Meaning"
        value={english}
        onChange={(e) => setEnglish(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Number Tones"
        value={tone}
        onChange={handleToneChange}
        required
      />
      <input
        type="text"
        placeholder="Yale Romanisation"
        value={yale}
        onChange={handleYaleChange}
        required
      />
      <input
        type="text"
        placeholder="Chinese"
        value={chinese}
        onChange={(e) => setChinese(e.target.value)}
        required={false}
      />
      <input
        type="text"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        required={false}
      />
      <button type="submit">Add Word</button>
    </form>
  );
};

export default AddWord;
