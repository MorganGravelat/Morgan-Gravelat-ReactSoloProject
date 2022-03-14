# YEP!YUP?
YepYup is a [Yelp](https://www.yelp.com/) clone that is Yelp on one page. It is a place for all businesses to be posted and advertised based off your local area. Users may sign up and post their business, comment on said business, and give it a rating.

## TABLE OF CONTENTS
* [Database Schema](https://github.com/MorganGravelat/Morgan-Gravelat-YepYup/wiki/Database-Schema)
* [MVP Features](https://github.com/MorganGravelat/Morgan-Gravelat-YepYup/wiki/MVP-Feature-List)

# Technology Used
![Techs](https://user-images.githubusercontent.com/32913497/158119547-0e709f92-1493-4bb8-9024-14f56d4a78da.png)

# Install Instructions
1. Clone the repo
```js
git clone https://github.com/MorganGravelat/Morgan-Gravelat-YepYup.git
```
2. Install dependencies in the backend and then frontend
```js
//Starting from root
cd backend
npm install
cd ../frontend
npm install
```
3. Setup POSTGRESQL by creating a user and building the database
```js
//in the console in backend
cd backend //if you are in root
psql //to use postgresql
CREATE USER <name> WITH CREATEDB PASSWORD <'passowrd'>
\q
//Create a .env file in your backend
//.env start
PORT=5000
DB_USERNAME=<the user you just created's username>
DB_PASSWORD=<your user you just created's password>
DB_DATABASE=<your database name>
DB_HOST=localhost
JWT_SECRET=<generate yourself a secret>
JWT_EXPIRES_IN=604800
//.env end
```
4. Add a proxy to the frontend folders package.json file
```js
"proxy": "http://localhost:5000" //If you change the pre set port in the .env, make sure to change the proxy to match
```
5. Create your database and set it up
```js
npx dotenv sequelize db:create
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```
6. Start the backend and then frontend server
```js
//from root
cd backend
npm start
cd ../frontend
npm start
```
7. If the server does not open automatically, navigate to http://localhost:3000 and use the demo user or make an account if you'd like.

# Features
### A logged in user can do the following things
* Add/View/Edit/Delete Businesses
* Add/View/Delete Comments
