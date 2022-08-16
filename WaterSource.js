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
var mr=ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD");
var runOff = ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE")
var monthlyEvaporation = runOff;
var monthlyRainfall=ee.ImageCollection("ECMWF/ERA5/DAILY");
var evapoTranspiration=ee.ImageCollection("CAS/IGSNRR/PML/V2_v017");
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

var runOffImgInfo = 
{
  startYear: 1983,
  endYear: 2021,
  desc: "TerraClimate is a dataset of monthly climate and climatic water balance for global terrestrial surfaces",
  bands: {
    "RunOff": {//mm
        bname: "ro",
        unit:"mm",
        params: {min:0, max:30, palette: [
    '1a3678', '2955bc', '5699ff', '8dbae9', 'acd1ff', 'caebff', 'e5f9ff',
    'fdffb4', 'ffe6a2', 'ffc969', 'ffa12d', 'ff7c1f', 'ca531a', 'ff0000',
    'ab0000'
  ],}
    },
    "Soil Moisture": {//mm
        bname: "soil",
        unit:"mm",
        params: {min:200, max:800, palette: [
    '1a3678', '2955bc', '5699ff', '8dbae9', 'acd1ff', 'caebff', 'e5f9ff',
    'fdffb4', 'ffe6a2', 'ffc969', 'ffa12d', 'ff7c1f', 'ca531a', 'ff0000',
    'ab0000'
  ],scale:0.1}
    },
    "Soil Water Equivalent": {//mm
        bname: "swe",
        unit:"mm",
        params: {min:0, max:4000, palette: [
    '1a3678', '2955bc', '5699ff', '8dbae9', 'acd1ff', 'caebff', 'e5f9ff',
    'fdffb4', 'ffe6a2', 'ffc969', 'ffa12d', 'ff7c1f', 'ca531a', 'ff0000',
    'ab0000'
  ],}
    },
    
   
  }
};
var monthlyRainfallImgInfo = 
{
  startYear: 1983,
  endYear: 2020,
  desc: "OLCI is one of the instruments in the ESA/EUMETSAT Sentinel-3 mission for measuring sea-surface topography, sea- and land-surface temperature, ocean color and land color with high-end accuracy and reliability ",
  bands: {
    "Total Precipitation": {//m
        bname: "total_precipitation",
        unit:"m",
        params: {min:0, max:0.003,palette: ['#FFFFFF', '#00FFFF', '#0080FF', '#DA00FF', '#FFA400', '#FF0000']}
    },
        "Surface Pressure": {//pa
        bname: "surface_pressure",
        unit:"pa",
        params: {min:55000, max:75000,palette: [
    '#01FFFF', '#058BFF', '#0600FF', '#DF00FF', '#FF00FF', '#FF8C00', '#FF8C00'
  ]}
    },
        "Sea level Pressure": {//pa
        bname: "mean_sea_level_pressure",
        unit:"pa",
        params: {min:102000, max:103000, palette: [
    '#01FFFF', '#058BFF', '#0600FF', '#DF00FF', '#FF00FF', '#FF8C00', '#FF8C00'
  ]}
    },
   
    
  }
};

 
    var evapoTranspirationImgInfo =
{
  startYear: 2002,
  endYear: 2020,
  desc: "The (PML_V2) dataset estimates transpiration from vegetation, direct evaporation from the soil and vaporization of intercepted rainfall from vegetation",
  bands: 
  {
     
    
    "Gross Primary Product": {//gC m-2 d-1
      bname: "GPP",
      unit:"gC m-2 d-1",
      params: {min:0, max:2,palette: [
    'a50026', 'd73027', 'f46d43', 'fdae61', 'fee08b', 'ffffbf',
    'd9ef8b', 'a6d96a', '66bd63', '1a9850', '006837',
  ]}
    },
    "Vegetation Transpiration": {	//mm d-1
      bname: "Ec",
      unit:"mm d-1",
      params: {min:0, max:0.5,palette: [
    'a50026', 'd73027', 'f46d43', 'fdae61', 'fee08b', 'ffffbf',
    'd9ef8b', 'a6d96a', '66bd63', '1a9850', '006837',
  ]}
    },
    "Soil Evaporation": {//	mm d-1
      bname: "Es",
      unit:"mm d-1",
      params: {min:0, max:2,palette: [
    'a50026', 'd73027', 'f46d43', 'fdae61', 'fee08b', 'ffffbf',
    'd9ef8b', 'a6d96a', '66bd63', '1a9850', '006837',
  ]}
    },
    "Water Evaporation": {//mm d-1
      bname: "GPP",
      unit:"mm d-1",
      params: {min:0, max:2,palette: [
    'a50026', 'd73027', 'f46d43', 'fdae61', 'fee08b', 'ffffbf',
    'd9ef8b', 'a6d96a', '66bd63', '1a9850', '006837',
  ]}
    },
   
   
  }
    
};

var monthlyEvaporationImgInfo = 
{
  startYear: 1983,
  endYear: 2021,
  desc: "TerraClimate is a dataset of monthly climate and climatic water balance for global terrestrial surfaces",
  bands: {
    "Vapour Pressure": {//kpa
        bname: "swe",
        unit:"kpa",
        params: {min:50, max:4749, palette: [
    '1a3678', '2955bc', '5699ff', '8dbae9', 'acd1ff', 'caebff', 'e5f9ff',
    'fdffb4', 'ffe6a2', 'ffc969', 'ffa12d', 'ff7c1f', 'ca531a', 'ff0000',
    'ab0000'
  ],scale:0.001}
    },
    "Vapour Pressure Deficit": {//kpa
        bname: "vpd",
        unit:"kpa",
        params: {min:0, max:113, palette: [
    '1a3678', '2955bc', '5699ff', '8dbae9', 'acd1ff', 'caebff', 'e5f9ff',
    'fdffb4', 'ffe6a2', 'ffc969', 'ffa12d', 'ff7c1f', 'ca531a', 'ff0000',
    'ab0000'
  ],scale:0.1}
    },
    "Climate Water Deficit": {//mm
        bname: "def",
        unit:"mm",
        params: {min:0, max:400, palette: [
    '1a3678', '2955bc', '5699ff', '8dbae9', 'acd1ff', 'caebff', 'e5f9ff',
    'fdffb4', 'ffe6a2', 'ffc969', 'ffa12d', 'ff7c1f', 'ca531a', 'ff0000',
    'ab0000'
  ],}
    },
     
   
  }
}



 var currData =
 {
 
   
  col: evapoTranspiration,
  info:  evapoTranspirationImgInfo
  
}

var currMap = {};
 var curButton;



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



var selectBand = {}
var checkBox={};

checkBox.roi=ui.Checkbox('Show Region of Interest',false,showRoi);


selectYear.panel = ui.Panel({
  widgets:[selectYear.slider],
   layout: ui.Panel.Layout.flow('horizontal'),
})
var labelPanel=ui.Panel({
    widgets:[selectYear.label,selectYear.slider],
   layout: ui.Panel.Layout.flow('vertical'),
})

var roiPanel=ui.Panel({
  widgets:[checkBox.roi],
   layout: ui.Panel.Layout.flow('vertical'),
})
labelPanel.style().set({
  width: '50%',
})
roiPanel.style().set({
  width: '50%',
})
var topMiddlePanel=ui.Panel({
  widgets:[labelPanel,roiPanel],
   layout: ui.Panel.Layout.flow('horizontal'),
})
selectBand.label = ui.Label('Select Band');
selectBand.selector = ui.Select(Object.keys(currData.info.bands), null, Object.keys(currData.info.bands)[2], updateMap);
selectBand.panel = ui.Panel([ selectBand.label]);
var desc = ui.Label({ value: currData.info.desc,style: {
  //margin: '0px 0px 0px 0px',
    color: 'grey',
    width:'96%',
    BackgroundColor:'white',
  fontSize: '15px',
  fontWeight:"bold",
  textAlign:"center",
  
}
});
var runOffBtn = ui.Button('RunOff',updateRunOff); 
var waterSalinityBtn = ui.Button('Water Salinity',updateWaterSalinity);
var EvaporationBtn = ui.Button('Water Vapour',updateEvaporation);
var monthlyRainfallBtn = ui.Button('Monthly Rainfall',updateMonthlyRainfall);
var SurfaceWaterBtn = ui.Button('Surface Water',updateSurfaceWater);
var evapoTranspirationBtn = ui.Button('Evapotranspiration',updateEvapoTranspiration);
var clearAll=ui.Button('Clear All Layers',clearAllLayers);

 var rightMapSelectBand = {}

var BtnPanel1 = ui.Panel
({
  widgets: [monthlyRainfallBtn,runOffBtn],
  layout: ui.Panel.Layout.flow('horizontal'),
});
var BtnPanel2 = ui.Panel
({
  widgets: [EvaporationBtn, evapoTranspirationBtn],
  layout: ui.Panel.Layout.flow('horizontal'),
});


var BtnPanel3 = ui.Panel
({
  widgets: [clearAll],
  layout: ui.Panel.Layout.flow('horizontal'),
});

//selectBand.panel.add(checkBox.roi);

var bandPanel=ui.Panel(
  {
      widgets: [selectBand.selector,SurfaceWaterBtn],
  layout: ui.Panel.Layout.flow('horizontal'),
  })
  var middleLayer=ui.Panel(
  {
    widgets:[selectYear.slider],
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

var chart = {};
chart.shownButton = ui.Button('Hide chart');
chart.container = ui.Panel();  // will hold the dynamically generated chart. 
chart.chartPanel = ui.Panel([chart.shownButton, chart.container]);

var bottomPanel = ui.Label({ value: "Earth Engine App to Visualize important parameters related to Water near the region of Ladakh",style: {margin: '10px', fontSize: '16px',  fontWeight: '70'}
});
// var rightMapSelectYear = {}
// rightMapSelectYear.label = ui.Label('Select Date');
// rightMapSelectYear.dateSlider = ui.DateSlider({
//   start: ee.Date(currData.info.startYear),  
//   end: ee.Date(Date.now()),
//   period: 365,
//   onChange: updateRightMap
// });
// var rightMapPanel = ui.Panel([rightMapSelectYear.label, rightMapSelectYear.dateSlider]);

// rightMapPanel.style().set({position: 'top-right'});
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
controlPanel.add(topMiddlePanel);
//controlPanel.add(labelPanel);
//controlPanel.add(selectYear.panel);//along with show roi
//controlPanel.add(middleLayer);
controlPanel.add(selectBand.panel);
controlPanel.add(bandPanel);//along with hide current layer

//controlPanel.add(checkBox.panel);
controlPanel.add(divider4);//done
controlPanel.add(BtnPanel3);//clear all
controlPanel.add(bottomPanel);
map.add(legend.panel);
map.add(chart.chartPanel);
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


var cbLayer=
{
  width: '100px',
  color: 'black',
    fontSize: '15px',
  fontWeight: '70',
  margin: '0px 10px 20px 0px',
}


// rightMapSelectYear.label.style().set({
//   fontSize: '16px',
//   fontWeight: '70',
//   width: '100px',
//   stretch: 'horizontal',
//   margin: '10px 0px 0px 0px'
// });
// rightMapSelectYear.dateSlider.style().set({
//   fontSize: '16px',
//   fontWeight: '70',
//   width: '100px',
//   stretch: 'horizontal',
//   margin: '10px 0px 5px 0px'
// });
selectYear.label.style().set
({
  fontSize: '15px',
  fontWeight: '70',
  width: '90%',
  //stretch: 'horizontal',
  margin: '23px 100px 10px 40px'

});
var cbRoi=
{
 
  width: '50%',
  color: 'black',
    fontSize: '15px',
  fontWeight: '70',
  margin: '20px 40px 0px 20px',

}
var sliderStyle = 
{
  //stretch: 'horizontal',
  fontSize: '15px',
  fontWeight: '70',
  width: '80%',
  margin: '0px 15px 20px 20px'
}

selectYear.slider.style().set(sliderStyle);
selectBand.label.style().set({
   fontSize: '15px',
  fontWeight: '70',
  width: '45%',
  //stretch: 'horizontal',
  margin: '0px 100px 10px 40px'
});
selectBand.selector.style().set({
  stretch: 'horizontal',
  fontSize: '14px',
  fontWeight: '70',
    backgroundColor: '#E0FFFF',
  width: '45%',
  margin: '0px 15px 20px 20px'
});

var checkboxStyle = {
  fontSize: '16px',
  fontWeight: '70',
  margin: '10px',
}

checkBox.roi.style().set(cbRoi);

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
  //backgroundColor: '#E0FFFF',
 // border:"1px solid rgb(242, 223, 58)"
  
}


var BtnStyle2 = {
  width: '110px',
  color: 'black',
  fontSize: '14px',
  fontWeight: '70',
  margin: '10px 5px 10px 38px',
  //backgroundColor: '#E0FFFF',

   
}

var clearAllStyle={
  width: '50%',
  color: 'black',
  fontSize: '14px',
  fontWeight: '70',
  margin: '10px 5px 10px 22%',
  backgroundColor: '#E0FFFF',
}
clearAll.style().set(clearAllStyle);
var surfaceWater = {
  width: '120px',
  color: 'black',
  fontSize: '14px',
  fontWeight: '70',
  margin: '0px 5px 20px 0px',
  backgroundColor: '#E0FFFF',

   
}
var ActiveSurfaceWater = {
  width: '120px',
  color: '#00BFFF',
  fontSize: '14px',
  fontWeight: '70',
  margin: '0px 5px 20px 0px',
   backgroundColor: '#E0FFFF',
  //border:"1px solid rgb(242, 223, 58)"

   
}
SurfaceWaterBtn.style().set(surfaceWater);
divider1.style().set(dividerStyle);
divider2.style().set(dividerStyle);
divider3.style().set(dividerStyle);
divider4.style().set(dividerStyle);
 //waterVapourBtn.style().set(BtnStyle2);
 runOffBtn.style().set(BtnStyle2);
 waterSalinityBtn.style().set(BtnStyle2);
  evapoTranspirationBtn.style().set(BtnStyle2);
 EvaporationBtn.style().set(BtnStyle2)
 monthlyRainfallBtn.style().set(BtnStyle2)

 
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
  BackgroundColor:"#E0FFFF",
})
bottomPanel.style().set({
   backgroundColor: 'white',
   width:'96%',
    color: 'grey',
  fontSize: '15px',
  fontWeight:"bold",
  textAlign:"center",
   
})

chart.chartPanel.style().set({
  width: '40%',
  position: 'bottom-right',
  shown: true
});
chart.chartPanel.style().set({backgroundColor: 'rgba(255, 255, 255, 0.5)'});
chart.container.style().set({
  stretch: 'horizontal'
})
chart.shownButton.style().set({
  margin: '0px 0px',
});
/*******************************************************************************
 * Behaviors *
 ******************************************************************************/

 
 var l=1;
 var y;
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
   labelPanel.remove(selectYear.slider);
   labelPanel.add(slider);
   selectYear.slider = slider;
middleLayer[0]=slider;
curButton=Btn;
Btn.style().set(ActiveBtn2);
   ui.util.setTimeout(changeFunction,1500);
} 

function showHideChart() 
{
  var shown = true;
  var label = 'Hide chart';
  if (chart.shownButton.getLabel() == 'Hide chart') {
    shown = false;
    label = 'Show chart';
  }
  chart.container.style().set({shown: shown});
  chart.shownButton.setLabel(label);
}
chart.shownButton.onClick(showHideChart);


function changeFunction()
{
  
  curButton.style().set(BtnStyle2);
}


function updateMap(x)
{
  
  var year = selectYear.slider.getValue();
  var val=year;
   var curYear=year;
   var curMonth="01";
   var curDay="01";
  
  if(currData.col === monthlyRainfall){
    drawChart();
  }
  //print(ee.Date(val));
  
  

    // print(curYear);
    // print(curMonth);
  

  var band = selectBand.selector.getValue();
  var img;
  var img = currData.col.select(currData.info.bands[band].bname).filter(ee.Filter.date(curYear+'-'+curMonth+'-01', curYear+'-'+curMonth+'-28')).mean().clip(roi);

  
  /*if(boolrightMap === true){
    var imgR = currData.col.select(currData.info.bands[band].bname).first().clip(roi);
    var layer2 = ui.Map.Layer(imgR, currData.info.bands[band].params);
    rightMap.layers().set(0, layer2);
  }*/
   var layer = ui.Map.Layer(img, currData.info.bands[band].params, band + ', ' + year);
  
    var found=0;
   var x=currMap.m.layers();
  for(var i=0;i<x.length();i++)
  {
    if(x.get(i).get("name")==layer.get("name"))
    found=1;
  }
  if(found==0)
  {
    currMap.m.layers().set(l, layer);
 x=currMap.m.layers();
  l++;
  }
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
  legend.title.setValue(selectBand.selector.getValue() + ' (' + currData.info.bands[selectBand.selector.getValue()].unit + ')');
  var currBand = currData.info.bands[selectBand.selector.getValue()].params;
  legend.colorbar.setParams({bbox: [0, 0, 1, 0.1],dimensions: '100x10',format: 'png', min: 0,max: 1,palette: currBand.palette});
  legend.leftLabel.setValue(currBand.min);
 
  var x=currBand.max;
  var y=currBand.min;
  

  legend.centerLabel.setValue((x+y)/2);
  legend.rightLabel.setValue(currBand.max);
}

function updateRunOff()
{
    currData.col =runOff;
    currData.info = runOffImgInfo;
    updateData(runOffBtn);
} 
function updateWaterSalinity()
{
    currData.col = waterSalinity;
    currData.info = waterSalinityImgInfo;
    updateData(waterSalinityBtn);
} 
function updateEvapoTranspiration()
{
    currData.col = evapoTranspiration;
    currData.info = evapoTranspirationImgInfo;
    updateData(evapoTranspirationBtn);
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
   currData.col = monthlyRainfall;
    currData.info = monthlyRainfallImgInfo;
  updateData(monthlyRainfallBtn);
  drawChart();
}

function removeMonthlyRainfall()
{
 ui.root.remove(chartPanel);
 ui.root.add(map);
 monthlyRainfallBtn.style().set(BtnStyle2);
  chartPanel='#';
}

var pieChartPanel="#";
function changeSurfaceStyle()
{
   SurfaceWaterBtn.style().set(surfaceWater);
}
function updateSurfaceWater()
{
  

var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = gsw.select('occurrence');
var change = gsw.select("change_abs");
var transition = gsw.select('transition');
var r1=roi.geometry();

function createFeature(transition_class_stats) 
{
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


   pieChartPanel = ui.Panel(transition_summary_chart);
   pieChartPanel.style().set({
     stretch:"both",
   })
   SurfaceWaterBtn.style().set(ActiveSurfaceWater);
 
  //chart.container.add(transition_summary_chart);
 
  chart.container.widgets().reset([transition_summary_chart]);

currMap.m.centerObject(roi, 7.3);
   var layer = ui.Map.Layer( water_mask, VIS_WATER_MASK,  '90% occurrence water mask',false);
   var found=0;
   var x=currMap.m.layers();
  for(var i=0;i<x.length();i++)
  {
    if(x.get(i).get("name")==layer.get("name"))
    found=1;
  }
  if(found==0)
  {
    
    currMap.m.layers().set(l, layer);
 x=currMap.m.layers();
   
  l++;
  }
  found=0;
  layer = ui.Map.Layer( occurrence.updateMask(occurrence.divide(100)),VIS_OCCURRENCE, "Water Occurrence (1984-2022)",true);
   for( i=0;i<x.length();i++)
  {
     if(x.get(i).get("name")==layer.get("name"))
    found=1;
  }
  if(!found)
  {
    currMap.m.layers().set(l, layer);
  l++;
  }
  found=0;
   layer = ui.Map.Layer( change,VIS_CHANGE,  'occurrence change intensity',true);
 for( i=0;i<x.length();i++)
  {
     if(x.get(i).get("name")==layer.get("name"))
    found=1;
  }
  if(!found)
  {
    currMap.m.layers().set(l, layer);
  l++;
  }
  found=0;
  layer = ui.Map.Layer( {
    eeObject: transition,
  name: 'Transition classes (1984-2022)'});
   for( i=0;i<x.length();i++)
  {
     if(x.get(i).get("name")==layer.get("name"))
    found=1;
  }
  if(!found)
  {
    currMap.m.layers().set(l, layer);
   
  l++;
  }
 

    SurfaceWaterBtn.style().set(ActiveSurfaceWater);
  ui.util.setTimeout(changeSurfaceStyle,2000);
}
function removePieChartPanel()
{
 // map.remove(chartPanel);
 ui.root.remove(pieChartPanel);
 ui.root.add(map);
 SurfaceWaterBtn.style().set(surfaceWater);
  pieChartPanel='#';
}
function clearAllLayers()
{
   currMap.m.clear();
     currMap.m.add(legend.panel);
     currMap.m.add(chart.chartPanel);
   currMap.m.centerObject(roi, 7.3);
   var layer = ui.Map.Layer(roi, {}, 'Ladakh', false, 0.6);
   currMap.m.layers().set(0, layer);
   currMap.m.layers().get(0).setShown(true);
   runOffBtn.style().set(BtnStyle2);
   evapoTranspirationBtn.style().set(BtnStyle2);
   monthlyRainfallBtn.style().set(BtnStyle2);
   SurfaceWaterBtn.style().set(surfaceWater);
    EvaporationBtn.style().set(BtnStyle2);
   
   chart.container.widgets().reset([]);
   l = 1;
}

function drawChart()
{
   var year = selectYear.slider.getValue();
  var startDate = ee.Date.fromYMD(year, 1, 1)
  var endDate = startDate.advance(1, 'year')
  var yearFiltered = mr.filter(ee.Filter.date(startDate, endDate))
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
  
  var chart2 = ui.Chart.image.series({
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
  chart.container.widgets().reset([chart2]);
}


/*******************************************************************************
 * Initialize *
 ******************************************************************************/
currMap.m.centerObject(roi, 7.3);
updateMap();
