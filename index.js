const express = require("express");
const app = express();
const AWS = require("aws-sdk");

app.use(express.json());
const awsConfig = {
    "region": "a",
    "endpoint": "a",
    "accessKeyId": "a", "secretAccessKey": "a"
};

AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

app.get("/users/:id", async(req, res) => {
    var params = {
        TableName: "users",
        Key: {
            "id": req.params.id
        },
        
    };
    
    try {
    const data = await docClient.get(params).promise();
    if(data.Item!=null) {
        console.log(data.Item.id);
        console.log(data.Item.first_name);
        console.log(data.Item.last_name);
        res.send(data.Item);
    }
    else{
        res.status(404).send("No Item matched");

    }
    }
    catch(err){
        if(err.message=="")
        res.status(500).send(err.message);
    }
})
app.post('/signIn', async (req, res) => {

    
    var params = {
        TableName: "users",
        Item:  req.body
    };
    try{

        const data=await docClient.put(params).promise()
        res.send("Welcome")
    }
    catch(err){res.status(500).send(err.message)}

  })

app.delete("/users/:id", async (req, res) => {

    const params = {
        TableName: "users",
        Key: {
            "id": req.params.id
        }
    };
    try {
        const data = await docClient.get(params).promise();
        if(data.Item!=null) {
            console.log(data.Item.id);
            console.log(data.Item.first_name);
            console.log(data.Item.last_name);
            res.send(data.Item);
        }
        else{
            
            res.status(404).send("No Item matched");
    
        }
        }
        catch(err){
            
            res.status(500).send(err.message);
        }
    const data2= docClient.delete(params, function (err, data) {

        if (err) {
            console.log("users::delete::error - " + JSON.stringify(err, null, 2));
        }
    });
})

app.listen(2000)