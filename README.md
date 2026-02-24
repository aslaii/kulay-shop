# Shopping Cart App

A React Native application demonstrating a product catalog and shopping cart system with real-time updates and voucher support.

## Project Overview

This application allows users to browse a list of static products, add items to a cart, manage quantities, and apply discount vouchers. It is built with Expo and utilizes modern React Native development practices.

### Features

- Static product list with detailed information.
- Real-time cart management (Add, Remove, Update Quantity).
- Cart summary with subtotal and total calculations.
- Dynamic voucher system (e.g., "discount10").
- High-performance animations and haptic feedback.
- Localization support using i18next.
- Global theme management using Tailwind CSS (NativeWind).

### Technical Stack

- React Native / Expo
- TypeScript
- Expo Router (File-based routing)
- NativeWind (Tailwind CSS for React Native)
- React Native Reanimated (Smooth UI transitions)
- Expo Haptics (Tactile feedback)
- i18next & Expo Localization

## Getting Started

### Prerequisites

- Node.js
- pnpm (recommended) or npm
- Expo Go app on your mobile device or an emulator

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aslaii/kulay-shop.git
   cd kulay-shop
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm start
   ```

### Scripts

- `pnpm start`: Start the Expo development server.
- `pnpm test`: Run linting and type checking.
- `pnpm lint`: Run ESLint.
- `pnpm typecheck`: Run TypeScript compiler checks.

## Development Standards

The project follows strict linting and type-safety rules. Use `pnpm test` before committing changes to ensure code quality.
