import React, { Component } from 'react';
import _ from 'lodash';

import serialize from 'form-serialize';
import validate from '../../utils/validator/validate';
import flatten from '../../utils/flatten';
import classNames from '../../utils/classNames';

import './Form.css';


export class Form extends Component {
  componentDidMount() {
    this.validate();
  }

  submitForm(event) {
    event.preventDefault();

    if (this.validate()) {
      const { onSubmit } = this.props;

      onSubmit({
        body: this.formData(),
      });
    }
  }

  formData() {
    return serialize(this.form, { hash: true, empty: true });
  }

  validate() {
    const { isValid } = validate(this.formData(), this.getRules());

    this.props.onValidationChange(isValid);

    return isValid;
  }

  buildRules(children) {
    return children.map((child) => {
      if (_.get(child, 'props.children', false)) {
        return this.buildRules(_.castArray(child.props.children));
      }

      if (child.props && child.props.rules) {
        return {
          name: child.props.name,
          rules: child.props.rules,
        };
      }
    });
  }

  getRules() {
    return flatten(this.buildRules(this.props.children))
    .filter((field) => field !== undefined)
    .reduce((ruleGroup, { name, rules: fieldRules }) => {
      return {
        ...ruleGroup,
        [name]: fieldRules,
      };
    }, {});
  }

  enhanceChild() {
    return {
      onBlur: () => {
        return this.validate();
      },
      onChange: () => {
        return this.validate();
      }
    }
  }

  enhanceChildren(children) {
    return React.Children.map(children, (child) => {
      if (_.get(child, 'props.children', false)) {
        return React.cloneElement(child, {
          children: this.enhanceChildren(child.props.children)
        });
      }

      if (_.get(child, 'props', false) && child.props.rules !== undefined) {
        return React.cloneElement(child, this.enhanceChild());
      }

      return child;
    });
  }

  render() {
    const enhancedChildren = this.enhanceChildren(this.props.children);
    const { className } = this.props;

    return (
      <form
        className={classNames('Form', className)}
        ref={(form) => this.form = form}
        onSubmit={(event) => this.submitForm(event)}
      >
        {enhancedChildren}
      </form>
    );
  }
}

Form.defaultProps = {
  onSubmit: () => {},
  onValidationChange: () => {},
};

export default Form;