var graph = (function(){
  'use strict';
  var paramDescriptionLookUp = {
    'tmpsfc': {
      'F': 'Temperature F',
      'C': 'Temperature C'
    }
  };
  return {
    createSingleLineGraph: createSingleLineGraph
  };



  function createSingleLineGraph(selector, data){
    document.querySelector(selector).innerHTML = '';
    var parameter = data.parameter;
    var units = data.units;
    var yLabel = paramDescriptionLookUp[parameter][units];
    var graphData = parseData(data['start_date'], data['end_date'], data['param_values']);
    MG.data_graphic({
        title: "CFSR Data",
        data: graphData,
        target: selector,
        width: 600,
        height: 400,
        right: 40,
        left: 75,
        area: false,
        x_label: "Dates",
        y_label: yLabel

    });
  }

  function parseData(startDate, endDate, values){
    var dateRange = getDateRange(startDate, endDate);
    var newData = [];
    for(var i = 0; i < values.length; i+=1){
      newData.push({
        date: dateRange[i],
        value: values[i]
      });
    }
    return newData;
  }


  function getDateRange(start, end){
    start = new Date(start);
    end = new Date(end);

    var dateArray = [];
    var currentDate = new Date(start);
    while(currentDate <= end){
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate()+1)
    }
    return dateArray;
  }

})();
