
# Flixxit - Your Personal Entertainment Hub

Welcome to Flixxit, your personal streaming experience built with the MERN stack. Flixxit aims to bring the best of OTT platforms to your fingertips.


## Table of  Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Steps to Run Locally](#steps-to-run-locally)
- [Usage](#usage)
- [API References](#api-references)
- [Contact Information](#contact-information)

## Features
### 1. User Accounts
- Sign up and log in using email IDs and passwords for simplicity.

### 2. User Profile
- Access a personalized user profile displaying account information.
- View consumed content history.
- Update user profile

### 3. Dashboard
- Browse a variety of titles using horizontally scrollable carousels categorized by popular, trending and more.

### 4. Title View
- Click on a title to explore its synopsis, rating, and other details.

### 5. Search
- Utilize the search feature to discover various types of content, including web series, movies, short films, and documentaries.

### 6. Watchlist
- Add programs to watchlist and watch it anytime.

### 7. Rating
- Allow users to upvote or downvote programs and display the count.

### 8. Video Player
- Preview or play selected content with a "Skip Intro" feature.

### 9. Payment and Subscription
- Subscribe to monthly or yearly plans for full access.

### 10. About Us
- Learn more about Flixxit, including features, origin, copyrights, terms, and conditions.
## Tech Stack



![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?style=for-the-badge&logo=mongodb&logoColor=white)

![Express.js](https://img.shields.io/badge/Backend-Express.js-blue?style=for-the-badge&logo=express&logoColor=white)

![React.js](https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react&logoColor=white)

![Node.js](https://img.shields.io/badge/Backend-Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

![Stripe](https://img.shields.io/badge/Payment-Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)

![JWT](https://img.shields.io/badge/Authentication-JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)




## Setup instructions

### Prerequisites
- Node.js and npm installed.
- MongoDB server running.

### Steps to Run Locally
1. Clone the repository: 

`git clone https://github.com/Neharavi262001/Flixxit-capstone.git`

2. Navigate to the project folder. Open a terminal in your root directory.
```bash
   npm install
```

 Navigate to backend directory. To install dependencies for backend:

```bash
   cd backend
   npm install
```
3. Rename `.env.example` to `.env` file in backend directory.
 Set up environment variables .To run this project, you will need to add the following environment variables to your .env file.
For Stripe, go to [Stripe](https://stripe.com/) and get your publishable key and secret key.

`PORT`
`MONGODB_URI`
`SECRET_TOKEN`
`STRIPE_PUBLISHABLE_KEY`
`STRIPE_SECRET_KEY`

4. Navigate to the app directory  and install dependencies for frontend
```bash
  cd frontend
  npm install
```
5. Rename `.env.example` to `.env` file in frontend directory.
Set up environment variables.To run this project, you will need to add the following environment variables to your .env file. 
Go to [The Movie Database (TMDb)](https://www.themoviedb.org/) and get your TMDB token and paste it.

`VITE_APP_TMDB_TOKEN`

To run the app, navigate to root directory

Run the client
```bash
 cd frontend
 npm run dev
```
Run the  server 
```bash
 cd backend
 npm run server
```

### Usage

To use Flixxit, follow these steps:

1. **Register:**
   - Create a new account by signing up with your name, email ID and password.
    - Remember to register using a strong password, including uppercase letters and numbers.
    ![Register](./usage_images/register.png)


2. **Select a Plan:**
   - Choose a subscription plan (monthly or yearly) that suits your preferences.
    ![Subscribe](./usage_images/sub%20plan.png)


3. **Checkout with Stripe:**
   - Proceed to checkout using Stripe for secure and efficient payment processing.
   - Use the following test card number for payments in India: **4000003560000008**.
    ![Checkout](./usage_images/stripe%20checkout.png)


4. **Log In:**
   - Log in to your Flixxit account with your credentials.
    ![Subscribe](./usage_images/login.png)
   


5. **Enjoy Watching:**
   - Explore the diverse range of content available on Flixxit.
   - Add programs to your watchlist for easy access.
   - Rate and review your favorite titles.
   - Utilize the search feature to discover new content.
   - Use the video player with the "Skip Intro" feature for a seamless viewing experience.

6. **Screenshots:**

   - ![Screenshot 1](./usage_images/dashboard.png)
   - ![Screenshot 2](./usage_images/carousels.png)
   - ![Screenshot 3](./usage_images/details.png)
   - ![Screenshot 4](./usage_images/search.png)
   - ![Screenshot 5](./usage_images/user%20profile.png)


Now you're all set to enjoy a personalized streaming experience on Flixxit!



## API Reference


Flixxit utilizes the following APIs for enriched content data and functionality:

- [The Movie Database (TMDb)](https://www.themoviedb.org/) - A comprehensive movie and TV show database used for content information.
- [Stripe](https://stripe.com/) - A secure and efficient payment processing API used for handling subscription payments.

## contact-information
neharavi262001@gmail.com


