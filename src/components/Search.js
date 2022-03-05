import React, { Component } from "react";
import axios from "axios";
import Canvas from "./Canvas";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artist: "",
      lyrics: "",
      song: "",
    };
  }

  handleChange = (evt) => {
    evt.preventDefault();
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const artist = encodeURIComponent(this.state.artist.trim());
      const song = encodeURIComponent(this.state.song.trim());
      const lyrics = (
        await axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
      ).data.lyrics;
      this.setState({
        artist: "",
        lyrics,
        song: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { artist, lyrics, song } = this.state;
    return (
      <div>
        <h3 className="m-3">Search for Lyrics!</h3>
        <form onSubmit={(evt) => this.handleSubmit(evt)}>
          <div className="mb-3 w-25 m-3">
            <input
              type="text"
              onChange={(evt) => this.handleChange(evt)}
              className="form-control"
              placeholder="Artist"
              name="artist"
              value={artist}
              required
            />
          </div>
          <div className="mb-3 w-25 m-3">
            <input
              type="text"
              onChange={(evt) => this.handleChange(evt)}
              className="form-control"
              placeholder="Song"
              name="song"
              value={song}
              required
            />
          </div>
          <button className="btn btn-primary w-10 m-3" type="submit">
            Search
          </button>
        </form>
        {this.state.lyrics !== "" ? (
          <Canvas key={lyrics} lyrics={lyrics} width="1280px" height="1024px" />
        ) : null}
      </div>
    );
  }
}

export default Search;
