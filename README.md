# Canto Dictionary 📖

This project was inspired by my Cantonese class at UC Berkeley. I had always wanted to learn Cantonese, my heritage language, but never found the time to commit myself to learning it.

## Project Versions

### 🚀 Full-Stack Version (main branch)
The complete application with backend API, database operations, and full CRUD functionality.

**Features:**
- Add/edit dictionary entries
- Real-time search and filtering 
- Backend API with Express.js
- Data persistence with JSON files

**To run:**
```bash
npm start  # Runs both backend and frontend concurrently
```

### 🌐 Static Portfolio Version (portfolio-static branch)
A static version designed for portfolio demonstration and GitHub Pages deployment.

**Features:**
- Browse and search the dictionary (8000+ entries)
- Static data (no backend required)
- Read-only interface optimised for demonstration
- Ready for GitHub Pages deployment

**To build and deploy:**
```bash
# Build the static version
./build-static.sh

# Deploy to GitHub Pages
cd frontend && npm run deploy
```

## Technical Details

The database contains Cantonese dictionary entries with:
- **English** translations
- **Jyutping** romanisation with tones
- **Yale** romanisation 
- **Traditional Chinese** characters
- **Tags** for categorisation

## Data Sources

This project utilises existing databases across the web. Future databases to explore (ranked in order):
- https://cantowords.com/faiman/analysis/ - json or csv, may need to clean data
- https://jyutdictionary.com/ - database file  
- https://cantonese.org/download.html - in txt format with numbered tones

## Development

```bash
# Switch between versions
git checkout main              # Full-stack version
git checkout portfolio-static  # Static portfolio version
```

Reddit recommendations:
https://www.reddit.com/r/Cantonese/comments/xrnxmp/psa_the_best_cantonese_dictionaries/
"As a side note, CC-Canto is not mentioned because that dictionary is very small and also of a very low quality with lots of errors."


