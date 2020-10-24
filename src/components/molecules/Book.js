/* react */
import { useState } from 'react';
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
import { VALIDUSERS, VALIDBOOKS } from 'src/common/common';
import SimpleModal from 'src/components/atoms/SimpleModal';

// スタイル設定
const useRadioSwitchStyles = makeStyles(radioSwitchStyle);

/**
 * 手記作成用フォーム
 *
 * @param {*} props
 * @return {*}
 */
export const BookCreateInputForm = ({ classes, userData }) => {
  // console.log('関数 BookCreateInputForm');
  // console.log({ userData });

  // 年月日時刻は初期値入れといたほうがデザインが崩れないようだ
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const dateTimeLocal = now.toISOString().slice(0, -8);

  const [isPublic, setIsPublic] = useState(true);

  const [bookName, setBookName] = useState('');
  const [bookDisplayName, setBookDisplayName] = useState('');
  const [bookIconEmoji, setBookIconEmoji] = useState('');
  const [bookIconImageUrl, setBookIconImageUrl] = useState('');
  const [bookCoverImageUrl, setBookCoverImageUrl] = useState('');
  const [bookIntroduction, setBookIntroduction] = useState('');

  const [authorDisplayName, setAuthorDisplayName] = useState('');
  const [authorBirthday, setAuthorBirthday] = useState(dateTimeLocal);

  const [chapterName_0, setChapterName_0] = useState('');
  const [chapterStartDate_0, setChapterStartDate_0] = useState(dateTimeLocal);
  const [chapterEndDate_0, setChapterEndtDate_0] = useState(dateTimeLocal);
  const [chapterName_1, setChapterName_1] = useState('');
  const [chapterStartDate_1, setChapterStartDate_1] = useState(dateTimeLocal);
  const [chapterEndDate_1, setChapterEndtDate_1] = useState(dateTimeLocal);
  const [chapterName_2, setChapterName_2] = useState('');
  const [chapterStartDate_2, setChapterStartDate_2] = useState(dateTimeLocal);
  const [chapterEndDate_2, setChapterEndtDate_2] = useState(dateTimeLocal);
  const [chapterName_3, setChapterName_3] = useState('');
  const [chapterStartDate_3, setChapterStartDate_3] = useState(dateTimeLocal);
  const [chapterEndDate_3, setChapterEndtDate_3] = useState(dateTimeLocal);
  const [chapterName_4, setChapterName_4] = useState('');
  const [chapterStartDate_4, setChapterStartDate_4] = useState(dateTimeLocal);
  const [chapterEndDate_4, setChapterEndtDate_4] = useState(dateTimeLocal);

  const [paramOk, setParamOk] = useState(true);

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
  const onClickCallback = async () => {
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
      // return false;
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
      bookIconEmoji,
      bookIconImageUrl,
      bookCoverImageUrl,
      bookIntroduction,

      authorDisplayName,
      authorBirthday: authorBirthday ? new Date(authorBirthday) : '',

      chapterName_0,
      chapterStartDate_0: chapterStartDate_0
        ? new Date(chapterStartDate_0)
        : '',
      chapterEndDate_0: chapterEndDate_0 ? new Date(chapterEndDate_0) : '',
    };

    await postDataToFirestore(
      VALIDUSERS,
      userData.uid,
      VALIDBOOKS,
      bookId,
      postData,
    );

    setIsPublic(true);
    setBookName('');
    setBookDisplayName('');
    setBookIconEmoji('');
    setBookIconImageUrl('');
    setBookCoverImageUrl('');
    setBookIntroduction('');

    setAuthorDisplayName('');
    setAuthorBirthday(dateTimeLocal);

    setChapterName_0('');
    setChapterStartDate_0(dateTimeLocal);
    setChapterEndtDate_0(dateTimeLocal);
    setChapterName_1('');
    setChapterStartDate_1(dateTimeLocal);
    setChapterEndtDate_1(dateTimeLocal);
    setChapterName_2('');
    setChapterStartDate_2(dateTimeLocal);
    setChapterEndtDate_2(dateTimeLocal);
    setChapterName_3('');
    setChapterStartDate_3(dateTimeLocal);
    setChapterEndtDate_3(dateTimeLocal);
    setChapterName_4('');
    setChapterStartDate_4(dateTimeLocal);
    setChapterEndtDate_4(dateTimeLocal);
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
            placeholder: '管理名称',
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
            placeholder: '表示名称',
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
            placeholder: 'アイコン絵文字🙆',
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
          labelText="アイコン画像URL(未実装)"
          id="bookIconImageUrl"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            placeholder: 'アイコン画像URL(未実装)',
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
          labelText="カバー画像URL(未実装)"
          id="bookCoverImageUrl"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            placeholder: 'カバー画像URL(未実装)',
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
            placeholder: 'イントロダクション',
            type: 'text',
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
            placeholder: '主人公の名前(ユーザ名とは別)',
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
            placeholder: '主人公の誕生日(ユーザとは別)',
            type: 'datetime-local',
            endAdornment: (
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
            placeholder: '時代名称(未実装)',
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
            placeholder: '時代開始日(未実装)',
            type: 'datetime-local',
            endAdornment: (
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
            placeholder: '時代終了日(未実装)',
            type: 'datetime-local',
            endAdornment: (
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
            placeholder: '時代名称(未実装)',
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
            placeholder: '時代開始日(未実装)',
            type: 'datetime-local',
            endAdornment: (
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
            placeholder: '時代終了日(未実装)',
            type: 'datetime-local',
            endAdornment: (
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
            placeholder: '時代名称(未実装)',
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
            placeholder: '時代開始日(未実装)',
            type: 'datetime-local',
            endAdornment: (
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
            placeholder: '時代終了日(未実装)',
            type: 'datetime-local',
            endAdornment: (
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
            placeholder: '時代名称(未実装)',
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
            placeholder: '時代開始日(未実装)',
            type: 'datetime-local',
            endAdornment: (
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
            placeholder: '時代終了日(未実装)',
            type: 'datetime-local',
            endAdornment: (
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
            placeholder: '時代名称(未実装)',
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
            placeholder: '時代開始日(未実装)',
            type: 'datetime-local',
            endAdornment: (
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
            placeholder: '時代終了日(未実装)',
            type: 'datetime-local',
            endAdornment: (
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
      {/* 手記作成ボタン         */}
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
    </>
  );
};
