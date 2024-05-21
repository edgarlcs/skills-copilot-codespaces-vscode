// Create web server
// npm install express
// npm install body-parser
// npm install ejs
// npm install mongoose

// 1. Import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./models/db.js');
const Comment = require('./models/comment.js');

// 2. Set up express app
const app = express();
const port = 3000;

// 3. Set up view engine
app.set('view engine', 'ejs');

// 4. Set up body-parser
app.use(bodyParser.urlencoded({extended: true}));

// 5. Set up static files
app.use(express.static('public'));

// 6. Set up routes
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/comments', function(req, res) {
    Comment.find({}, function(err, comments) {
        if (err) {
            console.log(err);
        } else {
            console.log(comments);
            res.render('comments', {comments: comments});
        }
    });
});

app.post('/comments', function(req, res) {
    let newComment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });

    newComment.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Comment saved');
            res.redirect('/comments');
        }
    });
});

// 7. Connect to database
mongoose.connect(db.db);

// 8. Start server
app.listen(port, function() {
    console.log('Server started at port ' + port);
});