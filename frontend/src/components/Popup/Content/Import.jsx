import React, { useState } from 'react';
import axios from 'axios';
import '../../../styles/Input.css';
import { toNumber, toAccent } from '../../Convert';

const Import = ({toggle}) => {
  const [wordData, setWordData] = useState('');

  const handleMassAdd = async () => {
    if (!wordData) return;
    
    // Split input by lines and then by tab
    const rows = wordData.split('\n').map(row => row.split('\t'));
    console.log(rows);

    const wordsArray = rows.map(row => {
      const [english, tone, yale, chinese, tagString] = row;
  
      // Initialize an object to hold the word data
      const wordObject = {
        english,
        tone: tone || (yale ? toNumber(yale) : ''),
        yale: yale || (tone ? toAccent(tone) : ''),
        chinese,
        tagString
      };
  
      return wordObject;
    });
    console.log(wordsArray);


    try {
      const response = await axios.post('http://localhost:5000/mass-add', { wordsArray });
      console.log('Mass Add Response:', response.data);
      toggle(Math.random());  // Refresh data
      setWordData('');
    } catch (error) {
      console.error('Error mass adding words:', error);
    }
  };

  return (
    <div className='textbox import'>
        <textarea
            value={wordData} 
            onChange={(e) => setWordData(e.target.value)} 
            placeholder="Paste tab-delimited data: english | tone | yale | chinese | tags."
            rows="10" cols="50"
        />
      <button onClick={handleMassAdd}>Submit</button>
    </div>
  );
};

export default Import;
