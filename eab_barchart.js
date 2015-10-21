var yrs = ["2005","2006","2007","2008","2009","2010","2011","2012","2013"];
var i02 = [88.382,86.246,74.853,65.06,50.321,49.277,28.614,6.391,3.263];

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
