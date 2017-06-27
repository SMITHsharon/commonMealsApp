app.factory("CookTeamFactory", function($http, $q, UserFactory, SignUpFactory, FIREBASE_CONFIG) {

	let getCookTeam = (mealId) => {
	    let cookz = [];
	    let cookNamez = [];
	    return $q((resolve, reject) => {
	    	$http.get(`${FIREBASE_CONFIG.databaseURL}/cookTeams.json?orderBy="mealId"&equalTo="${mealId}"`)
	      	.then((fbCooks) => {
	        	let cookCollection = fbCooks.data;
	          	if(cookCollection !== null ) {
	            	Object.keys(cookCollection).forEach((key) => {
	              		cookCollection[key].id=key;
	              		cookz.push(cookCollection[key]);
	           		 });

	            	cookz.forEach((cook) => {
	            		UserFactory.getThisMemberName(cook.memberId)
	            		.then((thizName) => {
	            			cookNamez.push(thizName);
	            		})
	            		.catch((error) => {
	            			reject(error);
	            		});
	            	});
	          	}
	          	resolve(cookNamez);
	      	})
	      	.catch((error) => {
	        	reject(error);
	      	});
	    });
 	};


 	let assignCook = (mealId, memberId) => {
	    return $q((resolve, reject) => {
	      $http.post(`${FIREBASE_CONFIG.databaseURL}/cookTeams.json`, 
	        JSON.stringify({ 
	          memberId: memberId,
	          mealId: mealId
	        })
	      )
	      .then((postCookSuccess) => {

	      	// automatically sign-up Cook Team member for the Meal
	      	SignUpFactory.postCookTeamSignUp(mealId, memberId)
	      	.then((response) => {
	      		// resolve(postCookSuccess)
	      	})
	      	.catch((postCookTeamSignUpError) => {
	      		reject(postCookTeamSignUpError)
	      	})
	        resolve(postCookSuccess);
	      })
	      .catch((postCookError) => {
	        reject(postCookError);
	      });
	    });
 	};


 	return {
 		getCookTeam:getCookTeam,
 		assignCook:assignCook
 	};

});
