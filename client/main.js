import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'meteor/jkuester:blaze-bs4'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // this is the default BS theme as example
import popper from 'popper.js'
global.Popper = popper // fixes some issues with Popper and Meteor

import './main.html';
import '../lib/collection.js';

Template.myLibrary.helpers({
	// returns all the books in the database based on ID and Path
	allBooks(){
		return litbooksdb.find();	
	}
});
Template.myLibrary.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.myLibrary.helpers({
	counter(){
		return Template.instance(this._id).counter.get();
	}

});

Template.addBook.events({
	// console for the addBook Modal
	'click .js-addAbook'(event, instance){
	},

	'click .js-save'(event, instance){
	// saving to the MongoDB
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
			"thumbtemp": theThumb

		});
	  	$("#addBookModal").modal("hide");
	  	$("#Title").val("");
	  	$("#Path").val("");
	    $("#Desc").val("");
	  	$("#Author").val("");
	  	$(".imgholder").attr("src","imgplaceholder.png");
	},

	'click .js-close'(event, instance){
		// closing 
	},

	'input #Path'(event,instance){
  		$(".imgholder").attr("src",$("#Path").val());
  		console.log($("#Path").val());
  	},


});

Template.mainBody.events({
	'click .js-view'(event, instance){
		// Opens the view modal and returns author, title and description of the book
		$("#ViewBook").modal("show");
		var myId = this._id;
		var viewContent = '<h5 class="title " id="Title">' + litbooksdb.findOne({_id:myId}).Title + '</h5>';
		viewContent += ' <h5 class="author" id="Author">' + litbooksdb.findOne({_id:myId}).Author + '</h5> ';
		viewContent += ' <p id="Desc">' + litbooksdb.findOne({_id:myId}).Desc + '</p>';
		$('#ViewBook .modal-body').html(viewContent); 

	
    },
		
});
	
Template.myLibrary.events({
	'click .js-view'(event, instance) {
    // increment the counter when button is clicked
    var myId = this._id;
    instance.counter.set(instance.counter.get() + 1);
    litbooksdb.findOne(myId);

  },

  'click .js-delete'(event, instance){
	// delete a record (book) from the MongoDb
		var myId= this._id;
		$("#delID").val(myId);
		$("#confirmModal").modal("show");
		$("#ViewBook").modal("hide");
		
	},

  	'click .js-confirm'(event,instance){
  	// confirms removal of the id for the element(book)
  	var myId =$("#delID").val();
  	$("#"+ myId).fadeOut('slow',function(){
    litbooksdb.remove({_id:myId});
  	
  	});

  },

  	'click .js-edit'(event, instance) {
  		// opens edit modal to change the value in the text boxes
  	$("#editBookModal").modal("show");
   var myId = this._id;
   var edTitle = litbooksdb.findOne({_id:myId}).Title;
   var edPath = litbooksdb.findOne({_id:myId}).Path;
   var edDesc = litbooksdb.findOne({_id:myId}).Desc;
   var edAuthor = litbooksdb.findOne({_id:myId}).Author;
   var editID = litbooksdb.findOne({_id:myId}).ediD;
   $("#ediD").val(myId);
   $("#eTitle").val(edTitle);
   $("#ePath").val(edPath);
   $("#eDesc").val(edDesc);
   $("#eAuthor").val(edAuthor);
   $(".eholder").attr("src", edPath);

  	},

  	'click .js-up'(event, instance){
  		// Provides a rating for the book
  		var myId = this._id;
  		var upvote = $("#thup").val();
  		
  	},

	'click .js-saveEdit'(event,instance){
	// save a new edit record and will change the data in the DB

		var updateId = this._id;
		var newTitle = $("#eTitle").val();
		var newPath = $("#ePath").val();
		var newDesc = $("#eDesc").val();
		var newAuthor = $("#eAuthor").val();
		var updateId = $("#ediD").val();
			litbooksdb.update({_id:updateId},
				{$set:{
					"Title":newTitle,
					"Path":newPath,
					"Desc":newDesc,
					"Author":newAuthor,


			}}
		);
	},

	'click .js-closeEdit'(event, instance){
		// Console message confirming the modal was closed
		console.log("closingEdit..")

	}
});