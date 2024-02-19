# Northcoders News API

To create the environment variables so that you can run this project locally:

- create a file called .env.test and a file called .env.development
- in .env.test write 'PGDATABASE=<database_name_here> This can be found in the setup_sql file and will end in _test
- in .env.development write 'PGDATABASE=<database_name_here> This can be found in the setup_sql file.
- if this project is going to be public, double check that the .env files have been added to a .gitignore
- Remember to run 'npm run setup-dbs' to create the databases