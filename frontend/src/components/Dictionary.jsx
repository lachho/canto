import React from 'react';
import '../styles/Database.css';

const Dictionary = ({ searchTerm, dictionary }) => {
  
  const filteredWords = dictionary.filter((word) =>
    Object.keys(word).some(key => 
      word[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="dictionary">
      <table>
        <thead>
          <tr>
            {dictionary.length > 0 && (
              Object.keys(dictionary[0]).slice(0, -1).map((key, index) => ( // Exclude the last field
                <th key={index}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {filteredWords.length > 0 ? (
            filteredWords.map((word, index) => (
              <tr key={index}>
                {Object.keys(word).slice(0, -1).map((key, idx) => {
                  const cellValue = key === 'tags' ? word[key].join(', ') : word[key];
                  return <td key={idx}>{cellValue}</td>;
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={dictionary.length > 0 ? Object.keys(dictionary[0]).length - 1 : 1}>No results found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


export default Dictionary;
