import React, { Component } from "react";
import axios from "axios";

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: "",
      year: "",
      info: {},
      loading: true
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  handleReset(event) {
    this.setState({
      movie: "",
      year: ""
    });
  }

  handleSubmit = event => {
    axios
      .get(
        "http://www.omdbapi.com/?apikey=d4ec0221&t=" +
          this.state.movie +
          "&y=" +
          this.state.year
      )
      .then(response => {
        if (response.data.Response === "False") {
          this.setState({ loading: true });
        } else {
          const info = {
            title: response.data.Title,
            year: response.data.Year,
            genre: response.data.Genre,
            poster: response.data.Poster,
            plot: response.data.Plot
          };
          this.setState({
            loading: false,
            info: info
          });
        }
      })
      .catch(error => console.log(error));

    console.log(this.state);
    event.preventDefault();
  };

  renderApiContent() {
    if (this.state.loading) {
      return null;
    } else {
      return (
        <div className="flex w-4/5 rounded overflow-hidden shadow-lg mt-4 mb-20">
          <img className="" src={this.state.info.poster} alt="" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              {this.state.info.title}
            </div>
            <p className="text-grey-darker text-base">
              <span>
                <strong>Year:</strong>
              </span>
              <span> {this.state.info.year}</span>
            </p>
            <br />
            <p className="text-grey-darker text-base">{this.state.info.plot}</p>
          </div>
        </div>
      );
    }
  }

  renderForm() {
    return (
      <form className="w-full max-w-sm mt-8" onSubmit={this.handleSubmit}>
        <div className="flex items-center border-b border-b-2 border-grey py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight"
            type="text"
            name="movie"
            placeholder="Movie"
            aria-label="Enter your movie"
            value={this.state.movie}
            onChange={this.handleInputChange}
          />
          <input
            className="appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight"
            type="text"
            name="year"
            placeholder="Year"
            aria-label="Enter your year"
            value={this.state.year}
            onChange={this.handleInputChange}
          />
          <button
            className="flex-no-shrink bg-grey-darkest hover:bg-grey-dark border-grey hover:border-grey-dark text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Search
          </button>
          <button
            className="flex-no-shrink border-transparent border-4 text-grey hover:text-grey-darker text-sm py-1 px-2 rounded"
            type="button"
            onClick={this.handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    );
  }

  render() {
    return (
      <div className="flex flex-col items-center w-4/5">
        {this.renderForm()}
        {this.renderApiContent()}
      </div>
    );
  }
}

export default MyForm;
