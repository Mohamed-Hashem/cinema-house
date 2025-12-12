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
| Security       | Helmet, CORS                                      |
| Performance    | Compression (gzip), Memoization, Code Splitting   |
| API            | TMDB API                                          |
| Validation     | Joi, Custom validation utilities                  |
| UI Libraries   | React Icons, React Toastify, React Alice Carousel |
| HTTP Client    | Axios with interceptors                           |

---

## Features Checklist

### 🔐 Authentication

- [x] User Registration with validation
- [x] User Login with JWT tokens
- [x] Protected Routes
- [x] Token persistence in localStorage
- [x] Token verification with auto-logout
- [x] Logout functionality
- [x] Automatic token refresh on requests
- [x] Centralized authentication service

### 👤 User Profile & Account Management

- [x] User profile page with dynamic data
- [x] View profile information (name, age, email)
- [x] Edit profile with inline validation
- [x] Update profile (first name, last name, age)
- [x] Change password functionality
- [x] Account statistics (member since, last updated, account age)
- [x] User avatar with initials
- [x] Real-time form validation
- [x] Success/error notifications
- [x] Loading states for async operations

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
- [x] Memoized navigation buttons in carousels
- [x] Abort controllers for API requests
- [x] Intersection Observer for infinite scroll
- [x] Debounced/throttled handlers
- [x] useDebouncedCallback hook for optimized callbacks
- [x] Custom hooks for reusability
- [x] Code splitting with React.lazy
- [x] Optimized re-renders with useCallback/useMemo
- [x] Centralized API service layer (49% code reduction)
- [x] Optimized LoadingSpinner component (48% code reduction)
- [x] ES6+ arrow functions throughout codebase
- [x] Responsive carousel configuration

### 🛠️ Technical Features

- [x] Redux state management
- [x] Class and Functional components
- [x] Custom React hooks (useApi, usePaginatedApi, useDebounce, useDebouncedCallback, useThrottle, useAbortController, useNavigation, useInfiniteScroll)
- [x] Error handling with try-catch
- [x] Environment variables for API keys
- [x] Hash-based routing
- [x] Axios interceptors for auth
- [x] Centralized error handling
- [x] Reusable validation utilities
- [x] Helper functions for data formatting
- [x] ESLint and Prettier configuration
- [x] Consistent code formatting

### 🎨 Reusable Components

- [x] FormInput - Form input with validation
- [x] MessageBanner - Success/Error/Info banners
- [x] InfoItem - Display labeled information
- [x] PageState - Loading and error state wrapper
- [x] PasswordChangeForm - Secure password change
- [x] LoadingSpinner - Customizable loading indicator
- [x] ErrorBoundary - Error boundary wrapper
- [x] ImageWithFallback - Images with fallback support and error handling
- [x] SkeletonCard - Loading skeleton UI
- [x] PosterModal - Image modal viewer
- [x] ImageGallery - Optimized image gallery carousel with memoized navigation

### 🔧 Code Quality & Architecture

- [x] DRY principles (Don't Repeat Yourself)
- [x] Separation of concerns
- [x] Centralized API services (tmdbService, authService, dataService)
- [x] Utility-first helper functions
- [x] Consistent validation logic across frontend/backend
- [x] Clean code structure with minimal duplication
- [x] Modular component architecture
- [x] Single source of truth for business logic
- [x] ES6+ modern JavaScript syntax
- [x] Consistent code formatting with Prettier
- [x] ESLint configuration for code quality

---

## Project Structure

```
cinema-house-frontend/
├── backend-server/          # Express.js backend
│   ├── models/              # MongoDB models
│   │   └── User.js         # User model with timestamps
│   ├── routes/              # API routes
│   │   ├── auth.js         # Authentication endpoints
│   │   └── data.js         # Profile & stats endpoints
│   ├── middleware/          # Auth middleware
│   │   └── auth.js         # JWT verification
│   ├── utils/               # Backend utilities
│   │   ├── validation.js   # Validation helpers
│   │   └── helpers.js      # Response formatters
│   └── README.md           # Backend documentation
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
    │       ├── FormInput.jsx         # Form input component
    │       ├── MessageBanner.jsx     # Message displays
    │       ├── InfoItem.jsx          # Info display
    │       ├── PageState.jsx         # Page state wrapper
    │       ├── PasswordChangeForm.jsx # Password form
    │       ├── LoadingSpinner.jsx    # Loading component
    │       └── ErrorBoundary.jsx     # Error handler
    ├── hooks/               # Custom React hooks
    │   ├── useApi.js       # API request hook
    │   ├── useDebounce.js  # Debounce hook
    │   ├── useThrottle.js  # Throttle hook
    │   └── useInfiniteScroll.js # Infinite scroll
    ├── Pages/
    │   ├── About/           # Detail pages
    │   ├── Home/            # Home page
    │   ├── Login/           # Login page
    │   ├── Movies/          # Movies listing
    │   ├── Profile/         # User profile page
    │   ├── Register/        # Registration page
    │   ├── Search/          # Search results
    │   ├── Series/          # Series listing
    │   └── Tv/              # TV shows listing
    ├── Redux/               # State management
    │   ├── Actions/         # Redux actions
    │   ├── Reducer/         # Redux reducers
    │   └── Store/           # Redux store
    ├── services/            # API services
    │   └── api.js          # Centralized API layer
    ├── utils/               # Utility functions
    │   ├── validation.js   # Form validation
    │   ├── profileHelpers.js # Profile utilities
    │   ├── routes.js       # Route constants
    │   └── imageUtils.js   # Image helpers
    └── Scss/                # Global styles
        ├── color.scss      # Color variables
        ├── mixin.scss      # SCSS mixins
        └── scrollbar.scss  # Custom scrollbar
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
2. Install frontend dependencies
3. Install backend dependencies
4. Create `.env` file in root directory with TMDB API key and backend URL
5. Configure backend `.env` file with MongoDB URI, JWT secret, and server settings

### Running the App

- Start frontend development server
- Start backend server

---

## Backend API Documentation

For detailed backend API documentation, routes, and endpoints, see [Backend README](backend-server/README.md).

### Available API Routes

#### Authentication (`/api/auth`)

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

#### User Profile (`/api`)

- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `PUT /api/change-password` - Change password
- `GET /api/stats` - Get user statistics

---

## Recent Enhancements

### Frontend Performance Optimizations

✅ Optimized API service layer with 49% code reduction  
✅ Memoized carousel navigation buttons  
✅ Enhanced ImageGallery with responsive configuration  
✅ Added useDebouncedCallback hook for optimized callbacks  
✅ Reduced LoadingSpinner component by 48%  
✅ Converted components to ES6+ arrow functions  
✅ Enhanced poster components with error handling and fallback images  
✅ Improved accessibility with better alt text

### Backend Security & Performance

✅ Added Helmet for security headers  
✅ Implemented gzip compression  
✅ Database connection retry logic (5 retries with delay)  
✅ Optimized database queries with .lean()  
✅ Reduced validation utilities by 45%  
✅ Clean codebase without comments

### Architecture Improvements

✅ Centralized API service layer with axios instances  
✅ Reusable validation utilities (frontend & backend)  
✅ Helper functions for data formatting and error handling  
✅ Removed all code duplication and redundancy  
✅ Created reusable form components  
✅ Implemented consistent error handling patterns

### Profile Page Enhancements

✅ Complete profile management system  
✅ Edit profile with validation  
✅ Change password functionality  
✅ Account statistics display  
✅ Loading and error states  
✅ Success/error notifications  
✅ Responsive design for mobile

### Code Quality

✅ ESLint and Prettier configuration  
✅ Consistent code formatting across codebase  
✅ Reduced Profile.jsx from 383 to 238 lines (-38%)  
✅ Reduced backend data.js from 170 to 97 lines (-43%)  
✅ Eliminated duplicate validation logic  
✅ Single source of truth for business logic  
✅ Consistent patterns across codebase

---

## API Reference

- **TMDB API:** [https://developers.themoviedb.org/3](https://developers.themoviedb.org/3)
- **Backend API:** See [Backend Documentation](backend-server/README.md)

---

## License

This project is open source and available under the [MIT License](LICENSE).
