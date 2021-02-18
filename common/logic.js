var shelly1_1ZimmerLampe = new Shelly1("shelly.0.SHSW-1#E0980694E0DB#1");
var osramSmartPlus1 = new OsramSmartPlus("zigbee.0.7cb03eaa0a006e66");
var aqaraButton1 = new AqaraButton("zigbee.0.00158d00052b952e");
var ptm = new PTM216Z("zigbee.1.000000000172c2cd");


registerLights(shelly1_1ZimmerLampe);
registerLights(osramSmartPlus1);

aqaraButton1.click     = function(){ shelly1_1ZimmerLampe.toggleSwitch();} 
aqaraButton1.holdStart = function(){ osramSmartPlus1.toggleDimmDirection(); }
aqaraButton1.holdTick  = function(){ osramSmartPlus1.dimmen();}
aqaraButton1.doubeClick= function(){ osramSmartPlus1.nextColor();}
ptm.states[0].click    = function(){ 
    turnOnAllLights();
}
ptm.states[1].click    = function(){ 
    turnOffAllLights();
 }
ptm.states[3].click    = function(){ 
    configureLightsOnDay();
}
ptm.states[2].click    = function(){ 
    configureLightsOnNight();
}



function configureLightsOnDay(){
    turnOffAllLights();
    defaultBrightness=maxBrightness;
} 

function configureLightsOnNight(){
    defaultBrightness=nightBrightness;
    setAllBrightness(defaultBrightness);
} 

schedule({astro: "sunriseEnd", shift: 0}, function () {
    configureLightsOnDay();    
});
schedule({astro: "sunset", shift: 0}, function () {
    configureLightsOnNight();    
});
