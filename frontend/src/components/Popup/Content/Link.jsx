import React from 'react';

const Link = ({ link, text }) => {
  return (
    <a href={link} className="link" target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
};

export default Link;
