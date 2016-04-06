$(document).ready(function () {
	var select = $('#select');	
	var img = $('#img');
	var loader = $('#loader');
	
	select.append( $('<option value="-1"></option>'));
	
	$.ajax({
		url:'/query/Base.materialTest',
		type: 'get',
	}).done(function(data){		
		data.forEach(function(item, index){
			var option = $('<option>');
			option.attr('value', index);
			option.text(item.name);			
			select.append(option);
		});
		
		img.on('load', function(){
			loader.hide();
		});
		
		select.on('change', function(e) {		
			var imageId;			
			loader.show();
			
			if(this.value > -1) {
				imageId = data[this.value].image;
				
				if(imageId != null) {
					img.attr('src', '/image/' + imageId);
				}
			}
			else {
				img.attr('src', '/');
				loader.hide();
			}
		});
		
	});
});