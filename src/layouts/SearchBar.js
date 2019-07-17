import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import CommonProfilePic from '../images/profilepic.jpg';
import TeamCatPic from '../images/macri.jpg';

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

const teams = [
  { id: 1, name: 'Eagles' },
  { id: 2, name: 'Octopus' },
  { id: 3, name: 'Turtles' },
  { id: 4, name: 'Spiders' },
  { id: 5, name: 'Elephants' },
  { id: 6, name: 'Bees' },
  { id: 7, name: 'Lions' },
  { id: 8, name: 'Fish' },
  { id: 9, name: 'Blowfish' },
  { id: 10, name: 'Bears' },
  { id: 11, name: 'Blackwidows' },
  { id: 12, name: 'Barracudas' },
  { id: 13, name: 'Blastoise' },
  { id: 14, name: 'Charmeleons' },
  { id: 15, name: 'Cats' },
  { id: 16, name: 'Dogs' }
];

const people = [
  { id: 1, name: 'magui.monfort', mail: 'magali.monfort@sovos.com' },
  { id: 2, name: 'Tony Forms', mail: 'antonio.forns@sovos.com' },
  { id: 3, name: 'GerooMohedano', mail: 'geronimo.mohedano@sovos.com' },
  { id: 4, name: 'RomiiRuiiz', mail: 'romina.ruiz@sovos.com' },
  { id: 5, name: 'Edgar', mail: 'edgardo.perez@sovos.com' },
  { id: 6, name: 'Franquito Pe', mail: 'franco.perez@sovos.com' },
  { id: 7, name: 'Matias Mendi', mail: 'matias.mendiondo@sovos.com' },
  { id: 8, name: 'Grossi', mail: 'guillermo.rossi@sovos.com' },
  { id: 9, name: 'Belencitah', mail: 'belen.diaz@sovos.com' },
  { id: 10, name: 'Ernesth', mail: 'ernesto.jaimes@sovos.com' },
  { id: 11, name: 'Bertita', mail: 'berta.romero@sovos.com' },
  { id: 12, name: 'Blanquita', mail: 'blanca.salomon@sovos.com' },
  { id: 13, name: 'Cahchi', mail: 'maria.salomon@sovos.com' },
  { id: 14, name: 'Armando', mail: 'geronimo.a.mohedano@sovos.com' },
  { id: 15, name: 'Benini', mail: 'benini.ruiz@sovos.com' },
  { id: 16, name: 'Kia', mail: 'kia.ruiz@sovos.com' },
  { id: 17, name: 'Marious', mail: 'marcio.bautista@sovos.com' },
  { id: 18, name: 'Ana Pamela', mail: 'pamela.ruiz@sovos.com' },
  { id: 19, name: 'CBSE', mail: 'yerba.mate@sovos.com' },
];

class SearchBar extends React.Component {
  state = {
    isOpen: false,
    searchedString: ''
  };

  updateSearch = value => {
    this.setState({ searchedString: value, isOpen: value.length < 3 ? false : true });
  }

  render() {
    const { classes } = this.props;
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
              {people.filter(person => person.name.includes(searchedString)
                || person.mail.includes(searchedString)).map(person => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={CommonProfilePic} />
                    </ListItemAvatar>
                    <ListItemText
                      inset
                      primary={`${person.name} (${person.mail})`}
                    />
                  </ListItem>
                ))}
            </List>
            <Divider />
            <List component="nav">
              {teams.filter(team => team.name.includes(searchedString)).map(team => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={TeamCatPic} />
                    </ListItemAvatar>
                    <ListItemText
                      inset
                      primary={team.name}
                    />
                  </ListItem>
                ))}
            </List>
          </Paper>
        )}
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);
