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
import CreateIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Clear';
import SprintDialog from './SprintDialog';

require('./SprintEditor.css');

const TIME_FOR_DATE = 'T00:00:00.000Z';

class SprintEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newDialog: false,
      editDialog: false,
      deleteDialog: false,
      editableNewSprintName: this.props.sprintName,
      editableNewBeginDate: this.props.beginDate.split('T')[0],
      editableNewEndDate: this.props.endDate.split('T')[0]
    }
  }

  hanldleDialogClose = (dialogDefinition) => {
    this.setState({ [dialogDefinition]: false });
  }

  handleDialogOpen = (dialogDefinition) => {
    this.setState({ [dialogDefinition]: true });
  }

  updateSprintInfo = (field, value) => {
    this.setState({ [field]: value });
  }

  saveEditableInfo = () => {
    const { editableNewSprintName, editableNewBeginDate, editableNewEndDate } = this.state;
    const { modifySprint, sprintId } = this.props;
    modifySprint({
      idPizarra: sprintId,
      titulo: editableNewSprintName,
      fechaInicio: editableNewBeginDate + TIME_FOR_DATE,
      fechaFin: editableNewEndDate + TIME_FOR_DATE
    })
  }

  render() {
    const {
      newDialog, editDialog, deleteDialog,
      editableNewSprintName, editableNewBeginDate, editableNewEndDate
    } = this.state;
    const { sprintName, editSprintInformation, beginDate, endDate, modifySprint } = this.props;
    return (
      <div className="sprintToolBar">
        <Tooltip title="Create a new Sprint">
          <IconButton onClick={() => this.handleDialogOpen('newDialog')}>
            <CreateIcon style={{ color: 'black' }} />
          </IconButton>
        </Tooltip>
        <SprintDialog
          handleClose={() => this.hanldleDialogClose('newDialog')}
          open={newDialog}
          dialogType="newDialog"
          editSprintInformation={editSprintInformation}
          beginDate={beginDate}
          endDate={endDate}
        />
        <Tooltip title="Edit current Sprint">
          <IconButton onClick={() => this.handleDialogOpen('editDialog')}>
            <EditIcon style={{ color: 'black' }} />
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
        </Dialog>
        <Tooltip title="Delete current Sprint">
          <IconButton onClick={() => this.handleDialogOpen('deleteDialog')}>
            <DeleteIcon style={{ color: 'black' }} />
          </IconButton>
        </Tooltip>
        <SprintDialog
          handleClose={() => this.hanldleDialogClose('deleteDialog')}
          open={deleteDialog}
          dialogType="deleteDialog"
          sprintName={sprintName}
        />
      </div>
    );
  }
}

SprintEditor.propTypes = {
  sprintId: PropTypes.number.isRequired,
  sprintName: PropTypes.string.isRequired,
  editSprintInformation: PropTypes.func.isRequired,
  beginDate: PropTypes.string.isRequired,
  modifySprint: PropTypes.func.isRequired,
  endDate: PropTypes.string.isRequired
};

export default SprintEditor;
