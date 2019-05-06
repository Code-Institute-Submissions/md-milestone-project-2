queue()
   //Loading CSV Data
  .defer(d3.csv, "./data/dc.csv")
   .await(makeChart); //Calling the function makeChart
function makeChart(error, dcData) { //first param is error and not data

    var ndx = crossfilter(dcData); // global crossfilter

    //Creating a date format of just a Year
    var FirstApperanceDate = d3.time.format("%Y").parse;
    //Changin values to dates - Years
    dcData.forEach(function(d) {
        d.FirstApperance = FirstApperanceDate(d.FirstApperance);
    });
    //Caling graphs function to be rendered
    show_universum_selector(ndx);
    show_category_selector(ndx);
    show_alignment(ndx)
    dc_heros_by_gender(ndx);
    power_distribution_by_universum(ndx);
    power_distribution_by_gender(ndx);
    heros_by_race(ndx);
    new_apperances_through_years(ndx);
    //Rendering Graphs
    dc.renderAll();
}
function show_universum_selector(ndx) {
    var dim = ndx.dimension(dc.pluck('Publisher'));
    var group = dim.group();

    dc
        .selectMenu("#univers-selector")
        .dimension(dim)
        .group(group);
        
}
function show_category_selector(ndx) {
    var dim = ndx.dimension(dc.pluck('Category'));
    var group = dim.group();

   dc
        .selectMenu("#category-selector")
        .dimension(dim)
        .group(group);
}
function show_alignment(ndx) {
    var dim = ndx.dimension(dc.pluck('Alignment'));
    var group = dim.group();

     dc
        .selectMenu("#alignment-selector")
        .dimension(dim)
        .group(group);
}
function dc_heros_by_gender(ndx) {
    var dim = ndx.dimension(dc.pluck('Gender'));
    var group = dim.group();

   one = dc
        .pieChart("#gender-balance-dc")
        .width(500)
        .dimension(dim)
        .group(group)
        .innerRadius(50)
        .legend(dc.legend().x(380).y(70).itemHeight(13).gap(5))
        .renderLabel(false)
        .ordinalColors(["#56B2EA","#E064CD","#F8B700","#78CC00","#7B71C5"])
        
}
function heros_by_race(ndx) {
    var dim = ndx.dimension(dc.pluck('Category'));
    var group = dim.group();

    dc
        .pieChart("#heros_by_race")
        .width(500)
        .dimension(dim)
        .group(group)
        .innerRadius(50)
        .legend(dc.legend().x(380).y(70).itemHeight(13).gap(5))
        .renderLabel(false)
}
function new_apperances_through_years(ndx, dcData) {


   var dim = ndx.dimension(dc.pluck("FirstApperance"));

   var numberofApperances = dim
       .group()
       .reduceCount();
   var minDate = dim.bottom(1)[0].FirstApperance;
   var maxDate = dim.top(1)[0].FirstApperance;

   dc
       .lineChart("#apperance_t_years")
       //.attr("class", "line")
       //.attr("fill", "none")
       //.attr("stroke", "#000")
       .width(800)
       .height(300)
       .elasticY(true)
       //.x(d3.scale.linear().domain([1930, 2018]))
       .x(d3.time.scale().domain([minDate, maxDate]))
       .brushOn(false)
       
       .yAxisLabel("Number of Apperances")
       .xAxisLabel("Year")
       .dimension(dim)
       
       .group(numberofApperances)
       .renderArea(true)
       .ordinalColors(["#56B2EA","#E064CD","#F8B700","#78CC00","#7B71C5"])
}
function power_distribution_by_universum(ndx) {
    var universumColors = d3
        .scale
        .ordinal()
        .domain(["Marvel Comics", "DC Comics"])
        .range(["red", "blue"]);

    var pDim = ndx.dimension(dc.pluck("Power"));
    var uDim = ndx.dimension(function (d) {
        return [d.Power, d.Intelligence, d.HeroName, d.Publisher];
    });
    var universeGroup = uDim.group();
    var minPower = 0;
    var maxPower = 110;

    dc
        .scatterPlot("#power-distribution-by-inteligance")
        .width(800)
        .height(400)
        .x(d3.scale.linear().domain([minPower, maxPower]))
        .y(d3.scale.linear().domain([0, 110]))
        .brushOn(false)
        .symbolSize(6)
        .clipPadding(1)
        .xAxisLabel("Power incorelation to  Inteligence")
        .title(function (d) {
            return d.key[2] + " has power of " + d.key[0] + " and inteligance of " + d.key[1];
        })
        .colorAccessor(function (d) {
            return d.key[3];
        })
        .colors(universumColors)
        .dimension(pDim)
        .group(universeGroup)
        .margins({top: 10, right: 50, bottom: 75, left: 75});
}
function power_distribution_by_gender(ndx) {
    var universumColors = d3
        .scale
        .ordinal()
        .domain(["female", "male", ["unidentified"]])
        .range(["pink", "blue", "red"]);

    var pDim = ndx.dimension(dc.pluck("Power"));
    var uDim = ndx.dimension(function (d) {
        return [d.Power, d.Intelligence, d.HeroName, d.Gender];
    });
    var universeGroup = uDim.group();
    var minPower = 0;
    var maxPower = 110;

    dc
        .scatterPlot("#power-distribution-by-gender")
        .width(800)
        .height(400)
        .x(d3.scale.linear().domain([minPower, maxPower]))
        .y(d3.scale.linear().domain([0, 110]))
        .brushOn(false)
        .symbolSize(6)
        .clipPadding(1)
        .xAxisLabel("Power incorelation to  Inteligence")
        .title(function (d) {
            return d.key[2] + " has power of " + d.key[0] + " and inteligance of " + d.key[1];
        })
        .colorAccessor(function (d) {
            return d.key[3];
        })
        .colors(universumColors)
        .dimension(pDim)
        .group(universeGroup)
        .margins({top: 10, right: 50, bottom: 75, left: 75});
}

