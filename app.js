const express = require("express");

const app=express();
/**
 * the callback inside app.use will be called for every request
 * we get two params req maps to requesy and res maps to response
 */
app.use(function(req, res){
    console.log("recieved the req");
    console.log(res.json(3));

});

//Listening all http requests 
app.listen(3000, function(){
    console.log("listening");
})