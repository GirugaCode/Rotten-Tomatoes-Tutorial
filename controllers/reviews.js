//reviews.js
const Comment = require('../models/comment')
module.exports = function (app, Review) {

  app.get('/', (req, res) => {
    Review.find()
      .then(reviews => {
        res.render('reviews-index', {reviews: reviews});
      })
      .catch(err => {
        console.log(err);
      });
  });

  // SHOW
  app.get('/reviews/:id', (req, res) => {
    // find review
    Review.findById(req.params.id).then(review => {
      // fetch its comments\
      Comment.find({ reviewId: review._id}).then(comments => {
        // respond with the template with both values
        console.log(comments)
        res.render('reviews-show', { review: review, comments: comments })
      })
    }).catch((err) => {
      // catch errors
    });
  });

}
