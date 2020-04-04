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
		return Template.instance().counter.get();
	}

})

Template.addBook.events({
	// console for the addBook Modal
	'click .js-addAbook'(event, instance){
		console.log("Opening modal..")
	},

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
			"thumbtemp": theThumb

		});

		console.log("saving..");
	  	$("#addBookModal").modal("hide");
	  	$("#Title").val("");
	  	$("#Path").val("");
	    $("#Desc").val("");
	  	$("#Author").val("");
	  	$(".imgholder").attr("src","imgplaceholder.png");
	},

	'click .js-close'(event, instance){
		console.log("closed..");
	},

	'input #Path'(event,instance){
  		$(".imgholder").attr("src",$("#Path").val());
  		console.log($("#Path").val());
  	},


});

Template.mainBody.events({
	'click .js-view'(event, instance){
		
		$("#ViewBook").modal("show");
		var myId = this._id;
		console.log("Viewing...");	
		console.log(myId);
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
    litbooksdb.findOne({_id:myId});

  },

  	'click .js-confirm'(event,instance){
  	// confirms removal of the id for the element(book)
  	var myId =$("#delID").val();
  	$("#"+ myId).fadeOut('slow',function(){
  	litbooksdb.findOne({_id:myId}) + litbooksdb.remove({_id:myId});
  	console.log("Deleting Record...")
  	console.log(myId);
  	});

  },

  	'click .js-edit'(event, instance) {
  		// opens edit modal to change the value in the text boxes
  	$("#editBookModal").modal("show");
   var myId = this._id;
   console.log("Let's Edit " +  myId);
   var edTitle = litbooksdb.findOne({_id:myId}).Title;
   var edPath = litbooksdb.findOne({_id:myId}).Path;
   var edDesc = litbooksdb.findOne({_id:myId}).Desc;
   var edAuthor = litbooksdb.findOne({_id:myId}).Author;
   $(".edID").val(myId);
   $("#eTitle").val(edTitle);
   $("#ePath").val(edPath);
   $("#eDesc").val(edDesc);
   $("#eAuthor").val(edAuthor);
   $(".eholder").attr("src", edPath);

  	},

});

Template.ViewThis.events({

	'click .js-delete'(event, instance){
	// delete a record (book) from the MongoDb
		var myId =this._id;
		$("#delID").val(myId);
		$("#confirmModal").modal("show");
		$("#ViewBook").modal("hide");
		// console.log(myId);
		// litbooksdb.remove({_id:myId});
		// litbooksdb.remove(this._id);
	}
});

Template.editBook.events({
	'click .js-saveEdit'(event,instance){
	// save a new edit record and will change the data in the DB
		var newTitle = $("#eTitle").val();
		var newPath = $("#ePath").val();
		var newDesc = $("#eDesc").val();
		var newAuthor = $("#eAuthor").val();
		var updateId = $("#edID").val();
		console.log(newTitle);

		litbooksdb.update({_id: updateId},
			{$set:{
				"eTitle":newTitle,
				"ePath":newPath,
				"eDesc":newDesc,
				"eAuthor":newAuthor,
				"#edID":updateId

			}}
		);
	},

	'click .js-closeEdit'(event, instance){
		// Console message confirming the modal was closed
		console.log("closingEdit..")

	}
});