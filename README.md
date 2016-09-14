SOA REST API
=================

A simple mock demo of Service Oriented Architecture to display two tables - Doctors and Users. The Doctors table is fetched by the doctors API and the user tables can be fetched by directly querying the Users API or via the Doctors API.

Usage
-----
>npm install

#Running the mock APIs

In the root directory,
``` 
node Doctors/server_doctors_api.js 
node Users/server_users_api.js 
```
    

API Details
-----------
#Doctors -
Endpoint - http://127.0.0.1:8888/api
Response Format - JSON

#Operations

>GET /doctors - Lists all doctors
>GET /doctors/:id - Lists details of doctor with id

>GET /users - Lists all users
>GET /users/:id - Lists details of users with id

#Users -
Endpoint - http://127.0.0.1:8889/api
Response Format - JSON

#Operations

```
GET /users - Lists all users
GET /users/:id - Lists details of users with id
```
