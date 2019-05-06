queue()
//Loading CSV Data
    .defer(d3.csv, "./data/data.csv")
    .await(makeChart); //Calling the function makeChart
function makeChart(error, dcData) { //first param is error and not data

    var ndx = crossfilter(dcData); // global crossfilter



    //Creating a date format of just a Year
    var FirstApperanceDate = d3
        .time
        .format("%Y")
        .parse;
    //Changin values to dates - Years
    dcData.forEach(function (d) {
        d.FirstApperance = FirstApperanceDate(d.FirstApperance);
    });
    //Caling graphs function to be rendered Selectors
    show_universum_selector(ndx);
    show_category_selector(ndx);
    show_alignment(ndx)
    //Graphs
    dc_heros_by_gender(ndx);
    heros_by_alignment(ndx);
    power_distribution_by_universum(ndx);
    power_distribution_by_gender(ndx);
    heros_by_race(ndx);
    new_apperances_through_years(ndx);

    apperances_t_years_by_universum(ndx, dcData);
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
        .ordinalColors(["#7CCFCD", "#E58579", "#822F56"])
        .transitionDuration(1000)

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
        .legend(dc.legend().x(380).y(40).itemHeight(13).gap(5))
        .renderLabel(false)
        .ordinalColors([
            "#2F2936",
            "#822F56",
            "#C54961",
            "#E58579",
            "#F3AB91",
            "#7CCFCD",
            "#B5EBE8"
        ])
        .transitionDuration(1000)
}
function heros_by_alignment(ndx) {
    var dim = ndx.dimension(dc.pluck('Alignment'));
    var group = dim.group();

    dc
        .pieChart("#alignment-procentage")
        .width(500)
        .dimension(dim)
        .group(group)
        .innerRadius(50)
        .legend(dc.legend().x(380).y(60).itemHeight(13).gap(5))
        .renderLabel(false)
        .ordinalColors([
            "#2F2936",
            "#822F56",
            "#C54961",
            "#E58579",
            "#F3AB91",
            "#7CCFCD",
            "#B5EBE8"
        ])
        .transitionDuration(1000)
}
function new_apperances_through_years(ndx, dcData) {
    var dim = ndx.dimension(dc.pluck("FirstApperance"));

    var numberofApperances = dim
        .group()
        .reduceCount();
    var minDate = dim
        .bottom(1)[0]
        .FirstApperance;
    var maxDate = dim
        .top(1)[0]
        .FirstApperance;
    
    //var dcApperances = numberofApperances.reduceCount('DC Comics');

    dc
        .lineChart("#apperance_t_years")
        .width(800)
        .height(300)
        .elasticY(true)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticX(true)
        .brushOn(false)
        .yAxisLabel("Number of Apperances")
        .dimension(dim)
        .group(numberofApperances)
        .renderArea(true)
        .ordinalColors(["#C54961"])
        .renderDataPoints(numberofApperances)

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
        .range(["#E064CD", "#56B2EA", "#F8B700"]);

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
function apperances_t_years_by_universum(ndx, dcData) {
    dcData.forEach(function(x) {
        if (x.Publisher == 'Marvel Comics') {
            x.newdata = 1;
        }   else {
            x.newdata =2;
        }
    });

    var dim = ndx.dimension(function(data){
        return [data.Publisher, data.FirstApperance];
    });
    var group = dim.group().reduceCount();

    var minDate = dim.bottom(1)[0].FirstApperance;
    var maxDate = dim.top(1)[0].FirstApperance;

    dc.seriesChart('#apperances_t_years_by_universum')
    .width(800)
    .height(600)
   // .chart(function(c) { 
    //    return dc.lineChart(c).interpolate('cardinal').evadeDomainFilter(true); 
  //  })
    .x(d3.time.scale().domain([minDate, maxDate]))
    .y(d3.scale.linear().domain([0, 30]))
    .chart(function(c) { 
        return dc.lineChart(c)
                 .evadeDomainFilter(false)
                 .xyTipsOn(true);     
                })
    //.elasticY(true)
    .brushOn(false)
    //.xAxisLabel("Height")
    .yAxisLabel("Count")
    .dimension(dim)
    .group(group)
    .seriesAccessor(function(d) { return d.key[0];})
    .keyAccessor(function(d) { return +d.key[1]; })
    .valueAccessor(function(d) { return +d.value; })
    .legend(dc.legend().x(70).y(50).itemHeight(20).gap(10).horizontal(4).legendWidth(200).itemWidth(120));
}

