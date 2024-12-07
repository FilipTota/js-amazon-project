// built-in class we are gonna use to create new HTTP message to send to the backend
// message = request
const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  // function runs after respons loads
  console.log(xhr.response);
});

// to setup request from above we will use .open()
xhr.open("GET", "https://supersimplebackend.dev"); // 1. parameter is a type of message/request we want to do and 2. parameter is URL of the backend that we want to send the message/request to
xhr.send(); // this sends the message/request across the internet to backend computer

// xhr.response; // this response will be undefined because it takes time to get the response from request we sent
// xhr.send is asyncronous code which means that it does not wait for that line of code to finish, it send the request and then immediately goes to the next line

// URL Paths
// path comes afer the domain name (https://supersimplebackend.dev/hello, https://supersimplebackend.dev/products/first...)
// each path gives us different response:

// xhr.open("GET", "https://supersimplebackend.dev/hello");
// xhr.send();

// xhr.open("GET", "https://supersimplebackend.dev/products/first");
// xhr.send();

// a backend only supports a certain set of URL paths, which means that we decide which url paths are supported and how the backend will response to each path

// xhr.open("GET", "https://supersimplebackend.dev/not-supported");
// xhr.send();
// this path does not exists and it returns error

// List of all URl paths that are supported is called backend API
// API - application programming interface
