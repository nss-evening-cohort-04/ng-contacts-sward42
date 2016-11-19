"use strict";

app.controller("ContactCtrl", function ($scope, ContactFactory) {
	
	$scope.showContactView = true;
	$scope.newContact = {};
	$scope.contacts = [];

	let getContacts = function(fbContacts){
		ContactFactory.getContactList().then(function(fbContacts){
			$scope.contacts = fbContacts;
			console.log("contacts", $scope.contacts);
		});
	};

	getContacts();

	$scope.addNewContact = function(){
		ContactFactory.postNewContact($scope.newContact).then(function(contactId){
			getContacts();
			$scope.newContact = {};
		});
	};


});