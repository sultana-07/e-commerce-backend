📦 E-Commerce Backend API Documentation

=== Auth Routes ===

#Register\n
POST /user/register
Body: {
"role": "buyer" | "seller", // optional, default: "buyer"
"username": "string",
"email": "string",
"password": "string"
}
Response:
201 Created with user data and token

#Login
POST /user/login
Body:{
"email": "string",
"password": "string"
}
Response:
200 OK with user data and token

=== Product Routes ===

#Upload Product (Seller Only)
POST /product/upload
Headers:
Authorization: Bearer <token>

Form Data:
title: string
description: string
price: string
category: string
images: file(s) (up to 5)

Response:
201 Created with product data

#Get Products by Category
GET /product/category/:category
Response:
200 OK with array of products

#Get Product by Title
GET /product/:title
Response:
200 OK with array of products matching the title

=== Cart Routes ===

#Add to Cart
POST /item/addtocart
Body : {
"user": "userId",
"products": [
{
"product": "productId",
"quantity": 1
}
]
}
Response:
201 Created with updated cart

#Remove from Cart
POST /item/removecart
Body:{
"userId": "userId",
"productsId": "productId"
}
Response:
200 OK with updated cart

=== Order Routes ===

#Create Order
POST /order/create
Headers:
Authorization: Bearer <token>
Body:{
"items": [
{
"productId": "productId",
"name": "string",
"quantity": 1,
"price": 100
}
],
"amount": 100,
"paymentMethod": "COD" | "Razorpay",
"razorpayPaymentId": "string", // optional
"razorpayOrderId": "string" // optional
}
Response:
201 Created with order data

#Get Orders by User
GET /order/get/:userId
Headers:
Authorization: Bearer <token>
Response:
200 OK with array of orders

=== General Notes ===

All protected routes require Authorization: Bearer <token>.
All responses are in JSON.
Error responses include an error field with a message.
