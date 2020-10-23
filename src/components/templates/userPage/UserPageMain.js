/* react */
import { useContext } from 'react';
/* next */
import { useRouter } from 'next/router';
/* nodejs library that concatenates classes */
import classNames from 'classnames';
/* material-ui core  */
import { makeStyles } from '@material-ui/core/styles';
/* material-ui icon */
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import NotesIcon from '@material-ui/icons/Notes';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import UpdateIcon from '@material-ui/icons/Update';
/* nextjs-materialui-kit */
import Button from 'components/CustomButtons/Button.js';
import Clearfix from 'components/Clearfix/Clearfix.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import NavPills from 'components/NavPills/NavPills.js';
import Parallax from 'components/Parallax/Parallax.js';
import profilePageStyle from 'assets/jss/nextjs-material-kit-pro/pages/profilePageStyle.js';
/* MyApp */
import { RSC } from 'src/common/resource';
import Link from 'src/components/atoms/Link';
import { BookList } from 'src/components/molecules/BookList';
import { SectionList } from 'src/components/molecules/SectionList';
import UserCard from 'src/components/molecules/UserCard';
import { AppMain } from 'src/components/organisms/AppMain';
import { AppHead } from 'src/components/organisms/AppHead';
import { AuthContext } from 'pages/_app';
import shukishoko from 'public/logo_shukishoko_circle.svg';


const useStyles = makeStyles(profilePageStyle);

/**
 * ユーザページメイン
 *
 * @param {*} {
 *   userName,
 *   userData,
 *   bookDataList,
 *   sectionDataList,
 * }
 * @return {*}
 */
export const UserPageMain = ({
  userName,
  userData,
  bookDataList,
  sectionDataList,
  ...rest
}) => {
  // 認証情報取得
  const { user: authUser, userData: authUserData } = useContext(AuthContext);

  const classes = useStyles();

  // 事前ビルドされていない場合はここで作成する
  const router = useRouter();
  if (router.isFallback) {
    console.log(`${userName}静的ページ作成中...`);
    return <div>{`${userName}静的ページ作成中...`}</div>;
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

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid,
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <>
      {/********************/}
      {/* ヘッダ設定         */}
      {/********************/}
      <AppHead
        pageTitle={`§ ${userData.userDisplayName}@${userData.userName}さんの手記書庫`}
        description={`${RSC.appTitle}は${RSC.topPageDescription_1}`}
        url={`${RSC.domain}/users/${userName}`}
      />
      {/*******************/}
      {/* ユーザカバー画像   */}
      {/*******************/}
      <Parallax
        image={require('public/hana_02F.jpg')}
        filter="dark"
        className={classes.parallax}
      />
      <AppMain>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <div className={classes.profile}>
              {/*********************/}
              {/* ユーザアイコン画像   */}
              {/*********************/}
              <div>
                <img src={shukishoko} alt={userName} className={imageClasses} />
              </div>
              <div className={classes.name}>
                <h3 className={classes.title}>{userData.userDisplayName}</h3>
                <p>@{userData.userName}</p>
              </div>
            </div>
          </GridItem>
        </GridContainer>
        {/*****************/}
        {/* ユーザ情報表示  */}
        {/*****************/}
        <div className={classNames(classes.description, classes.textCenter)}>
          <p>{userData.userIntroduction}</p>
        </div>

        {/* 自分のページの場合のみ表示する */}
        {authUserData.uid === userData.uid && (
          <>
            <GridContainer justify="center">
              {/*****************/}
              {/* ユーザ編集      */}
              {/*****************/}
              <Button
                simple
                valiant="text"
                component={Link}
                href="/top"
                color="primary"
                round
                style={{
                  textDecoration: 'none',
                  width: '12rem',
                }}
              >
                ユーザを編集
              </Button>
              {/*****************/}
              {/* 手記作成       */}
              {/*****************/}
              <Button
                simple
                component={Link}
                href={`/users/${userName}/book-create`}
                color="primary"
                round
                style={{
                  textDecoration: 'none',
                  width: '12rem',
                }}
              >
                手記を追加
              </Button>
            </GridContainer>
          </>
        )}

        <div className={classes.profileTabs}>
          <NavPills
            // 初期フォーカスは手記とする
            active={1}
            alignCenter
            color="primary"
            tabs={[
              {
                // タブ
                tabButton: 'ユーザ',
                tabIcon: PeopleAltIcon,
                tabContent: (
                  <GridContainer justify="center">
                    <GridItem>
                      <h4 className={classes.title} align="center">
                        ユーザ情報
                      </h4>
                      <GridContainer justify="center">
                        <UserCard userName={userName} userData={userData} />
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                ),
              },
              {
                // タブ
                tabButton: '手記',
                tabIcon: LibraryBooks,
                tabContent: (
                  <GridContainer justify="center">
                    <GridItem>
                      <h4 className={classes.title} align="center">
                        ユーザがまとめた手記
                      </h4>
                      <GridContainer justify="center">
                        <BookList bookDataList={bookDataList} />
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                ),
              },
              {
                // タブ2
                tabButton: 'セクション',
                tabIcon: NotesIcon,
                tabContent: (
                  <GridContainer justify="center">
                    <GridItem>
                      <h4 className={classes.title} align="center">
                        ユーザが記したセクション
                      </h4>
                      <GridContainer justify="center">
                        <SectionList sectionDataList={sectionDataList} />
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                ),
              },
              {
                // タブ
                tabButton: '未来',
                tabIcon: UpdateIcon,
                tabContent: (
                  <GridContainer justify="center">
                    <GridItem>
                      <h4 className={classes.title} align="center">
                        ユーザが繋いだ未来
                      </h4>
                      <GridContainer justify="center">
                        {/* <SectionList sectionDataList={sectionDataList} /> */}
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                ),
              },
            ]}
          />
        </div>
        <Clearfix />
      </AppMain>
    </>
  );
};
