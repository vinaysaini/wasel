var express = require('express');
var db = require('../../common/db');

var numbers = {
	getNumbers: function(req, res) {
	    var sql = "SELECT * FROM numbers";

	   db.query(sql, function(err, rows, fields) {
	      if (!err) {
	        res.send(rows);
	        return;
	      } else
	        res.status(500).send({
	          error: err
	        });
	        return;
	    });
  	},
  	addNumber: function(req, res) {
	    var params = req.body;
		var params = {
			number: req.body.number
		};
		var sql = "INSERT INTO numbers SET ?";
		db.query(sql, params, function(err, results) {
			if (!err) {
				return res.send(results);
			} else {
				console.log(err);
				return res.status(500).send({
					error: err
				});
			}
		});
  	},
  	addBulkNumber: function(req, res) {
  		var params = [];
		for(i=0;i<req.body.number.length;i++){
			params.push([req.body.number[i]]);
		}
		var sql = "INSERT INTO numbers (number) VALUES ?";
		db.query(sql, [params], function(err, results) {
			if (!err) {
				return res.send(results);
			} else {
				console.log(err);
				return res.status(500).send({
					error: err
				});
			}
		});
  	},
  	deleteNumber: function(req, res) {
	    var number = req.params.number;
		var sql = "DELETE FROM numbers WHERE number = " + db.escape(number);
		db.query(sql, function(err, results) {
			if (!err) {
				return res.send(results);
			} else {
				console.log(err);
				return res.status(500).send({
					error: err
				});
			}
		});
  	},



  	changeCID: function(req, res) {
	    function getNumber(callback){
	    	var sql = "SELECT number FROM numbers";
		   	db.query(sql, function(err, rows, fields) {
		      if (!err) {
		      	var item = rows[Math.floor(Math.random()*rows.length)];
		        callback(item);
		      } else
		        res.status(500).send({
		          error: err
		        });
		        return;
		    });
	    }

	    function saveDetails(new_number, callback){
			var params = {
				old_number: req.body.From,
				new_number: new_number,
				international_number: req.body.To
			};
			params.call_id = req.body["Call-ID"];
			params.creation_time = new Date();
			var sql = "INSERT INTO call_details SET ?";
			db.query(sql, params, function(err, results) {
				if (!err) {
					callback();
				} else {
					console.log(err);
					return res.status(500).send({
						error: err
					});
				}
			});
	    }
	    
	    getNumber(function(selectedItem){
	    	var response = {
				"data": {
					"action": "prepend",
					"caller_id_name": "",
					"caller_id_number": selectedItem.number
				},
				"module": "set_cid",
				"children": {
					"_": {
						"data": {},
						"module": "offnet",
						"children": {}
					}
				}
			}
	    	saveDetails(selectedItem.number, function(){
	    		return res.send(response);
	    	})
	    })

  	},
  	getCallDetails: function(req, res) {
  		var from = req.params.from;
  		var to = req.params.to;
	    var sql = "SELECT * FROM call_details WHERE `creation_time`>='"+from+ "' AND `creation_time`<'"+to+"'";
	   db.query(sql, function(err, rows, fields) {
	      if (!err) {
	        res.send(rows);
	        return;
	      } else
	        res.status(500).send({
	          error: err
	        });
	        return;
	    });
  	},
}

module.exports = numbers;