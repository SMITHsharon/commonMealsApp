app.factory("SignUpFactory", function($http, $q, FIREBASE_CONFIG) {

	let getUserSignUpz = (userId) => {
console.log("SignUpFactory userId :: ", userId);
	// let getMealList = (userId) => {
	    let signUpz = [];
	    return $q((resolve, reject) => {
	    	 $http.get(`${FIREBASE_CONFIG.databaseURL}/signUps.json?orderBy="memberId"&equalTo="${userId}"`)
	      	.then((fbSignUps) => {
console.log("fbSignUps :: ", fbSignUps);
	        	var signUpCollection = fbSignUps.data;
	          	if(signUpCollection !== null ) {
	            	Object.keys(signUpCollection).forEach((key) => {
	              		signUpCollection[key].id=key;
	              		signUpz.push(signUpCollection[key]);
	           		 });
	          	}
	          	resolve(signUpz);
	      	})
	      	.catch((error) => {
	        	reject(error);
	      	});
	    });
 	};

 	return {
 		getUserSignUpz:getUserSignUpz
 	};
});