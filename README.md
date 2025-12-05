# DavesDash 🍗

A specialized delivery application for Dave's Hot Chicken featuring autonomous vehicle delivery and AI-powered computer vision ordering.

## Features

- 🎨 **Street-art inspired UI** with bold, energetic design
- 🍗 **Full Menu** with customizable spice levels (No Spice to Reaper)
- 📸 **Snap-to-Order** - AI vision analysis to identify menu items from photos
- 🚗 **Waymo Delivery Tracking** - Real-time autonomous vehicle delivery tracking
- 🛒 **Shopping Cart** with full add/remove/quantity management

## Tech Stack

- React 18 with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- Zustand for state management
- React Router for navigation
- Lucide React for icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header
│   ├── MenuCard.jsx        # Menu item card with spice selector
│   ├── Cart.jsx            # Shopping cart component
│   ├── SnapToOrder.jsx     # AI vision ordering feature
│   └── DeliveryTracker.jsx # Waymo delivery tracking
├── pages/
│   └── Home.jsx            # Main menu page
├── store/
│   └── useStore.js         # Zustand state management
├── App.jsx                 # Main app with routing
├── main.jsx                # Entry point
└── index.css               # Global styles
```

## Color Palette

- Primary Red: `#E31837`
- Caution Yellow: `#FFD700`
- Background: Black
- Cards: White

## Spice Levels

1. No Spice
2. Lite Mild
3. Mild
4. Medium
5. Hot
6. Extra Hot
7. Reaper

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

