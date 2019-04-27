import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

const notes = [
  {
    author: 'Gero',
    message: "She's an amazing person",
    isGood: true
  },
  {
    author: 'Poyo',
    message: "She's done a great job on GTD creation",
    isGood: true
  },
  {
    author: 'Marcio',
    message: "E muy inoperante la mina",
    isGood: false
  },
  {
    author: 'Romy',
    message: "Insert text in here",
    isGood: true
  }
];

class ViewNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingNote: true
    };
  }

  createCardsWithNotes = () => {
    const cards = [];
    notes.forEach(note => {
      cards.push(
        <Card>
          <CardContent>
            <Typography gutterBottom component="p">
              {`from ${note.author}`}
            </Typography>
            <Typography component="p">
              {note.message}
            </Typography>
          </CardContent>
        </Card>
      );
    });
    return cards;
  }

  render() {
    const { value, persona, openCreateNote, handleCreateNoteButton } = this.props;
    const { creatingNote } = this.state;
    return (
      <Dialog
        key={"dialog" + value + persona}
        open={openCreateNote[value][persona]}
        onClose={() => handleCreateNoteButton(value, persona, false)}
      >
        <DialogTitle id="form-dialog-title">{value + ' ' + persona}</DialogTitle>
          <DialogContent>
            {this.createCardsWithNotes()}
            <Card>
              <CardActionArea>
                <AddCircleOutline />
              </CardActionArea>
            </Card>
            {(creatingNote) && (
              <DialogActions>
                <Button onClick={() => handleCreateNoteButton(value, persona, false)} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => handleCreateNoteButton(value, persona, false)} color="primary">
                  Create
                </Button>
              </DialogActions>
            )}
          </DialogContent>
      </Dialog>
    );
  }
}

ViewNotes.propTypes = {
  value: PropTypes.string.isRequired,
  persona: PropTypes.string.isRequired,
  handleCreateNoteButton: PropTypes.func.isRequired,
  openCreateNote: PropTypes.shape({}).isRequired,
};

export default ViewNotes;
