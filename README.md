# Full Stack(Uber-Clone)

## Overview

A full-stack **React Native** application built with **Expo, NativeWind, and PostgreSql**. This app includes features like user registration, oAuth, live-location and google maps. Find/Select/and paid for transportation service.

## Tech Stack

- **React Native**: For building the mobile app.
- **Expo**: Tooling and workflow for building React Native apps.
- **NativeWind**: Utility-first CSS styling for React Native apps.
- **PostgreSQL (NeonDB)**: Database for user,rides, and drivers.
- **Clerk**: User Authentication.
- **Stripe**: Payment.

## Pages

# Sign-up/Login Page

//unfinish
# Tab Navigation
//unfinish

### Prerequisites

- Node.js (version 14 or higher)
- Expo CLI
- neondb/clerk/stripe/googleApi Account for backend services.

### Installation

1. Clone the repository
2. npm install
3. Set up backend prerequisite for database connection.
4. Setup .env file
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
DATABASE_URL=
EXPO_PUBLIC_GEOAPIFY_APY_KEY=
EXPO_PUBLIC_GOOGLE_API_KEY=
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
EXPO_PUBLIC_SERVER_URL=

6. npx expo start -c
