'use strict';

var currentId = 5;

module.exports = function (app) {
  const express = require('express');
  let usersRouter = express.Router();

  /*
    catches the Update request on a user
    PATCH "localhost:4200/api/users/1"
  */
  usersRouter.patch('/:id', function (request, res) {
    // Update data from the UI
    const user = usersJson.data.find((user) => {
      return user.id === request.params.id;
    });
    const { body: { data: { attributes: newAttributes } = {} } = {} } = request;
    Object.assign(user, { attributes: newAttributes });
    res.send();
  });

  /*
    catches the GET request on a user
    GET "localhost:4200/api/users/1"
  */
  usersRouter.get('/:id', function (request, res) {
    const user = usersJson.data.find((user) => {
      return user.id === request.params.id;
    });

    res.send({ data: user });
  });

  /*
    catches the index request on users
    GET "localhost:4200/api/users"
  */
  usersRouter.get('/', function (req, res) {
    res.send(usersJson);
  });

  usersRouter.post('/', function (request, res) {
    const { body: { data: { attributes: newAttributes } = {} } = {} } = request;
    const user={
      id: `${currentId}`,
      type: 'user',
      attributes: newAttributes
    }
    currentId++;
    usersJson.data.push(user);
    res.send({data: user});
  })

  app.use(
    '/api/users',
    require('body-parser').json({ type: 'application/*+json' }),
    usersRouter
  );
};

// USER MOCK DATA
const usersJson = {
  data: [
    {
      id: '1',
      type: 'user',
      attributes: {
        name: 'Albert Einstein',
        image: '/images/Einstein.jpg',
        value: 'false',
      },
    },
    {
      id: '2',
      type: 'user',
      attributes: {
        name: 'Walt Disney',
        image: '/images/Walt.jpg',
        value: 'false',
      },
    },
    {
      id: '3',
      type: 'user',
      attributes: {
        name: 'Bruce Lee',
        image: '/images/Bruce.jpg',
        value: 'false',
      },
    },
    {
      id: '4',
      type: 'user',
      attributes: {
        name: 'Neil Armstrong',
        image: '/images/Neil.jpg',
        value: 'false',
      },
    },
  ],
};
