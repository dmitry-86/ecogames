const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");

draggableElements.forEach(elem => {
  elem.addEventListener("dragstart", dragStart);
  // elem.addEventListener("drag", drag);
  // elem.addEventListener("dragend", dragEnd);
});

droppableElements.forEach(elem => {
  elem.addEventListener("dragenter", dragEnter);
  elem.addEventListener("dragover", dragOver);
  elem.addEventListener("dragleave", dragLeave);
  elem.addEventListener("drop", drop);
});

//Drag and Drop functions

function dragStart(event){
  event.dataTransfer.setData("text", event.target.id);
}

function dragEnter(event){
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event){
  event.preventDefault();
}


function dragLeave(event){
  event.target.classList.remove("droppable-hover");
}

function drop(event){
  event.preventDefault();
  // console.log(event.target);
  event.target.classList.remove("droppable-hover");
  const draggableElementData = event.dataTransfer.getData("text");
  const droppableElementData = event.target.getAttribute("data-draggable-id");

  // const gm = event.getAttribute("not-filled");

  var myImg = event.target.getElementsByTagName('img')[0];
  // var obj ='<img src="images/'+draggableElementData+'_bin.png" alt="">';


  console.log(myImg);

  // console.log(draggableElementData);
  // console.log(droppableElementData);

  if(draggableElementData === droppableElementData) {
    const draggableElement = document.getElementById(draggableElementData);
    event.target.classList.add("dropped");
    // event.target.style.backgroundColor = draggableElement.style.color;
    // event.target.style.backgroundColor = window.getComputedStyle(draggableElement).color;
    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");

    //
  // myImg.style.visibility='hidden';
    event.target.insertAdjacentHTML("afterbegin", `<img src="images/recycling/filled_${draggableElementData}_bin.png" alt="">`);
    myImg.remove();



    // myImg.style.visibility = 'hidden';

    // console.log(myImg);
    // <img src="images\filled-${draggableElementData}_bin.png" alt="">
  }
}


// https://codepen.io/Coding_Journey/pen/YzKpLvE
