/* eslint-disable no-console */

const { Client } = require('pg');
const fs = require('fs');
/*
var connectionString = "PostgreSQL15://testuser:poop@127.0.0.1:5432/mvc_app";


const client = new Client({
    connectionString: connectionString
});

client.connect();*/
const client = new Client({
    user: 'testuser',
    host: '127.0.0.1',
    database: 'mvc_app',
    password: 'poop',
    port: 5432,
})

client.connect()
/*
var express = require('express');
var app = express();

var router = express.Router();

const multer = require('multer');
const upload = multer({dest:'./public/uploads' });
const path = require("path")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});*/

exports.add = function (req, res) {
    res.render('customerdata/add', { title: "Add Data" });
};


exports.upload = function (req, res) {
    var cols = [req.body.name, req.body.text, req.body.video, req.body.image, req.body.explanation];

    client.query('INSERT INTO public.customerdata (name, text, video, image, explanation) VALUES ($1, $2, $3, $4, $5) RETURNING * ', cols, function (err) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
        console.log("Save complete");
        res.redirect('/customerdata');
    });
};

exports.uploadSingleImg = function (request, response) {
    console.log('Got body:', request.body);
    var cols = [req.body.name, req.body.text, req.body.video, req.body.image, req.body.explanation];

    client.query('INSERT INTO public.customerdata (name, text, video, image, explanation) VALUES($1, $2, $3, $4, $5) RETURNING * ', cols, function (err, results) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
        res.redirect('/customerdata');
    });

};

exports.save = function (req, res) {   
    var cols = [req.body.name, req.body.text, req.body.video, req.body.image, req.body.explanation];

    console.log("Trying to save...");
    console.log("Columns:", cols);
 
    console.log('Customerdata body:',req.body);
    console.log('Customerdata files:',req.files);

    let imageBuff = fs.readFileSync('./public/uploads/' + req.files[0].filename);
    console.log('Data:', imageBuff);
    // Create buffer object, specifying utf8 as encoding
    let bufferObj = Buffer.from(imageBuff, "utf8");
    // Encode the Buffer as a base64 string
    let baseImage64String = bufferObj.toString("base64");
    //let base64data = buff.toString('base64');
    //Object.values('Base64data:',base64data);
    //console.log('Base64 encode:', baseImage64String);

    // Read video to buffer
    let videoBuff = fs.readFileSync('./public/uploads/' + req.files[1].filename);
    // Create buffer object, specifying utf8 as encoding
    let bufferObj2 = Buffer.from(videoBuff, "utf8");
    // Encode the Buffer as a base64 string
    let base64VideoString = bufferObj2.toString("base64");

    client.query('INSERT INTO public.customerdata (name, text, explanation) VALUES ($1, $2, $3)', [req.body.name, req.body.text, req.body.explanation], function (err) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
        else {
            client.query('UPDATE public.customerdata SET image=$1 WHERE name=$2', [baseImage64String, req.body.name], function (err, res) {
                if (err)
                    console.log("Error Updating : %s ", err);
            });
            client.query('UPDATE public.customerdata SET video=$1 WHERE name=$2', [base64VideoString, req.body.name], function (err, res) {
                if (err)
                    console.log("Error Updating : %s ", err);
            });
            //res.redirect('/customerdata'); // does not work since upload.html
        }
    });
};

exports.edit = function (req, res) {

    var id = req.params.id;

    client.query('SELECT * FROM public.customerdata WHERE id=$1', [id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.render('customerdata/edit', { title: "Customerdata", data: result.rows });
    });

};

exports.update = function (req, res) {

    var cols = [req.params.name, req.params.text, req.params.video, req.params.image, req.params.explanation, req.params.id];

    client.query('UPDATE public.customerdata SET name=$1, text=$2, video=$3, image=$4, explanation=$5 WHERE id = $6', cols, function (err) {
        if (err) {
            console.log("Error Updating : %s ", err);
        }
        res.redirect('/customerdata');
    });

}; exports.delete = function (req, res) {

    var id = req.params.id;

    client.query('DELETE FROM public.customerdata WHERE id=$1', [id], function (err) {
        if (err) {
            console.log("Error deleting : %s ", err);
        }
        res.redirect('/customerdata');
    });

};

exports.list = function (request, response) {

    client.query('SELECT * FROM public.customerdata', function (err, result) {
        if (err) {
            console.log("Error retrieving: %", err);
        }
        else {
            let data = result.rows;
            var stringValue;
            //console.log('Get data from results:', data);
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
            let decodedImageString = bufferObj.toString("utf8");
            fs.writeFile("./public/images/output.jpg", decodedImageString, 'base64', function (err, data) {
                if (err) {
                    console.log('Error writing the image.', err);
                }
                console.log('Success on writing the image.', data);
            });

            // Create a buffer from the string
            let bufferObj2 = Buffer.from(stringValue[0]['video']['data'], "base64");

            // Encode the Buffer as a utf8 string
            let decodedVideoString = bufferObj2.toString("utf8");
            fs.writeFile("./public/videos/output.mp4", decodedVideoString, 'base64', function (err, data) {
                if (err) {
                    console.log('Error writing the video.', err);
                }
                console.log('Success on writing the video.', data);
            });
            response.render('customerdata/list', { title: "Customerdata", data: result.rows });
        }
    });
};
