import React from 'react';

const SortingButtons = ({}) => {



  return (
    <div className="sorting-buttons">
      <button onClick={() => sortDictionary('english')}>English</button>
      <button onClick={() => sortDictionary('english')}>Tags</button>
      <button onClick={() => sortDictionary('yale')}>Yale</button>
      <button onClick={() => sortDictionary('recent')}>Recently Added</button>
    </div>
  );
};

export default SortingButtons;
