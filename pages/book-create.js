/* react */
import React, { useState, useContext } from 'react';
/* next */
import { useRouter } from 'next/router';

import Link from 'src/components/atoms/Link';

import { getUserDataFromUserName } from 'src/common/common';
import { BookCreateInputForm } from 'src/components/molecules/Book';

import { AppLayout } from 'src/components/organisms/AppLayout';

import { AlternateEmail } from '@material-ui/icons';

import Datetime from 'react-datetime';
import { ja } from 'moment/locale/ja';
// @material-ui/core components
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';

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
/* MyApp */
import { RSC } from 'src/common/resource';
import firebase from 'src/common/firebase';
import { getUserDataFromUid, firebaseErrToTxt } from 'src/common/common';
import SimpleModal from 'src/components/atoms/SimpleModal';
import { AppMain } from 'src/components/organisms/AppMain';
import { AuthContext } from 'pages/_app';
import { VALIDUSERS, VALIDBOOKS } from 'src/common/common';

import image from 'public/hana_07F.jpg';

// スタイル設定
import loginPageStyle from 'assets/jss/nextjs-material-kit-pro/pages/loginPageStyle.js';
const useStyles = makeStyles(loginPageStyle);

// datatimepickerスタイル設定
const dateTimePickerstyle = {
  label: {
    color: 'rgba(0, 0, 0, 0.26)',
    cursor: 'pointer',
    display: 'inline-flex',
    fontSize: '14px',
    transition: '0.3s ease all',
    lineHeight: '1.428571429',
    fontWeight: '400',
    paddingLeft: '0',
  },
};
const useDateTimePickerStyles = makeStyles(dateTimePickerstyle);

// /**
//  * 静的パス取得関数
//  *
//  * @export
//  * @return {*}
//  */
// export async function getStaticPaths() {
//   const paths = [];
//   return { paths, fallback: true };
// }

// /**
//  * 静的パラメータ取得関数
//  *
//  * @export
//  * @param {*} { params }
//  * @return {*}
//  */
// export async function getStaticProps({ params }) {
//   // ユーザ名からユーザデータを取得
//   const { userData } = await getUserDataFromUserName(params.userName);

//   // 該当ユーザ名のデータが存在しない場合はデータ部をNullで返す;
//   if (!userData) {
//     console.log('異常終了 該当ユーザ名のデータが存在しない');
//     return {
//       props: {
//         userName: params.userName,
//         userData: null,
//       },
//     };
//   }

//   return {
//     props: {
//       userName: params.userName,
//       // Next.jsはDate型を返してほしくないようなのでこのような対処をしている
//       userData: JSON.parse(JSON.stringify(userData)),
//     },
//   };
// }

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

  const [isPublic, setIsPublic] = useState('');
  const [bookName, setBookName] = useState('');
  const [bookDisplayName, setBookDisplayName] = useState('');
  const [authorDisplayName, setAuthorDisplayName] = useState('');
  const [authorBirthday, setAuthorBirthday] = useState('');
  const [bookIconImageUrl, setBookIconImageUrl] = useState('');
  const [bookCoverImageUrl, setBookCoverImageUrl] = useState('');
  const [bookIntroduction, setBookIntroduction] = useState('');
  const [chapterName, setChapterName] = useState('');
  const [chapterStartDate, setChapterStartDate] = useState('');

  const handleAuthorBirthdayChange = (date) => {
    setAuthorBirthday(date);
  };

  const handleDateChange = (date) => {
    setChapterStartDate(date);
  };

  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [moveUserPage, setMoveUserPage] = useState(false);

  if (!user) {
    const ret = console.info('まずはログインしてください');
    if (ret) {
      router.push(`/login`);
      return;
    } else {
      router.push(`/top`);
      return;
    }
  }

  // Firestoreにデータを送信する関数
  const postDataToFirestore = async (
    userCollectionName,
    userId,
    bookCollectionName,
    bookId,
    postData,
  ) => {
    const addedData = await firebase
      .firestore()
      .collection(userCollectionName)
      .doc(userId)
      .collection(bookCollectionName)
      .doc(bookId)
      .set(postData);
    return addedData;
  };

  // submitボタンクリック時の処理
  const submitData = async () => {
    if (
      isPublic === '' ||
      bookName === '' ||
      bookDisplayName === '' ||
      authorDisplayName === '' ||
      authorBirthday === '' ||
      chapterName === '' ||
      chapterStartDate === ''
    ) {
      console.log('いまのところ全部埋めてください');
      return false;
    }
    // bookIdを事前に取得
    const bookId = firebase
      .firestore()
      .collection(VALIDUSERS)
      .doc(userData.uid)
      .collection(VALIDBOOKS)
      .doc().id;

    const postData = {
      isPublic,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),

      uid: userData.uid,
      userName: userData.userName,
      userDocRef: `/${VALIDUSERS}/${userData.uid}`,
      bookId,
      bookDocRef: `/${VALIDUSERS}/${userData.uid}/${VALIDBOOKS}/${bookId}`,

      bookName,
      bookDisplayName,

      authorDisplayName,
      authorBirthday: new Date(authorBirthday),
      authorNowAge: '',

      bookIconImageUrl: '',
      bookCoverImageUrl: '',
      bookIntroduction: '',
      bookFavoritedCount: '',
      chapterName,
      chapterStartDate: new Date(chapterStartDate),
    };
    await postDataToFirestore(
      VALIDUSERS,
      userData.uid,
      VALIDBOOKS,
      bookId,
      postData,
    );

    setIsPublic('');
    setBookName('');
    setBookDisplayName('');
    setAuthorDisplayName('');
    setAuthorBirthday('');
    setChapterName('');
    setChapterStartDate('');

    // getTodosFromFirestore();
  };

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(null);
  //   setPending(true);

  //   console.log('ブック作成Try');
  //   await firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, pass)
  //     .then(() => {})
  //     .catch((e) => {
  //       errText = firebaseErrToTxt(e, 'signin');
  //       console.log(e.message, mounted);
  //       console.log(errText);

  //       if (mounted.current) {
  //         setError(e);
  //         setUserName('');
  //         setMoveUserPage('false');
  //         console.log('ログイン失敗2');
  //         setPending(false);
  //       }
  //     })
  //     .finally(() => {
  //       if (mounted.current) {
  //         setPending(false);
  //       }
  //     });
  // };

  // スタイル読み出し
  const classes = useStyles();

  const dateTimePickerClasses = useDateTimePickerStyles();

  return (
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
                    <h4 className={classes.cardTitle}>手記作成</h4>
                    <div className={classes.socialLine}>
                      <Button justIcon color="transparent">
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          {userData.userIconImageUrl}
                        </Avatar>
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.description + ' ' + classes.textCenter}>
                    以下のフォームに情報を入力
                  </p>
                  <CardBody signup>
                    {/************************/}
                    {/* 手記公開設定           */}
                    {/************************/}
                    <CustomInput
                      id="isPublic"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      // material-uiのInputコンポーネントのProps
                      inputProps={{
                        placeholder: '手記公開設定...',
                        type: 'text',
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: 'text',
                        value: isPublic,
                        onChange: (e) => setIsPublic(e.target.value),
                      }}
                    />
                    {/************************/}
                    {/* 手記管理名称（URL）    */}
                    {/************************/}
                    <CustomInput
                      id="bookName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        placeholder: '手記管理名称(URLに使います)',
                        type: 'text',
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon className={classes.inputIconsColor}>
                              lock_utline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: 'current-password',
                        value: bookName,
                        onChange: (e) => setBookName(e.target.value),
                      }}
                    />
                    {/************************/}
                    {/* 手記表示名称           */}
                    {/************************/}
                    <CustomInput
                      id="bookDisplayName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        placeholder: '手記表示名称(表示に使います)',
                        type: 'text',
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon className={classes.inputIconsColor}>
                              lock_utline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: 'current-password',
                        value: bookDisplayName,
                        onChange: (e) => setBookDisplayName(e.target.value),
                      }}
                    />
                    {/************************/}
                    {/* 主人公名称           */}
                    {/************************/}
                    <CustomInput
                      id="authorDisplayName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        placeholder: '主人公名称(表示に使います)',
                        type: 'text',
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon className={classes.inputIconsColor}>
                              lock_utline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: 'current-password',
                        value: authorDisplayName,
                        onChange: (e) => setAuthorDisplayName(e.target.value),
                      }}
                    />
                    {/************************/}
                    {/* 主人公の誕生日         */}
                    {/************************/}
                    {/* <CustomInput
                      id="authorBirthday"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        placeholder: '主人公の誕生日',
                        type: 'text',
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon className={classes.inputIconsColor}>
                              lock_utline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: 'current-password',
                        value: authorBirthday,
                        onChange: (e) => setAuthorBirthday(e.target.value),
                      }}
                    /> */}
                    <div>
                      <InputLabel className={classes.label}>
                        主人公の誕生日
                      </InputLabel>
                      <br />
                      <FormControl fullWidth>
                        <Datetime
                          locale={ja}
                          inputProps={{
                            placeholder: 'Datetime Picker Here',
                          }}
                          value={authorBirthday}
                          name="authorBirthday"
                          onChange={handleAuthorBirthdayChange}
                        />
                      </FormControl>
                    </div>
                    {/************************/}
                    {/* 手記アイコン絵文字      */}
                    {/************************/}
                    <CustomInput
                      id="bookIconImageUrl"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        placeholder: '手記アイコン絵文字',
                        type: 'text',
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon className={classes.inputIconsColor}>
                              lock_utline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: 'current-password',
                        value: bookIconImageUrl,
                        onChange: (e) => setBookIconImageUrl(e.target.value),
                      }}
                    />
                    {/************************/}
                    {/* 手記カバー画像      */}
                    {/************************/}
                    <CustomInput
                      id="bookCoverImageUrl"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        placeholder: '手記カバー画像',
                        type: 'text',
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon className={classes.inputIconsColor}>
                              lock_utline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: 'current-password',
                        value: bookCoverImageUrl,
                        onChange: (e) => setBookCoverImageUrl(e.target.value),
                      }}
                    />
                    {/************************/}
                    {/* イントロダクション     */}
                    {/************************/}
                    <CustomInput
                      id="bookIntroduction"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        placeholder: 'イントロダクション',
                        type: 'text',
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon className={classes.inputIconsColor}>
                              lock_utline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: 'current-password',
                        value: bookIntroduction,
                        onChange: (e) => setBookIntroduction(e.target.value),
                      }}
                    />
                    {/************************/}
                    {/* チャプター名称         */}
                    {/************************/}
                    <CustomInput
                      id="chapterName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        placeholder: 'チャプター名称',
                        type: 'text',
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon className={classes.inputIconsColor}>
                              lock_utline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: 'current-password',
                        value: chapterName,
                        onChange: (e) => setChapterName(e.target.value),
                      }}
                    />
                    {/************************/}
                    {/* チャプター開始日        */}
                    {/************************/}
                    {/* <CustomInput
                      id="chapterStartDate"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        placeholder: 'チャプター開始日',
                        type: 'text',
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon className={classes.inputIconsColor}>
                              lock_utline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: 'current-password',
                        value: chapterStartDate,
                        onChange: (e) => setChapterStartDate(e.target.value),
                      }}
                    /> */}
                    <div>
                      <InputLabel className={classes.label}>
                        チャプター開始日
                      </InputLabel>
                      <br />
                      <FormControl fullWidth>
                        <Datetime
                          locale={ja}
                          inputProps={{
                            placeholder: 'Datetime Picker Here',
                          }}
                          value={chapterStartDate}
                          name="chapterStartDate"
                          onChange={handleDateChange}
                        />
                      </FormControl>
                    </div>
                  </CardBody>
                  {/***********************/}
                  {/* 手記作成ボタン         */}
                  {/***********************/}
                  <div className={classes.textCenter}>
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      type="submit"
                      onClick={submitData}
                    >
                      新しい手記を作成する
                    </Button>
                  </div>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        {/* ログインしていない場合 */}
        {/* {!userName &&  (
          <SimpleModal
            modalTitle={`ログインしていません`}
            modalText="トップページへ移動します"
            closeBtnTxt=""
            yesBtnTxt="移動する"
            noBtnTxt="移動しない"
            callBack={callBackSetMoveUserPage}
          />
        )} */}
      </div>

      <h1>Welcome to 手記作成 ページ</h1>

      <p>
        ユーザー:
        {userData.userName}
      </p>

      <BookCreateInputForm userData={userData} />

      <Link href={`/users/${userData.userName}`}>
        <a>ユーザページへ戻る</a>
      </Link>
    </AppLayout>
  );
}
