/*eslint-disable*/
import React from 'react';
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
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Parallax from 'components/Parallax/Parallax.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Footer from 'components/Footer/Footer.js';
// sections for this page
import SectionPricing from 'pages-sections/pricing-page/SectionPricing.js';
import SectionFeatures from 'pages-sections/pricing-page/SectionFeatures.js';

import pricingStyle from 'assets/jss/nextjs-material-kit-pro/pages/pricingStyle.js';

/* MyApp */
import { AppLayout } from 'src/components/organisms/AppLayout';
import { AppHead } from 'src/components/organisms/AppHead';

const useStyles = makeStyles(pricingStyle);

export default function PricingPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <AppHead pageTitle={`私達について`} />
      <AppLayout>
        <Parallax image={require('public/cat_02.jpg')} filter="dark" small>
          <div className={classes.container}>
            <GridContainer>
              <GridItem
                md={8}
                sm={8}
                className={classNames(
                  classes.mlAuto,
                  classes.mrAuto,
                  classes.textCenter,
                )}
              >
                <h1 className={classes.title}>さあ、はじめましょう</h1>
                <h4>
                  このページは将来のためのページで、現在は無料でお使いいただけます。
                  将来的に、料金を支払うに値するサービスを目指し日々改善を行います。
                </h4>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <SectionPricing />
            {/* <hr />
            <SectionFeatures /> */}
          </div>
        </div>
      </AppLayout>
    </div>
  );
}
