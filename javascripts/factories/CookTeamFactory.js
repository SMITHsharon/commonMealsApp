app.factory("CookTeamFactory", function($http, $q, FIREBASE_CONFIG) {

	let getCookTeam = (mealId) => {
	// let getMealList = (userId) => {
	    let cookz = [];
	    return $q((resolve, reject) => {
	    	$http.get(`${FIREBASE_CONFIG.databaseURL}/cookTeams.json?orderBy="mealId"&equalTo="${mealId}"`)
	      	.then((fbCooks) => {
	        	let cookCollection = fbCooks.data;
	          	if(cookCollection !== null ) {
	            	Object.keys(cookCollection).forEach((key) => {
	              		cookCollection[key].id=key;
	              		cookz.push(cookCollection[key]);
	           		 });
	          	}
	          	resolve(cookz);
	      	})
	      	.catch((error) => {
	        	reject(error);
	      	});
	    });
 	};

 	return {
 		getCookTeam:getCookTeam
 	};

});

