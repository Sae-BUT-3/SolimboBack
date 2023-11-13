'use strict';

const Hapi = require('@hapi/hapi');
const Good = require('@hapi/good');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Blipp = require('blipp');
const HapiSwagger = require('hapi-swagger');
const Package = require('../../../package');
const routes = require('../../interfaces/routes');
const serviceLocator = require('../../infrastructure/config/service-locator')
const Jwt = require('@hapi/jwt');
const createServer = async () => {

  // Create a server with a host and port
  const server = Hapi.server({
    port: process.env.PORT || 3000
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
    {
      plugin: Good,
      options: {
        ops: {
          interval: 1000 * 60
        },
        reporters: {
          myConsoleReporter: [
            {
              module: '@hapi/good-squeeze',
              name: 'Squeeze',
              args: [{ ops: '*', log: '*', error: '*', response: '*' }]
            },
            {
              module: '@hapi/good-console'
            },
            'stdout'
          ]
        }
      },
    },
    {
      plugin: Jwt
    }
  ]);
  // for (const route in routes) {
  //   await server.route(routes[route])
  // }

  server.app.serviceLocator = serviceLocator;



  server.auth.strategy('jwt', 'jwt', {
    keys: process.env.SECRET_ENCODER, // replace with your secret key for signing and verifying JWTs
    verify: {
      aud: 'urn:audience:test',
      iss: 'urn:issuer:test',
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400, // 4 hours
      timeSkewSec: 15
    },
    validate: async (artifacts, request, h) => {
      const {userRepository} = server.app.serviceLocator
      const isValid = !!await userRepository.getByUser(artifacts.decoded.payload.value)
      return {
        isValid,
      };
    },
  });

  await server.register([
    require('../../interfaces/routes/users'),
    require('../../interfaces/routes/spotify')
  ]);

  return server;

};

module.exports = createServer;
