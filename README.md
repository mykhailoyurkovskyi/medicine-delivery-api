Hi! This is medicine-delivery-api! And here you can find some instructions how to run and use this project!
First of all, you need to configure .env file:
PORT=
SERVER_HOST=
CLIENT_URL=

DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=

SALT=
SECRET=
So you can create a database, configure the connection, the port on which the server will work.
Here all endpoints that you can use
[post] users/register
[post] users/login - you will recieve jwt token in response
[get] users/info
[get] users/infoAboutUser - only with admin access
[get] medicines/ - here you can build url to get some medicines! id, name and other
[post] shopping-cart/createCart - all shopping-cart methods using jwt tokens, use data in body
[post] shopping-cart/addToCart - example: { medicineId: 1, quantity: 1, userdId: fromJwtToken}
[get] shopping-cart/getCart
[delete] shopping-cart/removeFromCart
[delete] shopping-cart/removeAllCarts
[delete] shopping-cart/removeCart/:id
