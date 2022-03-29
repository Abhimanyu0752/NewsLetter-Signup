const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/",function(resq,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  var name = req.body.Fname;
  var last = req.body.lname;
  var mail = req.body.email;


  var data = {
    members: [
      {email_address: mail,
        status : "subscribed",
        merge_fields : {
          FNAME : name,
          LNAME : last
        }

      }
    ]
  };

var jsonData = JSON.stringify(data);


  var options = {
url : "https://us1.api.mailchimp.com/3.0/lists/a72e89fe75",
method : "POST",
headers: {
  "Authorization" : "Abhimanyu 79d90a80d37d676e9979bb4310b45c17-us1"
}  ,

body: jsonData

};

request(options,function(error,response,body){

  if(error){
  res.sendFile(__dirname + "/failure.html");
  }
  else if(response.statusCode===200){
    res.sendFile(__dirname + "/success.html");
  }
  else{
    res.sendFile(__dirname + "/failure.html");
  }
});

});


app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){

  console.log("Server is running on port 3000");
});



