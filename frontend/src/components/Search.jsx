import React, { useEffect, useState } from 'react';
import '../styles/Input.css';

const Search = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);
    onSearch(newValue);
  };

  return (
    <div className="textbox">
      <input
        type="text"
        placeholder="Search..."
        value={input}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
