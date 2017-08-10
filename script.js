var url =  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];




$.getJSON(url, function( response) {

    $("#info").css("visibility","visible");
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

    var high = Math.max.apply(Math,response.monthlyVariance.map(function(o){return o.variance;}));
    var low = Math.min.apply(Math,response.monthlyVariance.map(function(o){return o.variance;}));
    var base = response.baseTemperature;

    var colors = ['#5e4fa4', '#3288bd', '#66c2a5', '#abdda4', '#e6f598', '#ffffbf', '#fee08b', '#fdae61', '#f46d43', '#d53e4f', '#9e0142'];

    svg.append("g")
        .selectAll("rect")
        .data(response.monthlyVariance)
        .enter()
        .append('rect')
        .attr('x', function(d){
            var test = new Date();
            test.setYear(d.year);   
          return xScale(test);
        })
        .attr('y', function(d){
            var test2 = new Date(2012,Number(d.month-1))
          return yScale(test2);
        })
        .attr("width",3)
        .attr("height",(height/12))
        .attr("fill", function(d){
                var t = base + d.variance;
                if(t < 2.7){
                    return colors[0];
                }
                else if(t < 3.9 && t >= 2.7){
                    return colors[1];
                }
                else if(t < 5 && t >= 3.9){
                    return colors[2];
                }
                else if(t < 6.1 && t >= 5){
                    return colors[3];
                }
                else if(t < 7.2 && t >= 6.1){
                    return colors[4];
                }
                else if(t < 8.3 && t >= 7.2){
                    return colors[5];
                }
                else if(t < 9.4 && t >= 8.3){
                    return colors[6];
                }
                else if(t < 10.5 && t >= 9.4){
                    return colors[7];
                }
                else if(t < 11.6 && t >= 10.5){
                    return colors[8];
                }
                else if(t < 12.7 && t >= 11.6){
                    return colors[9];
                }
                else if(t >= 12.7){
                    return colors[10];
                }
                else{
                    return colors[0];
                }
            })
        .attr("stroke", function(d){
            var t = base + d.variance;
            if(t < 2.7){
                return colors[0];
            }
            else if(t < 3.9 && t >= 2.7){
                return colors[1];
            }
            else if(t < 5 && t >= 3.9){
                return colors[2];
            }
            else if(t < 6.1 && t >= 5){
                return colors[3];
            }
            else if(t < 7.2 && t >= 6.1){
                return colors[4];
            }
            else if(t < 8.3 && t >= 7.2){
                return colors[5];
            }
            else if(t < 9.4 && t >= 8.3){
                return colors[6];
            }
            else if(t < 10.5 && t >= 9.4){
                return colors[7];
            }
            else if(t < 11.6 && t >= 10.5){
                return colors[8];
            }
            else if(t < 12.7 && t >= 11.6){
                return colors[9];
            }
            else if(t >= 12.7){
                return colors[10];
            }
            else{
                return colors[0];
            }
        })
        .on("mouseover", function(d,i) {
            $("#info").css("left", (d3.event.pageX + 5) + "px")
                .css("top", (d3.event.pageY - 50) + "px");
            $("#info ").html(" "+d.year+" - "+months[d.month-1]+" <br/>"+((d.variance+base).toFixed(2))+"°C");
            $("#info").show();
        })
        .on("mouseout", function(d, i) {
            $("#info").hide();
        });
});


