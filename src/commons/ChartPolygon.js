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
    const { data, width, height } = this.props;
    return (
      <div style={{ width: '100%', height: '100%', contentAlign: 'center'}}>
        <RadarChart cx={width / 2} cy={height / 2} outerRadius={height / 4} width={width} height={height} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Charsito" dataKey="A" stroke="#649BFF" fill="#C670CC" fillOpacity={0.6} />
        </RadarChart>
      </div>
    );
  }
}


ChartPolygon.propTypes = {
  data: PropTypes.shape({}).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

export default ChartPolygon;
