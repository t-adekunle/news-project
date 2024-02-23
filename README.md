# News API

Link to hosted project (will land on list of all endpoints):
https://news-project-r24g.onrender.com/api

## Project Summary
Welcome to my News API Project. 

This project involves the building of an API so that application data can be accessed programmatically. 
It mimics the building of a real world backend service, such as Reddit, and provides this information to the front end architecture. 
All of the available endpoints are in the endpoints.json file. 
The functionality that has been implemented allows the user to access all of the endpoints with their description, access all topics, articles and users, access comments for a certain article and filter articles by topic.
The user can also add a comment to an article and delete a comment as well as editing a specific article. 

## Important Information 

### Cloning:

```
git clone https://github.com/t-adekunle/news-project.git
```

### Installing Dependencies

To install the dependencies run:

```
npm install 
```

### Creating environment variables

To create the environment variables so that you can run this project locally:

- create a file called .env.test and a file called .env.development
- **Typically the database names would not be included in the repo for security. I have included them so that the database can be viewed as part of my portfolio. This is not safe or standard practice.**
- in .env.test write 'PGDATABASE=<database_name_here>' This can be found in the setup_sql file and will end in _test
- in .env.development write 'PGDATABASE=<database_name_here>' This can be found in the setup_sql file.
- if this project is going to be public, double check that the .env files have been added to a .gitignore
- Remember to run 'npm run setup-dbs' to create the databases


### Versions

To run this project, a minimum of Node.js v21.5.0 and Postgres 8.11.3 is needed