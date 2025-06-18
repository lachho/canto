import React, { useEffect, useState } from 'react';
import Dictionary from './Dictionary/Dictionary';
import Search from './Dictionary/Search';
// import AddWord from './Dictionary/AddWord';  // Removed for static version
// import axios from 'axios';  // Removed for static version
import MenuBar from './Menu';
import '../styles/Home.css';
import dictionaryData from '../data.json';  // Import static data


const Database = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dictionary, setDictionary] = useState([]);
  // const [trigger, setTrigger] = useState(0);  // Removed for static version
  // Removed unused state variables for static version
  // const [english, setEnglish] = useState('');
  // const [chinese, setChinese] = useState('');
  // const [yale, setYale] = useState('');
  // const [tone, setTone] = useState('');
  // const [tags, setTags] = useState('');
  const [searchALl, setSearchAll] = useState('');

  // const updateWords = async () => {  // Removed API call for static version
  //   try {
  //       const response = await axios.get('http://localhost:5000/words');
  //       setDictionary(response.data);
  //       console.log('Words updated');
  //   } catch (error) {
  //       console.error('Couldnt display words:', error);
  //   }
  // };

  useEffect(() => {
    setSearchAll(searchTerm.trim());  // Simplified for static version
  }, [searchTerm]);

  useEffect(() => {
    // Load static data instead of calling API
    setDictionary(dictionaryData);
    console.log("Loaded static dictionary data");
  }, []);  // Removed trigger dependency

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
<div className="database">
  <div className="top">
    <MenuBar />  {/* Removed toggle prop since no adding/editing */}
    <h1>Ultimate Canto-English Dictionary</h1>
    <div className="portfolio-notice" style={{
      background: '#f0f8ff', 
      padding: '10px', 
      margin: '10px 0', 
      borderRadius: '5px', 
      textAlign: 'center',
      fontStyle: 'italic'
    }}>
      📖 Portfolio Version - Browse and search the dictionary
    </div>
    {/* <AddWord toggle={setTrigger} english={english} setEnglish={setEnglish} chinese={chinese} setChinese={setChinese} yale={yale} setYale={setYale} tone={tone} setTone={setTone} tags={tags} setTags={setTags}/> */}
    <Search onSearch={handleSearch} />
  </div>
  <div className="search">
    <Dictionary search={searchALl} dictionary={dictionary} setDictionary={setDictionary} isStatic={true} />
  </div>
</div>
  );
};

export default Database;
