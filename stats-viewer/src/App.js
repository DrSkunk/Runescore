import React, { Component } from 'react';
import { FirestoreCollection } from 'react-firestore';
import Chart from './Chart';

const skills = [
  'overall',
  'attack',
  'defence',
  'strength',
  'hitpoints',
  'ranged',
  'prayer',
  'magic',
  'cooking',
  'woodcutting',
  'fletching',
  'fishing',
  'firemaking',
  'crafting',
  'smithing',
  'mining',
  'herblore',
  'agility',
  'thieving',
  'slayer',
  'farming',
  'runecraft',
  'hunter',
  'construction',
  'summoning',
  'dungeoneering',
  'divination',
  'invention'
];

class App extends Component {
  state = {
    skill: 'overall',
    user: 'wh1tebird'
  };
  setSkill = skill => {
    this.setState({ skill });
  };
  render() {
    const { skill, user } = this.state;
    return (
      <div>
        {skills.map(skill => (
          <button key={skill + 'button'} onClick={() => this.setSkill(skill)}>
            {skill}
          </button>
        ))}
        <FirestoreCollection
          path={user}
          sort="timestamp:desc"
          render={({ isLoading, data }) => {
            return isLoading ? (
              <div>loading</div>
            ) : (
              <Chart skill={skill} data={data} />
            );
          }}
        />
      </div>
    );
  }
}

export default App;
