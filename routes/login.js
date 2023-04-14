const express = require('express');
const router = express.Router();

// /login
router.get('/', function(req, res, next) {
  console.log(global.session);
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
    <h1>Login Page</h1>
    <form id="login-form">
      <label for="login-id" class="visually-hidden">아이디</label>
      <input id="login-id" name="id" type="text" />
      <label for="login-password">비밀번호</label>
      <input id="login-password" name="password" type="password" >

      <button type="submit">로그인</button>
    </form>

    <script>
      const $loginForm = document.querySelector('#login-form');

      $loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const id = formData.get('id');
        const password = formData.get('password');

        try {
          const response = await fetch('http://localhost:3030/login/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id,
              password,
            }),
          });
          const body = await response.json();

          console.log(response, body);
        } catch (error) {
          // error는 callee에서 throw하고 caller에서 catch하는 것이다.
          console.error('로그인 도중 문제가 발생했습니다.', error);
        }
      });
    </script>
  </body>
  </html>`);
});

// login/api/login
router.post('/api/login', function(req, res, next) {
  console.log(global.session);
  const { id, password } = req.body;

  if (id === 'test' && password === '1234') {
    const sessionIdForTest = 'sid-1234';
    // DB에 test, 1234로 로그인해서
    // userId: 1을 가져왔다고 해보자

    // 세션에 저장한다.
    global.session[sessionIdForTest] = {
      userId: 1, // user id를 넣은 이유는? 어떤 정보를 DB에서 가져오든
      // userId가 있으면 다 가져올 수 있기 때문.
    };
    res.cookie('junepId', sessionIdForTest, { maxAge: 900000, httpOnly: true });
    res.json({
      success: true,
    });
    return;
  }

  res.json({
    success: false,
  });
});

module.exports = router;
