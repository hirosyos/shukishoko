import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import profilePageStyle from 'assets/jss/nextjs-material-kit-pro/pages/profilePageStyle.js';
const useStyles = makeStyles(profilePageStyle);

export const AppMain = (props) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.main, classes.mainRaised)}>
      <div className={classes.container}>
        <>{props.children}</>
      </div>
    </div>
  );
};
