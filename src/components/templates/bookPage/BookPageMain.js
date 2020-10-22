import Link from 'src/components/atoms/Link';
import { useRouter } from 'next/router';

import { AppMain } from 'src/components/organisms/AppMain';

import { SectionList } from 'src/components/molecules/SectionList';

import BookCard from 'src/components/molecules/BookCard';

import classNames from 'classnames';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import NavPills from 'components/NavPills/NavPills.js';
import Clearfix from 'components/Clearfix/Clearfix.js';
import Button from 'components/CustomButtons/Button.js';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Add from '@material-ui/icons/Add';
import Camera from '@material-ui/icons/Camera';
import Palette from '@material-ui/icons/Palette';
import People from '@material-ui/icons/People';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import NotesIcon from '@material-ui/icons/Notes';
import UpdateIcon from '@material-ui/icons/Update';
import Avatar from '@material-ui/core/Avatar';
import { IconButton } from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import shukishoko from 'public/logo_shukishoko_circle.svg';

import { BookList } from 'src/components/molecules/BookList';

import { AuthContext } from 'pages/_app';

import Parallax from 'components/Parallax/Parallax.js';

import { convertFromTimestampToDatetime } from 'src/common/common';
import { AppHead } from 'src/components/organisms/AppHead';
import { RSC } from 'src/common/resource';

import UserCard from 'src/components/molecules/UserCard';

import profilePageStyle from 'assets/jss/nextjs-material-kit-pro/pages/profilePageStyle.js';
const useStyles = makeStyles(profilePageStyle);

/**
 * ブックページメイン
 *
 * @param {*} {
 *   userName,
 *   userData,
 *   bookName,
 *   bookData,
 *   sectionDataList,
 * }
 * @return {*}
 */
const BookPageMain = ({
  userName,
  userData,
  bookName,
  bookData,
  sectionDataList,
}) => {
  const classes = useStyles();

  // 事前ビルドされていない場合はここで作成する
  const router = useRouter();
  if (router.isFallback) {
    console.log(`${userName}/${bookName}静的ページ作成中...`);
    return <div>{`${userName}/${bookName}静的ページ作成中...`}</div>;
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

  // ユーザネームがない段階では何もしない;
  if (!bookName) {
    console.log('異常終了 そんな手記はありません\n');

    return <div>そんな手記はありません...</div>;
  }

  if (!bookData) {
    console.log('異常終了 指定された手記は存在しません...\n');

    return <div>指定された手記は存在しません...</div>;
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
        pageTitle={`§ 主人公『${bookData.authorDisplayName}』を綴った 手記『${bookData.bookName}』 `}
        description={`~${RSC.appTitle} ${userData.userDisplayName}@${userData.userName}さんの手記書庫より〜`}
        url={`${RSC.domain}/users/${userName}/${bookName}`}
      />
      {/*******************/}
      {/* 手記カバー画像    */}
      {/*******************/}
      <Parallax
        image={require('public/hana_03F.jpg')}
        filter="dark"
        className={classes.parallax}
      />
      <AppMain>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <div className={classes.profile}>
              {/******************/}
              {/* 手記アイコン画像 */}
              {/******************/}
              <div>
                <img src={shukishoko} alt={bookName} className={imageClasses} />
              </div>
              <div className={classes.name}>
                <h3 className={classes.title}>{bookData.bookDisplayName}</h3>
                <p>
                  @{userData.userName}/{bookData.bookName}
                </p>
              </div>
            </div>
          </GridItem>
        </GridContainer>
        {/*****************/}
        {/* 手記情報表示    */}
        {/*****************/}
        <div className={classNames(classes.description, classes.textCenter)}>
          <p>公開設定：{bookData.isPublic}</p>
          <p>ユーザ名：{userData.userDisplayName}</p>
          <p>主人公：{bookData.authorDisplayName}</p>
          <p>
            主人公の誕生日：
            {convertFromTimestampToDatetime(bookData.authorBirthday.seconds)}
          </p>
          <p>主人公の現在の年齢：{bookData.authorNowAge}</p>
          <p>
            作成日：{convertFromTimestampToDatetime(bookData.createdAt.seconds)}
          </p>
          <p>
            更新日：{convertFromTimestampToDatetime(bookData.updatedAt.seconds)}
          </p>
          <hr />
          <p>{bookData.bookIntroduction}</p>
        </div>
        <div className={classes.profileTabs}>
          <NavPills
            // 初期フォーカスはセクションとする
            active="2"
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
                        手記の管理ユーザ
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
                        手記情報
                      </h4>
                      <GridContainer justify="center">
                        <BookCard
                          userName={userName}
                          bookName={bookName}
                          bookData={bookData}
                        />
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                ),
              },
              {
                // タブ
                tabButton: 'セクション',
                tabIcon: NotesIcon,
                tabContent: (
                  <GridContainer justify="center">
                    <GridItem>
                      <h4 className={classes.title} align="center">
                        手記で記したセクション
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
                        手記で繋いだ未来
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

        <Link href={`/users/${userData.userName}/bookSetting`}>
          <a>手記設定 へ移動</a>
        </Link>
        <br />
        <Link
          href={`/users/${userData.userName}/${bookData.bookName}/sectionCreate`}
        >
          <a>セクション作成 へ移動</a>
        </Link>
      </AppMain>
    </>
  );
};

export default BookPageMain;
