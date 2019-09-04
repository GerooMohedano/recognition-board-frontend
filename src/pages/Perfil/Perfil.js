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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HistoricChart from '@material-ui/icons/InsertChart';
import CloseIcon from '@material-ui/icons/Close';
import Gero from '../../images/gero.jpg';
import ProfilePhoto from '../../images/profile.JPG';
import NonPhoto from '../../images/questionMark.png';
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
      errorUploading: false
    };
    this.fileInput = React.createRef();
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

  async handleSubmit(event) {
    event.preventDefault();
    console.log(this.fileInput.current.files[0]);
    try {
          const formData = new FormData();
          formData.append('file', this.fileInput.current.files[0]);
          await this.props.uploadPhoto(formData);
      } catch (e) {
        console.log(e);
        this.setState({ errorUploading: true });
      }
  }

  // async handleSubmit(event) {
  //   event.preventDefault();
  //   try {
  //     await this.sendRequest(this.fileInput.current.files[0]);
  //   } catch (e) {
  //     console.log(e);
  //     this.setState({ errorUploading: true });
  //   }
  // }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      // const req = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("file", file, file.name);
      this.props.uploadPhoto(formData);
      // req.open("POST", "http://localhost:3001/uploadFile");
      // req.send(formData);
    })
  }

  render() {
    const { openHistoricDialog, configuring, errorUploading } = this.state;
    const {
      fetchingUserInfo, userInfo, gettingHistoricValues, historicValues, loginInfo, match
    } = this.props;
    if (fetchingUserInfo || userInfo === undefined)
      return (<div className="circularProgressContainer"><CircularProgress className="circularProgress" /></div>);
    else
      console.log(userInfo.data.usuarios[0]);
      return (
        <div>
          <div className="profileDescription">
            <div className="profilePhoto">
              <Avatar
                src={
                  ProfilePhoto
                }
                alt="Remy Sharp"
                className="profileAvatar"
              />
            </div>
            <ProfileInfo
              configuring={configuring}
              name={userInfo.data.usuarios[0].nombre}
              mail={userInfo.data.usuarios[0].mail}
              canConfigure={
                loginInfo.data.data[0].adminGeneral
                || loginInfo.data.data[0].idUsuario == match.params.idUsuario
              }
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
            adminGeneral={userInfo.data.usuarios[0].adminGeneral}
          />
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            variant="error"
            open={errorUploading}
            autoHideDuration={6000}
            onClose={() => this.setState({ errorUploading: false})}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">ERROR UPLOADING!</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="secondary"
                onClick={() => this.setState({ errorUploading: false})}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </div>
      );
  }
}

Perfil.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchingUserInfo: PropTypes.bool.isRequired,
  uploadingPhoto: PropTypes.bool.isRequired,
  photoUploaded: PropTypes.shape({}).isRequired,
  fetchUserInfo: PropTypes.func.isRequired,
  uploadPhoto: PropTypes.func.isRequired,
  fetchError: PropTypes.shape({
    state: PropTypes.bool.isRequired,
    message: PropTypes.object
  }),
  userInfo: PropTypes.shape({}).isRequired,
  modifyMail: PropTypes.func.isRequired,
  gettingHistoricValues: PropTypes.bool.isRequired,
  historicValues: PropTypes.shape({}).isRequired,
  getHistoricValues: PropTypes.func.isRequired,
  loginInfo: PropTypes.shape({}).isRequired
};

export default Perfil;
