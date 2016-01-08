function ready() { // Load SVG before doing ANYTHING

	d3.selectAll('path')
		.on('mouseover', function(){
			d3.select(this).style('cursor', 'hand').style('stroke-width', 0.6);
			this.parentNode.appendChild(this);
			var labels = document.getElementById('labels')
			labels.parentNode.appendChild(labels);
		}).on('mouseout', function(){
			d3.select(this).style('stroke-width', 0.28222218);
		});
	
	for (var i = 0; i < Object.keys(states).length; i++) {
		var state = d3.select('#' + Object.keys(states)[i]);
		state.on('click', function(){goTo();});
	}

}

function goTo() {
	document.getElementById('buttons2').style.display = 'initial';
	document.getElementById('graph').style.display = 'initial';
	var $target = $('html,body'); 
	$target.animate({scrollTop: $target.height()}, 400);
}

function back() {
	var $target = $('html,body'); 
	$target.animate({scrollTop: 0}, 400);
	setTimeout( function(){
		document.getElementById('buttons2').style.display = 'none';
		document.getElementById('graph').style.display = 'none';
	},400);
}