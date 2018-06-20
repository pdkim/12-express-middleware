##Travis:
[![Build Status](https://travis-ci.com/pdkim/12-express-middleware.svg?branch=pk12)](https://travis-ci.com/pdkim/12-express-middleware)

##Heroku:
https://pk-12-express-middleware.herokuapp.com/

##Github: 
https://github.com/pdkim/12-express-middleware


##Feature:
Create a application that routes a GET, POST, and PUT method with models.  This should also use middlewares to connect to errors.

###Intructions:
1. Go to the github link and clone the repository. You may want to fork prior to cloning the repository.
2. 'npm install' before running anything.
3. 'nodemon index.js' to start server.
4. In postman, have a tab for POST, GET, and PUT at the following url: http://localhost:3000/api/v1/worker
5. Go to the GET tab and change path to something like http://localhost:3000/pokemon and and press GET.
    a. You should get a 404 error.
6. Change your route in GET to the following: http://localhost:3000/api/v1/worker/1111. Press GET.
    a. You should get a 500 error.
7. Go to POST tab and select Body > Raw. Copy the following information (you can change values on the right as you like): 
    {"firstName" : "Phil", "lastName" : "Kim", "hourlyWage" : "100" }
8. Press POST. You should now recieve a valid object.
9. Copy the id generated in the POST and switch to the GET tab.
10. Replace the 1111 in step 6 with the new id and press GET.
    a. You should now see the same object created in POST.
11. Go to the PUT tab and paste the id in the url. Be sure to include /before pasting the id.
12. In the Body > Raw, change the content to something like the following:
    {"firstName" : "JB", "lastName" : "Tellez", "hourlyWage" : "1000" }
12. Press PUT. You should now get an updated body for the same id.