# Canto Dictionary - Portfolio Static Version

This is a **static portfolio version** of the Cantonese-English Dictionary app, designed for demonstration purposes on GitHub Pages.

## 🌟 About This Version

This static version allows you to explore all the functionality of the original full-stack application without requiring a backend server. Perfect for portfolio showcases and demonstrations!

### Key Features:
- **Browse & Search**: Explore over 8,000+ Cantonese-English dictionary entries
- **Smart Search**: Relevance-based search with support for English, Cantonese tones, Yale romanisation, and tags
- **Add Words**: Test the add functionality (entries won't persist after page reload)
- **Edit Entries**: Modify existing entries in real-time (changes are temporary)
- **Tone Conversion**: Automatic conversion between Yale romanisation and numbered tones
- **Educational Content**: Access learning materials via the interactive menu

### ⚠️ Portfolio Demo Limitations:
- Changes are **not saved permanently** - they reset on page refresh
- Bulk import functionality is disabled
- No user authentication or data persistence

## 🚀 Live Demo

**View the live demo:** [https://lachy.github.io/canto](https://lachy.github.io/canto)

## 🛠️ Technical Implementation

### Architecture Changes for Static Version:
- **Client-side state management**: Replaced backend API calls with React hooks
- **Local data loading**: Dictionary data loaded from JSON at build time
- **No external dependencies**: Removed axios and backend communication
- **GitHub Pages ready**: Optimised build configuration for static hosting

### Technology Stack:
- **Frontend**: React 18, CSS3, HTML5
- **Build Tool**: Create React App
- **Deployment**: GitHub Pages
- **Data**: JSON-based dictionary with 8,100+ entries

## 🔧 Development Setup

### Prerequisites:
- Node.js (v14 or higher)
- npm or yarn

### Running Locally:
```bash
# Clone and switch to static branch
git clone https://github.com/yourusername/canto.git
cd canto
git checkout static-portfolio

# Install dependencies
cd frontend
npm install

# Start development server
npm start
```

### Building for Production:
```bash
cd frontend
npm run build
```

### Deploying to GitHub Pages:
```bash
cd frontend
npm run deploy
```

## 📁 Branch Structure

- **`main`**: Full-stack version with React frontend + Node.js backend
- **`static-portfolio`**: This static version optimised for GitHub Pages

## 🎯 Features Showcase

### 1. Dictionary Search
- Real-time search across multiple fields
- Weighted relevance scoring
- Support for partial matches

### 2. Word Management
- Add new dictionary entries
- Edit existing entries inline
- Automatic tone conversion between formats

### 3. Educational Content
- Interactive menu with learning resources
- Tone conversion tools
- Pronunciation guides

## 📊 Data Source

The dictionary includes over 8,000 Cantonese-English entries featuring:
- **English definitions**
- **Jyutping tone numbers** (e.g., "nei5 hou2")
- **Yale romanisation** (e.g., "néih hóu")  
- **Traditional Chinese characters**
- **Contextual tags** (phrases, questions, cooking, etc.)

## 🤝 Original Project

This static version is derived from the full-stack Canto Dictionary project, originally built to support Cantonese language learning. The original includes:
- Express.js backend with RESTful API
- MongoDB database integration
- User authentication
- Persistent data storage
- Bulk import functionality

## 📄 License

MIT License - Feel free to use this for your own portfolio projects!

---

**Note**: This is a portfolio demonstration version. For the full-featured application with data persistence, please see the main branch of this repository. 