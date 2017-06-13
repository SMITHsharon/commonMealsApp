app.factory("SchedulingFactory", function($http, $q, FIREBASE_CONFIG) {

	let getMealList = () => {
	// let getMealList = (userId) => {
	    let mealz = [];
	    return $q((resolve, reject) => {
	      	$http.get(`${FIREBASE_CONFIG.databaseURL}/meals.json?orderBy="mealDate"`)
	      	// $http.get(`${FIREBASE_CONFIG.databaseURL}/meals.json?orderBy="mealId"&equalTo="${mealDate}"`)
	      	.then((fbMeals) => {
	        	let mealCollection = fbMeals.data;
	        	if(mealCollection !== null ) {
	            	Object.keys(mealCollection).forEach((key) => {
	              		mealCollection[key].id=key;
	              		mealz.push(mealCollection[key]);
	            	});
	          	}
	          	resolve(mealz);
	      	})
	      	.catch((error) => {
	        	reject(error);
	      	});
	    });
 	};

 	return {
 		getMealList:getMealList
 	};

});