'use strict';

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

if(window.location.pathname.split("/")[1] == 'search'){
	document.getElementById("btnSearch").disabled = false;
	document.getElementById("inputSearch").value = window.location.pathname.split("/")[2];
};
