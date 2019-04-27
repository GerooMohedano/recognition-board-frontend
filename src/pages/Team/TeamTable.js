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
import Dialog from '@material-ui/core/Dialog';
import ThumbsUpDown from '@material-ui/icons/ThumbsUpDown';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
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
    const columns = [<TableCell>Valores</TableCell>];
    personas.forEach(person => {
      columns.push(<TableCell align="right">{ person }</TableCell>);
    });
    return columns;
  }

  createRows = () => {
    const { openCreateNote } = this.state;
    const rows = [];
    values.forEach(value => {
      rows.push(<TableRow key={ value }>
        <TableCell>{ value }</TableCell>
        {personas.map(persona => (
          <TableCell align="right">
            <Button
              key={"button" + value + persona}
              onClick={() => this.handleCreateNoteButton(value, persona, true)}
            >
              <ThumbsUpDown />
            </Button>
            <Dialog
              key={"dialog" + value + persona}
              open={openCreateNote[value][persona]}
              onClose={() => this.handleCreateNoteButton(value, persona, false)}
            >
              <h1>{value + ' ' + persona}</h1>
            </Dialog>
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
