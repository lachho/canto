import React, { useEffect, useState } from 'react';
import Dictionary from './Dictionary/Dictionary';
import Search from './Dictionary/Search';
import AddWord from './Dictionary/AddWord';
import { useDictionary } from '../hooks/useDictionary';
import MenuBar from './Menu';
import '../styles/Home.css';


const Database = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { dictionary, addWord, updateWord } = useDictionary();
  const [trigger, setTrigger] = useState(0);
  const [english, setEnglish] = useState('');
  const [chinese, setChinese] = useState('');
  const [yale, setYale] = useState('');
  const [tone, setTone] = useState('');
  const [tags, setTags] = useState('');
  const [searchALl, setSearchAll] = useState('');

  useEffect(() => {
    setSearchAll(`${searchTerm} ${english} ${tone} ${tags.replace(/,/g, ' ')}`.trim());
  }, [searchTerm, english, tone, tags]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleAddWord = (wordData) => {
    addWord(wordData);
    // Clear form fields
    setEnglish('');
    setYale('');
    setChinese('');
    setTone('');
    setTags('');
    // Trigger update for any components that need it
    setTrigger(prev => prev + 1);
  };

  return (
<div className="database">
  <div className="top">
    <MenuBar toggle={setTrigger}/>
    <h1>Ultimate Canto-English Dictionary</h1>
    <div className="portfolio-notice">
      <p style={{color: '#666', fontSize: '0.9em', fontStyle: 'italic'}}>
        ⚠️ Portfolio Demo: Changes won't be saved permanently
      </p>
    </div>
    <AddWord 
      onAddWord={handleAddWord}
      english={english} 
      setEnglish={setEnglish} 
      chinese={chinese} 
      setChinese={setChinese} 
      yale={yale} 
      setYale={setYale} 
      tone={tone} 
      setTone={setTone} 
      tags={tags} 
      setTags={setTags}
    />
    <Search onSearch={handleSearch} />
  </div>
  <div className="search">
    <Dictionary 
      search={searchALl} 
      dictionary={dictionary} 
      onUpdateWord={updateWord}
    />
  </div>
</div>
  );
};

export default Database;
