# 🎵 Musify

Musify is a modern, cross-platform music streaming application built with **React Native**. It features a sleek design, efficient music control, and a seamless experience on both **Android** and **iOS**.

---

## 🚀 Features

- 🎧 Play, pause, and control music playback
- 🏠 Home, Search, Library, and Now Playing screens
- 🔍 Search for your favorite songs
- 🕒 View and manage recently played tracks
- 🧩 Modular component structure
- 📱 Android & iOS support
- 🌈 Styled with Tailwind CSS using NativeWind
- 🔥 Integrated with Firebase

---

## 📂 Project Structure

aashish037-musify/
│
├── App.tsx # Entry point of the application
├── src/ # Source code
│ ├── components/ # Reusable UI components
│ ├── data/ # Static or mock data
│ ├── interfaces/ # TypeScript interfaces
│ ├── screens/ # Screen components (Home, Search, etc.)
│ ├── services/ # API, Firebase, and music player services
│ └── types/ # Type declarations
│
├── android/ # Android-specific code
├── ios/ # iOS-specific code
├── tests/ # Jest test cases
├── tailwind.config.js # Tailwind CSS configuration
├── package.json # Project dependencies and scripts
└── ... # Other configuration files


---

## 🛠️ Installation

### Prerequisites

- Node.js ≥ 14
- npm or yarn
- Expo CLI or React Native CLI
- Android Studio / Xcode (for platform-specific builds)

### Steps

# Clone the repo
git clone https://github.com/aashish037-musify.git
cd aashish037-musify

# Install dependencies
npm install
# or
yarn install

# Start the app
npx react-native run-android
# or
npx react-native run-ios

## 🧬 Tech Stack
React Native – Core framework
TypeScript – Type-safe development
Tailwind CSS (via NativeWind) – Utility-first styling
Firebase – Backend services (auth, database, etc.)
Jest – Unit testing

