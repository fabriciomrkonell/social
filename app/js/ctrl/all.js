'use strict';

function follow(user){
	$.ajax({
	  type: "POST",
	  url: "/api/follow/" + user
	}).done(function( msg ) {
	  document.getElementById("userfollow" + user).classList.add("hidden");
	  document.getElementById("userunfollow" + user).classList.remove("hidden");
	});
};

function unfollow(user){
	$.ajax({
	  type: "POST",
	  url: "/api/unfollow/" + user
	}).done(function( msg ) {
	  document.getElementById("userunfollow" + user).classList.add("hidden");
	  document.getElementById("userfollow" + user).classList.remove("hidden");
	});
};

function search(e){
	if(document.getElementById("inputSearch").value == ""){
		document.getElementById("btnSearch").disabled = true;
	}else{
		document.getElementById("btnSearch").disabled = false;
		if(e.keyCode == 13 || e.type == 'click'){
			window.location = '/search/' + document.getElementById("inputSearch").value;
		}
	}
};

function toggleDropdown(){
	if(document.getElementById("dropdown").classList.contains("open")){
		document.getElementById("dropdown").classList.remove("open");
	}else{
		document.getElementById("dropdown").classList.add("open");
	}
};

if(window.location.pathname.split("/")[1] == 'search'){
	document.getElementById("btnSearch").disabled = false;
	document.getElementById("inputSearch").value = window.location.pathname.split("/")[2];
};