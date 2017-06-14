app.factory("CookTeamFactory", function($http, $q, UserFactory, FIREBASE_CONFIG) {

	let getCookTeam = (mealId) => {
	// let getCookTeam = (mealId, meals) => {
// console.log("meals :: ", meals);
	// let getMealList = (userId) => {
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
// console.log("cookz :: ", cookz);
	            	// get name for each cook 
	            	cookz.forEach((cook) => {
// console.log("in for each");
	            		UserFactory.getThisMemberName(cook.memberId)
	            		.then((thizName) => {
// console.log("thizName :: ", thizName);
	            			// let cookName = {};
	            			// cookName.name = thizName;
	            			// cookName.mealId = cook.mealId;
	            			cookNamez.push(thizName);
	            			// cookz["name"] = thizName;
	            		})
	            		.catch((error) => {
	            			reject(error);
	            		});
	            	});
	            	
	          	}

// console.log("cookNamez :: ", cookNamez);
	            // meals.push(cookNamez);
// console.log("meals before send RESOLVE  :: ", meals);
	          	resolve(cookNamez);
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

