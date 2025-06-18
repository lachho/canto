import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Popup.css';
import Content from './Content/Content';

const Popup = ({ title, sections, onClose }) => {
  const popupRef = useRef(null);
  const [openSections, setOpenSections] = useState(
    sections.map((section) => true)
  );

  const toggleSection = (index) => {
    const updatedOpenSections = [...openSections];
    updatedOpenSections[index] = !updatedOpenSections[index];
    setOpenSections(updatedOpenSections);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if Ctrl+V is pressed (clipboard paste)
      if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
        return;
      }

      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (popupRef.current && !popupRef.current.contains(event.target)) {
  //       onClose(); 
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside); // Clean up event listener
  //   };
  // }, [onClose]);

  useEffect(() => {
    const handleMouseLeave = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.relatedTarget)) {
        onClose();
      }
    };

    const popupNode = popupRef.current;
    if (popupNode) {
      popupNode.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (popupNode) {
        popupNode.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [onClose]);

  return (
    <div
      className="popup"
      ref={popupRef}
    >
      <div className="popup-header">
        <h2 className="popup-title"> {title}</h2>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
      <div className="popup-body">
        {sections.map((section, index) => (
          <div key={index} className="popup-section">
            <h3 onClick={() => toggleSection(index)}>
              {section.header}
              <span className={openSections[index] ? 'icon open' : 'icon closed'}>
                {openSections[index] ? '−' : '+'}
              </span>
            </h3>
            {openSections[index] && (
              <div className="section-content">
                {Array.isArray(section.content) ? (
                  section.content.map((part, partIndex) => ( // Added partIndex for a unique key
                    <Content key={partIndex} part={part} />
                  ))
                ) : (
                  <Content part={section.content} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popup;