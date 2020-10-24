/* react */
import React, { useState, useEffect, useContext } from 'react';
/* next */
import { useRouter } from 'next/router';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
// nextjs-materialui-kit
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
/* MyApp */
import { RSC } from 'src/common/resource';
import Link from 'src/components/atoms/Link';
import SimpleModal from 'src/components/atoms/SimpleModal';
import { BookCreateInputForm } from 'src/components/molecules/Book';
import { AppHead } from 'src/components/organisms/AppHead';
import { AppLayout } from 'src/components/organisms/AppLayout';
import { AppMain } from 'src/components/organisms/AppMain';
import { AuthContext } from 'pages/_app';
import image from 'public/hana_07F.jpg';

// スタイル設定
import signupPageStyle from 'assets/jss/nextjs-material-kit-pro/pages/signupPageStyle.js';
const useStyles = makeStyles(signupPageStyle);

/**
 * 手記作成ページ
 *
 * @export
 * @param {*} props
 * @return {*}
 */

export default function BookCreatePage() {
  // 認証情報取得
  const { user, userData } = useContext(AuthContext);
  // ルーティング設定
  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [moveTopPage, setMoveTopPage] = useState('');

  // ログインしていなければTopページへ飛ばす;
  useEffect(() => {
    if (moveTopPage) {
      router.push(`/top`);
    }
  }, [moveTopPage]);

  /**
   * moveTopPageを操作するコールバック関数
   *
   * @param {*} props
   */
  const callBackSetMoveTopPage = (props) => {
    switch (props) {
      case 'close':
        setMoveTopPage(true);
        break;
      case 'yes':
        setMoveTopPage(true);
        break;
      case 'no':
        setMoveTopPage(true);
        break;
      default:
        console.log('パラメータ異常');
    }
  };

  // スタイル読み出し
  const classes = useStyles();

  return (
    <>
      {/*******************/}
      {/* ヘッダ情報        */}
      {/*******************/}
      <AppHead
        pageTitle={`${RSC.appTitle}`}
        description={`${RSC.appTitle}は${RSC.topPageDescription_1}`}
        url={`${RSC.domain}/book-create`}
      />
      <AppLayout>
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
              <GridItem xs={12} sm={10} md={10}>
                {/****************/}
                {/* 手記作成カード */}
                {/****************/}
                <Card className={classes.cardSignup}>
                  <h2 className={classes.cardTitle}>新規手記作成</h2>
                  <GridContainer justify="center">
                    <GridItem align="center">
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {userData.userIconEmoji ? userData.userIconEmoji : '🙆'}
                      </Avatar>
                      <h3 className={classes.title}>
                        {userData.userDisplayName}
                      </h3>
                      <p>@{userData.userName}</p>
                    </GridItem>
                  </GridContainer>
                  <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={10} md={10}>
                        <BookCreateInputForm classes userData={userData} />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          {/* ログインしていない場合 */}
          {!user && (
            <SimpleModal
              modalTitle={`ログインしていません`}
              modalText="トップページへ移動します"
              closeBtnTxt=""
              yesBtnTxt="OK"
              noBtnTxt=""
              callBack={callBackSetMoveTopPage}
            />
          )}
        </div>
      </AppLayout>
    </>
  );
}
