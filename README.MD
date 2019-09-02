# RentBook App Back-End

Back-End of an App for borrowing books made using Node.js. This app use MVC style as it's structure. It didn't have any views yet, so it is recommended to use Postman for creating requests.

## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirement

- 10.1.38-MariaDB MySQL RDBMS

- npm version 6.10.3

- Postman latest version


## Getting Started

 - Clone or download this repo then use npm install to install all the dependencies.
	```
	npm install
	```
 - Create database and run init.sql script to install the necessary database structure. 
 - Create the .env file and set it up based on your own configuration 
 - Use npm start to start the server. Then you're ready to go
	```
	npm start
	```

## Documentation


### Books Routes


#### GET Request

 - "host/books/" => display all books, with default pagination {page:1, limit:10}. Query params:
	- sortby -> its value is name of column you want to sort. 
	- availability -> displaying list of available books if it's value set to 1, or unavailable books if set to 0
	- page -> page to display (default 1)
	- limit -> number of books displayed in a page (default 10)
	- search -> display all books with title that contains the keyword.

 - "host/books/newest" => get 5 newest books added to database

 - "host/books/year" => get a list of year books date_released 

 - "host/books/year/{year}" => get a list of books that released at {year} 

 - "host/books/genre" => get a list of genre that existed in books table

 - "host/books/genre/{genreName}" => get a list of books with genre {genreName} 

 - "host/books/{id}" => display one book with the id specified by id parameter


#### POST Request

 - "host/books/" => Inserting a book to database. data required = title, description, image, date_released, genre_id. 
	- note = 
		- image is the url to the image, not the actual image
		- admin previlege is required


#### PATCH Request

 - "host/books/{id}" => Updating a book in database with the specified id. data required = title, description, image, date_released, genre_id. (admin previlege is required)


#### DELETE Request

 - "host/books/{id}" => Deleting a book in database with the specified id.  (admin previlege is required)


### Genres Routes


#### GET Request

 - "host/genres/" => display all genre
 - "host/genres/{id}" => display one genre with the id specified by id parameter


#### POST Request

 - "host/genres/" => Inserting a genre to database. data required = name. (admin previlege is required)


#### PATCH Request

 - "host/genres/" => Updating a genre in database with the specified id. data required = name. (admin previlege is required)


#### DELETE Request

 - "host/genres/" => Deleting a genre in database with the specified id. (admin previlege is required)


### Borrowing Routes


#### GET Request

 - "host/borrowings/" => display all borrowings. (admin previlege is required)
 - "host/borrowings/history" => display all borrowings data of the current logged in user. 
 - "host/borrowings/book/{bookId}" => returns borrowing data of book with id {bookId} if it not yet returned, if the book is already returned returns null
 - "host/borrowings/{id}" => display one borrowing with the id specified by id parameter. (admin previlege is required)


#### POST Request

 - "host/borrowings/" => Inserting a borrowing to database. data required = book_id. (regular previlege is required)


#### PATCH Request

 - "host/borrowings/{id}" => Updating a borrowing in database with the specified id. data required = book_id (regular previlege is required)


#### DELETE Request

 - "host/borrowings/{id}" => Deleting a borrowing in database with the specified id. (admin previlege is required)


### User Routes


#### GET Request

 - "host/users/" => display all users. (admin previlege is required)
 - "host/users/profile" => get the profile of current logged in user
 - "host/users/{id}" => display one user with the id specified by id parameter. (admin previlege is required)


#### POST Request

 - "host/users/register" => registering a new regular user to database. data required = username, email, password
 - "host/users/register/admin" => registering a new admin user to database. data required = username, email, password. (admin previlege is required)
 - "host/users/login" => login route for generating new jwt token. data required = email, password
