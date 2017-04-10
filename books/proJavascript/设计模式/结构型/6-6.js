ajaxCall("get", "/user/12345", function(response){
	alert("HTTP GET response received!" + response);
});

ajaxCall("post", "/user/12345", function(response){
	alert("HTTP post response received" + response);
}, "company=AKQA&name=Den%200Del");