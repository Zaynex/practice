$(document).ready(function(){
	$(".owl-carousel").owlCarousel({
		items: 1,
		loop: true,
		autoPlay: true,
		stopOnHover: true
	});

	function makeImageResponsive(){
		var width = $(window).width();
		var img = $('.content img');
		if(width <= 480){
			img.attr('src', 'img/480.png');
		}else if(width <= 480){
			img.attr("src", 'img/800.png');
		}else {
			img.attr('src', 'img/1600.png');
		}
	}

	$(window).on('resize load', makeImageResponsive);
	//通过cookie进行设置也可以
});