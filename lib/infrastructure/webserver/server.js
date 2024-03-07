'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Blipp = require('blipp');
const HapiSwagger = require('hapi-swagger');
const Package = require('../../../package');
const routes = require('../../interfaces/routes');
const serviceLocator = require('../../infrastructure/config/service-locator')
const Jwt = require('@hapi/jwt');
const strategy = require("../config/strategy")
const Path = require("path");
const refreshTokens = require("../routine/refreshTokens")
const removeExpiredConfirmTokens = require("../routine/removeExpiredConfirmTokens")
const HapiCors = require('hapi-cors');
const createServer = async () => {
  // Create a server with a host and port
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    routes:{
      files: {
        relativeTo: Path.join(__dirname.split("\\").slice(0,-3).join("/")+'/upload')
      }
    }
  });

  // Register vendors plugins
  await server.register([
    Blipp,
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Test API Documentation',
          version: Package.version,
        },
      }
    },
    // {
    //   plugin: Good,
    //   options: {
    //     ops: {
    //       interval: 1000 * 60
    //     },
    //     reporters: {
    //       myConsoleReporter: [
    //         {
    //           module: '@hapi/good-squeeze',
    //           name: 'Squeeze',
    //           args: [{ ops: '*', log: '*', error: '*', response: '*' }]
    //         },
    //         {
    //           module: '@hapi/good-console'
    //         },
    //         'stdout'
    //       ]
    //     }
    //   },
    // },
    {
      plugin: Jwt
    },
    {
      plugin: HapiCors,
      options: {
        origins: ["http://"+process.env.FRONT_URL],  // Specify the allowed origins
        methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify the allowed HTTP methods
      },
    }
  ]);
  // for (const route in routes) {
  //   await server.route(routes[route])
  // }

  server.app.serviceLocator = serviceLocator;


  server.auth.strategy('jwt', 'jwt', strategy(serviceLocator));

  await server.register([
    require('../../interfaces/routes/users'),
    require('../../interfaces/routes/spotify'),
    require('../../interfaces/routes/review'),
    require('../../interfaces/routes/upload'),
    require('../../interfaces/routes/friends'),
  ]);
  refreshTokens(serviceLocator)
  removeExpiredConfirmTokens(serviceLocator)
  return server;

};

module.exports = createServer;
