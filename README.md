# Squash project setup guide

* Database: **PostgreSQL 13.2**
* Back-end: **TS - NestJS**
* Front-end: **React - NextJS**
## Preparation
1. Install Docker and Docker Compose on your computer.

2. Clone the repository.

3. Make a copy of either `env/docker-compose.override.dev.yml` or `env/docker-compose.override.prod.yml`  based on your execution environment **to the project root** and rename it to `docker-compose.override.yml`. (testing is considered a prod environment)

4. Make a copy of each `*.example.env` in the `env` folder and rename them to `*.dev.env` or `*.prod.env` based on your execution environment.

## Environment configuration 
Environmental variables can be configured for eact container (postgres, nestjs and nextjs) via their respective `.env` files in the project root.

#### Postgres
Field name | Description
-----------|------------
POSTGRES_USER | Username of the database user
POSTGRES_PASSWORD | Password of the database user
POSTGRES_DB | Name of the database the application uses  

#### NestJS
Field name | Description
-----------|------------
POSTGRES_HOST | The address at which the database is available. In this application the name of the database service can be used instead of an IP.
POSTGRES_PORT | The port on which the database is listening
POSTGRES_USER | Username of the database user
POSTGRES_PASSWORD | Password of the database user
POSTGRES_DATABASE | Name of the database the application uses 
RUN_MIGRATIONS | Whether to run migrations on application start.
ENTITIES_DEV | Use the values from the example file. **DO NOT TOUCH**.
MIGRATIONS_DEV | Use the values from the example file. **DO NOT TOUCH**.
ENTITIES_PROD | Use the values from the example file. **DO NOT TOUCH**.
MIGRATIONS_PROD | Use the values from the example file. **DO NOT TOUCH**.
MODE | The type of environment the application is running in. (DEV or PROD)
PORT | The port the application is listening on.
API_URL | The full HTTP URL used for accessing the application.
JWT_SECRET | The secret used in the Json Web Token generation process.
JWT_EXPIRATION_TIME | Validity of the JWT issued on login (in ms)
BASE_USERNAME | Username of the generated user with admin access
BASE_PASSWORD | Password of the generated user with admin access
SMTP_DOMAIN | Domain of the mailserver used by the application to send email.
SMTP_USER | Username for the mail server.
SMTP_PASSWORD | Password for the mail server.
#### NextJS
Field name | Description
-----------|------------
API_URL | The address of the back-end. In this application the name of the back-end service can be used instead of an IP (for a local environment, in a production env this HAS to be the external URL of the server).

## Running the application

##### Back-end development
For back-end development use the 
```
docker-compose up
```
command, that way the console of the containers is attached to the terminal you're running this from.

To stop execution simply terminate the console process.

Have fun.

##### Front-end development
For front-end development start by typing the command
```
docker-compose up -d
```
This starts the database and the back-end in detached mode.
Start the front-end with
```
docker-compose exec next sh
npm run dev
```

To stop the front-end simply terminate the npm process (Ctrl+C).

Good luck.

##### Testing and production
To start the application simply type
```
docker-compose up -d --build
```

To stop the application type
```
docker-compose down
```

## Important
All environments use hot reloading, so you don't have to rebuild the docker container every time you make changes to the code. However, if you make changes to *node_modules* you should stop the containers with 
```
docker-compose down
```
and rebuild with
```
docker-compose build
```
or start the project with the `--build` flag.

This also applies when pulling changes from the repository.


