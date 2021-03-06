const expressJwt = require('express-jwt');

function authJwt() {
  const secret = process.env.JWT_SECRET;
  const api = 'http://localhost:5000';
  return expressJwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked,
  }).unless({
    path: [
      // { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
      // { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      // { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      // { url: /\/api\/v1\/users(.*)/, methods: ['GET', 'OPTIONS'] },
      // { url: /\/api\/v1\/auth(.*)/, methods: ['POST', 'OPTIONS'] },
      // `http://localhost:5000/v1/auth/login`,
      // `${api}/v1/auth/register`,
      { url: /(.*)/ },
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }

  done();
}
module.exports = authJwt;
