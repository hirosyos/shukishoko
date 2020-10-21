import { useState } from 'react';
import firebase from 'src/common/firebase';
import { VALIDUSERS, VALIDBOOKS } from 'src/common/common';

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

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// スタイル設定
import loginPageStyle from 'assets/jss/nextjs-material-kit-pro/pages/loginPageStyle.js';
const useLoginPageStyles = makeStyles(loginPageStyle);

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

import radioSwitchStyle from 'assets/jss/nextjs-material-kit-pro/customCheckboxRadioSwitchStyle.js';
const useRadioSwitchStyles = makeStyles(radioSwitchStyle);

/**
 * 手記作成用フォーム
 *
 * @param {*} props
 * @return {*}
 */
export const BookCreateInputForm = ({ userData }) => {
  //
  // デバッグ情報
  //
  // console.log('\nファイル Book.js');
  // console.log('関数 BookCreateInputForm');
  // console.log({ userData });

  const [isPublic, setIsPublic] = useState('');
  const [bookName, setBookName] = useState('');
  const [bookDisplayName, setBookDisplayName] = useState('');
  const [authorDisplayName, setAuthorDisplayName] = useState('');
  const [authorBirthday, setAuthorBirthday] = useState('');
  const [chapterName, setChapterName] = useState('');
  const [chapterStartDate, setChapterStartDate] = useState('');

  const handleAuthorBirthdayChange = (date) => {
    setAuthorBirthday(date);
  };

  const handleDateChange = (date) => {
    setChapterStartDate(date);
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

  //
  // デバッグ情報
  //
  console.log('正常終了 BookCreateInputForm\n');

  // スタイル読み出し
  const loginPageClasses = useLoginPageStyles();

  const dateTimePickerClasses = useDateTimePickerStyles();

  const radioSwitchClasses = useRadioSwitchStyles();

  return (
    <>
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
              <Email className={loginPageClasses.inputIconsColor} />
            </InputAdornment>
          ),
          autoComplete: 'text',
          value: isPublic,
          onChange: (e) => setIsPublic(e.target.value),
        }}
      />
      <div>
        <FormControlLabel
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
          label="手記公開設定"
        />
      </div>
      {/* **********************/}
      {/* 手記管理名称（URL）     */}
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
              <Icon className={loginPageClasses.inputIconsColor}>
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
              <Icon className={loginPageClasses.inputIconsColor}>
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
              <Icon className={loginPageClasses.inputIconsColor}>
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
      <div>
        <InputLabel className={dateTimePickerClasses.label}>
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
      {/* <CustomInput
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
                    /> */}
      {/************************/}
      {/* 手記カバー画像      */}
      {/************************/}
      {/* <CustomInput
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
                    /> */}
      {/************************/}
      {/* イントロダクション     */}
      {/************************/}
      {/* <CustomInput
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
                    /> */}
      {/************************/}
      {/* 時代名称         */}
      {/************************/}
      <CustomInput
        id="chapterName"
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          placeholder: '時代名称',
          type: 'text',
          startAdornment: (
            <InputAdornment position="start">
              <Icon className={loginPageClasses.inputIconsColor}>
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
      <div>
        <InputLabel className={dateTimePickerClasses.label}>
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
      {/***********************/}
      {/* 手記作成ボタン         */}
      {/***********************/}
      <div className={loginPageClasses.textCenter}>
        <Button
          simple
          color="primary"
          size="lg"
          type="button"
          onClick={submitData}
        >
          新しい手記を作成する
        </Button>
        <button type="button" onClick={submitData}>
          submit
        </button>
      </div>
      <form action="">
        <ul>
          <li>
            <label htmlFor="isPublic">
              手記公開設定(true/false)：
              <input
                type="text"
                id="isPublic"
                value={isPublic}
                onChange={(e) => setIsPublic(e.target.value)}
              />
            </label>
          </li>
          <li>
            <label htmlFor="bookName">
              手記管理名(アルファベット)：
              <input
                type="text"
                id="bookName"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              />
            </label>
          </li>
          <li>
            <label htmlFor="bookDisplayName">
              手記表示名：
              <input
                type="text"
                id="bookDisplayName"
                value={bookDisplayName}
                onChange={(e) => setBookDisplayName(e.target.value)}
              />
            </label>
          </li>
          <li>
            <label htmlFor="authorDisplayName">
              著者表示名：
              <input
                type="text"
                id="authorDisplayName"
                value={authorDisplayName}
                onChange={(e) => setAuthorDisplayName(e.target.value)}
              />
            </label>
          </li>
          <li>
            <label htmlFor="authorBirthday">
              著者誕生日：
              <input
                type="datetime-local"
                id="authorBirthday"
                value={authorBirthday}
                onChange={(e) => setAuthorBirthday(e.target.value)}
              />
            </label>
          </li>
          <li>
            <label htmlFor="chapterName">
              時代名：
              <input
                type="text"
                id="chapterName"
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
              />
            </label>
          </li>
          <li>
            <label htmlFor="chapterStartDate">
              時代開始日：
              <input
                type="datetime-local"
                id="chapterStartDate"
                value={chapterStartDate}
                onChange={(e) => setChapterStartDate(e.target.value)}
              />
            </label>
          </li>

          <li>
            <button type="button" onClick={submitData}>
              submit
            </button>
          </li>
        </ul>
      </form>
    </>
  );
};
