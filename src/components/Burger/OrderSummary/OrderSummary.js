import React, { Component } from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";
import classes from "./OrderSummary.css";

class OrderSummary extends Component {
  // This could be a functional component, doesn't have to be a class.
  // componentWillUpdate() {
  //   console.log("[OrderSummary] WillUpdate.");
  // }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}:</span>{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );

    return (
      <Aux>
        <h3 className={classes.Font}>Order Summary</h3>
        <p>You selected following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          Total Price: <strong>${this.props.price.toFixed(2)} </strong>
        </p>
        <p>Continue to checkout ?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
