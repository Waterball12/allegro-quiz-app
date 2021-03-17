# Allegro quiz

A quiz app made using .NET 5, ASP.NET, Websocket, RabbitMQ, MassTransit and React Native.

## Current state

The development is still in early stage and currently the app has limited functionality.

## Installation requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [.NET 5 SDK](https://dotnet.microsoft.com/download/dotnet/5.0)
- [Rabbitmq](https://www.rabbitmq.com/)

The .NET 5 SDK is only required if you are planning to download the repository and make changes

## Getting started

Currently only docker method is supported, you could also just download the repository and spin up the servers using Visual Studio

### Docker

This method require you to have Docker installed on your machine, afterwards you can run these commands

```base
# RabbitMQ
docker run -d rabbitmq:3

# WEB API
docker run -d -p 80:80 waterball/allegro-webapi:latest

# Websocket
docker run -d -p 4000:4000 waterball/allegro-webapi:latest

# quizzer
docker run -d -p 6000:6000 waterball/allegro-quizzer:latest
```

## Folder structure

    .
    ├── assets                  # Images/files for the README 
    ├── design                  # [Reference](https://github.com/allegro-quiz/design)
    ├── frontend                # Contains the frontend project with React Native
    │   ├── components          # All the components used across the layout and screens or internally
    │   ├── layout              # The available layout 
    │   ├── screens             # The screens built on top of the layouts
    │   └── types               # Typescript types
    ├── server/src              # Contains the backend files
    │   ├── ApiGateways         # The gateways to access the server
    │   │   ├── Web.API         # The API exposed to the public
    │   │   └── Web.Socket      # The Websocket exposed to the public
    │   ├── Services            # The indipendent services
    │   │   ├── Achievement     # Achievement microserice used to track the user achievements
    │   │   ├── Identity        # Used to authenticate the user
    │   │   └── Quizzer         # Main service, used to create and manages quizzes 
    │   └── Tests               # The test suite used across the server project
    └── README.md

### Design

##### Server

![Server Design](https://raw.githubusercontent.com/allegro-quiz/allegro-quiz-app/main/assets/draft-server.png)
