```//Routes

// /api/

USER CONTROLLER
// /customers
GET("/"),  getAllRetailers()
-----
Input: None

Output:
[
    {
        "currentCapacity": 0,
        "_id": "5f3f489dcb045216f8b900cf",
        "retailerName": "QueueApp",
        "address": "1234 Kapiolani Blvd",
        "city": "Honolulu",
        "state": "HI",
        "zipcode": 96813,
        "phoneNumber": "8087730442",
        "open": 800,
        "close": 2100,
        "maxCapacity": 4,
        "waitListCount": 0,
        "holdListCount": 0,
        "id": "5f3f489dcb045216f8b900cf"
    }
]

GET("/search/search?=searchTerm"), searchRetailers({req.query.searchTerm})
-----
Input: /api/customers/search?searchTerm=QueueApp

Output:
[
    {
        "currentCapacity": 0,
        "_id": "5f3f489dcb045216f8b900cf",
        "retailerName": "QueueApp",
        "address": "1234 Kapiolani Blvd",
        "city": "Honolulu",
        "state": "HI",
        "zipcode": 96813,
        "phoneNumber": "8087730442",
        "open": 800,
        "close": 2100,
        "maxCapacity": 4,
        "waitListCount": 0,
        "holdListCount": 0,
        "id": "5f3f489dcb045216f8b900cf"
    }
]

GET("/:customerId/reservations"), getCustomerReservations()
-----
Input: /api/customers/:customerId/reservations

Output:

*GET("/:retailerId"), getOneRetailer({req.params.retailerID})
-----
Input:

Output:

*POST("/login"), login({req.body.username, req.body.password})
-----
Input:

Output:

*POST("/register"), register({formData})
-----
Input:

Output:

*PUT("/:customerId/edit"), updateCustomer({formData}),
-----
Input:

Output:



RETAILER CONTROLLER
// /retailers

GET("/:retailerId"), getAuthRetailer()
-----
Input: /api/retailers/:retailerId

Output:
{
    "currentCapacity": 0,
    "averageWait": 0,
    "reservations": [],
    "_id": "5f3f489dcb045216f8b900cf",
    "username": "queue_admin",
    "retailerName": "QueueApp",
    "address": "1234 Kapiolani Blvd",
    "city": "Honolulu",
    "state": "HI",
    "zipcode": 96813,
    "phoneNumber": "8087730442",
    "open": 800,
    "close": 2100,
    "maxCapacity": 4,
    "notification": 60,
    "waitListCount": 0,
    "holdListCount": 0,
    "id": "5f3f489dcb045216f8b900cf"
}

**GET("/:retailerId/reservations"), getRetailerRes()
-----
Input:

Output:

PUT("/:retailerId"), updateRetailer({formData})
-----
Input:
{
	"username":"test3",
	"password":"test3",
	"retailerName":"Test Retailer 3",
	"address":"1234 Kapiolani Blvd",
	"city": "Honolulu",
	"state": "HI",
	"zipcode": 96813
	"phoneNumber":"1234567890",
	"open": 800,
	"close": 1900
	"maxCapacity": 24,
    "averageWait":3600,
    "notification": 300
}

Output:
{
    "currentCapacity": 0,
    "averageWait": 0,
    "reservations": [],
    "_id": "5f3f4f1bfb14f652f826887d",
    "username": "hotTopic808",
    "retailerName": "HotTopic",
    "address": "1 Kapiolani Blvd",
    "city": "Honolulu",
    "state": "HI",
    "zipcode": 96813,
    "phoneNumber": "18086661337",
    "open": 1000,
    "close": 2100,
    "maxCapacity": 3,
    "notification": 300,
    "updatedAt": "2020-08-21T04:59:20.528Z",
    "waitListCount": 0,
    "holdListCount": 0,
    "id": "5f3f4f1bfb14f652f826887d"
}

DELETE("/:retailerId"), deleteRetailer()
-----
Input: /api/retailers/:retailerId

Output:
{
    message: "QueueApp has been successfully deleted."
}

POST("/login"), login({req.body.username, req.body.password})
-----
Input:

Output:

POST("/register"), register({formData})
-----
Input:
{
	"username":"test3",
	"password":"test3",
	"retailerName":"Test Retailer 3",
	"address":"1234 Kapiolani Blvd",
	"city": "Honolulu",
	"state": "HI",
	"zipcode": 96813,
	"phoneNumber":"1234567890",
	"open": 800,
	"close": 1900,
	"maxCapacity": 24,
    "averageWait":3600,
    "notification": 300
}

Output:
{
    "currentCapacity": 0,
    "averageWait": 3600,
    "reservations": [],
    "_id": "5f3f52c44e9bae57f4829c33",
    "username": "test11",
    "retailerName": "Test Retailer 3",
    "address": "1234 Kapiolani Blvd",
    "city": "Honolulu",
    "state": "HI",
    "zipcode": 96813,
    "phoneNumber": "1234567890",
    "open": 800,
    "close": 1900,
    "maxCapacity": 24,
    "notification": 300,
    "createdAt": "2020-08-21T04:51:16.950Z",
    "updatedAt": "2020-08-21T04:51:16.950Z",
    "__v": 0,
    "waitListCount": 0,
    "holdListCount": 0,
    "id": "5f3f52c44e9bae57f4829c33"
}


***POST("/:retailerId/customer"), newCustomer()
	- creates a new customer and adds them to the waitlist of the current retailer
***PUT("/:retailerId/customer"), updateQueueStatus()
	- changes queueStatus of a customer in retailer's queue, ["wait", "hold", "enter", "cancelled"]
***PUT("/:retailerId/customer/archive"), archiveCustomer()
	- moves queue object to history array in Retailer and Customer

// /reservations
**POST("/"), newReservation()
	- creates a new reservation
	- finds an existing Customer/creates a new Customer
-----
Input:

Output:

**PUT("/:reservationId"), updateReservation()
	- changes the reservation queueStatus or replyStatus
  - if queueStatus === "enter" || "cancelled", remove from Retailer.queue && Customer.queue
-----
Input:

Output:


TWILIO CONTROLLER
// /sms/
POST("/api/sms/send"), smsSend()
	- sends a text message to customer's phone number
-----
Input:

Output:

POST("/api/sms/reply"), smsReply()
	-sends a follow message to customers phone number, and changes replyStatus of a customer in retailer's queue, ["pending", "confirmed", "hold", "cancelled"]
-----
Input:

Output:

```

VERIFICATION CONTROLLER

// /verification/
POST("/api/verification/:retailerId/send") - sends a generated PIN to the chosen point of contact.

---

Input:
{
"verificationType": "text/email/call",
"phoneNumber": "8083934251",
"email": "kevinchguo@gmail.com",
}

Output:
{
"body": "Sent from your Twilio trial account - Hello QueueApp, your verification PIN is 148156",
"numSegments": "1",
"direction": "outbound-api",
"from": "+18085007155",
"to": "+18083934251",
"dateUpdated": "2020-09-17T23:07:35.000Z",
"price": null,
"errorMessage": null,
"uri": "/2010-04-01/Accounts/ACeb3a277534176727300b275fafc647e8/Messages/SM31f9efcf30814473ad722f922ca856d9.json",
"accountSid": "ACeb3a277534176727300b275fafc647e8",
"numMedia": "0",
"status": "queued",
"messagingServiceSid": null,
"sid": "SM31f9efcf30814473ad722f922ca856d9",
"dateSent": null,
"dateCreated": "2020-09-17T23:07:35.000Z",
"errorCode": null,
"priceUnit": "USD",
"apiVersion": "2010-04-01",
"subresourceUris": {
"media": "/2010-04-01/Accounts/ACeb3a277534176727300b275fafc647e8/Messages/SM31f9efcf30814473ad722f922ca856d9/Media.json"
}
}

POST("/api/verification/:retailerId/check") - verifies and checks PIN sent in from client to databaase

Input:
{
"enteredPIN": 111111
}

Output:
{
"message": "Your business has been successfully verified."
}

or

{
"error": "Sorry the PIN does not match."
}
