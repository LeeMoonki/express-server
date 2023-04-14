var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 세션 정보를 가져온다
  const testUserSession = global.session['sid-1234'];
  let userId = null;

  if (testUserSession) {
    userId = testUserSession.userId;
  }

  res.setHeader("Content-Type", "text/html");
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello !</title>

    <style>
      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        border: 0;
        padding: 0;

        white-space: nowrap;
        clip-path: inset(100%);
        clip: rect(0 0 0 0);
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <h1>Hello ${userId ? `user ${userId} !` : 'nobody'}</h1>
  </body>
  </html>`);
});

module.exports = router;
