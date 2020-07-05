const express = require('express');
const app = express();
app.get("/",function(request,response) {
  console.log(request);
  response.send("Hello");
})
app.get("/about",function(request,response) {
  console.log(request);
  response.send("Hello");
})
app.listen(3000,function() {
  console.log("server started on port 3000");
});
