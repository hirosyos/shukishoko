/* react */
import { useState, useEffect } from 'react';
import classNames from 'classnames';
/* next */
import Link from 'src/components/atoms/Link';

/* nextjs-materialui-kit*/
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import NavPills from 'components/NavPills/NavPills.js';
import Clearfix from 'components/Clearfix/Clearfix.js';
import Button from 'components/CustomButtons/Button.js';
import Parallax from 'components/Parallax/Parallax.js';
/* materialui */
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Add from '@material-ui/icons/Add';
import Camera from '@material-ui/icons/Camera';
import Palette from '@material-ui/icons/Palette';
import People from '@material-ui/icons/People';
import UpdateIcon from '@material-ui/icons/Update';
import Timeline from '@material-ui/icons/Timeline';
import NotesIcon from '@material-ui/icons/Notes';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SearchIcon from '@material-ui/icons/Search';
import Code from '@material-ui/icons/Code';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import Avatar from '@material-ui/core/Avatar';

import { BookList } from 'src/components/molecules/BookList';
import { SectionList } from 'src/components/molecules/SectionList';
import { AuthContext } from 'pages/_app';

/* MyApp */
import {
  getBookDataListFromUserData,
  getUserDataList,
  getBookDataList,
  getSectionDataList,
} from 'src/common/common';
import { RSC } from 'src/common/resource';
import { AppMain } from 'src/components/organisms/AppMain';
import { AppHead } from 'src/components/organisms/AppHead';

import { UserList } from 'src/components/molecules/UserList';

import profilePageStyle from 'assets/jss/nextjs-material-kit-pro/pages/profilePageStyle.js';
const useStyles = makeStyles(profilePageStyle);

/**
 * トップページメイン
 *
 * @param {*} { userDataList }
 * @return {*}
 */
const TopPageMain = (
  {
    // userDataList,
    // bookDataList,
    // sectionDataList,
    // futureDataList,
  },
) => {
  // console.log('TopPageMain');
  // console.log({ bookDataList });
  const [userDataListClientFetch, setUserDataListClientFetch] = useState([]);
  const [bookDataListClientFetch, setBookDataListClientFetch] = useState([]);
  const [sectionDataListClientFetch, setSectionDataListClientFetch] = useState(
    [],
  );

  // 子の情報取得
  useEffect(() => {
    async function fetchData() {
      // 全ユーザデータリストを取得
      const userDataListClientFetch = await getUserDataList();
      // 全ブックデータリストを取得
      const bookDataListClientFetch = await getBookDataList();
      // 全セクションデータリストを取得
      const sectionDataListClientFetch = await getSectionDataList();

      setUserDataListClientFetch(userDataListClientFetch);
      setBookDataListClientFetch(bookDataListClientFetch);
      setSectionDataListClientFetch(sectionDataListClientFetch);
      console.log('ここは何度も通らない');
    }
    fetchData();
  }, []);

  const classes = useStyles();

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid,
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  return (
    <>
      {/*******************/}
      {/* ヘッダ情報        */}
      {/*******************/}
      <AppHead
        pageTitle={`${RSC.appTitle}`}
        description={`${RSC.appTitle}は${RSC.topPageDescription_1}`}
        url={`${RSC.domain}/top`}
      />
      {/*******************/}
      {/* 背景画像         */}
      {/*******************/}
      <Parallax
        image="hana_01F.jpg"
        filter="dark"
        className={classes.parallax}
      />
      <AppMain>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <div className={classes.profile}>
              {/*****************/}
              {/* APPアイコン画像 */}
              {/*****************/}
              <div>
                <img
                  src="logo_shukishoko_square.svg"
                  alt="APP_ICON"
                  className={navImageClasses}
                />
              </div>
              <div className={classes.name}>
                {/* タイトル */}
                <h3 className={classes.title}>{RSC.appTitle}</h3>
                {/* コンセプト */}
                <h6>{RSC.appConcept}</h6>
              </div>
            </div>
            {/* <div className={classes.follow}>
              <Tooltip
                id="tooltip-top"
                title="検索"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <Button
                  // justIcon
                  round
                  color="primary"
                  className={classes.followButton}
                  startIcon={<SearchIcon />}
                  onClick={() => {
                    alert('clicked');
                  }}
                >
                  検索
                </Button>
              </Tooltip>
            </div> */}
          </GridItem>
        </GridContainer>
        {/*****************/}
        {/* APP 紹介文     */}
        {/*****************/}
        <div className={classNames(classes.description, classes.textCenter)}>
          {/* ディスクリプション */}
          <p>
            {RSC.topPageDescription_1}
            {RSC.topPageDescription_2}
          </p>
        </div>

        <div className={classes.profileTabs}>
          <NavPills
            // 初期フォーカスはユーザとする
            active={0}
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
                        ユーザ一覧
                      </h4>
                      <GridContainer justify="center">
                        {/* <UserList userDataList={userDataList} /> */}
                        <UserList userDataList={userDataListClientFetch} />
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
                        手記一覧
                      </h4>
                      <GridContainer justify="center">
                        {/* <BookList bookDataList={bookDataList} /> */}
                        <BookList bookDataList={bookDataListClientFetch} />
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
                        セクション一覧
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
                // タブ4
                tabButton: '未来',
                tabIcon: UpdateIcon,
                tabContent: (
                  <GridContainer justify="center">
                    <GridItem>
                      <h4 className={classes.title} align="center">
                        未来一覧
                      </h4>
                      <GridContainer justify="center"></GridContainer>
                    </GridItem>
                  </GridContainer>
                ),
              },
            ]}
          />
        </div>
        <Clearfix />

        {/* <Logout /> */}
      </AppMain>
    </>
  );
};

export default TopPageMain;
