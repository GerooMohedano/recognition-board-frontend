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

class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openHistoricDialog: false,
      configuring: false,
    };
  }

  componentDidMount() {
    const { fetchUserInfo, match } = this.props;
    fetchUserInfo(match.params.idUsuario);
  }

  componentDidUpdate(prevProps) {
    const { fetchUserInfo, match } = this.props;
    if (prevProps.match !== match) {
      fetchUserInfo(match.params.idUsuario);
    }
  }

  changeHistoricDialogState = value => {
    this.setState({ openHistoricDialog: value });
  }

  changeConfiguring = value => {
    this.setState({ configuring: value});
  }

  changeInfo = newMail => {
    this.props.modifyMail({ idUsuario: this.props.match.params.idUsuario, mail: newMail });
  }

  selectValueForHistoric = value => {
    this.props.getHistoricValues({ idUsuario: this.props.match.params.idUsuario, idValor: value })
  }

  render() {
    const { openHistoricDialog, configuring } = this.state;
    const {
      fetchingUserInfo, userInfo, gettingHistoricValues, historicValues
    } = this.props;
    if (fetchingUserInfo || userInfo === undefined)
      return (<div className="circularProgressContainer"><CircularProgress className="circularProgress" /></div>);
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
                  id: valor.idValor, subject: valor.nombre, A: valor.Total
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
              selectValues={userInfo.data.valores.map(valor => ({
                id: valor.idValor, name: valor.nombre
              }))}
              historicValues={historicValues}
              getHistoricValues={this.selectValueForHistoric}
              isLoading={gettingHistoricValues}
            />
          </div>
          <AwardsList
            everyAward={userInfo.data.logros}
            awards={userInfo.data.suslogros}
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
    message: PropTypes.object
  }),
  userInfo: PropTypes.shape({}).isRequired,
  modifyMail: PropTypes.func.isRequired,
  gettingHistoricValues: PropTypes.bool.isRequired,
  historicValues: PropTypes.shape({}).isRequired,
  getHistoricValues: PropTypes.func.isRequired,
};

export default Perfil;
