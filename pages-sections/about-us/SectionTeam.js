import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Card from 'components/Card/Card.js';
import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button.js';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import teamStyle from 'assets/jss/nextjs-material-kit-pro/pages/aboutUsSections/teamStyle.js';

import Hiro from 'public/hiro.jpg';

const useStyles = makeStyles(teamStyle);

export default function SectionTeam() {
  const classes = useStyles();
  return (
    <div className={classes.team}>
      <GridContainer>
        <GridItem
          md={8}
          sm={8}
          className={classNames(
            classes.mrAuto,
            classes.mlAuto,
            classes.textCenter,
          )}
        >
          <h2 className={classes.title}>MISSION</h2>
          <h5 className={classes.description}>
            過去が辛く、現在が苦しく、未来に不安があってなお、
            生きる楽しみを発見/発展させることで未来に希望を見出し、
            一人でも多くの人が素晴らしい人生だったと
            笑って終われる世界を創ります
          </h5>
        </GridItem>
      </GridContainer>
      <GridContainer justify="center">
        <GridItem md={8} sm={8}>
          <Card profile plain>
            <CardAvatar profile plain>
              <a href="#pablo">
                <img src={Hiro} alt="profile-pic" className={classes.img} />
              </a>
            </CardAvatar>
            <CardBody plain>
              <h4 className={classes.cardTitle}>Yoshida Hiroshi</h4>
              <h4 className={classes.cardTitle}>吉田洋</h4>
              <h6 className={classes.textMuted}>フロントエンドエンジニア</h6>
              <p className={classes.cardDescription}>
                14年間、インフラ系開発を経験。
                個人が直接触って楽しめるプロダクトを創りたいという思いが強くなり
                心機一転、WEBサービスを作れるエンジニアを目指す。
              </p>
            </CardBody>
            <CardFooter className={classes.justifyContent}>
              <Button
                href="https://twitter.com/miniusagi33"
                target="blank"
                justIcon
                simple
                color="twitter"
              >
                <i className="fab fa-twitter" />
              </Button>
              <Button
                href="https://www.facebook.com/hiroshi.yoshida.7927"
                target="blank"
                justIcon
                simple
                color="facebook"
              >
                <i className="fab fa-facebook" />
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
