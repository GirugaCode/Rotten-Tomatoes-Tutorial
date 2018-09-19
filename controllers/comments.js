// comments.js

module.exports = function(app, Comment) {

  // CREATE Comment
  app.post('/reviews/comments', (req, res) => {
    console.log(req.body)
    Comment.create(req.body)
    .then(comment => {
      console.log(res,body)
      res.redirect(`/reviews/${comment.reviewId}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
  });
}
