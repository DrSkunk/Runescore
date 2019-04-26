import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import moment from 'moment';

const styles = theme => ({
  root: { height: '90vh', width: '100%' }
});

function formatXAxis(tickItem) {
  console.log('tickItem', tickItem);
  return moment(tickItem.seconds).format('DD/MM HH:mm');
}

class Chart extends Component {
  state = {
    type: 'exp'
  };

  setDisplay = type => {
    this.setState({ type });
  };

  render() {
    const { classes, skill, data: rawData } = this.props;
    const { type } = this.state;
    console.log('rawData', rawData);
    const data = rawData.map(doc => ({
      ...doc[skill],
      timestamp: new Date(doc.timestamp.seconds * 1000)
    }));
    console.log('data', data);

    const skillIsOverall = skill === 'overall';
    const is120skill =
      skill === 'invention' || skill === 'dungeoneering' || skill === 'slayer';

    let domain;
    switch (type) {
      default:
      case 'exp':
        if (skillIsOverall) {
          domain = [0, 5400000000];
        } else if (is120skill) {
          domain = [0, 104273167];
        } else {
          domain = [0, 13034431];
        }
        break;
      case 'level':
        if (skillIsOverall) {
          domain = [0, 2736];
        } else if (is120skill) {
          domain = [0, 120];
        } else {
          domain = [0, 99];
        }
        break;
      case 'rank':
        domain = [0, 100000];
        break;
    }
    if (skill === 'overall') {
    }

    return (
      <div className={classes.root}>
        <button onClick={() => this.setDisplay('exp')}>Set to EXP</button>
        <button onClick={() => this.setDisplay('level')}>Set to level</button>
        <button onClick={() => this.setDisplay('rank')}>Set to rank</button>
        <ResponsiveContainer>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatXAxis}
              // type="number"
              // scale="time"
              // domain={['dataMin', 'dataMax']}
            />
            <YAxis type="number" domain={domain} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={type} stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Chart);
