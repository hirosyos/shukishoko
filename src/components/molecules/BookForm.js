/* react */
import { useState,useEffect } from 'react';
/* next */
import { useRouter } from 'next/router';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
// @material-ui/icon
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CakeIcon from '@material-ui/icons/Cake';
import CheckIcon from '@material-ui/icons/Check';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import HistoryIcon from '@material-ui/icons/History';
import HttpIcon from '@material-ui/icons/Http';
import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
// nextjs-matelialui-kit
import Button from 'components/CustomButtons/Button.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GridContainer from 'components/Grid/GridContainer.js';
import Switch from '@material-ui/core/Switch';
// nextjs-matelialui-kit スタイル
import radioSwitchStyle from 'assets/jss/nextjs-material-kit-pro/customCheckboxRadioSwitchStyle.js';

/* MyApp */
import firebase from 'src/common/firebase';
import {
  VALIDUSERS,
  VALIDBOOKS,
  secToISO8601DateTimeTokyo,
} from 'src/common/common';
import SimpleModal from 'src/components/atoms/SimpleModal';


// スタイル設定
const useRadioSwitchStyles = makeStyles(radioSwitchStyle);

/**
 * 手記作成用フォーム
 *
 * @param {*} props
 * @return {*}
 */
export const BookForm = ({ classes, userData, bookData }) => {
  // 年月日時刻は初期値入れといたほうがデザインが崩れないようだ
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const dateTimeLocal = now.toISOString().slice(0, -8);

  const [bookId, setBookId] = useState(bookData ? bookData.bookId : '');
  const [isPublic, setIsPublic] = useState(bookData ? bookData.isPublic : true);

  const [bookName, setBookName] = useState(bookData ? bookData.bookName : '');
  const [bookDisplayName, setBookDisplayName] = useState(
    bookData ? bookData.bookDisplayName : '',
  );
  const [bookIconEmoji, setBookIconEmoji] = useState(
    bookData ? bookData.bookIconEmoji : '',
  );
  const [bookIconImageUrl, setBookIconImageUrl] = useState(
    bookData ? bookData.bookIconImageUrl : '',
  );
  const [bookCoverImageUrl, setBookCoverImageUrl] = useState(
    bookData ? bookData.bookCoverImageUrl : '',
  );
  const [bookIntroduction, setBookIntroduction] = useState(
    bookData ? bookData.bookIntroduction : '',
  );

  const [authorDisplayName, setAuthorDisplayName] = useState(
    bookData ? bookData.authorDisplayName : '',
  );

  // const secToISO8601DateTimeTokyo = formatToTimeZone(
  //   bookData.authorBirthday.seconds * 1000,
  //   'YYYY-MM-DDTHH:mm',
  //   {
  //     timeZone: 'Asia/Tokyo',
  //   },
  // );

  const [authorBirthday, setAuthorBirthday] = useState(
    bookData
      ? secToISO8601DateTimeTokyo(bookData.authorBirthday.seconds)
      : dateTimeLocal,
  );

  // console.log('bookData.authorBirthday');
  // console.log(bookData.authorBirthday);

  const [chapterName_0, setChapterName_0] = useState(
    bookData ? bookData.chapterName_0 : '',
  );
  const [chapterStartDate_0, setChapterStartDate_0] = useState(
    bookData ? bookData.chapterStartDate_0 : dateTimeLocal,
  );
  const [chapterEndDate_0, setChapterEndtDate_0] = useState(
    bookData ? bookData.chapterEndDate_0 : dateTimeLocal,
  );
  const [chapterName_1, setChapterName_1] = useState(
    bookData ? bookData.chapterName_1 : '',
  );
  const [chapterStartDate_1, setChapterStartDate_1] = useState(
    bookData ? bookData.chapterStartDate_1 : dateTimeLocal,
  );
  const [chapterEndDate_1, setChapterEndtDate_1] = useState(
    bookData ? bookData.chapterEndDate_1 : dateTimeLocal,
  );
  const [chapterName_2, setChapterName_2] = useState(
    bookData ? bookData.chapterName_2 : '',
  );
  const [chapterStartDate_2, setChapterStartDate_2] = useState(
    bookData ? bookData.chapterStartDate_2 : dateTimeLocal,
  );
  const [chapterEndDate_2, setChapterEndtDate_2] = useState(
    bookData ? bookData.chapterEndDate_2 : dateTimeLocal,
  );
  const [chapterName_3, setChapterName_3] = useState(
    bookData ? bookData.chapterName_3 : '',
  );
  const [chapterStartDate_3, setChapterStartDate_3] = useState(
    bookData ? bookData.chapterStartDate_3 : dateTimeLocal,
  );
  const [chapterEndDate_3, setChapterEndtDate_3] = useState(
    bookData ? bookData.chapterEndDate_3 : dateTimeLocal,
  );
  const [chapterName_4, setChapterName_4] = useState(
    bookData ? bookData.chapterName_4 : '',
  );
  const [chapterStartDate_4, setChapterStartDate_4] = useState(
    bookData ? bookData.chapterStartDate_4 : dateTimeLocal,
  );
  const [chapterEndDate_4, setChapterEndtDate_4] = useState(
    bookData ? bookData.chapterEndDate_4 : dateTimeLocal,
  );

  const [paramOk, setParamOk] = useState(true);

  const [postOk, setPostOk] = useState(false);
  const [moveBookPage, setMoveBookPage] = useState(false);

  // ルーティング設定
  const router = useRouter();

  // bookPageへ移動
  useEffect(() => {
    if (moveBookPage) {
      // router.push(`/users/${userData.userName}/${bookName}`);
      router.push(`/users/${userData.userName}`);
      // location.href = `/users/${userData.userName}`;
      // router.replace(`/users/${userData.userName}`);
    }
  }, [moveBookPage]);

  /**
   * paramOkを操作するコールバック関数
   *
   * @param {*} props
   */
  const callBackSetParamOk = (props) => {
    switch (props) {
      case 'close':
        setParamOk(true);
        break;
      case 'yes':
        setParamOk(true);
        break;
      case 'no':
        setParamOk(true);
        break;
      default:
        console.log('パラメータ異常');
    }
  };

  /**
   * moveBookPageを操作するコールバック関数
   *
   * @param {*} props
   */
  const callBackSetMoveBookPage = (props) => {
    switch (props) {
      case 'close':
        setMoveBookPage(false);
        break;
      case 'yes':
        setMoveBookPage(true);
        break;
      case 'no':
        setMoveBookPage(false);
        break;
      default:
        console.log('パラメータ異常');
    }
  };

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
      .set(postData, { merge: true });
    return addedData;
  };

  // 設定ボタンクリック時の処理
  const onClickCallback = async (e) => {
    e.preventDefault();

    if (
      bookName === '' ||
      bookDisplayName === '' ||
      bookIconEmoji === '' ||
      authorDisplayName === '' ||
      authorBirthday === ''
    ) {
      alert(
        '手記管理名称、手記表示名称、手記アイコン絵文字、主人公の名前、主人公の誕生日は必須です',
      );
      setParamOk(false);
      return false;
    }
    // ブックデータがない場合はbookIdを事前に取得
    let bookDocId = bookId;
    if (!bookData) {
      bookDocId = firebase
        .firestore()
        .collection(VALIDUSERS)
        .doc(userData.uid)
        .collection(VALIDBOOKS)
        .doc().id;
      setBookId(bookDocId);
    } else {
      setBookId(bookData.bookId);
    }

    const postData = {
      isPublic,

      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),

      uid: userData.uid,
      userName: userData.userName,
      userDocRef: `/${VALIDUSERS}/${userData.uid}`,
      bookId: bookData ? bookData.bookId : bookDocId,
      bookDocRef: `/${VALIDUSERS}/${userData.uid}/${VALIDBOOKS}/${bookId}`,

      bookName,
      bookDisplayName,
      bookIconEmoji,
      bookIconImageUrl,
      bookCoverImageUrl,
      bookIntroduction,

      authorDisplayName,
      authorBirthday: authorBirthday ? new Date(authorBirthday) : '',
    };
    if (!bookData) {
      postData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    }

    // console.log({ bookId });
    // console.log({ bookDocId });
    // console.log({ postData });
    // console.log('postDataToFirestore');

    await postDataToFirestore(
      VALIDUSERS,
      userData.uid,
      VALIDBOOKS,
      // bookId,
      bookDocId,
      postData,
    );

    // setIsPublic(true);
    // setBookName('');
    // setBookDisplayName('');
    // setBookIconEmoji('');
    // setBookIconImageUrl('');
    // setBookCoverImageUrl('');
    // setBookIntroduction('');

    // setAuthorDisplayName('');
    // setAuthorBirthday(dateTimeLocal);

    // setChapterName_0('');
    // setChapterStartDate_0(dateTimeLocal);
    // setChapterEndtDate_0(dateTimeLocal);
    // setChapterName_1('');
    // setChapterStartDate_1(dateTimeLocal);
    // setChapterEndtDate_1(dateTimeLocal);
    // setChapterName_2('');
    // setChapterStartDate_2(dateTimeLocal);
    // setChapterEndtDate_2(dateTimeLocal);
    // setChapterName_3('');
    // setChapterStartDate_3(dateTimeLocal);
    // setChapterEndtDate_3(dateTimeLocal);
    // setChapterName_4('');
    // setChapterStartDate_4(dateTimeLocal);
    // setChapterEndtDate_4(dateTimeLocal);

    // const response = await fetch(`http://localhost:3000/users/${userData.userName}/`);
    const response = await fetch(
      `/users/${userData.userName}/`,
    );



    setPostOk(true);
  };

  // スタイル読み出し
  const radioSwitchClasses = useRadioSwitchStyles();

  return (
    <>
      <form className={classes.form}>
        <h3>手記設定(必須)</h3>
        {/************************/}
        {/* 手記公開設定           */}
        {/************************/}
        <div>
          <FormControlLabel
            label={`公開設定(${isPublic ? '公開' : '非公開'})`}
            control={
              <Switch
                checked={isPublic}
                onChange={(event) => setIsPublic(event.target.checked)}
                value="isPublic"
                classes={{
                  switchBase: radioSwitchClasses.switchBase,
                  checked: radioSwitchClasses.switchChecked,
                  thumb: radioSwitchClasses.switchIcon,
                  track: radioSwitchClasses.switchBar,
                }}
              />
            }
            classes={{
              label: radioSwitchClasses.label,
            }}
          />
        </div>
        {/***********************/}
        {/* 手記管理名称          */}
        {/***********************/}
        <CustomInput
          labelText="管理名称(アルファベットのみ)"
          id="bookName"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'text',
            endAdornment: (
              <InputAdornment position="start">
                <LaptopChromebookIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: bookName,
            onChange: (e) => setBookName(e.target.value),
          }}
        />
        {/************************/}
        {/* 手記表示名称           */}
        {/************************/}
        <CustomInput
          labelText="表示名称(画面に表示されるタイトル)"
          id="bookDisplayName"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'text',
            endAdornment: (
              <InputAdornment position="start">
                <LibraryBooksIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: bookDisplayName,
            onChange: (e) => setBookDisplayName(e.target.value),
          }}
        />
        {/************************/}
        {/* 手記アイコン絵文字      */}
        {/************************/}
        <CustomInput
          labelText="アイコン絵文字🙆"
          id="bookIconEmoji"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'text',
            endAdornment: (
              <InputAdornment position="start">
                <EmojiEmotionsIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: bookIconEmoji,
            onChange: (e) => setBookIconEmoji(e.target.value),
          }}
        />
        {/************************/}
        {/* 手記アイコン画像URL     */}
        {/************************/}
        <CustomInput
          labelText="アイコン画像URL"
          id="bookIconImageUrl"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'url',
            endAdornment: (
              <InputAdornment position="start">
                <HttpIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: bookIconImageUrl,
            onChange: (e) => setBookIconImageUrl(e.target.value),
          }}
        />
        {/************************/}
        {/* 手記カバー画像URL      */}
        {/************************/}
        <CustomInput
          labelText="カバー画像URL"
          id="bookCoverImageUrl"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'url',
            endAdornment: (
              <InputAdornment position="start">
                <HttpIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: bookCoverImageUrl,
            onChange: (e) => setBookCoverImageUrl(e.target.value),
          }}
        />
        {/************************/}
        {/* イントロダクション      */}
        {/************************/}
        <CustomInput
          labelText="イントロダクション"
          id="bookIntroduction"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'text',
            multiline: true,
            rows: 8,
            endAdornment: (
              <InputAdornment position="start">
                <CheckIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: bookIntroduction,
            onChange: (e) => setBookIntroduction(e.target.value),
          }}
        />
        <h3>登場人物設定(必須)</h3>
        {/************************/}
        {/* 主人公名称           */}
        {/************************/}
        <CustomInput
          labelText="主人公の名前(ユーザ名とは別)"
          id="authorDisplayName"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'text',
            endAdornment: (
              <InputAdornment position="start">
                <AccountBoxIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: authorDisplayName,
            onChange: (e) => setAuthorDisplayName(e.target.value),
          }}
        />
        {/************************/}
        {/* 主人公の誕生日         */}
        {/************************/}
        <CustomInput
          labelText="主人公の誕生日(ユーザとは別)"
          id="authorBirthday"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'datetime-local',
            startAdornment: (
              <InputAdornment position="start">
                <CakeIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: authorBirthday,
            onChange: (e) => setAuthorBirthday(e.target.value),
          }}
        />
        <h3>時代設定(未実装)</h3>
        <h5>時代 0</h5>
        {/************************/}
        {/* 時代名称              */}
        {/************************/}
        <CustomInput
          labelText="時代名称(未実装)"
          id="chapterName_0"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'text',
            endAdornment: (
              <InputAdornment position="start">
                <HistoryIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: chapterName_0,
            onChange: (e) => setChapterName_0(e.target.value),
          }}
        />
        {/************************/}
        {/* 時代開始日        */}
        {/************************/}
        <CustomInput
          labelText="時代開始日(未実装)"
          id="chapterStarttDate_0"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'datetime-local',
            startAdornment: (
              <InputAdornment position="start">
                <VerticalAlignTopIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: chapterStartDate_0,
            onChange: (e) => setChapterStartDate_0(e.target.value),
          }}
        />
        {/************************/}
        {/* 時代終了日             */}
        {/************************/}
        <CustomInput
          labelText="時代終了日(未実装)"
          id="chapterEndtDate_0"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'datetime-local',
            startAdornment: (
              <InputAdornment position="start">
                <VerticalAlignBottomIcon
                  className={classes.inputAdornmentIcon}
                />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: chapterEndDate_0,
            onChange: (e) => setChapterEndtDate_0(e.target.value),
          }}
        />
        <h5>時代 1</h5>
        {/************************/}
        {/* 時代名称              */}
        {/************************/}
        <CustomInput
          labelText="時代名称(未実装)"
          id="chapterName_1"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'text',
            endAdornment: (
              <InputAdornment position="start">
                <HistoryIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: chapterName_1,
            onChange: (e) => setChapterName_1(e.target.value),
          }}
        />
        {/************************/}
        {/* 時代開始日             */}
        {/************************/}
        <CustomInput
          labelText="時代開始日(未実装)"
          id="chapterStarttDate_1"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'datetime-local',
            startAdornment: (
              <InputAdornment position="start">
                <VerticalAlignTopIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: chapterStartDate_1,
            onChange: (e) => setChapterStartDate_1(e.target.value),
          }}
        />
        {/************************/}
        {/* 時代終了日             */}
        {/************************/}
        <CustomInput
          labelText="時代終了日(未実装)"
          id="chapterEndtDate_1"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'datetime-local',
            startAdornment: (
              <InputAdornment position="start">
                <VerticalAlignBottomIcon
                  className={classes.inputAdornmentIcon}
                />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: chapterEndDate_1,
            onChange: (e) => setChapterEndtDate_1(e.target.value),
          }}
        />
        <h5>時代 2</h5>
        {/************************/}
        {/* 時代名称              */}
        {/************************/}
        <CustomInput
          labelText="時代名称(未実装)"
          id="chapterName_2"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'text',
            endAdornment: (
              <InputAdornment position="start">
                <HistoryIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: chapterName_2,
            onChange: (e) => setChapterName_2(e.target.value),
          }}
        />
        {/************************/}
        {/* 時代開始日             */}
        {/************************/}
        <CustomInput
          labelText="時代開始日(未実装)"
          id="chapterStarttDate_2"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'datetime-local',
            startAdornment: (
              <InputAdornment position="start">
                <VerticalAlignTopIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: chapterStartDate_2,
            onChange: (e) => setChapterStartDate_2(e.target.value),
          }}
        />
        {/************************/}
        {/* 時代終了日             */}
        {/************************/}
        <CustomInput
          labelText="時代終了日(未実装)"
          id="chapterEndtDate_2"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'datetime-local',
            startAdornment: (
              <InputAdornment position="start">
                <VerticalAlignBottomIcon
                  className={classes.inputAdornmentIcon}
                />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: chapterEndDate_2,
            onChange: (e) => setChapterEndtDate_2(e.target.value),
          }}
        />
        <h5>時代 3</h5>
        {/************************/}
        {/* 時代名称              */}
        {/************************/}
        <CustomInput
          labelText="時代名称(未実装)"
          id="chapterName_3"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'text',
            endAdornment: (
              <InputAdornment position="start">
                <HistoryIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: chapterName_3,
            onChange: (e) => setChapterName_3(e.target.value),
          }}
        />
        {/************************/}
        {/* 時代開始日             */}
        {/************************/}
        <CustomInput
          labelText="時代開始日(未実装)"
          id="chapterStarttDate_3"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'datetime-local',
            startAdornment: (
              <InputAdornment position="start">
                <VerticalAlignTopIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: chapterStartDate_3,
            onChange: (e) => setChapterStartDate_3(e.target.value),
          }}
        />
        {/************************/}
        {/* 時代終了日             */}
        {/************************/}
        <CustomInput
          labelText="時代終了日(未実装)"
          id="chapterEndtDate_3"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'datetime-local',
            startAdornment: (
              <InputAdornment position="start">
                <VerticalAlignBottomIcon
                  className={classes.inputAdornmentIcon}
                />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: chapterEndDate_3,
            onChange: (e) => setChapterEndtDate_3(e.target.value),
          }}
        />
        <h5>時代 4</h5>
        {/************************/}
        {/* 時代名称              */}
        {/************************/}
        <CustomInput
          labelText="時代名称(未実装)"
          id="chapterName_4"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'text',
            endAdornment: (
              <InputAdornment position="start">
                <HistoryIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: chapterName_4,
            onChange: (e) => setChapterName_4(e.target.value),
          }}
        />
        {/************************/}
        {/* 時代開始日             */}
        {/************************/}
        <CustomInput
          labelText="時代開始日(未実装)"
          id="chapterStarttDate_4"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'datetime-local',
            startAdornment: (
              <InputAdornment position="start">
                <VerticalAlignTopIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: chapterStartDate_4,
            onChange: (e) => setChapterStartDate_4(e.target.value),
          }}
        />
        {/************************/}
        {/* 時代終了日             */}
        {/************************/}
        <CustomInput
          labelText="時代終了日(未実装)"
          id="chapterEndtDate_4"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'datetime-local',
            startAdornment: (
              <InputAdornment position="start">
                <VerticalAlignBottomIcon
                  className={classes.inputAdornmentIcon}
                />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: chapterEndDate_4,
            onChange: (e) => setChapterEndtDate_4(e.target.value),
          }}
        />
      </form>
      {/***********************/}
      {/* 実行ボタン            */}
      {/***********************/}
      <GridContainer justify="center">
        <div className={classes.textCenter}>
          <Button
            simple
            color="primary"
            size="lg"
            type="button"
            onClick={onClickCallback}
          >
            実行する
          </Button>
        </div>
      </GridContainer>
      {/*必須パラメータが足りない場合*/}
      {!paramOk && (
        <SimpleModal
          modalTitle={`必須項目が足りません`}
          modalText="手記管理名称、手記表示名称、手記アイコン絵文字、主人公の名前、主人公の誕生日は必須です"
          closeBtnTxt=""
          yesBtnTxt="OK"
          noBtnTxt=""
          callBack={callBackSetParamOk}
        />
      )}
      {/*編集終了*/}
      {postOk && (
        <SimpleModal
          modalTitle={`編集完了`}
          modalText="編集した手記ページへ移動しますか"
          closeBtnTxt=""
          yesBtnTxt="移動する"
          noBtnTxt="ページに残る"
          callBack={callBackSetMoveBookPage}
        />
      )}
    </>
  );
};
