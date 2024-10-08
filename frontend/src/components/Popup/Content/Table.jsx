import React from 'react';
import '../../../styles/Table.css';

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const Table = ({ content }) => {
  const headers = content.length > 0 ? Object.keys(content[0]) : [];

  return (
    <div className="table-container">
      <table className="custom-table" role="table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="table-header" scope="col">
                {toTitleCase(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <td key={cellIndex} className="table-content">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
