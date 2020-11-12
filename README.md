# Queue App - README

## Table of Contents

- [Introduction](#Introduction)
- [Contributors](#Contributors)
- [Installation](#Installation)
- [Routes](#Routes)

## Introduction

Queue is an JavaScript web application targeted at making reservation tracking and queue management for retailers easier during the Covid-19 pandemic.

## Technologies

### Version: 0.1.0

- create-react-app
- react-redux
- express.js
- mongooseJS
- mongoDB

## Contributors

- [Brian Huffman](https://github.com/Brianwkhuffman)
- [Calvin Moon](https://github.com/calmoon808)
- [Daniel Ichiyama](https://github.com/danieltichiyama)
- [Kevin Guo](https://github.com/kevinchguo)

## Installation

---

### `npm install`

Install dependencies

### `npm run server`

Runs the server.js file

### `npm run seed`

Runs the seed files for the database

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

---

### Other commands

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Routes

---

`api/customers`
| Route | Controller Method | Description |
|-------|-------------------|-------------|
|`GET("/")`| getAllRetailers()| gets all retailers for customer view|
|`GET("/search/search?=searchTerm")`| searchRetailers()| gets all retailers based on query.searchTerm|
|`GET("/:customerId/reservations")`| getCustomerReservations()| gets reservations for a customer, based on :customerId|
|`POST("/login")`| login()| login a user|
|`POST("/register")`| register()| registers a new user|
|`PUT("/:customerId/edit")`| updateCustomer()| updates a customer's information |

<br/>
<br/>

`api/retailers`
| Route | Controller Method | Description |
|-------|-------------------|-------------|
|`GET("/:retailerId")`| getAuthRetailer()| checks for authorization and gets data for a retailer, based on :retailerId|
|`GET("/:retailerId/reservations")`| getRetailerRes()| gets all reservations for a retailer, based on :retailerId|
|`PUT("/:retailerId")`| updateRetailer()| checks for authorization and updates retailer information, based on :retailerId|
|`DELETE("/:retailerId")`| deleteRetailer()| checks for authorization and deletes retailer information, based on :retailerId|
|`POST("/login")`| login()| login a retailer|
|`POST("/register")`| register()| registers a new retailer|

<br/>
<br/>

`api/reservations`
| Route | Controller Method | Description |
|-------|-------------------|-------------|
|`POST("/")`| newReservation()| checks or creates a Customer, creates a reservation using CustomerId and RetailerId, and saves a references to the new reservation in the Customer's and Retailer's reservations arry|
|`PUT("/:reservationId")`| updateReservation()| changes reservation's queueStatus, if queuStatus === "enter" or "cancelled", remove reservation from Retailer.reservations and Customer.reservations|

<br/>
<br/>

`api/sms`
| Route | Controller Method | Description |
|-------|-------------------|-------------|
|`POST("/send")`| smsSend()| sends a notification text message to the customer's phone number|
|`POST("/reply")`| smsReply()| updates replyStatus of a reservation based on incoming data and sends a follow up message to customer's phone number|
