import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'; // reduxForm lets us talk to the form reducer
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPost } from '../actions';

class PostsNew extends Component {
  // field.input is an obj w/event handlers & props like value, onfocus etc.
  // ...means I want all those properties on that object to be vs typing out:
  // onChange = {field.input.onChange}; onFocus={field.input.onFocus} etc...
  renderField(field) {
    const { meta: {touched, error} } = field;
    const className=`form-group ${(touched && error) ? 'has-danger': ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">{ (touched) ? error : ''}</div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      //programatic navigation "automatically navigate" the user around the app.
      this.props.history.push('/'); // The Route (in index.js) gives us this prop.
    });

  }

  render() {
    const { handleSubmit } = this.props; // let's pull off the handleSubmit property. It came from wiring up reduxForm to the component.

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
          />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>

    );
  }
}

/* returning an empty object means no errors were found.
 * If any properities are on the errors obj, form will not be submitted */
function validate(values) {
  // values -> { title: 'asdf', categories: 'asdf, content: 'asdf'}
  const errors = {};
  // Validate the inputs from the 'values' object
  if (!values.title) {
    errors.title = "Enter a title"
  }
  if (!values.categories) {
    errors.categories = "Enter a category"
  }
  if (!values.content) {
    errors.content = "Enter some content"
  }
  return errors;
}
// Let this component talk to the reducer.
// Adds a ton of additional properties to our component's props- including handleSubmit
export default reduxForm({
  validate,
  form: 'PostsNewForm'  //name of the form should be unique
})(
  connect(null, { createPost })(PostsNew) // returns a valid react compnoent and that becomes the input for the form helper.
);

/* if we had another form in the app under PostsEdit.js
export default reduxFrom ({
  form: 'PostsNewForm' -- all the state would be merged between the two b/c name is the same.
})(....)*/
