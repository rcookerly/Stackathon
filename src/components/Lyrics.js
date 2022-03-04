import React, { Component } from "react";
import axios from "axios";
import Canvas from "./Canvas";

class Lyrics extends Component {
  constructor() {
    super();
    this.state = {
      lyrics: "",
    };
  }

  async componentDidMount() {
    const artist = "disturbed";
    const song = "stupify";
    const lyrics = (
      await axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
    ).data.lyrics;
    this.setState({ lyrics });
  }

  render() {
    const { lyrics } = this.state;
    {
      return this.state.lyrics !== "" ? (
        <Canvas lyrics={lyrics} width="1024px" height="768px" />
      ) : null;
    }
  }
}

export default Lyrics;
