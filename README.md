Time-M
======
A revolutionary way for students to manage their time.


## Description

TimeM is a web application that guilt trips high-school and college students from wasting their 
precious time on social media website. A student's impaired alertness decreases productivity 
significantly due to a lack of sleep, consequently affecting their grades. Using our elegant sleep clock will 
show the user at what time he/she spent time on social media websites. Our goal is for students
to focus spend their time on completing their homework, which ultimately will lead to more sleep
time for students. 


## Quickstart

Use step 1 below to start web application. 


## 1. Run Simple HTTP Server
Create a Python Local Server in order to see Polymer elements on the webpage. 
Simply run the command below:

```
$ run
Serving HTTP on 0.0.0.0 port 8050 ...
127.0.0.1 - - [20/Aug/2016 16:15:49] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:49] "GET /css/bootstrap.min.css HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:49] "GET /css/carousel.css HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:49] "GET /css/style.css HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:49] "GET /js/jquery.min.js HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:49] "GET /js/jquery.cookie.js HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:49] "GET /js/check_chrome_extension.js HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:49] "GET /js/index.js HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:49] "GET /components/paper-input/paper-input.html HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:49] "GET /js/parse-1.2.19.min.js HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:49] "GET /js/nav-hoverimg.js HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:49] "GET /js/bootstrap.min.js HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:49] "GET /images/mainbackground.jpg HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:49] "GET /footerMain/img/favicon.png HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:49] "GET /components/polymer/polymer.html HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:49] "GET /components/polymer/polymer.js HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:49] "GET /components/core-input/core-input.html HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:49] "GET /components/core-style/core-style.html HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:50] "GET /components/polymer/layout.html HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:50] "GET /components/core-input/core-input.css HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:50] "GET /components/paper-input/paper-input.css HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:50] "GET /images/icon_works.png HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:50] "GET /images/icon_contact.png HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:50] "GET /images/icon-assignment.png HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:50] "GET /images/favicon.png HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:55] "GET /images/icon-assignment_hover.png HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:56] "GET /assignments.html HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:56] "GET /css/bootstrap.css HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:56] "GET /css/normalize.css HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:56] "GET /css/nav.css HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:56] "GET /js/common.js HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:56] "GET /components/platform/platform.js HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:56] "GET /css/style-graphic.min.css HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:56] "GET /js/jquery-2.1.4.min.js HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:56] "GET /js/start-array.js HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:56] "GET /js/getSettings.js HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:56] "GET /js/toggle.js HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:56] "GET /js/startStopHandler.js HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:56] "GET /js/assignments.js HTTP/1.1" 200 -
127.0.0.1 - - [20/Aug/2016 16:15:56] "GET /js/new-circle.js HTTP/1.1" 200 -
...
```

* NOTE: Be sure to update your local path because the run.sh file is located in the bin directory.
  To do this, run: `export PATH=$PATH:bin` 
  
## 2. Go to the application

Type `localhost:8050` in your browser to get to the application.