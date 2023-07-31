import React from 'react';
import axios from 'axios';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: []
    };
  }
    componentDidMount() {
    axios.get('https://api.punkapi.com/v2/beers').then(({ data }) => {
      const beersWithLiked = data.map((beer) => ({...beer, liked: false}));
      this.setState({ beers: beersWithLiked });
    });
    
  }

  handleLike = (id) => {
    this.setState((prevState) => ({
      beers: prevState.beers.map((beer) =>
      beer.id === id ? {...beer, liked: !beer.liked} : beer
      ),

    }));
  }

  render() {
    return (
      <div className="App">
        {this.state.beers.map((beers, index) => {
          <Beer key={beer.id} {...beer} onLike={() => this.handleLike(beer.id)}/>
          })}
      </div>
    );
  }
}


class Beer extends React.Component {
  render() {
    const {name, tagline, description, like} = this.props;

    return (
      <div>
        <h2>{name}</h2>
        <h3>{tagline}</h3>
        <p>{description}</p>
        <button onClick={this.props.onLike}>
            {like ? "Unlike 👎" : "Like 👍"}
        </button>
        <hr />
      </div>
    );
  }
}