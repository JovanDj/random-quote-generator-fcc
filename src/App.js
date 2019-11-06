import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      error: undefined,
      loading: true,
      quote: {
        author: "",
        text: ""
      }
    };
  }
  render() {
    return (
      <div id="quote-box">
        <div className="container">
          {this.state.error && (
            <div className="alert alert-danger" role="alert">
              {this.state.error}
            </div>
          )}
          <blockquote class="blockquote bg-light p-5 text-center m-5">
            {!this.state.loading && (
              <React.Fragment>
                <p className="mb-0 quote-text lead" id="text">
                  {this.state.quote.text}
                </p>
                <footer class="blockquote-footer my-2">
                  <cite
                    className="quote-author"
                    id="author"
                    title={this.state.quote.author}
                  >
                    {this.state.quote.author}
                  </cite>
                </footer>
                <div className="buttons container d-flex justify-content-between mt-5">
                  <button
                    className="btn btn-primary"
                    id="new-quote"
                    onClick={this.fetchQuote}
                  >
                    New Quote
                  </button>

                  <a
                    className="btn btn-primary"
                    role="button"
                    href={
                      "https://twitter.com/intent/tweet?text=" +
                      this.state.quote.text +
                      " - " +
                      this.state.quote.author
                    }
                    id="tweet-quote"
                  >
                    Share on Twitter
                  </a>
                </div>
              </React.Fragment>
            )}

            {this.state.loading && (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </blockquote>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchQuote();
  }

  fetchQuote = () => {
    this.setState({
      loading: true
    });

    fetch(
      "https://raw.githubusercontent.com/JamesFT/Database-Quotes-JSON/master/quotes.json"
    )
      .then(res => res.json())
      .then(res => res[Math.floor(Math.random() * 500)])
      .then(
        result => {
          this.setState({
            quote: {
              text: result.quoteText,
              author: result.quoteAuthor
            },
            loading: false
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            loading: false,
            error
          });
        }
      );
  };
}

export default App;
