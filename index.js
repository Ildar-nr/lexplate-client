//http://localhost:3000/query/Base.materialTest
//http://localhost:3000/image/729783e3-bf40-4370-a5a8-b7b989d833cf

var express = require('express');
var getToken = require('./getToken.js');
var app = express();
var agent = require('superagent-promise')(require('superagent'), Promise);
var orgId = 74;
var access_token = '';

app.use(express.static('./public'));

app.get('/image/:id', function (req, res) {  
	agent
		.get(`go.lexplate.ru/api/v1.0/content/${orgId}/${req.params.id}`)
		.set('Authorization', `bearer ${access_token}`)	  
		.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
		.then(function(data){
			res.writeHead(200, {'Content-Type': data.header['content-type'] });
			res.end(data.body);
		}).catch((e) => {
			console.error(e);
			res.send('Error');			
		});   
});

app.get('/query/:queryName', function (req, res) {  
	agent
		.get(`go.lexplate.ru/api/v1.0/data/${orgId}/query?name=${req.params.queryName}`)
		.set('Authorization', `bearer ${access_token}`)
		.then(function(data){			
			res.send(data.body);
		}).catch((e) => {			
			console.error(e);
			res.send('Error');
		});  
});

app.get('/query/:queryName/:code', function (req, res) {  
	agent
		.get(`go.lexplate.ru/api/v1.0/data/${orgId}/query?name=${req.params.queryName}&code=${req.params.code}`)
		.set('Authorization', `bearer ${access_token}`)
		.then(function(data){			
			res.send(data.body);
		}).catch((e) => {			
			console.error(e);
			res.send('Error');
		});  
});

var x = getToken().then((token) => {
	access_token = token;
	
	app.listen(3000, () => {
	  console.log('Example app listening on port 3000!');
	});
}).catch((e) => {
	console.error(e);	
});


