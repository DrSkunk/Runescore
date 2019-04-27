import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    fontFamily: 'RuneScape UF Regular'
  }
});

class Skill extends Component {
  state = {};

  render() {
    const { classes, skill } = this.props;
    const level = 99;
    const maxLevel = 99;
    return (
      <div className={classes.root}>
        {skill}: {level}/{maxLevel}
      </div>
    );
  }
}

export default withStyles(styles)(Skill);
