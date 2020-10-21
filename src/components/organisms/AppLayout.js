/*eslint-disable*/
import React, { useContext } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
/* nextjs-matelial-ui-kit */
// import blogPostsPageStyle from 'assets/jss/nextjs-material-kit-pro/pages/blogPostsPageStyle.js';
/* MyApp */
import { AppHeader } from 'src/components/organisms/AppHeader';
import AppHeaderLinks from 'src/components/organisms/AppHeaderLinks';

import { AppFooter } from 'src/components/organisms/AppFooter';
import { AuthContext } from 'pages/_app';

import profilePageStyle from 'assets/jss/nextjs-material-kit-pro/pages/profilePageStyle.js';
import { RSC } from 'src/common/resource';
const useStyles = makeStyles(profilePageStyle);

/**
 * レイアウト
 * AppHeadでメタ情報定義
 * AppNaviでサイドバーと上部のAppバー定義して、childrenはmainタグに入れます
 * AppFooterは共通フッタ
 *
 * @param {*} { children, pageTitle, userData }
 * @return {*}
 */
export const AppLayout = ({ children }) => {
  //認証情報取得
  const { user, userData } = useContext(AuthContext);

  const classes = useStyles();
  return (
    <>
      <AppHeader
        brand={RSC.appTitle}
        links={<AppHeaderLinks dropdownHoverColor="info" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: 'info',
        }}
      />

      {/* <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}> */}
      <div>{children}</div>
      {/* </div>
      </div> */}

      <AppFooter />
    </>
  );
};
