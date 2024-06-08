# How to use this API using Postman
1. Run the apache and MySQL in **XAMPP**
2. Run the server in visual studio code **npm start**

## How to use authorization
1. Click tab authorization on postman
2. Choose Type "Bearer Token" on the left
3. Insert Token on the right (You must log in to get the token)

## User API Spec

## Register User

Endpoint: POST /api/users/register

Request Body :

```json
{
    "email" : "aryaemail@gmail.com",
    "username" : "arya",
    "full_name" : "aryaperdanairawan",
    "password" : "rahasiabanget",
    "phone_number": "911",
    "t_level_id" : 2,
    "t_department_id" : 1
}
```

Response Body (Success) :

```json
{
    "data" : {
        "email" : "aryaemail@gmail.com",
        "username" : "arya",
        "full_name" : "aryaperdanairawan",
        "phone_number" : "911"
    },
    "t_level": {
      "id": 2,
      "level_name": "Intern"
    },
    "t_Department": {
      "id": 1,
      "department_name": "Finance"
    }
}
```

Response Body (failed) :

```json
{
    "data" : {
        "errors" : "Zod error, .."
    }
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
    "email" : "aryaemail@gmail.com",
    "password" : "rahasiabanget"
}
```

Response Body (Success) :

```json
{
    "data" : {
        "email" : "aryaemail@gmail.com",
        "username" : "arya",
        "full_name" : "aryaperdanairawan",
        "phone_number" : "911",
        "token" : "jwttoken",
        "t_level":  {
          "id": 2,
          "level_name": "Intern"
        },
        "t_Department": {
          "id": 1,
          "department_name": "Finance"
        }
    }
}
```

Response Body (Failed) :

```json
{
    "errors" : "Username or password wrong, ..."
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :
- Autorization : token

Request Body :

```json
{
    "email" : "aryaemail@gmail.com", // tidak wajib
    "username" : "arya", // tidak wajib
    "full_name" : "aryaperdanairawan", // tidak wajib
    "phone_number" : "911", // tidak wajib
    "token" : "jwttoken" // tidak wajib
}
```

Request Body (Sucess) :

```json
{
    "email" : "aryaemail@gmail.com",
    "username" : "arya",
    "full_name" : "aryaperdanairawan",
    "phone_number" : "911",
    "token" : "jwttoken",
    "t_level" : {
      "id": 2,
      "level_name": "Intern"
    },
    "t_Department": {
      "id": 1,
      "department_name": "Finance"
    }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```

## Delete User

Endpoint : PATCH /api/users/delete

Request Header :
- Autorization : token

Request Body (Sucess) :

```json
{
    "email" : "aryaemail@gmail.com",
    "username" : "arya",
    "full_name" : "aryaperdanairawan",
    "phone_number" : "911",
    "token" : "jwttoken",
    "t_level": {
      "id": 2,
      "level_name": "Intern"
    },
    "t_Department": {
      "id": 1,
      "department_name": "Finance"
    }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :
- Authorization : token

Response Body (Success) :

```json
{
    "email" : "aryaemail@gmail.com",
    "username" : "arya",
    "full_name" : "aryaperdanairawan",
    "phone_number" : "911",
    "token" : "jwttoken",
    "t_level": {
      "id": 2,
      "level_name": "Intern"
    },
    "t_Department": {
      "id": 1,
      "department_name": "Finance"
    }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :
- Authrization : token

Response Body (Success) :

```json
{
  "data" : {
    "email" : "aryaemail@gmail.com",
    "username" : "arya",
    "full_name" : "aryaperdanairawan",
    "phone_number" : "911",
    "token" : "jwttoken",
    "t_level": {
      "id": 2,
      "level_name": "Intern"
    },
    "t_Department": {
      "id": 1,
      "department_name": "Finance"
    }
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```

## Get All User

Endpoint : GET /api/users

Response Body (Success) :

```json
{
  "data" : [
    {
        "email" : "aryaemail@gmail.com",
        "username" : "arya",
        "full_name" : "aryaperdanairawan",
        "phone_number" : "911",
        "token" : "jwttoken",
        "t_level_id": 2,
        "t_department_id": 1
    },
    {
        "email" : "aryaemail2@gmail.com",
        "username" : "arya2",
        "full_name" : "aryaperdanairawan2",
        "phone_number" : "9112",
        "token" : "jwttoken2",
        "t_level_id": 2,
        "t_department_id": 1
    },
  ]
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```



