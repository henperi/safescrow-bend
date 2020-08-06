# Safescrow-bend

This is the server/backend that powers the Safescrow client applications. It's currently built following a Monolythic systems achitecture. In the near future we hope to upgrade this to a Microservice architecture.

---

---

# Getting Started

To Setup the development environment on your local machine a few things are required. Please do well to follow the instructions below to in order get started and have everything working.

## 1. Create a `.env` file in the root directory

Add the following fields to the newly created `.env` file

- `NODE_ENV=development` Options include ['development', 'production', 'staging', 'test', 'local']

- `JWT_SECRET=aPrivateOrSecretKey` Can be any string of any length in any base.

---

## 2. Install Postgres to your local machine

**Install Postgres**

---

## 3. Setup the local development database

**Ensure you have Postgres properly installed on your local machine and then follow the steps listed below.**

- Step 1. Run `psql postgres postgres` to login as the defaul psql user.

- Step 2. Run `CREATE ROLE safescrow_admin WITH LOGIN PASSWORD 'safescrow_password';` to create a new psql user.

- Step 3. Run `ALTER ROLE safescrow_admin CREATEDB;` to grant permision for the newly create user to be able to create a database.

- Step 4. Run `\q` to quit the psql terminal.

- Step 5. Run `psql postgres safescrow_admin` to login back to psql as safescrow_admin.

- Step 6. Enter the password for the safescrow_admin, i.e `safescrow_password`.

- Step 6. Run `CREATE DATABASE safescrow_dev_db;` to create the database

- Step 7. Run `GRANT ALL PRIVILEGES ON DATABASE safescrow_dev_db TO safescrow_admin;`.

After the listed steps above, you should have a perfectly working database with which this app can work properly with.

If you followed the above process exactly as is, then your new database url should look something like this:
`postgres://safescrow_admin:safescrow_password@127.0.0.1:5432/safescrow_dev_db`

Add this database url to your `.env` file with a key of `DEV_DB_URL`.

i.e `DEV_DB_URL=postgres://safescrow_admin:safescrow_password@127.0.0.1:5432/safescrow_dev_db`

---

## 4. Setup Africa's Talking Environment

**Create an Africa's Talking Account to generate your sandbox API Key**
Add the API to your `.env` file with a key of `AFRIKA_TALKING_API_KEY`.

i.e `AFRIKA_TALKING_API_KEY=yourAfricasTalkingApi`

Add your Africa's talking username to your `.env` file with a key of `AFRIKA_TALKING_USERNAME`.

i.e `AFRIKA_TALKING_USERNAME=yourUserName`

---

## 5. Start the server

**Having following the above instructions you can start the server**

- Development Server: Run `npm run start:dev`

\*\*Everything working fine, you'd see a `6 Aug 18:58:45 - connected on port 8025` message in your prompt.
