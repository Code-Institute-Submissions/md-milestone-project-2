queue()
    //Loading CSV Data
    .defer(d3.csv, "./data/data.csv")
    //Calling the function makeChart
    .await(makeChart); 
function makeChart(error, dcData) { 
    // global crossfilter
    let ndx = crossfilter(dcData); 
    //Creating a date format of just a Year
    let FirstApperanceDate = d3
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
    show_alignment_selector(ndx)
    //Piecharts
    characters_by_gender(ndx);
    characters_by_race(ndx);
    characters_by_alignment(ndx);
    //Scatterplots
    power_to_int_distribution_by_gender(ndx);
    //Linecharts
    new_apperances_through_years(ndx);
    new_apperances_through_years_by_universum(ndx, dcData);
    //Rendering Graphs
    dc.renderAll();
}
function show_universum_selector(ndx) {
    let dim = ndx.dimension(dc.pluck("Publisher"));
    let group = dim.group();

    dc
        .selectMenu("#univers-selector")
        .dimension(dim)
        .group(group);

}
function show_category_selector(ndx) {
    let dim = ndx.dimension(dc.pluck("Category"));
    let group = dim.group();

    dc
        .selectMenu("#category-selector")
        .dimension(dim)
        .group(group);
}
function show_alignment_selector(ndx) {
    let dim = ndx.dimension(dc.pluck("Alignment"));
    let group = dim.group();

    dc
        .selectMenu("#alignment-selector")
        .dimension(dim)
        .group(group)
}
function characters_by_gender(ndx) {
    let dim = ndx.dimension(dc.pluck("Gender"));
    let group = dim.group();

    dc
        .pieChart("#characters_by_gender")
        .width(390)
        .dimension(dim)
        .group(group)
        .innerRadius(50)
        .legend(dc.legend().x(1).y(70).itemHeight(13).gap(5))
        .renderLabel(false)
        .ordinalColors(["#7CCFCD", "#E58579", "#822F56"])
        .transitionDuration(1000)

}
function characters_by_race(ndx) {
    let dim = ndx.dimension(dc.pluck("Category"));
    let group = dim.group();

    dc
        .pieChart("#characters_by_race")
        .width(370)
        .dimension(dim)
        .group(group)
        .innerRadius(50)
        .legend(dc.legend().x(1).y(40).itemHeight(13).gap(5))
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
function characters_by_alignment(ndx) {
    let dim = ndx.dimension(dc.pluck("Alignment"));
    let group = dim.group();

    dc
        .pieChart("#characters_by_alignment")
        .width(370)
        .dimension(dim)
        .group(group)
        .innerRadius(50)
        .legend(dc.legend().x(1).y(60).itemHeight(13).gap(5))
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
function new_apperances_through_years(ndx) {
    let dim = ndx.dimension(dc.pluck("FirstApperance"));
    let numberofApperances = dim
        .group()
        .reduceCount();
    //finding minimum and maximum date from dataset
    let minDate = dim.bottom(1)[0].FirstApperance;
    let maxDate = dim.top(1)[0].FirstApperance;
    
    dc
        .lineChart("#new_apperance_through_years")
        .width(1200)
        .height(300)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticX(true)
        .brushOn(false)
        .yAxisLabel("Number of Apperances")
        .dimension(dim)
        .group(numberofApperances)
        .renderArea(true)
        .title(function(d){
            //tooltip title format
            let year = d.key.getFullYear();
            return "In " + year + " there was " + d.value + " of total new apperances";
        })
        .ordinalColors(["#C54961"])
        .y(d3.scale.linear().domain([0, 32]))
        .renderDataPoints(numberofApperances)
        .dotRadius(10)
        
}
function new_apperances_through_years_by_universum(ndx, dcData) {
    // setting dimension or serierschart
    let dim = ndx.dimension(function(data){
        return [data.Publisher, data.FirstApperance];
    });
    // grouping values from dimension
    let group = dim.group().reduceCount();
    // looking for minimum and maximum date from dataset
    let minDate = dim.bottom(1)[0].FirstApperance;
    let maxDate = dim.top(1)[0].FirstApperance;
    //creating a chart
    dc.seriesChart('#new_apperance_through_years_by_universum')
    .width(1200)
    .height(600)
    .chart(function(c) { 
        return dc.lineChart(c)
                 .evadeDomainFilter(false)
                 .xyTipsOn(true);     
                })
    .x(d3.time.scale().domain([minDate, maxDate]))
    .y(d3.scale.linear().domain([0, 27]))
    .brushOn(false)
    .yAxisLabel("Count")
    .dimension(dim)
    .elasticY(true)
    .group(group)    
    .useRightAxisGridLines(true) 
    .title(function(d){
        let rok = d.key[1].getFullYear();
        return "In " + rok + " there was " + d.value  + " new apperances";
    })  
    .seriesAccessor(function(d) { return d.key[0];})
    .keyAccessor(function(d) { return +d.key[1]; })
    .valueAccessor(function(d) { return +d.value; })
    .legend(dc.legend().x(70).y(50).itemHeight(20).gap(10).horizontal(4).legendWidth(200).itemWidth(120));
}
function power_to_int_distribution_by_gender(ndx) {
    let universumColors = d3
        .scale
        .ordinal()
        .domain(["female", "male", ["unidentified"]])
        .range(["#E064CD", "#56B2EA", "#F8B700"]);
    //creating a dimension by Power    
    let pDim = ndx.dimension(dc.pluck("Power"));
    //creating a dimension with nessesary data for display
    let uDim = ndx.dimension(function (d) {
        return [d.Power, d.Intelligence, d.HeroName, d.Gender];
    });
    //grouping values
    let universeGroup = uDim.group();
    let minPower = 0;
    let maxPower = 105;

    dc
        .scatterPlot("#power_to_int_distribution_by_gender")
        .width(1200)
        .height(400)
        .x(d3.scale.linear().domain([minPower, maxPower]))
        .y(d3.scale.linear().domain([0, 105]))
        .brushOn(false)
        .symbolSize(6)
        .clipPadding(1)
        .xAxisLabel("Power in correlation to Intelligence")
        .title(function (d) {
            //tooltip title format
            return d.key[2] + " is " + d.key[3] + " and has power of " + d.key[0] + " and intelligence of " + d.key[1];
        })
        .colorAccessor(function (d) {
            return d.key[3];
        })
        .colors(universumColors)
        .dimension(pDim)
        .group(universeGroup)
        .symbolSize(7)
        .margins({top: 10, right: 50, bottom: 75, left: 75})
}