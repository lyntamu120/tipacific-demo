const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Tip } = require('../models/tip');

beforeEach((done) => {
  Tip.remove({}).then(() => done());
});

describe('POST /tip', () => {
  it('should create a new tip', (done) => {
    var text = 'Test post tip';
    var author = 'Lyn';
    var tag = 'PE';
    request(app)
      .post('/tips')
      .send({text, author, tag})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Tip.find().then((tips) => {
          expect(tips.length).toBe(1);
          expect(tips[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });
});
