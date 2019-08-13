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
      newNoteMessage: '',
      newNotePuntuation: 1,
      newNoteAuthor: 'Romy'
    };
  }

  createCardsWithNotes = () => {
    const { notes, gettingNotes } = this.props;
    const cards = [];
    if (notes !== undefined && !gettingNotes) {
      notes.data.data.forEach(note => {
        const cardColor = note.puntuacion === 1 ? colorForGood : colorForBad;
        cards.push(
          <Card style={{ backgroundColor: cardColor }}>
            <CardContent>
              <Typography className="cardParagraph" gutterBottom component="p">
                {`from ${note.autor}`}
              </Typography>
              <Typography className="cardParagraph" component="p">
                {note.descripcion}
              </Typography>
            </CardContent>
          </Card>
        );
      });
      return cards;
    } else {
      return null;
    }
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

  createNewNoteWithContext = () => this.setState({ newNoteMessage: '' });

  render() {
    const {
      classes, value, user, openCreateNote, handleCloseDialog,
      notes, gettingNotes
    } = this.props;
    const { creatingNote, newNoteMessage, newNotePuntuation } = this.state;
    console.log(notes);
    return (
      <Dialog
        key="dialog"
        open={openCreateNote}
        onClose={() => handleCloseDialog()}
      >
        <DialogTitle id="form-dialog-title">{value + ' - ' + user}</DialogTitle>
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
                  <Button onClick={() => handleCloseDialog()} color="primary">
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
  values: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  openCreateNote: PropTypes.bool.isRequired,
  gettingNotes: PropTypes.bool.isRequired,
  notes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(ViewNotes);
