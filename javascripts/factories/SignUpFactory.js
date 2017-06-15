app.factory("SignUpFactory", function($http, $q, UserFactory, FIREBASE_CONFIG) {

	let getSignUpList = (mealId) => {
	    let signUpz = [];
	    return $q((resolve, reject) => {
	      	$http.get(`${FIREBASE_CONFIG.databaseURL}/signUps.json?orderBy="mealId"`)
	      	.then((fbsignUps) => {
	        	let signUpCollection = fbsignUps.data;
	        	if(signUpCollection !== null ) {
	            	Object.keys(signUpCollection).forEach((key) => {
	              		signUpCollection[key].id=key;
	              		signUpz.push(signUpCollection[key]);
	            	});
	            	signUpz.forEach((signUp) => {
	            		UserFactory.getThisMemberName(signUp.memberId)
	            		.then((thizName) => {
	            			signUp.name = thizName;
	            		})
	            		.catch((error) => {
	            			reject(error);
	            		});
	            	});
	          	}
console.log("SignUpFactory.getSignUpList // signUpz // pushed name :: ", signUpz);
	          	resolve(signUpz);
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
 		getSignUpList:getSignUpList,
 		getUserSignUpz:getUserSignUpz
 	};
});