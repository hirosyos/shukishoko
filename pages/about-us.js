/*eslint-disable*/
import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Parallax from 'components/Parallax/Parallax.js';
// sections for this page
import SectionTeam from 'pages-sections/about-us/SectionTeam.js';
import aboutUsStyle from 'assets/jss/nextjs-material-kit-pro/pages/aboutUsStyle.js';
/* MyApp */
import { AppLayout } from 'src/components/organisms/AppLayout';
import { AppHead } from 'src/components/organisms/AppHead';

const useStyles = makeStyles(aboutUsStyle);

export default function AboutUsPage() {
  const classes = useStyles();
  return (
    <div>
      <AppHead pageTitle={`私達について`} />
      <AppLayout>
        <Parallax image={require('public/cat_01.jpg')} filter="dark" small>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem
                md={8}
                sm={8}
                className={classNames(
                  classes.mlAuto,
                  classes.mrAuto,
                  classes.textCenter,
                )}
              >
                <h1 className={classes.title}>About Us</h1>
                <h4>私達について</h4>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <SectionTeam />
          </div>
        </div>
      </AppLayout>
    </div>
  );
}
