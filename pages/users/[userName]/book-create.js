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
import { getUserDataFromUserName } from 'src/common/common';
import { RSC } from 'src/common/resource';
import SimpleModal from 'src/components/atoms/SimpleModal';
import { BookForm } from 'src/components/molecules/BookForm';
import { AppHead } from 'src/components/organisms/AppHead';
import { AppLayout } from 'src/components/organisms/AppLayout';
import { AuthContext } from 'pages/_app';
import image from 'public/hana_07F.jpg';

// スタイル設定
import signupPageStyle from 'assets/jss/nextjs-material-kit-pro/pages/signupPageStyle.js';
const useStyles = makeStyles(signupPageStyle);

/**
 * 静的パス取得
 *
 * @export
 * @return {*}
 */
export async function getStaticPaths() {
  const paths = [];

  return { paths, fallback: true };
}

/**
 * 静的パラメータ取得
 *
 * @export
 * @param {*} { params.userName 'パスから切り出された値'}
 * @param {*} { params.bookName 'パスから切り出された値'}
 * @return {*}
 */
export async function getStaticProps({ params }) {
  // デバッグ情報
  // console.log('\nファイル /pages/users/[userName]/[bookName].js');
  // console.log('関数 getStaticProps');
  // console.log({ params });

  const { userName, bookName } = params;

  // ユーザ名からユーザデータを取得
  const { userData } = await getUserDataFromUserName(userName);
  // 該当ユーザ名のデータが存在しない場合はデータ部をNullで返す
  if (!userData) {
    console.log('関数 getStaticProps そんなユーザいません');
    return {
      props: {
        userName,
        userData: null,
        bookName,
        bookData: null,
      },
    };
  }

  return {
    // Next.jsはDate型を返してほしくないようなのでJSON変換という暫定処理
    props: {
      userName,
      userData: JSON.parse(JSON.stringify(userData)),
    },
  };
}

/**
 * 手記作成ページ
 *
 * @export
 * @param {*} props
 * @return {*}
 */

export default function BookCreatePage({ userName, userData }) {
  // const { userName, userData } = params;
  // // 認証情報取得
  // const { user, userData } = useContext(AuthContext);
  // 認証情報取得
  const { user: authUser, userData: authUserData } = useContext(AuthContext);
  // ルーティング設定
  const router = useRouter();

  // const [userName, setUserName] = useState('');
  const [moveTopPage, setMoveTopPage] = useState('');

  // スタイル読み出し
  const classes = useStyles();

  // ログインしていなければTopページへ飛ばす;
  useEffect(() => {
    if (moveTopPage) {
      router.push(`/top`);
    }
  }, [moveTopPage]);

  // 事前ビルドされていない場合はここで作成する

  if (router.isFallback) {
    console.log(`${userName}/book-create 静的ページ作成中...`);
    return <div>{`${userName}/book-create 静的ページ作成中...`}</div>;
  }

  // ユーザネームがない段階では何もしない;
  if (!userName) {
    console.log('異常終了 そんなユーザいません\n');
    return <div>そんなユーザいません...</div>;
  }

  if (!userData) {
    console.log('異常終了 指定されたユーザは存在しません...\n');
    return <div>指定されたユーザは存在しません...</div>;
  }

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

  return (
    <>
      {/*******************/}
      {/* ヘッダ情報        */}
      {/*******************/}
      <AppHead
        pageTitle={`${RSC.appTitle}`}
        description={`${RSC.appTitle}は${RSC.topPageDescription_1}`}
        url={`${RSC.domain}/${userName}/book-create`}
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
                        <BookForm classes userData={userData} />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          {/* ログインしていない場合 */}
          {!authUser && (
            <SimpleModal
              modalTitle={`ログインしていません`}
              modalText="トップページへ移動します"
              closeBtnTxt=""
              yesBtnTxt="OK"
              noBtnTxt=""
              callBack={callBackSetMoveTopPage}
            />
          )}
          {/* ログインしているが他人のデータに手記を作ろうとしているとき */}
          {authUserData.uid !== userData.uid && (
            <SimpleModal
              modalTitle={`手記を作成できるのは自分のデータに対してのみです`}
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
