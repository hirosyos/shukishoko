/* react */
import { useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
// @material-ui/icon
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import HttpIcon from '@material-ui/icons/Http';
import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PersonIcon from '@material-ui/icons/Person';
// nextjs-matelialui-kit
import Button from 'components/CustomButtons/Button.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GridContainer from 'components/Grid/GridContainer.js';
import Switch from '@material-ui/core/Switch';
// nextjs-matelialui-kit スタイル
import radioSwitchStyle from 'assets/jss/nextjs-material-kit-pro/customCheckboxRadioSwitchStyle.js';
/* MyApp */
import { VALIDUSERS } from 'src/common/common';
import firebase from 'src/common/firebase';
import SimpleModal from 'src/components/atoms/SimpleModal';


// スタイル設定
const useRadioSwitchStyles = makeStyles(radioSwitchStyle);

/**
 * ユーザ編集フォーム
 *
 * @param {*} {
 *   classes,
 *   userName,
 *   userData,
 * }
 * @return {*}
 */
export const UserForm = ({ classes, userData }) => {
  // console.log({userData });

  const [userId, setUserId] = useState(userData ? userData.uid : '');
  const [isPublic, setIsPublic] = useState(userData ? userData.isPublic : true);
  const [userName, setUserName] = useState(userData ? userData.userName : '');
  const [userDisplayName, setUserDisplayName] = useState(
    userData ? userData.userDisplayName : '',
  );
  const [userIconEmoji, setUserIconEmoji] = useState(
    userData ? userData.userIconEmoji : '',
  );
  const [userIconImageUrl, setUserIconImageUrl] = useState(
    userData ? userData.userIconImageUrl : '',
  );
  const [userCoverImageUrl, setUserCoverImageUrl] = useState(
    userData ? userData.userCoverImageUrl : '',
  );
  const [userIntroduction, setUserIntroduction] = useState(
    userData ? userData.userIntroduction : '',
  );
  const [pricePlan, setPricePlan] = useState(
    userData ? userData.pricePlan : '',
  );

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
  const postDataToFirestore = async (userCollectionName, userId, postData) => {
    const addedData = await firebase
      .firestore()
      .collection(userCollectionName)
      .doc(userId)
      .set(postData,{merge:true});
    return addedData;
  };

  // 設定ボタンクリック時の処理
  const onClickCallback = async () => {
    if (userName === '' || userDisplayName === '' || userIconEmoji === '') {
      alert('ユーザ名、ユーザ表示名、ユーザ絵文字アイコンは必須です');
      setParamOk(false);
      return false;
    }

    // ユーザデータがない場合は新規作成 uidを事前に取得
    if (!userData) {
      const preUid = firebase.firestore().collection(VALIDUSERS).doc().id;
      setUserId(preUid);
    } else {
      setUserId(userData.uid);
    }

    const postData = {
      isPublic,

      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),

      uid: userId,
      userName,
      userDisplayName,
      userIconEmoji,
      userIconImageUrl,
      userCoverImageUrl,
      userIntroduction,
    };
    if(!userData){
      postData.createdAt= firebase.firestore.FieldValue.serverTimestamp()
    }

    console.log({ postData });
    const addedData = await postDataToFirestore(VALIDUSERS, userId, postData);

    // setIsPublic(true);
    // setUserName('');
    // setUserDisplayName('');
    // setUserIconEmoji('');
    // setUserIntroduction('');
    // setUserIconImageUrl('');
    // setUserCoverImageUrl('');
    // setPricePlan('');
  };

  // スタイル読み出し
  const radioSwitchClasses = useRadioSwitchStyles();

  return (
    <>
      <form className={classes.form}>
        <h3>ユーザ設定</h3>
        {/************************/}
        {/* ユーザ公開設定          */}
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
        {/* ユーザ管理名称        */}
        {/***********************/}
        <CustomInput
          labelText="管理名称(アルファベットのみ)"
          id="userName"
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
            value: userName,
            onChange: (e) => setUserName(e.target.value),
          }}
        />
        {/************************/}
        {/* ユーザ表示名称           */}
        {/************************/}
        <CustomInput
          labelText="表示名称(画面に表示されるユーザ名)"
          id="userDisplayName"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'text',
            endAdornment: (
              <InputAdornment position="start">
                <PersonIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: userDisplayName,
            onChange: (e) => setUserDisplayName(e.target.value),
          }}
        />

        {/************************/}
        {/* ユーザアイコン絵文字     */}
        {/************************/}
        <CustomInput
          labelText="アイコン絵文字"
          id="userIconEmoji"
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
            value: userIconEmoji,
            onChange: (e) => setUserIconEmoji(e.target.value),
          }}
        />
        {/************************/}
        {/* ユーザアイコン画像URL   */}
        {/************************/}
        <CustomInput
          labelText="アイコン画像URL(オプション)"
          id="userIconImageUrl"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'text',
            endAdornment: (
              <InputAdornment position="start">
                <HttpIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: userIconImageUrl,
            onChange: (e) => setUserIconImageUrl(e.target.value),
          }}
        />
        {/************************/}
        {/* ユーザカバー画像URL     */}
        {/************************/}
        <CustomInput
          labelText="カバー画像URL(オプション)"
          id="userCoverImageUrl"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'text',
            endAdornment: (
              <InputAdornment position="start">
                <HttpIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: userCoverImageUrl,
            onChange: (e) => setUserCoverImageUrl(e.target.value),
          }}
        />
        {/************************/}
        {/* ユーザ自己紹介文        */}
        {/************************/}
        <CustomInput
          labelText="自己紹介文(オプション)"
          id="userIntroduction"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'text',
            multiline: true,
            rows: 8,
            endAdornment: (
              <InputAdornment position="start">
                <AccessibilityNewIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            autoComplete: 'off',
            value: userIntroduction,
            onChange: (e) => setUserIntroduction(e.target.value),
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
          modalText="ユーザ名、ユーザ表示名、ユーザ絵文字アイコンは必須です"
          closeBtnTxt=""
          yesBtnTxt="OK"
          noBtnTxt=""
          callBack={callBackSetParamOk}
        />
      )}
    </>
  );
};

// export default UserForm;
