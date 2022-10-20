# Employee-Review-System by Saurabh Singh
Folder structure - 
1. assets-
        1. css
        2. js
        3. images
        
2. config - is for setup mongoose, passport, googleOAuth2 and custom middleware.
3. controller - is for controller
4. models - is for schema's
5. routes - is for setup routers
6. views - contains all the html file (views)
7. index.js - this is the root of this project
8. package.json - this contain all the meta information of the project


#how to start a project --->

1. create index.js -
2. run the command npm init - it will take all the information about project like author, github etc and create package.json
3. install express using npm install express
4. import express in index.js
5. install ejs using npm install ejs
6. install mongoose using npm install mongoose
7. install layouts using npm install express-ejs-layouts
8. install passport using npm install passport
9. install passport strategy using npm install passport-locals
10. install google strategy for google authentication using npm install passport-google-oauth
11. install connect mongo for store the session information using npm install connect-mongo
12. install connect flash for flash message(notification) using npm install connect-flash 
13. require all the strategy in index.js file and start the project.
