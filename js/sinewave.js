function draw(canvasid) {
 var canvas = document.getElementById(canvasid);
 if (null==canvas || !canvas.getContext) return;
 ctx=canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 ctx.fillStyle="#dddddd";
 ctx.fillRect(0,0,0,0);

 var axes={};
 axes.x0 = 0.5 + 0.5*canvas.width;
 axes.y0 = 0.5 + 0.5*canvas.height;

 var x=new Array(), y=new Array();
 var x2=new Array(), y2=new Array();
 var x3=new Array(), y3=new Array();
 var dt, tstart, tstop;

 tstart=-Tmax;
 tstop=Tmax;
 dt = (tstop - tstart) / (N-1);
 axes.xscale = (canvas.width)/(2*Tmax);
 axes.yscale = (canvas.height)/(2*Vmax);
 axes.N = N;

 for ( i=0; i<N; i++) {
 	x[i]=tstart + i*dt;
 	x2[i]=tstart + i*dt;
 	x3[i]=tstart + i*dt;
 	y[i] = Vp1*Math.sin(2*3.1415*fo*x[i] + phase1*3.1415/180);
  y2[i] = Vp2*Math.sin(2*3.1415*fo*x2[i] + phase2*3.1415/180);
  y3[i] = Vp3*Math.sin(2*3.1415*fo*x3[i] + phase3*3.1415/180);
 }


 GraphArray(ctx,axes,x,y,"rgb(3,220,56)",10);
 GraphArray(ctx,axes,x2,y2,"rgb(3,220,56)",10);
 GraphArray(ctx,axes,x3,y3,"rgb(3,220,56)",10);
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

var Vp1 = .35; //Magnitude
var Vp2 = -.4;
var Vp3 = .15;
var fo = 1000; //Period Size (oppsosite, larger number = smaller wavelength)
var phase1 = 0; //moves the graph left with positive numbers other way with negative numbers
var phase2 = -50;
var phase3 = -100;
var Vmax = 2; //The max height, higher number equals smaller, wont use bc of Vp
var Tmax = 0.001; //dont mess
var N = 1001; //exactness of sine wave, could get nifty with this

var evan = 1;
function loopWave() {
  setTimeout(function() {
    evan++;
    phase1 = phase1 + 2;
    if (evan < 100) {
      Vp1 = Vp1 + .0045;
    }
    if (evan > 100) {
      Vp1 = Vp1 - .0045;
    }
    if (evan > 200) {
      Vp1 = .35;
      evan = 1;
    }
    draw('1');
      loopWave();
  },50)
}

function loopWave2() {
  setTimeout(function() {
    evan++;
    phase2 = phase2 + 3;
    if (evan < 50) {
      Vp2 = Vp2 + .0062;
    }
    if (evan > 50 && evan < 150) {
      Vp2 = Vp2 - .0062;
    }
    if (evan > 150) {
      Vp2 = Vp2 + .0062;
    }
    if (evan > 200) {
      Vp2 = -.4;
    }
    draw('2');
      loopWave2();
  },50)
}

function loopWave3() {
  setTimeout(function() {
    phase3 = phase3 + 1;
    if (evan < 50) {
      Vp3 = Vp3 + .00125;
    }
    if (evan > 50 && evan < 100) {
      Vp3 = Vp3 - .00125;
    }
    if (evan > 100 && evan < 150) {
      Vp3 = Vp3 + .00125;
    }
    if (evan > 150 && evan < 200) {
      Vp3 = Vp3 - .00125;
    }
    if (evan > 200) {
      Vp3 = .15;
    }
    draw('3');
      loopWave3();
  },50)
}

$(document).ready(function() {
  loopWave();
  loopWave2();
  loopWave3();
});
