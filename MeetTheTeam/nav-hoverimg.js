// JavaScript Document
$(function() {
$(".howItworks").hover(function() {
//alert("Test");
	$(this).css("background-image", "url(Pictures/icon_works_hover.png)");
	}, function() {
	$(this).css("background-image", "url(Pictures/icon_works.png)");
	});
$(".contUs").hover(function() {
//alert("Test");
	$(this).css("background-image", "url(Pictures/icon_contact_hover.png)");
	}, function() {
	$(this).css("background-image", "url(Pictures/icon_contact.png)");
	});
$(".assignImg").hover(function() {
//alert("Test");
	$(this).css("background-image", "url(Pictures/icon-assignment_hover.png)");
	}, function() {
	$(this).css("background-image", "url(Pictures/icon-assignment.png)");
	});	
	
})