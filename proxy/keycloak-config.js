var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {

  realm: 'logrocket',
  bearerOnly: true,
  serverUrl: 'https://34.200.175.161:8443/auth/',
  clientId: 'nodejs-microservice',
 realmPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgEMf8NAqS5W3slTY2+UzKNrOv1ZvCiHNeZn5Rb9XR3YIxSKay8NU4FRyEts1dDARc442NaYFFMLM5FAGa2I71Gh3gi5Abx4p6Ly78fKjIvpvjZSoymR3tVsUF1DkELA3EHtINzWnzP/avQfl4tx7a87s9T2XKlRoWCn7TlDGLnW9BDj8qckn7G1BZ6ndtUxfEn9OIh2m6LinSrWT7jEE8UAvDU+SFbqXlQqa7iP4Z2XF5U+06QPpBb/vTmO98ywGJt2qZkgkGpZVFgteUgU3UDYtJ9acfi5ZTtFA6vP7C6q56Wspbtwwq0b9AbJMAR7ipoLMv8kNbUM47wj/rmBYSQIDAQAB'


};

function initKeycloak(){

	if(_keycloak){
		console.warn("Trying to init Keycloak again!");
		return _keycloak;
	}
	else{
		console.log("Initializing Keycloak...");
		var memoryStore = new session.MemoryStore();
		_keycloak = new Keycloak({
			//store: memoryStore
			store: memoryStore,
			secret : '463a0209-7241-4f98-94a4-b581a1a07c7a', 
			resave : false , 
			saveUninitialized : true
		}, keycloakConfig);
		return _keycloak;
	}
}

function getKeycloak(){
	if(!_keycloak){
	console.error('Keycloak has not been initialized. Please called init first.');
}
return _keycloak;
}

module.exports = {
initKeycloak,
getKeycloak
};	
