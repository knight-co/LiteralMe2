import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'meteor/jkuester:blaze-bs4'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // this is the default BS theme as example
import popper from 'popper.js'
global.Popper = popper // fixes some issues with Popper and Meteor

import './main.html';
import '../lib/collection.js';

Template.addBook.events({
	'click .js-save'(event, instance){
		var theTitle = $('#Title').val();
		var theAuthor =$('#Author').val();
		var theDesc =$('#Desc').val();
		var thePath =$('#Path').val();
		var theThumb =$('.thumbtemp').val();

		litbooksdb.insert({
			"Title": theTitle,
			"Path": thePath,
			"Author": theAuthor,
			"Desc": theDesc,
		});
		console.log("saving..");
	  	$("#addBookModal").modal("hide");
	  	// $("#Title").val("");
	  	// $("#Path").val("");
	    // $("#Desc").val("");
	  	// $("#Author").val("");
	  	// $(".imgholder").attr("src","imgplaceholder.png");
	},

	'click .js-close'(event, instance){
		console.log("closed..");
	},

	'input #Path'(event,instance){
  		$(".imgholder").attr("src",$("#Path").val());
  		$(".thumbtemp").attr("src",$("#Path").val());
  		console.log($("#Path").val());
  	}, 		 	
});

Template.mainBody.events({
	'click js-edit'(event, instance){
	console.log("editing..");
	$("#editBookModal").modal("show");
	
    var myId = this._id;
    console.log("Let's Edit " +  myId);
    var edTitle = litbooksdb.findOne({_id:myId}).Title;
    var edPath = litbooksdb.findOne({_id:myId}).Path;
    var edDesc = litbooksdb.findOne({_id:myId}).Desc;
    var edAuthor = litbooksdb.findOne({_id:myId}).Author;
    $("edID").val(myId);
    $("#eTitle").val(edTitle);
    $("#ePath").val(edPath);
    $("#eDesc").val(edDesc);
    $("#eAuthor").val(edAuthor);
    $(".eholder").attr("src", edPath);

	},

	'click .js-addMe'(event,instance){
		var newTitle = $("#eTitle").val();
		var newPath = $("#ePath").val();
		var newDesc = $("#eDesc").val();
		var newAuthor = $("#eAuthor").val();
		// var updateId = $("#eID").val();
		console.log(newTitle);
		litbooksdb.update({_id: updateId},
			{$set:{
				"Title":newTitle,
				"Path":newPath,
				"Desc":newDesc,
				"Author":newAuthor,

			}}
		);
	},

	'click .js-view'(event, instance){
      	console.log("Viewing...");
      	var myId = this._id;
      	var viewTitle = litbooksdb.findOne();
	}

});

// Template.myLibrary.helpers({
// 	allBooks(){
// 		return litbooksdb.find().count();
// 	}
// });
