# Retail Transaction System

## Project Summary
This project is a polytechnic second-year student assignment for a Retail Transaction System. It shows how a basic Node.js server can read CSV sales data and return retail transaction results through API endpoints.

The system is built to:
- load retail sales data from `data/retailTransaction.csv`
- convert the CSV rows into JSON transaction records
- provide endpoints for quick reports and filters
- support browsing by payment method and product category

## Main files and what they do

### `server.js`
This is the main server code for the retail transaction system.
- imports required modules: `express`, `fs`, `csv-parse`, and `cors`
- reads `data/retailTransaction.csv` on startup
- processes each record into a JSON object
- builds lookup maps for `paymentMethod` and `productCategory`
- exposes API endpoints for front-end or client use

### `package.json`
The Node.js manifest for the root project.
- lists project dependencies like `express`, `csv-parse`, and `cors`
- allows `npm install` to install required packages

### `package-lock.json`
The lockfile that freezes exact package versions for consistent installs.

### `data/retailTransaction.csv`
The dataset used by the Retail Transaction System.
- contains sales records in CSV format
- includes fields such as customer ID, product ID, payment method, category, price, and total amount

## How the system works
1. Server reads the CSV file using `fs.createReadStream()`.
2. CSV rows are parsed and converted to JavaScript objects.
3. Each transaction object is stored in memory.
4. Two maps are built to group transactions by:
   - payment method
   - product category
5. The server starts on `localhost:8081` and serves API routes.

## API endpoints
These are the main routes you can use:
- `GET /` — a simple health check message
- `GET /retailData5` — returns the first 5 transactions
- `GET /byPaymentMethod/:paymentMethod` — returns transactions for a payment method
- `GET /byProductCategory/:productCategory` — returns transactions by category
- `GET /productCategory` — returns the list of available product categories
- `GET /paymentMethod` — returns the list of available payment methods

## Notes on duplicate files
This workspace contains duplicate file names in different folders, such as `package.json`, `package-lock.json`, `server.js`, and `data/retailTransaction.csv`.

The actual working copy for the Retail Transaction System is the root-level `server.js` and root-level `data/retailTransaction.csv`.

## Notes on hidden metadata files
Files beginning with `._` (for example, `._package.json` or `._server.js`) are hidden metadata files from macOS or file transfer tools.
- They are not real source files
- They should be ignored or deleted
- They are not used by the application

## How to run the project
From the workspace root:
```bash
npm install
node server.js
```
Then open `http://localhost:8081` or call the API routes from a browser or frontend app.

## Why this project is useful
This project demonstrates how a simple backend can turn raw CSV data into a useful retail transaction API. It is a good example of learning data parsing, Node.js server design, and basic API routing in a polytechnic software project.

![Main Page](assets/MainPage.png)
![PaymentFilter-DebitCard-CardView](assets/PaymentFilter-DebitCard-CardView.png)
![PaymentFilter-DebitCard-TableView](assets/PaymentFilter-DebitCard-TableView.png)
![RetailTransaction-CardView](assets/RetailTransaction-CardView.png)
![RetailTransaction-TableView](assets/RetailTransaction-TableView.png)




