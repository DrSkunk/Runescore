import React, { Component } from 'react';
import { FirestoreCollection, FirestoreDocument } from 'react-firestore';
import { withStyles } from '@material-ui/core/styles';
import Chart from './Chart';
import Skill from './Skill';

import skillsBg from './skills_bg.png';
import { Button } from '@material-ui/core';
const styles = theme => ({
  root: {},
  skills: {
    position: 'relative',
    color: '#FF8C00',
    fontSize: 12,
    fontFamily: 'RuneScape UF Regular'
  }
  // skills: {
  //   backgroundImage: `url("${skillsBg}"`,
  //   width: 180,
  //   height: 243
  // }
});

const skills = [
  // 'overall',
  'attack',
  'strength',
  'defence',
  'ranged',
  'prayer',
  'magic',
  'runecrafting',
  'construction',
  'dungeoneering',
  'hitpoints',
  'agility',
  'herblore',
  'thieving',
  'crafting',
  'fletching',
  'slayer',
  'hunter',
  'divination',
  'mining',
  'smithing',
  'fishing',
  'cooking',
  'firemaking',
  'woodcutting',
  'farming',
  'summoning',
  'invention'
];

class App extends Component {
  state = {
    skill: 'attack',
    user: 'wh1tebird'
  };

  setSkill = skill => {
    this.setState({ skill });
  };

  setUser = user => {
    this.setState({ user });
  };
  render() {
    const { classes } = this.props;
    const { user } = this.state;

    const userButtons = ['wh1tebird', 'zamorakyan', 'amadeus501'].map(user => (
      <Button key={user + 'button'} onClick={() => this.setUser(user)}>
        {user}
      </Button>
    ));

    const documents = skills.map((skill, i) => {
      const row = i % 9;
      const column = Math.floor(i / 9);

      return (
        <FirestoreDocument
          key={skill + 'firestoredocument'}
          path={'/stats/' + skill}
          sort="timestamp:desc"
          render={({ isLoading, data }) => {
            return isLoading ? null : (
              <>
                <span
                  style={{
                    position: 'absolute',
                    left: 27 + column * 60,
                    top: 2 + row * 27
                  }}
                >
                  {data[user].level}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    left: 42 + column * 60,
                    top: 12 + row * 27
                  }}
                >
                  {skill === 'dungeoneering' ||
                  skill === 'slayer' ||
                  skill === 'invention'
                    ? 120
                    : 99}
                </span>
              </>
            );
          }}
        />
      );
    });

    return (
      <div className={classes.root}>
        {userButtons}
        <div className={classes.skills}>
          {/* {skills.map(skill => (
          <Skill key={skill + 'badge'} skill={skill} />
        ))} */}
          {/* {skills.map(skill => (
          <button key={skill + 'button'} onClick={() => this.setSkill(skill)}>
            {skill}
          </button>
        ))} */}
          <img src={skillsBg} alt="skills background" />
          {documents}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
