# RentBook App Back-End

Back-End of an App for borrowing books made using Node.js. This app use MVC style as it's structure. It didn't have any views yet, so it is recommended to use Postman for creating requests.


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

 - "host/books/{id}" => display one book with the id specified by id parameter


#### POST Request

 - "host/books/" => Inserting a book to database. data required = title, description, image, date_released, genre_id. 
	- note = image is the url to the image, not the actual image


#### PATCH Request

 - "host/books/" => Updating a book in database. data required = id, title, description, image, date_released, genre_id.


#### DELETE Request

 - "host/books/" => Deleting a book in database. data required = id.


### Genres Routes

#### GET Request

 - "host/genres/" => display all genre
 - "host/genres/{id}" => display one genre with the id specified by id parameter


#### POST Request

 - "host/genres/" => Inserting a genre to database. data required = name


#### PATCH Request

 - "host/genres/" => Updating a genre in database. data required = id, name


#### DELETE Request

 - "host/genres/" => Deleting a genre in database. data required = id.

