# **rk-nc-news - React App** | [Live Host](https://rico-fake-news.netlify.app/) 👀


##About
rk-nc-news is a Reddit Clone built using React. The data is pulled from a custom built api hosted here:

https://nc-news-2-electric-boogaloo.herokuapp.com/api

**Available Endpoints**<br>

GET /api<br>
GET /api/topics<br>
POST /api/topics<br>
GET /api/articles<br>
POST /api/articles<br>
GET /api/articles/:article_id<br>
PATCH /api/articles/:article_id<br>
DELETE /api/articles/:article_id<br>
GET /api/articles/:article_id/comments<br>
POST /api/articles/:article_id/comments<br>
PATCH /api/comments/:comment_id<br>
DELETE /api/comments/:comment_id<br>
GET /api/users<br>
POST /api/users<br>
GET /api/users/:username

## How to install

`git clone https://github.com/rico157/rico-fake-news.git`

Clone the repository from github to your project folder

`npm install`

Install all the needed node packages 

`npm start`

Run the app in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Features
view a list of all articles<br>
view a page for each topic with a list of related articles.<br>
view an individual article.<br>
view an individual article's comments.<br>
sort articles by: date created, votes<br>
post a new comment to an existing article <br>
delete comments (as a default logged in user. e.g. 'jessjelly'). <br>
vote on an article and immediately see the change. <br>
vote on a comment and immediately see the change. <br>