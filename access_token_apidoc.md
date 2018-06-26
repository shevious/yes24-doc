--api.js

    /**
     * @api {post} /digital/user/api/access_token
     *
     *
     * @apiName 로그인
     * @apiGroup LOGIN
     * @apiDescription ID/Password를 전달받아서 인증토큰값을 반환합니다.
     *
     *
     * @apiParam (파라미터) username 사용자 ID
     * @apiParam (파라미터) password 사용자 암호
     *
     * @apiSuccess (리턴값) success    true | false
     * @apiSuccess (리턴값) access_token success가 true인 경우에 Token값을 전달한다.
     *
     *
     * @apiSuccessExample Source:
     *   const userid = req.param('username');
     *   const userpw = req.param('password');
     *   if (userid && userpw) {
     *       var payload = {
     *           id: userid
     *           , password: userpw
     *       };
     *       var token = jwt.sign(payload, config.jwtSecret);
     *       console.log('access_token = '+token);
     *       res.json({
     *           access_token: token
     *       });
     *   } else {
     *       res.status(403).json({
     *           message: "access_denied"
     *       });
     *   }
     *
     * @apiSampleRequest http://192.168.33.10:3000/api/access_token
     *
     */

    var express = require('express');
    var router = express.Router();
    var passport = require('passport');
    var jwt = require("jsonwebtoken"); 
    var auth = require("../auth"); 

    var env       = process.env.NODE_ENV || 'development';
    var config    = require(__dirname + '/../config/config.json')[env];

    router.post('/access_token', function(req, res) {
        /*
        if (req.body.username && req.body.password) {
            var payload = {
                id: req.body.username
            };
            var token = jwt.sign(payload, config.jwtSecret);
            console.log('access_token = '+token);
            res.json({
                access_token: token
            });
        } else {
            res.status(403).json({
                message: "access_denied"
            });
        }
        */

        const userid = req.param('username');
        const userpw = req.param('password');
        if (userid && userpw) {
            var payload = {
                id: userid
                , password: userpw
            };
            var token = jwt.sign(payload, config.jwtSecret);
            console.log('access_token = '+token);
            res.json({
                access_token: token
            });
        } else {
            res.status(403).json({
                message: "access_denied"
            });
        }
    });

    router.get('/userinfo', auth.isAuthenticated, function(req, res) {
      res.json({
        id: req.user.id
      });
    });

    module.exports = router;


--apidoc.json

    {
      "name": "사용자",
      "version": "0.1.0",
      "description": "로그인 (access_token)",
      "title": "yes24-api",
      "url" : "http://dev.api.yes24.com"
    }


--app.js
...
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('apidoc'));  //추가


npm install apidoc --save

apidoc -i routes/ -o apidoc/
