# Cinema House 🎬

A comprehensive movies and TV shows discovery platform built with React.

🌐 **Live Demo:** [https://cinema-house.netlify.app/](https://cinema-house.netlify.app/)

🌐 **Azure Mirror:** [https://lively-field-0a9a2621e.azurestaticapps.net](https://lively-field-0a9a2621e.azurestaticapps.net)

## Description

Cinema House is a full-stack movies and TV shows website using TMDB API for data and Node.js/Express backend for authentication.

---

## Technologies Used

| Category       | Technologies                                      |
| -------------- | ------------------------------------------------- |
| Frontend       | React.js, Redux, Redux Thunk, React Router        |
| Styling        | Bootstrap, SASS/SCSS, CSS                         |
| Backend        | Node.js, Express.js, MongoDB Atlas                |
| Authentication | JWT, bcrypt                                       |
| API            | TMDB API                                          |
| Validation     | joi-browser                                       |
| UI Libraries   | React Icons, React Toastify, React Alice Carousel |

---

## Features Checklist

### 🔐 Authentication

- [x] User Registration with validation
- [x] User Login with JWT tokens
- [x] Protected Routes
- [x] Token persistence in localStorage
- [x] Logout functionality

### 🏠 Home Page

- [x] Trending Movies carousel
- [x] Trending TV Shows carousel
- [x] Popular Actors carousel
- [x] Responsive grid layout
- [x] Loading spinners

### 🎬 Movies

- [x] Browse all movies with infinite scroll
- [x] Movie details page
- [x] Movie poster gallery
- [x] Movie cast/actors list
- [x] Similar movies recommendations
- [x] Movie recommendations
- [x] Movie rating system (TMDB)
- [x] Video trailer (YouTube embed)
- [x] Torrent download link

### 📺 TV Shows

- [x] Browse all TV series with infinite scroll
- [x] TV show details page
- [x] TV show poster gallery
- [x] TV show cast/actors list
- [x] Similar TV shows recommendations
- [x] TV show recommendations
- [x] Series rating system
- [x] Video trailer (YouTube embed)
- [x] Season listing
- [x] Episode details per season

### 👥 People/Actors

- [x] Browse popular people
- [x] Actor details page
- [x] Actor photo gallery
- [x] Actor movie credits
- [x] Actor TV show credits
- [x] Actor popular works

### 🔍 Search

- [x] Multi-search (movies, TV, people)
- [x] Real-time search results
- [x] Infinite scroll for search results
- [x] Debounced search input
- [x] URL-based search queries

### 🎨 UI/UX Features

- [x] Responsive design (mobile, tablet, desktop)
- [x] Dynamic navbar (transparent/solid)
- [x] Scroll to top button
- [x] Image carousels (Alice Carousel)
- [x] Loading states with spinners
- [x] Error boundaries
- [x] Toast notifications
- [x] Rating badges (color-coded)
- [x] Hover effects on cards
- [x] Custom scrollbar styling

### ⚡ Performance Optimizations

- [x] Lazy loading images
- [x] Memoized components (React.memo)
- [x] Abort controllers for API requests
- [x] Intersection Observer for infinite scroll
- [x] Debounced/throttled handlers
- [x] Custom hooks for reusability

### 🛠️ Technical Features

- [x] Redux state management
- [x] Class and Functional components
- [x] Custom React hooks
- [x] Error handling with try-catch
- [x] Environment variables for API keys
- [x] Hash-based routing

---

## Project Structure

```
cinema-house-frontend/
├── backend-server/          # Express.js backend
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   └── middleware/          # Auth middleware
├── public/                  # Static files
└── src/
    ├── Components/
    │   ├── Actors/          # Actor carousels
    │   ├── Footer/          # Footer component
    │   ├── Navbar/          # Navigation & search
    │   ├── Rating/          # Star rating
    │   ├── Recommendations/ # Movie/TV recommendations
    │   ├── ScrollToTop/     # Scroll button
    │   ├── ShowImages/      # Image galleries
    │   ├── Tv Seasons/      # Season/episode components
    │   └── shared/          # Reusable components
    ├── hooks/               # Custom React hooks
    ├── Pages/
    │   ├── About/           # Detail pages
    │   ├── Home/            # Home page
    │   ├── Login/           # Login page
    │   ├── Movies/          # Movies listing
    │   ├── People/          # People listing
    │   ├── Register/        # Registration page
    │   ├── Search/          # Search results
    │   ├── Series/          # Series listing
    │   └── Tv/              # TV shows listing
    ├── Redux/               # State management
    └── Scss/                # Global styles
```

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account
- TMDB API key

### Installation

1. Clone the repository

```bash
git clone https://github.com/mohamed-hashem/cinema-house-frontend.git
cd cinema-house-frontend
```

2. Install frontend dependencies

```bash
npm install
```

3. Install backend dependencies

```bash
cd backend-server
npm install
```

4. Create `.env` file in root directory

```env
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
```

5. Configure backend MongoDB connection in `backend-server/index.js`

### Running the App

**Frontend:**

```bash
npm start
```

**Backend:**

```bash
cd backend-server
node index.js
```

---

## API Reference

- **TMDB API:** [https://developers.themoviedb.org/3](https://developers.themoviedb.org/3)

---

## License

This project is open source and available under the [MIT License](LICENSE).
