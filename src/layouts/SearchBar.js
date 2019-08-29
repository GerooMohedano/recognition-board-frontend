import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { NavLink } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import CommonProfilePic from '../images/profilepic.jpg';
import TeamCatPic from '../images/macri.jpg';

require('./AppLayout.css');

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});

class SearchBar extends React.Component {
  state = {
    isOpen: false,
    searchedString: ''
  };

  componentDidUpdate(prevProps, prevState) {
    const { isOpen } = this.state;
    const { userInfo, fetchGeneralUserInfo, fetchGeneralAdminInfo, idUser, adminGeneral } = this.props;
    if (prevState.isOpen !== isOpen && isOpen && (!userInfo || userInfo.length !== 0)) {
      if (adminGeneral) {
        fetchGeneralAdminInfo();
      } else {
        fetchGeneralUserInfo({ idUsuario: idUser });
      }
    }
  }

  updateSearch = value => {
    this.setState({ searchedString: value, isOpen: value.length < 3 ? false : true });
  }

  render() {
    const { classes, fetchingGeneralUserInfo, userInfo, adminGeneral } = this.props;
    const { isOpen, searchedString } = this.state;
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          defaultValue={searchedString}
          onChange={event => this.updateSearch(event.target.value)}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
        {isOpen
        && (
          <Paper className={classes.paper} square>
            <List component="nav">
              <ListItem className="searchBarTitleCont">
                <ListItemText
                  inset
                  className="searchBarTitle"
                  primary="Users"
                />
              </ListItem>
              {(fetchingGeneralUserInfo || userInfo === undefined)
                ? (
                  <div className="circularProgressContainer"><CircularProgress /></div>
                ) : userInfo.data.usuariosEmpresa.filter(person => (person.nombre_usuario.includes(searchedString)
                  || person.mail.includes(searchedString)) && (adminGeneral || person.estado === 'activo')).map(person => {
                    return (
                    <NavLink to={`/Perfil/${person.idUsuario}`} className="linkPerfil">
                      <ListItem button onClick={() => this.updateSearch('')}>
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src={CommonProfilePic} />
                        </ListItemAvatar>
                        <ListItemText
                          inset
                          primary={`${person.nombre_usuario} (${person.mail})`}
                        />
                      </ListItem>
                    </NavLink>
                  )})
              }
            </List>
            <Divider />
            <List component="nav">
              <ListItem className="searchBarTitleCont">
                <ListItemText
                  inset
                  className="searchBarTitle"
                  primary="Teams"
                />
              </ListItem>
              {(fetchingGeneralUserInfo || userInfo === undefined)
                ? (
                  <div className="circularProgressContainer"><CircularProgress /></div>
                ) : userInfo.data.equiposDeEmpresa.filter(team => (team.nombre_equipo
                  .includes(searchedString) && (adminGeneral || team.estado === 'activo'))).map(team => (
                    <NavLink to={`/Team/${team.idEquipo}`} className="linkPerfil">
                      <ListItem button onClick={() => this.updateSearch('')}>
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src={TeamCatPic} />
                        </ListItemAvatar>
                        <ListItemText
                          inset
                          primary={team.nombre_equipo}
                        />
                      </ListItem>
                    </NavLink>
                  ))
              }
            </List>
          </Paper>
        )}
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
  userInfo: PropTypes.shape({}).isRequired,
  fetchingGeneralUserInfo: PropTypes.bool.isRequired,
  fetchGeneralUserInfo: PropTypes.func.isRequired,
  fetchGeneralAdminInfo: PropTypes.func.isRequired,
  idUser: PropTypes.number.isRequired,
  adminGeneral: PropTypes.bool.isRequired
};

export default withStyles(styles)(SearchBar);
