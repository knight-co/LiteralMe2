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

  	'click .js-confirm'(event,instance){
  	var myId =$("#delID").val();
  	$("#"+myId).fadeOut('slow',function(){
  		literalbooksdb.remove({_id:myId});
  		console.log(myId);
  	});

  },

});

Template.mainBody.events({
	'click .js-view'(event, instance){
		$("#ViewBook").modal("show");
		var myId = this._id;
		console.log(myId);
		var viewContent = '<h5 class="title " id="Title">' + litbooksdb.findOne({_id:myId}).Title + '</h5>';
		viewContent += ' <h5 class="author" id="Author">' + litbooksdb.findOne({_id:myId}).Author + '</h5> ';
		viewContent += ' <p id="Desc">' + litbooksdb.findOne({_id:myId}).Desc + '</p>';
		$('#ViewBook .modal-body').html(viewContent); 
		console.log("Viewing...");	
    },

});
	
Template.myLibrary.events({
	'click .js-view'(event, instance) {
    // increment the counter when button is clicked
    var myId = this._id;
    console.log(myId);
    instance.counter.set(instance.counter.get() + 1);
    	litbooksdb.findOne({_id:myId})
  },
});

Template.ViewThis.events({

	'click .js-delete'(event, instance){

		var myId =this._id;
		$("#confirmModal").modal("show");
		$("#delID").val(myId);
		console.log(myId);
		litbooksdb.remove({_id:myId});
	    console.log(myId);  
	}
});