/* react */
import React, { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
/* next */
import Router from 'next/router';
// import App from 'next/App';
import Head from 'next/head';
/* react-firebase-hooks */
import { useAuthState } from 'react-firebase-hooks/auth';
/* NextJS Material Kit PRO */
import PageChange from 'components/PageChange/PageChange.js';
import 'assets/scss/nextjs-material-kit-pro.scss?v=1.1.0';
import 'assets/css/react-demo.css';
import 'animate.css/animate.min.css';
/* material-ui */
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
/* MyApp */
import firebase from 'src/common/firebase';
import { getUserDataFromUid } from 'src/common/common';

import theme from 'src/common/theme';

// 認証用コンテキスト作成
export const AuthContext = createContext();

// ルートが変化を開始する際に発火
Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add('body-page-transition');
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById('page-transition'),
  );
});
// ルートの変化が完了した際に発火
Router.events.on('routeChangeComplete', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
  document.body.classList.remove('body-page-transition');
});
// ルートが変化する最中、エラーが起こった際に発火
Router.events.on('routeChangeError', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
  document.body.classList.remove('body-page-transition');
});

/**
 * すべてのページで呼ばれるコンポーネント
 *
 * @param {*} { Component, pageProps }
 * @return {*}
 */
function MyApp({ Component, pageProps }) {
  // 状態定義
  const [userData, setUserData] = useState({});

  // material-uiをNeztJSでうまく動かす仕組み。
  // 詳細は、https://github.com/mui-org/material-ui/tree/master/examples/nextjs
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // 認証情報取得
  const [user, loading, error] = useAuthState(firebase.auth());

  // 認証されていればその認証ユーザのデータを取得
  useEffect(() => {
    if (user) {
      async function fetchData() {
        const { userData } = await getUserDataFromUid(user.uid);
        setUserData(userData);
      }
      fetchData();
    }
  }, [user]);

  // 認証系の動作はクライアントサイドのみで行う
  if (process.browser) {
    if (loading) {
      return (
        <>
          {/* <p>Initialising User...</p> */}
          <PageChange path={'/Initialising User...'} />
        </>
      );
    }
    if (error) {
      console.log({ error });
      return (
        <div>
          <p>
            認証処理でエラーが発生しました:
            {error}
          </p>
        </div>
      );
    }
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AuthContext.Provider value={{ user, userData }}>
          <Component {...pageProps} />
        </AuthContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
