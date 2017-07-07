app.factory("UserFactory", function($http, $location, $q, FIREBASE_CONFIG) {

	let addUser = (authData) => {
	    return $q((resolve, reject) => {
	      $http.post(`${FIREBASE_CONFIG.databaseURL}/users.json`, 
	        JSON.stringify({ 
	          uid: authData.uid,
	          username: authData.username,
	          unit: authData.unit,
	          profilePicURL: authData.imgURL
	        })
	      )
	      .then((storeUserSuccess) => {
	        resolve(storeUserSuccess);
	      })
	      .catch((storeUserError) => {
	        reject(storeUserError);
	      });
	    });
	};


  	let getUser = (userId) => {
	    return $q((resolve, reject) => {
	      $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
	        .then((userObject) => {
	          let users = [];
	          Object.keys(userObject.data).forEach((key) => {
	            users.push(userObject.data[key]);
	            users[0].id = key;
	          });
	          resolve(users[0]);
	        })
	        .catch((error) => {
	          reject(error);
	        });
	    });
	};


	let getThisMemberName = (memberId) => {
		return $q((resolve, reject) => {
	      $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${memberId}"`)
	        .then((userObject) => {
	          let users = [];
	          Object.keys(userObject.data).forEach((key) => {
	            users.push(userObject.data[key]);
	            users[0].id = key;
	          });
	          // return the user's profile
	          resolve(users[0].username);
	        })
	        .catch((error) => {
	          reject(error);
	        });
	    });
	};


	let getMemberList = () => {
		let memberz = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"`)
			.then((fbusers) => {
				let userCollection = fbusers.data;
				if (userCollection !== null) {
					Object.keys(userCollection).forEach((key) => {
						userCollection[key].id = key;
						memberz.push(userCollection[key]);
					});
				}
				resolve(memberz);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};


  	let editEmail = (newEmail) => {
	    var user = firebase.auth().currentUser;
	      user.updateEmail(newEmail).then(function() {
	    }, function(error) {
	        reject(error);
	    });
	};


	let editUser = (id, updatedInfo) => {
		return $q((resolve, reject) => {
		  $http.put(`${FIREBASE_CONFIG.databaseURL}/users/${id.id}.json`, JSON.stringify({
		        profilePicURL: updatedInfo.profilePicURL,
		        username: updatedInfo.username,
		        unit: id.unit,
		        uid: id.uid,
		        id: id.id
		  }))
		  .then((resultz) => {
		    // resolve(resultz);
		    $location.url('/meals/list');
		  })
		  .catch((error) => {
		    reject(error);
		  });
		});
	};
  
	return {
		addUser:addUser, 
		getUser:getUser, 
		getThisMemberName:getThisMemberName,
		getMemberList:getMemberList,
		editUser:editUser, 
		editEmail:editEmail
	};

});
