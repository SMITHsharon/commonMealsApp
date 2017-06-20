app.factory("SignUpFactory", function($http, $q, UserFactory, FIREBASE_CONFIG) {

	let getSignUpzList = (mealId) => {
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
	          	resolve(signUpz);
	      	})
	      	.catch((error) => {
	        	reject(error);
	      	});
	    });
 	};



	let getUserSignUpz = (userId) => {
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


 	let getSingleSignUp = (uid, mealId) => {
 		let thisZignUp = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/signUps/.json?orderBy="memberId"&equalTo="${uid}"`)
			.then((signUpz) => {
				let signUpCollection = signUpz.data;
				Object.keys(signUpCollection).forEach((key) => {
					if (signUpCollection[key].mealId === mealId) {
						signUpCollection[key].id = key;
						thisZignUp.push(signUpCollection[key]);
					}
				resolve(thisZignUp[0]);
				});
			})
			.catch((error) => {
				reject(error);
			});
		});
	};


 	let postNewSignUp = (newSignUp) => {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/signUps.json`, JSON.stringify(newSignUp))
			.then((resultz) => {
				resolve(resultz);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};


	let editSignUp = (signUp) => {
		return $q((resolve, reject) => {
			$http.put(`${FIREBASE_CONFIG.databaseURL}/signUps/${signUp.id}.json`, JSON.stringify({
		        adults: signUp.adults,
		        children: signUp.children,
		        regularMeal: signUp.regularMeal,
		        veggie: signUp.veggie,
		        comments: signUp.comments,
		        memberId: signUp.memberId,
		        mealId: signUp.mealId
		      }))
			.then((resultz) => {
				resolve(resultz);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};


 	let deletzSignUp = (signUpId) => {
    return $q((resolve, reject) => {
    	$http.delete(`${FIREBASE_CONFIG.databaseURL}/signUps/${signUpId}.json`)
    		.then((resultz) => {
    			resolve(resultz);
    		})
    		.catch((error) => {
    			reject(error);
    		});
  		});
	};


 	return {
 		getSignUpzList:getSignUpzList,
 		getUserSignUpz:getUserSignUpz,
 		getSingleSignUp:getSingleSignUp,
 		postNewSignUp:postNewSignUp,
 		editSignUp:editSignUp,
 		deletzSignUp:deletzSignUp
 	};
});
