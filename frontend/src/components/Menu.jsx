import React, { useState, useEffect } from 'react';
import '../styles/Menu.css';
import Popup from './Popup/Popup';

const MenuBar = ({toggle}) => {
  const [menuData, setMenuData] = useState([]);
  const [popupContent, setPopupContent] = useState(null);
  // const [popup, setPopup] = useState(false);

  // Load the menu data from the JSON file
  useEffect(() => {
    fetch('/menu.json')
      .then(response => response.json())
      .then(data => setMenuData(data))
      .catch(error => console.error('Error fetching menu data:', error));
  }, []);

  const handleMouseEnter = (content) => {
    setPopupContent(content);
    // setPopup(true);
  };

  const handlePopupClose = () => {
    setPopupContent(null);
    // setPopup(false);
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
          toggle={toggle}
        />
      )}
    </div>
  );
};

export default MenuBar;
