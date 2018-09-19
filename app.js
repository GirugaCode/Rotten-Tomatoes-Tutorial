const exphbs = require('express-handlebars');
const reviewController = require('./controllers/reviews');
const commentsController = require('./controllers/comments');
const mongoose = require('mongoose');


const CommentModel = require('./models/comment')
const ReviewModel = require('./models/review')
const express = require('express')
const methodOverride = require('method-override')
const app = express()



// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');


// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// NEW
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

//CREATE
app.post('/reviews', (req, res) => {
  ReviewModel.create(req.body).then((review) => {
    console.log(review);
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message);
  })
})

// SHOW
app.get('/reviews/:id', (req, res) => {
  ReviewModel.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})

// EDIT
app.get('/reviews/:id/edit', function (req, res) {
  ReviewModel.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
})

// UPDATE
app.put('/reviews/:id', (req, res) => {
  ReviewModel.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

// DELETE
app.delete('/reviews/:id', function (req, res) {
  console.log("DELETE review")
  ReviewModel.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// INDEX
app.get('/', (req, res) => {
  ReviewModel.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

// const mongoose = require('mongoose');
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/rotten-potatoes';
mongoose.connect(mongoUrl, {useNewUrlParser: true});

app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port 3000!')
})

reviewController(app, ReviewModel);
commentsController(app, CommentModel);

module.exports = app;
