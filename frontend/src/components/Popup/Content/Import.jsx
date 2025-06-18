import React, { useState } from 'react';
import '../../../styles/Input.css';

const Import = () => {
  const [wordData, setWordData] = useState('');

  const handleMassAdd = () => {
    alert('Bulk import is not available in this portfolio demo. Please use the individual "Add Word" form above to test adding entries.');
  };

  return (
    <div className='textbox import'>
      <div style={{marginBottom: '10px', padding: '10px', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '4px'}}>
        <strong>Portfolio Demo Notice:</strong> Bulk import functionality is disabled in this static version. 
        Use the "Add Word" form above to test adding individual entries.
      </div>
      <textarea
        value={wordData} 
        onChange={(e) => setWordData(e.target.value)} 
        placeholder="Paste tab-delimited data: english | tone | yale | chinese | tags (disabled in portfolio demo)"
        rows="10" 
        cols="50"
        disabled
      />
      <button onClick={handleMassAdd} disabled>Submit (Demo Only)</button>
    </div>
  );
};

export default Import;
