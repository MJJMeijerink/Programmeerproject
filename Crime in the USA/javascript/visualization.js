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
	loadData.open("get", "http://mjjmeijerink.github.io/data.json", true);
	loadData.send();
	
	function dataLoaded(){
		var data = JSON.parse(this.responseText);
		console.log(getData('Guns per household', 'Alabama', data));
		
		slider = document.getElementById('slider')
		
		r1 = document.getElementById('Violent Crime rate');
		r1.onclick = function() {
			slider.min = 1960
			slider.max = 2012
			drawMap('Violent Crime rate', data, slider);
		}
		slider.onchange = function () {
			if (document.getElementById('Violent Crime rate').checked) {
				v = document.getElementById('Violent Crime rate').id;
				console.log(v)
			}
			drawMap(v, data, slider)
		}
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

function getData(v, c, d) {
	var l = []
	for (var x in d[0][c][v])  {
		l.push(d[0][c][v][x])
	}
	return l
}

function drawMap(v, data, slider = 0){
		for (var i = 0; i < Object.keys(states).length; i++) {
			var state = d3.select('#' + Object.keys(states)[i]);
			var x = getData(v, states[Object.keys(states)[i]], data);
			var value = x[slider.value - slider.min]
			if (value < 100) {
				state.style('fill', '#000000');
			}else if (value >= 100 && value < 200) {
				state.style('fill', '#222222');
			}else if (value >= 200 && value < 300) {
				state.style('fill', '#444444');
			}else if (value >= 300 && value < 400) {
				state.style('fill', '#666666');
			}else if (value >= 400 && value < 500) {
				state.style('fill', '#888888');
			}else if (value >= 500 && value < 600) {
				state.style('fill', '#AAAAAA');
			}else if (value >= 600) {
				state.style('fill', '#CCCCCC');
			}
	}
}