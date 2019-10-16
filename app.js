var express = require("express");
var app = express();
var router = express.Router();

var config = require('./config')
var jwt = require('jsonwebtoken');

var cors = require('cors');
var mongoose = require("mongoose");
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

//mongodb connection start
mongoose.connect("mongodb://localhost/nimapinfotech",function(err){
if(err){
    console.log('The error is ',err)
}
else{
console.log('The database connected')
}
})
//mongodb connection end

// Start JWT
var checkJWT = function (req, res, next) {
    
    console.log("==>inside jwt"+req.headers.token);
    if(req.headers.token != undefined ){
            console.log("token present");
        jwt.verify(req.headers.token, config.secret, function (err, data) {
            if (err) {
                res.json({
                    status: false,
                    message: err
                })
            }
            else {
                req.user = data;
                next();//move to next routing
            }

        })
    }
    else{
        console.log("token not present");
        res.json({
            status : false,
            message : "Token not present"
        })
    }
}
// End JWT 


router.post('/login', function (req, res) {
    if (req.body.email == "mohan@gmail.com" && req.body.pass == "12345") {
        const user = {
            name: "Mohan",
            age: 21,
            sal: 450,
            department: "Data science"
        }

        var token = jwt.sign(user, config.secret);
        res.json({
            status: true,
            token: token
        })
    }

})

//category start
var categoryRouter = require('./routes/category')
app.use('/api/admin/categories', cors(),categoryRouter)
//category end

//product start
var productRouter = require('./routes/product');
app.use('/api/admin/products', cors(), checkJWT, productRouter)
//product stop

app.use(cors());

app.use('/api/admin', router);
app.listen(config.port, function () {
    console.log('The server running on port number ' + config.port)
})