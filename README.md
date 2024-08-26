API Documentation - ROR
Overview
This API is developed using NestJS, a progressive Node.js framework that allows the creation of scalable and efficient applications. The API follows SOLID principles to ensure maintainable and extensible code. It is designed to serve as the backend for several frontend applications developed with Next.js, including Estetica Pink, Endodoncista-Cuernavaca, and Pediatra-Cuernavaca.
Main Modules
1. AppModule
The AppModule is the root module of the application, responsible for orchestrating and interconnecting the other modules. It is the foundation on which the application is built, allowing the integration of all services and functionalities provided by the API.
2. AuthModule
The AuthModule manages everything related to authentication and authorization of users. It implements a system based on JWT (JSON Web Tokens) to handle user sessions, ensuring secure access to the API's various routes and resources. User passwords are securely stored in the database using bcrypt for hashing, ensuring their confidentiality.
3. UsersModule
The UsersModule is responsible for managing the User entity, providing services for the creation, updating, retrieval, and deletion of users. This module is designed to efficiently handle the CRUD (Create, Read, Update, Delete) operations associated with the application's users, ensuring data integrity and consistency.
4. VerificationModule
The VerificationModule handles user verification, focusing particularly on email confirmation. It uses the Nodemailer tool to send verification emails to users, ensuring that only verified users can access certain functionalities of the application.
5. ReviewsModule
The ReviewsModule groups the necessary services for managing user reviews. This module allows users to create, update, retrieve, and delete reviews, providing a simple and efficient interface for handling feedback and ratings in the various applications that use this API.
Integration with Frontend Applications
The API is designed to integrate efficiently with frontend applications developed in Next.js. Some of the applications currently using this API include:
Estetica Pink: An application oriented towards the beauty and aesthetics sector.
Endodoncista-Cuernavaca: A platform focused on managing appointments and reviews for an endodontics clinic.
Pediatra-Cuernavaca: An application aimed at managing patients and reviews in a pediatric clinic.
Technical Considerations
Database: The API uses MongoDB as the primary database system, leveraging its flexibility and scalability to handle unstructured data.
Security: Best security practices are implemented, such as encrypted password storage and user validation through email.
Architecture: The API follows a modular approach, making it easy to maintain and scale, allowing functionalities to be added or modified without affecting the overall system.




<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
