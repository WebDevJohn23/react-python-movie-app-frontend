# React Movie App (Frontend)

**Author:** WebDevJohn23  
**License:** MIT  
**Status:** Active

---

## Overview

This repository contains the **frontend** for the React Movie App.  
It connects to a separate Python Flask backend hosted on Render that provides live movie data scraped from Regal Cinemas.

---

## Features

- Displays current movies fetched from a Flask API
- Flip-card UI to mark movies as watched or not interested
- Filters special screenings and re-releases
- Responsive layout for desktop and mobile
- Environment-based API configuration (local vs. production)

---

## Tech Stack

- React + Vite
- CSS3
- Fetch API for backend integration
- Deployed on **Vercel**

**Backend:**  
Python (Flask + Playwright) – hosted separately at  
`https://python-movie-app.onrender.com`

---

## Setup

### 1. Clone
```bash
git clone https://github.com/WebDevJohn23/react-python-movie-app-frontend.git
cd react-python-movie-app-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment variable
Create a `.env` file:
```bash
VITE_API_URL=https://python-movie-app.onrender.com
```

### 4. Run locally
```bash
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173)

---

## Deployment

This frontend is deployed to **Vercel**.  
Environment Variables on Vercel:
```
VITE_API_URL = https://python-movie-app.onrender.com
```

Build settings:
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

---

## Project Structure
```
react-python-movie-app-frontend/
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── ...
├── public/
│   └── favicon.ico
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## API Endpoints (from Flask backend)

| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/api/movies` | GET | Returns movie list as JSON |
| `/api/movies/<code>/status` | PUT | Updates movie status (watched / not interested) |

---

## License

This project is licensed under the **MIT License**.  
See `LICENSE` for details.

---

## Author

**Johnathan Julig**  
Portfolio: [portfolio.johnathanjulig.com](https://portfolio.johnathanjulig.com)  
GitHub: [@WebDevJohn23](https://github.com/WebDevJohn23)
