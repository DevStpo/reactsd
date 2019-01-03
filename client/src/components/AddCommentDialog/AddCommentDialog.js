import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/commentActions';
import { withStyles } from '@material-ui/core/styles';

import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddCommentDialog extends Component {
  state = {
    open: false,
    description: ""
  };

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

  onSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      ticketId: this.props.ticket,
      description: this.state.description
    }
    this.props.addComment(newComment);
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <Button variant="contained" color="primary" aria-label="Add" onClick={this.handleClick.bind(this, "open")} className={classes.fab}>
          Add Comment
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClick.bind(this, "close")}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <form noValidate autoComplete="off"  onSubmit={(e) => this.onSubmit(e)}>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              name="description"
              fullWidth
              onChange={this.onChange}
            />

          <DialogActions>
            <Button onClick={this.handleClick.bind(this, "close")} color="primary">
              Cancel
            </Button>
            <ButtonBase onClick={this.handleClick.bind(this, "close")} color="primary" type="submit">
              Create
            </ButtonBase>

          </DialogActions>
          </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const mapStateToProps = state => ({
  comment: state.comment
});

export default connect(mapStateToProps, { addComment })(withStyles(styles)(AddCommentDialog));
