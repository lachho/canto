import React, { useState } from 'react';
import '../styles/Input.css';
import { toNumber, toAccent } from './Convert';
import axios from 'axios';

const AddWord = ({ toggle }) => {
  const [english, setEnglish] = useState('');
  const [chinese, setChinese] = useState('');
  const [yale, setYale] = useState('');
  const [tone, setTone] = useState('');
  const [tags, setTags] = useState('');

  const submit = async (wordData) => {
    try {
        console.log(wordData);
        const response = await axios.post('http://localhost:5000/words', wordData);
        console.log('Word added:', response.data);
        toggle(Math.random());
    } catch (error) {
        console.error('Error adding word:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (english && yale && tone) {
      const tagString = tags;
      submit({ english, chinese, yale, tone, tagString });
      setEnglish('');
      setYale('');
      setChinese('');
      setTone('');
      setTags('');
    }
  };

  const handleYaleChange = (e) => {
    const yaleInput = e.target.value;
    setYale(yaleInput);
    const convertedTone = yaleInput
      .split(' ')
      .map(toNumber)
      .join(' ');
    setTone(convertedTone);
  };

  // Handle changes in the Number Tone input field
  const handleToneChange = (e) => {
    const toneInput = e.target.value;
    setTone(toneInput);
    const convertedYale = toneInput
      .split(' ')
      .map(toAccent)
      .join(' ');
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
