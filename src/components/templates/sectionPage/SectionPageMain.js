/* react */
import React, { useContext } from 'react';
/* next */
import { useRouter } from 'next/router';
/* material-ui core */
import { makeStyles } from '@material-ui/core/styles';
/* material-ui icon */
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import NotesIcon from '@material-ui/icons/Notes';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
/* classNames */
import classNames from 'classnames';
/* nextjs-materialui-kit */
import Button from 'components/CustomButtons/Button.js';
import Clearfix from 'components/Clearfix/Clearfix.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import NavPills from 'components/NavPills/NavPills.js';
import Parallax from 'components/Parallax/Parallax.js';
import profilePageStyle from 'assets/jss/nextjs-material-kit-pro/pages/profilePageStyle.js';
/* MyApp */
import { getDefaultImg } from 'src/common/common';
import Link from 'src/components/atoms/Link';
import BookCard from 'src/components/molecules/BookCard';
import { SectionCard } from 'src/components/molecules/SectionCard';
import UserCard from 'src/components/molecules/UserCard';
import { AppHead } from 'src/components/organisms/AppHead';
import { AppMain } from 'src/components/organisms/AppMain';
import {
  convertFromTimestampToDatetime,
  secToSlashDateTimeTokyo,
  secToSlashDateTokyo,
} from 'src/common/common';
import { RSC } from 'src/common/resource';
import { AuthContext } from 'pages/_app';
import shukishoko from 'public/logo_shukishoko_circle.svg';

const useStyles = makeStyles(profilePageStyle);

/**
 * セクションページメイン
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
  // 認証情報取得
  const { user: authUser, userData: authUserData } = useContext(AuthContext);

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

  return (
    <>
      {/********************/}
      {/* ヘッダ設定         */}
      {/********************/}
      <AppHead
        pageTitle={`
        ${RSC.sectionEmoji}${sectionData.title} ${
          RSC.dateEmoji
        }${secToSlashDateTokyo(sectionData.date.seconds)} ${
          RSC.appTitleSimple
        }`}
        description={`${RSC.contentsEmoji}${sectionData.contents}`}
        image={
          sectionData.sectionCoverImageUrl
            ? sectionData.sectionCoverImageUrl
            : getDefaultImg({
                pageType: 'section',
                imgType: 'cover',
                seed: sectionData.sectionId,
              })
        }
        url={`${RSC.domain}/users/${userName}/${bookName}/${sectionId}`}
      />
      {/********************/}
      {/* セクションカバー画像 */}
      {/********************/}
      <Parallax
        // image={require('public/hana_04F.jpg')}
        image={
          sectionData.sectionCoverImageUrl
            ? sectionData.sectionCoverImageUrl
            : getDefaultImg({
                pageType: 'section',
                imgType: 'cover',
                seed: sectionData.sectionId,
              })
        }
        filter="dark"
        className={classes.parallax}
      />
      <AppMain>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <div className={classes.profile}>
              {/**********************/}
              {/* セクションアバター画像 */}
              {/***********************/}
              <div>
                <img
                  // src={shukishoko}
                  src={
                    sectionData.sectionIconImageUrl
                      ? sectionData.sectionIconImageUrl
                      : getDefaultImg({
                          pageType: 'section',
                          imgType: 'avatar',
                          seed: sectionData.sectionId,
                        })
                  }
                  alt={bookName}
                  className={imageClasses}
                />
              </div>
              <div className={classes.name}>
                <h3 className={classes.title}>
                  {RSC.sectionEmoji}
                  {sectionData.title}
                </h3>
                <p>
                  {/* @{userData.userName}/{bookData.bookName}/
                  {sectionData.sectionId} */}
                  {RSC.dateEmoji}
                  {secToSlashDateTokyo(sectionData.date.seconds)}
                </p>
              </div>
            </div>
          </GridItem>
        </GridContainer>
        {/**********************/}
        {/* セクション情報表示    */}
        {/**********************/}
        {/* <div className={classNames(classes.description, classes.textCenter)}>
          <p>セクション公開設定：{sectionData.isPublic}</p>
          <p>セクションドキュメントID：{sectionData.sectionId}</p>
          <p>
            セクションが起きた日付：
            {secToSlashDateTimeTokyo(sectionData.date.seconds)}
          </p>
          <p>セクションのタイトル：{sectionData.title}</p>
          <p>セクションの内容：{sectionData.contents}</p>
          <p>喜怒哀楽：{sectionData.emo}</p>
          <p>引用した元セクション：{sectionData.quoteRef}</p>
          <p>引用された数：{sectionData.quotedCount}</p>
          <br />
          <p>
            作成日：
            {secToSlashDateTimeTokyo(sectionData.createdAt.seconds)}
          </p>
          <p>
            更新日：
            {secToSlashDateTimeTokyo(sectionData.updatedAt.seconds)}
          </p>
        </div> */}

        {/* 自分のページの場合のみ表示する */}
        {authUserData.uid === userData.uid && (
          <>
            <GridContainer justify="center">
              {/*****************/}
              {/* セクション編集  */}
              {/*****************/}
              <Button
                simple
                component={Link}
                href={`/users/${userName}/${bookName}/${sectionId}/section-edit`}
                color="primary"
                round
                style={{
                  textDecoration: 'none',
                  width: '12rem',
                }}
              >
                セクションを編集
              </Button>
            </GridContainer>
          </>
        )}

        <div className={classes.profileTabs}>
          <NavPills
            // 初期フォーカスはセクションとする
            active={2}
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
      </AppMain>
    </>
  );
};

export default SectionPageMain;
