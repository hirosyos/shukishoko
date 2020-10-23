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
import {
  getUserDataFromUserName,
  getBookDataFromBookName,
} from 'src/common/common';
import { RSC } from 'src/common/resource';
import Link from 'src/components/atoms/Link';
import SimpleModal from 'src/components/atoms/SimpleModal';
import { BookCreateInputForm } from 'src/components/molecules/Book';
import { AppHead } from 'src/components/organisms/AppHead';
import { AppLayout } from 'src/components/organisms/AppLayout';
import { AppMain } from 'src/components/organisms/AppMain';
import { AuthContext } from 'pages/_app';
import image from 'public/hana_07F.jpg';

import SectionCreateInputForm from 'src/components/molecules/Section';

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
 * @export aa
 * @param {*} aa
 * @return {*}
 */
export async function getStaticProps({ params }) {
  const { userName, bookName } = params;
  console.log({ userName });
  console.log({ bookName });
  // ユーザ名からユーザデータを取得
  const { userData } = await getUserDataFromUserName(userName);

  // 該当ユーザ名のデータが存在しない場合はデータ部をNullで返す
  if (!userData) {
    console.log('関数：getStaticProps 該当ユーザ名のデータが見つからない');
    return {
      props: {
        userName,
        userData: null,
        bookName,
        bookData: null,
        bookId: null,
      },
    };
  }

  // ブック名からブックデータを取得
  const { bookData } = await getBookDataFromBookName(userName, bookName);
  // 該当ブック名のデータが存在しない場合はデータ部をNullで返す
  if (!bookData) {
    console.log('関数：getStaticProps 該当ブック名のデータが見つからない');
    return {
      props: {
        userName,
        userData,
        bookName,
        bookData: null,
        bookId: null,
      },
    };
  }

  return {
    // Next.jsはDate型を返してほしくないようなのでこのような対処をしている
    props: {
      userName: params.userName,
      userData: JSON.parse(JSON.stringify(userData)),
      bookName: params.bookName,
      bookData: JSON.parse(JSON.stringify(bookData)),
      bookId: bookData.bookId,
    },
  };
}

/**
 * セクション作成ページ
 *
 * @export
 * @param {*} props
 * @return {*}
 */
export default function SectionCreatePage({
  userName,
  userData,
  bookName,
  bookData,
  bookId,
}) {
  console.log({
    userName,
    userData,
    bookName,
    bookData,
    bookId,
  });

  // ルーティング情報
  const router = useRouter();
  // 認証情報取得
  const { user: authUser, userData: authUserData } = useContext(AuthContext);
  console.log({ authUser });
  console.log({ authUserData });
  // return <p>Hello</p>;

  const [authUserName, setAuthUserName] = useState('');
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
    console.log(`${userName}/${bookName}静的ページ作成中...`);
    return <div>{`${userName}/${bookName}静的ページ作成中...`}</div>;
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

  // ユーザネームがない段階では何もしない;
  if (!bookName) {
    console.log('異常終了 そんな手記はありません\n');

    return <div>そんな手記はありません...</div>;
  }

  if (!bookData) {
    console.log('異常終了 指定された手記は存在しません...\n');

    return <div>指定された手記は存在しません...</div>;
  }

  // return <p>Hello</p>;

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
        url={`${RSC.domain}/users/${userName}/${bookName}/section-create`}
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
                {/*********************/}
                {/* セクション作成カード */}
                {/*********************/}
                <Card className={classes.cardSignup}>
                  <h2 className={classes.cardTitle}>新規セクション作成</h2>
                  <GridContainer justify="center">
                    <GridItem align="center">
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {userData.userIconImageUrl}
                      </Avatar>
                      <h3 className={classes.title}>
                        {userData.userDisplayName}
                      </h3>
                      <p>
                        @{userData.userName}/{bookData.bookName}
                      </p>
                    </GridItem>
                  </GridContainer>
                  <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={10} md={10}>
                        {/* <BookCreateInputForm classes userData={userData} /> */}
                        <SectionCreateInputForm
                          classes={classes}
                          userName={userName}
                          userData={userData}
                          bookName={bookName}
                          bookData={bookData}
                          bookId={bookId}
                        />
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
          {/* ログインしているが他人の手記にセクション作ろうとしているとき */}
          {authUserData.uid !== userData.uid && (
            <SimpleModal
              modalTitle={`セクションを作成できるのは自分の手記に対してのみです`}
              modalText="トップページへ移動します"
              closeBtnTxt=""
              yesBtnTxt="OK"
              noBtnTxt=""
              callBack={callBackSetMoveTopPage}
            />
          )}
        </div>

        <p>
          ユーザー:
          {userData.userName}
        </p>

        <Link href={`/users/${userData.userName}`}>
          <a>ユーザページへ戻る</a>
        </Link>
      </AppLayout>
    </>
  );

  return (
    <>
      {/*******************/}
      {/* ヘッダ情報        */}
      {/*******************/}
      <AppHead
        pageTitle={`${RSC.appTitle}`}
        description={`${RSC.appTitle}は${RSC.topPageDescription_1}`}
        url={`${RSC.domain}/section-create`}
      />
      <AppLayout>
        {/* <Layout> */}
        <h1>セクション作成</h1>
        <p>
          {' '}
          ユーザー:
          {props.userName}
        </p>
        <p>
          {' '}
          手記:
          {props.bookName}
        </p>

        <SectionCreateInputForm
          userData={props.userData}
          bookData={props.bookData}
          bookId={props.bookId}
        />

        <Link href={`/users/${props.userName}`}>
          <a>ユーザページへ戻る</a>
        </Link>
        <Link href={`/users/${props.userName}/${props.bookName}`}>
          <a>手記ページへ戻る</a>
        </Link>

        {/* </Layout> */}
      </AppLayout>
    </>
  );
}
