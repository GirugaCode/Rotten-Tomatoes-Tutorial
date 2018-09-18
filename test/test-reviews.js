// test-reviews.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const Review = require('../models/review');

const sampleReview =     {
    "title": "Super Sweet Review",
    "movie-title": "La La Land",
    "description": "A great review of a lovely movie."
}

chai.use(chaiHttp);

describe('Reviews', ()  => {

  after(() => {
    Review.deleteMany({title: 'Super Sweet Review'}).exec((err, reviews) => {
      console.log(reviews)
      reviews.remove();
    })
  });

  // make taco name for the test
  it('should index ALL reviews on / GET', (done) => {
    // use chai-http to make a request to your server
    chai.request(server)
        // send a GET request to root route
        .get('/')
        // wait for response
        .end((err, res) => {
          // check that the response status is = 200 (success)
          res.should.have.status(200);
          // check that the response is a type html
          res.should.be.html;
          // end this test and move onto the next.
          done();
        });
  });
});

// TEST NEW
it('should display new form on /reviews/new GET', (done) => {
  chai.request(server)
    .get(`/reviews/new`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
});
  // TEST CREATE
  // TEST SHOW
  it('should show a SINGLE review on /reviews/<id> GET', (done) => {
    var review = new Review(sampleReview);
    review.save((err, data) => {
      chai.request(server)
        .get(`/reviews/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
    });
  });
  // TEST EDIT
  it('should edit a SINGLE review on /reviews/<id>/edit GET', (done) => {
  var review = new Review(sampleReview);
   review.save((err, data) => {
     chai.request(server)
       .get(`/reviews/${data._id}/edit`)
       .end((err, res) => {
         res.should.have.status(200);
         res.should.be.html
         done();
       });
   });
  });
  // TEST CREATE
  it('should create a SINGLE review on /reviews POST', (done) => {
    chai.request(server)
        .post('/reviews')
        .send(sampleReview)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
  });
  // TEST DELETE
});
