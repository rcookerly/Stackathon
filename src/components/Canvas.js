import React, { Component } from "react";

class Canvas extends Component {
  render() {
    // Application variables
    let counter = 0;
    const letters = "♬ Song Lyrics Here ♬";
    const minFontSize = 5;
    const position = { x: 0, y: window.innerHeight / 2 };

    // Drawing variables
    let canvas;
    let context;
    const mouse = { x: 0, y: 0, down: false };

    const init = () => {
      canvas = document.getElementById("canvas");
      console.log(canvas);
      context = canvas.getContext("2d");
      //canvas.width = window.innerWidth;
      //canvas.height = window.innerHeight;

      canvas.addEventListener("mousemove", mouseMove, false);
      canvas.addEventListener("mousedown", mouseDown, false);
      canvas.addEventListener("mouseup", mouseUp, false);
      canvas.addEventListener("mouseout", mouseUp, false);
      canvas.addEventListener("dblclick", doubleClick, false);

      // window.onresize = (event) => {
      //   canvas.width = window.innerWidth;
      //   canvas.height = window.innerHeight;
      // }
    }

    const mouseMove = (event) => {
      mouse.x = event.pageX;
      mouse.y = event.pageY;
      draw();
    }

    const draw = () => {
      if (mouse.down) {
        const d = distance(position, mouse);
        const fontSize = minFontSize + d / 2;
        const letter = letters[counter];
        const stepSize = textWidth(letter, fontSize);

        if (d > stepSize) {
          const angle = Math.atan2(mouse.y - position.y, mouse.x - position.x);

          context.font = fontSize + "px Georgia";

          context.save();
          context.translate(position.x, position.y);
          context.rotate(angle);
          context.fillText(letter, 0, 0);
          context.restore();

          counter++;
          if (counter > letters.length - 1) {
            counter = 0;
          }

          position.x = position.x + Math.cos(angle) * stepSize;
          position.y = position.y + Math.sin(angle) * stepSize;
        }
      }
    }

    const distance = (pt, pt2) => {
      let xs = 0;
      let ys = 0;

      xs = pt2.x - pt.x;
      xs = xs * xs;

      ys = pt2.y - pt.y;
      ys = ys * ys;

      return Math.sqrt(xs + ys);
    }

    const mouseDown = (event) => {
      mouse.down = true;
      position.x = event.pageX;
      position.y = event.pageY;

      document.getElementById("info").style.display = "none";
    }

    const mouseUp = (event) => {
      mouse.down = false;
    }

    const doubleClick = (event) => {
      canvas.width = canvas.width;
    }

    const textWidth = (string, size) => {
      context.font = size + "px Georgia";

      if (context.fillText) {
        return context.measureText(string).width;
      } else if (context.mozDrawText) {
        return context.mozMeasureText(string);
      }
    }

    return (
      <>
        {init()}
      </>
    )
  }
}

export default Canvas;
