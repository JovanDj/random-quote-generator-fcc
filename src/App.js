import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      error: undefined,
      loading: false,
      quote: {
        author: "Author",
        text: "Text"
      }
    };
  }
  render() {
    return (
      <div id="quote-box">
        <div className="container">
          <h1>Random Quote generator</h1>

          {this.state.loading && <p>Please wait..</p>}
          {this.state.error && (
            <p className="text-danger">{this.state.error}</p>
          )}

          <div className="quote-text" id="text">
            {this.state.quote.text}
          </div>
          <div className="quote-author" id="author">
            {this.state.quote.author}
          </div>
          <button id="new-quote" onClick={this.fetchQuote}>
            New Quote
          </button>

          <a
            href={
              "https://twitter.com/intent/tweet?text=" +
              this.state.quote.text +
              " - " +
              this.state.quote.author
            }
            id="tweet-quote"
          >
            Click
          </a>
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
        }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
      );
  };
}

export default App;
