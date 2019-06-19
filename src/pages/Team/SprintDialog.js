import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import InputBase from '@material-ui/core/InputBase';

require('./SprintEditor.css');

class SprintDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSprintName: '',
      beginDate: '',
      endDate: ''
    }
  }

  editNewSprintInformation = (value, definition) => {
    this.setState({ [definition]: value })
  }

  createNewSprint = () => {
    console.log('create this', this.state);
    this.props.handleClose();
  }

  deleteSprint = () => {
    console.log('burn them all');
    this.props.handleClose();
  }


  render() {
    const {
      sprintName, handleClose, open, dialogType, editSprintInformation, beginDate, endDate
    } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="form-dialog-title">
          { dialogType === 'deleteDialog'
          ?
            sprintName
          :
          (
            <InputBase
              placeholder="Sprint name"
              defaultValue={(sprintName !== undefined) ? sprintName : ''}
              onChange={ dialogType === 'newDialog'
                ? (event => this.editNewSprintInformation(event.target.value, 'newSprintName'))
                : (event => editSprintInformation(event.target.value, 'sprint'))
              }
            />
          )
          }
        </DialogTitle>
        <DialogContent>
          { dialogType === 'deleteDialog'
            ? 'Are you sure you want to delete this Sprint?'
            : (
              <div>
                <form noValidate>
                  <TextField
                    id="beginDate"
                    label="begin Date"
                    type="date"
                    defaultValue={dialogType === 'newDialog' ? '' : beginDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={
                      dialogType === 'newDialog'
                      ? (event) => this.editNewSprintInformation(event.target.value, 'beginDate')
                      : (event) => editSprintInformation(event.target.value, 'beginDate')
                    }
                  />
                </form>
                <form noValidate>
                  <TextField
                    id="endDdate"
                    label="end Date"
                    type="date"
                    defaultValue={dialogType === 'newDialog' ? '' : endDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={
                      dialogType === 'newDialog'
                      ? (event) => this.editNewSprintInformation(event.target.value, 'endDate')
                      : (event) => editSprintInformation(event.target.value, 'endDate')
                    }
                  />
                </form>
              </div>
            )
          }
        </DialogContent>
        { (dialogType !== 'editDialog')
          && (
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={
                  dialogType === 'deleteDialog'
                  ? () => this.deleteSprint()
                  : () => this.createNewSprint()
                }
                color={dialogType === 'deleteDialog' ? 'secondary' : 'primary'}
              >
                { dialogType === 'deleteDialog' ? 'Delete' : 'Create' }
              </Button>
            </DialogActions>
          )
        }
      </Dialog>
    );
  }
}

SprintDialog.propTypes = {
  sprintName: PropTypes.string,
  editSprintInformation: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  dialogType: PropTypes.string.isRequired,
  beginDate: PropTypes.string,
  endDate: PropTypes.string
};

export default SprintDialog;
