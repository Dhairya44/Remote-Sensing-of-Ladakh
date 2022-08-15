/*
ToDo:
Chart
MinMax Reducer
TimeSeries
*/

/*******************************************************************************
 * Model *
 ******************************************************************************/

 var roi = ee.Feature(ee.FeatureCollection("users/dhairyaagrawal/StatesIndiaViz").toList(135).get(131));

 var sentinelNo2 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2");
 var sentinelSo2 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_SO2");
 var cloudCover = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CLOUD');
 var climate = ee.ImageCollection("ECMWF/ERA5/MONTHLY");
 var ozone = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_O3");
 var sentinelCo = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO");
 
 var no2ImgInfo = {
   startYear: 2018,
   endYear: 2022,
   desc: "Sentinel-5P NO2, This dataset provides near real-time high-resolution imagery of NO2 concentrations.",
   bands: {
     "Column Number Density": {
         bname: "NO2_column_number_density",
         color: 'b4e7b0',
         unit: 'mol/m^2',
         params: {min:0, max: 0.00015, palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
         
         }
     },
     "Tropospheric Col. No. Density": {
         bname: "tropospheric_NO2_column_number_density",
         color: 'd2cdc0',
         unit: 'mol/m^2',
         params: {min:0, max: 0.00005, palette: ['eff3ff', 'bdd7e7', '6baed6', '3182bd', '08519c']}
     },
     "Stratospheric Col. No. Density": {
         bname: "stratospheric_NO2_column_number_density",
         color: 'ca9146',
         unit: 'mol/m^2',
         params: {min: 0, max: 0.00005, palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']}
     },
     "Cloud Fraction": {
         bname: "cloud_fraction",
         color: '85c77e',
         unit: 'fraction',
         params: {min: 0, max: 0.5, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
     }
   }
 };
 
 var so2ImgInfo = {
   startYear: 2018,
   endYear: 2022,
   desc: "Sentinel-5P SO2, This dataset provides near real-time high-resolution imagery of atmospheric sulfur dioxide (SO2) concentrations.",
   bands: {
     "Column Number Density": {
       bname: "SO2_column_number_density",
       color: "b4e7b0",
       unit: 'mol/m^2',
       params: {min:0, max: 0.00006, palette: ['5E4FA2','3288BD','66C2A5','ABE0A4','E6F598','D53E4F','9E0142']}
     },
     "Air Mass Factor": {
       bname: "SO2_column_number_density_amf",
       color: 'd2cdc0',
       unit: 'mol/m^2',
       params: {min:0.1, max:3.387, palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']}
     },
     "Cloud Fraction": {
       bname: "cloud_fraction",
       color: '85c77e',
       unit: 'fraction',
       params: {min: 0, max: 0.5, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
     }
   }
 };
 
 var ccImgInfo = {
   startYear: 2018,
   endYear: 2022,
   desc: "Sentinel-5P Cloud, This dataset provides near real-time high-resolution imagery of cloud parameters.",
   bands: {
     "Cloud Fraction": {
       bname: "cloud_fraction",
       color: 'd4e7b0',
       unit: 'fraction',
       params: {min:0, max:0.5, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
     },
     "Cloud Top Height": {
       bname: 'cloud_top_height',
       color: 'd2cdc0',
       unit: 'm',
       params: {min:9, max: 7000,palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']}
     },
     "Cloud Base Height": {
       bname: 'cloud_base_height',
       color: 'ca9146',
       unit: 'm',
       params: {min:9,max: 7000,palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']}
     },
     "Cloud Top Pressure": {
       bname: 'cloud_top_pressure',
       color: '85c77e',
       unit: 'Pa',
       params: {min:12109, max:101299, palette: ['eff3ff', 'bdd7e7', '6baed6', '3182bd', '08519c']}
     },
     "Cloud Base Pressure": {
       bname: 'cloud_base_pressure',
       color: 'fbf65d',
       unit: 'Pa',
       params: {min:12109, max:101299, palette: ['edf8e9', 'bae4b3', '74c476', '31a354', '006d2c']}
     }
   }
 }
 
 var climateInfo = {
   startYear: 1979,
   endYear: 2020,
   desc: "ERA5 Monthly Aggregates, provides aggregated values for each month for seven ERA5 climate reanalysis parameters.",
   bands: {
     "Mean Air Temp": {
       bname: "mean_2m_air_temperature",
       color: 'd4e7b0',
       unit: 'K',
       params: {min: 224, max: 304, palette: ['eff3ff', 'bdd7e7', '6baed6', '3182bd', '08519c']}
       
     },
     "Minimum Air Temp": {
       bname: "minimum_2m_air_temperature",
       color: 'd2cdc0',
       unit: 'K',
       params: {min:213, max: 299, palette: ['edf8e9', 'bae4b3', '74c476', '31a354', '006d2c']}
     },
     "Maximum Air Temp": {
       bname: "maximum_2m_air_temperature",
       color: 'ca9146',
       unit: 'K',
       params: {min:233, max:314, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
     },
     "Dewpoint Temp": {
       bname: "dewpoint_2m_temperature",
       color: '85c77e',
       unit: 'K',
       params: {min:219, max:297, palette: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000']}
     },
     "Total Precipitation": {
       bname: "total_precipitation",
       color: 'fbf65d',
       unit: 'm',
       params: {min: 0, max: 0.2, palette: ["#4000FF","#0080FF","#00FF80","#FFDA00","#FFA400","#FF2500"]}
     },
     "Surface Pressure": {
       bname: "surface_pressure",
       color: '38814e',
       unit: 'Pa',
       params: {min:50000, max:78427, palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']}
     }
   }
 }
 
 var ozoneInfo = {
   startYear: 2018,
   endYear: 2022,
   desc: "Sentinel-5P O3, This dataset provides near-real-time high-resolution imagery of total column ozone concentrations.",
   bands: {
     "Column Number Density": {
       bname: "O3_column_number_density",
       color: "d4e7b0",
       unit: 'mol/m^2',
       params: {min: 0.12, max: 0.15, palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']}
     },
     "Air Mass Factor": {
       bname: "O3_column_number_density_amf",
       color: '38814e',
       unit: 'mol/m^2',
       params: {min:1.92, max:6.83, palette: ['lightyellow', 'steelblue', 'darkblue']}
     },
     "Effective Temperature": {
       bname: "O3_effective_temperature",
       color: 'fbf65d',
       unit: 'K',
       params: {min: -5962, max: 936, palette: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000']}
     },
     "Cloud Fraction": {
       bname: "cloud_fraction",
       color: 'd2cdc0',
       unit: 'fraction',
       params: {min:0, max:0.5, palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']}
     },
   }
 }
 
 var coImgInfo = {
   startYear: 2018,
   endYear: 2022,
   desc: "Sentinel-5P CO, This dataset provides near real-time high-resolution imagery of CO concentrations.",
   bands: {
     "Column Number Density": {
       bname: "CO_column_number_density",
       color: 'd2cdc0',
       params: {min: 0,max: 0.05,palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']}
     },
     "Water Vapour Column": {
       bname: "H2O_column_number_density",
       color: 'fbf65d',
       params: {min: -4653600, max:3.45844e+06, palette: ['lightyellow', 'steelblue', 'darkblue']}
     },
     "Cloud Height": {
       bname: 'cloud_height',
       color: '38814e',
       params: {min: -8341, max: 5000, palette: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000']}
     }
   }
 }
 
 var currData = {
   col: climate,
   info: climateInfo
 }
 
 var currMap = {};
 
 /*******************************************************************************
  * Components *
  ******************************************************************************/
  
 var controlPanel = ui.Panel();
 var map = ui.Map();
 var mainLabel = ui.Label('Atmosphere');
 var divider1 = ui.Panel();
 var divider2 = ui.Panel();
 var divider3 = ui.Panel();
 
 currMap.m = map;
 
 var selectYear = {}
 selectYear.label = ui.Label('Select Year');
 selectYear.slider = ui.Slider({
   min: currData.info.startYear,  
   max: currData.info.endYear,    
   step: 1,
   onChange: updateMap
 });
 selectYear.panel = ui.Panel([selectYear.label, selectYear.slider]);
 
 var selectBand = {}
 selectBand.label = ui.Label('Select Band');
 selectBand.selector = ui.Select(Object.keys(currData.info.bands), null, Object.keys(currData.info.bands)[1], updateMap);
 selectBand.panel = ui.Panel([selectBand.label, selectBand.selector]);
 
 var desc = ui.Label({
   value: currData.info.desc,
   style: {margin: '10px', fontSize: '16px',  fontWeight: '70',}
 });
 
 var no2Btn = ui.Button('NO2', updateNo2); 
 var so2Btn = ui.Button('SO2', updateSo2);
 var ccBtn = ui.Button('Cloud Cover', updateCc);
 var climateBtn = ui.Button('Climate', updateClimate);
 var ozoneBtn = ui.Button('Ozone', updateOzone);
 var coBtn = ui.Button('CO', updateCo);
 
 var BtnPanel1 = ui.Panel({
   widgets: [climateBtn, ccBtn],
   layout: ui.Panel.Layout.flow('horizontal'),
 });
 
 var BtnPanel2 = ui.Panel({
   widgets: [no2Btn, so2Btn],
   layout: ui.Panel.Layout.flow('horizontal'),
 });
 
 var BtnPanel3 = ui.Panel({
   widgets: [ozoneBtn, coBtn],
   layout: ui.Panel.Layout.flow('horizontal'),
 });
 
 var fixed = {};
 fixed.lat = 34.76;
 fixed.lon = 77.14;
 
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
 
 var currLegend = legend;
 
 var legend2 = {}
 legend2.title = ui.Label();
 legend2.colorbar = ui.Thumbnail(ee.Image.pixelLonLat().select(0));
 legend2.leftLabel = ui.Label('[min]');
 legend2.centerLabel = ui.Label();
 legend2.rightLabel = ui.Label('[max]');
 legend2.labelPanel = ui.Panel({
   widgets: [legend2.leftLabel,legend2.centerLabel,legend2.rightLabel],
   layout: ui.Panel.Layout.flow('horizontal')
 });
 legend2.panel = ui.Panel([legend2.title, legend2.colorbar, legend2.labelPanel]);
 
 var legend3 = {}
 legend3.title = ui.Label();
 legend3.colorbar = ui.Thumbnail(ee.Image.pixelLonLat().select(0));
 legend3.leftLabel = ui.Label('[min]');
 legend3.centerLabel = ui.Label();
 legend3.rightLabel = ui.Label('[max]');
 legend3.labelPanel = ui.Panel({
   widgets: [legend3.leftLabel,legend3.centerLabel,legend3.rightLabel],
   layout: ui.Panel.Layout.flow('horizontal')
 });
 legend3.panel = ui.Panel([legend3.title, legend3.colorbar, legend3.labelPanel]);
 
 var rightMapSelectYear = {}
 rightMapSelectYear.label = ui.Label('Select Year');
 rightMapSelectYear.slider = ui.Slider({
   min: currData.info.startYear,  
   max: currData.info.endYear,    
   step: 1,
   onChange: updateRightMap
 });
 rightMapSelectYear.panel = ui.Panel([rightMapSelectYear.label, rightMapSelectYear.slider]);
 
 var rightMapSelectBand = {}
 rightMapSelectBand.label = ui.Label('Select Band');
 rightMapSelectBand.selector = ui.Select(Object.keys(currData.info.bands), null, Object.keys(currData.info.bands)[1], updateRightMap);
 rightMapSelectBand.panel = ui.Panel([rightMapSelectBand.label, rightMapSelectBand.selector]);
 
 
 var rightMapPanel = ui.Panel({
   widgets: [rightMapSelectYear.panel, rightMapSelectBand.panel]
 })
 
 var checkboxSplitPanel = ui.Checkbox('Split Panel', false, showSplitPanel);
 var clearLayers = ui.Button('Clear All Layers', clearLay);
 /*******************************************************************************
  * Composition *
  ******************************************************************************/
 
 controlPanel.add(mainLabel);
 controlPanel.add(divider1);
 controlPanel.add(desc);
 controlPanel.add(divider2);
 controlPanel.add(BtnPanel1);
 controlPanel.add(BtnPanel2);
 controlPanel.add(BtnPanel3);
 controlPanel.add(divider3);
 controlPanel.add(selectYear.panel);
 controlPanel.add(selectBand.panel);
 controlPanel.add(checkboxSplitPanel);
 controlPanel.add(clearLayers);
 
 ui.root.clear();
 ui.root.add(controlPanel);
 ui.root.add(map);
 
 /*******************************************************************************
  * Styling *
  ******************************************************************************/
  
 var ActiveBtn = {
   width: '100px',
   color: 'red',
   fontSize: '14px',
   fontWeight: '70',
   margin: '10px 5px 10px 38px',
   backgroundColor: 'rgba(255, 255, 255, 0)'
 }
 
 var BtnStyle = {
   width: '100px',
   color: 'black',
   fontSize: '14px',
   fontWeight: '70',
   margin: '10px 5px 10px 38px',
   backgroundColor: 'rgba(255, 255, 255, 0)'
 }
 
 controlPanel.style().set({
   backgroundColor: 'white',
   width:'325px'
 });
 
 var dividerStyle = {
   backgroundColor: 'grey',
   height:'4px',
   margin: '15px 0px 15px 0px'
 }
 
 divider1.style().set(dividerStyle);
 divider2.style().set(dividerStyle);
 divider3.style().set(dividerStyle);
 
 mainLabel.style().set({
   fontSize: '20px',
   fontWeight: 'Bold',
   stretch: 'horizontal',
   color: 'grey',
   margin: '10px 100px 0px 100px'
 });
 
 var sliderStyle = {
   stretch: 'horizontal',
   fontSize: '14px',
   fontWeight: '70',
   width: '200px',
   margin: '0px 65px 10px 65px'
 }
 selectYear.label.style().set({
   fontSize: '16px',
   fontWeight: '70',
   width: '100px',
   stretch: 'horizontal',
   margin: '20px 100px 5px 100px'
 });
 selectYear.slider.style().set(sliderStyle);
 rightMapSelectYear.label.style().set({
   fontSize: '16px',
   fontWeight: '70',
   width: '100px',
   stretch: 'horizontal',
   margin: '10px 0px 0px 0px'
 });
 rightMapSelectYear.slider.style().set({
   fontSize: '16px',
   fontWeight: '70',
   width: '100px',
   stretch: 'horizontal',
   margin: '10px 0px 5px 0px'
 });
 
 selectBand.label.style().set({
   fontSize: '16px',
   width: '100px',
   fontWeight: '70',
   margin: '10px 100px 10px 100px'
 });
 selectBand.selector.style().set({
   stretch: 'horizontal',
   fontSize: '14px',
   fontWeight: '70',
   width: '190px',
   margin: '0px 60px 30px 60px'
 });
 rightMapSelectBand.label.style().set({
   fontSize: '16px',
   width: '100px',
   fontWeight: '70',
   margin: '10px 0px 10px 0px'
 });
 rightMapSelectBand.selector.style().set({
   stretch: 'horizontal',
   fontSize: '14px',
   fontWeight: '70',
   width: '175px',
   margin: '0px 0px 10px 0px'
 });
 
 clearLayers.style().set({
   stretch: 'horizontal',
   fontSize: '14px',
   fontWeight: '70',
   width: '190px',
   margin: '10px 60px 30px 60px'
 })
 
 var checkboxStyle = {
   fontSize: '16px',
   fontWeight: '70',
   margin: '10px'
 }
 
 map.style().set({
   cursor: 'crosshair'
 });
 map.setOptions('HYBRID');
 
 checkboxSplitPanel.style().set(checkboxStyle);
 
 no2Btn.style().set(BtnStyle);
 so2Btn.style().set(BtnStyle);
 ccBtn.style().set(BtnStyle);
 climateBtn.style().set(ActiveBtn);
 ozoneBtn.style().set(BtnStyle);
 coBtn.style().set(BtnStyle);
 
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
 
 legend2.title.style().set({fontWeight: 'bold', fontSize: '12px', color: '383838'});
 legend2.title.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'});
 legend2.colorbar.style().set({stretch: 'horizontal', margin: '0px 8px', maxHeight: '20px'});
 legend2.leftLabel.style().set({margin: '4px 8px',fontSize: '12px'});
 legend2.leftLabel.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'});
 legend2.centerLabel.style().set({margin: '4px 8px',fontSize: '12px', textAlign: 'center',stretch: 'horizontal'});
 legend2.centerLabel.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'});
 legend2.rightLabel.style().set({ margin: '4px 8px',fontSize: '12px'});
 legend2.rightLabel.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'});
 legend2.panel.style().set({position: 'bottom-left',width: '200px',  padding: '0px'});
 legend2.panel.style().set({backgroundColor: 'rgba(255, 255, 255, 0.5)'});
 legend2.labelPanel.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'});
 
 legend3.title.style().set({fontWeight: 'bold', fontSize: '12px', color: '383838'});
 legend3.title.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'});
 legend3.colorbar.style().set({stretch: 'horizontal', margin: '0px 8px', maxHeight: '20px'});
 legend3.leftLabel.style().set({margin: '4px 8px',fontSize: '12px'});
 legend3.leftLabel.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'});
 legend3.centerLabel.style().set({margin: '4px 8px',fontSize: '12px', textAlign: 'center',stretch: 'horizontal'});
 legend3.centerLabel.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'});
 legend3.rightLabel.style().set({ margin: '4px 8px',fontSize: '12px'});
 legend3.rightLabel.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'});
 legend3.panel.style().set({position: 'bottom-right',width: '200px',  padding: '0px'});
 legend3.panel.style().set({backgroundColor: 'rgba(255, 255, 255, 0.5)'});
 legend3.labelPanel.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'});
 
 rightMapPanel.style().set({position: 'top-right'});
 /*******************************************************************************
  * Behaviors *
  ******************************************************************************/
 var l = 1;
 
 function updateData(Btn){
   selectBand.selector.items().reset(Object.keys(currData.info.bands));
   selectBand.selector.setValue(Object.keys(currData.info.bands)[1]);
   rightMapSelectBand.selector.items().reset(Object.keys(currData.info.bands));
   rightMapSelectBand.selector.setValue(Object.keys(currData.info.bands)[1]);
   
   var slider = ui.Slider({
     min: currData.info.startYear,
     max: currData.info.endYear,
     step: 1,
     onChange: updateMap
   });
   slider.style().set(sliderStyle);
   selectYear.panel.remove(selectYear.slider);
   selectYear.panel.add(slider);
   selectYear.slider = slider;
   var slider2 = ui.Slider({
     min: currData.info.startYear,
     max: currData.info.endYear,
     step: 1,
     onChange: updateRightMap
   });
   rightMapSelectYear.panel.remove(rightMapSelectYear.slider);
   rightMapSelectYear.panel.add(slider2);
   rightMapSelectYear.slider = slider2;
   
   no2Btn.style().set(BtnStyle);
   so2Btn.style().set(BtnStyle);
   ccBtn.style().set(BtnStyle);
   climateBtn.style().set(BtnStyle);
   ozoneBtn.style().set(BtnStyle);
   coBtn.style().set(BtnStyle);
   
   Btn.style().set(ActiveBtn);
   updateRightMap();
   updateMap();
   l--;
 } 
 
 function updateNo2(){
     currData.col = sentinelNo2;
     currData.info = no2ImgInfo;
     updateData(no2Btn);
 } 
 
 function updateOzone(){
     currData.col = ozone;
     currData.info = ozoneInfo;
     updateData(ozoneBtn);
 }
 
 function updateCo(){
     currData.col = sentinelCo;
     currData.info = coImgInfo;
     updateData(coBtn);
 }
 
 function updateSo2(){
     currData.col = sentinelSo2;
     currData.info = so2ImgInfo;
     updateData(so2Btn);
 }
 
 function updateCc(){
     currData.col = cloudCover;
     currData.info = ccImgInfo;
     updateData(ccBtn);
 }
 
 function updateClimate(){
     currData.col = climate;
     currData.info = climateInfo;
     updateData(climateBtn);
 }
 
 function updateRightMap(){
   var year = rightMapSelectYear.slider.getValue();
   var band = rightMapSelectBand.selector.getValue();
   var imgR = currData.col.select(currData.info.bands[band].bname).first().clip(roi);
   var layer = ui.Map.Layer(imgR, currData.info.bands[band].params);
   rightMap.layers().set(0, layer);
   updateRightLegend();
 }
 
 function updateMap(){
   var year = selectYear.slider.getValue();
   var band = selectBand.selector.getValue();
   var img = currData.col.select(currData.info.bands[band].bname).filter(ee.Filter.date(year+'-01-01', year+'-12-31')).mean().clip(roi)
   
   var layer = ui.Map.Layer(img, currData.info.bands[band].params, band + ', ' + year);
   currMap.m.layers().get(0).setShown(false);
   currMap.m.layers().set(l, layer);
   l++;
   currMap.m.layers().remove(currMap.m.layers().get(l-1));
   desc.setValue(currData.info.desc);
   updateLegend();
 }
 
 function clearLay(){
   currMap.m.clear();
   if(currMap.m === map){
     currMap.m.add(legend.panel);
   }else{
     currMap.m.add(legend2.panel);
   }
   currMap.m.centerObject(roi, 7.3);
   var layer = ui.Map.Layer(roi, {}, 'Ladakh', false, 0.6);
   currMap.m.layers().set(0, layer);
   currMap.m.layers().get(0).setShown(true);
   l = 1;
 }
 
 function updateLegend() {
   currLegend.title.setValue(selectBand.selector.getValue() + ' (' + currData.info.bands[selectBand.selector.getValue()].unit + ')');
   var currBand = currData.info.bands[selectBand.selector.getValue()].params;
   currLegend.colorbar.setParams({bbox: [0, 0, 1, 0.1],dimensions: '100x10',format: 'png', min: 0,max: 1,palette: currBand.palette});
   currLegend.leftLabel.setValue(currBand.min);
   currLegend.centerLabel.setValue((currBand.max+currBand.min) / 2);
   currLegend.rightLabel.setValue(currBand.max);
 }
 
 var rightMap = ui.Map();
 rightMap.setControlVisibility(false);
 rightMap.add(rightMapPanel);
 var leftMap = ui.Map();
 leftMap.add(legend2.panel);
 
 function updateRightLegend(){
   if(checkboxSplitPanel.getValue()===true){
     legend3.title.setValue(rightMapSelectBand.selector.getValue() + ' (' + currData.info.bands[rightMapSelectBand.selector.getValue()].unit + ')');
     var currBand = currData.info.bands[rightMapSelectBand.selector.getValue()].params;
     legend3.colorbar.setParams({bbox: [0, 0, 1, 0.1],dimensions: '100x10',format: 'png', min: 0,max: 1,palette: currBand.palette});
     legend3.leftLabel.setValue(currBand.min);
     legend3.centerLabel.setValue((currBand.max+currBand.min) / 2);
     legend3.rightLabel.setValue(currBand.max);
   }
 }
 
 function showSplitPanel(){
   var splitPanel = ui.SplitPanel({
     firstPanel: leftMap,
     secondPanel: rightMap,
     wipe:true,
     style: {stretch: 'both'}
   })
   if(checkboxSplitPanel.getValue()===true){
     ui.root.widgets().reset([controlPanel, splitPanel]);
     var linker = ui.Map.Linker([leftMap, rightMap]);
     rightMap.centerObject(roi, 7.3);
     rightMap.add(legend3.panel);
     currMap.m = leftMap;
     currLegend = legend2;
     updateRightMap();
     clearLay();
   }else{
     ui.root.widgets().reset([controlPanel, map]);
     currMap.m = map;
     currLegend = legend;
     updateRightMap();
     clearLay();
   }
 }
 
 function getPropertyValueList(dataModelDict, propertyName){
   // Get a list of values for a specified property name.
   var result = [];
   for (var key in dataModelDict) {
     result.push(dataModelDict[key][propertyName]);
   }
   return result;
 }
 /*******************************************************************************
  * Initialize *
  ******************************************************************************/
 
 currMap.m.centerObject(roi, 7.3);
 clearLay();
