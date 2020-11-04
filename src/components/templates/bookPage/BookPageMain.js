/* react */
import React, { useContext, useState, useEffect } from 'react';
/* next */
import { useRouter } from 'next/router';
/* classNames */
import classNames from 'classnames';
/* materialui core */
import { makeStyles } from '@material-ui/core/styles';
/* materialui icon */
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import NotesIcon from '@material-ui/icons/Notes';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import UpdateIcon from '@material-ui/icons/Update';
/* nextjs-materialui-kit */
import Button from 'components/CustomButtons/Button.js';
import Clearfix from 'components/Clearfix/Clearfix.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import NavPills from 'components/NavPills/NavPills.js';
import Parallax from 'components/Parallax/Parallax.js';
import profilePageStyle from 'assets/jss/nextjs-material-kit-pro/pages/profilePageStyle.js';
import buttonStyle from 'assets/jss/nextjs-material-kit-pro/components/buttonStyle.js';
/* MyApp */
import { getDefaultImg } from 'src/common/common';
import {
  getSectionDataListFromBookData,
  convertFromTimestampToDatetime,
  secToSlashDateTimeTokyo,
  secToSlashDateTokyo,
} from 'src/common/common';
import { RSC } from 'src/common/resource';
import Link from 'src/components/atoms/Link';
import { SectionList } from 'src/components/molecules/SectionList';
import BookCard from 'src/components/molecules/BookCard';
import UserCard from 'src/components/molecules/UserCard';
import { AppMain } from 'src/components/organisms/AppMain';
import { AppHead } from 'src/components/organisms/AppHead';
import shukishoko from 'public/logo_shukishoko_circle.svg';
import { AuthContext } from 'pages/_app';

const useStyles = makeStyles(profilePageStyle);
const useButtonStyles = makeStyles(buttonStyle);

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
  // sectionDataList,
}) => {
  const [sectionDataListClientFetch, setSectionDataListClientFetch] = useState(
    [],
  );

  // 認証情報取得
  const { user: authUser, userData: authUserData } = useContext(AuthContext);

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

  // ブックネームがない段階では何もしない;
  if (!bookName) {
    console.log('異常終了 そんな手記はありません\n');

    return <div>そんな手記はありません...</div>;
  }

  if (!bookData) {
    console.log('異常終了 指定された手記は存在しません...\n');

    return <div>指定された手記は存在しません...</div>;
  }

  // 子のsection情報取得
  useEffect(() => {
    async function fetchData() {
      // ブック配下のセクションデータリストを取得
      const sectionDataListClientFetch = await getSectionDataListFromBookData(
        userData,
        bookData,
      );
      setSectionDataListClientFetch(sectionDataListClientFetch);
      console.log('ここは何度も通らない sectionDataListClientFetch');
    }
    if (userData) {
      fetchData();
    }
  }, []);

  const classes = useStyles();
  const btnClasses = useButtonStyles();

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
        // pageTitle={`§ 主人公『${bookData.authorDisplayName}』を綴った 手記『${bookData.bookDisplayName}』 `}
        pageTitle={`${RSC.bookEmoji}${bookData.bookDisplayName} ${RSC.autherEmoji}${bookData.authorDisplayName} ${RSC.appTitleSimple}`}
        // description={`~${RSC.appTitle} ${userData.userDisplayName}@${userData.userName}さんの手記書庫より〜`}
        description={`${RSC.contentsEmoji}${bookData.bookIntroduction}`}
        // description={`aaaaaa`}
        image={
          bookData.bookCoverImageUrl
            ? bookData.bookCoverImageUrl
            : getDefaultImg({
                pageType: 'book',
                imgType: 'cover',
                seed: bookData.bookId,
              })
        }
        url={`${RSC.domain}/users/${userName}/${bookName}`}
      />
      {/*******************/}
      {/* 手記カバー画像    */}
      {/*******************/}
      <Parallax
        // image={require('public/hana_03F.jpg')}
        image={
          bookData.bookCoverImageUrl
            ? bookData.bookCoverImageUrl
            : getDefaultImg({
                pageType: 'book',
                imgType: 'cover',
                seed: bookData.bookId,
              })
        }
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
                <img
                  // src={shukishoko}
                  src={
                    bookData.bookIconImageUrl
                      ? bookData.bookIconImageUrl
                      : getDefaultImg({
                          pageType: 'book',
                          imgType: 'avatar',
                          seed: bookData.bookId,
                        })
                  }
                  alt={bookName}
                  className={imageClasses}
                />
              </div>
              <div className={classes.name}>
                <h3 className={classes.title}>
                  {RSC.bookEmoji}
                  {bookData.bookDisplayName}
                </h3>
                <p>@{bookData.bookName}</p>
              </div>
            </div>
          </GridItem>
        </GridContainer>
        {/*****************/}
        {/* 手記情報表示    */}
        {/*****************/}
        {/* <div className={classNames(classes.description, classes.textCenter)}>
          <p>公開設定：{bookData.isPublic}</p>
          <p>ユーザ名：{userData.userDisplayName}</p>
          <p>主人公：{bookData.authorDisplayName}</p>
          <p>
            主人公の誕生日：
            {secToSlashDateTokyo(bookData.authorBirthday.seconds)}
          </p>
          <p>主人公の現在の年齢：{bookData.authorNowAge}</p>
          <p>作成日：{secToSlashDateTimeTokyo(bookData.createdAt.seconds)}</p>
          <p>更新日：{secToSlashDateTimeTokyo(bookData.updatedAt.seconds)}</p>
          <hr />
          <p>{bookData.bookIntroduction}</p>
        </div> */}

        {/* 自分のページの場合のみ表示する */}
        {authUserData.uid === userData.uid && (
          <>
            <GridContainer justify="center">
              {/*****************/}
              {/* 手記編集       */}
              {/*****************/}
              <Button
                simple
                valiant="text"
                component={Link}
                href={`/users/${userName}/${bookName}/book-edit`}
                color="primary"
                round
                style={{
                  textDecoration: 'none',
                  width: '12rem',
                }}
              >
                <SettingsIcon className={classes.dropdownIcons} />
                手記を編集
              </Button>
              {/*****************/}
              {/* セクション作成  */}
              {/*****************/}
              <Button
                simple
                component={Link}
                href={`/users/${userName}/${bookName}/section-create`}
                color="primary"
                round
                style={{
                  textDecoration: 'none',
                  width: '12rem',
                }}
              >
                <NotesIcon className={classes.dropdownIcons} />
                セクションを追加
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
                        {/* <SectionList sectionDataList={sectionDataList} /> */}
                        <SectionList
                          sectionDataList={sectionDataListClientFetch}
                        />
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
                        {/* <SectionList
                          sectionDataList={sectionDataListClientFetch}
                        /> */}
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

export default BookPageMain;
