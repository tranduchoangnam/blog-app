# Getting Started with Blogee App

This project is a blog app using ReactJS, ExpressJS, PostgreSQL, Prisma ORM, Docker

## Available Scripts on local:

#### In the client directory, you can run:

### `npm install`

Install package required in package.json

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### In the server directory, you can run:

### `npm install`

Install package required in package.json

### `npx prisma generate`

You'll need to manually re-generate Prisma Client to ensure the code inside node_modules/.prisma/client gets updated

### `npx prisma migrate dev`

Prisma Migrate generates a history of .sql migration files, and plays a role in both development and deployment.

### `nodemon server`

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in your browser.

The server will reload when you make changes.\
You may also see any lint errors in the console.

## Available Scripts using Docker:

This project's server is dockerized so in the server dir, you can run:

### `docker-compose up -d`

This command will setup the environment on Docker so you dont need to install package in your computer

### `docker ps`

Check your container is running or not
If everything is correct, your server should be available at
[http://localhost:8000](http://localhost:8000)

# About Blogee

This is my first personal project after took part in some group projects.

Actually in my previous group projects, I usually code backend so building this fullstack project in 2 weeks causes me a lot of challenges.

Using React Hooks is one of the most difficult and interesting problem I have to deal with. I also decide to use the original CSS instead of Bootstrap and TailwindCSS to practice and understand more clearly.

In my backend, I use ExpressJS with Oauth2 for login, Prisma ORM and PostgreSQL for database management. I have no trouble because of having experience on it.

I will try to turn this project to React TypeScript version with TailwindCSS and use Laravel in Backend. But in present with my lack of time, this project is almost everything i have. I'm happy because this is my first Fullstack Project I have done.

#### Features:

- Signin / SignUp
- Write Post (support Rich Text Editor)
- Read full blog
- Follow User
- History
- See following user's Blog
- Upvote / Downvote
- Comment
- Delete Post
  
#### Video demo

https://drive.google.com/file/d/1-64HxlDOh1nYRWzxxdPVrwoFXy18y49j/view?usp=share_link

#### Thanks and happy coding!!!

