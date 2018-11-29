const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../app');

chai.use(chaiHttp);

let token, movie_id;

describe('/api/movies test', () => {
   before((done) => {
       chai.request(server)
           .post('/api/users/auth')
           .send({ username : 'yigit61' , password : 'yigit' })
           .end((err, res) => {
               token = res.body.token;
               done();
           });
   });

   describe('/GET movies', () => {
       it('it should GET all the movies', (done) => {
          chai.request(server)
              .get('/api/movies')
              .set('x-access-token', token)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  done();
              })
       });
   });

   describe('/POST movie', () => {
      it('it should POST a movie' , (done) => {
          const movie = {
              title : "udemy",
              director_id : "5bf881a4fd96423d8f6495e2",
              category : "Dram",
              country : "Turkiye",
              year : 1950,
              imdb_score : 8
          }
          chai.request(server)
              .post('/api/movies')
              .send(movie)
              .set('x-access-token', token)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('title');
                  res.body.should.have.property('director_id');
                  res.body.should.have.property('category');
                  res.body.should.have.property('country');
                  res.body.should.have.property('year');
                  res.body.should.have.property('imdb_score');
                  movie_id = res.body._id;
                  done();
              });
      });
   });

   describe('/GET/:director_id movie', () => {
      it('it should GET a movie by the given id', (done) => {
         chai.request(server)
             .get('/api/movies/' + movie_id)
             .set('x-access-token', token)
             .end( (err, res) =>{
                 res.should.have.status(200);
                 res.should.be.a('object');
                 res.body.should.have.property('title');
                 res.body.should.have.property('director_id');
                 res.body.should.have.property('category');
                 res.body.should.have.property('country');
                 res.body.should.have.property('year');
                 res.body.should.have.property('imdb_score');
                 res.body.should.have.property('_id').eql(movie_id);
                 done();
             });
      });
   });
});