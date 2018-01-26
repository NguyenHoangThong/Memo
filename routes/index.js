var express = require('express');
var router = express.Router();
const IndexController = require('../api/Controller/IndexController');
const UserController = require('../api/Controller/UserController');
const MemoController = require('../api/Controller/MemoController');

/* GET home page. */
router.get('/', IndexController.Home);


router.get('/signin', UserController.getSignin );
router.get('/signup', UserController.getSignup);

router.post('/login', UserController.postSignin);
router.post('/register', UserController.postSignup);

router.post('/post', MemoController.postMemo);
router.get('/mymemo', MemoController.Mymemo);
router.get('/search', MemoController.Search)

module.exports = router;
