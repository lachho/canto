const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { updateWord } = require('../frontend/src/components/Convert.jsx');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, './data.json');
const idFilePath = path.join(__dirname, './id.json');
const newId = () => {
	let count = readFile(idFilePath);
	count++;
	writeFile(count, idFilePath);
	return count;
}

// Function to read data from the JSON file
const readDataFromFile = () => {
	return readFile(dataFilePath);
}

const readFile = (file) => {
	if (!fs.existsSync(file)) {
		return null; // Return empty array if file does not exist
	}
	const data = fs.readFileSync(file);
	return JSON.parse(data);
};

// Function to write data to the JSON file
const writeDataToFile = (data) => {
	return writeFile(data, dataFilePath);
}
	
const writeFile = (data, file) => {
	fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// Basic Route
app.get('/', (req, res) => {
	res.send('API is running...');
});

const convertToObject = (body) => {
	const { english, tone, yale, chinese, tagString } = body;
	console.log(tagString);
	const tags = tagString.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag !== '');
	return { english, tone, yale, chinese, tags};
}

// Add a new word
app.post('/words', (req, res) => {
	console.log('Received data:', req.body);
	const words = readDataFromFile();
	
	// Add new word to the existing words
	words[newId()] = convertToObject(req.body);
	// words.push(convertToObject(req.body));
	
	// Write updated words back to file
	writeDataToFile(words);
	console.log('new word:', words);
	
	res.status(201).json(req.body);
});

app.get('/words', (req, res) => {
	const words = readDataFromFile();
	console.log('updated frontend dictionary');

	res.status(201).json(words);
});

app.post('/mass-add', (req, res) => {
	const { wordsArray } = req.body;
	const words = readDataFromFile();
	console.log(wordsArray);
  
	wordsArray.forEach(row => {
		words[newId()] = convertToObject(row);
		// words.push(convertToObject(row));
	});
  
	writeDataToFile(words);
  
	res.status(201).json({ message: 'Bulk Words successfully added' });
  });

app.put('/edit', (req, res) => {
	const { id, key, value } = req.body;
  
	try {
		const words = readDataFromFile();	
		const updated = updateWord(words, id, key, value);

		writeDataToFile(updated); // Writes back the updated data
		console.log("successful edit.");
		res.status(200).json({ message: 'Word updated successfully', updatedWord: updated });
	} catch (error) {
		console.error('Error updating word:', error);
		res.status(500).json({ error: 'An error occurred while updating the word' });
	}
});
  

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
