/* react */
import React, { useState, useEffect, useContext, useRef } from 'react';
/* next */
import { useRouter } from 'next/router';
// @material-ui/core components
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
import Check from '@material-ui/icons/Check';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Email from '@material-ui/icons/Email';
import HistoryIcon from '@material-ui/icons/History';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import UpdateIcon from '@material-ui/icons/Update';
// nextjs materialui kit core components
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import InfoArea from 'components/InfoArea/InfoArea.js';
import signupPageStyle from 'assets/jss/nextjs-material-kit-pro/pages/signupPageStyle.js';
/* MyApp */
import { getUserDataFromUid, firebaseErrToTxt } from 'src/common/common';
import { RSC } from 'src/common/resource';
import firebase from 'src/common/firebase';
import SimpleModal from 'src/components/atoms/SimpleModal';
import { AppHead } from 'src/components/organisms/AppHead';
import { AuthContext } from 'pages/_app';
import image from 'public/hana_01F.jpg';

// スタイル設定
const useStyles = makeStyles(signupPageStyle);

// 何故かグローバル変数じゃないと値が消えてしまう
let errText;

/**
 * サインアップページ
 *
 * @export
 * @param {*} { ...rest }
 * @return {*}
 */
export function SignupPageMain({ ...rest }) {
  // 認証状態
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [userName, setUserName] = useState('');

  const [account, setAccount] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [moveUserPage, setMoveUserPage] = useState(false);
  const mounted = useRef(true);

  const [checked, setChecked] = React.useState([1]);

  /**
   * チェックボックス用のトグル関数
   *
   * @param {*} value
   */
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  /**
   * errorを操作するコールバック関数
   *
   * @param {*} props
   */
  const callBackSetError = (props) => {
    switch (props) {
      case 'close':
        setError(null);
        break;
      case 'yes':
        setError(null);
        break;
      case 'no':
        setError(null);
        break;
      default:
        console.log('パラメータ異常');
    }
  };
  /**
   * moveUserPageを操作するコールバック関数
   *
   * @param {*} props
   */
  const callBackSetMoveUserPage = (props) => {
    switch (props) {
      case 'close':
        setMoveUserPage(false);
        // setUserName('');
        break;
      case 'yes':
        setMoveUserPage(true);
        // setUserName(false);
        break;
      case 'no':
        setMoveUserPage(false);
        // setUserName('');
        break;
      default:
        console.log('パラメータ異常');
    }
  };

  // 認証されていればそのユーザデータを取得
  useEffect(() => {
    if (user) {
      async function fetchData() {
        const { userData } = await getUserDataFromUid(user.uid);

        setUserName(userData.userName);
      }
      fetchData();
    }
    // console.log('user');
    // console.log({ user });
  }, [user]);

  // クリーンアップ
  useEffect(() => {
    const cleanup = () => {
      mounted.current = false;
    };
    return cleanup;
  }, []);

  // ログイン済みになったらユーザページへ飛ばす;
  useEffect(() => {
    if (userName && moveUserPage && !error) {
      router.push(`/users/${userName}`);
    }
  }, [userName, moveUserPage]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPending(true);

    console.log('サインアップTry');
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(async () => {
        const collectionName = 'validUsers';
        const docName = firebase.auth().currentUser.uid;
        //ユーザデータ書き込み
        const userData = {
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          isPublic: true,
          uid: firebase.auth().currentUser.uid,
          userName: account,
          userDisplayName: '',
          userIconEmoji: '',
          userIconImageUrl: '',
          userCoverImageUrl: '',
          userIntroduction: '',
          pricePlan: '',
        };
        await postDataToFirestore(collectionName, docName, userData);
      })
      .catch((e) => {
        errText = firebaseErrToTxt(e, 'signup');
        console.log(e.message, mounted);
        console.log(errText);

        if (mounted.current) {
          setError(e);
        }
      })
      .finally(() => {
        if (mounted.current) {
          setPending(false);
        }
      });
  };

  // スタイル読み出し
  const classes = useStyles();

  return (
    <>
      {/*******************/}
      {/* ヘッダ情報        */}
      {/*******************/}
      <AppHead
        pageTitle={`${RSC.appTitle}`}
        description={`${RSC.appTitle}は${RSC.topPageDescription_1}`}
        url={`${RSC.domain}/signup`}
      />
      {/*******************/}
      {/* 背景画像         */}
      {/*******************/}
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
              {/*******************/}
              {/* サインアップカード */}
              {/*******************/}
              <Card className={classes.cardSignup}>
                <h2 className={classes.cardTitle}>{RSC.signupPrint}</h2>
                <CardBody>
                  <GridContainer justify="center">
                    {/*******************/}
                    {/* Appの説明文      */}
                    {/*******************/}
                    <GridItem xs={12} sm={5} md={5}>
                      <InfoArea
                        className={classes.infoArea}
                        title="思い出を手記に"
                        description="過去の出来事を、感情と共に、時系列で手記にすることで思考は整理され、見えてくる物があるかもしれません。"
                        icon={HistoryIcon}
                        iconColor="rose"
                      />
                      <InfoArea
                        className={classes.infoArea}
                        title="人の思い出と出会う"
                        description="例えば、同じ時代、同じものが好きだった人の今と出会えます。過去に同じ悩みを抱えていた人の今と出会えます。"
                        icon={CompareArrowsIcon}
                        iconColor="primary"
                      />
                      <InfoArea
                        className={classes.infoArea}
                        title="未来に繋げる"
                        description="様々な人の思い出を仮想体験することで、今の問題を解決し、未来の計画が立てやすくなります"
                        icon={UpdateIcon}
                        iconColor="info"
                      />
                    </GridItem>
                    {/*******************/}
                    {/* サインアップ      */}
                    {/*******************/}
                    <GridItem xs={12} sm={5} md={5}>
                      <div className={classes.textCenter}>
                        <Button justIcon round color="google">
                          <i className={classes.socials + ' fab fa-google'} />
                        </Button>
                        {` `}
                        <Button justIcon round color="twitter">
                          <i className={classes.socials + ' fab fa-twitter'} />
                        </Button>
                        {` `}
                        <Button justIcon round color="facebook">
                          <i
                            className={classes.socials + ' fab fa-facebook-f'}
                          />
                        </Button>
                        {` `}
                        <h4 className={classes.socialTitle}>or be classical</h4>
                      </div>
                      {/***********************/}
                      {/* サインアップフォーム   */}
                      {/***********************/}
                      <form className={classes.form}>
                        {/***********************/}
                        {/* アカウントフォーム     */}
                        {/***********************/}
                        <CustomInput
                          labelText="アカウント名(半角アルファベットのみ)"
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                          }}
                          inputProps={{
                            placeholder: 'Name...',
                            type: 'text',
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <PersonAddIcon
                                  className={classes.inputAdornmentIcon}
                                />
                              </InputAdornment>
                            ),
                            value: account,
                            onChange: (e) => setAccount(e.target.value),
                          }}
                        />
                        {/***********************/}
                        {/* メールアドレスフォーム  */}
                        {/***********************/}
                        <CustomInput
                          labelText="アカウント名@example.com を使ってください"
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                          }}
                          // material-uiのInputコンポーネントのProps
                          inputProps={{
                            placeholder: 'Email...',
                            type: 'email',
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Email className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                          }}
                        />
                        {/***********************/}
                        {/* パスワードフォーム     */}
                        {/***********************/}
                        <CustomInput
                          labelText="パスワード"
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                          }}
                          inputProps={{
                            placeholder: 'Password...',
                            type: 'password',
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Icon className={classes.inputAdornmentIcon}>
                                  lock_outline
                                </Icon>
                              </InputAdornment>
                            ),
                            value: pass,
                            onChange: (e) => setPass(e.target.value),
                          }}
                        />
                        {/***********************/}
                        {/* 同意チェック          */}
                        {/***********************/}
                        <FormControlLabel
                          classes={{
                            label: classes.label,
                          }}
                          control={
                            <Checkbox
                              tabIndex={-1}
                              onClick={() => handleToggle(1)}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot,
                              }}
                              checked={checked.indexOf(1) !== -1 ? true : false}
                            />
                          }
                          label={
                            <span>
                              I agree to the{' '}
                              <a href="#pablo">terms and conditions</a>.
                            </span>
                          }
                        />
                        {/***********************/}
                        {/* サインアップボタン     */}
                        {/***********************/}
                        <div className={classes.textCenter}>
                          <Button
                            round
                            color="primary"
                            type="submit"
                            onClick={onSubmit}
                          >
                            {RSC.signupBtnPrint}
                          </Button>
                        </div>
                      </form>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        {error && (
          <SimpleModal
            modalTitle="ログインエラー"
            modalText={errText}
            closeBtnTxt="CLOSE"
            yesBtnTxt=""
            noBtnTxt=""
            callBack={callBackSetError}
          />
        )}
        {/* ログイン済みでログインページに遷移してきた場合 */}
        {userName && !moveUserPage && (
          <SimpleModal
            modalTitle={`${userName}さんはログイン済みです`}
            modalText="このままユーザページへ移動しますか？"
            closeBtnTxt=""
            yesBtnTxt="移動する"
            noBtnTxt="移動しない"
            callBack={callBackSetMoveUserPage}
          />
        )}
      </div>
    </>
  );
}

/**
 * Firestoreにデータを送信する関数
 *
 * @param {*} collectionName
 * @param {*} docName
 * @param {*} postData
 * @return {*}
 */
const postDataToFirestore = async (collectionName, docName, postData) => {
  const addedData = await firebase
    .firestore()
    .collection(collectionName)
    .doc(docName)
    .set(postData);

  return addedData;
};
