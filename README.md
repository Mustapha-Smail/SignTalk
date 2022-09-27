# SignTalk

Application web d’apprentissage de langue des signes française 

[![Build Status](https://api.travis-ci.com/Mustapha-Smail/SignTalk.svg?branch=main)](https://app.travis-ci.com/github/Mustapha-Smail/SignTalk)
[![Coverage Status](https://coveralls.io/repos/github/Mustapha-Smail/SignTalk/badge.svg)](https://coveralls.io/github/Mustapha-Smail/SignTalk)
[![License](https://img.shields.io/github/license/mustapha-smail/signtalk.svg?style=flat-square)](LICENSE)
[![Tag](https://img.shields.io/github/tag/mustapha-smail/signtalk.svg?label=tag&style=flat-square)](build.gradle)
[![Release](https://img.shields.io/github/release/mustapha-smail/signtalk.svg?style=flat-square)](build.gradle)
[![(Pre-)Release](https://img.shields.io/github/release/mustapha-smail/signtalk/all.svg?label=(pre-)release&style=flat-square)](build.gradle)

## Requirments 
*In order to build and run the application you need:* 
- [JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Gradle 7.5.1](https://gradle.org/install/)
- [MySQL](https://dev.mysql.com/downloads/installer/)
- [Node js (LTS)](https://nodejs.org/en/download/)

## Run the app locally 

This section explains to you how to run this application locally <br>
*NB: This is only the backend of the application, if you want to run the frontend as well please refer to the next setps*

### Backend 

- First you need to clone the code source into your local machine : 
```shell
git clone git@github.com:Mustapha-Smail/SignTalk.git
```
*NB: you need to setup an SSH key on your github account first*

- Connect to your MySQL and create a database named `signtalk`
```mysql
create database signtalk; 
```
- You need to setup your own ID and password for the MySQL connection with the application: <br>
    - Go to [signtalk\src\main\resources\application.properties](signtalk\src\main\resources\application.properties)
    - Change the username and the password to your actual IDs : 
    ```properties 
    spring.jpa.hibernate.ddl-auto=update
    spring.datasource.url=jdbc:mysql://${MYSQL_HOST:localhost}:3306/signtalk
    spring.datasource.username=root
    spring.datasource.password=password
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
    #spring.jpa.show-sql: true
    ```
- Open a terminal, go to your application folder and run the application like so : 
    ```shell
     ./gradlew bootRun
    ```
- Open a brower and go to [http://localhost:8000/api/v01/dictionary](http://localhost:8000/api/v01/dictionary)

### Frontend 

*The code source of the application's frontend is in another github repository* <br> 
*Feel free to check over [here](https://github.com/bkrtraore/SignTalkReact)*

- First you need to clone the code source into your local machine : 
```shell
git clone git@github.com:bkrtraore/SignTalkReact.git
```
*NB: you need to setup an SSH key on your github account first*

- Open a terminal, go to your application's frontend folder and run the following command to import node modules : 
    ```shell
     npm install 
    ```

- run the application like so : 
    ```shell
     npm start 
    ```
- Open a brower and go to [http://localhost:3000](http://localhost:3000)



## Collaborators 

- [Bakari](https://github.com/bkrtraore)
- [Lamia](https://github.com/lamiaakli)
- [Mustapha](https://github.com/Mustapha-Smail)
- [Thomas](https://github.com/tsgo3)
