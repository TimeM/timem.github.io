
function toggleDialog(transition) {
	//alert('Hello World');
	var dialog = document.querySelector('paper-dialog[transition=' + transition + ']');
	dialog.toggle();
}
