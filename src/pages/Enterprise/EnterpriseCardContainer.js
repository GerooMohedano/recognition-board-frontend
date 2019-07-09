import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TeamsList from './TeamsList';
import MembersList from './MembersList';

require('./Enterprise.css');

class EnterpriseCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [
        { id: 1, name: 'Octopus', active: true },
        { id: 2, name: 'Elephants', active: true }
      ],
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

  deleteTeam = teamId => {
    this.setState(state => {
      const teamsList = state.teams.filter(team => team.id !== teamId);
      return {
        teams: teamsList
      };
    });
  }

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

  render() {
    const { teams, enterpriseMembers } = this.state;
    return (
      <div className="cardsContainer">
        <TeamsList
          teams={teams}
          changeTeamName={this.changeTeamName}
          changeTeamActive={this.changeTeamActive}
          deleteTeam={this.deleteTeam}
          addNewTeam={this.addNewTeam}
        />
        <MembersList
          members={enterpriseMembers}
          updateEnterpriseMember={this.updateEnterpriseMember}
          changeEnterpriseMemberActive={this.changeEnterpriseMemberActive}
          deleteEnterpriseMember={this.deleteEnterpriseMember}
          addNewEnterpriseMember={this.addNewEnterpriseMember}
        />
      </div>
    );
  }
}

EnterpriseCardContainer.propTypes = {
};

export default EnterpriseCardContainer;
