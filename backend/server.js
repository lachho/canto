const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'data.json');

// Function to read data from the JSON file
const readDataFromFile = () => {
    if (!fs.existsSync(dataFilePath)) {
        return []; // Return empty array if file does not exist
    }
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

// Function to write data to the JSON file
const writeDataToFile = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running.LSADALKS..');
});

const addTagAndTime = (body) => {
    const { english, tone, yale, chinese, tagString } = body;
    console.log(tagString);
    const tags = tagString.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag !== '');
    const time = new Date().toISOString();
    return { english, tone, yale, chinese, tags, time};
}

// Add a new word
app.post('/words', (req, res) => {
    console.log('Received data:', req.body);
    const words = readDataFromFile();
    
    // Add new word to the existing words
    words.push(addTagAndTime(req.body));
    
    // Write updated words back to file
    writeDataToFile(words);
    console.log(words);
    
    res.status(201).json(newWord);
});

app.get('/words', (req, res) => {
    
    const words = readDataFromFile();
    console.log('db:', words);

    res.status(201).json(words);
});

// const convertToObject = (body) => {
//     const [ english, tone, yale, chinese, tagString ] = body;
//     return addTagAndTime({english, tone, yale, chinese, tagString})
// }

app.post('/mass-add', (req, res) => {
    const { wordsArray } = req.body;
    const words = readDataFromFile();
    console.log(wordsArray);
  
    wordsArray.forEach(row => {
        words.push(addTagAndTime(row));
    });
  
    writeDataToFile(words);
  
    res.status(201).json({ message: 'Bulk Words successfully added' });
  });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
