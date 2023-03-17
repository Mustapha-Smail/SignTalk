# SignTalk

Application web d’apprentissage de langue des signes française

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/Mustapha-Smail/SignTalk/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/Mustapha-Smail/SignTalk/tree/main)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/342e82a4609c4778ae54301239cea412)](https://www.codacy.com/gh/Mustapha-Smail/SignTalk/dashboard?utm_source=github.com&utm_medium=referral&utm_content=Mustapha-Smail/SignTalk&utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/Mustapha-Smail/SignTalk/branch/main/graph/badge.svg?token=ECSVYA6ILM)](https://codecov.io/gh/Mustapha-Smail/SignTalk)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/Mustapha-Smail/SignTalk?style=flat-square)](https://codeclimate.com/github/Mustapha-Smail/SignTalk/maintainability)
[![License](https://img.shields.io/github/license/mustapha-smail/SignTalk.svg?style=flat-square)](LICENSE)
[![Tag](https://img.shields.io/github/tag/mustapha-smail/SignTalk.svg?label=tag&style=flat-square)](https://github.com/Mustapha-Smail/SignTalk/releases/latest)
[![Release](https://img.shields.io/github/release/mustapha-smail/SignTalk.svg?style=flat-square)](https://github.com/Mustapha-Smail/SignTalk/releases/latest)

###### Outdated

[![Build Status](https://app.travis-ci.com/Mustapha-Smail/SignTalk.svg?branch=main)](https://app.travis-ci.com/Mustapha-Smail/SignTalk)

## Requirments

_In order to build and run the application you need:_

- [Node js (LTS)](https://nodejs.org/en/download/)

## Before Running the app locally

- First you need to clone the code source into your local machine :

```shell
git clone git@github.com:Mustapha-Smail/signtalk.git
```

_NB: you need to setup an SSH key on your github account first_

- Go to your app folder, and run this command:

```shell
cd frontend/ && npm install --force && cd .. && npm install
```

_we use force because it won't install some dependecies_

- Create a file name `.env` in your root folder:
  - set the port you want your backend to run in : <br>
    _By default it's 5000_
    ```shell
    PORT=5000
    ```
  - set the URI of your MongoDB Database : <br>
    _Follow this [link](https://www.mongodb.com/docs/atlas/getting-started/) to setup your mongoDB account_ <br>
    _your DB should be named `signtalk`_<br>
    _at some point you need to set up and IP adress; put 0.0.0.0/0_
    ```shell
    MONGO_URI=YOUR_MONGODB_URI
    ```
  - add your JSON Web token secret
    ```shell
    JWT_SECRET=YOUR_JWT_SECRET
    ```
  - add your Daily Api Key and The room id you created on your daily dashboard
    ```shell
    DAILY_API_KEY=YOUR_DAILY_API_KEY
    DAILY_ROOM_ID=YOUR_DAILY_ROMM_ID
    ```
- Create another `.env` file in the `frontend` folder and set the URL of your backend : <br>
  _DO NOT change the variable name_

  ```shell
  REACT_APP_BE_URL=http://localhost:5000/
  REACT_APP_CLOUD_NAME=dugouekf6
  REACT_APP_CLOUD_URL=v1666616632/jauvert_572/
  ```

- You also have to add the DAILY variables :
  ```shell
  REACT_APP_DAILY_DOMAIN=YOUR_DAILY_DOMAIN
  REACT_APP_DAILY_ROOM_ID=YOUR_DAILY_ROMM_ID
  ```

## Run the app locally

This section explains to you how to run this application locally <br>

- Open the terminal, go to the root folder of your app :
  - To import data sample to your DB :
    ```shell
    npm run data:import
    ```
  - To destroy data sample from your DB :
    ```shell
    npm run data:destory
    ```
  - To run the app :
    ```shell
    npm run start
    ```
  - To run the app in dev environment :
    ```shell
    npm run dev
    ```
  - To run the test :
    ```shell
    npm run test
    ```
  - To run only backend :
    ```shell
    npm run server
    ```
  - To run only frontend :
    ```shell
    npm run client
    ```
