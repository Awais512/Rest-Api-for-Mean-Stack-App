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
      { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/users(.*)/, methods: ['GET', 'OPTIONS'] },
      `${api}/v1/auth/login`,
      `${api}/v1/auth/register`,
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
