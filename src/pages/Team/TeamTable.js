import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ThumbsUpDown from '@material-ui/icons/ThumbsUpDown';
import ViewNotes from './ViewNotes';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: '24px 20px 20px 30px'
  },
  table: {
    minWidth: 700,
  },
  header: {
    backgroundColor: '#9DBEFA',
    fontWeight: 'bold'
  },
  firstColumn: {
    backgroundColor: '#D8A4DB',
    fontWeight: 'bold'
  }
});
const personas = ['Marcio', 'Magui', 'Pame', 'Facundo', 'Gero'];
const values = ['Be Accountable', 'Be Professional', 'Be Proactive', 'Be Collaborative', 'Be Hardito'];

class TeamTable extends React.Component {
  constructor(props) {
    super(props);
    const openCreateNote = this.initializeDialogState();
    this.state = {
      openCreateNote
    };
  }

  initializeDialogState = () => {
    const auxCreateNoteState = {};
    values.forEach(value => {
      const stateByValue = {};
      personas.forEach(persona => {
        stateByValue[persona] = false;
      });
      auxCreateNoteState[value] = stateByValue;
    });
    return auxCreateNoteState;
  }

  createColumns = () => {
    const { classes } = this.props;
    const columns = [<TableCell className={classes.header}>Valores</TableCell>];
    personas.forEach(person => {
      columns.push(<TableCell className={classes.header} align="right">{ person }</TableCell>);
    });
    return columns;
  }

  createRows = () => {
    const { classes } = this.props;
    const { openCreateNote } = this.state;
    const rows = [];
    values.forEach(value => {
      rows.push(<TableRow key={ value }>
        <TableCell className={classes.firstColumn}>{ value }</TableCell>
        {personas.map(persona => (
          <TableCell align="right">
            <Button
              key={"button" + value + persona}
              onClick={() => this.handleCreateNoteButton(value, persona, true)}
            >
              <ThumbsUpDown />
            </Button>
            <ViewNotes
              value={value}
              persona={persona}
              openCreateNote={openCreateNote}
              handleCreateNoteButton={this.handleCreateNoteButton}
            />
          </TableCell>
        ))}
      </TableRow>);
    });
    return rows;
  }

  handleCreateNoteButton = (value, persona, stateOfOpen) => {
    this.setState(prevState => ({
      openCreateNote: {
        ...prevState.openCreateNote,
        [value]: {
          ...prevState.openCreateNote[value],
          [persona]: stateOfOpen
        }
      }
    }));
  }

  render() {
    const { classes } = this.props;
    const columns = this.createColumns();
    const rows = this.createRows();
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              { columns }
            </TableRow>
          </TableHead>
          <TableBody>
            { rows }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

TeamTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeamTable);
