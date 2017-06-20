# Hoola Server

This repository holds the code for the Hoola Server and is used to access the Hoola SQL Database.

The front end web application can be found at: https://github.com/johnwu10/hoola-webapp

## Prerequisites

Install Node.js and NPM globally. Example using brew:

```
brew install node
brew install npm
```

Install postgresql globally. Example using npm:

```
npm install -g postgresql
```

## Setting environment variables

Create a file called .env and add the environemnt variables following the same template as the example file .env.example

## Installing dependencies

```
npm install
```

## Start server

```
node server.js
```
Once server is started, endpoints can be reached at port 5000.