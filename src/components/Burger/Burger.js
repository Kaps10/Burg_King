import React from "react";

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  // console.log(props);
  /* Getting ingredients from BurgerBuilder.js file
    in form of array and storing them into an array. */
  let transformedIngredient = Object.keys(props.ingredients)
    .map((igKey) => {
      // An array with 2 elements
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient gerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredient.length === 0) {
    transformedIngredient = <p>Please add ingredients!</p>;
  }

  // console.log(transformedIngredient);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredient}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
