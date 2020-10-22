import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// @material-ui/icons
import Mail from '@material-ui/icons/Mail';
import Favorite from '@material-ui/icons/Favorite';
// core components
import Footer from 'components/Footer/Footer.js';
import { RSC } from 'src/common/resource';

import styles from 'assets/jss/nextjs-material-kit-pro/pages/componentsSections/footerStyle.js';

const useStyles = makeStyles(styles);

/**
 * App共通フッタ
 *
 * @return {*}
 */
export const AppFooter = () => {
  const classes = useStyles();
  return (
    <Footer
      theme="transparent"
      content={
        <div>
          <div className={classes.left}>
            <a href="/top" className={classes.footerBrand}>
              {RSC.appTitle}
            </a>
          </div>
          <div className={classes.pullCenter}>
            <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                <a href="/landing-page" className={classes.block}>
                  Manual
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a href="/pricing" className={classes.block}>
                  Payment
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a href="/about-us" className={classes.block}>
                  About Us
                </a>
              </ListItem>
            </List>
          </div>
          <div className={classes.rightLinks}>
            <ul>
              <li>
                <a href="https://twitter.com/shukishokoinfo" target="blank">
                  <i
                    className={
                      'fab fa-twitter' +
                      ' ' +
                      classes.iconSocial +
                      ' ' +
                      classes.btnTwitter
                    }
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      }
    />
  );
};
