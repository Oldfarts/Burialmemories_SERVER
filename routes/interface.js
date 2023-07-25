const { Client } = require('pg');
const { result } = require('../config/config');
/*
var connectionString = "Burialmemory://testuser:poop@127.0.0.1:5432/mvc_app";


const client = new Client({
    connectionString: connectionString
});

client.connect();
*/
const client = new Client({
    user: 'testuser',
    host: '127.0.0.1',
    database: 'mvc_app',
    password: 'poop',
    port: 5432,
})

client.connect()
exports.getCustomerInfo = function (request, response){
    console.log('Got body:', request.body);

    let parsedObj = {}
    try {
        parsedObj = JSON.stringify(request.body);
        console.log('Parsed object:', parsedObj);
    } catch (e) {
        console.log("Cannot parse because data is not is proper json format")
    }
    const obj = JSON.parse(parsedObj);
    console.log('Name:', obj.name);
  
    client.query('SELECT * FROM public.customer WHERE name=$1', [obj.name], function (err, results) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        else {
            console.log('Body2:', results);
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/plain');

            var myObj = {};
            myObj.results = results.rows;
            JSON.stringify(myObj);
            response.json(myObj);
        }
    });

};

exports.getCustomerImage = function (request, response) {
    console.log('Got body:', request.body);

    let parsedObj = {}
    try {
        parsedObj = JSON.stringify(request.body);
        console.log('Parsed object:', parsedObj);
    } catch (e) {
        console.log("Cannot parse because data is not is proper json format")
    }
    const obj = JSON.parse(parsedObj);
    console.log('Name:', obj.name);

    client.query('SELECT * FROM public.customerdata WHERE name=$1', [obj.name], function (err, results) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        else {
            console.log('Body2:', results);
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/plain');

            //----------------------------------------
            //----------------------------------------
            let data = results.rows;
            var stringValue;
            console.log('Get data from results:', data);
            let parsedObj = {}
            try {
                parsedObj = JSON.stringify(data);
                // console.log('Parsed object:', parsedObj);
            } catch (e) {
                console.log("Cannot parse because data is not is proper json format")
            }
            stringValue = JSON.parse(parsedObj);
            console.log('Get image of whole data:', stringValue);

           
            // Create a buffer from the string
            let bufferObj = Buffer.from(stringValue[0]['image']['data'], "base64");

            // Encode the Buffer as a utf8 string
            let decodedString = bufferObj.toString("utf8");
           /* 
            fs.writeFile("./public/images/download.jpg", decodedString, 'base64', function (err, data) {
                if (err) {
                    console.log('Error writing the image.', err);
                }
                console.log('Success on writing the image.', data);
            });*/
            //----------------------------------------
            //----------------------------------------

            var myObj = {};
            myObj.data = decodedString;
            JSON.stringify(myObj);
            response.json(myObj);
        }
    });
};

exports.getCustomerVideo = function (request, response) {
    console.log('Got body:', request.body);

    let parsedObj = {}
    try {
        parsedObj = JSON.stringify(request.body);
        console.log('Parsed object:', parsedObj);
    } catch (e) {
        console.log("Cannot parse because data is not is proper json format")
    }
    const obj = JSON.parse(parsedObj);
    console.log('Name:', obj.name);

    client.query('SELECT * FROM public.customerdata WHERE name=$1', [obj.name], function (err, results) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        else {
            console.log('Body2:', results);
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/plain');

            //----------------------------------------
            //----------------------------------------
            let data = results.rows;
            var stringValue;
            console.log('Get data from results:', data);
            let parsedObj = {}
            try {
                parsedObj = JSON.stringify(data);
                // console.log('Parsed object:', parsedObj);
            } catch (e) {
                console.log("Cannot parse because data is not is proper json format")
            }
            stringValue = JSON.parse(parsedObj);
            console.log('Get video of whole data:', stringValue);


            // Create a buffer from the string
            let bufferObj = Buffer.from(stringValue[0]['video']['data'], "base64");

            // Encode the Buffer as a utf8 string
            let decodedString = bufferObj.toString("utf8");
            /* 
             fs.writeFile("./public/images/download.jpg", decodedString, 'base64', function (err, data) {
                 if (err) {
                     console.log('Error writing the image.', err);
                 }
                 console.log('Success on writing the image.', data);
             });*/
            //----------------------------------------
            //----------------------------------------

            var myObj = {};
            myObj.data = decodedString;
            JSON.stringify(myObj);
            response.json(myObj);
        }
    });
};

exports.getCustomerAllData = function (request, response) {
    console.log('Got body:', request.body);
    console.log('Got response:', response);

    let parsedObj = {}
    try {
        parsedObj = JSON.stringify(request.body);
        console.log('Parsed object:', parsedObj);
    } catch (e) {
        console.log("Cannot parse because data is not is proper json format")
    }
    const obj = JSON.parse(parsedObj);
    console.log('Name:', obj.name);

    client.query('SELECT * FROM public.customerdata WHERE name=$1', [obj.name], function (err, results) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        else {
            console.log('Body2:', results);
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/plain');

            //----------------------------------------
            //----------------------------------------
            let data = results.rows;
            var stringValue;
            console.log('Get data from results:', data);
            let parsedObj = {}
            try {
                parsedObj = JSON.stringify(data);
                // console.log('Parsed object:', parsedObj);
            } catch (e) {
                console.log("Cannot parse because data is not is proper json format")
            }
            stringValue = JSON.parse(parsedObj);
            console.log('Get video of whole data:', stringValue);


            // Create a buffer from the string
            let bufferVideoObj = Buffer.from(stringValue[0]['video']['data'], "base64");

            // Encode the Buffer as a utf8 string
            let decodedVideoString = bufferVideoObj.toString("utf8");

            // Create a buffer from the string
            let bufferImageObj = Buffer.from(stringValue[0]['image']['data'], "base64");

            // Encode the Buffer as a utf8 string
            let decodedImageString = bufferImageObj.toString("utf8");

            var myObj = {};
            myObj.name = stringValue[0]['name'];
            myObj.text = stringValue[0]['text'];
            myObj.explanation = stringValue[0]['explanation'];
            myObj.image = decodedImageString;
            myObj.video = decodedVideoString;
            JSON.stringify(myObj);
            //console.log(myObj);
            response.json(myObj);
        }
    });
};
