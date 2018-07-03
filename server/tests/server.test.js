const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Tip } = require('../models/tip');

const tips = [{
  text: "First test tip",
  tag: 'Guitar'
}, {
  text: "Second test tip",
  tag: 'Dota2'
}];
beforeEach((done) => {
  Tip.remove({}).then(() => {
    return Tip.insertMany(tips);
  }).then(() => done());
});

describe('POST /tip', () => {
  it('should create a new tip', (done) => {
    var text = 'Test post tip';
    var tag = 'PE';
    request(app)
      .post('/tips')
      .send({text, tag})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Tip.find({text}).then((tips) => {
          expect(tips.length).toBe(1);
          expect(tips[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('Should not create a new tip with invalid data', (done) => {
    request(app)
      .post('/tips')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Tip.find().then((tips) => {
          expect(tips.length).toBe(2);
          done();
        }).catch((e) => done());
      });
  });
});

describe('GET /tips', () => {
  it('should get all tips', (done) => {
    request(app)
      .get('/tips')
      .expect(200)
      .expect((res) => {
        expect(res.body.tips.length).toBe(2);
      })
      .end(done);
  });
});
