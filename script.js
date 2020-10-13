var c = document.querySelector("canvas");
var va = document.getElementById("myRange");
var va2 = document.getElementById("myRange2");
var add = document.getElementById("add");
var remove = document.getElementById("remove");
var data = document.getElementById("tickMarks");
var ran = document.getElementById("randomC");
add.addEventListener('click', addCell)
remove.addEventListener('click', removeCell)
ran.addEventListener('click', randomize)
// var R = {
//   size:document.getElementById("rSize"),
//   colorMin:document.getElementById("rColorMin"),
//   colorMax:document.getElementById("rColorMax")
// }
// var G = {
//   size:document.getElementById("gSize"),
//   colorMin:document.getElementById("gColorMin"),
//   colorMax:document.getElementById("gColorMax")
// }
// var B = {
//   size:document.getElementById("bSize"),
//   colorMin:document.getElementById("bColorMin"),
//   colorMax:document.getElementById("bColorMax")
// }

// console.log(R.size.value,G,B)











c.width = 250;
c.height = 250;
var width=c.width;
var height=c.height;
var ctx = c.getContext("2d");
var canvasData = ctx.getImageData(0, 0, width,height);
var scale = {
	x:c.style.transform
};

var nbp=3;
function initpoints(nbp) {
    var poi = [];
  for (var i = 0;i<nbp;i++){
  poi[i] = {x:Math.floor(Math.random()*width),
            y:Math.floor(Math.random()*height)
        };
      }
  return poi
}
var poi = initpoints(nbp);


for (var i = 0; i < poi.length; i++)
  { var z = document.createElement("OPTION");
    z.setAttribute("value", i);
    data.appendChild(z);}
va2.setAttribute("min", 0)
va2.setAttribute("max", i-1)

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        }};

var mpos = {x:0,
            y:0};
c.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(c, evt);
    mpos = {x:mousePos.x,
    		        y:mousePos.y}
  }, false); 


function dist(x1,y1,x2,y2){
	return Math.floor(Math.sqrt((x1-x2)**2+(y1-y2)**2));
};

function map(n, start1, stop1, start2, stop2) {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};


function addCell() {
    poi.push({x:Math.floor(Math.random()*width),
          y:Math.floor(Math.random()*height)
        })
    nbp += 1;
    var z = document.createElement("OPTION");
    z.setAttribute("value", poi.length);
    data.appendChild(z)
    va2.setAttribute("max", poi.length);
  }
function removeCell() {
    poi.pop()
    nbp -= 1;
    data.children[poi.length].remove()
    va2.setAttribute("max", poi.length)
  }
function randomize() {
  poi = initpoints(nbp);
}

function drawPixel (x, y, color) {
    var index = (x + y * width) * 4;
    canvasData.data[index + 0] = color[0];
    canvasData.data[index + 1] = color[1];
    canvasData.data[index + 2] = color[2];
    canvasData.data[index + 3] = 255;
};


add.addEventListener('click', addCell)
remove.addEventListener('click', removeCell)
function animate() {
	requestAnimationFrame(animate);
	for (var y = 0; y <height; y++) {  
      for (var x = 0; x < width; x++) {
          var di = [];
          for (var i = 0;i<poi.length;i++){
            di[i]=(dist(x,y,poi[i].x,poi[i].y));
          }
          di.push(dist(x,y,mpos.x,mpos.y))
          di.sort(function(a, b){return a - b});
          var color = map(di[va2.value],0,Number(va.value),0,255)
	  taille = Number(va.value)
	  index = va2.value
	  drawPixel(x,y,[
                map(di[va2.value],0,taille,255,0),
	        map(di[va2.value],0,taille,255,0),
		map(di[va2.value],0,taille,255,0)])

//           drawPixel(x,y,[
//             map(di[1],0,130,255,0),
//             color,
//             map(di[2],0,250,0,255)
//             ])




          // drawPixel(x,y,
          //   [map(di[va2.value],0,R.size.value,R.colorMin.value,R.colorMin.value),
          //    map(di[va2.value],0,G.size.value,G.colorMin.value,G.colorMax.value),
          //    map(di[va2.value],0,B.size.value,B.colorMin.value,B.colorMax.value)]);

    }

  }
   ctx.putImageData(canvasData, 0, 0);


}
animate()
