/* next */
import Link from 'src/components/atoms/Link';
import { useRouter } from 'next/router';

/* MyApp */
import { AppMain } from 'src/components/organisms/AppMain';

import { makeStyles } from '@material-ui/core/styles';
import { SectionCard } from 'src/components/molecules/SectionCard';

import classNames from 'classnames';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import NavPills from 'components/NavPills/NavPills.js';
import Clearfix from 'components/Clearfix/Clearfix.js';
import Button from 'components/CustomButtons/Button.js';
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
import Typography from '@material-ui/core/Typography';

import Parallax from 'components/Parallax/Parallax.js';

import { BookList } from 'src/components/molecules/BookList';
import BookCard from 'src/components/molecules/BookCard';

import { AuthContext } from 'pages/_app';
import UserCard from 'src/components/molecules/UserCard';
import { AppHead } from 'src/components/organisms/AppHead';
import { RSC } from 'src/common/resource';

import shukishoko from 'public/logo_shukishoko_circle.svg';

import { convertFromTimestampToDatetime } from 'src/common/common';

import profilePageStyle from 'assets/jss/nextjs-material-kit-pro/pages/profilePageStyle.js';
const useStyles = makeStyles(profilePageStyle);

/**
 *
 *
 * @param {*} { userName, bookName, sectionId, sectionData }
 * @return {*}
 */
const SectionPageMain = ({
  userName,
  userData,
  bookName,
  bookData,
  sectionId,
  sectionData,
}) => {
  const classes = useStyles();

  // 事前ビルドされていない場合はここで作成する
  const router = useRouter();
  if (router.isFallback) {
    console.log(`${userName}/${bookName}/${sectionId}静的ページ作成中...`);
    return (
      <div>{`${userName}/${bookName}/${sectionId}静的ページ作成中...`}</div>
    );
  }
  // ユーザネームがない段階では何もしない;
  if (!sectionId) {
    console.log('異常終了 そんなセクションはありません\n');
    return <div>そんなセクションはありません...</div>;
  }

  if (!sectionData) {
    console.log('異常終了 指定されたセクションは存在しません...\n');
    return <div>指定されたセクションは存在しません...</div>;
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
        pageTitle={`§ ${convertFromTimestampToDatetime(
          sectionData.date.seconds,
        )} の思い出 『${sectionData.title}』`}
        description={`~${RSC.appTitle} ${userData.userDisplayName}@${userData.userName}さんが主人公『${bookData.authorDisplayName}』を綴った手記『${bookData.bookDisplayName}』より〜`}
        url={`${RSC.domain}/users/${userName}/${bookName}/${sectionId}`}
      />
      {/********************/}
      {/* セクションカバー画像 */}
      {/********************/}
      <Parallax
        image={require('public/hana_04F.jpg')}
        filter="dark"
        className={classes.parallax}
      />
      <AppMain>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <div className={classes.profile}>
              {/**************/}
              {/* アバター画像 */}
              {/**************/}
              <div>
                <img src={shukishoko} alt={bookName} className={imageClasses} />
              </div>
              <div className={classes.name}>
                <h3 className={classes.title}>{sectionData.title}</h3>
                <p>
                  @{userData.userName}/{bookData.bookName}/
                  {sectionData.sectionId}
                </p>
              </div>
            </div>
          </GridItem>
        </GridContainer>
        {/**********************/}
        {/* セクション情報表示    */}
        {/**********************/}
        <div className={classNames(classes.description, classes.textCenter)}>
          <p>セクション公開設定：{sectionData.isPublic}</p>
          <p>セクションドキュメントID：{sectionData.sectionId}</p>
          <p>
            セクションが起きた日付：
            {convertFromTimestampToDatetime(sectionData.date.seconds)}
          </p>
          <p>セクションのタイトル：{sectionData.title}</p>
          <p>セクションの内容：{sectionData.contents}</p>
          <p>喜怒哀楽：{sectionData.emo}</p>
          <p>引用した元セクション：{sectionData.quoteRef}</p>
          <p>引用された数：{sectionData.quotedCount}</p>
          <br />
          <p>
            作成日：
            {convertFromTimestampToDatetime(sectionData.createdAt.seconds)}
          </p>
          <p>
            更新日：
            {convertFromTimestampToDatetime(sectionData.updatedAt.seconds)}
          </p>
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
                        セクションの管理ユーザ
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
                        セクションの属する手記
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
                        セクション情報
                      </h4>
                      <GridContainer justify="center">
                        <SectionCard
                          userName={userName}
                          bookName={bookName}
                          sectionId={sectionId}
                          sectionData={sectionData}
                        />
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                ),
              },
            ]}
          />
        </div>
        <Clearfix />

        <br />

        <Link href={`/users/${userName}`}>
          <a>ユーザページ</a>
        </Link>
        <Link href={`/users/${userName}/${bookName}`}>
          <a>手記ページ</a>
        </Link>
      </AppMain>
    </>
  );
};

export default SectionPageMain;
