import React, { useState, useEffect } from 'react';
import '../styles/Menu.css';
import Popup from './Popup/Popup';

const MenuBar = () => {
  const [menuData, setMenuData] = useState([]);
  const [popupContent, setPopupContent] = useState(null);

  // Load the menu data from the JSON file
  useEffect(() => {
    console.log(fetch('/menu.json'));
    fetch('/menu.json')
      .then(response => response.json())
      .then(data => setMenuData(data))
      .catch(error => console.error('Error fetching menu data:', error));
  }, []);

  const handleMouseEnter = (content) => {
    setPopupContent(content);
  };

  const handlePopupClose = () => {
    setPopupContent(null);
  };

  return (
    <div className="menu-bar">
      <ul>
        {menuData.map((item, index) => (
          <li
            key={index}
            onMouseEnter={() => handleMouseEnter(item)}
          >
            <span>{item.title}</span>
          </li>
        ))}
      </ul>

      {popupContent && (
        <Popup
          title={popupContent.title}
          sections={popupContent.sections}
          onClose={handlePopupClose}
        />
      )}
    </div>
  );
};

export default MenuBar;
