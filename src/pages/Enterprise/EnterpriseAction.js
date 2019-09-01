import * as types from './EnterpriseConstants';
import { baseUrl } from '../../shared/jsUtils/Utils';
import request from '../../shared/jsUtils/request';

export function fetchingEnterpriseInfo() {
  return {
    type: types.FETCHING_ENTERPRISE_INFO,
    payload: {}
  };
}

export function fetchEnterpriseInfoSuccess(data) {
  return {
    type: types.FETCH_ENTERPRISE_INFO_SUCCESS,
    enterpriseInfo: data
  };
}


export function fetchEnterpriseInfoFailure(error) {
  return {
    type: types.FETCH_ENTERPRISE_INFO_FAILURE,
    payload: error
  };
}

export function fetchEnterpriseInfo(idEmpresa) {
  return function (dispatch) {
    dispatch(fetchingEnterpriseInfo());
    return request.get(`${baseUrl()}/empresaConfig/${idEmpresa}`)
      .then(response => dispatch(fetchEnterpriseInfoSuccess(response)))
      .catch(error => dispatch(fetchEnterpriseInfoFailure(error)));
  };
}

export function gettingHistoricValues() {
  return {
    type: types.GETTING_HISTORIC_VALUES,
    payload: {}
  };
}

export function getHistoricValuesSuccess(data) {
  return {
    type: types.GET_HISTORIC_VALUES_SUCCESS,
    historicValues: data
  };
}


export function getHistoricValuesFailure(error) {
  return {
    type: types.GET_HISTORIC_VALUES_FAILURE,
    payload: error
  };
}

export function getHistoricValues(valuesInfo) {
  return function (dispatch) {
    dispatch(gettingHistoricValues());
    return request.post(`${baseUrl()}/HistoricoValorEmpresa`, valuesInfo)
      .then(response => dispatch(getHistoricValuesSuccess(response)))
      .catch(error => dispatch(getHistoricValuesFailure(error)));
  };
}

export function modifyingAddress() {
  return {
    type: types.MODIFYING_ADDRESS,
    payload: {}
  };
}

export function modifyAddressSuccess(data) {
  return {
    type: types.MODIFY_ADDRESS_SUCCESS,
    modifiedAddress: data
  };
}


export function modifyAddressFailure(error) {
  return {
    type: types.MODIFY_ADDRESS_FAILURE,
    payload: error
  };
}

export function modifyAddress(idEmpresa, newAddressInfo, telephone) {
  return function (dispatch) {
    dispatch(modifyingAddress());
    return request.post(`${baseUrl()}/modificarEmpresa`, idEmpresa, newAddressInfo, telephone)
      .then(response => dispatch(modifyAddressSuccess(response)))
      .catch(error => dispatch(modifyAddressFailure(error)));
  };
}

//modify enterprise
export function modifyingEnterprise() {
  return {
    type: types.MODIFYING_ENTERPRISE,
    payload: {}
  };
}

export function modifyEnterpriseSuccess(data) {
  return {
    type: types.MODIFY_ENTERPRISE_SUCCESS,
    sprintModified: data
  };
}


export function modifiyEnterpriseFailure(error) {
  return {
    type: types.MODIFY_ENTERPRISE_FAILURE,
    payload: error
  };
}

export function modifyEnterprise(newEnterpriseInfo) {
  return function (dispatch) {
    dispatch(modifyingEnterprise());
    return request.post(`${baseUrl()}/modificarEmpresa`, newEnterpriseInfo)
      .then(response => dispatch(modifyEnterpriseSuccess(response)))
      .catch(error => dispatch(modifiyEnterpriseFailure(error)));
  };
}

  //delete, activate and desactivate teams
      export function delettingTeam() {
        return {
          type: types.DELETTING_TEAM,
          payload: {}
        };
      }

      export function deleteTeamSuccess(data) {
        return {
          type: types.DELETE_TEAM_SUCCESS,
          teamDeleted: data
        };
      }

      export function deleteTeamFailure(error) {
        return {
          type: types.DELETE_TEAM_FAILURE,
          payload: error
        };
      }

      export function deleteTeam(teamToDelete) {
        return function (dispatch) {
          dispatch(delettingTeam());
          return request.post(`${baseUrl()}/BorrarEquipo`, teamToDelete)
            .then(response => dispatch(deleteTeamSuccess(response)))
            .catch(error => dispatch(deleteTeamFailure(error)));
        };
      }

    export function activatingTeam() {
      return {
        type: types.ACTIVATING_TEAM,
        payload: {}

      };
    }

    export function activateTeamSuccess(data) {
      return {
        type: types.ACTIVATE_TEAM_SUCCESS,
        teamActivated: data
      };
    }

    export function activateTeamFailure(error) {
      return {
        type: types.ACTIVATE_TEAM_FAILURE,
        payload: error
      };
    }

    export function activateTeam(teamToActivate) {
      return function (dispatch) {
        dispatch(activatingTeam());
        return request.post(`${baseUrl()}/activarEquipo`, teamToActivate)
          .then(response => dispatch(activateTeamSuccess(response)))
          .catch(error => dispatch(activateTeamFailure(error)));
      };
    }

    export function desactivatingTeam() {
      return {
        type: types.DESACTIVATING_TEAM,
        payload: {}
      };
    }

    export function desactivateTeamSuccess(data) {
      return {
        type: types.DESACTIVATE_TEAM_SUCCESS,
        teamDesactivated: data
      };
    }

    export function desactivateTeamFailure(error) {
      return {
        type: types.DESACTIVATE_TEAM_FAILURE,
        payload: error
      };
    }

    export function desactivateTeam(teamToDesactivate) {
      return function (dispatch) {
        dispatch(desactivatingTeam());
        return request.post(`${baseUrl()}/desactivarEquipo`, teamToDesactivate)
          .then(response => dispatch(desactivateTeamSuccess(response)))
          .catch(error => dispatch(desactivateTeamFailure(error)));
      };
    }


  //delete, activate and desactivate members
      export function delettingMember() {
        return {
          type: types.DELETTING_MEMBER,
          payload: {}
        };
      }

      export function deleteMemberSuccess(data) {
        return {
          type: types.DELETE_MEMBER_SUCCESS,
          memberDeleted: data
        };
      }

      export function deleteMemberFailure(error) {
        return {
          type: types.DELETE_MEMBER_FAILURE,
          payload: error
        };
      }

      export function deleteMember(memberToDelete) {
        return function (dispatch) {
          dispatch(delettingMember());
          return request.post(`${baseUrl()}/eliminarUsuarioEmpresa`, memberToDelete)
            .then(response => dispatch(deleteMemberSuccess(response)))
            .catch(error => dispatch(deleteMemberFailure(error)));
        };
      }

    export function activatingMember() {
      return {
        type: types.ACTIVATING_MEMBER,
        payload: {}

      };
    }

    export function activateMemberSuccess(data) {
      return {
        type: types.ACTIVATE_MEMBER_SUCCESS,
        memberActivated: data
      };
    }

    export function activateMemberFailure(error) {
      return {
        type: types.ACTIVATE_MEMBER_FAILURE,
        payload: error
      };
    }

    export function activateMember(memberToActivate) {
      return function (dispatch) {
        dispatch(activatingMember());
        return request.post(`${baseUrl()}/activarUsuarioEmpresa`, memberToActivate)
          .then(response => dispatch(activateMemberSuccess(response)))
          .catch(error => dispatch(activateMemberFailure(error)));
      };
    }

    export function desactivatingMember() {
      return {
        type: types.DESACTIVATING_MEMBER,
        payload: {}
      };
    }

    export function desactivateMemberSuccess(data) {
      return {
        type: types.DESACTIVATE_MEMBER_SUCCESS,
        memberDesactivated: data
      };
    }

    export function desactivateMemberFailure(error) {
      return {
        type: types.DESACTIVATE_MEMBER_FAILURE,
        payload: error
      };
    }

    export function desactivateMember(memberToDesactivate) {
      return function (dispatch) {
        dispatch(desactivatingMember());
        return request.post(`${baseUrl()}/desactivarUsuarioEmpresa`, memberToDesactivate)
          .then(response => dispatch(desactivateMemberSuccess(response)))
          .catch(error => dispatch(desactivateMemberFailure(error)));
      };
    }
//Default values
      export function delettingDefaultValue() {
        return {
          type: types.DELETTING_DEFAULTVALUE,
          payload: {}
        };
      }

      export function deleteDefaultValueSuccess(data) {
        return {
          type: types.DELETE_DEFAULTVALUE_SUCCESS,
          defaultValueDeleted: data
        };
      }

      export function deleteDefaultValueFailure(error) {
        return {
          type: types.DELETE_DEFAULTVALUE_FAILURE,
          payload: error
        };
      }

      export function deleteDefaultValue(defaultValueToDelete) {
        return function (dispatch) {
          dispatch(delettingDefaultValue());
          return request.post(`${baseUrl()}/eliminarEmpresaValor`, defaultValueToDelete)
            .then(response => dispatch(deleteDefaultValueSuccess(response)))
            .catch(error => dispatch(deleteDefaultValueFailure(error)));
        };
      }

      export function updatingValue() {
        return {
          type: types.UPDATING_VALUE,
          payload: {}
        };
      }

      export function updateValueSuccess(data) {
        return {
          type: types.UPDATE_VALUE_SUCCESS,
          valueUpdated: data
        };
      }

      export function updateValueFailure(error) {
        return {
          type: types.UPDATE_VALUE_FAILURE,
          payload: error
        };
      }

      export function updateValue(valueToUpdate) {
        return function (dispatch) {
          dispatch(updatingValue());
          return request.post(`${baseUrl()}/modificarValor`, valueToUpdate)
            .then(response => dispatch(updateValueSuccess(response)))
            .catch(error => dispatch(updateValueFailure(error)));
        };
      }

      export function updatingTeam() {
        return {
          type: types.UPDATING_TEAM,
          payload: {}
        };
      }

      export function updateTeamSuccess(data) {
        return {
          type: types.UPDATE_TEAM_SUCCESS,
          teamUpdated: data
        };
      }

      export function updateTeamFailure(error) {
        return {
          type: types.UPDATE_TEAM_FAILURE,
          payload: error
        };
      }

      export function updateTeam(teamToUpdate) {
        return function (dispatch) {
          dispatch(updatingTeam());
          return request.post(`${baseUrl()}/modificarEquipo`, teamToUpdate)
            .then(response => dispatch(updateTeamSuccess(response)))
            .catch(error => dispatch(updateTeamFailure(error)));
        };
      }

      export function updatingUser() {
        return {
          type: types.UPDATING_USER,
          payload: {}
        };
      }

      export function updateUserSuccess(data) {
        return {
          type: types.UPDATE_USER_SUCCESS,
          userUpdated: data
        };
      }

      export function updateUserFailure(error) {
        return {
          type: types.UPDATE_USER_FAILURE,
          payload: error
        };
      }

      export function updateUser(userToUpdate) {
        return function (dispatch) {
          dispatch(updatingUser());
          return request.post(`${baseUrl()}/modificarUsuario`, userToUpdate)
            .then(response => dispatch(updateUserSuccess(response)))
            .catch(error => dispatch(updateUserFailure(error)));
        };
      }

      export function addingUser() {
        return {
          type: types.ADDING_USER,
          payload: {}
        };
      }

      export function addUserSuccess(data) {
        return {
          type: types.ADD_USER_SUCCESS,
          userAdded: data
        };
      }

      export function addUserFailure(error) {
        return {
          type: types.ADD_USER_FAILURE,
          payload: error
        };
      }

      export function addUser(userToAdd) {
        return function (dispatch) {
          dispatch(addingUser());
          return request.post(`${baseUrl()}/altaUsuario`, userToAdd)
            .then(response => dispatch(addUserSuccess(response)))
            .catch(error => dispatch(addUserFailure(error)));
        };
      }

      export function addingTeam() {
        return {
          type: types.ADDING_TEAM,
          payload: {}
        };
      }

      export function addTeamSuccess(data) {
        return {
          type: types.ADD_TEAM_SUCCESS,
          teamAdded: data
        };
      }

      export function addTeamFailure(error) {
        return {
          type: types.ADD_TEAM_FAILURE,
          payload: error
        };
      }

      export function addTeam(teamToAdd) {
        return function (dispatch) {
          dispatch(addingTeam());
          return request.post(`${baseUrl()}/altaEquipo`, teamToAdd)
            .then(response => dispatch(addTeamSuccess(response)))
            .catch(error => dispatch(addTeamFailure(error)));
        };
      }

        export function addingValue() {
          return {
            type: types.ADDING_VALUE,
            payload: {}
          };
        }

        export function addValueSuccess(data) {
          return {
            type: types.ADD_VALUE_SUCCESS,
            valueAdded: data
          };
        }

        export function addValueFailure(error) {
          return {
            type: types.ADD_VALUE_FAILURE,
            payload: error
          };
        }

        export function addValue(valueToAdd) {
          return function (dispatch) {
            dispatch(addingValue());
            return request.post(`${baseUrl()}/altaValorSolo`, valueToAdd)
              .then(response => dispatch(addValueSuccess(response)))
              .catch(error => dispatch(addValueFailure(error)));
          };
        }
//awards
      export function delettingAward() {
        return {
          type: types.DELETTING_AWARD,
          payload: {}
        };
      }

      export function deleteAwardSuccess(data) {
        return {
          type: types.DELETE_AWARD_SUCCESS,
          awardDeleted: data
        };
      }

      export function deleteAwardFailure(error) {
        return {
          type: types.DELETE_AWARD_FAILURE,
          payload: error
        };
      }

      export function deleteAward(awardToDelete) {
        return function (dispatch) {
          dispatch(delettingAward());
          return request.post(`${baseUrl()}/borrarLogro`, awardToDelete)
            .then(response => dispatch(deleteAwardSuccess(response)))
            .catch(error => dispatch(deleteAwardFailure(error)));
        };
      }


      export function gettingConditions() {
        return {
          type: types.GETTING_CONDITIONS,
          payload: {}
        };
      }

      export function getConditionsSuccess(data) {
        return {
          type: types.GET_CONDITIONS_SUCCESS,
          conditions: data
        };
      }


      export function getConditionsFailure(error) {
        return {
          type: types.GET_CONDITIONS_FAILURE,
          payload: error
        };
      }

      export function getConditions(conditionsRequested) {
        return function (dispatch) {
          dispatch(gettingConditions());
          return request.post(`${baseUrl()}/condiciones`, conditionsRequested)
            .then(response => dispatch(getConditionsSuccess(response)))
            .catch(error => dispatch(getConditionsFailure(error)));
        };
      }

      //update de logro

      export function updatingAward() {
        return {
          type: types.UPDATING_VALUE,
          payload: {}
        };
      }

      export function updateAwardSuccess(data) {
        return {
          type: types.UPDATE_AWARD_SUCCESS,
          awardUpdated: data
        };
      }

      export function updateAwardFailure(error) {
        return {
          type: types.UPDATE_AWARD_FAILURE,
          payload: error
        };
      }

      export function updateAward(awardToUpdate) {
        console.log("envia a la bd",awardToUpdate);
        return function (dispatch) {
          dispatch(updatingAward());
          return request.post(`${baseUrl()}/modificarLogro`, awardToUpdate)
            .then(response => dispatch(updateAwardSuccess(response)))
            .catch(error => dispatch(updateAwardFailure(error)));
        };
      }
      //agregar un logro nuevo --> sin condiciones.


      export function addingAward() {
        return {
          type: types.ADDING_AWARD,
          payload: {}
        };
      }

      export function addAwardSuccess(data) {
        return {
          type: types.ADD_AWARD_SUCCESS,
          awardAdded: data
        };
      }

      export function addAwardFailure(error) {
        return {
          type: types.ADD_AWARD_FAILURE,
          payload: error
        };
      }

      export function addAward(awardToAdd) {
        return function (dispatch) {
          dispatch(addingAward());
          return request.post(`${baseUrl()}/altaLogro`, awardToAdd)
            .then(response => dispatch(addAwardSuccess(response)))
            .catch(error => dispatch(addAwardFailure(error)));
        };
      }
      //agregar condiciones
      export function addingCondition() {
        return {
          type: types.ADDING_CONDITION,
          payload: {}
        };
      }

      export function addConditionSuccess(data) {
        return {
          type: types.ADD_CONDITION_SUCCESS,
          conditionAdded: data
        };
      }

      export function addConditionFailure(error) {
        return {
          type: types.ADD_CONDITION_FAILURE,
          payload: error
        };
      }

      export function addCondition(conditionToAdd) {
        return function (dispatch) {
          dispatch(addingCondition());
          return request.post(`${baseUrl()}/agregarCondicion`, conditionToAdd)
            .then(response => dispatch(addConditionSuccess(response)))
            .catch(error => dispatch(addConditionFailure(error)));
        };
      }
      //borrar condicion
      export function delettingCondition() {
        return {
          type: types.DELETTING_CONDITION,
          payload: {}
        };
      }

      export function deleteConditionSuccess(data) {
        return {
          type: types.DELETE_CONDITION_SUCCESS,
          conditionDeleted: data
        };
      }

      export function deleteConditionFailure(error) {
        return {
          type: types.DELETE_CONDITION_FAILURE,
          payload: error
        };
      }

      export function deleteCondition(conditionToDelete) {
        return function (dispatch) {
          dispatch(delettingCondition());
          return request.post(`${baseUrl()}/borrarLogroCondicion`, conditionToDelete)
            .then(response => dispatch(deleteConditionSuccess(response)))
            .catch(error => dispatch(deleteConditionFailure(error)));
        };
      }
//notas
      export function gettingNotes() {
        return {
          type: types.GETTING_NOTES,
          payload: {}
        };
      }

      export function getNotesSuccess(data) {
        return {
          type: types.GET_NOTES_SUCCESS,
          notes: data
        };
      }


      export function getNotesFailure(error) {
        return {
          type: types.GET_NOTES_FAILURE,
          payload: error
        };
      }

      export function getNotes(notesRequested) {
        return function (dispatch) {
          dispatch(gettingNotes());
          return request.post(`${baseUrl()}/todasNotasUsuario`, notesRequested)
            .then(response => dispatch(getNotesSuccess(response)))
            .catch(error => dispatch(getNotesFailure(error)));
        };
      }

      export function gettingTeamNotes() {
        return {
          type: types.GETTING_TEAM_NOTES,
          payload: {}
        };
      }

      export function getTeamNotesSuccess(data) {
        return {
          type: types.GET_TEAM_NOTES_SUCCESS,
          teamNotes: data
        };
      }


      export function getTeamNotesFailure(error) {
        return {
          type: types.GET_TEAM_NOTES_FAILURE,
          payload: error
        };
      }

      export function getTeamNotes(notesRequested) {
        return function (dispatch) {
          dispatch(gettingTeamNotes());
          return request.post(`${baseUrl()}/todasNotasEquipo`, notesRequested)
            .then(response => dispatch(getTeamNotesSuccess(response)))
            .catch(error => dispatch(getTeamNotesFailure(error)));
        };
      }

      export function gettingEnterpriseNotes() {
        return {
          type: types.GETTING_ENTERPRISE_NOTES,
          payload: {}
        };
      }

      export function getEnterpriseNotesSuccess(data) {
        return {
          type: types.GET_ENTERPRISE_NOTES_SUCCESS,
          enterpriseNotes: data
        };
      }


      export function getEnterpriseNotesFailure(error) {
        return {
          type: types.GET_ENTERPRISE_NOTES_FAILURE,
          payload: error
        };
      }

      export function getEnterpriseNotes(notesRequested) {
        return function (dispatch) {
          dispatch(gettingEnterpriseNotes());
          return request.post(`${baseUrl()}/todasNotasEmpresa`, notesRequested)
            .then(response => dispatch(getEnterpriseNotesSuccess(response)))
            .catch(error => dispatch(getEnterpriseNotesFailure(error)));
        };
      }

      export function delettingEnterprise() {
        return {
          type: types.DELETTING_ENTERPRISE,
          payload: {}
        };
      }

      export function deleteEnterpriseSuccess(data) {
        return {
          type: types.DELETE_ENTERPRISE_SUCCESS,
          enterpriseDeleted: data
        };
      }


      export function deleteEnterpriseFailure(error) {
        return {
          type: types.DELETE_ENTERPRISE_FAILURE,
          payload: error
        };
      }

      export function deleteEnterprise(enterpriseToDelete) {
        return function (dispatch) {
          dispatch(delettingEnterprise());
          return request.post(`${baseUrl()}/borrarEmpresa`, enterpriseToDelete)
            .then(response => dispatch(deleteEnterpriseSuccess(response)))
            .catch(error => dispatch(deleteEnterpriseFailure(error)));
        };
      }

      export function gettingValuesNotes() {
        return {
          type: types.GETTING_VALUES_NOTES,
          payload: {}
        };
      }

      export function getValuesNotesSuccess(data) {
        return {
          type: types.GET_VALUES_NOTES_SUCCESS,
          valuesNotes: data
        };
      }


      export function getValuesNotesFailure(error) {
        return {
          type: types.GET_VALUES_NOTES_FAILURE,
          payload: error
        };
      }

      export function getValuesNotes(notesRequested) {
        return function (dispatch) {
          dispatch(gettingValuesNotes());
          return request.post(`${baseUrl()}/todasNotasValor`, notesRequested)
            .then(response => dispatch(getValuesNotesSuccess(response)))
            .catch(error => dispatch(getValuesNotesFailure(error)));
        };
      }
