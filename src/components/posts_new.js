import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'  
//reduxForm is a function that is similar to the connect function from react-redux. It allows our component to talk directly to the redux store
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {createPost} from '../actions'


class PostsNew extends Component {

  renderField(field) {
    const {meta: {touched, error}} = field //destructuring to access properties on nested objects
    const className = `form-group ${touched && error} ? 'has-danger' : ''`
    
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input 
          className="form-control" 
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/')
    })
  }
  

  render() {
    const {handleSubmit} = this.props 

    return (
      <form className="newPost" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field 
          label="Title"
          name="title"  //Name describes the piece of state is this field is meant to change
          component={this.renderField} //Necessary because Field doesn't know how to show itself on the screen; only how to interact with Redux Form
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
        <Link to="/" className="btn btn-danger">Cancel</Link>        
      </form>
    )
  }
}


//pristine, touched, invalid = 3 states of form field

function validate(values) {
  const errors = {

  }
  //Validate the inputs from values
  if (!values.title) {
    errors.title = "Don't forget a title"
  }

  if (!values.categories) {
    errors.categories = "A post needs at least one category"
  }

  if (!values.content) {
    errors.content = "What would you like to say in your post?"
  }
  


  //If errors is empty, the form is fine to submit
  //If errors has *any* properties, redux form assumes form is invalid 
  return errors
}

export default reduxForm({
  validate,
  form: 'PostsNewForm' //essentially the name of the form; keeps us from merging state from multiple different forms (so make sure string is unique)
})(
  connect(null, {createPost})(PostsNew) 
)