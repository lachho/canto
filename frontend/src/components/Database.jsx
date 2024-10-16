import React, { useEffect, useState } from 'react';
import Dictionary from './Dictionary/Dictionary';
import Search from './Dictionary/Search';
import AddWord from './Dictionary/AddWord';
import axios from 'axios';
import MenuBar from './Menu';
import '../styles/Home.css';


const Database = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dictionary, setDictionary] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [english, setEnglish] = useState('');
  const [chinese, setChinese] = useState('');
  const [yale, setYale] = useState('');
  const [tone, setTone] = useState('');
  const [tags, setTags] = useState('');
  const [searchALl, setSearchAll] = useState('');

  const updateWords = async () => {
    try {
        const response = await axios.get('http://localhost:5000/words');
        setDictionary(response.data);
        console.log('Words updated');
    } catch (error) {
        console.error('Couldnt display words:', error);
    }
  };

  useEffect(() => {
    setSearchAll(`${searchTerm} ${english} ${tone} ${tags.replace(/,/g, ' ')}`.trim());
  }, [searchTerm, english, tone, tags]);

  useEffect(() => {
    updateWords();
    console.log("call updating dict");
  }, [trigger]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
<div className="database">
  <div className="top">
    <MenuBar toggle={setTrigger}/>
    <h1>Ultimate Canto-English Dictionary</h1>
    <AddWord toggle={setTrigger} english={english} setEnglish={setEnglish} chinese={chinese} setChinese={setChinese} yale={yale} setYale={setYale} tone={tone} setTone={setTone} tags={tags} setTags={setTags}/>
    <Search onSearch={handleSearch} />
  </div>
  <div className="search">
    <Dictionary search={searchALl} dictionary={dictionary} setDictionary={setDictionary} />
  </div>
</div>
  );
};

export default Database;
