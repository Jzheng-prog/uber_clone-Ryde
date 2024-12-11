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
# Welcome Screen
<img src=https://github.com/user-attachments/assets/bcfa21b2-4691-4d84-8964-ee2271397de6 width="300"/>
<img src=https://github.com/user-attachments/assets/86b7a9a7-f72d-44b0-bfd2-2fd2fcc0db37 width="300"/>
<img src=https://github.com/user-attachments/assets/c22bfee7-6443-4ef5-b44e-f14ec97c3a98 width="300"/>

# Sign-up/Log-in/Verification
<img src=https://github.com/user-attachments/assets/56e914f5-482c-4eae-b88f-7d1a310d23ef width="300"/>
<img src=https://github.com/user-attachments/assets/ca286efb-dd26-4e94-a1a3-5d3a017dfead width="300"/>

<img src=https://github.com/user-attachments/assets/0f6412d1-f9d5-42e1-84df-094f4275bbe1 width="300"/>
<img src=https://github.com/user-attachments/assets/529eb4a0-f434-4d57-9ed9-6e4dc8f9fd5f width="300"/>

# Booking/Map/Confirmation/Payment/History
<img src=https://github.com/user-attachments/assets/3cf8e1e2-e33b-4ffd-a0f5-78c24c553a83 width="300"/>
<img src=https://github.com/user-attachments/assets/9ee93812-a658-4099-bcf0-2ca735642ce0 width="300"/>

<img src=https://github.com/user-attachments/assets/5fe82ade-aa2e-4bdc-9ec4-5a0a16c34280 width="300"/>
<img src=https://github.com/user-attachments/assets/e5c729de-425a-4cd8-9d8e-d78385d380c4 width="300"/>

<img src=https://github.com/user-attachments/assets/f3e8a79d-f16d-408e-b587-d7ddabf9a806 width="300"/>
<img src=https://github.com/user-attachments/assets/f5c10a81-918c-4f2f-a152-b49bdc26e267 width="300"/>
<img src=https://github.com/user-attachments/assets/2ddd7c41-4422-4d4a-b1ab-59232567c199 width="300"/>


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
