import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getViews, setCurrentView } from '../../actions/viewActions';
import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

class DataSelect extends Component {

  state = {
    value: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.handleChange(e.target.value)
  };

  render() {

    const { classes } = this.props;
    const { views } = this.props.view;
    const { options = [], label } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select">{label}</InputLabel>
          <Select
            value={this.state.value}
            onChange={(e)=>this.handleChange(e)}
            name="value"
          >
            {options.map(option =>
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            )}
          </Select>
        </FormControl>
      </form>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

DataSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  getViews: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  view: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  view: state.view
});

export default connect(mapStateToProps, { getViews, setCurrentView })(withStyles(styles)(DataSelect));
