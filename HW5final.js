/* HW5 - CS290 GET_POST exercise.
mcwalteg: Wally McWalter*/


var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine("handlebars", handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 31205);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// resultget contains the handlebars output format. Get request as per get-loopback-improved in video

app.get('/resultget', function (req, res) {
    var getList = [];
    for (var p in req.query) {
        getList.push({ 'name': p, 'value': req.query[p] })
    }
    var context = {};
    context.dataList = getList;
    res.render('resultget', context)
});

app.post('/resultpost', function (req, res) {
    // for data sent in query string
    var postquery = [];
    for (var p in req.query) {
        postquery.push({ 'name': p, 'value': req.query[p] });
    }
    // for data sent in body

    var bodydata = [];
    for (var p in req.body) {
        bodydata.push({ 'name': p, 'value': req.body[p] });
    }
    var context = {};
    context.bodyInput = bodydata;
    context.dataInput = postquery;

    res.render('resultpost', context);
});

app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});