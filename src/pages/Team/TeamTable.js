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
      activeStatus: '',
      valueId: -1
    };
  }

  createColumns = () => {
    const { classes, members } = this.props;
    const columns = [<TableCell className={classes.header}>Valores</TableCell>];
    members.forEach(person => {
      if (person.estado === 'activo') {
        columns.push(<TableCell className={classes.header} align="right">{ person.nombre_usuario }</TableCell>);
      }
    });
    return columns;
  }

  createRows = () => {
    const { classes, values, enterpriseValues, members } = this.props;
    const rows = [];
    values.forEach(value => {
      if (value.estado === 'activo') {
        rows.push(<TableRow key={ value.nombre_valor }>
          <TableCell className={classes.firstColumn}>{ value.nombre_valor }</TableCell>
          {members.map(persona => {
            if (persona.estado === 'activo')
            return (
              <TableCell align="right">
                <Button
                key={"button" + value.nombre_valor + persona.nombre_usuario}
                onClick={() => this.handleCreateNoteButton(value, persona)}
                >
                  <ThumbsUpDown />
                </Button>
              </TableCell>
            )
          })}
        </TableRow>);
      }
    });
    enterpriseValues.forEach(value => {
      if (values.findIndex(teamValue => teamValue.idValor === value.idValor) === -1) {
        rows.push(<TableRow key={ value.Valor }>
          <TableCell className={classes.firstColumn}>{ value.Valor }</TableCell>
          {members.map(persona => {
            if (persona.estado === 'activo')
            return(<TableCell align="right">
              <Button
                key={"button" + value.Valor + persona.nombre_usuario}
                onClick={() => this.handleCreateNoteButtonEnterprise(value, persona)}
              >
                <ThumbsUpDown />
              </Button>
            </TableCell>)
          })}
        </TableRow>);
      }
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
      activeStatus: persona.estado,
      valueId: value.idValor
    });
    this.props.getNotes({ idUsuario: persona.idUsuario, idValor: value.idValor, idPizarra: indexPizarra });
  }

  handleCreateNoteButtonEnterprise = (value, persona) => {
    const { indexPizarra } = this.props;
    this.setState({
      openCreateNote: true,
      valueName: value.Valor,
      userName: persona.nombre_usuario,
      userId: persona.idUsuario,
      activeStatus: persona.estado,
      valueId: value.idValor
    });
    this.props.getNotes({ idUsuario: persona.idUsuario, idValor: value.idValor, idPizarra: indexPizarra });
  }

  handleCloseDialog = () => this.setState({ openCreateNote: false });

  render() {
    const { openCreateNote, valueName, userName, userId, valueId, activeStatus } = this.state;
    const {
      classes, gettingNotes, notes, createNote, deleteNote, idTeam,
      indexPizarra, beginDate, endDate, loginInfo, checkAwards, idEmpresa
    } = this.props;
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
          user={{ id: userId, name: userName, activeStatus: activeStatus }}
          openCreateNote={openCreateNote}
          handleCloseDialog={this.handleCloseDialog}
          gettingNotes={gettingNotes}
          indexPizarra={indexPizarra}
          endDate={endDate}
          beginDate={beginDate}
          notes={notes}
          createNote={createNote}
          deleteNote={deleteNote}
          loginInfo={loginInfo}
          checkAwards={checkAwards}
          idTeam={idTeam}
          idEmpresa={idEmpresa}
        />
      </Paper>
    );
  }
}

TeamTable.propTypes = {
  classes: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
  values: PropTypes.array.isRequired,
  enterpriseValues: PropTypes.array.isRequired,
  gettingNotes: PropTypes.bool.isRequired,
  notes: PropTypes.shape({}).isRequired,
  indexPizarra: PropTypes.number.isRequired,
  endDate: PropTypes.string.isRequired,
  beginDate: PropTypes.string.isRequired,
  getNotes: PropTypes.func.isRequired,
  createNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  checkAwards: PropTypes.func.isRequired,
  idTeam: PropTypes.number.isRequired,
  idEmpresa: PropTypes.number.isRequired,
  loginInfo: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(TeamTable);
