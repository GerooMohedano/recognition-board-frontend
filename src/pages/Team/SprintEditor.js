import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import CreateIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';

require('./SprintEditor.css');

const TIME_FOR_DATE = 'T00:00:00.000Z';

class SprintEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newDialog: false,
      newSpinner: false,
      newSnackbar: false,
      editDialog: false,
      editSpinner: false,
      editSnackbar: false,
      deleteDialog: false,
      newSprintName: '',
      newBeginDate: '',
      newEndDate: '',
      editableNewSprintName: this.props.sprintName,
      editableNewBeginDate: this.props.beginDate.split('T')[0],
      editableNewEndDate: this.props.endDate.split('T')[0]
    }
  }

  componentDidUpdate(prevProps) {
    const {
      newSprintName, newBeginDate, newEndDate, newSpinner,
      editableNewSprintName, editableNewBeginDate, editableNewEndDate, editSpinner
    } = this.state;
    const { checkingSprint, sprintChecked, idEquipo, sprintId, createSprint, modifySprint } = this.props;
    if (prevProps.sprintChecked !== sprintChecked && sprintChecked && sprintChecked.data.status === 'OK' && newSpinner) {
      this.setState({ newSpinner: false });
      if (sprintChecked.data.data.length === 0) {
        createSprint({
          titulo: newSprintName,
          idEquipo: idEquipo,
          fechaInicio: newBeginDate + TIME_FOR_DATE,
          fechaFin: newEndDate + TIME_FOR_DATE
        });
      } else {
        this.setState({ newSnackbar: true });
      }
    }
    if (prevProps.sprintChecked !== sprintChecked && sprintChecked && sprintChecked.data.status === 'OK' && editSpinner) {
      this.setState({ editSpinner: false });
      if (sprintChecked.data.data.length === 0) {
        modifySprint({
          idPizarra: sprintId,
          titulo: editableNewSprintName,
          fechaInicio: editableNewBeginDate + TIME_FOR_DATE,
          fechaFin: editableNewEndDate + TIME_FOR_DATE
        });
      } else {
        this.setState({ editSnackbar: true });
      }
    }
  }

  hanldleDialogClose = dialogDefinition => {
    this.setState({ [dialogDefinition]: false });
  }

  handleDialogOpen = dialogDefinition => {
    this.setState({ [dialogDefinition]: true });
  }

  updateSprintInfo = (field, value) => {
    this.setState({ [field]: value });
  }

  saveEditableInfo = () => {
    const { editableNewBeginDate, editableNewEndDate } = this.state;
    const { checkSprint, sprintId } = this.props;
    this.setState({ editSpinner: true });
    checkSprint({
      idPizarra: sprintId,
      fechaInicio: editableNewBeginDate + TIME_FOR_DATE,
      fechaFin: editableNewEndDate + TIME_FOR_DATE
    });
  }

  createNewSprint = () => {
    const { newBeginDate, newEndDate } = this.state;
    const { checkSprint } = this.props;
    this.setState({ newSpinner: true });
    checkSprint({
      idPizarra: -1,
      fechaInicio: newBeginDate + TIME_FOR_DATE,
      fechaFin: newEndDate + TIME_FOR_DATE
    });
  }

  deleteSprintSelected = () => {
    const { deleteSprint, sprintId } = this.props;
    deleteSprint({ idPizarra: sprintId });
  }

  render() {
    const {
      newDialog, editDialog, deleteDialog,
      newSpinner, newSnackbar, editSpinner, editSnackbar,
      newSprintName, newBeginDate, newEndDate,
      editableNewSprintName, editableNewBeginDate, editableNewEndDate
    } = this.state;
    const { sprintName, isUserTeamAdmin, checkingSprint, sprintChecked, adminGeneral } = this.props;
    return (
      <div className="sprintToolBar">
        <Tooltip title="Create a new Sprint">
          <IconButton disabled={!isUserTeamAdmin && !adminGeneral} onClick={() => this.handleDialogOpen('newDialog')}>
            {(isUserTeamAdmin || adminGeneral)
              ? (<CreateIcon style={{ color: 'black' }} />)
              : (<CreateIcon style={{ color: '#E0E0E0' }} />)
            }
          </IconButton>
        </Tooltip>
        <Dialog
          open={newDialog}
          onClose={() => this.hanldleDialogClose('newDialog')}
        >
          <DialogTitle id="form-dialog-title">
            <InputBase
              placeholder="Sprint name"
              defaultValue={newSprintName}
              onChange={event => this.updateSprintInfo('newSprintName', event.target.value)}
            />
          </DialogTitle>
          {newSpinner
            ? (<div className="circularProgressContainer"><CircularProgress /></div>)
            : (
              <div>
                <DialogContent>
                  <div>
                    <form noValidate>
                      <TextField
                        id="beginDate"
                        label="begin Date"
                        type="date"
                        defaultValue={newBeginDate}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={event => this.updateSprintInfo('newBeginDate', event.target.value)}
                      />
                    </form>
                    <form noValidate>
                      <TextField
                        id="endDdate"
                        label="end Date"
                        type="date"
                        defaultValue={newEndDate}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={event => this.updateSprintInfo('newEndDate', event.target.value)}
                      />
                    </form>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => this.hanldleDialogClose('newDialog')} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => this.createNewSprint()}
                    color="primary"
                  >
                    Create
                  </Button>
                </DialogActions>
              </div>
            )}
        </Dialog>
        <Tooltip title="Edit current Sprint">
          <IconButton disabled={!isUserTeamAdmin && !adminGeneral} onClick={() => this.handleDialogOpen('editDialog')}>
            {(isUserTeamAdmin || adminGeneral)
              ? (<EditIcon style={{ color: 'black' }} />)
              : (<EditIcon style={{ color: '#E0E0E0' }} />)
            }
          </IconButton>
        </Tooltip>
        <Dialog
          open={editDialog}
          onClose={() => this.hanldleDialogClose('editDialog')}
        >
          <DialogTitle id="form-dialog-title">
            <InputBase
              placeholder="Sprint name"
              defaultValue={editableNewSprintName}
              onChange={event => this.updateSprintInfo('editableNewSprintName', event.target.value)}
            />
          </DialogTitle>
          {editSpinner
            ? (<div className="circularProgressContainer"><CircularProgress /></div>)
            : (<div>
              <DialogContent>
              <div>
                <form noValidate>
                  <TextField
                    id="beginDate"
                    label="begin Date"
                    type="date"
                    defaultValue={editableNewBeginDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={event => this.updateSprintInfo('editableNewBeginDate', event.target.value)}
                  />
                </form>
                <form noValidate>
                  <TextField
                    id="endDdate"
                    label="end Date"
                    type="date"
                    defaultValue={editableNewEndDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={event => this.updateSprintInfo('editableNewEndDate', event.target.value)}
                  />
                </form>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.hanldleDialogClose('editDialog')} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => this.saveEditableInfo()}
                color="primary"
              >
                Save
              </Button>
            </DialogActions>
          </div>)
        }
        </Dialog>
        <Tooltip title="Delete current Sprint">
          <IconButton disabled={!isUserTeamAdmin && !adminGeneral} onClick={() => this.handleDialogOpen('deleteDialog')}>
            {(isUserTeamAdmin || adminGeneral)
              ? (<DeleteIcon style={{ color: 'black' }} />)
              : (<DeleteIcon style={{ color: '#E0E0E0' }} />)
            }
          </IconButton>
        </Tooltip>
        <Dialog
          open={deleteDialog}
          onClose={() => this.hanldleDialogClose('deleteDialog')}
        >
          <DialogTitle id="form-dialog-title">
            {sprintName}
          </DialogTitle>
          <DialogContent>
            Are you sure you want to delete this Sprint?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.hanldleDialogClose('deleteDialog')} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => this.deleteSprintSelected()}
              color="secondary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          variant="error"
          open={newSnackbar}
          autoHideDuration={6000}
          onClose={() => this.setState({ newSnackbar: false})}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">There's already a Sprint on those dates</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="secondary"
              onClick={() => this.setState({ newSnackbar: false})}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          variant="error"
          open={editSnackbar}
          autoHideDuration={6000}
          onClose={() => this.setState({ editSnackbar: false})}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">There's already a Sprint on those dates</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="secondary"
              onClick={() => this.setState({ editSnackbar: false})}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

SprintEditor.propTypes = {
  sprintId: PropTypes.number.isRequired,
  idEquipo: PropTypes.number.isRequired,
  sprintName: PropTypes.string.isRequired,
  beginDate: PropTypes.string.isRequired,
  modifySprint: PropTypes.func.isRequired,
  createSprint: PropTypes.func.isRequired,
  deleteSprint: PropTypes.func.isRequired,
  endDate: PropTypes.string.isRequired,
  isUserTeamAdmin: PropTypes.bool.isRequired,
  checkSprint: PropTypes.func.isRequired,
  checkingSprint: PropTypes.bool.isRequired,
  sprintChecked: PropTypes.shape({}).isRequired,
  adminGeneral: PropTypes.bool.isRequired
};

export default SprintEditor;
