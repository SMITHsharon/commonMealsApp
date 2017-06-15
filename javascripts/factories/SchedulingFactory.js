app.factory("SchedulingFactory", function($http, $q, FIREBASE_CONFIG) {

	let getMealList = () => {
	    let mealz = [];
	    return $q((resolve, reject) => {
	      	$http.get(`${FIREBASE_CONFIG.databaseURL}/meals.json?orderBy="mealDate"`)
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


 	let getSingleMeal = (id) => {
console.log("SchedulingFactory.getSingleMeal // id :: ", id);
	    return $q((resolve, reject) => {
	    	$http.get(`${FIREBASE_CONFIG.databaseURL}/meals/${id}.json`)
		    .then((resultz) => {
// console.log("SchedulingFactory.getSingleMeal // returned resultz // shd have name :: ", resultz);
// console.log("SchedulingFactory.getSingleMeal // resultz.data :: ", resultz.data);
		        resultz.data.id = id;
// console.log("SchedulingFactory.getSingleMeal // resultz.data.id :: ", resultz.data.id);
		        resolve(resultz);
		    })
		    .catch((error) => {
		        reject(error);
		    });
	    });
 	};


 	let postNewMeal = (newMeal) => {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/meals.json`, JSON.stringify(newMeal))
			.then((resultz) => {
				resolve(resultz);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};


	let deletzMeal = (id) => {
		return $q((resolve, reject) => {
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/meals/${id}.json`)
			.then((resultz) => {
				resolve(resultz);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};



 	return {
 		getMealList:getMealList,
 		getSingleMeal:getSingleMeal,
 		postNewMeal:postNewMeal,
 		deletzMeal:deletzMeal
 	};

});
