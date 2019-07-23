import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch'
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Mood from '@material-ui/icons/Mood';
import MoodBad from '@material-ui/icons/MoodBad';

require('./ViewNotes.css');

const colorForGood = '#659BFF';
const colorForBad = '#C670CC';

const styles = theme => ({
  moodIcon: {
    colorPrimary: {
      color: '#659BFF'
    },
    colorSecondary: {
      color: '#C670CC'
    }
  }
})

class ViewNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingNote: false,
      notes: [
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
      ],
      newNoteMessage: '',
      newNotePuntuation: 1,
      newNoteAuthor: 'Romy'
    };
  }

  createCardsWithNotes = () => {
    const { notes } = this.state;
    const cards = [];
    notes.forEach(note => {
      const cardColor = note.isGood ? colorForGood : colorForBad;
      cards.push(
        <Card style={{ backgroundColor: cardColor }}>
          <CardContent>
            <Typography className="cardParagraph" gutterBottom component="p">
              {`from ${note.author}`}
            </Typography>
            <Typography className="cardParagraph" component="p">
              {note.message}
            </Typography>
          </CardContent>
        </Card>
      );
    });
    return cards;
  }

  createNewBlankNote = () => {
    this.setState({ creatingNote: true });
  }

  handleBlankNoteWriting = () => event => {
    this.setState({ newNoteMessage: event.target.value });
  }

  handlePuntuationChange = () => event => {
    this.setState({ newNotePuntuation: event.target.checked ? -1 : 1 });
  }

  createNewNoteWithContext = () => {
    const { newNoteAuthor, newNoteMessage, newNotePuntuation } = this.state;
    this.setState(prevState => ({
      notes: [
        ...prevState.notes,
        {
          author: newNoteAuthor,
          message: newNoteMessage,
          isGood: newNotePuntuation === 1 ? true : false
        }
      ],
      newNoteMessage: ''
    }));
  }

  render() {
    const { classes, value, persona, openCreateNote, handleCreateNoteButton } = this.props;
    const { creatingNote, newNoteMessage, newNotePuntuation } = this.state;
    return (
      <Dialog
        key={"dialog" + value + persona}
        open={openCreateNote[value][persona]}
        onClose={() => handleCreateNoteButton(value, persona, false)}
      >
        <DialogTitle id="form-dialog-title">{value + ' ' + persona}</DialogTitle>
          <DialogContent className="notesContainer">
            {this.createCardsWithNotes()}
            {(creatingNote)
            ? (
              <div>
                <Card>
                  <CardContent>
                    <TextField
                      id="filled-multiline-flexible"
                      multiline
                      rowsMax="10"
                      value={newNoteMessage}
                      onChange={this.handleBlankNoteWriting()}
                      margin="normal"
                      helperText="Write here your feedback"
                      variant="outlined"
                    />
                    <div>
                      <Mood
                        className={classes.moodIcon}
                        color={(newNotePuntuation === 1) ? "primary" : "disabled"}
                      />
                      <Switch
                        checked={newNotePuntuation !== 1}
                        onChange={this.handlePuntuationChange()}
                        color="default"
                      />
                      <MoodBad
                        className={classes.moodIcon}
                        color={(newNotePuntuation !== 1) ? "secondary" : "disabled"}
                      />
                    </div>
                  </CardContent>
                </Card>
                <DialogActions>
                  <Button onClick={() => handleCreateNoteButton(value, persona, false)} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={() => this.createNewNoteWithContext()} color="primary">
                    Create
                  </Button>
                </DialogActions>
              </div>
            ) : (
              <Card>
                <CardActionArea className="addNewCard" onClick={() => this.createNewBlankNote()}>
                  <AddCircleOutline />
                </CardActionArea>
              </Card>
            )
          }
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

export default withStyles(styles)(ViewNotes);
