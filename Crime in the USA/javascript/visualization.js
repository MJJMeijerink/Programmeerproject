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

	var data;
	var loadData = new XMLHttpRequest();
	loadData.onload = dataLoaded;
	loadData.open("get", "data/data.json", true);
	loadData.send();
	
	function dataLoaded(){
		var data = JSON.parse(this.responseText);
		console.log(data);
	}
	
}

function goTo() {
	document.getElementById('SVG').style.width = "35%";
	document.getElementById('graph').style.display = 'initial';
}

function back() {
	document.getElementById('graph').style.display = 'none';
	document.getElementById('SVG').style.width = "60%";
}
