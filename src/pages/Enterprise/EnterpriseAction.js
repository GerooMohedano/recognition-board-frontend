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


