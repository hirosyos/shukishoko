/* react */
import React, { useState, useEffect, useContext, useRef } from 'react';
/* next */
import { useRouter } from 'next/router';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
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

// import image from 'assets/img/bg7.jpg';
import image from 'public/hana_07F.jpg';

/* MyApp */
import { RSC } from 'src/common/resource';
import firebase from 'src/common/firebase';
import { getUserDataFromUid, firebaseErrToTxt } from 'src/common/common';
import SimpleModal from 'src/components/atoms/SimpleModal';
import { AppMain } from 'src/components/organisms/AppMain';
import { AuthContext } from 'pages/_app';

// スタイル設定
import loginPageStyle from 'assets/jss/nextjs-material-kit-pro/pages/loginPageStyle.js';
const useStyles = makeStyles(loginPageStyle);

// 何故かグローバル変数じゃないと値が消えてしまう
let errText;

/**
 * ログインページメイン
 *
 * @export
 * @return {*}
 */
export default function LoginPageMain() {
  // 認証状態
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [userName, setUserName] = useState('');

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [moveUserPage, setMoveUserPage] = useState(false);

  const mounted = useRef(true);

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

        // console.log('userData');
        // console.log(userData);
        setUserName(userData.userName);
        // setMoveUserPage('true');
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

    console.log('ログインTry');
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {})
      .catch((e) => {
        errText = firebaseErrToTxt(e, 'signin');
        console.log(e.message, mounted);
        console.log(errText);

        if (mounted.current) {
          setError(e);
          setUserName('');
          setMoveUserPage('false');
          console.log('ログイン失敗2');
          setPending(false);
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
    // <AppMain>
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
                  <h4 className={classes.cardTitle}>{RSC.loginPrint}</h4>
                  <div className={classes.socialLine}>
                    <Button
                      justIcon
                      color="transparent"
                      className={classes.iconButtons}
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button
                      justIcon
                      color="transparent"
                      className={classes.iconButtons}
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button
                      justIcon
                      color="transparent"
                      className={classes.iconButtons}
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-google-plus-g" />
                    </Button>
                  </div>
                </CardHeader>
                <p className={classes.description + ' ' + classes.textCenter}>
                  Or Be Classical
                </p>
                <CardBody signup>
                  {/************************/}
                  {/* メールアドレスフォーム   */}
                  {/************************/}
                  <CustomInput
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    // material-uiのInputコンポーネントのProps
                    inputProps={{
                      placeholder: 'Email...',
                      type: 'email',
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                      autoComplete: 'email',
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                    }}
                  />
                  {/************************/}
                  {/* パスワードフォーム      */}
                  {/************************/}
                  <CustomInput
                    id="pass"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      placeholder: 'Password',
                      type: 'password',
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon className={classes.inputIconsColor}>
                            lock_utline
                          </Icon>
                        </InputAdornment>
                      ),
                      autoComplete: 'current-password',
                      value: pass,
                      onChange: (e) => setPass(e.target.value),
                    }}
                  />
                </CardBody>
                {/***********************/}
                {/* ログインボタン         */}
                {/***********************/}
                <div className={classes.textCenter}>
                  <Button
                    simple
                    color="primary"
                    size="lg"
                    type="submit"
                    onClick={onSubmit}
                  >
                    {RSC.loginBtnPrint}
                  </Button>
                </div>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      {/* ログインエラーになった場合 */}
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
    // </AppMain>
  );
}
