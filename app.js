const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "f11068d18f9c4977fe59298642e6a8c1";
  const unit = "metric";
  const URL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(URL, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      // const object = {
      //   name: "Irfan",
      //   favPlayer: "virat",
      // };

      // console.log(weatherData);
      // console.log(JSON.stringify(object));

      const temp = weatherData.main.temp;
      // console.log(temp);
      const description = weatherData.weather[0].description;

      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      // if we want to response more than one then use write method for all data and then use send // res.send("<h1>Temperature is:" + temp + " degrees.</h1>"); //sending response to browser now // console.log(description);
      res.write("<p>The weather is:" + description + "</p>");
      res.write("<h1>The temperature of " + query + " is:" + temp + "</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });

  // res.send("server is running good.");

  // cannot send response more than one at a time
});

app.listen(3000, function (req, res) {
  console.log("Server is running on port 3000.");
});
