import React from 'react';
import PropTypes from 'prop-types';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
/*
const data = [
  {
    subject: 'Math', A: 120, B: 110, fullMark: 150,
  },
  {
    subject: 'Chinese', A: 98, B: 130, fullMark: 150,
  },
  {
    subject: 'English', A: 86, B: 130, fullMark: 150,
  },
  {
    subject: 'Geography', A: 99, B: 100, fullMark: 150,
  },
  {
    subject: 'Physics', A: 85, B: 90, fullMark: 150,
  },
  {
    subject: 'History', A: 65, B: 85, fullMark: 150,
  },
];*/

class ChartPolygon extends React.Component {
  render() {
     const {data} = this.props;
    return (
      <div>
        <div style={{ width: '100%', height: 300, contentAlign: 'center'}}>
          <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="Charsito" dataKey="A" stroke="#8884d8" fill="#F4D03F" fillOpacity={0.6} />
          </RadarChart>
        </div>
      </div>
    );
  }
}


ChartPolygon.propTypes = {

 data: PropTypes.shape({})
}


export default ChartPolygon;
