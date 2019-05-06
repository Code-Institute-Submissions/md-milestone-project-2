/* var countperPubliosher = dc.barChart('#json_graph');

d3.json('data/newdata.json').then(function(data) {

    var ndx = crossfilter(data);
    var all = ndx.groupAll();

    var publishers = ndx.dimension(function(d){
        return d.publishers;
    })
    console.log(publishers);
   /* var publishersGroup = publishers.group()

    countperPubliosher
    .width(180)
    .height(180)
    .radius(80)
    .dimension(publishers)
    .group(publishersGroup)
});*/

queue()
    .defer(d3.json, "data/newdata.json")
    .await(graphs);

function graphs(error, comicData) {
    var ndx = crossfilter(comicData);

    showPublishers(ndx);
    dc.renderAll();
}

function showPublishers(ndx){
    var dim = ndx.dimension(function(d){
        return d.biography.publisher;
    });
    var group = dim.group();

    dc.pieChart("#json_graph")
      .height(300)
      .width(300)
      .radius(30)
      .transitionDuration(150)
      .dimension(dim)
      .group(group)
      .legend(dc.legend().gap(7));
  }
