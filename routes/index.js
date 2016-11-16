var express = require('express');
var router = express.Router();

/*################### Including all JS #######################*/
var numbers = require('./numbers/numbers.js');
/*##########################################################*/

router.get('/', function(req, res) {
  res.render("index.jade", {title: "Upload CSV file"});
}); 

/*################### Routes ##############################*/
router.get('/api/v1/getNumbers', numbers.getNumbers);
router.post('/api/v1/addNumber', numbers.addNumber);
router.post('/api/v1/addBulkNumber', numbers.addBulkNumber);
router.post('/api/v1/addBulkNumberViaFile', numbers.addBulkNumberViaFile);
router.post('/api/v1/addSeriesNumber', numbers.addSeriesNumber);
router.post('/api/v1/addRandomNumber', numbers.addRandomNumber);
router.post('/api/v1/deleteNumber/:number', numbers.deleteNumber);
router.post('/api/v1/changeCID', numbers.changeCID);
router.get('/api/v1/getCallDetails/:from/:to', numbers.getCallDetails);

/*##########################################################*/

module.exports = router;
