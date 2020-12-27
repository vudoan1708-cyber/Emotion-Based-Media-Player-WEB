const request = require('request');
const querystring = require('querystring');

module.exports = (app) => {
  app.get('/callback', (req, res) => {
    const code = req.query.code || null
  
    // options instance
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code',
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')),
      },
      json: true,
    };

    // post request to the client after the redirecting
    request.post(authOptions, (error, response, body) => {
      if (!error && res.statusCode === 200) {
        res.cookie(process.env.ACCESS_TOKEN, body.access_token);
        // res.cookie(process.env.REFRESH_TOKEN, body.refresh_token);
        // res.cookie(process.env.REFRESH_CODE, code);
  
        if (process.env.NODE_ENV === 'production') {
          res.redirect(process.env.FRONTEND_URI);
        } else {
          res.redirect('http://localhost:8080/#/home');
        }
      } else {
        res.redirect('/#' + querystring.stringify({ error: 'invalid_token' }))
      }
    })
  });
};