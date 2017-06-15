app.factory("SignUpFactory", function($http, $q, FIREBASE_CONFIG) {

	let isUserSignedUp = (userId, mealId) => {
		let signedUp = [];
		return $q((resolve, reject) => {
	    	 $http.get(`${FIREBASE_CONFIG.databaseURL}/signUps.json?orderBy="memberId"&equalTo="${userId}"`)
	    	 .then((fbSignUps) => {
console.log("fbSignUps :: ", fbSignUps);
				let signedUpCollection = fbSignUps.data;
console.log("signedUpCollection :: ", signedUpCollection);
				if(signedUpCollection !== null ) {

	            	Object.keys(signedUpCollection).forEach((key) => {
	            		if (signedUpCollection.memberId === userId) {
	            			signedUpCollection[key].id=key;
	            			signedUpCollection[key].signedUp=true;
	            			signedUp.push(signUpCollection[key]);

	            		}
	            	});
	          	}
				resolve(signedUp);
	    	 })
	    	 .catch((error) => {
	    	 	reject(error);
	    	 });
	    });
	};


	let getUserSignUpz = (userId) => {
	// let getMealList = (userId) => {
	    let signUpz = [];
	    return $q((resolve, reject) => {
	    	 $http.get(`${FIREBASE_CONFIG.databaseURL}/signUps.json?orderBy="memberId"&equalTo="${userId}"`)
	      	.then((fbSignUps) => {
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
 		isUserSignedUp:isUserSignedUp,
 		getUserSignUpz:getUserSignUpz
 	};
});