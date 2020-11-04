/* react */
import { useState, useEffect } from 'react';
/* next */
import { useRouter } from 'next/router';
// @material-ui/core components
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
// @material-ui/icon
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import HttpIcon from '@material-ui/icons/Http';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import NotesIcon from '@material-ui/icons/Notes';
// nextjs-matelialui-kit
import Button from 'components/CustomButtons/Button.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GridContainer from 'components/Grid/GridContainer.js';
import Switch from '@material-ui/core/Switch';
// nextjs-matelialui-kit スタイル
import radioSwitchStyle from 'assets/jss/nextjs-material-kit-pro/customCheckboxRadioSwitchStyle.js';
import customSelectStyles from 'assets/jss/nextjs-material-kit-pro/customSelectStyle.js';
/* MyApp */
import firebase from 'src/common/firebase';
import {
  VALIDUSERS,
  VALIDBOOKS,
  VALIDSECTIONS,
  secToISO8601DateTimeTokyo,
} from 'src/common/common';
import SimpleModal from 'src/components/atoms/SimpleModal';

// スタイル設定
const useRadioSwitchStyles = makeStyles(radioSwitchStyle);
const useCustomSelectStyles = makeStyles(customSelectStyles);

/**
 * セクション作成フォーム
 *
 * @param {object} userData
 * @param {object} bookData
 * @param {string} bookId
 * @return {JSX}
 */
export const SectionForm = ({
  classes,
  userName,
  userData,
  bookName,
  bookData,
  bookId,
  sectionId,
  sectionData,
}) => {
  // console.log({ userData, bookData, bookId });

  const customSelectStylesClasses = useCustomSelectStyles();

  // 年月日時刻は初期値入れといたほうがデザインが崩れないようだ
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const dateTimeLocal = now.toISOString().slice(0, -8);

  const [isPublic, setIsPublic] = useState(
    sectionData ? sectionData.isPublic : true,
  );
  const [isFuture, setIsFuture] = useState(
    sectionData ? sectionData.isFuture : false,
  );
  const [date, setDate] = useState(
    sectionData
      ? secToISO8601DateTimeTokyo(sectionData.date.seconds)
      : dateTimeLocal,
  );
  const [title, setTitle] = useState(sectionData ? sectionData.title : '');
  const [contents, setContents] = useState(
    sectionData ? sectionData.contents : '',
  );
  // const [emoIcon, setEmoIcon] = useState(
  //   sectionData ? sectionData.emoIcon : [],
  // );
  const [sectionIconImageUrl, setSectionIconImageUrl] = useState(
    sectionData ? sectionData.sectionIconImageUrl : '',
  );
  const [sectionCoverImageUrl, setSectionCoverImageUrl] = useState(
    sectionData ? sectionData.sectionCoverImageUrl : '',
  );
  const [emoIcon, setEmoIcon] = useState([]);
  const [emo, setEmo] = useState(sectionData ? sectionData.emo : '');
  const [tag_0, setTag_0] = useState(sectionData ? sectionData.tag_0 : '');
  const [tag_1, setTag_1] = useState(sectionData ? sectionData.tag_1 : '');
  const [tag_2, setTag_2] = useState(sectionData ? sectionData.tag_2 : '');
  const [urlVideo, setUrlVideo] = useState(
    sectionData ? sectionData.urlVideo : '',
  );
  const [urlImg, setUrlImg] = useState(sectionData ? sectionData.urlImg : '');
  const [urlWeb, setUrlWeb] = useState(sectionData ? sectionData.urlWeb : '');

  // const [value, setValue] = useState('');

  const [paramOk, setParamOk] = useState(true);

  const [postOk, setPostOk] = useState(false);
  const [movePage, setMovePage] = useState(false);

  // const handleMultiple = (event) => {
  //   setMultipleSelect(event.target.value);
  // };

  // ルーティング設定
  // const router = useRouter();

  // ブックページへ移動
  useEffect(() => {
    if (movePage) {
      // リダイレクトにすることで強制的にページ再読み込みを行うことでデータ最新化
      location.href = `/users/${userName}/${bookName}`;
    }
  }, [movePage]);

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
   * movePageを操作するコールバック関数
   *
   * @param {*} props
   */
  const callBackSetMovePage = (props) => {
    switch (props) {
      case 'close':
        setMovePage(false);
        setPostOk(false);
        break;
      case 'yes':
        setMovePage(true);
        setPostOk(false);
        break;
      case 'no':
        setMovePage(false);
        setPostOk(false);
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
      .set(postData, { merge: true });
    return addedData;
  };

  // 設定ボタンクリック時の処理
  const onClickCallback = async () => {
    if (date === '' || title === '' || contents === '' || emoIcon === '') {
      alert('日付、タイトル、コンテンツ、感情アイコンは必須です');
      setParamOk(false);
      return false;
    }

    // sectionIdを事前に取得
    let sectionDocId;
    if (!sectionData) {
      sectionDocId = firebase
        .firestore()
        .collection(VALIDUSERS)
        .doc(userData.uid)
        .collection(VALIDBOOKS)
        .doc(bookId)
        .collection(VALIDSECTIONS)
        .doc().id;
    } else {
      sectionDocId = sectionData.sectionId;
    }

    const postData = {
      isPublic,
      isFuture,

      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),

      uid: userData.uid,
      userName,
      userDocRef: `/${VALIDUSERS}/${userData.uid}`,

      bookId,
      bookName,
      bookDocRef: `/${VALIDUSERS}/${userData.uid}/${VALIDBOOKS}/${bookId}`,

      sectionId: sectionDocId,
      sectionDocRef: `/${VALIDUSERS}/${userData.uid}/${VALIDBOOKS}/${bookId}/${VALIDSECTIONS}/${sectionId}/`,
      date: new Date(date),
      title,
      contents,
      sectionIconImageUrl,
      sectionCoverImageUrl,
      tag_0,
      tag_1,
      tag_2,
      urlVideo,
      urlImg,
      urlWeb,
      emoIcon,
      emo,
      quoteRef: '',
      quotedRef: '',
      quotedCount: '',
    };
    if (!sectionData) {
      postData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    }
    // console.log({ postData });

    const addedData = await postDataToFirestore(
      VALIDUSERS,
      userData.uid,
      VALIDBOOKS,
      bookId,
      VALIDSECTIONS,
      sectionDocId,
      postData,
    );

    // setIsPublic(true);
    // setIsFuture(false);
    // setDate(dateTimeLocal);
    // setTitle('');
    // setContents('');
    // setTag_0('');
    // setTag_1('');
    // setTag_2('');
    // setUrlVideo('');
    // setUrlImg('');
    // setUrlWeb('');
    // setEmoIcon([]);
    // setEmo('');

    //ブックページをバックグラウンド更新
    const response = await fetch(`/users/${userName}/${bookName}`);
    //ユーザページをバックグラウンド更新
    const response2 = await fetch(`/users/${userName}`);

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
                <EventNoteIcon className={classes.inputAdornmentIcon} />
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
            type: 'text',
            endAdornment: (
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
            type: 'text',
            multiline: true,
            rows: 8,
            endAdornment: (
              <InputAdornment position="end">
                <NotesIcon />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: contents,
            onChange: (e) => setContents(e.target.value),
          }}
        />

        {/*************************/}
        {/* セクションアイコン画像URL */}
        {/**********************(**/}
        <CustomInput
          labelText="アイコン画像URL"
          id="sectionIconImageUrl"
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
            value: sectionIconImageUrl,
            onChange: (e) => setSectionIconImageUrl(e.target.value),
          }}
        />

        {/************************/}
        {/* セクションカバー画像URL  */}
        {/************************/}
        <CustomInput
          labelText="カバー画像URL"
          id="sectionCoverImageUrl"
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
            value: sectionCoverImageUrl,
            onChange: (e) => setSectionCoverImageUrl(e.target.value),
          }}
        />

        {/************************/}
        {/* 感情 選択式            */}
        {/************************/}
        <FormControl
          fullWidth
          className={customSelectStylesClasses.selectFormControl}
        >
          <InputLabel
            htmlFor="multiple-select"
            className={customSelectStylesClasses.selectLabel}
          >
            感情選択
          </InputLabel>
          <Select
            multiple
            value={emoIcon}
            // onChange={handleMultiple}
            onChange={(e) => setEmoIcon(e.target.value)}
            MenuProps={{
              className: customSelectStylesClasses.selectMenu,
              classes: { paper: customSelectStylesClasses.selectPaper },
            }}
            classes={{ select: customSelectStylesClasses.select }}
            inputProps={{
              name: 'emoIcon',
              id: 'multiple-select',
            }}
          >
            <MenuItem
              disabled
              classes={{
                root: customSelectStylesClasses.selectMenuItem,
              }}
            >
              複数選択可能
            </MenuItem>
            <MenuItem
              classes={{
                root: customSelectStylesClasses.selectMenuItem,
                selected:
                  customSelectStylesClasses.selectMenuItemSelectedMultiple,
              }}
              value="😆喜"
            >
              😆喜
            </MenuItem>
            <MenuItem
              classes={{
                root: customSelectStylesClasses.selectMenuItem,
                selected:
                  customSelectStylesClasses.selectMenuItemSelectedMultiple,
              }}
              value="💢怒"
            >
              💢怒
            </MenuItem>
            <MenuItem
              classes={{
                root: customSelectStylesClasses.selectMenuItem,
                selected:
                  customSelectStylesClasses.selectMenuItemSelectedMultiple,
              }}
              value="😢哀"
            >
              😢哀
            </MenuItem>
            <MenuItem
              classes={{
                root: customSelectStylesClasses.selectMenuItem,
                selected:
                  customSelectStylesClasses.selectMenuItemSelectedMultiple,
              }}
              value="😍楽"
            >
              😍楽
            </MenuItem>
          </Select>
        </FormControl>
        {/************************/}
        {/* 感情  補足             */}
        {/************************/}
        <CustomInput
          labelText="感情"
          id="emo"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            // placeholder: '感情',
            type: 'text',
            endAdornment: (
              <InputAdornment position="start">
                <InsertEmoticonIcon className={classes.inputAdornmentIcon} />
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
            // placeholder: 'タグ 0',
            type: 'text',
            endAdornment: (
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
            // placeholder: 'タグ 1',
            type: 'text',
            endAdornment: (
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
            // placeholder: 'タグ 2',
            type: 'text',
            endAdornment: (
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
            // placeholder: '関連動画URL(未実装)',
            type: 'url',
            endAdornment: (
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
            // placeholder: '関連画像URL(未実装)',
            type: 'url',
            endAdornment: (
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
            // placeholder: '関連サイトURL(未実装)',
            type: 'url',
            endAdornment: (
              <InputAdornment position="start">
                <HttpIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: urlWeb,
            onChange: (e) => setUrlWeb(e.target.value),
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
          modalText="日付、タイトル、コンテンツ、感情アイコンは必須です"
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
          modalText="手記ページへ移動しますか"
          closeBtnTxt=""
          yesBtnTxt="移動する"
          noBtnTxt="ページに残る"
          callBack={callBackSetMovePage}
        />
      )}
    </>
  );
};

// export default SectionCreateInputForm;
