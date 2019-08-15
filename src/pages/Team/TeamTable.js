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

class TeamTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateNote: false,
      valueName: '',
      userName: '',
      userId: -1,
      valueId: -1
    };
  }

  createColumns = () => {
    const { classes, members } = this.props;
    const columns = [<TableCell className={classes.header}>Valores</TableCell>];
    members.forEach(person => {
      columns.push(<TableCell className={classes.header} align="right">{ person.nombre_usuario }</TableCell>);
    });
    return columns;
  }

  createRows = () => {
    const { classes, values, members } = this.props;
    const rows = [];
    values.forEach(value => {
      rows.push(<TableRow key={ value.nombre_valor }>
        <TableCell className={classes.firstColumn}>{ value.nombre_valor }</TableCell>
        {members.map(persona => (
          <TableCell align="right">
            <Button
              key={"button" + value.nombre_valor + persona.nombre_usuario}
              onClick={() => this.handleCreateNoteButton(value, persona)}
            >
              <ThumbsUpDown />
            </Button>
          </TableCell>
        ))}
      </TableRow>);
    });
    return rows;
  }

  handleCreateNoteButton = (value, persona) => {
    const { indexPizarra } = this.props;
    this.setState({
      openCreateNote: true,
      valueName: value.nombre_valor,
      userName: persona.nombre_usuario,
      userId: persona.idUsuario,
      valueId: value.idValor
    });
    this.props.getNotes({ idUsuario: persona.idUsuario, idValor: value.idValor, idPizarra: indexPizarra });
  }

  handleCloseDialog = () => this.setState({ openCreateNote: false });

  render() {
    const { openCreateNote, valueName, userName, userId, valueId } = this.state;
    const { classes, gettingNotes, notes, indexPizarra, createNote, deleteNote } = this.props;
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
        <ViewNotes
          value={{ id: valueId, name: valueName }}
          user={{ id: userId, name: userName }}
          openCreateNote={openCreateNote}
          handleCloseDialog={this.handleCloseDialog}
          gettingNotes={gettingNotes}
          indexPizarra={indexPizarra}
          notes={notes}
          createNote={createNote}
          deleteNote={deleteNote}
        />
      </Paper>
    );
  }
}

TeamTable.propTypes = {
  classes: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
  values: PropTypes.array.isRequired,
  gettingNotes: PropTypes.bool.isRequired,
  notes: PropTypes.shape({}).isRequired,
  indexPizarra: PropTypes.number.isRequired,
  getNotes: PropTypes.func.isRequired,
  createNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired
};

export default withStyles(styles)(TeamTable);
