# Whitecliffe Loan System API README

## File Structuring

#### dbConfig.js

The dbConfig.js file is used to contain all information regarding the MySQL tables and connection information. Should connection details change in the future you should be looking at this first. 

#### securityDetails.js

The securityDetails.js file is used as a way to store any passwords that maybe used within the web application. This includes email app passwords that nodemailer uses and database passwords. It should be stored here not within application code for security reasons. 

## Packages

#### Express

Express is used to handle calls to the server and deliver responses back to the client. 

#### body-parser

body-parser is used to handle body-parsing as a middleware. 

#### MySQL

The MySQL module is used as a driver to connect with the MySQL database and run queries.


#### Nodemailer

Nodemailer is used as a way to handle email delivery. 

#### Nodemon

Nodemon is used as a way to handle development within the server easily. 

## API Functionality


### /api/items

This is a GET request that will fetch all the items within the database and return an array of objects with the data that it has. If there is no data found within teh database it will return a 404 Error with an object of "response": "Data was not found.". 

### /api/item/:id

This is a GET request used to get data around a specific item, for example if we wanted to see a detailed description about the item we could utilise this API. If no data was found it will return a 404 Error with an object of "response": "Data was not found". 

### /api/loans

This is a GET request used to get data around all available loans. If no data was found it will return a 404 Error with an object of "response": "Data was not found". 

### /api/loans/:id

This is a GET request used to get information about a specific loan. If no data was found it will return a 404 Error with an object of "response": "Data was not found". 

### /api/loans/item/:id

This is a GET request used to get all loans on a SPECIFIC item. For example if we wanted to look at loans around a Nikon Camera. This is how we would handle that.  If no data was found, it will return a 404 Error with an object of "response": "Data was not found". 

### /api/get_requests 

This is a GET request used to get all loans that are currently 'Pending' 

### /api/reserverations

This is either a POST or a PATCH request. This controller function in itself is where the booking is handled. It is used for students to request, teachers to approve  or decline. It takes in student_email, staff_email, loan_date, return_date, loan_id, item_id and loan_status as parameters. Please note: not all of these need to be included and it is just based upon the type of request needed.

If a student is requesting an item. It is only necessary to provide student_email, loan_date, return_date and item_id. Please note: loan_status should NOT be included within the request as it is only required when approving or declining a loan. 

If a teacher is wanting to approve or decline a loan request, all information should be parsed into it as a PATCH request. This will update the data within the database and send an updated email to the users. 

