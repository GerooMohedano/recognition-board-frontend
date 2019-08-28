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
import DeleteIcon from '@material-ui/icons/Delete';

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
      author: 4,
      newNotePuntuation: 1
    };
  }

  createCardsWithNotes = () => {
    const { notes, gettingNotes, deleteNote, handleCloseDialog } = this.props;
    const { author } = this.state;
    const cards = [];
    if (notes !== undefined && notes.data !== undefined  && notes.data.data !== undefined && !gettingNotes) {
      notes.data.data.forEach(note => {
        const cardColor = note.puntuacion === 1 ? colorForGood : colorForBad;
        cards.push(
          <Card style={{ backgroundColor: cardColor }}>
            <CardContent>
              <div>
                <Typography className="cardParagraph" gutterBottom component="p">
                  {`from ${note.autor}`}
                </Typography>
                {note.puntuacion === 1
                  ? (<Mood className="noteCardIcon" />)
                  : (<MoodBad className="noteCardIcon" />)
                }
                {note.idUsuario === author
                && (
                  <Button
                    className="noteDeleteButton"
                    onClick={() => {deleteNote({ idNota: note.idNota }); this.decreateNewBlankNote(); handleCloseDialog()}}
                  >
                    <DeleteIcon style={{ color: 'white' }} />
                  </Button>
                )}
              </div>
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

  decreateNewBlankNote = () => {
    this.setState({ creatingNote: false });
  }

  handleBlankNoteWriting = () => event => {
    this.setState({ newNoteMessage: event.target.value });
  }

  handlePuntuationChange = () => event => {
    this.setState({ newNotePuntuation: event.target.checked ? -1 : 1 });
  }

  createNewNoteWithContext = () => {
    const { newNoteMessage, newNotePuntuation, author } = this.state;
    const { user, value, indexPizarra, createNote, handleCloseDialog, loginInfo } = this.props;
    createNote({
      nombre: indexPizarra,
      idAutor: loginInfo.data.data[0].idUsuario,
      idDestinatario: user.id,
      idValor: value.id,
      descripcion: newNoteMessage,
      puntuacion: newNotePuntuation
    });
    this.setState({ newNoteMessage: '', newNotePuntuation: 1 });
    handleCloseDialog();
    this.decreateNewBlankNote();
  }

  render() {
    const {
      classes, value, user, openCreateNote, handleCloseDialog,
      notes, gettingNotes, beginDate, endDate
    } = this.props;
    const { creatingNote, newNoteMessage, newNotePuntuation } = this.state;
    return (
      <Dialog
        key="dialog"
        open={openCreateNote}
        onClose={() => {handleCloseDialog(); this.decreateNewBlankNote()}}
      >
        <DialogTitle id="form-dialog-title">{value.name + ' - ' + user.name}</DialogTitle>
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
                  <Button onClick={() => {handleCloseDialog(); this.decreateNewBlankNote()}} color="primary">
                    Cancel
                  </Button>
                  <Button disabled={newNoteMessage === ''} onClick={() => this.createNewNoteWithContext()} color="primary">
                    Create
                  </Button>
                </DialogActions>
              </div>
            ) : (
              <Card>
                <CardActionArea
                  className="addNewCard"
                  onClick={() => this.createNewBlankNote()}
                  disabled={Date.now() < new Date(beginDate) || Date.now() > new Date(endDate)}
                >
                  {
                    Date.now() < new Date(beginDate) || Date.now() > new Date(endDate)
                    ? (<AddCircleOutline style={{ color: '#E0E0E0' }} />)
                    : (<AddCircleOutline style={{ color: 'black' }} />)
                  }
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
  value: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  openCreateNote: PropTypes.bool.isRequired,
  gettingNotes: PropTypes.bool.isRequired,
  indexPizarra: PropTypes.number.isRequired,
  endDate: PropTypes.string.isRequired,
  beginDate: PropTypes.string.isRequired,
  createNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  notes: PropTypes.shape({}).isRequired,
  loginInfo: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(ViewNotes);
