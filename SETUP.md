# 7X ESPORTS — FREE LIVE SETUP

This version uses Firebase Firestore + Firebase Authentication.
It is designed so:
- Players register from index.html.
- Everyone sees the same teams/leaderboard.
- Admin logs in at admin.html.
- Admin updates points/kills/status.
- Changes appear live on connected devices.

## 1) Create Firebase project
Go to Firebase Console and create a project.
Add a Web App and copy its Firebase config.

## 2) Enable Firestore
Create Firestore Database.
For the first test, use development mode, then replace the rules with proper authenticated rules before public launch.

Suggested Firestore collections:
teams
matches

## 3) Enable Authentication
Authentication → Sign-in method → Email/Password → Enable.
Create one organizer/admin user.

## 4) Paste config
Open BOTH `app.js` and `admin.js`.
Replace every `PASTE_YOUR_...` value with your Firebase web app config.

## 5) Firestore rules
For a simple test:
- Public users need read access to teams/matches.
- Public users need create access to teams.
- Only authenticated admins should update teams or create matches.

Do NOT publish a database with unrestricted write access.

## 6) Put online for FREE
Upload all 4 website files to GitHub Pages, Netlify, or Cloudflare Pages.
Open index.html through the hosted HTTPS URL.

## 7) What is already working
The UI, registration, live Firestore listeners, admin login, score updates and match publishing are coded.
Only your Firebase project/config and hosting account need to be connected.

NOTE:
Firebase free quotas can change over time. Check the current Firebase pricing/limits before launch.
