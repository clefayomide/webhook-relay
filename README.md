<p align="center">
Webhook Relay
</p>

## 🧩 Overview

Webhook Relay is a plug-and-play, open-source template designed for **payment companies, SaaS platforms, and fintech startups**. It unifies inconsistent webhook structures from various payment gateways into a **standardized event format**, so you can scale integrations faster and maintain consistency across your stack.

Currently, it includes webhook setup support for:

- Interswitch Payment Gateway (IPG)

## ✨ Features

- Signature validation middleware according to gateway standard

- Custom event mapping per gateway

- Database-agnostic design – bring your own storage logic (PostgreSQL, MongoDB, Firebase, etc.)

- Easily extensible for multiple payment gateways

- Designed to be self-hosted and audit-friendly


## Versions

This project was bootstrapped using the following versions

- NestJS v11.0.6
- Node v20.17.0
- Yarn v1.22.19

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

