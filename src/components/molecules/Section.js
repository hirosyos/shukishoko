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
import { VALIDUSERS, VALIDBOOKS, VALIDSECTIONS } from 'src/common/common';

import SimpleModal from 'src/components/atoms/SimpleModal';

// スタイル設定
const useRadioSwitchStyles = makeStyles(radioSwitchStyle);

/**
 * セクション作成フォーム
 *
 * @param {object} userData
 * @param {object} bookData
 * @param {string} bookId
 * @return {JSX}
 */
const SectionCreateInputForm = ({
  classes,
  userName,
  userData,
  bookName,
  bookData,
  bookId,
}) => {
  console.log({ userData, bookData, bookId });

  const [isPublic, setIsPublic] = useState(true);
  const [isFuture, setIsFuture] = useState(false);
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [emo, setEmo] = useState('');
  const [tag_0, setTag_0] = useState('');
  const [tag_1, setTag_1] = useState('');
  const [tag_2, setTag_2] = useState('');
  const [urlVideo, setUrlVideo] = useState('');
  const [urlImg, setUrlImg] = useState('');
  const [urlWeb, setUrlWeb] = useState('');

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
    sectionCollectionName,
    sectionId,
    postData,
  ) => {
    const addedData = await firebase
      .firestore()
      .collection(userCollectionName)
      .doc(userId)
      .collection(bookCollectionName)
      .doc(bookId)
      .collection(sectionCollectionName)
      .doc(sectionId)
      .set(postData);
    return addedData;
  };

  // 設定ボタンクリック時の処理
  const onClickCallback = async () => {
    if (date === '' || title === '' || contents === '' || emo === '') {
      alert('日付、タイトル、コンテンツ、感情は必須です');
      setParamOk(false);
      return false;
    }

    // sectionIdを事前に取得
    const sectionId = firebase
      .firestore()
      .collection(VALIDUSERS)
      .doc(userData.uid)
      .collection(VALIDBOOKS)
      .doc(bookId)
      .collection(VALIDSECTIONS)
      .doc().id;

    const postData = {
      isPublic,
      isFuture,

      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),

      uid: userData.uid,
      userName,
      userDocRef: `/${VALIDUSERS}/${userData.uid}`,

      bookId,
      bookName,
      bookDocRef: `/${VALIDUSERS}/${userData.uid}/${VALIDBOOKS}/${bookId}`,

      sectionId,
      sectionDocRef: `/${VALIDUSERS}/${userData.uid}/${VALIDBOOKS}/${bookId}/${VALIDSECTIONS}/${sectionId}/`,
      date: new Date(date),
      title,
      contents,
      tag_0,
      tag_1,
      tag_2,
      urlVideo,
      urlImg,
      urlWeb,
      emo,
      quoteRef: '',
      quotedRef: '',
      quotedCount: '',
    };
    console.log({postData});
    const addedData = await postDataToFirestore(
      VALIDUSERS,
      userData.uid,
      VALIDBOOKS,
      bookId,
      VALIDSECTIONS,
      sectionId,
      postData,
    );

    setIsPublic(true);
    setIsFuture(false);
    setDate('');
    setTitle('');
    setContents('');
    setTag_0('');
    setTag_1('');
    setTag_2('');
    setUrlVideo('');
    setUrlImg('');
    setUrlWeb('');
    setEmo('');
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
            label={`手記公開設定(${isPublic ? '公開' : '非公開'})`}
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
        {/************************/}
        {/* 思い出か未来か         */}
        {/************************/}
        <div>
          <FormControlLabel
            label={`思い出か未来か(${isFuture ? '未来' : '思い出'})`}
            control={
              <Switch
                checked={isFuture}
                onChange={(event) => setIsFuture(event.target.checked)}
                value="isFuture"
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
      </form>
      {/************************/}
      {/* 日付                  */}
      {/************************/}
      <CustomInput
        labelText="日付"
        id="date"
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          placeholder: '日付',
          type: 'datetime-local',
          startAdornment: (
            <InputAdornment position="start">
              <CakeIcon className={classes.inputAdornmentIcon} />
            </InputAdornment>
          ),
          autoComplete: 'off',
          value: date,
          onChange: (e) => setDate(e.target.value),
        }}
      />
      {/************************/}
      {/* タイトル              */}
      {/************************/}
      <CustomInput
        labelText="タイトル"
        id="title"
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          placeholder: 'タイトル',
          type: 'text',
          startAdornment: (
            <InputAdornment position="start">
              <LibraryBooksIcon className={classes.inputAdornmentIcon} />
            </InputAdornment>
          ),
          autoComplete: 'off',
          value: title,
          onChange: (e) => setTitle(e.target.value),
        }}
      />
      {/************************/}
      {/* コンテンツ            */}
      {/************************/}
      <CustomInput
        labelText="コンテンツ"
        id="contents"
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          placeholder: 'コンテンツ',
          type: 'text',
          startAdornment: (
            <InputAdornment position="start">
              <CheckIcon className={classes.inputAdornmentIcon} />
            </InputAdornment>
          ),
          autoComplete: 'off',
          value: contents,
          onChange: (e) => setContents(e.target.value),
        }}
      />
      {/************************/}
      {/* 感情                  */}
      {/************************/}
      <CustomInput
        labelText="感情"
        id="emo"
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          placeholder: '感情',
          type: 'text',
          startAdornment: (
            <InputAdornment position="start">
              <HttpIcon className={classes.inputAdornmentIcon} />
            </InputAdornment>
          ),
          autoComplete: 'off',
          value: emo,
          onChange: (e) => setEmo(e.target.value),
        }}
      />
      <h3>タグ(未実装)</h3>
      {/************************/}
      {/* タグ 0               */}
      {/************************/}
      <CustomInput
        labelText="タグ 0"
        id="tag_0"
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          placeholder: 'タグ 0',
          type: 'text',
          startAdornment: (
            <InputAdornment position="start">
              <EmojiEmotionsIcon className={classes.inputAdornmentIcon} />
            </InputAdornment>
          ),
          autoComplete: 'off',
          value: tag_0,
          onChange: (e) => setTag_0(e.target.value),
        }}
      />
      {/************************/}
      {/* タグ 1               */}
      {/************************/}
      <CustomInput
        labelText="タグ 1"
        id="tag_1"
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          placeholder: 'タグ 1',
          type: 'text',
          startAdornment: (
            <InputAdornment position="start">
              <EmojiEmotionsIcon className={classes.inputAdornmentIcon} />
            </InputAdornment>
          ),
          autoComplete: 'off',
          value: tag_1,
          onChange: (e) => setTag_1(e.target.value),
        }}
      />
      {/************************/}
      {/* タグ 2               */}
      {/************************/}
      <CustomInput
        labelText="タグ 2"
        id="tag_2"
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          placeholder: 'タグ 2',
          type: 'text',
          startAdornment: (
            <InputAdornment position="start">
              <EmojiEmotionsIcon className={classes.inputAdornmentIcon} />
            </InputAdornment>
          ),
          autoComplete: 'off',
          value: tag_2,
          onChange: (e) => setTag_2(e.target.value),
        }}
      />
      <h3>関連URL(未実装)</h3>
      {/************************/}
      {/* 関連動画URL           */}
      {/************************/}
      <CustomInput
        labelText="関連動画URL(未実装)"
        id="urlVideo"
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          placeholder: '関連動画URL(未実装)',
          type: 'url',
          startAdornment: (
            <InputAdornment position="start">
              <HttpIcon className={classes.inputAdornmentIcon} />
            </InputAdornment>
          ),
          autoComplete: 'off',
          value: urlVideo,
          onChange: (e) => setUrlVideo(e.target.value),
        }}
      />
      {/************************/}
      {/* 関連画像URL           */}
      {/************************/}
      <CustomInput
        labelText="関連画像URL(未実装)"
        id="urlImg"
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          placeholder: '関連画像URL(未実装)',
          type: 'url',
          startAdornment: (
            <InputAdornment position="start">
              <HttpIcon className={classes.inputAdornmentIcon} />
            </InputAdornment>
          ),
          autoComplete: 'off',
          value: urlImg,
          onChange: (e) => setUrlImg(e.target.value),
        }}
      />
      {/************************/}
      {/* 関連サイトURL           */}
      {/************************/}
      <CustomInput
        labelText="関連サイトURL(未実装)"
        id="urlWeb"
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          placeholder: '関連サイトURL(未実装)',
          type: 'url',
          startAdornment: (
            <InputAdornment position="start">
              <HttpIcon className={classes.inputAdornmentIcon} />
            </InputAdornment>
          ),
          autoComplete: 'off',
          value: urlWeb,
          onChange: (e) => setUrlWeb(e.target.value),
        }}
      />

      {/***********************/}
      {/* セクション作成ボタン   */}
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
            新しいセクションを作成する
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

      {/* <form action="">
        <ul>
          <li>
            <label htmlFor="isPublic">セクション公開設定(true/false)：</label>
            <input
              type="text"
              id="isPublic"
              value={isPublic}
              onChange={(e) => setIsPublic(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="date">発生日：</label>
            <input
              type="datetime-local"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="title">タイトル：</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="contents">内容：</label>
            <textarea
              type="text"
              id="contents"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="tag">タグ：</label>
            <input
              type="text"
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="url">URL：</label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="emo">喜怒哀楽：</label>
            <input
              type="text"
              id="emo"
              value={emo}
              onChange={(e) => setEmo(e.target.value)}
            />
          </li>

          <li>
            <button type="button" onClick={submitData}>
              submit
            </button>
          </li>
        </ul>
      </form> */}
    </>
  );
};

export default SectionCreateInputForm;
