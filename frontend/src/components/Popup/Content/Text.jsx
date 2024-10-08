import React from 'react';

const Text = ({ text }) => {
  const textParts = Array.isArray(text) ? text : [text];

  return (
    <div className="text">
      {textParts.map((part, index) => (
        <p key={index}>{part}</p>
      ))}
    </div>
  )
};

export default Text;
