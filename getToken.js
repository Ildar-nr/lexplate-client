var agent = require('superagent-promise')(require('superagent'), Promise);
var http = require('http');
var querystring = require('querystring');
var clientId = '';
var secretKey = '';
var userName = '';
var password = '';

if(!clientId || !secretKey || !userName || !password) {
	throw new Error('Заданы не все учетные данные пользователя или приложения (getToken.js)');
}

module.exports = () => {
	var postData = querystring.stringify({
		grant_type: 'password',
		client_id: clientId,
		client_secret: secretKey,
		userName: userName,
		password: password
	});
	
	return agent
		.post('go.lexplate.ru/api/v1.0/OAuth/Token')
		.send(postData)
		.set('Content-Type', 'application/x-www-form-urlencoded')
		.then((res) => {			
			return res.body.access_token;
		})
		.catch((e) => {			
			console.error(e);
		});
};






