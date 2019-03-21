
//  8888888b.
//  888  "Y88b
//  888    888
//  888    888 888d888 8888b.   .d88b.   .d88b.  88888b.
//  888    888 888P"      "88b d88P"88b d88""88b 888 "88b
//  888    888 888    .d888888 888  888 888  888 888  888
//  888  .d88P 888    888  888 Y88b 888 Y88..88P 888  888
//  8888888P"  888    "Y888888  "Y88888  "Y88P"  888  888
//                                  888
//                             Y8b d88P
//                              "Y88P"

/*
drag a div around the screen, it stays where it was left on mouseup.

CSS REQUIREMENTS:

the main draggable element must be positioned absolutely:
    position: absolute;

use "cursor: move;" for handle, if present so that movability is obvious.
*/

// allows a div to be dragged around the screen (hopefully)
setup.dragon = function(elementID: string, handleID?: string): void {

  function dragElement(elmnt, handle?: string) {
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;
    if (handle != null && document.getElementById(handle)) {
      // if present, the header is where you move the DIV from
      const $element = document.getElementById(handle);
      if ($element != null) {
        $element.onmousedown = dragMouseDown;
      }
    } else {
      // otherwise, move the DIV from anywhere inside the DIV
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  const $element = document.getElementById(elementID);
  if ($element == null) {
    aw.con.warn(`Could not get element with id ${elementID} for dragon function!`);
  } else {
    dragElement($element, handleID);
  }
};
