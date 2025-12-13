# Cinema House 🎬

A comprehensive movies and TV shows discovery platform built with React.

🌐 **Live Demo:** [https://cinema-house.vercel.app](https://cinema-house.vercel.app)

## Description

Cinema House is a full-stack movies and TV shows website using TMDB API for data and AuthStack backend for authentication.

🔗 **Backend Repository:** [AuthStack](https://github.com/Mohamed-Hashem/AuthStack)

---

## Technologies Used

| Category       | Technologies                                      |
| -------------- | ------------------------------------------------- |
| Frontend       | React.js, Redux, Redux Thunk, React Router        |
| Styling        | Bootstrap, SASS/SCSS, CSS                         |
| Backend        | AuthStack (Node.js, Express.js, MongoDB Atlas)    |
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

- [x] **Image Optimization**: Smart TMDB image sizing system (w342, w500, w780 vs original), ~95% size reduction (1.5MB → 50KB per image)
- [x] **Lazy Loading**: Native lazy loading on all carousel and grid images with loading="lazy" attribute
- [x] **Code Splitting**: Named webpack chunks with webpackChunkName comments for better caching
    - `actors-list` (1.72 KB), `actor-detail` (2.49 KB), `tv-detail` (3.71 KB), `movie-detail` (3.61 KB)
    - Eliminated cross-route code leakage (TV code no longer loads on Actor pages)
- [x] **Optimized Image Delivery**: Reduced network payload from 93 MB to under 5 MB (~95% reduction)
    - Carousel posters: original (1-1.5 MB) → w342 (~30-50 KB)
    - Detail page posters: original (1-1.5 MB) → w500 (~50-80 KB)
    - Backdrop images: original (1-2 MB) → w780 (~100-200 KB)
    - Episode stills: original (500 KB) → w300 (~30 KB)
- [x] **Loading States**: Skeleton cards (10 per page) for consistent UX during data fetching
- [x] **Caching Strategy**: 1-year cache for static assets (462 KiB savings), immutable resources
- [x] **Security Headers**: X-Content-Type-Options, X-Frame-Options, XSS Protection, Referrer-Policy
- [x] **Resource Hints**: Preconnect, DNS prefetch for TMDB API and images (310 ms savings)
- [x] **CSS Optimization**: Custom Bootstrap build with only used components (34 KiB savings)
- [x] **Font Loading**: font-display: swap for Montserrat Alternates (prevents FOIT)
- [x] **SEO**: robots.txt, sitemap.xml, meta tags optimization
- [x] **Compression**: Background image optimization with content-visibility
- [x] **Memoization**: React.memo for components, useCallback/useMemo for values
- [x] **Abort Controllers**: Cancel API requests on unmount
- [x] **Intersection Observer**: Infinite scroll optimization
- [x] **Debounced/Throttled**: Search inputs and scroll handlers
- [x] **Custom Hooks**: Reusable useApi, useDebounce, useThrottle, useInfiniteScroll
- [x] **Centralized API**: Single axios instance with interceptors (49% code reduction)
- [x] **ES6+ Modern Syntax**: Arrow functions, destructuring, template literals
- [x] **Image Utils Module**: Centralized image size management for consistent optimization

**Expected Lighthouse Improvements:**

- Image Delivery: 11.8 MB savings (95%+ reduction)
- Total Blocking Time: Reduced via lazy loading
- INP (Interaction to Next Paint): Improved from fewer main-thread image decodes
- Cumulative Layout Shift: Minimized with proper image dimensions

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
- [x] Image optimization utilities (imageUtils.js)
- [x] ESLint and Prettier configuration
- [x] Consistent code formatting
- [x] Zero ESLint warnings/errors

### 🎨 Reusable Components

- [x] FormInput - Form input with validation
- [x] MessageBanner - Success/Error/Info banners
- [x] InfoItem - Display labeled information
- [x] PageState - Loading and error state wrapper
- [x] PasswordChangeForm - Secure password change
- [x] LoadingSpinner - Customizable loading indicator
- [x] ErrorBoundary - Error boundary wrapper
- [x] ImageWithFallback - Images with fallback support and error handling
- [x] SkeletonCard - Loading skeleton UI (10 items per page)
- [x] PosterModal - Image modal viewer
- [x] ImageGallery - Optimized image gallery carousel with memoized navigation
- [x] Actor, Movie, Serie - Optimized card components with lazy loading

### 🔧 Code Quality & Architecture

- [x] DRY principles (Don't Repeat Yourself)
- [x] Separation of concerns
- [x] Centralized API services (tmdbService, authService, dataService)
- [x] Utility-first helper functions (imageUtils, validation, profileHelpers, apiHelpers)
- [x] Consistent validation logic across frontend/backend
- [x] Clean code structure with minimal duplication
- [x] Modular component architecture
- [x] Single source of truth for business logic
- [x] ES6+ modern JavaScript syntax
- [x] Consistent code formatting with Prettier
- [x] ESLint configuration for code quality (0 warnings, 0 errors)
- [x] React Hooks best practices (proper dependency arrays)

---

## Project Structure

```
cinema-house-frontend/
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
    │   ├── imageUtils.js   # TMDB image optimization (w342, w500, w780)
    │   └── apiHelpers.js   # API helper utilities
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
- TMDB API key

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/Mohamed-Hashem/cinema-house-frontend.git
    cd cinema-house-frontend
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Create `.env` file** in root directory:

    ```env
    REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
    REACT_APP_BACKEND_URL=your_backend_api_url
    SKIP_PREFLIGHT_CHECK=true
    DISABLE_ESLINT_PLUGIN=true
    ```

4. **Get TMDB API Key**
    - Visit [TMDB API](https://www.themoviedb.org/settings/api)
    - Create an account and request an API key
    - Copy the API key to your `.env` file

### Running the App

**Development mode:**

```bash
npm start
# or
yarn start
```

Visit `http://localhost:3000`

**Production build:**

```bash
npm run build
# or
yarn build
```

### Deployment (Vercel)

1. **Install Vercel CLI** (optional)

    ```bash
    npm install -g vercel
    ```

2. **Add Environment Variables in Vercel Dashboard:**
    - Go to your project → Settings → Environment Variables
    - Add `REACT_APP_TMDB_API_KEY` with your TMDB API key
    - Add `REACT_APP_BACKEND_URL` with `your_backend_api_url`
    - Add `SKIP_PREFLIGHT_CHECK` with value `true`
    - Add `DISABLE_ESLINT_PLUGIN` with value `true`

3. **Deploy:**
    ```bash
    vercel --prod
    ```

**Important:** Make sure the AuthStack backend has CORS configured to accept requests from your Cinema House domain.

---

## Backend API Documentation

The backend is powered by **AuthStack** - a secure authentication and user management API.

🔗 **Repository:** [https://github.com/Mohamed-Hashem/AuthStack](https://github.com/Mohamed-Hashem/AuthStack)

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

### 🚀 Major Performance Overhaul (December 2025)

**Image Optimization System** (~95% Size Reduction)
✅ Created centralized `imageUtils.js` module with smart TMDB image sizing  
✅ Updated 20+ components to use optimized image sizes instead of `/original/`  
✅ Carousel images: 1.5MB → 30-50KB (w342)  
✅ Detail page images: 1.5MB → 50-80KB (w500)  
✅ Backdrop images: 2MB → 100-200KB (w780)  
✅ Episode stills: 500KB → 30KB (w300)  
✅ Total network payload: 93MB → under 5MB per page load

**Lazy Loading Implementation**
✅ Added `loading="lazy"` to 12+ carousel components  
✅ Reduced Initial DOM rendering and main-thread blocking  
✅ Improved Interaction to Next Paint (INP) metric  
✅ Better Total Blocking Time (TBT) scores

**Code Splitting Enhancements**
✅ Named webpack chunks with `webpackChunkName` comments  
✅ Separated route bundles: actors-list (1.72KB), actor-detail (2.49KB), tv-detail (3.71KB)  
✅ Eliminated cross-route code contamination (TV code no longer loads on Actor pages)  
✅ Better browser caching with consistent chunk names

**Skeleton Loading States**
✅ Consistent 10-item skeleton cards across all list pages  
✅ Improved perceived performance during data fetching  
✅ Better user experience with visual feedback

### Frontend Performance Optimizations

✅ Optimized API service layer with 49% code reduction  
✅ Memoized carousel navigation buttons  
✅ Enhanced ImageGallery with responsive configuration  
✅ Added useDebouncedCallback hook for optimized callbacks  
✅ Reduced LoadingSpinner component by 48%  
✅ Converted components to ES6+ arrow functions  
✅ Enhanced poster components with error handling and fallback images  
✅ Improved accessibility with better alt text  
✅ Fixed React Hooks ESLint warnings in Actor, Movie, Serie components

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
- **AuthStack Docs:** [https://github.com/Mohamed-Hashem/AuthStack](https://github.com/Mohamed-Hashem/AuthStack)

---

## License

This project is open source and available under the [MIT License](LICENSE).
