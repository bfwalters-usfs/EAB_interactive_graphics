var datYrs = ["2005","2006","2007","2008","2009","2010","2011","2012","2013"];
var infestYrs = ["2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014"];
var ashVol = [[88.382,86.246,74.853,65.06,50.321,49.277,28.614,6.391,3.263],
	      [220.511,234.604,229.165,238.094,246.652,249.728,240.858,188.93,122.685],
	      [439.046,444.764,470.808,488.573,461.335,458.447,451.572,451.697,407.581],
	      [269.945,265.413,284.304,282.512,301.991,316.566,322.255,333.392,328.688],
	      [328.498,362.09,353.508,367.335,344.321,341.636,347.388,307.352,311.246],
	      [303.096,295.118,305.3,302.241,295.31,297.456,305.859,313.343,296.67],
	      [190.644,221.838,219.516,237.396,232.552,245.51,235.237,242.254,237.528],
	      [693.118,751.963,622.154,781.523,803.12,806.57,815.637,797.682,787.206],
	      [725.945,719.751,359.375,740.928,730.633,750.167,782.391,784.077,796.708],
	      [602.52,649.511,579.963,667.733,694.122,690.566,709.144,723.243,742.582],
	      [968.029,941.714,906.211,1055.189,1095.505,1111.626,1117.388,1120.319,1126.017],
	      [1856.191,1812.68,1357.032,1808.469,1831.844,1856.337,1890.677,1919.133,1956.735],
	      [1256.304,1320.848,1185.642,1400.892,1419.436,1437.389,1461.997,1490.124,1471.688]
	     ];
var vis = 0;

var margin = {top: 30, right: 30, bottom: 30, left: 40};
var w = 830-margin.left-margin.right;
var h = 380-margin.top-margin.bottom;

var sMargin = {top: 30, right: 10, bottom: 30, left: 5};
var sW = 100;
var sH = 380;



var x = d3.scale.ordinal()
    .domain(datYrs)
    .rangeRoundBands([0,w], 0.04);

var y = d3.scale.linear()
    .domain([0,1500])
    .range([h,0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select(".chart")
    .append("svg")
    .attr("width",w+margin.left+margin.right)
    .attr("height",h+margin.top+margin.bottom)
    .append("g")
    .attr("transform","translate("+margin.left+","+margin.top+")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,"+h+")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

var iyr = svg.selectAll(".iyr")
    .data(ashVol[vis])
    .enter()
    .append("g")
    .attr("class","iyr")


iyr.append("rect")
    .attr("class","bar")
    .attr("x",function(d,i){return x(datYrs[i]);})
    .attr("y",function(d){return y(d);})
    .attr("height", function(d){return h - y(d);})
    .attr("width",x.rangeBand())
    .attr("fill", "steelblue");


var legend = d3.select(".sidebar")
    .append("svg")
    .attr("width",sW)
    .attr("height",sH)
    .append("g")
    .attr("transform","translate("+sMargin.left+","+sMargin.top+")");

var iyrSelect = legend.selectAll(".iyrSelect")
    .data(infestYrs)
    .enter()
    .append("g")
    .attr("class","iyrSelect")

iyrSelect.append("text")
    .attr("class","iYrLabel")
    .attr("x", function(d){return sW-55;})
    .attr("y", function(d){return infestYrs.indexOf(d)*25+11.5;})
    .text(function(d){return d;})
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", "black");

iyrSelect.append("rect")
    .attr("class","iyrBox")
    .attr("height",15)
    .attr("width",35)
    .attr("x",function(d){return sMargin.left;})
    .attr("y",function(d){return infestYrs.indexOf(d)*25;})
    .attr("stroke","steelblue")
    .attr("fill",function(d){if(infestYrs.indexOf(d)==vis){return "steelblue";}else{return "white";}})
    .on("click", function(d){vis = infestYrs.indexOf(d);
			     iyrSelect.select("rect")
			         .attr("fill",function(d){if(infestYrs.indexOf(d)==vis)
						      {return "steelblue";}else{return "white";}});
			     iyr.select(".bar")
			     .data(ashVol[vis])
			     .transition()
			     .duration(1000)
			     .attr("y",function(d){return y(d);})
			     .attr("height", function(d){return h - y(d);});
			     svg.select(".y.axis")
			     .transition()
			     .duration(1000)
			     .call(yAxis);				   
			    });
