import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import RecipePage from "./RecipePage";
import { slugify } from "../helpers";
import recipes from "../sample_data/recipes.json";

class App extends Component {
  constructor(props) {
    super(props);

    this.recipes = recipes.results;
    this.state = {
      searchString: ""
    };
  }
  componentDidMount() {
    this.setState({
      searchString: this.props.location.pathname.includes("recipe/")
        ? ""
        : this.props.location.pathname.substring(1)
    });
  }

  clearSearch = () => {
    this.props.history.push("/");
    this.setState({
      searchString: ""
    });
  };

  matchRecipe = () => {
    const recipe = recipes.results.filter(item => {
      return (
        this.props.location.pathname.split("/recipe/")[1] ===
        slugify(item.title)
      );
    });
    return recipe[0];
  };
  componentDidUpdate = () => {
    this.state.searchString !== ""
      ? window.history.pushState(
          {},
          null,
          `http://localhost:3000/${this.state.searchString}`
        )
      : window.history.pushState({}, null, `http://localhost:3000/`);
  };
  handleChange = e => {
    this.setState({
      searchString: e.target.value
    });
  };

  render() {
    let items = recipes.results;

    items = items.filter(
      i =>
        i.title.toLowerCase().includes(this.state.searchString.toLowerCase()) ||
        i.ingredients
          .toLowerCase()
          .includes(this.state.searchString.toLowerCase())
    );
    return (
      <div className="App">
        {/* TODO: Navbar precisa receber a string da URL */}
        <Navbar
          searchString={this.state.searchString}
          handleChange={this.handleChange}
          ClearSearch={this.clearSearch}
        />
        )}/>
        <div className="container mt-10">
          {/* TODO: Implementar rotas  */}
          <Switch>
            <Route
              exact
              path="/recipe/"
              render={() => <RecipePage recipe={this.matchRecipe()} />}
            />
            <Route
              exact
              path="/"
              render={() => (
                <Home recipes={items} searchString={this.state.searchString} />
              )}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
