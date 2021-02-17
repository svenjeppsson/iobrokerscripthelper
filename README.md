# iobrokerscripthelper

This project contains JavaScript source code files, that might help you to write scripts for [ioBroker](https://github.com/ioBroker/ioBroker)

## PTM216Z

PTM216Z.js contains a Class for [PTM216Z](https://www.enocean.com/de/produkte/enocean_module/ptm-216z/) based Switches.
The PTM216 has 4 Buttons, in most selled Switches hidden behind two rockers.

<table>
<tr><td>A0<td>B0
<tr><td>A1<td>B1
</table>

The PTM216Z provides 12 "action"-state

<table>
<tr><th>index in class logic<th>Buttons<th>press-action<th>release-action
<tr><td>0<td>A0<td>recall_scene_0<td>recall_scene_4
<tr><td>1<td>A1<td>recall_scene_1<td>recall_scene_5
<tr><td>2<td>B0<td>recall_scene_2<td>recall_scene_6
<tr><td>3<td>B1<td>recall_scene_3<td>recall_scene_7
<tr><td>4<td>A0+B0<td>press_2_of_2<td>release_2_of_2
<tr><td>5<td>A1+B1<td>press_1_of_2<td>release_1_of_2
</table>

This class PTM216Z provides a *click* and a *hold* (long press >3s)

### Usage:
*zigbee.0.1234567890123456789* is a place holder you muss choose you id in your iobroker objects.
```javascript
var ptm = new PTM216Z("zigbee.0.1234567890123456789")
//click on A0
ptm.states[0].click = function () { console.log("click 0");}
//longpress on A0
ptm.states[0].hold  = function () { console.log("hold 0"); }
// up to index 5
// click on A1+B1
ptm.states[5].click = function () { console.log("click 5");}
```
You only have to overwrite every functions. Just what you need.
