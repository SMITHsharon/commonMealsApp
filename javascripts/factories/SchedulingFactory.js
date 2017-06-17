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
 console.log("in SchedulingFactory / id :: ", id);
	    return $q((resolve, reject) => {
	    	$http.get(`${FIREBASE_CONFIG.databaseURL}/meals/${id}.json`)
		    .then((resultz) => {
		        resultz.data.id = id;
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


	let editMeal = (meal) => {
		return $q((resolve, reject) => {
			$http.put(`${FIREBASE_CONFIG.databaseURL}/meals/${meal.id}.json`, JSON.stringify({
		        mealDate: meal.mealDate,
		        deadline: meal.deadline,
		        time: meal.time,
		        menu: meal.menu,
		        veggie: meal.veggie,
		        estCost: meal.estCost,
		        comments: meal.comments,
		        uid: meal.uid
		      }))
			.then((mealz) => {
console.log("editMeal mealz :: ", mealz);
				resolve(mealz);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};


	let deletzMeal = (id) => {
console.log("deletzMeal // id :: ", id);
		return $q((resolve, reject) => {
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/meals/${id}.json`)
			.then((resultz) => {
console.log("deletzMeal // resultz :: ", resultz);
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
 		editMeal:editMeal,
 		deletzMeal:deletzMeal
 	};

});
