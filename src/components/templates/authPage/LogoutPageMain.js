/* react */
import React, { useState, useEffect, useContext, useRef } from 'react';
/* next */
import { useRouter } from 'next/router';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CustomInput from 'components/CustomInput/CustomInput.js';

// import image from 'assets/img/bg7.jpg';
import image from 'public/hana_06F.jpg';

/* MyApp */
import { RSC } from 'src/common/resource';
import firebase from 'src/common/firebase';
import { getUserDataFromUid, firebaseErrToTxt } from 'src/common/common';
import SimpleModal from 'src/components/atoms/SimpleModal';
import { AppMain } from 'src/components/organisms/AppMain';
import { AuthContext } from 'pages/_app';
import { AppHead } from 'src/components/organisms/AppHead';

// スタイル設定
import loginPageStyle from 'assets/jss/nextjs-material-kit-pro/pages/loginPageStyle.js';
const useStyles = makeStyles(loginPageStyle);

/**
 * ログアウトページメイン
 *
 * @return {*}
 */
export default function LogoutPageMain() {
  const router = useRouter();

  const onSubmit = async (e) => {
    await firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((e) => {
        console.log(e.message, mounted);
      })
      .finally(() => {
        console.log('ログアウトしました');
        router.push('/');
      });
  };

  // スタイル読み出し
  const classes = useStyles();

  const [pending, setPending] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    const cleanup = () => {
      mounted.current = false;
    };
    return cleanup;
  }, []);

  return (
    <>
      {/*******************/}
      {/* ヘッダ情報        */}
      {/*******************/}
      <AppHead
        pageTitle={`${RSC.appTitle}`}
        description={`${RSC.appTitle}は${RSC.topPageDescription_1}`}
        url={`${RSC.domain}/logout`}
      />
      {/*******************/}
      {/* 背景画像         */}
      {/*******************/}
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={8} md={4}>
              {/****************/}
              {/* ログインカード */}
              {/****************/}
              <Card>
                <form className={classes.form}>
                  <CardHeader
                    color="primary"
                    signup
                    className={classes.cardHeader}
                  >
                    <h4 className={classes.cardTitle}>また会いましょう</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.iconButtons}
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fab fa-twitter" />
                      </Button>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.iconButtons}
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fab fa-facebook" />
                      </Button>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.iconButtons}
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fab fa-google-plus-g" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardBody signup></CardBody>
                  {/***********************/}
                  {/* ログアウトボタン       */}
                  {/***********************/}
                  <div className={classes.textCenter}>
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      type="submit"
                      onClick={onSubmit}
                    >
                      ログアウトする
                    </Button>
                  </div>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </>
  );
}
