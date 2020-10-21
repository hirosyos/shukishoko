/*eslint-disable*/ import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// @material-ui/icons
import Favorite from '@material-ui/icons/Favorite';
// core components
import Header from 'components/Header/Header.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Parallax from 'components/Parallax/Parallax.js';

import landingPageStyle from 'assets/jss/nextjs-material-kit-pro/pages/landingPageStyle.js';

// Sections for this page
import SectionProduct from 'pages-sections/landing-page/SectionProduct.js';
// import SectionTeam from 'pages-sections/landing-page/SectionTeam.js';
// import SectionWork from 'pages-sections/landing-page/SectionWork.js';

import { AppHead } from 'src/components/organisms/AppHead';
import { AppLayout } from 'src/components/organisms/AppLayout';

const useStyles = makeStyles(landingPageStyle);

export default function LandingPage({ ...rest }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <AppLayout>
        <Parallax image={require('public/rainbow.jpg')} filter="dark">
          <div className={classes.container}>
            <GridContainer>
              {/* <GridContainer justify="center"> */}
              <GridItem xs={12} sm={6} md={6}>
                <h1 className={classes.title}>思い出を未来に繋げる</h1>
                <h4>
                  あなたの思い出を手記にして共有することで、誰かの未来に繋がるかもしれません。
                  同様に、誰かの思い出が、あなたの未来に繋がるかもしれません。
                  手記書庫は思い出と思い出の繋がる場所を提供し、それを未来に繋げます。
                </h4>
                <br />
                {/* <GridContainer justify="center"> */}
                {/* <GridContainer> */}
                {/* <Button
                    color="danger"
                    size="lg"
                    // href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                    target="_blank"
                  >
                    <i className="fas fa-play" />
                    動画を見る
                  </Button> */}
                <br />
                <Button
                  color="primary"
                  size="lg"
                  href="/top"
                  // target="_blank"
                >
                  <i className="fas fa-book" />
                  書庫を見てみる
                </Button>
                {/* </GridContainer> */}
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <SectionProduct />
            {/* <SectionTeam />
            <SectionWork /> */}
          </div>
        </div>
      </AppLayout>
    </div>
  );
}
