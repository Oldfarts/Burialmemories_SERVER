const { Client } = require('pg');
var connectionString = "Burialmemory://testuser:poop@127.0.0.1:5432/mvc_app";

const client = new Client({
    connectionString: connectionString
});

client.connect();

exports.list = function (req, res) {
//    id = req.params.id;
    client.query('SELECT * FROM public.customer',function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.render('customer/list', { title: "Customer", data: result.rows });
    });
};

exports.add = function (req, res) {
    res.render('customer/add', { title: "Add Customer" });
};

exports.edit = function (req, res) {

    var id = req.params.id;

    client.query('SELECT * FROM public.customer WHERE id=$1', [id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.render('customer/edit', { title: "Edit Customer", data: result.rows });
    });

};

exports.save = function (req, res) {

    var cols = [req.body.name, req.body.address, req.body.email, req.body.phone, req.body.website, req.body.birthdate, req.body.deathdate, req.body.state, req.body.country, req.body.socialnumber];

    client.query('INSERT INTO public.customer(name, address, email, phone, website, birthdate, deathdate, state, country, socialnumber) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING * ', cols, function (err, result) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
        res.redirect('/customer');
    });

};

exports.update = function (req, res) {

    var cols = [req.params.name, req.params.address, req.params.email, req.params.phone, req.params.website, req.params.birthdate, req.params.deathdate, req.params.state, req.params.country, req.params.socialnumber, req.params.id];

    client.query('UPDATE public.customer SET name=$1, address=$2,email=$3, phone=$4, website=$5, birthdate=$6, deathdate=$7, state=$8, country=$9, socialnumber=$10 WHERE id = $11', cols, function (err, result) {
        if (err) {
            console.log("Error Updating : %s ", err);
        }
        res.redirect('/customer');
    });

};

exports.delete = function (req, res) {

    var id = req.params.id;

    client.query('DELETE FROM public.customer WHERE id=$1', [id], function (err, rows) {
        if (err) {
            console.log("Error deleting : %s ", err);
        }
        res.redirect('/customer');
    });

};
