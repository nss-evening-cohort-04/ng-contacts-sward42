"use strict";

app.factory("ContactFactory", function ($q, $http, FIREBASE_CONFIG) {
	
	var getContactList = function () {
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/contacts.json`)
			.success(function(response){
				let contacts = [];
				Object.keys(response).forEach(function(key){
					response[key].id = key;
					contacts.push(response[key]);
					console.log("contacts", contacts);
				});
				resolve(contacts);

			})
			.error(function(errorResponse){
				reject(errorResponse);
			});
		});
	};

	var postNewContact = function(newContact){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/contacts.json`, JSON.stringify({
				firstName: newContact.firstName,
				lastName: newContact.lastName,
				phoneNumber: newContact.phoneNumber,
				email: newContact.email
			}))
			.success(function(postResponse){
				resolve(postResponse);
			})
			.error(function(postError){
				reject(postError);
			});
		});
	};




	return {getContactList: getContactList, postNewContact: postNewContact};
});