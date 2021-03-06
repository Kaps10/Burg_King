import React, { Component } from "react";
import axios from "../../../axios-orders";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import Input from "../../../components/UI/Forms/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidation } from "../../../shared/utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "email",
        elementConfig: {
          type: "text",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Postal Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      deliveryType: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "standard", displayValue: "Standard" },
            { value: "prime", displayValue: "Prime" },
          ],
        },
        value: "standard",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    // Creating 'Firebase' object
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onBurgerOrder(order, this.props.token);

    // console.log(this.props.ingredients);
  };

  // Cloning the form data and storing them in a new array
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidation(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
        touched: true,
      }
    );

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifiers in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}

        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Fill up the form</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBurgerOrder: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
