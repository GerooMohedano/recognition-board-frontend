import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import HistoricChart from '@material-ui/icons/InsertChart';
import EnterpriseInfo from './EnterpriseInfo';
import Bob from '../../images/bob.jpg';
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

class Enterprise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: this.props.enterprise,
      openHistoricDialog: false,
      configuring: false,
      enterpriseInfo: {
        address: 'Av Belgrano 1915',
        city: 'SMT',
        telephone: '4214431'
      },
      teams: [
        { id: 1, name: 'Octopus', active: true },
        { id: 2, name: 'Elephants', active: true }
      ]
    };
  }

  componentDidMount(){
    this.props.fetchEnterpriseInfo(this.props.match.params.idEmpresa);

  }

  changeConfiguring = value => {
    this.setState({ configuring: value});
  }

  changeInfo = (newAddress, newCity, newTelephone) => {
    this.setState({
      address: newAddress, city: newCity, telephone: newTelephone
    });
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

  render() {
    const {
      newName, configuring, openHistoricDialog, enterpriseInfoState, teams
    } = this.state;
    const { fetchingEnterpriseInfo, enterpriseInfo } = this.props;
    if(fetchingEnterpriseInfo || enterpriseInfo === undefined)
    return (<CircularProgress />);
    else
      return (
        <div>
          <div className="title">
            <div className="entrepriseName"> IM IN Enterprise {newName}</div>
          </div>
          <div className="enterpriseDescription">
            <div className="teamPhoto">
              <Avatar alt="Remy Sharp" src={Bob} className="enterpriseAvatar" />
              {configuring && (<input type="file" />)}
            </div>
            <EnterpriseInfo
              configuring={configuring}
              name={enterpriseInfo.data.empresas[0].nombre}
              info={enterpriseInfo}
              updateName={this.updateName}
              changeInfo={this.changeInfo}
              changeConfiguring={this.changeConfiguring}
            />
            <div className="chartContainer">
              <ChartPolygon data={data} width={500} height={300} />
            </div>
            <Button color="secondary" onClick={() => this.changeHistoricDialogState(true)}>
              <HistoricChart />
            </Button>
          </div>
          <EnterpriseCardContainer />
          <HistoricDialog
            open={openHistoricDialog}
            handleClose={() => this.changeHistoricDialogState(false)}
            selectValues={data.map(value => ({ id: value.id, name: value.subject}))}
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
  enterprise: PropTypes.string.isRequired,
  fetchingEnterpriseInfo: PropTypes.bool.isRequired,
  fetchEnterpriseInfo: PropTypes.func.isRequired,
  fetchError: PropTypes.shape({
    state: PropTypes.bool.isRequired,
    message: PropTypes.object
  }),
  enterpriseInfo: PropTypes.shape({}).isRequired
};
export default Enterprise;