# Movies App

## Requirements

Or install from package managers

- [docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)
- [node.js](https://nodejs.org/es/download/)

## How it works

to make run the project, you just need to run

```sh
$ docker-compose up --build
```

This will start up the Rails API, then you should run the Frontend APP running a few more commands

```sh
$ export REACT_APP_MOVIE_API_URL=http://localhost:8080
```

This will setup our API URL for the client.

Then go to the frontend project

```sh
$ cd movie-ssr-frontend
```

And run the following command

```sh
$ yarn install && yarn dev
```

or

```sh
$ npm i && npm run dev
```

And that's it, youre ready to go.

## Libraries and dependencies List

I really tryed to keep it simple.

- [docker-compose](https://docs.docker.com/compose/install/)
- [docker](https://docs.docker.com/get-docker/)
- [pg](https://rubygems.org/gems/pg/versions/0.18.4)
- [devise](https://github.com/heartcombo/devise)
- [devise-jwt](https://github.com/waiting-for-dev/devise-jwt)
- [active_model_serializers](https://github.com/rails-api/active_model_serializers)
- [CRA](https://reactjs.org/docs/create-a-new-react-app.html)
- [react.js](https://reactjs.org/)
- [react-router](https://reacttraining.com/react-router/web/guides/quick-start)
- [axios](https://github.com/axios/axios)
- [semantic-ui-react](https://react.semantic-ui.com/)

## Routes

- [POST] /signup
  ```json
  {
    "user": {
      "email": "test@mail.com",
      "password": "aSecurePasword12345"
    }
  }
  ```
- [POST] /login
  ```json
  {
    "user": {
      "email": "test@mail.com",
      "password": "aSecurePasword12345"
    }
  }
  ```
- [POST] api/v1/persons
  ```json
  {
    "person": {
      "last_name": "Doe",
      "first_name": "Jhon",
      "alias": "The Claw",
      "person_roles": [
        {
          "movie_id": "c707401f-4595-4a05-beab-ba3e05c13b36",
          "role_type": "ACTOR"
        },
        {
          "movie_id": "c707401f-4595-4a05-beab-ba3e05c13b36",
          "role_type": "DIRECTOR"
        },
        {
          "movie_id": "c707401f-4595-4a05-beab-ba3e05c13b36",
          "role_type": "DIRECTOR"
        }
      ]
    }
  }
  ```
- [GET] api/v1/persons/:id
- [PUT] api/v1/persons/:id
  ```json
  {
    "person": {
      "first_name": "Foo",
      "person_roles": [
        {
          "movie_id": "c707401f-4595-4a05-beab-ba3e05c13b36",
          "role_type": "ACTOR"
        }
      ]
    }
  }
  ```
- [DELETE] api/v1/persons/:id

- [POST] api/v1/movies
  ```json
  {
    "movie": {
      "title": "Jhon Wick",
      "release_year": 2016,
      "casting": [
        {
          "person_id": "65edbcd6-77d7-41c2-902c-19cbe2e17df3"
        }
      ],
      "directors": [
        {
          "person_id": "65edbcd6-77d7-41c2-902c-19cbe2e17df3"
        }
      ],
      "producers": [
        {
          "person_id": "65edbcd6-77d7-41c2-902c-19cbe2e17df3"
        }
      ]
    }
  }
  ```
- [GET] api/v1/movies/:id
- [GET] api/v1/movies
- [PUT] api/v1/movies/:id
  ```json
  {
    "movie": {
      "title": "Naranja",
      "release_year": 2020
    }
  }
  ```
- [DELETE] api/v1/movies/:id
