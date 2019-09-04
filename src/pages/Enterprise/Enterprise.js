import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import HistoricChart from '@material-ui/icons/InsertChart';
import EnterpriseInfo from './EnterpriseInfo';
import NonPhoto from '../../images/questionMark.png';
import Bob from '../../images/bob.jpg';
import EnterprisePhoto from '../../images/enterprise.png'
import HistoricDialog from '../../commons/HistoricDialog';
import ChartPolygon from '../../commons/ChartPolygon';
import EnterpriseCardContainer from './EnterpriseCardContainer';
import CircularProgress from '@material-ui/core/CircularProgress';

require('./Enterprise.css');

const data = [
  {
    id: 1, subject: 'Be Accountable', A: 120, B: 110, fullMark: 150,
  },
  {
    id: 2, subject: 'Be Professional', A: 98, B: 130, fullMark: 150,
  },
  {
    id: 3, subject: 'Be Proactive', A: 86, B: 130, fullMark: 150,
  },
  {
    id: 4, subject: 'Be Collaborative', A: 99, B: 100, fullMark: 150,
  },
  {
    id: 5, subject: 'Be Hardito', A: 85, B: 90, fullMark: 150,
  }
];

const style404 = {
  fontSize: 72,
  fontWeight: 'bold'
};

class Enterprise extends Component {
  constructor(props) {
    super(props);
    this.state = {
     // newName, newAddress, newTelephone: this.props.enterprise,
      openHistoricDialog: false,
      configuring: false,
      enterpriseInfo: {
        address: 'Av Belgrano 1915',
        city: 'SMT',
        telephone: '4214431'
      },
      deletedMessage: false
      /*teams: [
        { id: 1, name: 'Octopus', active: true },
        { id: 2, name: 'Elephants', active: true }
      ]*/
    };
  }

  componentDidMount(){
    const { fetchEnterpriseInfo, match } = this.props;
    fetchEnterpriseInfo(match.params.idEmpresa);
  }

  componentDidUpdate(prevProps) {
    const {
      fetchEnterpriseInfo, userUpdated, userAdded,
      teamActivated, teamDesactivated, teamDeleted, teamAdded,
      memberActivated, memberDesactivated, memberDeleted, enterpriseDeleted,
      defaultValueDeleted, awardDeleted, valueUpdated, valueAdded, teamUpdated, awardAdded, awardUpdated, getConditions, gettingConditions, conditions, updateAward, addAward, addCondition, deleteCondition,
      match
    } = this.props;
    if (prevProps.match !== match) {
      fetchEnterpriseInfo(match.params.idEmpresa);
      this.setState({ deletedMessage: false });
    }
    if (prevProps.enterpriseDeleted !== enterpriseDeleted && enterpriseDeleted && enterpriseDeleted.data.status === 'OK') {
      this.setState({ deletedMessage: true });
    }
    //teams
    if (prevProps.teamActivated !== teamActivated && teamActivated && teamActivated.data.status === 'OK') {
      fetchEnterpriseInfo(match.params.idEmpresa);
    }
    if (prevProps.teamAdded !== teamAdded && teamAdded && teamAdded.data.status === 'OK') {
      fetchEnterpriseInfo(match.params.idEmpresa);
    }
    if (prevProps.teamUpdated !== teamUpdated && teamUpdated && teamUpdated.data.status === 'OK') {
      fetchEnterpriseInfo(match.params.idEmpresa);
    }
    if (prevProps.teamDesactivated !== teamDesactivated && teamDesactivated && teamDesactivated.data.status === 'OK') {
      fetchEnterpriseInfo(match.params.idEmpresa);
    }
    if (prevProps.teamDeleted !== teamDeleted && teamDeleted && teamDeleted.data.status === 'OK') {
      fetchEnterpriseInfo(match.params.idEmpresa);
    }
    //members
    if (prevProps.memberActivated !== memberActivated && memberActivated && memberActivated.data.status === 'OK') {
      fetchEnterpriseInfo(match.params.idEmpresa);
    }
    if (prevProps.userUpdated !== userUpdated && userUpdated && userUpdated.data.status === 'OK') {
      fetchEnterpriseInfo(match.params.idEmpresa);
    }
    if (prevProps.userAdded !== userAdded && userAdded && userAdded.data.status === 'OK') {
      fetchEnterpriseInfo(match.params.idEmpresa);
    }
    if (prevProps.memberDesactivated !== memberDesactivated && memberDesactivated && memberDesactivated.data.status === 'OK') {
      fetchEnterpriseInfo(match.params.idEmpresa);
    }
    if (prevProps.memberDeleted !== memberDeleted && memberDeleted && memberDeleted.data.status === 'OK') {
      fetchEnterpriseInfo(match.params.idEmpresa);
    }
    //defaultValues
    if (prevProps.defaultValueDeleted !== defaultValueDeleted && defaultValueDeleted && defaultValueDeleted.data.status === 'OK') {
      fetchEnterpriseInfo(match.params.idEmpresa);
    }
    if (prevProps.valueUpdated !== valueUpdated && valueUpdated && valueUpdated.data.status === 'OK') {
      fetchEnterpriseInfo(match.params.idEmpresa);
    }
    if (prevProps.valueAdded !== valueAdded && valueAdded && valueAdded.data.status === 'OK') {
      fetchEnterpriseInfo(match.params.idEmpresa);
    }
    //awards
    if (prevProps.awardDeleted !== awardDeleted && awardDeleted && awardDeleted.data.status === 'OK') {
      fetchEnterpriseInfo(match.params.idEmpresa);
    }
    if (prevProps.awardAdded !== awardAdded && awardAdded && awardAdded.data.status === 'OK') {
      fetchEnterpriseInfo(match.params.idEmpresa);
    }
    if (prevProps.awardUpdated !== awardUpdated && awardUpdated && awardUpdated.data.status === 'OK') {
      fetchEnterpriseInfo(match.params.idEmpresa);
    }
  }
  changeConfiguring = value => {
    this.setState({ configuring: value});
  }
  /*
  changeInfo = (newAddress, newTelephone) => {
    this.setState({
      address: newAddress, telephone: newTelephone
    });
  }*/
  changeAddress = newAddress => {
      this.props.modifyAddress({ idUsuario: this.props.match.params.idUsuario, address : newAddress , telephone :  this.props.match.params.telephone})
  }


  changeHistoricDialogState = value => {
    this.setState({ openHistoricDialog: value });
  }

  changeEnterpriseName = value => {
    this.setState({ newEnterpriseName: value });
  }

  updateName = value => {
    this.setState({ newName: value });
  }

  isEnterpriseAdmin = () => {
    const { enterpriseInfo, loginInfo } = this.props;
    const userIndex = enterpriseInfo.data.usuarios.findIndex(user =>
      user.idUsuario === loginInfo.data.data[0].idUsuario
    );
    return userIndex === -1 ? false : enterpriseInfo.data.usuarios[userIndex].rol;
  }

  selectValueForHistoric = value => {
    this.props.getHistoricValues({ idEmpresa: this.props.match.params.idEmpresa, idValor: value })
  }

  render() {
    const {
      newName, configuring, openHistoricDialog, enterpriseInfoState, deletedMessage
    } = this.state;
    const { fetchingEnterpriseInfo, enterpriseInfo, loginInfo, updateTeam,
      historicValues, gettingHistoricValues, updateUser, addUser, addTeam,
      deleteTeam, activateTeam, desactivateTeam, getTeamNotes, teamNotes,
      deleteMember, activateMember, desactivateMember, getNotes, notes, deleteEnterprise,
      deleteDefaultValue, deleteAward, modifyEnterprise, updateValue, addValue,
      gettingValuesNotes, getValuesNotes, valuesNotes, getEnterpriseNotes, enterpriseNotes,
      getConditions, gettingConditions, conditions, updateAward, addAward, addCondition, deleteCondition
     } = this.props;
    console.log("ESTO TRAE EMPRESA: ", enterpriseInfo);
    if(fetchingEnterpriseInfo || enterpriseInfo === undefined)
      return (<div className="circularProgressContainer"><CircularProgress className="circularProgress" /></div>);
    else if (deletedMessage)
      return (
        <div style={{ textAlign:'center' }}>
          <h1 style={style404}>Enterprise deleted</h1>
          <img
            alt="error"
            src={
              EnterprisePhoto
            }
          />
        </div>
      )
    else
      return (
        <div>
          <div className="enterpriseDescription">
            <div className="teamPhoto">
              <Avatar
                alt="Remy Sharp"
                src={
                  EnterprisePhoto
                }
                className="enterpriseAvatar"
              />
            </div>
            <EnterpriseInfo
              configuring={configuring}
              name={enterpriseInfo.data.empresas[0].nombre_empresa}
              address={enterpriseInfo.data.empresas[0].direccion}
              telephone={enterpriseInfo.data.empresas[0].telefono}
              updateName={this.updateName}
              //changeAddress={this.changeAddress}
              changeConfiguring={this.changeConfiguring}
              modifyEnterprise={modifyEnterprise}
              enterpriseId={enterpriseInfo.data.empresas[0].idEmpresa}
              adminGeneral={loginInfo.data.data[0].adminGeneral}
              canConfigure={loginInfo.data.data[0].adminGeneral || this.isEnterpriseAdmin()}
              getEnterpriseNotes={getEnterpriseNotes}
              enterpriseNotes={enterpriseNotes}
              deleteEnterprise={deleteEnterprise}
            />
            <div className="chartContainer">
              <ChartPolygon data={enterpriseInfo.data.evaluacion.map(valor => ({
                  id: valor.idValor, subject: valor.nombre, A: valor.Total
                }))}
                 width={500}
                 height={300}
               />
            </div>
            <Button color="secondary" onClick={() => this.changeHistoricDialogState(true)}>
              <HistoricChart />
            </Button>
          </div>
          {(loginInfo.data.data[0].adminGeneral || this.isEnterpriseAdmin()) &&
            (<EnterpriseCardContainer
            teams={enterpriseInfo.data.equipos}
            members={enterpriseInfo.data.usuarios}
            values={enterpriseInfo.data.valores}
            awards={enterpriseInfo.data.logros}
            idEnterprise={this.props.match.params.idEmpresa}
            //teams
            activateTeam={activateTeam}
            desactivateTeam={desactivateTeam}
            deleteTeam={deleteTeam}
            getTeamNotes={getTeamNotes}
            teamNotes={teamNotes}
            updateTeam={updateTeam}
            addTeam={addTeam}
            //member
            activateMember={activateMember}
            desactivateMember={desactivateMember}
            deleteMember={deleteMember}
            getNotes={getNotes}
            notes={notes}
            updateUser={updateUser}
            addUser={addUser}
            //defaultValues
            deleteDefaultValue={deleteDefaultValue}
            updateValue={updateValue}
            addValue={addValue}
            enterpriseId={enterpriseInfo.data.empresas[0].idEmpresa}
            gettingValuesNotes={gettingValuesNotes}
            getValuesNotes={getValuesNotes}
            valuesNotes={valuesNotes}
            //awards
            deleteAward={deleteAward}
            getConditions={getConditions}
            conditions={conditions}
            gettingConditions={gettingConditions}
            updateAward={updateAward}
            addAward={addAward}
            addCondition={addCondition}
            deleteCondition={deleteCondition}
          />)}
          <HistoricDialog
            open={openHistoricDialog}
            handleClose={() => this.changeHistoricDialogState(false)}
            selectValues={enterpriseInfo.data.evaluacion.map(value => ({ id: value.idValor, name: value.nombre}))}
            historicValues={historicValues}
            getHistoricValues={this.selectValueForHistoric}
            isLoading={gettingHistoricValues}
          />
        </div>
      );
  }
}
/*
Enterprise.propTypes = {
  enterprise: PropTypes.string.isRequired
};*/
Enterprise.propTypes = {
  classes: PropTypes.object.isRequired,
  gettingEnterpriseNotes: PropTypes.bool.isRequired,
  getEnterpriseNotes: PropTypes.func.isRequired,
  enterpriseNotes: PropTypes.shape({}).isRequired,
  deleteEnterprise: PropTypes.func.isRequired,
  enterpriseDeleted: PropTypes.shape({}).isRequired,
  historicValues: PropTypes.shape({}).isRequired,
  gettingHistoricValues: PropTypes.bool.isRequired,
  getHistoricValues: PropTypes.func.isRequired,
  enterprise: PropTypes.string.isRequired,
  fetchingEnterpriseInfo: PropTypes.bool.isRequired,
  fetchEnterpriseInfo: PropTypes.func.isRequired,
  fetchError: PropTypes.shape({
    state: PropTypes.bool.isRequired,
    message: PropTypes.object
  }),
  enterpriseInfo: PropTypes.shape({}).isRequired,
  modifyAddress: PropTypes.func.isRequired,
  loginInfo: PropTypes.shape({}).isRequired,
  //team
  activateTeam: PropTypes.func.isRequired,
  desactivateTeam: PropTypes.func.isRequired,
  deleteTeam: PropTypes.func.isRequired,
  teamDeleted: PropTypes.shape({}).isRequired,
  getTeamNotes: PropTypes.func.isRequired,
  teamNotes: PropTypes.shape({}).isRequired,
  //members
  updatingUser: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired,
  userUpdated: PropTypes.shape({}).isRequired,
  addingValue: PropTypes.bool.isRequired,
  addUser: PropTypes.func.isRequired,
  userAdded: PropTypes.shape({}).isRequired,
  activateMember: PropTypes.func.isRequired,
  desactivateMember: PropTypes.func.isRequired,
  deleteMember: PropTypes.func.isRequired,
  memberDeleted: PropTypes.shape({}).isRequired,
  getNotes: PropTypes.func.isRequired,
  notes: PropTypes.shape({}).isRequired,
  //defaultValues
  deleteDefaultValue: PropTypes.func.isRequired,
  defaultValueDeleted: PropTypes.shape({}).isRequired,
  updateValue: PropTypes.func.isRequired,
  addValue: PropTypes.func.isRequired,
  //awards
  deleteAward: PropTypes.func.isRequired,
  awardDeleted: PropTypes.shape({}).isRequired,
  getConditions: PropTypes.func.isRequired,
  gettingConditions: PropTypes.bool.isRequired,
  conditions: PropTypes.shape({}).isRequired,
  updateAward: PropTypes.func.isRequired,
  addAward: PropTypes.func.isRequired,
  addCondition: PropTypes.func.isRequired,
  deleteCondition: PropTypes.func.isRequired,
  //enterprise modify
  modifyingEnterprise: PropTypes.bool.isRequired,
  modifyEnterprise: PropTypes.func.isRequired,
  updateTeam: PropTypes.func.isRequired,
  teamUpdated: PropTypes.shape({}).isRequired,
  addTeam: PropTypes.func.isRequired,
  teamAdded: PropTypes.shape({}).isRequired,
  gettingValuesNotes: PropTypes.bool.isRequired,
  getValuesNotes: PropTypes.func.isRequired,
  valuesNotes: PropTypes.shape({}).isRequired
};
export default Enterprise;
