import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HistoricChart from '@material-ui/icons/InsertChart';
import Gero from '../../images/gero.jpg';
import ChartPolygon from '../../commons/ChartPolygon';
import HistoricDialog from '../../commons/HistoricDialog';
import ProfileInfo from './ProfileInfo';
import AwardsList from './AwardsList';
import TeamsList from './TeamsList';


require('./Perfil.css');

const data = [
  {
    id: 1, subject: 'Be Accountable', A: 12
  },
  {
    id: 2, subject: 'Be Professional', A: -1
  },
  {
    id: 3, subject: 'Be Proactive', A: 8
  },
  {
    id: 4, subject: 'Be Collaborative', A: 9
  },
  {
    id: 5, subject: 'Be Hardito', A: 8
  }
];

class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openHistoricDialog: false,
      configuring: false,
      profileInfo: {
        firstName: 'Geronimo',
        lastName: 'Mohedano',
        description: 'Cool guy'
      }
    };
    // this.props.fetchUserInfo(this.props.match.params.idUsuario);
  }

  componentDidMount() {
    this.props.fetchUserInfo(this.props.match.params.idUsuario);
    // const idUsuario = this.props.match.params.idUsuario;
    // const { getUsersInfo } = this;
    // const data = getUsersInfo(idUsuario);
    // console.log(data);
    // this.setState({ infoapi: getUsersInfo(idUsuario) });
  }

  // getUsersInfo = async idUsuario => {
  //   const data = await request.get(`${baseUrl()}/perfil/${idUsuario}`);
  //   return data;
  // };

  changeHistoricDialogState = value => {
    this.setState({ openHistoricDialog: value });
  }

  changeConfiguring = value => {
    this.setState({ configuring: value});
  }

  changeInfo = (newFirstName, newLastName, newDescription) => {
    this.setState({
      firstName: newFirstName, lastName: newLastName, description: newDescription
    });
  }

  render() {
    const { openHistoricDialog, configuring, profileInfo } = this.state;
    const { fetchingUserInfo, userInfo } = this.props;
    console.log(userInfo);
    if (fetchingUserInfo || userInfo === undefined)
      return (<CircularProgress />);
    else
      return (
        <div>
          <div className="profileDescription">
            <div className="profilePhoto">
              <Avatar alt="Remy Sharp" src={Gero} className="profileAvatar" />
              {configuring && (<input type="file" />)}
            </div>
            <ProfileInfo
              configuring={configuring}
              name={userInfo.data.usuarios[0].nombre}
              mail={userInfo.data.usuarios[0].mail}
              changeInfo={this.changeInfo}
              changeConfiguring={this.changeConfiguring}
            />
            <div className="profileChartContainer">
              <ChartPolygon
                data={userInfo.data.valores.map(valor => ({
                  id: valor.idValor, subject: valor.nombre[1], A: valor.Total
                }))}
                width={500}
                height={300}
              />
            </div>
            <Button color="secondary" onClick={() => this.changeHistoricDialogState(true)}>
              <HistoricChart />
            </Button>
            <HistoricDialog
              open={openHistoricDialog}
              handleClose={() => this.changeHistoricDialogState(false)}
              selectValues={data.map(value => ({ id: value.id, name: value.subject}))}
            />
          </div>
          <AwardsList
            awards={userInfo.data.logros}
          />
          <TeamsList
            teams={userInfo.data.equipos}
          />
        </div>
      );
  }
}

Perfil.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchingUserInfo: PropTypes.bool.isRequired,
  fetchUserInfo: PropTypes.func.isRequired,
  fetchError: PropTypes.shape({
    state: PropTypes.bool.isRequired,
    message: PropTypes.Object
  }),
  userInfo: PropTypes.shape({}).isRequired
};

export default Perfil;
