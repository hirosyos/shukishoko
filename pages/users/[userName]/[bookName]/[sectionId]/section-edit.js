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
import signupPageStyle from 'assets/jss/nextjs-material-kit-pro/pages/signupPageStyle.js';
/* MyApp */
import {
  getUserDataFromUserName,
  getBookDataFromBookName,
  getSectionDataFromSectionId,
} from 'src/common/common';
import { RSC } from 'src/common/resource';
import SimpleModal from 'src/components/atoms/SimpleModal';
import { SectionForm } from 'src/components/molecules/SectionForm';
import { AppHead } from 'src/components/organisms/AppHead';
import { AppLayout } from 'src/components/organisms/AppLayout';
import { AuthContext } from 'pages/_app';
import image from 'public/hana_07F.jpg';

// スタイル設定
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
// export async function getServerSideProps({ params }) {
export async function getStaticProps({ params }) {
  const { userName, bookName, sectionId } = params;

  // ユーザネームからユーザデータを取得
  const { userData } = await getUserDataFromUserName(userName);
  // ブックネームからブックデータを取得
  const { bookData } = await getBookDataFromBookName(userName, bookName);
  // セクションIDからセクションデータを取得
  const { sectionData } = await getSectionDataFromSectionId(
    userName,
    bookName,
    sectionId,
  );
  // 該当セクションIDのデータが存在しない場合はデータ部をNullで返す
  if (!userData || !bookData || !sectionData) {
    console.log('ユーザ、ブック、セクションのデータ全てが揃いませんでした\n');
    return {
      props: {
        userName,
        userData,
        bookName,
        bookData,
        sectionId,
        sectionData: null,
      },
      revalidate: 1,
    };
  }

  return {
    // Next.jsはDate型を返してほしくないようなのでこのような対処をしている
    props: {
      userName,
      userData: JSON.parse(JSON.stringify(userData)),
      bookName,
      bookData: JSON.parse(JSON.stringify(bookData)),
      sectionId,
      sectionData: JSON.parse(JSON.stringify(sectionData)),
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
export default function SectionEditPage({
  userName,
  userData,
  bookName,
  bookData,
  sectionId,
  sectionData,
}) {
  // console.log({
  //   userName,
  //   userData,
  //   bookName,
  //   bookData,
  //   sectionId,
  //   sectionData,
  // });

  // ルーティング情報
  const router = useRouter();
  // 認証情報取得
  const { user: authUser, userData: authUserData } = useContext(AuthContext);
  // console.log({ authUser });
  // console.log({ authUserData });
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
        url={`${RSC.domain}/users/${userName}/${bookName}/${sectionId}section-edit`}
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
                {/* セクション編集カード */}
                {/*********************/}
                <Card className={classes.cardSignup}>
                  <h2 className={classes.cardTitle}>セクション編集</h2>
                  <GridContainer justify="center">
                    <GridItem align="center">
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {userData.userIconEmoji ? userData.userIconEmoji : '🙆'}
                      </Avatar>
                      <h3 className={classes.title}>
                        {userData.userDisplayName}
                      </h3>
                      <p>
                        @{userData.userName}/{bookData.bookName}/
                        {sectionData.sectionId}
                      </p>
                    </GridItem>
                  </GridContainer>
                  <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={10} md={10}>
                        <SectionForm
                          classes={classes}
                          userName={userName}
                          userData={userData}
                          bookName={bookName}
                          bookData={bookData}
                          bookId={bookData.bookId}
                          sectionId={sectionId}
                          sectionData={sectionData}
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
      </AppLayout>
    </>
  );
}
