import React from "react";
import Highlight from "./Highlight";
import { slugify } from "../helpers";
import { Link } from "react-router-dom";

const RecipeItem = ({ recipe, searchString }) => {
  if (recipe !== undefined) {
    var ingredients =
      Highlight(searchString, recipe.ingredients) === ""
        ? (ingredients = recipe.ingredients)
        : Highlight(searchString, recipe.ingredients);
    var title =
      Highlight(searchString, recipe.title) === ""
        ? (title = recipe.title)
        : Highlight(searchString, recipe.title);

    return (
      <div className="col-sm-3 mt-4">
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={`/recipe/${slugify(recipe.title)}`}
        >
          <div className="card">
            <img
              className="card-img-top img-fluid"
              src={recipe.thumbnail}
              alt=""
            />
            <div className="card-body">
              <h5
                className="card-title"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <div className="card-text">
                <strong>Ingredients: </strong>
                <div dangerouslySetInnerHTML={{ __html: ingredients }} />
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  } else {
    return <div />;
  }
};

export default RecipeItem;
