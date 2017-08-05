var url =  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";
var allData = [];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



$.getJSON(url, function( response) {
    $("#info").css("visibilty","visible");
    $("#info").hide();

    //console.log(response.data);
    var gdp=[];
    var quart=[];
    for(var i=0;i<response.data.length;i++)
    {
        quart.push(response.data[i][0]);
        gdp.push(response.data[i][1]);
    }


    var barWidth = 3.5,
        height = 420;


    var xScale = d3.scaleTime()
        .domain([new Date(1947,0,1),new Date(2015,0,1)])
        .range([0, barWidth * gdp.length]);

    var y = d3.scaleLinear()
        .domain([0, d3.max(gdp)])
        .range([height, 0]);

    var xAxis = d3.axisBottom()
        .scale(xScale);


    var yy = d3.scaleLinear()
        .domain([0, d3.max(gdp)/1000])
        .range([height, 0]);

    var yAxis = d3.axisLeft()
        .scale(yy);

    var colors = d3.scaleLinear()
        .domain([0,d3.max(gdp)])
        .range(["#000000", "#00ff01"]);

    var chart = d3.select(".chart")
        .attr("width", barWidth * gdp.length+30)
        .attr("height", height+40);


    var bar = chart.selectAll("g")

        .data(gdp)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });





    d3.select(".chart").append("text")
        .attr("text-anchor", "middle")
        .style("font-weight","bold")
        .style("font-family","monospace")
        .style("font-size","12pt")// this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ 20 +","+90+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .html("Gross Domestic Product");

    d3.select(".chart").append("text")
        .attr("text-anchor", "middle")
        .style("font-weight","bold")
        .style("font-family","monospace")
        .style("font-size","14pt")// this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ 38 +","+90+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .html("(x 1000 Billion $)");

    d3.select(".chart")
        .append("g")
        .attr("transform","translate(-5,0)")
        .call(yAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .style("font-weight","bold")
        .style("font-size","10pt");

    d3.select(".chart")
        .append("g")
        .attr("transform","translate(0,"+(height+5)+")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .style("font-weight","bold")
        .style("font-size","10pt");

    bar.append("rect")
        .attr("width", barWidth)
        .attr("height",function(d) { return height - y(d);})
        .attr("y",y)
        .style("stroke", "black")
        .style("stroke-width", 1)
        .attr("fill",function(d) { return colors(d); })
        .on("mouseover", function(d,i) {
            $("#info").css("left", (d3.event.pageX + 5) + "px")
                .css("top", (d3.event.pageY - 50) + "px");
            $("#info ").html(
                d.toFixed(2)+' Billion $'+
                '<br/> '+
                numberToLetterMonth(quart[i])
            );
            $("#info").show();
            d3.select(this)
                .attr("fill", "white");
        })
        .on("mouseout", function(d, i) {
            $("#info").hide();
            d3.select(this).attr("fill",function(d) {return colors(d); });
        });
});


function numberToLetterMonth(str)
{
    return str.split("-")[0]+" "+months[Number(str.split("-")[1])];
}