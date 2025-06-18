import React, { useRef, useState } from 'react';

const Edit = ({ value, onUpdate, isReadOnly = false }) => {
  const [editable, setEditable] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const originalValue = useRef(value);
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (inputValue !== originalValue.current) { // Check if the value has changed
        onUpdate(inputValue); // Call the update function with the new value
      }
      setEditable(false); // Exit edit mode
    } else if (e.key === 'Escape') {
      setInputValue(originalValue.current); // Revert to original value
      setEditable(false); // Exit edit mode
    }
  };

  return (
    <div>
      {editable && !isReadOnly ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Update state on input change
          onBlur={() => {
            if (inputValue !== originalValue.current) { // Check if the value has changed
              onUpdate(inputValue); // Update value on blur
            }
            setEditable(false); // Exit edit mode
          }}
          onKeyDown={handleKeyDown} // Handle key events
          autoFocus
        />
      ) : (
        <span 
          onClick={isReadOnly ? undefined : () => {
            setEditable(true); // Enter edit mode
            originalValue.current = value; // Save the original value when entering edit mode
          }}
          style={{
            cursor: isReadOnly ? 'default' : 'pointer',
            color: isReadOnly ? 'inherit' : 'inherit'
          }}
        >
          {value || (isReadOnly ? '' : <i style={{ color: '#aaa' }}>edit</i>)}
        </span>
      )}
    </div>
  );
};

export default Edit;
