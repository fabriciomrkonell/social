'use strict';

function follow(user){
 	var ajax;
 	if(navigator.appName == "Microsoft Internet Explorer"){
 		ajax = new ActiveXObject("Microsoft.XMLHTTP");
  }else{
  	ajax = new XMLHttpRequest();
  }
  ajax.open("POST", "/api/follow/" + user, true);
  ajax.onreadystatechange = function () {
  	if (ajax.readyState == 4) {
   		if (ajax.status == 200) {
   			document.getElementById("userfollow" + user).classList.add("hidden");
	  		document.getElementById("userunfollow" + user).classList.remove("hidden");
     	}
  	}
	};
	ajax.send(null);
};

function unfollow(user){
	var ajax;
 	if(navigator.appName == "Microsoft Internet Explorer"){
 		ajax = new ActiveXObject("Microsoft.XMLHTTP");
  }else{
  	ajax = new XMLHttpRequest();
  }
  ajax.open("POST", "/api/unfollow/" + user, true);
  ajax.onreadystatechange = function () {
  	if (ajax.readyState == 4) {
   		if (ajax.status == 200) {
   			document.getElementById("userunfollow" + user).classList.add("hidden");
	  		document.getElementById("userfollow" + user).classList.remove("hidden");
     	}
  	}
	};
	ajax.send(null);
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