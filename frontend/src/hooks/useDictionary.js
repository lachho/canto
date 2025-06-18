import { useState, useEffect } from 'react';
import initialData from '../data/initialData.json';

export const useDictionary = () => {
  const [dictionary, setDictionary] = useState({});
  const [nextId, setNextId] = useState(1);

  // Load initial data on first render
  useEffect(() => {
    setDictionary(initialData);
    // Find the highest ID to set nextId
    const maxId = Math.max(...Object.keys(initialData).map(Number));
    setNextId(maxId + 1);
  }, []);

  const addWord = (wordData) => {
    const newId = nextId.toString();
    const newWord = {
      english: wordData.english,
      tone: wordData.tone,
      yale: wordData.yale,
      chinese: wordData.chinese || '',
      tags: wordData.tagString ? wordData.tagString.split(',').map(tag => tag.trim()) : []
    };
    
    setDictionary(prev => ({
      ...prev,
      [newId]: newWord
    }));
    
    setNextId(prev => prev + 1);
    return newWord;
  };

  const updateWord = (id, key, value) => {
    setDictionary(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: key === 'tags' ? value.split(',').map(tag => tag.trim()) : value
      }
    }));
  };

  const deleteWord = (id) => {
    setDictionary(prev => {
      const newDict = { ...prev };
      delete newDict[id];
      return newDict;
    });
  };

  return {
    dictionary,
    addWord,
    updateWord,
    deleteWord
  };
}; 