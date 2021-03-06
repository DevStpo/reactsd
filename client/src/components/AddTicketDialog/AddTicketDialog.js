import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTicket } from '../../actions/ticketActions';
import { getTicketTypes, getTicketType } from '../../actions/ticketTypeActions';
import { withStyles } from '@material-ui/core/styles';

import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import CreateTicketForm from '../CreateTicketForm/CreateTicketForm';

class AddTicketDialog extends Component {
  state = {
    open: false,
    title: "",
    firstScreenOpen: true,
    ticketType: "",
    fields: {},
    workflow: {},
    status: ""
  };

  componentDidMount() {
    this.props.getTicketTypes();
  }

  handleClick = type => {
    switch(type) {
      case "open":
        this.setState({ open: true });
        break;
      case "close":
        this.setState({ open: false });
        break;
    }
  }

  onSubmit = e => {
    e.preventDefault();
    let fieldValues = {
      fields: {...this.state.fields},
      ticketType: this.state.ticketType,
      workflow: this.state.workflow,
      workflowStep: 0,
      status: this.state.status
    }
    this.props.addTicket(fieldValues);
  }

  onTicketTypeSelect = (ticketType, workflow, status) => {
    this.setState({ticketType, workflow, status, firstScreenOpen: false});
    this.props.getTicketType(ticketType);
  }

  setFieldValues = fields => {
    this.setState((prevState) => ({
      fields: {...prevState.fields, ...fields},
    }));
  }

  handleFieldValuesChange = (fieldName, e) => {
    let fieldValues = {...this.state.fields};
    fieldValues[fieldName] =  e.target.value;
    this.setState({ fields: fieldValues })
  }

  render() {

    const { classes } = this.props;
    const { firstScreenOpen, ticketType } = this.state;
    const { ticketTypes,
            selectedTicketType: {
              fields = [],
              workflow: {
                _id : workflowId = "",
                workflow = []
              } = {}
            }
          } = this.props.ticketType;

    return (
      <React.Fragment>
        <Button variant="fab" color="primary" aria-label="Add" onClick={this.handleClick.bind(this, "open")} className={classes.fab}>
          <AddIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClick.bind(this, "close")}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title">Create new Ticket</DialogTitle>
          {(firstScreenOpen) &&
            <DialogContent>
              <DialogContentText>Which Ticket type would you like to create?</DialogContentText>
              {ticketTypes.map(ticketType => {
                const workflow = ticketType.workflow.workflow ?
                  ticketType.workflow.workflow[0][0] :
                  "none";
                return(
                  <Card key={ticketType._id} className={classes.card}
                    onClick={this.onTicketTypeSelect.bind(this,
                      ticketType._id,
                      ticketType.workflow._id,
                      workflow)}>
                    <CardContent>{ticketType.ticketTypeName}</CardContent>
                  </Card>
                );
              })}
            </DialogContent>
          }
          <form onSubmit={this.onSubmit}>
            {(!firstScreenOpen) &&
              <DialogContent>
                <CreateTicketForm
                  fieldValues={this.state.fields}
                  setFieldValues={this.setFieldValues}
                  handleFieldValuesChange={this.handleFieldValuesChange}
                  fields={fields} />
              </DialogContent>
            }
            <DialogActions>
              <Button onClick={this.handleClick.bind(this, "close")} color="primary">Cancel</Button>
              <ButtonBase onClick={this.handleClick.bind(this, "close")} color="primary" type="submit">Create</ButtonBase>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

AddTicketDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  getTicketTypes: PropTypes.func.isRequired,
  getTicketType: PropTypes.func.isRequired,
  addTicket: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  ticket: state.ticket,
  ticketType: state.ticketType
});

export default connect(mapStateToProps, { addTicket, getTicketTypes, getTicketType })(withStyles(styles)(AddTicketDialog));
