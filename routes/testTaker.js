var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Require controller modules
var test_taker_controller = require('../controllers/testTakerController');

//Catalog ROUTE ///
// router.get('/tests', test_controller.test_list);
// /testTaker/tests
router.get('/tests', test_taker_controller.user_test_list);
router.post('/tests', test_taker_controller.user_test_list_post);

router.get('/tests/sectional', test_taker_controller.user_test_list_sectional);
router.get('/tests/fl', test_taker_controller.user_test_list_fl);

router.get('/catalog/test/:id', test_taker_controller.test_simulation_get);

router.post('/catalog/test/:id', jsonParser, test_taker_controller.test_simulation_post);

router.get('/solutions', test_taker_controller.user_solution_list);
router.post('/solutions', test_taker_controller.user_solution_list_post);

router.get('/solutions/sectional', test_taker_controller.user_solution_list_sectional);
router.get('/solutions/fl', test_taker_controller.user_solution_list_fl);

router.get('/solution/catalog/test/:id', test_taker_controller.test_solution_get);

// router.get('/')




module.exports = router;
