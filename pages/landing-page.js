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
import { RSC } from 'src/common/resource';
import Link from 'src/components/atoms/Link';

const useStyles = makeStyles(landingPageStyle);

export default function LandingPage({ ...rest }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <>
      {/*******************/}
      {/* ヘッダ情報        */}
      {/*******************/}
      <AppHead
        pageTitle={`${RSC.appTitle}`}
        description={`${RSC.appTitle}は${RSC.topPageDescription_1}`}
        url={`${RSC.domain}/landing-page`}
      />
      <AppLayout>
        <Parallax image={require('public/rainbow.jpg')} filter="dark">
          <div className={classes.container}>
            <GridContainer>
              {/* <GridContainer justify="center"> */}
              <GridItem xs={12} sm={6} md={6}>
                {/* コンセプト */}
                <h1 className={classes.title}>{RSC.appConcept}</h1>
                {/* ディスクリプション */}
                <h4>
                  {RSC.landingPageDescription_1}
                  {RSC.landingPageDescription_2}
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
                  component={Link}
                  style={{ textDecoration: 'none', color: 'white' }}
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
    </>
  );
}
