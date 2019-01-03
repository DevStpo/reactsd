import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

class EditableField extends Component {
  state = {
    isEditing: false,
    value: ""
  };

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value}, ()=>console.log(this.state));
  }

  onClick = e => {
    if(e.target.classList.contains("editableField")) {
      this.setState({isEditing: !this.state.isEditing, value: this.props.value})
    }
  }

  render() {

    let fieldToRender = '';
    switch(this.props.fieldType) {
      case 'text':
        fieldToRender = <input type="text" name="value" value={this.state.value} onChange={this.onChange} />;
    }
    const { classes } = this.props;
    const field = this.state.isEditing ?
      fieldToRender :
      this.props.value;

    return (
      <span onClick={(e)=>this.onClick(e)} className="editableField">{field}</span>
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

EditableField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditableField);
