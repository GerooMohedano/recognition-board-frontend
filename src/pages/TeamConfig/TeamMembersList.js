import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CommonProfilePic from '../../images/profilepic.jpg';

require('../../commons/Team.css');

class TeamMembersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialogDelete: false,
      nameToDelete: '',
      idToDelete: -1,
    };
  }

  toggleDeleteDialogState = (valueId, name, state) => {
    this.setState({
      idToDelete: valueId,
      nameToDelete: name,
      openDialogDelete: state
    });
  }

  render() {
    const { openDialogDelete, idToDelete, nameToDelete } = this.state;
    const { members, deleteMember } = this.props;
    return (
      <div className="cardContainer">
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Team Members
            </Typography>
            <List component="nav">
              {members.map(member => (
                <ListItem>
                  <ListItemText inset primary={member.name} className="textOfList" />
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={CommonProfilePic} />
                  </ListItemAvatar>
                  <Tooltip title="Kick out">
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.toggleDeleteDialogState(member.id, member.name, true)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
        <Dialog
          open={openDialogDelete}
          onClose={() => this.toggleDeleteDialogState(-1, '', false)}
        >
          <DialogTitle id="form-dialog-title">
            {`Are you sure you want to kick out ${nameToDelete} from the team?`}
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => this.toggleDeleteDialogState(-1, '', false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {deleteMember(idToDelete); this.toggleDeleteDialogState(-1, '', false)}}
              color="secondary"
            >
              Kick out
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

TeamMembersList.propTypes = {
  members: PropTypes.array.isRequired,
  deleteMember: PropTypes.func.isRequired
};

export default TeamMembersList;
