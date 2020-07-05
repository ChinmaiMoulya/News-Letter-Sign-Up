const express = require("express");
// const request = require("request");
const bodyParser = require("body-parser");
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res) {
  const fname = req.body.firstname;
  const lname = req.body.lastname;
  const mail = req.body.email;
  const data = {
    members :[
      {
        email_address: mail,
        status: "subscribed",
        merge_fields:{
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us10.api.mailchimp.com/3.0/lists/66e9650428";
  const options = {
    method: "POST",
    auth: "ChinmaiMoulya:4a1cef0af703f10446ef625801ffa8bd-us10"
  }
  const request = https.request(url,options,function(response) {

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data",function(data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req,res) {
  res.redirect("/");
})


app.listen(3000,function() {
  console.log("Server running at port 3000.");
})


// api key
// 4a1cef0af703f10446ef625801ffa8bd-us10
// list id
// 66e9650428
