function draw() {

 var canvas = document.getElementById("canvas");
 if (null==canvas || !canvas.getContext) return;
 ctx=canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 ctx.fillStyle="#dddddd";
 ctx.fillRect(0,0,0,0);

 var axes={};
 axes.x0 = 0.5 + 0.5*canvas.width;
 axes.y0 = 0.5 + 0.5*canvas.height;

 var x=new Array(), y=new Array();
 var dt, tstart, tstop;

 tstart=-Tmax;
 tstop=Tmax;
 dt = (tstop - tstart) / (N-1);
 axes.xscale = (canvas.width)/(2*Tmax);
 axes.yscale = (canvas.height)/(2*Vmax);
 axes.N = N;

 for ( i=0; i<N; i++) {
 	x[i]=tstart + i*dt;
 	y[i] = Vp*Math.sin(2*3.1415*fo*x[i] + phase*3.1415/180) ;
 }

 GraphArray(ctx,axes,x,y,"rgb(0,255,0)",2);
 }

function GraphArray (ctx,axes,x,y,color,thick) {

 var i, x0, y0, xscale, yscale, xp, yp;

 x0=axes.x0;  y0=axes.y0;
 xscale=axes.xscale;  yscale=axes.yscale;

 ctx.beginPath();
 ctx.lineWidth = thick;
 ctx.strokeStyle = color;

 for (i=0; i<axes.N; i++) {

 	xp = x0 + x[i]*xscale;
 	yp = y0 - y[i]*yscale;


	if (i==0) ctx.moveTo( xp, yp );
	else      ctx.lineTo( xp, yp );
 }

 ctx.stroke();
}
function showAxes(ctx,axes) {
 var x0=axes.x0, w=ctx.canvas.width;
 var y0=axes.y0, h=ctx.canvas.height;

 ctx.beginPath();
 ctx.strokeStyle = "rgb(0,0,0)";
 ctx.moveTo(0,y0);    ctx.lineTo(w,y0);
 ctx.moveTo(x0,0);    ctx.lineTo(x0,h);
 ctx.stroke();
}

var Vp = .7; //Magnitude
var fo = 1000; //Period Size (oppsosite, larger number = smaller wavelength)
var phase = 0; //moves the graph left with positive numbers other way with negative numbers
var Vmax = 2; //The max height, higher number equals smaller, wont use bc of Vp
var Tmax = 0.001; //dont mess
var N = 1001; //exactness of sine wave, could get nifty with this

var evan = 1;
function loopWave() {
  setTimeout(function() {
    phase = phase + 6;
    evan++;
    if (evan > 2) {
      Vp = Vp + .01;
    }
    if (evan > 10 && evan < 26) {
      fo = fo - 10;
    }
    if (evan > 26 && evan < 40) {
        Vp = Math.abs(Vp);
        Vp = Vp - .1;
    }
    if (evan % 25 === 1) {
      Vp = -Vp;
    }
    if (evan > 10 && evan < 50) {
      phase = phase - 10;
    }
    if (evan > 40) {
      Vp = Vp + .05;
    }
    if (evan > 100) {
      console.log('lol');
      evan = evan -100;
      Vp = .7;
      fo = 1000;
      phase = 0;
    }
    draw();
      loopWave();
  },50)
}

$(document).ready(function() {
  loopWave();
});
