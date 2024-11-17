const fs = require('fs');

// Paths to your files
const dataFilePath = './data.json';
const idFilePath = './id.json';

// Read the JSON file
fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading data file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        // Filter out objects with the "blank" tag
        const filteredData = Object.values(jsonData).filter(item => !item.tags.includes('blank'));

        // Redistribute the numbering keys
        const redistributedData = {};
        filteredData.forEach((item, index) => {
            redistributedData[(index + 1).toString()] = item;
        });

        // Write the updated data.json back to the file
        fs.writeFile(dataFilePath, JSON.stringify(redistributedData, null, 2), 'utf8', writeErr => {
            if (writeErr) {
                console.error('Error writing data file:', writeErr);
                return;
            }
            console.log('data.json updated successfully.');

            // Update id.json to reflect the number of items in data.json
            const newCount = Object.keys(redistributedData).length;
            fs.writeFile(idFilePath, JSON.stringify(newCount, null, 2), 'utf8', idErr => {
                if (idErr) {
                    console.error('Error writing id file:', idErr);
                    return;
                }
                console.log('id.json updated successfully with count:', newCount);
            });
        });
    } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
    }
});
