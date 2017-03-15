// JavaScript Document
$(function() {
$(".howItworks").hover(function() {
//alert("Test");
	$(this).css("background-image", "url(images/icon_works_hover.png)");
	}, function() {
	$(this).css("background-image", "url(images/icon_works.png)");
	});
$(".contUs").hover(function() {
//alert("Test");
	$(this).css("background-image", "url(images/icon_contact_hover.png)");
	}, function() {
	$(this).css("background-image", "url(images/icon_contact.png)");
	});
$(".assignImg").hover(function() {
//alert("Test");
	$(this).css("background-image", "url(images/icon-assignment_hover.png)");
	}, function() {
	$(this).css("background-image", "url(images/icon-assignment.png)");
	});	
	
})