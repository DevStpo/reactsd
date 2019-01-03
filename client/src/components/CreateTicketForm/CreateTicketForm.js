import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

class CreateTicketForm extends Component {

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.fields!==this.props.fields) {
      let fields = [];
      for(let field of this.props.fields) {
        fields[field.name] = "";
      }
      this.props.setFieldValues(fields);
    }
  }

  handleChange = (fieldName, e) => {
    this.props.handleFieldValuesChange(fieldName, e);
  }

  createField = field => {
    switch(field.fieldType) {
      case 'text':
        return <TextField
          key={field.name}
          id={field.name}
          label={field.name}
          type="text"
          name={field.name}
          value={this.props.fieldValues[field.name]}
          onChange={(e)=>this.handleChange(field.name, e)}
          fullWidth
          />
        break;
      case 'date':
        return <TextField
          key={field.name}
          id={field.name}
          label={field.name}
          type="date"
          name={field.name}
          value={this.props.fieldValues[field.name]}
          onChange={(e)=>this.handleChange(field.name, e)}
          fullWidth
          />
      break;
    }

  }

  render() {

    const { fields, fieldValues } = this.props;

    return (
      <React.Fragment>
        {(Object.keys(fieldValues).length > 0) && fields.map(field=>this.createField(field))}
      </React.Fragment>
    );

  }
}

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

CreateTicketForm.propTypes = {
  classes: PropTypes.object.isRequired,
  fieldValues: PropTypes.object.isRequired,
  setFieldValues: PropTypes.func.isRequired,
  handleFieldValuesChange: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired
};

export default withStyles(styles)(CreateTicketForm);
