import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
/* Ejemplo de como deberia ser la data
const data = [
  { date: 'Sprint 180101', punctuation: 1 },
  { date: 'Sprint 180102', punctuation: -5 },
  { date: 'Sprint 180201', punctuation: 0 },
  { date: 'Sprint 180202', punctuation: 2 },
  { date: 'Sprint 180301', punctuation: 2 },
  { date: 'Sprint 180302', punctuation: 3 },
  { date: 'Sprint 180401', punctuation: 4 },
  { date: 'Sprint 180402', punctuation: 7 },
  { date: 'Sprint 180501', punctuation: 9 },
  { date: 'Sprint 180502', punctuation: 11 },
  { date: 'Sprint 180601', punctuation: 15 },
  { date: 'Sprint 180602', punctuation: 13 },
  { date: 'Sprint 180701', punctuation: 13 },
  { date: 'Sprint 180702', punctuation: 17 },
  { date: 'Sprint 180801', punctuation: 18 },
  { date: 'Sprint 180802', punctuation: 19 },
  { date: 'Sprint 180901', punctuation: 21 },
  { date: 'Sprint 180902', punctuation: 22 },
  { date: 'Sprint 181001', punctuation: 23 },
  { date: 'Sprint 181002', punctuation: 25 },
  { date: 'Sprint 181101', punctuation: 26 },
  { date: 'Sprint 181102', punctuation: 28 },
  { date: 'Sprint 181201', punctuation: 30 },
  { date: 'Sprint 181202', punctuation: 33 },
  { date: 'Sprint 190101', punctuation: 36 },
  { date: 'Sprint 190102', punctuation: 36 },
  { date: 'Sprint 190201', punctuation: 36 },
  { date: 'Sprint 190202', punctuation: 39 },
  { date: 'Sprint 190301', punctuation: 37 },
  { date: 'Sprint 190302', punctuation: 35 },
  { date: 'Sprint 190401', punctuation: 37 },
  { date: 'Sprint 190402', punctuation: 37 },
  { date: 'Sprint 190501', punctuation: 40 },
  { date: 'Sprint 190502', punctuation: 41 }
]; */

class LinearChart extends React.Component {

  render() {
    const { data, value } = this.props;
    return(
      <div>
        <h2>{value}</h2>
        <div style={{ width: '100%', height: 300, contentAlign: 'center' }}>
          <ResponsiveContainer width="95%">
            <LineChart
              data={data}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="punctuation" stroke="#3f51b5" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

LinearChart.propTypes = {
  value: PropTypes.string.isRequired,
  data: PropTypes.shape({})
};

export default LinearChart;
