/* react */
import { useContext } from 'react';

// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// @material-ui/icons
import Camera from '@material-ui/icons/Camera';
import Palette from '@material-ui/icons/Palette';
import People from '@material-ui/icons/People';
import Add from '@material-ui/icons/Add';
import Favorite from '@material-ui/icons/Favorite';
// core components
import Header from 'components/Header/Header.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import NavPills from 'components/NavPills/NavPills.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import Badge from 'components/Badge/Badge.js';
import Muted from 'components/Typography/Muted.js';
import Parallax from 'components/Parallax/Parallax.js';
import Clearfix from 'components/Clearfix/Clearfix.js';
import Button from 'components/CustomButtons/Button.js';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import NotesIcon from '@material-ui/icons/Notes';
import UpdateIcon from '@material-ui/icons/Update';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import shukishoko from 'public/logo_shukishoko_circle.svg';
import christian from 'assets/img/faces/christian.jpg';
import oluEletu from 'assets/img/examples/olu-eletu.jpg';
import clemOnojeghuo from 'assets/img/examples/clem-onojeghuo.jpg';
import cynthiaDelRio from 'assets/img/examples/cynthia-del-rio.jpg';
import mariyaGeorgieva from 'assets/img/examples/mariya-georgieva.jpg';
import clemOnojegaw from 'assets/img/examples/clem-onojegaw.jpg';
import darrenColeshill from 'assets/img/examples/darren-coleshill.jpg';
import avatar from 'assets/img/faces/avatar.jpg';
import marc from 'assets/img/faces/marc.jpg';
import kendall from 'assets/img/faces/kendall.jpg';
import cardProfile2Square from 'assets/img/faces/card-profile2-square.jpg';

/* next */
import Link from 'src/components/atoms/Link';
import { useRouter } from 'next/router';
/* material-ui */
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
/* MyApp */
import { BookList } from 'src/components/molecules/BookList';
import { SectionList } from 'src/components/molecules/SectionList';

import UserCard from 'src/components/molecules/UserCard';
import { AuthContext } from 'pages/_app';
import { AppMain } from 'src/components/organisms/AppMain';
import { AppHead } from 'src/components/organisms/AppHead';
import { RSC } from 'src/common/resource';

import profilePageStyle from 'assets/jss/nextjs-material-kit-pro/pages/profilePageStyle.js';

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
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  //認証情報取得
  const { user } = useContext(AuthContext);
  // console.log({ user });

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
        <div className={classes.profileTabs}>
          <NavPills
            // 初期フォーカスは手記とする
            active="1"
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
                        <SectionList sectionDataList={sectionDataList} />
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
