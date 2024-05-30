/* eslint-disable no-console */

const { Client } = require('pg');
const fs = require('fs');
/*
var connectionString = "PostgreSQL15://testuser:poop@127.0.0.1:5432/mvc_app";


const client = new Client({
    connectionString: connectionString
});

// changethis = your database password
client.connect();*/
const client = new Client({
    user: 'testuser',
    host: '127.0.0.1',
    database: 'mvc_app',
    password: 'changethis',
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

