

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  var color = rgbToHex( r * 255, g * 255, b * 255 );
  console.log(color);
  return color;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    r = Math.min(Math.round(r),255);
    g = Math.min(Math.round(g),255);
    b = Math.min(Math.round(b),255);
    console.log({r,g,b});
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}


/**
 * Globale LichtControlle
 */
const maxBrightness=100;
var nightBrightness=10;
var defaultBrightness=maxBrightness;
var lights = [];
var dimmableLights = [];

function registerLights(light){
    lights.push(light)
    if (light.setBrightness){
        dimmableLights.push(light);
    }
}

function turnOffAllLights(){
    lights.forEach(l => l.turnOff());
}

function turnOnAllLights(){
    lights.forEach(l => l.turnOn());
}

function setAllBrightness(brightness){
    dimmableLights.forEach(l => l.setBrightness(brightness));
}

/**
 * Ende Globale LichtControlle
 */

class OsramSmartPlus{
    constructor(id) {
        this.id=id
        this.dimmenstepps = 5;
        this.maxBirghtness = 100;
        this.hue = 0;
        this.sat = 1;
        this.lightness = 0.5;
    }


    nextColor() {
        this.hue+=0.05;
        if (this.hue >= 1) { this.hue = 0; }
        setState(this.id + ".color", hslToRgb(this.hue,this.sat,this.lightness));
    }
    setBrightness(newval) {
        setState(this.id + ".brightness", { val: newval });
    }
    getBrightness() {
        return getState(this.id + ".brightness").val;
    }
    turnOff() {
        this.setBrightness(0);
    }
    turnOn() {
        this.setBrightness( defaultBrightness);
    }
    dimmen() {
        var brightness = this.getBrightness();
        brightness += this.dimmenstepps;
        if (brightness <= 0) {
            brightness = 0;
            this.dimmenstepps = Math.abs(this.dimmenstepps);
        }

        if (brightness >= this.maxBirghtness) {
            brightness = this.maxBirghtness;
            this.foward = -Math.abs(this.dimmenstepps);
        }
        this.setBrightness(brightness);
    }
    toggleDimmDirection() {
        this.dimmenstepps = -this.dimmenstepps;
    }

}

