require('dotenv').config(); // SUPPORT .ENV FILES
const express = require('express'); // BRING IN EXPRESS
//var session = require('express-session');
const app = express(); // INITILIZE APP
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');

const http = require('http'); // CORE MODULE, USED TO CREATE THE HTTP SERVER
const server = http.createServer(app);
//const upload = multer({ dest: 'uploads/' });

/*
* START SERVER
*/
server.listen(4000,'192.168.1.209');
// CREATE HTTP SERVER USING APP and setup IP Adderss and port
const port = /*process.env.PORT ||*/ '4000'; // INITIALIZE DEFAULT PORT OR PORT FROM ENVIRONMENT VARIABLE
const logger = require('morgan'); // TERMINAL LOGGER: SHOWS THE ROUTE AND STATUS CODE FOR EVERY REQUEST

// VIEW ENGINE SETUP
app.set('port', /*process.env.PORT ||*/ 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set({ uploadDir: __dirname + '/public/uploads' });


app.use(logger('dev')); // USE MORGAN
app.use(bodyParser.urlencoded({ extended: false })); // PARSE application/x-www-form-urlencoded
app.use(bodyParser.json()); // PARSE application/json
app.use(express.json());
//fileUpload = require('express-fileupload'),
//app.use(fileUpload());

// USE STATIC FILES (CSS, JS, IMAGES)
app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// SECURITY
app.disable('x-powered-by');

// SET THE PORT
app.set('port', port);

// newline CUSTOMERDATA routes
var customerdata = require('./routes/customerdata'); // CUSTOMERDATA ROUTES
//app.get('/customerdata', customerdata.list);
app.get('/customerdata/add', customerdata.add);//File upload
app.post('/customerdata/add', customerdata.save);

// newline INTERFACE routes
var interface = require('./routes/interface'); // INTERFACE ROUTES
app.post('/interface', interface.getCustomerAllData);

// TEST -------------------TEST
// TEST -------------------TEST
// TEST -------------------TEST


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

//var upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'public')));
var upload = multer({ storage: storage }).array('file', 2);

app.post('/upload', function (req, res) {

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    var upload = multer({ storage: storage }).array('file',2);

    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        } else {
            console.log(req.body);
            console.log(req.files);
            // and move file to final destination...  
            customerdata.save(req,res);
        }
    });
    res.redirect('/customerdata')

});
// TEST -------------------TEST
// TEST -------------------TEST
// TEST -------------------TEST


// LISTEN ON SPECIFIED PORT
//server.listen(port);
// LOG WHICH PORT THE SERVER IS RUNNING ON
console.log('Server listening localhost address: ' + 'on Port:' + port);

// INDEX.HTML - start page
const router = express.Router();
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname  + 'index'));
    //__dirname : It will resolve to your project folder.
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});


// EXPORT APP
module.exports = storage;
module.exports = app;

