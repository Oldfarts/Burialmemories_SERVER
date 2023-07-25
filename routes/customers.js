const { Client } = require('pg');
var connectionString = "Burialmemory://testuser:poop@127.0.0.1:5432/mvc_app";

const client = new Client({
    connectionString: connectionString
});

client.connect();

exports.list = function (req, res) {

    client.query('SELECT * FROM public.customer', function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.render('customers/list', { title: "Customers", data: result.rows });
    });

};

exports.add = function (req, res) {
    res.render('customers/add', { title: "Add Customer" });
};

exports.edit = function (req, res) {

    var id = req.params.id;

    client.query('SELECT * FROM public.customer WHERE id=$1', [id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.render('customers/edit', { title: "Edit Customer", data: result.rows });
    });

};

exports.save = function (req, res) {

    var cols = [req.body.name, req.body.address, req.body.email, req.body.phone, req.body.website, req.body.birthdate, req.body.deathdate, req.body.state, req.body.country, req.body.socialnumber];

    client.query('INSERT INTO public.customer(name, address, email, phone, website, birthdate, deathdate, state, country, socialnumber) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING * ', cols, function (err, result) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
        res.redirect('/customers');
    });

};

exports.update = function (req, res) {

    var cols = [req.params.id,req.params.name, req.params.address, req.params.email, req.params.phone, req.params.website, req.params.birthdate, req.params.deathdate, req.params.state, req.params.country, req.params.socialnumber];
    console.log(cols);

    client.query('UPDATE public.customer SET name=$2, address=$3,email=$4, phone=$5, website=$6, birthdate=$7, deathdate=$8, state=$9, country=$10, socialnumber=$11 WHERE id=$1', cols, function (err, result) {
        if (err) {
            console.log("Error Updating : %s ", err);
        }
        res.redirect('/customers');
    });

};

exports.delete = function (req, res) {

    var id = req.params.id;

    client.query('DELETE FROM public.customer WHERE id=$1', [id], function (err, rows) {
        if (err) {
            console.log("Error deleting : %s ", err);
        }
        res.redirect('/customers');
    });

};