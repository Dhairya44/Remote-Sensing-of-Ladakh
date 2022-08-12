/*******************************************************************************
 * Model *
 *
 * A section to define information about the data being presented in your
 * app.
 *
 * Guidelines: Use this section to import assets and define information that
 * are used to parameterize data-dependant widgets and control style and
 * behavior on UI interactions.
 ******************************************************************************/
//do water evaporation+surface water+monthly rainfall
var roi = ee.Feature(ee.FeatureCollection("users/shreyasketkar/ladakh-water").toList(135).get(131));
var gsw = ee.Image("JRC/GSW1_3/GlobalSurfaceWater");
var monthlyRainfall=ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD");
var waterVapour = ee.ImageCollection('COPERNICUS/S3/OLCI');
var waterSalinity=  ee.ImageCollection("HYCOM/sea_temp_salinity");
var monthlyEvaporation = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY");
var waterTemperature=waterSalinity;
var VIS_OCCURRENCE = {
    min: 0,
    max: 100,
    palette: ['red', 'blue']
};
var VIS_CHANGE = {
    min: -50,
    max: 50,
    palette: ['red', 'black', 'limegreen']
};
var VIS_WATER_MASK = {
  palette: ['white', 'black']
};

var waterVapourImgInfo = {
  startYear: 2018,
  endYear: 2022,
  desc: "OLCI is one of the instruments in the ESA/EUMETSAT Sentinel-3 mission for measuring sea-surface topography, sea- and land-surface temperature, ocean color and land color with high-end accuracy and reliability ",
  bands: {
    "Chl absorption max": {
        bname: "Oa03_radiance",
        color: 'b4e7b0',
        params: {min:1000, max:7000, palette: ['eff3ff', 'bdd7e7', '6baed6', '3182bd', '08519c']}
    },
    "Chl, sediment, turbidity, red tide": {
        bname: "Oa05_radiance",
        color: 'd2cdc0',
        params: {min:1000, max: 7000, palette: ['eff3ff', 'bdd7e7', '6baed6', '3182bd', '08519c']}
    },
    "Sediment Loading": {
        bname: "Oa07_radiance",
        color: 'ca9146',
        params: {min: 1000, max: 7000, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
    },
    "Water vapour absorption reference": {
        bname: "Oa18_radiance",
        color: '85c77e',
        params: {min: 1000, max: 7000	, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
    }
  }
};

 
    var waterTemperatureImgInfo =
{
  startYear: 2018,
  endYear: 2022,
  desc: "The Hybrid Coordinate Ocean Model (HYCOM) is a data-assimilative hybrid isopycnal-sigma-pressure (generalized) coordinate ocean model",
  bands: 
  {
     
    
    "Water Temperature at 50m": {
      bname: "water_temp_50",
      color: '85c77e',
      params: {min: -2000, max: 2000, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
    },
    "Water Temperature at 100m": {
      bname: "water_temp_100",
      color: '85c77e',
      params: {min: -2000, max: 2000, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
    },
    "Water Temperature at 1000m": {
      bname: "water_temp_1000",
      color: '85c77e',
      params: {min: -2000, max:2000, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
    },
    "Water Temperature at 2500m": {
      bname: "water_temp_2500",
      color: 'd2cdc0',
      params: {min:-5000, max:	5000, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
    },
    "Water Temperature At 5000m": {
      bname: "water_temp_5000",
      color: "b4e7b0",
      params: {min:	-4000, max: 4000, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
    },
   
  }
    
};
var waterSalinityImgInfo =
{
  startYear: 2018,
  endYear: 2022,
  desc: "The Hybrid Coordinate Ocean Model (HYCOM) is a data-assimilative hybrid isopycnal-sigma-pressure (generalized) coordinate ocean model",
  bands: 
  {
    "Water Salinity At 2m": {
      bname: "salinity_2",
      color: "b4e7b0",
      params: {min:		-20002, max: 32767, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
    },
    "Water Salinity at 10m": {
      bname: "salinity_10",
      color: 'd2cdc0',
      params: {min:-19624, max:	32767, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
    },
    "Water Salinity at 50m": {
      bname: "salinity_50",
      color: '85c77e',
      params: {min: -17738, max:32767, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
    },
    "Water Salinity at 100m": {
      bname: "salinity_100",
      color: '85c77e',
      params: {min: -16717, max: 27143, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
    },
    "Water Salinity at 1000m": 
    {
      bname: "salinity_1000",
      color: '85c77e',
      params: {min: 0, max: 21982, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
    },
    "Water Salinity at 2500m": 
    {
      bname: "salinity_3000",
      color: '85c77e',
      params: {min: 0, max: 21982, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
    },
    "Water Salinity at 5000m": 
    {
      bname: "salinity_5000",
      color: '85c77e',
      params: {min: 0, max: 21982, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
    }
  
  }
};

var monthlyEvaporationImgInfo = 
{
  startYear: 2018,
  endYear: 2022,
  desc: "ERA5-Land is a reanalysis dataset providing a consistent view of the evolution of land variables over several decades ",
  bands: {
    "Evaporation From Soil": {
      bname: "evaporation_from_bare_soil",
      color: "d4e7b0",
      params: {min:0.0000000000015, max:0.000000015, palette: ['lightyellow', 'steelblue', 'darkblue']}
    },
    "Evaporation From Water Sources": {
      bname: "evaporation_from_open_water_surfaces_excluding_oceans",
      color: '38814e',
      params: {min:0.0000000000015, max:0.000000015, palette: ['lightyellow', 'steelblue', 'darkblue']}
    },
    "Evaporation From Transpiration": {
      bname: "evaporation_from_vegetation_transpiration",
      color: 'fbf65d',
      params: {min:0.0000000000015, max:0.000000015, palette: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000']}
    },
    "Total Evaporation": {
      bname: "total_evaporation",
      color: 'd2cdc0',
      params: {min:0.0000000000015, max:0.000000015, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
    },
    "Total Precipitation": {
      bname: "total_precipitation",
      color: 'd2cdc0',
      params: {min:0, max:0.015, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
    },
  }
}



 var currData =
 {
 
   
  col: monthlyEvaporation,
  info: monthlyEvaporationImgInfo
}

var currMap = {};




/*******************************************************************************
 * Components *
 ******************************************************************************/

var controlPanel = ui.Panel();
var map = ui.Map();
var mainLabel = ui.Label('Water');
var divider1 = ui.Panel();
var divider2 = ui.Panel();
var divider3 = ui.Panel();
var divider4=ui.Panel();
currMap.m = map;

var selectYear = {};
selectYear.label = ui.Label('Select Year');
selectYear.slider = ui.Slider(
  {
  min: currData.info.startYear,  
  max: currData.info.endYear,    
  step: 1,
  onChange: updateMap
});
selectYear.panel = ui.Panel([selectYear.label]);

var selectBand = {}
var checkBox={};

checkBox.roi=ui.Checkbox('Show Region of Interest',false,showRoi);
checkBox.layer=ui.Checkbox('Hide Band Layer',false,hideLayer);
checkBox.panel=ui.Panel
({
  widgets: [checkBox.roi,checkBox.layer],
  layout: ui.Panel.Layout.flow('vertical'),
});


selectBand.label = ui.Label('Select Band');
selectBand.selector = ui.Select(Object.keys(currData.info.bands), null, Object.keys(currData.info.bands)[3], updateMap);
selectBand.panel = ui.Panel([ selectBand.label]);
var desc = ui.Label({ value: currData.info.desc,style: {margin: '10px', fontSize: '16px',  fontWeight: '70'}
});
var waterVapourBtn = ui.Button('Water Vapour',updateWaterVapour); 
var waterSalinityBtn = ui.Button('Water Salinity',updateWaterSalinity);
var EvaporationBtn = ui.Button('Water Evaporation',updateEvaporation);
var monthlyRainfallBtn = ui.Button('Monthly Rainfall',updateMonthlyRainfall);
var SurfaceWaterBtn = ui.Button('Surface Water',updateSurfaceWater);
var waterTemperatureBtn = ui.Button('Water Temperature',updateWaterTemperature);
var BtnPanel1 = ui.Panel
({
  widgets: [waterVapourBtn,EvaporationBtn],
  layout: ui.Panel.Layout.flow('horizontal'),
});
var BtnPanel2 = ui.Panel
({
  widgets: [waterSalinityBtn, waterTemperatureBtn],
  layout: ui.Panel.Layout.flow('horizontal'),
});


var BtnPanel3 = ui.Panel
({
  widgets: [monthlyRainfallBtn,SurfaceWaterBtn],
  layout: ui.Panel.Layout.flow('horizontal'),
});

//selectBand.panel.add(checkBox.roi);

var middlePanel=ui.Panel
({
  widgets: [monthlyRainfallBtn,SurfaceWaterBtn],
  layout: ui.Panel.Layout.flow('horizontal'),
});
var bandPanel=ui.Panel(
  {
      widgets: [selectBand.selector,checkBox.layer],
  layout: ui.Panel.Layout.flow('horizontal'),
  })
  var middleLayer=ui.Panel(
  {
    widgets:[selectYear.slider,checkBox.roi],
     layout: ui.Panel.Layout.flow('horizontal'),
  })
  var legend = {}
legend.title = ui.Label();
legend.colorbar = ui.Thumbnail(ee.Image.pixelLonLat().select(0));
legend.leftLabel = ui.Label('[min]');
legend.centerLabel = ui.Label();
legend.rightLabel = ui.Label('[max]');
legend.labelPanel = ui.Panel({
  widgets: [legend.leftLabel,legend.centerLabel,legend.rightLabel],
  layout: ui.Panel.Layout.flow('horizontal')
});
legend.panel = ui.Panel([legend.title, legend.colorbar, legend.labelPanel]);


var bottomPanel = ui.Label({ value: "Earth Engine App to Visualize important parameters related to Water near the region of Ladakh",style: {margin: '10px', fontSize: '16px',  fontWeight: '70'}
});


/*******************************************************************************
 * Composition *
 ******************************************************************************/


controlPanel.add(mainLabel);//done
controlPanel.add(divider1);//done
controlPanel.add(desc);//done
controlPanel.add(divider2);//done
controlPanel.add(BtnPanel1);
//done
//controlPanel.add(middleLayer);
controlPanel.add(BtnPanel2);
controlPanel.add(divider3);

controlPanel.add(selectYear.panel);//along with show roi
controlPanel.add(middleLayer);
controlPanel.add(selectBand.panel);
controlPanel.add(bandPanel);//along with hide current layer

//controlPanel.add(checkBox.panel);
controlPanel.add(divider4);//done
controlPanel.add(BtnPanel3);//consists of motnhly rainfall and global surface water
controlPanel.add(bottomPanel);
map.add(legend.panel);
ui.root.clear();

ui.root.add(controlPanel);
ui.root.add(map);


/*******************************************************************************
 * Styling *
 ******************************************************************************/
 

var dividerStyle = 
{
  backgroundColor: 'black',
  height:'4px',
  margin: '15px 0px 15px 0px'
}
var ActiveBtnStyle = {
  width: '100px',
  color: 'green',
  fontSize: '2px',
  fontWeight: '70',
  margin: '10px 5px 7px 3px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  border:"1px solid grey"
}
var BtnStyle = {
  width: '100px',
  color: 'black',
  fontSize: '2px',
  fontWeight: '70',
  margin: '10px 5px 7px 3px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  border:"1px solid grey"
}
var cbRoi=
{
 
  width: '100px',
  color: 'black',
    fontSize: '15px',
  fontWeight: '70',
  margin: '0px 0px 10px 0px',

}
var cbLayer=
{
  width: '100px',
  color: 'black',
    fontSize: '15px',
  fontWeight: '70',
  margin: '0px 10px 20px 0px',
}

var sliderStyle = 
{
  //stretch: 'horizontal',
  fontSize: '14px',
  fontWeight: '70',
  width: '50%',
  margin: '0px 5px 10px 20px'
}
selectYear.label.style().set
({
  fontSize: '15px',
  fontWeight: '70',
  width: '50%',
  //stretch: 'horizontal',
  margin: '20px 100px 10px 43px'

});

selectYear.slider.style().set(sliderStyle);
selectBand.label.style().set({
   fontSize: '15px',
  fontWeight: '70',
  width: '50%',
  //stretch: 'horizontal',
  margin: '0px 100px 10px 43px'
});
selectBand.selector.style().set({
  stretch: 'horizontal',
  fontSize: '14px',
  fontWeight: '70',
    backgroundColor: '#E0FFFF',
  width: '48%',
  margin: '0px 15px 20px 20px'
});

var checkboxStyle = {
  fontSize: '16px',
  fontWeight: '70',
  margin: '10px',
}

checkBox.roi.style().set(cbRoi);
checkBox.layer.style().set(cbLayer);
controlPanel.style().set({
  backgroundColor: '#E0FFFF',
  width:'350px'
});
mainLabel.style().set({
  fontSize: '20px',
  fontWeight: 'Bold',
    backgroundColor: '#E0FFFF',
  stretch: 'horizontal',
  color: 'grey',
  margin: '10px 100px 0px 140px'
});
var ActiveBtn2 = {
    width: '110px',
  color: '#00BFFF',
  fontSize: '14px',
  fontWeight: '70',
  margin: '10px 5px 10px 38px',
  backgroundColor: '#E0FFFF',
  border:"1px solid rgb(242, 223, 58)"
  
}

var BtnStyle2 = {
  width: '110px',
  color: 'black',
  fontSize: '14px',
  fontWeight: '70',
  margin: '10px 5px 10px 38px',
  backgroundColor: '#E0FFFF',
  border:"1px solid rgb(242, 223, 58)"
   
}
divider1.style().set(dividerStyle);
divider2.style().set(dividerStyle);
divider3.style().set(dividerStyle);
divider4.style().set(dividerStyle);
 waterVapourBtn.style().set(BtnStyle2);
 waterSalinityBtn.style().set(BtnStyle2);
  waterTemperatureBtn.style().set(BtnStyle2);
 EvaporationBtn.style().set(BtnStyle2)
 monthlyRainfallBtn.style().set(BtnStyle2)
 SurfaceWaterBtn.style().set(BtnStyle2);
 
 legend.title.style().set({fontWeight: 'bold', fontSize: '12px', color: '383838'});
legend.title.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'});
legend.colorbar.style().set({stretch: 'horizontal', margin: '0px 8px', maxHeight: '20px'});
legend.leftLabel.style().set({margin: '4px 8px',fontSize: '12px'});
legend.leftLabel.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'});
legend.centerLabel.style().set({margin: '4px 8px',fontSize: '12px', textAlign: 'center',stretch: 'horizontal'});
legend.centerLabel.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'});
legend.rightLabel.style().set({ margin: '4px 8px',fontSize: '12px'});
legend.rightLabel.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'});
legend.panel.style().set({position: 'bottom-left',width: '200px',  padding: '0px'});
legend.panel.style().set({backgroundColor: 'rgba(255, 255, 255, 0.5)'});
legend.labelPanel.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'});
BtnPanel3.style().set({
  margin:"10px 10px 20px 10px",
})
bottomPanel.style().set({
   backgroundColor: '#E0FFFF',
    color: 'grey',
  fontSize: '15px',
  fontWeight:"bold",
  textAlign:"center",
   
})
/*******************************************************************************
 * Behaviors *
 ******************************************************************************/
 var curButton="";
function updateData(Btn)
{
  selectBand.selector.items().reset(Object.keys(currData.info.bands));
  selectBand.selector.setValue(Object.keys(currData.info.bands)[1]);
  curButton=Btn;
  var slider = ui.Slider
  ({
    min: currData.info.startYear,
    max: currData.info.endYear,
    step: 1,
    onChange: updateMap
  });
  slider.style().set(sliderStyle);
middleLayer[0]=slider;
 // middleLayer.remove(selectYear.slider);
  //middleLayer.add(slider);
  //selectYear.slider = slider;
  
  waterVapourBtn.style().set(BtnStyle2);
  waterSalinityBtn.style().set(BtnStyle2);
  EvaporationBtn.style().set(BtnStyle2);
   waterTemperatureBtn.style().set(BtnStyle2);
   if(Btn!=null)
  Btn.style().set(ActiveBtn2);
} 
function updateMap()
{
  var year = selectYear.slider.getValue();
  var curYear=year;
  if(curButton==waterTemperatureBtn)
  curYear=2018;
  else if(curButton==waterSalinityBtn)
  {
    if(year>=2020)
    curYear=2020;
  }
  else if(curButton=waterVapourBtn)
  {
    if(year<=2019)
    curYear=2019;
    if(year==2020)
    curYear=2021;
  }
  var band = selectBand.selector.getValue();
  var img = currData.col.select(currData.info.bands[band].bname).filter(ee.Filter.date(curYear+'-01-01', curYear+'-12-31')).mean().clip(roi);
  
  /*if(boolrightMap === true){
    var imgR = currData.col.select(currData.info.bands[band].bname).first().clip(roi);
    var layer2 = ui.Map.Layer(imgR, currData.info.bands[band].params);
    rightMap.layers().set(0, layer2);
  }*/
  
   var layer = ui.Map.Layer(img, currData.info.bands[band].params, band + ', ' + year);
  currMap.m.layers().set(0, layer);
  
  desc.setValue(currData.info.desc);
  updateLegend();
}
function showRoi()
{
  var layer = ui.Map.Layer(roi, {}, 'Ladakh', false, 0.6);
  map.layers().set(1, layer);
  if(checkBox.roi.getValue()===true){
    map.layers().get(1).setShown(true);
  }else{
    map.layers().get(1).setShown(false);
  }
}
function updateLegend() 
{
  legend.title.setValue(selectBand.selector.getValue());
  var currBand = currData.info.bands[selectBand.selector.getValue()].params;
  legend.colorbar.setParams({bbox: [0, 0, 1, 0.1],dimensions: '100x10',format: 'png', min: 0,max: 1,palette: currBand.palette});
  legend.leftLabel.setValue(currBand.min);
  legend.centerLabel.setValue(currBand.max / 2);
  legend.rightLabel.setValue(currBand.max);
}
function hideLayer()
{
  if(checkBox.layer.getValue()===true)
    {map.layers().get(0).setShown(false);
    map.remove(legend.panel);
    }
  else
    {map.layers().get(0).setShown(true);
    map.add(legend.panel);
    }
}
function updateWaterVapour()
{
    currData.col = waterVapour;
    currData.info = waterVapourImgInfo;
    updateData(waterVapourBtn);
} 
function updateWaterSalinity()
{
    currData.col = waterSalinity;
    currData.info = waterSalinityImgInfo;
    updateData(waterSalinityBtn);
} 
function updateWaterTemperature()
{
    currData.col = waterTemperature;
    currData.info = waterTemperatureImgInfo;
    updateData(waterTemperatureBtn);
} 
function updateEvaporation()
{
    currData.col = monthlyEvaporation;
    currData.info = monthlyEvaporationImgInfo;
    updateData(EvaporationBtn);
} 

var chartPanel='#';
function updateMonthlyRainfall()
{
  updateData();
   var year = selectYear.slider.getValue();
var startDate = ee.Date.fromYMD(year, 1, 1)
var endDate = startDate.advance(1, 'year')
var yearFiltered = monthlyRainfall
  .filter(ee.Filter.date(startDate, endDate))
print(yearFiltered)

var months = ee.List.sequence(1, 12)

var createMonthlyImage = function(month) 
{
  
    var startDate = ee.Date.fromYMD(year, month, 1)
  var endDate = startDate.advance(1, 'month')
  var monthFiltered = yearFiltered
    .filter(ee.Filter.date(startDate, endDate))
  // Calculate total precipitation
  var total = monthFiltered.reduce(ee.Reducer.sum())
  return total.set({
    'system:time_start': startDate.millis(),
    'system:time_end': endDate.millis(),
    'year': year,
    'month': month})
}

// map() the function on the list  of months
// This creates a list with images for each month in the list
var monthlyImages = months.map(createMonthlyImage)
// Create an imagecollection
var monthlyCollection = ee.ImageCollection.fromImages(monthlyImages)

var chart = ui.Chart.image.series({
  imageCollection: monthlyCollection,
  region: roi,
  reducer: ee.Reducer.mean(),
  scale: 5566
}).setOptions({
      lineWidth: 1,
      pointSize: 3,
      title: 'Monthly Rainfall at Ladakh',
      vAxis: {title: 'Rainfall (mm)'},
      hAxis: {title: 'Month', gridlines: {count: 12}}
})

   if(chartPanel=='#' && pieChartPanel=='#')
    {
       monthlyRainfallBtn.style().set(ActiveBtn2);
      chartPanel = ui.Panel(chart);
      chartPanel.style().set({
        width:"50%",
        height:"100%"
      })
      ui.root.remove(map);
      //ui.root.remove(controlPanel);
      ui.root.add(chartPanel);
    
    //map.add(chartPanel);
    ui.util.setTimeout(removeMonthlyRainfall,5000);
    }
}

function removeMonthlyRainfall()
{
 ui.root.remove(chartPanel);
 ui.root.add(map);
 monthlyRainfallBtn.style().set(BtnStyle2);
  chartPanel='#';
}
var pieChartPanel="#";
function updateSurfaceWater()
{
var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = gsw.select('occurrence');
var change = gsw.select("change_abs");
var transition = gsw.select('transition');
var r1=roi.geometry();

function createFeature(transition_class_stats) {
  transition_class_stats = ee.Dictionary(transition_class_stats);
  var class_number = transition_class_stats.get('transition_class_value');
  var result = {
      transition_class_number: class_number,
      transition_class_name: lookup_names.get(class_number),
      transition_class_palette: lookup_palette.get(class_number),
      area_m2: transition_class_stats.get('sum')
  };
  return ee.Feature(null, result);   // Creates a feature without a geometry.
}

function createPieChartSliceDictionary(fc) {
  return ee.List(fc.aggregate_array("transition_class_palette"))
    .map(function(p) { return {'color': p}; }).getInfo();
}

function numToString(num) {
  return ee.Number(num).format();
}

var lookup_names = ee.Dictionary.fromLists(
    ee.List(gsw.get('transition_class_values')).map(numToString),
    gsw.get('transition_class_names')
);

var lookup_palette = ee.Dictionary.fromLists(
    ee.List(gsw.get('transition_class_values')).map(numToString),
    gsw.get('transition_class_palette')
);

var water_mask = occurrence.gt(90).mask(1);



var area_image_with_transition_class = ee.Image.pixelArea().addBands(transition);
var reduction_results = area_image_with_transition_class.reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1,
    groupName: 'transition_class_value',
  }),
    bestEffort: true,
  geometry: r1,
  maxPixels:10000,
  scale: 30,
});

var roi_stats = ee.List(reduction_results.get('groups'));

var transition_fc = ee.FeatureCollection(roi_stats.map(createFeature));
var transition_summary_chart = ui.Chart.feature.byFeature({
    features: transition_fc,
    xProperty: 'transition_class_name',
    yProperties: ['area_m2', 'transition_class_number']
  })
  .setChartType('PieChart')
  .setOptions({
    title: 'Summary of transition class areas',
    slices: createPieChartSliceDictionary(transition_fc),
    sliceVisibilityThreshold: 0  
  });

if(pieChartPanel==='#' && chartPanel=='#')
 {
  
   ui.root.remove(map);
   pieChartPanel = ui.Panel(transition_summary_chart);
   pieChartPanel.style().set({
     stretch:"both",
   })
   SurfaceWaterBtn.style().set(ActiveBtn2);
  ui.root.add(pieChartPanel);
   ui.util.setTimeout(removePieChartPanel,5000);
 


map.centerObject(roi, 7.3);
map.addLayer({
  eeObject: water_mask,
  visParams: VIS_WATER_MASK,
  name: '90% occurrence water mask',
  shown: false
});
map.addLayer({
  eeObject: occurrence.updateMask(occurrence.divide(100)),
  name: "Water Occurrence (1984-2022)",
  visParams: VIS_OCCURRENCE,
  shown: false
});
map.addLayer({
  eeObject: change,
  visParams: VIS_CHANGE,
  name: 'occurrence change intensity',
  shown: false
});
map.addLayer({
  eeObject: transition,
  name: 'Transition classes (1984-2022)',
});
}

}
function removePieChartPanel()
{
 // map.remove(chartPanel);
 ui.root.remove(pieChartPanel);
 ui.root.add(map);
 SurfaceWaterBtn.style().set(BtnStyle2);
  pieChartPanel='#';
}


/*******************************************************************************
 * Initialize *
 ******************************************************************************/
currMap.m.centerObject(roi, 7.3);
updateMap();