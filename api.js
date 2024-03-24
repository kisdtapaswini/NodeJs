const express = require("express");
const fs = require("fs");
const short = require("short-uuid") // A UUID (Universal Unique Identifier)

const app = express(); // server is created

//Reading content form a json file
const strContent = fs.readFileSync("./dev-data.json", "utf-8"); // it read the data and return string
//console.log(typeof strContent); //stirng
const userDataStore = JSON.parse(strContent); //convert the string to a array of object
//console.log(Array.isArray(userDataStore)); // true

const getUser= (req, res)=>{
    try{
        console.log("recieved req to fetch the user");
        let id = req.params.id;
        const user = userDataStore.filter(user=>user.id === id)
        if(user){
            res.status(200).json({
                message: user
            })
        }else{
            res.status(404).json({
                message: "User Not found"
            }) 
        }
    }catch(err){
        res.status(500).json({
            status :"Internal server error",
            message: err.message
        })
    }

}

const getUserWithId= (req, res)=>{
    console.log("recieved req to fetch the user with id", req.params);
    res.status(200).json({
        message: `Thanks for asking details of user with id ${req.params.id}`
    })
}
const createUser= (req, res)=>{
    try{
        console.log("recieved post req to create the user");
        const newUser = req.body;
        userDataStore.push(newUser);
        const struserStore = JSON.stringify(userDataStore);
        fs.writeFileSync("./dev-data.json", struserStore);
        res.status(201).json({ // 201 status code is for resource created
                message: "user created",
                user: newUser
        })
        
    }catch (err){
        res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }
}

const sanityMiddleWare = (req, res, next)=>{
    try{
        let body = req.body;
        let isEmpty = Object.keys(body).length == 0;
        if(isEmpty){
            res.status(400).json({
                status: "failure",
                message: "req.body is empty"
            })//Bad request
        }else{
            next();
        }

    }catch(err){
        res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }

}

const updateUser = ()=>{
    console.log("Got patch request to update user details for given user_id");
    console.log("body", req.body);
    res.status(200).json({
        message: "User details updated successfully"
    })
}

const deleteUser = (req, res)=>{
    try{
        let id = req.params.id;
        let idx = userDataStore.findIndex((_)=>_.id == id);
        console.log("Got delete request to delete a user for given User_id", idx);
        if(idx === -1){
            res.status(400).json({
                status: "failure",
                message: "user id is empty"
            })//Bad request
        }else{
            userDataStore.splice(idx, 1);
            const struserStore = JSON.stringify(userDataStore);
            fs.writeFileSync("./dev-data.json", struserStore);
            res.status(200).json({
                status: "Success",
                message: "user is deleted"
            })
        }


    }catch(err){
        res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }
}

app.use(express.json());
// TO get any resource
app.get("/api/user/:id", getUser);

// TO get any particular user
app.get("/api/user/:id", getUserWithId);

// TO create any resource
app.post("/api/user", sanityMiddleWare, createUser); // Chaining of callbacks an dreplace below two lines with this

// app.post("/api/user", sanityMiddleWare); // No Chaining of callbacks

// app.post("/api/user", createUser); // No Chaining of callbacks

//TO update a particular user
app.patch("/api/user", updateUser);

//To delete a user
app.delete("/api/user/:id", deleteUser);

/**
 * the callback inside app.use will be called for every request
 * we get two params req maps to requesy and res maps to response
 */
app.use(function(req, res){
    console.log("recieved the req");
    res.status(404).json({
        "message":"Resource not found"
    });

});

//Listening all http requests 
app.listen(3000, function(){
    console.log("listening to port 3000");
})