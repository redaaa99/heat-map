var url =  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



$.getJSON(url, function( response) {

    console.log(response);


    var height = 600;
    var width = 900;

    var svg = d3.select('svg');


    ///////////////////// X AXIS ////////////////////
    var xScale = d3.scaleTime()
        .domain([new Date("1753"),new Date("2015")])
        .range([0,width]);

    var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickSize(10, 0)
        .tickArguments([d3.timeYear.every(10)]);

    svg.append("g")
        .attr("class", "xaxis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.selectAll(".xaxis")  // select all the text elements for the xaxis
        .attr("font-weight","100")
        .attr("font-size","9pt");


    svg.append("text")
        .attr("text-anchor", "middle")
        .style("font-weight","bold")
        .style("font-family","monospace")
        .style("font-size","14pt")// this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ width/2 +","+(height+60)+")")  // text is drawn off the screen top left, move down and out and rotate
        .html("Years");
    /////////////////////////////////////////////////////

    ///////////////////// Y AXIS ////////////////////
    var yScale = d3.scaleTime()
        .domain([new Date(2012, 0, 1), new Date(2012, 11, 31)])
        .range([0,height]);

    var yAxis = d3.axisLeft()
        .tickSize(16, 0)
        .tickFormat(d3.timeFormat("%B"))
        .scale(yScale);

    svg.append("g")
        .attr("class", "yaxis")
        .attr("transform", "translate(0,0)")
        .call(yAxis)
        .selectAll(".tick text")
        .style("text-anchor", "end")
        .attr("transform", "translate(10,25)");

    svg.selectAll(".yaxis")  // select all the text elements for the xaxis
        .attr("font-family","monospace")
        .attr("font-size","13pt");

    svg.append("text")
        .attr("text-anchor", "middle")
        .style("font-weight","bold")
        .style("font-family","monospace")
        .style("font-size","14pt")// this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate(-80,"+height/2+")rotate(-90)")   // text is drawn off the screen top left, move down and out and rotate
        .html("Months");
    /////////////////////////////////////////////////////
});


