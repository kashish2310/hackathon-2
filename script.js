const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 70;
canvas.height = 400;
var toolSelect = document.getElementById('dtool');

var brush = {};
brush.shape = 'round';
brush.size = 1;

function setBrush(type) {
  switch (type) {
    case 'pencil':
      brush.shape = 'round';
      brush.size = 1;
      break;
    case 'square':
      brush.shape = 'square';
      brush.size = 10;
      break;

    case 'flat':
      brush.shape = 'flat';
      brush.size = 6;
      break;
  }
}

//var lastX; 
//var lastY; 


let context = canvas.getContext("2d");
let start_bg_color = "white"
context.fillStyle = "start_bg_color";
context.fillRect(0, 0, canvas.width, canvas.height);



let is_drawing = false;

let restore_array = [];
let index = -1;


function change_color(element){
  setbrush = element.style.background;
}


canvas.addEventListener("touchstart" , start, false);
canvas.addEventListener("touchmove" , draw, false);
canvas.addEventListener("mousedown" , start, false);
canvas.addEventListener("mousemove" , draw, false);


canvas.addEventListener("touchend" , stop, false);
canvas.addEventListener("mouseup" , stop, false);
canvas.addEventListener("mouseout" , stop, false);

function start(event) {
    is_drawing = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft,
                   event.clientY - canvas.offsetTop);
    event.preventDefault();
  }
  
function draw(event) {
    if (is_drawing) {
      context.lineTo(event.clientX - canvas.offsetLeft,
                     event.clientY - canvas.offsetTop);
      context.strokeStyle = change_color;
      context.lineWidth = brush.size;
      context.lineCap = brush.shape ;
      context.lineJoin = brush.shape;
      context.stroke();
    }
    event.preventDefault();
  }

  function stop(event) {
    if(is_drawing){
      context.stroke();
      context.closePath();
      is_drawing = false;
    }
    event.preventDefault();

    if ( event.type != 'mouseout'){
         restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
         index += 1;
    }

  }

  function clear_canvas() {
    context.fillStyle = "start_bg_color";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  function undo_last() {
    if (index <= 0) {
      clear_canvas();
    } else {
        index -= 1;
        restore_array.pop();
        context.putImageData(restore_array[index], 0, 0);
    }
  }


 /* function erase(e){

    mouseX = parseInt(e.clientX - canvas.offsetLeft);
    mouseY = parseInt(e.clientX - canvas.offsetLeft);
    if(is_drawing){
      context.globalCompositeOperation="source-over";
      context.moveTo(lastX,lastY);
      context.lineTo(mouseX,mouseY);
      ctx.stroke();     
    }
    else{
    context.globalCompositeOperation = 'destination-out';
    context.arc =(lastX, lastY ,8,0,Math.PI*2 ,false) ;
      context.fillStyle();
  }
  lastX=mouseX;
  lastY=mouseY;
}
  */
