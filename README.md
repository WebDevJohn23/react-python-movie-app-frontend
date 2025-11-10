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
