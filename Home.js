import React from "react";
import PropTypes from "prop-types";
import RecipeItem from "./RecipeItem";

const Home = ({
  recipes = this.props.recipes,
  searchString = this.props.searchString
}) => (
  <div className="row">
    {recipes.map(recipe => {
      return (
        <RecipeItem
          key={recipe.title}
          recipe={recipe}
          searchString={searchString}
        />
      );
    })}
  </div>
);

Home.propTypes = {
  searchString: PropTypes.string,
  recipes: PropTypes.array
};

export default Home;
