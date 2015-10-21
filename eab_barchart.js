var yrs = ["2005","2006","2007","2008","2009","2010","2011","2012","2013"];
var i02 = [88.382,86.246,74.853,65.06,50.321,49.277,28.614,6.391,3.263];
// var i03 = [220.511,234.604,229.165,238.094,246.652,249.728,240.858,188.93,122.685];
// var i04 = [439.046,444.764,470.808,488.573,461.335,458.447,451.572,451.697,407.581];
// var i05 = [269.945,265.413,284.304,282.512,301.991,316.566,322.255,333.392,328.688];
// var i06 = [328.498,362.09,353.508,367.335,344.321,341.636,347.388,307.352,311.246];
// var i07 = [303.096,295.118,305.3,302.241,295.31,297.456,305.859,313.343,296.67];
// var i08 = [190.644,221.838,219.516,237.396,232.552,245.51,235.237,242.254,237.528];
// var i09 = [693.118,751.963,622.154,781.523,803.12,806.57,815.637,797.682,787.206];
// var i10 = [725.945,719.751,359.375,740.928,730.633,750.167,782.391,784.077,796.708];
// var i11 = [602.52,649.511,579.963,667.733,694.122,690.566,709.144,723.243,742.582];
// var i12 = [968.029,941.714,906.211,1055.189,1095.505,1111.626,1117.388,1120.319,1126.017];
// var i13 = [1856.191,1812.68,1357.032,1808.469,1831.844,1856.337,1890.677,1919.133,1956.735];
// var i14 = [1256.304,1320.848,1185.642,1400.892,1419.436,1437.389,1461.997,1490.124,1471.688];

var margin = {top: 20, right: 30, bottom: 30, left: 40};
var w = 800-margin.left-margin.right;
var h = 350-margin.top-margin.bottom;
var barWidth = w/i02.length;

var x = d3.scale.ordinal()
    .domain(yrs)
    .rangeRoundBands([0,w], 0.05);

var y = d3.scale.linear()
    .domain([0, d3.max(i02)])
    .range([h,0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var chart = d3.select(".chart")
    .attr("width",w+margin.left+margin.right)
    .attr("height",h+margin.top+margin.bottom)
    .append("g")
    .attr("transform","translate("+margin.left+","+margin.top+")");

chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,"+h+")")
    .call(xAxis);

chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform","rotate(-90)")
    .attr("dx","-6em")
    .attr("dy", "-2.66em")
    .style("text-anchor", "end")
    .text("Live Ash Volume (million cubic feet)");

chart.selectAll(".bar")
    .data(i02)
    .enter()
    .append("rect")
    .attr("class","bar")
    .attr("x", function(d,i){return x(yrs[i]);})
    .attr("y", function(d){return y(d);})
    .attr("height", function(d){return h - y(d);})
    .attr("width", x.rangeBand())
    .attr("fill", "steelblue");
