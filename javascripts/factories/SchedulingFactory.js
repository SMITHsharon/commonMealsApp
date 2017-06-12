app.factory("SchedulingFactory", function($http, $q, FIREBASE_CONFIG) {

	let getMealList = () => {
	// let getMealList = (userId) => {
	    let itemz = [];
	    return $q((resolve, reject) => {
	      $http.get(`${FIREBASE_CONFIG.databaseURL}/meals.json?orderBy="uid"&equalTo="${userId}"`)
	      .then((fbMeals) => {
	        var mealCollection = fbMeals.data;
	          if(mealCollection !== null ) {
	            Object.keys(mealCollection).forEach((key) => {
	              itemCollection[key].id=key;
	              itemz.push(mealCollection[key]);
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