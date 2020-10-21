import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import NavPills from 'components/NavPills/NavPills.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import Button from 'components/CustomButtons/Button.js';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import pricingStyle from 'assets/jss/nextjs-material-kit-pro/pages/pricingSections/pricingStyle.js';

const useStyles = makeStyles(pricingStyle);

export default function SectionPricing() {
  const classes = useStyles();
  return (
    <div className={classes.pricingSection}>
      <GridContainer>
        <GridItem
          md={6}
          sm={6}
          className={classNames(
            classes.mrAuto,
            classes.mlAuto,
            classes.textCenter,
          )}
        >
          <NavPills
            alignCenter
            color="primary"
            tabs={[
              {
                tabButton: 'monthly',
              },
              {
                tabButton: 'yearly',
              },
            ]}
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem md={4} sm={4}>
          <Card raised pricing color="primary">
            <CardBody pricing>
              <h6 className={classes.cardCategory}>Free</h6>
              <h1 className={classes.cardTitleWhite}>
                <small>¥</small>0 <small>/月</small>
              </h1>
              <ul>
                <li>
                  <b>-</b>
                </li>
                <li>
                  <b>-</b>
                </li>
                <li>
                  <b>-</b>
                </li>
                <li>
                  <b>-</b>
                </li>
              </ul>
              <Button href="#pablo" color="white" round>
                はじめる
              </Button>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem md={4} sm={4}>
          <Card plain pricing>
            <CardBody pricing>
              <h6
                className={classNames(classes.cardCategory, classes.textInfo)}
              >
                Standard
              </h6>
              <h1 className={classes.cardTitle}>
                <small>¥</small>100 <small>/月</small>
              </h1>
              <ul>
                <li>
                  <b>-</b>
                </li>
                <li>
                  <b>-</b>
                </li>
                <li>
                  <b>-</b>
                </li>
                <li>
                  <b>-</b>
                </li>
              </ul>
              <Button href="#pablo" color="primary" round>
                はじめる
              </Button>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem md={4} sm={4}>
          <Card plain pricing>
            <CardBody pricing>
              <h6
                className={classNames(classes.cardCategory, classes.textInfo)}
              >
                Premium
              </h6>
              <h1 className={classes.cardTitle}>
                <small>¥</small>500 <small>/月</small>
              </h1>
              <ul>
                <li>
                  <b>-</b>
                </li>
                <li>
                  <b>-</b>
                </li>
                <li>
                  <b>-</b>
                </li>
                <li>
                  <b>-</b>
                </li>
              </ul>
              <Button href="#pablo" color="primary" round>
                はじめる
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
