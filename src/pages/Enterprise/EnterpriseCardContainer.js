import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TeamsList from './TeamsList';
import MembersList from './MembersList';
import DefaultValuesList from './DefaultValuesList';
import AwardsList from './AwardsList';

require('./Enterprise.css');

class EnterpriseCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /*teams: [
        { id: 1, name: 'Octopus', active: true },
        { id: 2, name: 'Elephants', active: true }
      ],*/
      enterpriseMembers: [
        { id: 1, userName: 'geronimo.mohedano', firstName: 'Geronimo',
        lastName: 'Mohedano', mail: 'geronimo.mohedano@sovos.com', rol: 1, active: true },
        { id: 2, userName: 'anotnio.forns', firstName: 'Antonio',
        lastName: 'Forns', mail: 'anotnio.forns@sovos.com', rol: 0, active: true },
        { id: 3, userName: 'magali.monfort', firstName: 'Magali',
        lastName: 'Monfort', mail: 'magali.monforto@sovos.com', rol: 0, active: true },
        { id: 4, userName: 'pamela.ruiz', firstName: 'Pamela',
        lastName: 'Ruiz', mail: 'pamela.ruiz@sovos.com', rol: 0, active: true },
        { id: 5, userName: 'marcio.bautista', firstName: 'Marcio',
        lastName: 'Bautista', mail: 'marcio.bautista@sovos.com', rol: 0, active: true },
        { id: 6, userName: 'facundo.ledesma', firstName: 'Facundo',
        lastName: 'Ledesma', mail: 'facundo.ledesma@sovos.com', rol: 0, active: true },
        { id: 7, userName: 'agustin.garcia', firstName: 'Agustin',
        lastName: 'Garcia', mail: 'agustin.garcia@sovos.com', rol: 0, active: true },
        { id: 8, userName: 'cristian.salazar', firstName: 'Cristian',
        lastName: 'Salazar', mail: 'cristian.salazar@sovos.com', rol: 0, active: true },
        { id: 9, userName: 'pablo.giroud', firstName: 'Pablo',
        lastName: 'Giroud', mail: 'pablo.giroud@sovos.com', rol: 0, active: true }
      ],
      values: [
        { id: 1, name: 'Puntual' },
        { id: 2, name: 'Buena onda' },
        { id: 3, name: 'Responsable' },
        { id: 4, name: 'Inteligente' },
        { id: 5, name: 'Valiente' }
      ],
      defaultValues: [
        { id: 1, name: 'Puntual' },
        { id: 2, name: 'Buena onda' },
        { id: 3, name: 'Responsable' },
        { id: 4, name: 'Inteligente' },
        { id: 5, name: 'Valiente' }
      ],
      awards: [
        { id: 1, name: 'Miss Simpatia', description: 'es muy buena onda',
          conditions: [{ value: 2, score: 100, biggerThan: 1, otherTeamsOnly: 0 }] },
        { id: 2, name: 'Cerebrito', description: 'es muy inteligente',
          conditions: [{ value: 4, score: 100, biggerThan: 1, otherTeamsOnly: 0 }] },
        { id: 3, name: 'Amigo internacional', description: 'colabora con otros equipos',
          conditions: [{ value: 2, score: 20, biggerThan: 1, otherTeamsOnly: 1 }] },
        { id: 4, name: 'Grinch', description: 'el mas odioso',
          conditions: [{ value: 2, score: -5, biggerThan: 0, otherTeamsOnly: 0 }] },
        { id: 5, name: 'Leon de oro', description: 'inteligente y valiente',
          conditions: [{ value: 4, score: 100, biggerThan: 1, otherTeamsOnly: 0 },
            { value: 5, score: 100, biggerThan: 1, otherTeamsOnly: 0 }] },
      ]
    };
  }
  /* --- teams functions --- */

  changeTeamName = (teamId, newName) => {
    this.setState(state => {
      const teamList = state.teams.map(team => {
        if (team.id === teamId) {
          return { ...team, name: newName };
        } else {
          return team;
        }
      });
      return {
        teams: teamList
      };
    });
  }

  changeTeamActive = (teamId, activeState) => {
    this.setState(state => {
      const teamList = state.teams.map(team => {
        if (team.id === teamId) {
          return { ...team, active: activeState };
        } else {
          return team;
        }
      });
      return {
        teams: teamList
      };
    });
  }
/*
  deleteTeam = teamId => {
    this.setState(state => {
      const teamsList = state.teams.filter(team => team.id !== teamId);
      return {
        teams: teamsList
      };
    });
  }*/

  addNewTeam = team => {
    const nextId = this.state.teams[this.state.teams.length];
    this.setState(state => ({ teams: [...state.teams, { id: nextId, name: team, active: true }]}))
  }

  /* --- members functions --- */

  updateEnterpriseMember = (memberId, userName, firstName, lastName, mail, rol) => {
    this.setState(state => {
      const memberList = state.enterpriseMembers.map(member => {
        if (member.id === memberId) {
          return { ...member, userName: userName, firstName: firstName,
            lastName: lastName, mail: mail, rol: rol };
        } else {
          return member;
        }
      });
      return {
        enterpriseMembers: memberList
      };
    });
  }

  changeEnterpriseMemberActive = (memberId, activeState) => {
    this.setState(state => {
      const memberList = state.enterpriseMembers.map(member => {
        if (member.id === memberId) {
          return { ...member, active: activeState };
        } else {
          return member;
        }
      });
      return {
        enterpriseMembers: memberList
      };
    });
  }

  deleteEnterpriseMember = memberId => {
    this.setState(state => {
      const memberList = state.enterpriseMembers.filter(member => member.id !== memberId);
      return {
        enterpriseMembers: memberList
      };
    });
  }

  addNewEnterpriseMember = (userName, firstName, lastName, mail, rol) => {
    const nextId = this.state.enterpriseMembers[this.state.enterpriseMembers.length];
    this.setState(state => ({ enterpriseMembers: [...state.enterpriseMembers,
      { id: nextId, userName: userName, firstName: firstName,
        lastName: lastName, mail: mail, rol: rol, active: true }]}))
  }

  /* --- values functions --- */

  changeValueName = (valueId, newName) => {
    this.setState(state => {
      const valueList = state.defaultValues.map(value => {
        if (value.id === valueId) {
          return { ...value, name: newName };
        } else {
          return value;
        }
      });
      return {
        defaultValues: valueList
      };
    });
  }

  deleteValue = valueId => {
    this.setState(state => {
      const valueList = state.defaultValues.filter(value => value.id !== valueId);
      return {
        defaultValues: valueList
      };
    });
  }

  addNewValue = name => {
    const nextId = this.state.defaultValues[this.state.defaultValues.length];
    this.setState(state => ({ defaultValues: [...state.defaultValues, { id: nextId, name: name }]}))
  }

  /* --- awards functions --- */

  updateAward = (awardId, name, description, conditions) => {
    const newConditions = [];
    conditions.forEach(condition => newConditions.push(
      { value: condition.value, score: condition.score,
        biggerThan: condition.biggerThan, otherTeamsOnly: condition.otherTeamsOnly }
    ));
    this.setState(state => {
      const awardList = state.awards.map(award => {
        if (award.id === awardId) {
          return { ...award, name: name, description: description, conditions: newConditions };
        } else {
          return award;
        }
      });
      return {
        awards: awardList
      };
    });
  }

  deleteAward = awardId => {
    this.setState(state => {
      const awardList = state.awards.filter(award => award.id !== awardId);
      return {
        awards: awardList
      };
    });
  }

  addNewAward = (name, description, conditions) => {
    const nextId = this.state.awards[this.state.awards.length];
    const newConditions = [];
    conditions.forEach(condition => newConditions.push(
      { value: condition.value, score: condition.score,
        biggerThan: condition.biggerThan, otherTeamsOnly: condition.otherTeamsOnly }
    ));
    this.setState(state => ({ awards: [...state.awards, { id: nextId, name: name,
      description: description, conditions: newConditions }]}));
  }

  render() {
    const { teams, enterpriseMembers, defaultValues, values, awards} = this.state;
    const { idEnterprise, activateTeam, desactivateTeam, deleteTeam, getTeamNotes, teamNotes,
            activateMember, desactivateMember, deleteMember, getNotes, notes,
            updateUser, addUser, updateTeam, addTeam, gettingValuesNotes, getValuesNotes, valuesNotes,
            deleteDefaultValue, deleteAward, updateValue, addValue, enterpriseId } = this.props;
    return (
      <div className="cardsContainer">
        <TeamsList
          teams={this.props.teams}
          changeTeamName={this.changeTeamName}
          //changeTeamActive={this.changeTeamActive}
          activateTeam={activateTeam}
          desactivateTeam={desactivateTeam}
          deleteTeam={deleteTeam}
          addNewTeam={this.addNewTeam}//cambiar
          getTeamNotes={getTeamNotes}
          teamNotes={teamNotes}
          updateTeam={updateTeam}
          idEnterprise={idEnterprise}
          addTeam={addTeam}
        />
        <MembersList
          members={this.props.members}
          updateEnterpriseMember={this.updateEnterpriseMember}
         // changeEnterpriseMemberActive={this.changeEnterpriseMemberActive}
          activateMember={activateMember}
          desactivateMember={desactivateMember}
          deleteMember={deleteMember}
          getNotes={getNotes}
          notes={notes}
          updateUser={updateUser}
          addUser={addUser}
          idEnterprise={idEnterprise}
         // deleteEnterpriseMember={this.deleteEnterpriseMember}
          addNewEnterpriseMember={this.addNewEnterpriseMember}
        />
        <DefaultValuesList
          values={this.props.values}
          updateValue={updateValue}
          //deleteValue={this.deleteValue}
          deleteDefaultValue={deleteDefaultValue}
          addValue={addValue}
          enterpriseId={enterpriseId}
          gettingValuesNotes={gettingValuesNotes}
          getValuesNotes={getValuesNotes}
          valuesNotes={valuesNotes}
        />
        <AwardsList
          values={values}
          awards={this.props.awards}
          updateAward={this.updateAward}
          deleteAward={deleteAward}
          addNewAward={this.addNewAward}
        />
      </div>
    );
  }
}

EnterpriseCardContainer.propTypes = {
  idEnterprise: PropTypes.number.isRequired,
  teams: PropTypes.array.isRequired,
  members: PropTypes.array.isRequired,
  values: PropTypes.array.isRequired,
  awards: PropTypes.array.isRequired,
  //teams
  activateTeam: PropTypes.func.isRequired,
  desactivateTeam: PropTypes.func.isRequired,
  teamActivated: PropTypes.shape({}).isRequired,
  teamDesactivated: PropTypes.shape({}).isRequired,
  deleteTeam: PropTypes.func.isRequired,
  teamDeleted: PropTypes.shape({}).isRequired,
  getTeamNotes: PropTypes.func.isRequired,
  teamNotes: PropTypes.shape({}).isRequired,
  //members
  activateMember: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  addTeam: PropTypes.func.isRequired,
  updateTeam: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  desactivateMember: PropTypes.func.isRequired,
  memberActivated: PropTypes.shape({}).isRequired,
  memberDesactivated: PropTypes.shape({}).isRequired,
  deleteMember: PropTypes.func.isRequired,
  memberDeleted: PropTypes.shape({}).isRequired,
  getNotes: PropTypes.func.isRequired,
  notes: PropTypes.shape({}).isRequired,
  //defaultValues
  deleteDefaultValue: PropTypes.func.isRequired,
  defaultValueDeleted: PropTypes.shape({}).isRequired,
  updateValue: PropTypes.func.isRequired,
  addValue: PropTypes.func.isRequired,
  enterpriseId: PropTypes.number.isRequired,
  //award
  deleteAward: PropTypes.func.isRequired,
  awardDeleted: PropTypes.shape({}).isRequired,
  gettingValuesNotes: PropTypes.bool.isRequired,
  getValuesNotes: PropTypes.func.isRequired,
  valuesNotes: PropTypes.shape({}).isRequired
};

export default EnterpriseCardContainer;
