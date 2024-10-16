import React, { useState } from 'react';
import '../../styles/Input.css';

const Search = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSortOptionClick = (sortKey, direction) => {
    // onSortChange(sortKey, direction);
    setIsOpen(false); // Close the dropdown after selection
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);
    onSearch(newValue);
  };

  return (
    <div className="textbox">
      <input
        type="text"
        placeholder="Search by keyword or tag"
        value={input}
        onChange={handleInputChange}
      />
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        Sort By
      </button>
        {isOpen && (
          <div className="dropdown-menu">
            <button onClick={() => handleSortOptionClick('english', 'ascending')}>English A-Z</button>
            <button onClick={() => handleSortOptionClick('english', 'descending')}>English Z-A</button>
            <button onClick={() => handleSortOptionClick('yale', 'ascending')}>Yale A-Z</button>
            <button onClick={() => handleSortOptionClick('yale', 'descending')}>Yale Z-A</button>
            <button onClick={() => handleSortOptionClick('dateAdded', 'ascending')}>Oldest First</button>
            <button onClick={() => handleSortOptionClick('dateAdded', 'descending')}>Newest First</button>
          </div>
      )}
    </div>
  );
};

export default Search;
