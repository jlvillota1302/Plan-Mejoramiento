const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors=require('cors');



//middlerares
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


app.use(require("./routes/index"));
app.listen(3000);
console.log("server on port 3000");
