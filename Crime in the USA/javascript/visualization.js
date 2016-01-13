function ready() { // Load SVG before doing ANYTHING

	d3.selectAll('path')
		.on('mouseover', function(){
			d3.select(this).style('cursor', 'hand').style('cursor', 'pointer').style('stroke-width', 0.6);
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
	
	var variables = ['Violent Crime rate', 'Forcible rape rate', 'Robbery rate', 'Aggravated assault rate', 'Murder rate',
					'Property crime rate', 'Burglary rate', 'Larceny-theft rate', 'Motor vehicle theft rate', 'Unemployment', 'Guns per household']
	for (v in variables) {
		document.getElementById(variables[v]).checked = false;
	}
	document.getElementById('slider').min = 0;
	document.getElementById('slider').max = 0;
	
	r1 = document.getElementById('Violent Crime rate');
	r2 = document.getElementById('Forcible rape rate');
	r3 = document.getElementById('Robbery rate');
	r4 = document.getElementById('Aggravated assault rate');
	r5 = document.getElementById('Property crime rate');
	r6 = document.getElementById('Burglary rate');
	r7 = document.getElementById('Larceny-theft rate');
	r8 = document.getElementById('Motor vehicle theft rate');
	r9 = document.getElementById('Unemployment');
	r10 = document.getElementById('Guns per household');
	r11 = document.getElementById('Murder rate');

	var data;
	var loadData = new XMLHttpRequest();
	loadData.onload = dataLoaded;
	loadData.open("get", "data/data.json", true);
	loadData.send();
	
	function dataLoaded(){
		var data = JSON.parse(this.responseText);
		
		slider = document.getElementById('slider')
		
		r1.onclick = function() {
			slider.min = 1960
			slider.max = 2012
			drawMap(r1.id, data, slider);
		}	
		r2.onclick = function() {
			slider.min = 1960
			slider.max = 2012
			drawMap(r2.id, data, slider);
		}		
		r3.onclick = function() {
			slider.min = 1960
			slider.max = 2012
			drawMap(r3.id, data, slider);
		}
		r4.onclick = function() {
			slider.min = 1960
			slider.max = 2012
			drawMap(r4.id, data, slider);
		}	
		r5.onclick = function() {
			slider.min = 1960
			slider.max = 2012
			drawMap(r5.id, data, slider);
		}	
		r6.onclick = function() {
			slider.min = 1960
			slider.max = 2012
			drawMap(r6.id, data, slider);
		}
		r7.onclick = function() {
			slider.min = 1960
			slider.max = 2012
			drawMap(r7.id, data, slider);
		}
		r8.onclick = function() {
			slider.min = 1960
			slider.max = 2012
			drawMap(r8.id, data, slider);
		}
		r9.onclick = function() {
			slider.min = 1976
			slider.max = 2015
			drawMap(r9.id, data, slider);
		}
		r10.onclick = function() {
			slider.min = 0
			slider.max = 2
			drawMap(r10.id, data, slider);
		}
		r11.onclick = function() {
			slider.min = 1960
			slider.max = 2012
			drawMap(r11.id, data, slider);
		}
		slider.oninput = function () {
			for (x in variables) {
				if (document.getElementById(variables[x]).checked) {
					v = document.getElementById(variables[x])
				}
			}
			if (slider.max > 0) {
				drawMap(v.id, data, slider);
			}
			if (slider.value > 1950) {
				document.getElementById('sliderText').innerHTML = 'Year: ' + slider.value;
			}else if (slider.value == 2) {
				document.getElementById('sliderText').innerHTML = 'Year: 2001 - 2010';
			}else if (slider.value == 1) {
				document.getElementById('sliderText').innerHTML = 'Year: 1991 - 2000';
			}else if (slider.value == 0 && slider.max > 0) {
				document.getElementById('sliderText').innerHTML = 'Year: 1981 - 1990';
			}
		}
	}
	
}

function goTo() {
	document.getElementById('SVG').style.width = "35%";
	document.getElementById('graph').style.display = 'initial';
}

function back() {
	document.getElementById('graph').style.display = 'none';
	document.getElementById('SVG').style.width = "65%";
}

function getData(d, v) {
	var l = {};
	for (var x in d[0]) {
		var vals = Object.keys(d[0][x][v]).map(function (key) {
			return d[0][x][v][key];
		});
		l[d[0][x]['Name']]=vals;
	}
	return l
}

function drawMap(v, data, slider = 0){
	if (slider.value > 1950) {
		document.getElementById('sliderText').innerHTML = 'Year: ' + slider.value;
	}
	var d = getData(data, v);
	var vals = Object.keys(d).map(function (key) {
		return d[key];
	});
	var max = d3.max(vals, function(array) {
		return d3.max([array[slider.value - slider.min]]);
	});
	var min = d3.min(vals, function (array) {
		return d3.min([array[slider.value - slider.min]]);
	});
	console.log(min + ', ' + max)
	var stateNames = Object.getOwnPropertyNames(d);
	for (var i = 0; i < stateNames.length; i++) {
		var state = d3.select('#' + Object.getOwnPropertyNames(d)[i]);
		if (v != 'Guns per household') {
			var value = d[stateNames[i]][slider.value - slider.min]
			console.log(value + ', ' + stateNames[i]);
		} else {
			if (slider.value == 0) {var value = d[stateNames[i]][2];}
			else if (slider.value == 2) {var value = d[stateNames[i]][0];}
			else {var value = d[stateNames[i]][1];}
		}
		var color = d3.scale.linear().domain([min, max]).range(['#f7fcf5', '#00441b']); //http://bl.ocks.org/darrenjaworski/5874214
		state.style('fill', function() {return color(value);});
	}
}