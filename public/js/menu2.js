$(document).ready(function () {
	var button = $('#button');
	var input = $('#input');	
	var div = $('#div');
	var nameSpan = $('#name');
	var loader = $('#loader');
	
	button.on('click', function() {
		var id = input.val();
		loader.show();
	
		$.ajax({
			url:'/query/Base.materialTest2/' + id,
			type: 'get',
		}).done(function(data){
			var image;
			div.children('img').remove();
			nameSpan.text('');
			
			if(data && data.length > 0)  {
				nameSpan.text(data[0].name);
				image = new Image();			
				image.src = 'data:image/png;base64,' + data[0].data;				
				div.append(image);
			}			
			
			loader.hide();
		});
	});
});