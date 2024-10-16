import React, { useState, useEffect, } from 'react';
import '../../styles/Table.css';
import Edit from './Edit'
import axios from 'axios';
import { updateWord } from '../Convert';


const Dictionary = ({ search, dictionary, setDictionary }) => {
  const [searchTerms, setSearchTerms] = useState([]);
  const [filteredWords, setFilteredWords] = useState(dictionary);

  const editDictionary = async (id, key, value) => {
    try {
      await axios.put('http://localhost:5000/edit', {id, key, value});
      console.log('Value Updated:', id, key, value);
    } catch (error) {
      console.error('Error adding word:', error);
    }
  }

  const handleUpdate = (id, key, value) => {
    // const updatedWords = { ...dictionary }; // Create a shallow copy of the dictionary object
    // const wordToUpdate = updatedWords[id]; // Get the word to update using the id as the key
    // console.log("word changed", id, updatedWords);
    // if (wordToUpdate) {
    //   wordToUpdate[key] = value; // Update the specific field
      
    //   if (key === 'tone') {
    //     wordToUpdate.yale = toAccent(value); // Update 'yale' field based on 'tone'
    //   }
    //   if (key === 'yale') {
    //     wordToUpdate.tone = toNumber(value); // Update 'tone' field based on 'yale'
    //   }

    setDictionary(updateWord(dictionary, id, key, value)); // Update the local state
    editDictionary(id, key, value); // Call the function to update the backend
  };

  // Set a delay for search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (search.trim()) {
        setSearchTerms(search.trim().toLowerCase().split(/\s+/));
      } else {
        setSearchTerms([]); // Reset search terms if input is empty
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);
  
  const relevanceScore = (word) => {
    let score = 0;
    const keys = Object.keys(word);
  
    // Iterate over the word keys and apply weights based on the column position
    keys.forEach((key) => {
      let weight;
      if (key === "tone") {
        weight = 3;
      } else if (key === "yale") {
        weight = 3;
      } else {
        weight = 1;
      }

      searchTerms.forEach((term) => {
        let wordsArray = word[key].toString().toLowerCase().split(/\s+/);
      
        if (key === "tone") {
          wordsArray = wordsArray.map((w) => w.replace(/\d+$/, ''));
        }

        if (wordsArray.includes(term)) {
          score += 10 * weight;
        }
        else if (word[key].toString().toLowerCase().includes(term)) {
          score += 1 * weight; // Lower score for partial matches, biased to the left
        }
      });
    });

    return score;
  };

  // useEffect(() => {
  //   setFilteredWords(searchTerms.length
  //     ? Object.values(dictionary) // Convert the dictionary object to an array
  //         .map((word) => ({
  //           ...word,
  //           score: relevanceScore(word), // Calculate the score for each word
  //         }))
  //         .filter((word) => word.score > 0) // Keep only words with a score > 0
  //         .sort((a, b) => b.score - a.score) // Sort by score in descending order
  //     : Object.values(dictionary)); // If search is empty, return the whole dictionary as an array
  // }, [dictionary, searchTerms]);

  useEffect(() => {
    const filtered = searchTerms.length
      ? Object.entries(dictionary) // Convert the dictionary object to an array of [key, value] pairs
          .map(([key, word]) => ({
            id: key, // Keep the key (ID)
            score: relevanceScore(word), // Calculate the score for each word
          }))
          .filter(word => word.score > 0) // Keep only words with a score > 0
          .sort((a, b) => b.score - a.score) // Sort by score in descending order
      : Object.keys(dictionary).map(id => ({ id, score: 0 })); // If search is empty, set score to 0 for all words
  
    setFilteredWords(filtered); // Set filtered words with their IDs and scores
  }, [dictionary, searchTerms]);
  
  

  return (
    <div className="table-container">
      <table className="custom-table" role="table">
        <thead>
          <tr>
            {dictionary && Object.keys(dictionary).length > 0 &&
              Object.keys(dictionary[Object.keys(dictionary)[0]])
                .map((key, index) => (
                  <th className="table-header" key={index}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </th>
                ))}
          </tr>
        </thead>
        <tbody>
          {filteredWords.length > 0 ? (
            filteredWords.map(({ id }) => ( // Use `id` to get the corresponding word from `dictionary`
              <tr key={id}>
                {Object.keys(dictionary[id]).map((field) => {
                  if (field === 'score') return null;
                  const cellValue = field === 'tags'
                    ? dictionary[id][field].join(', ') // Get the field value from `dictionary`
                    : dictionary[id][field];
                  return (
                    <td className="table-content" key={field}>
                      <Edit
                        value={cellValue}
                        onUpdate={(newValue) => handleUpdate(id, field, newValue)}
                      />
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr> 
              <td> No results found </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dictionary;
