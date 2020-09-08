var express = require("express");
const app = express();
var multer = require('multer');
var upload = multer({ storage: storage })

const port = 5000;

app.get('/', (req, res) => {
    res.send("hello people");
});

app.post('/single', upload.single('profile'), (req, res) => {
    try {
      res.send(req.file);
    } catch(err) {
      res.send(400);
    }
});

app.post('/bulk', upload.array('profiles', 4) , (req, res) =>{
    try {
        res.send(req.files);
    } catch(error) {
        console.log(error);
        res.send(400);
    }
});

var storage = multer.diskStorage({
    dest: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

app.listen(port, () => {
    console.log("listening to the port: " + port);
});