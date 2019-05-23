import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import ClearIcon from '@material-ui/icons/Clear';
import SprintDialog from './SprintDialog';

require('./SprintEditor.css');

class SprintEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newDialog: false,
      editDialog: false,
      deleteDialog: false
    }
  }

  hanldleDialogClose = (dialogDefinition) => {
    this.setState({ [dialogDefinition]: false });
  }

  handleDialogOpen = (dialogDefinition) => {
    this.setState({ [dialogDefinition]: true });
  }

  render() {
    const { newDialog, editDialog, deleteDialog } = this.state;
    const { sprintName, editSprintInformation, beginDate, endDate } = this.props;
    return (
      <div className="sprintToolBar">
        <IconButton onClick={() => this.handleDialogOpen('newDialog')}>
          <AddIcon />
        </IconButton>
        <SprintDialog
          handleClose={() => this.hanldleDialogClose('newDialog')}
          open={newDialog}
          dialogType="newDialog"
          editSprintInformation={editSprintInformation}
          beginDate={beginDate}
          endDate={endDate}
        />
        <IconButton onClick={() => this.handleDialogOpen('editDialog')}>
          <CreateIcon />
        </IconButton>
        <SprintDialog
          handleClose={() => this.hanldleDialogClose('editDialog')}
          open={editDialog}
          dialogType="editDialog"
          sprintName={sprintName}
          editSprintInformation={editSprintInformation}
          beginDate={beginDate}
          endDate={endDate}
        />
        <IconButton onClick={() => this.handleDialogOpen('deleteDialog')}>
          <ClearIcon />
        </IconButton>
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
  sprintName: PropTypes.string.isRequired,
  editSprintInformation: PropTypes.func.isRequired,
  beginDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired
};

export default SprintEditor;
