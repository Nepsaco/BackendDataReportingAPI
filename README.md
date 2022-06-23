# Backend Data Reporting API

##Build
To build locally you will need to run:
-   npm install
-   npm run migrate
-   npm run seed
-   npm run start
-   App will be hosted on port 9000
-   Visiting localhost:9000/docs will allow you to see the app


##Deployment
-   Can be loaded from https://backend-data-reporting-api.herokuapp.com/
-   This can take some time due to cold starts


##API visualization
-   To visualize the api and test enpoints got to https://backend-data-reporting-api.herokuapp.com/docs
-   An ERD png is in the assets folder to get a look at my modes and relationships


##To do
- Get all of the seed data into the database from the csv. I was having trouble parsing the csv to load it into the seeds.
- Add testing to api end points to make sure data coming back would match assumptions. I would have written tests in jest and accessed the endpoint to check if test data matched the endpoint.
- Refactor for optimization. I only solved the problem but I did it using loops within loops. So being able to look at some functions again to refactor using better SQL statement or gather the data faster. Also there is a probelm of over fetching that I would relook at.
