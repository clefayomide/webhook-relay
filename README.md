<p align="center">
Webhook Relay & Processing Template
</p>

## 🧩 Overview

This project is a robust and scalable template for handling webhooks, designed specifically for payment providers and third-party API integrations. It offers a plug-and-play system to reliably receive, verify, queue, and process webhook events, featuring built-in support for idempotency checks and background job handling.

Currently, it includes webhook setup support for:

- Interswitch Payment Gateway (IPG)

## ✨ Features

🔐 Signature validation middleware for webhook security

🧩 Modular architecture with pluggable event handlers

🔁 Idempotency checks using Redis to prevent duplicate processing

📬 Optional background job queue (BullMQ/RabbitMQ) for async processing

📦 Database-agnostic design – bring your own storage logic (PostgreSQL, MongoDB, Firebase, etc.)

🧪 Easily extensible for multiple payment gateways

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

