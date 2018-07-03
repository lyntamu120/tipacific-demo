const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Tip } = require('../models/tip');

const tips = [{
  _id: new ObjectID,
  text: "First test tip",
  tag: 'Guitar'
}, {
  _id: new ObjectID,
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
    let tip = {
      text: 'Test post tip',
      tag: 'PE'
    }
    request(app)
      .post('/tips')
      .send(tip)
      .expect(200)
      .expect((res) => {
        expect(res.body.tip.text).toBe(tip.text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Tip.find({text: tip.text}).then((tips) => {
          expect(tips.length).toBe(1);
          expect(tips[0].text).toBe(tip.text);
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
        }).catch((e) => done(e));
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

describe('GET /tips/:id', () => {
  it('should get the first tip', (done) => {
    const id = tips[0]._id.toHexString();
    request(app)
      .get(`/tips/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.tip.text).toBe(tips[0].text);
      })
      .end(done);
  });

  it('should return a 404 if the id is not valid', (done) => {
    request(app)
      .get(`/tips/1`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 if the id is not in the database', (done) => {
    let id = new ObjectID;
    request(app)
      .get(`/tips/${id}`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /tips/:id', () => {
  it('should remove a tip', (done) => {
    let id = tips[1]._id.toHexString();
    request(app)
      .delete(`/tips/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.tip._id).toBe(id);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Tip.findById(id).then(tip => {
          expect(tip).toBeNull();
          done();
        }).catch(e => done(e));
      });
  });

  it('should return a 404 if tip not found', (done) => {
    request(app)
      .delete(`/tips/1`)
      .expect(404)
      .end(done);
  });

  it ('should return a 404 if objectId is invalid', (done) => {
    let id = new ObjectID;
    request(app)
      .delete(`/tips/${id}`)
      .expect(404)
      .end(done);
  });
});
