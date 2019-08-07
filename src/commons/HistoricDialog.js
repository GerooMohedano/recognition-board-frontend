import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import LinearChart from './LinearChart';

const data = [
  { sprint: 'Sprint 180101', punctuation: 1 },
  { sprint: 'Sprint 180102', punctuation: -5 },
  { sprint: 'Sprint 180201', punctuation: 0 },
  { sprint: 'Sprint 180202', punctuation: 2 },
  { sprint: 'Sprint 180301', punctuation: 2 },
  { sprint: 'Sprint 180302', punctuation: 3 },
  { sprint: 'Sprint 180401', punctuation: 4 },
  { sprint: 'Sprint 180402', punctuation: 7 },
  { sprint: 'Sprint 180501', punctuation: 9 },
  { sprint: 'Sprint 180502', punctuation: 11 },
  { sprint: 'Sprint 180601', punctuation: 15 },
  { sprint: 'Sprint 180602', punctuation: 13 },
  { sprint: 'Sprint 180701', punctuation: 13 },
  { sprint: 'Sprint 180702', punctuation: 17 },
  { sprint: 'Sprint 180801', punctuation: 18 },
  { sprint: 'Sprint 180802', punctuation: 19 },
  { sprint: 'Sprint 180901', punctuation: 21 },
  { sprint: 'Sprint 180902', punctuation: 22 },
  { sprint: 'Sprint 181001', punctuation: 23 },
  { sprint: 'Sprint 181002', punctuation: 25 },
  { sprint: 'Sprint 181101', punctuation: 26 },
  { sprint: 'Sprint 181102', punctuation: 28 },
  { sprint: 'Sprint 181201', punctuation: 30 },
  { sprint: 'Sprint 181202', punctuation: 33 },
  { sprint: 'Sprint 190101', punctuation: 36 },
  { sprint: 'Sprint 190102', punctuation: 36 },
  { sprint: 'Sprint 190201', punctuation: 36 },
  { sprint: 'Sprint 190202', punctuation: 39 },
  { sprint: 'Sprint 190301', punctuation: 37 },
  { sprint: 'Sprint 190302', punctuation: 35 },
  { sprint: 'Sprint 190401', punctuation: 37 },
  { sprint: 'Sprint 190402', punctuation: 37 },
  { sprint: 'Sprint 190501', punctuation: 40 },
  { sprint: 'Sprint 190502', punctuation: 41 }
];

class HistoricDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueForHistoric: '',
    }
  }

  changeValueForHistoric = value => {
    this.setState({ valueForHistoric: value });
    this.props.getHistoricValues(value);
  }

  render() {
    const { valueForHistoric } = this.state;
    const { selectValues, open, handleClose, historicValues, isLoading } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="form-dialog-title">
          { 'Choose a value for following it historically' }
        </DialogTitle>
        <DialogContent>
          <Select
            style={{ width: '100%' }}
            value={valueForHistoric}
            onChange={event => this.changeValueForHistoric(event.target.value)}
          >
            {selectValues.map(value => (
              <MenuItem value={value.id}>{value.name}</MenuItem>
            ))}
          </Select>
          {
            selectValues.findIndex(value => value.id === valueForHistoric) !== -1
            && !isLoading
            && historicValues !== undefined
            && (<LinearChart
              data={historicValues.data.data.map(record => ({ date: record.fechaInicio, punctuation: record.puntuacion }))}
              value={selectValues.find(value => value.id === valueForHistoric).name}
            />)
          }
        </DialogContent>
      </Dialog>
    );
  }
}


HistoricDialog.propTypes = {
  selectValues: PropTypes.shape({}).isRequired,
  dataForHistoric: PropTypes.shape({}),
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  historicValues: PropTypes.shape({}).isRequired,
  getHistoricValues: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
}

export default HistoricDialog;
