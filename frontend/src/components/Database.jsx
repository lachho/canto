import React, { useEffect, useState } from 'react';
import Dictionary from './Dictionary';
import Search from './Search';
import AddWord from './AddWord';
import axios from 'axios';
import MenuBar from './Menu';

const Database = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dictionary, setDictionary] = useState([]);
  const [trigger, setTrigger] = useState(0);

  const updateWords = async () => {
    try {
        const response = await axios.get('http://localhost:5000/words');
        setDictionary(response.data);
        console.log('Words updated:', response.data);
    } catch (error) {
        console.error('Couldnt display words:', error);
    }
  };

  useEffect(() => {
    fetch('.backend/data.json')
        .then(response => response.json())
        .then(data => setDictionary(data))
        .catch(error => console.error('Error loading data:', error));
  }, []);


  useEffect(() => {
    updateWords()
  }, [trigger]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="database">
       <MenuBar toggle={setTrigger}/>
      <h1>Canto-English Dictionary</h1>
      <AddWord toggle={setTrigger}/>
      <Search onSearch={handleSearch} />
      <Dictionary searchTerm={searchTerm} dictionary={dictionary}/>
    </div>
  );
};

export default Database;
