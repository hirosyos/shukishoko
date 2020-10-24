// import Link from 'src/components/atoms/Link';
// import { AppLayout } from 'src/components/organisms/AppLayout';
// import { RSC } from 'src/common/resource';
// import { AppHead } from 'src/components/organisms/AppHead';

// /**
//  * ユーザ設定ページ
//  *
//  * @return {*}
//  */
// export default function UserSettingPage() {
//   return (
//     <>
//       {/*******************/}
//       {/* ヘッダ情報        */}
//       {/*******************/}
//       <AppHead
//         pageTitle={`${RSC.appTitle}`}
//         description={`${RSC.appTitle}は${RSC.topPageDescription_1}`}
//         url={`${RSC.domain}/user-setting`}
//       />
//       <AppLayout>
//         <h1>Welcome to ユーザ設定 ページ</h1>

//       </AppLayout>
//     </>
//   );
// }

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
  getBookDataListFromUserData,
  getSectionDataListFromUserData,
} from 'src/common/common';
import { RSC } from 'src/common/resource';
import Link from 'src/components/atoms/Link';
import SimpleModal from 'src/components/atoms/SimpleModal';
import { UserForm } from 'src/components/molecules/UserForm';
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
 * @export
 * @param {*} { params }
 * @return {*}
 */
// export async function getStaticProps({ params }) {
export const getStaticProps = async ({ params }) => {
  // パスから切り出された値が入っている
  const { userName } = params;

  // ユーザ名からユーザデータを取得
  const { userData } = await getUserDataFromUserName(userName);

  // 該当ユーザ名のデータが存在しない場合はデータ部をNullで返す;
  if (!userData) {
    // デバッグ情報
    console.log('異常終了 該当ユーザ名のデータが存在しない\n');

    return {
      props: {
        userName,
        userData: null,
      },
    };
  }

  // ユーザデータ配下のブックデータリストを取得
  const bookDataList = await getBookDataListFromUserData(userData);

  // ユーザデータ配下のセクションデータリストを取得
  const sectionDataList = await getSectionDataListFromUserData(userData);

  return {
    // Next.jsはDate型を返してほしくないようなのでこのような対処をしている
    props: {
      userName,
      userData: JSON.parse(JSON.stringify(userData)),
      bookDataList: JSON.parse(JSON.stringify(bookDataList)),
      sectionDataList: JSON.parse(JSON.stringify(sectionDataList)),
    },
  };
};

/**
 * ユーザ設定ページ
 *
 * @export
 * @param {*} props
 * @return {*}
 */
export default function UserEditPage({
  userName,
  userData,
  bookDataList,
  sectionDataList,
}) {
  console.log({
    userName,
    userData,
    bookDataList,
    sectionDataList,
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
    console.log(`${userName}/user-edit 静的ページ作成中...`);
    return <div>{`${userName}/user-edit 静的ページ作成中...`}</div>;
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

  // // ユーザネームがない段階では何もしない;
  // if (!bookName) {
  //   console.log('異常終了 そんな手記はありません\n');

  //   return <div>そんな手記はありません...</div>;
  // }

  // if (!bookData) {
  //   console.log('異常終了 指定された手記は存在しません...\n');

  //   return <div>指定された手記は存在しません...</div>;
  // }

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
        url={`${RSC.domain}/users/${userName}/user-edit`}
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
                {/* ユーザ編集カード     */}
                {/*********************/}
                <Card className={classes.cardSignup}>
                  <h2 className={classes.cardTitle}>ユーザ編集</h2>
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
                        <UserForm
                          classes={classes}
                          // userName={userName}
                          userData={userData}
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
          {/* ログインしているが他人のユーザ情報を編集しようとしているとき */}
          {authUserData.uid !== userData.uid && (
            <SimpleModal
              modalTitle={`ユーザ情報を編集できるのは本人のみです`}
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
