import React, { Component } from "react";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: null,
      context: null,
      lyrics: `♬ ${this.props.lyrics}`,
    };
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const context = canvas.getContext("2d");
    this.setState({ ...this.state, canvas, context });
  }

  render() {
    let counter = 0;
    const { canvas, context, lyrics } = this.state;
    const minFontSize = 15;
    const mouse = { x: 0, y: 0, down: false };
    const position = { x: 0, y: window.innerHeight / 2 };

    const distance = (pt, pt2) => {
      return Math.sqrt(Math.pow(pt2.x - pt.x, 2) + Math.pow(pt2.y - pt.y, 2));
    };

    const draw = () => {
      if (mouse.down) {
        const d = distance(position, mouse);
        const fontSize = minFontSize + d / 2;
        const letter = lyrics[counter];
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
          if (counter > lyrics.length - 1) {
            counter = 0;
          }
          position.x = position.x + Math.cos(angle) * stepSize;
          position.y = position.y + Math.sin(angle) * stepSize;
        }
      }
    };

    const setMouseState = (evt) => {
      const cb = canvas.getBoundingClientRect();
      switch (evt.type) {
        case "mousemove":
          mouse.x = evt.clientX - cb.left;
          mouse.y = evt.clientY - cb.top;
          draw();
          break;
        case "mousedown":
          mouse.down = true;
          mouse.x = position.x = evt.clientX - cb.left;
          mouse.y = position.y = evt.clientY - cb.top;
          break;
        case "mouseup":
          mouse.down = false;
          break;
        case "mouseenter":
          mouse.down = evt.buttons === 1;
          break;
        case "dblclick":
          canvas.width = canvas.width;
          break;
        default:
          console.log(evt);
      }
    };

    const textWidth = (string, size) => {
      context.font = size + "px Georgia";
      if (context.fillText) {
        return context.measureText(string).width;
      } else if (context.mozDrawText) {
        return context.mozMeasureText(string);
      }
    };

    return (
      <canvas
        ref="canvas"
        {...this.props}
        onDoubleClick={(e) => setMouseState(e)}
        onMouseDown={(e) => setMouseState(e)}
        onMouseEnter={(e) => setMouseState(e)}
        onMouseMove={(e) => setMouseState(e)}
        onMouseUp={(e) => setMouseState(e)}
      />
    );
  }
}

export default Canvas;
