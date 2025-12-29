# Smart Issue Board

A full-stack React + Firebase project for tracking issues, created for internship assignment submission.

---

## Features

- **User Authentication:** Login and signup with Firebase Email/Password
- **Create Issues:** Title, description, priority, status, and assign to email
- **Similar Issue Detection:** Shows a confirmation if a similar issue already exists
- **Status Rule:** Prevents Open → Done transition directly
- **Issue List:** Shows all issues, sorted by newest first
- **Filters:** Filter issues by Status and Priority

---

## Tech Stack

- **Frontend:** React + Vite + JavaScript
- **Backend/Database:** Firebase Firestore
- **Authentication:** Firebase Auth

---

## Firebase Setup

1. Create Firebase project and Web App
2. Copy Firebase config into `.env` file
3. Use environment variables in `firebase.js`
4. Firestore Rules (for production):

:


