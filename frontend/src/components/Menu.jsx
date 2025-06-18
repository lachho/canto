import React, { useState, useEffect } from 'react';
import '../styles/Menu.css';
import Popup from './Popup/Popup';
import menuDataImport from '../data/menuData.json';

const MenuBar = ({toggle}) => {
  const [menuData, setMenuData] = useState([]);
  const [popupContent, setPopupContent] = useState(null);

  useEffect(() => {
    setMenuData(menuDataImport);
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
          toggle={toggle}
        />
      )}
    </div>
  );
};

export default MenuBar;
