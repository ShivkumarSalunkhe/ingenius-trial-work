# Gym Subscription Backend

This is the backend for the Gym Subscription application. It uses PostgreSQL for the database, session cookies for authentication, and Sequelize as the ORM. 

## Features

- **User Authentication**: Manage user authentication using session cookies.
- **PostgreSQL Database**: Robust and scalable database for storing user and subscription data.
- **Sequelize ORM**: Simplifies database interactions and migrations.
- **User and Subscription Management**: Handle user profiles and subscription plans.
- **Data Migrations**: Easily manage database schema changes with Sequelize migrations.

## Installation

To install and set up the backend application, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/ShivkumarSalunkhe/ingenius-trial-work.git

2. Install pacakges 
 npm install

3. Run migrations

npx sequelize-cli db:migrate
