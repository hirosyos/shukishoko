/*eslint-disable*/
import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';

import { AppLayout } from 'src/components/organisms/AppLayout';
import { AppHead } from 'src/components/organisms/AppHead';

import errorPageStyle from 'assets/jss/nextjs-material-kit-pro/pages/errorPageStyles.js';

import image from 'public/hana_05F.jpg';

const useStyles = makeStyles(errorPageStyle);

export default function ErrorPage({ ...rest }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <AppHead pageTitle={`404 ページが見つかりません`} />
      <AppLayout>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: 'url(' + image + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
          }}
        >
          <div className={classes.contentCenter}>
            <GridContainer>
              <GridItem md={12}>
                <h1 className={classes.title}>404</h1>
                <h2 className={classes.subTitle}>ページが見つかりません</h2>
                <h4 className={classes.description}>
                  左上のトップページリンクから入り直してみてください
                </h4>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </AppLayout>
    </div>
  );
}
