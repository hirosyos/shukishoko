/* react */
import { useState, useEffect } from 'react';
import classNames from 'classnames';
/* next */
import Link from 'src/components/atoms/Link';

/* nextjs-materialui-kit*/
import Accordion from 'components/Accordion/Accordion.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import NavPills from 'components/NavPills/NavPills.js';
import Clearfix from 'components/Clearfix/Clearfix.js';
import Button from 'components/CustomButtons/Button.js';
import Parallax from 'components/Parallax/Parallax.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';
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
  searchUserData,
} from 'src/common/common';
import { RSC } from 'src/common/resource';
import { AppMain } from 'src/components/organisms/AppMain';
import { AppHead } from 'src/components/organisms/AppHead';

import { UserList } from 'src/components/molecules/UserList';
import SearchForm from 'src/components/molecules/SearchForm';

import profilePageStyle from 'assets/jss/nextjs-material-kit-pro/pages/profilePageStyle.js';
const useStyles = makeStyles(profilePageStyle);



const PROJECT_ID = 'dinamicroute'; // Required - your Firebase project ID
const ALGOLIA_APP_ID = 'X59O5GSWAS'; // Required - your Algolia app ID
const ALGOLIA_SEARCH_KEY = '14c8d4aab25bed6ff71713cf13ed7f15'; // Optional - Only used for unauthenticated search

// const algoliasearch = require('algoliasearch');
import algoliasearch from 'algoliasearch';



// function unauthenticated_search(query) {
//   // [START search_index_unsecure]
//   var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
//   var index = client.initIndex('notes');

//   // Perform an Algolia search:
//   // https://www.algolia.com/doc/api-reference/api-methods/search/
//   index
//     .search({
//       query,
//     })
//     .then(function (responses) {
//       // Response from Algolia:
//       // https://www.algolia.com/doc/api-reference/api-methods/search/#response-format
//       console.log(responses.hits);
//     });
//   // [END search_index_unsecure]
// }

/**
 * トップページメイン
 *
 * @param {*} { userDataList }
 * @return {*}
 */
const SearchPageMain = (
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

  const [searchWordAll, setSearchWordAll] = useState('');

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

  // 検索ボタンが押されたときの処理
  const searchButtonOnClick = async (e) => {
    e.preventDefault();

    console.log('検索Try');

    const userDataListSearchResult = await searchUserData(searchWordAll);
    setUserDataListClientFetch(userDataListSearchResult);
  };

  const onSearch = async (e) => {
    console.log(e.target.value);
    // const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
    const index = client.initIndex('shukishoko');
    // const index = client.initIndex('demo_ecommerce');
    let tempResults = [];
    await index
      // .search({
      //   query: e.target.value,
      //   // query: 'Boost'
      // })
      .search(
        e.target.value,
        // query: 'Boost'
      )
      .then(function (responses) {
        console.log(responses.hits);
        tempResults = responses.hits;
      });
    console.log({tempResults});
    // this.setState({ searchResultPosts: tempResults });
  };

  return (
    <>
      {/*******************/}
      {/* ヘッダ情報        */}
      {/*******************/}
      <AppHead
        pageTitle={`${RSC.appTitle}`}
        description={`${RSC.appTitle}は${RSC.topPageDescription_1}`}
        url={`${RSC.domain}/search`}
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
            {/*****************/}
            {/* APP 紹介文     */}
            {/*****************/}
            <div
              className={classNames(classes.description, classes.textCenter)}
            >
              {/* ディスクリプション */}
              <p>
                {RSC.topPageDescription_1}
                {RSC.topPageDescription_2}
              </p>
            </div>
            {/*****************/}
            {/* 検索フォーム    */}
            {/*****************/}
            <SearchForm
              onSearch={onSearch}
              // searchResultPosts={this.state.searchResultPosts}
            />
            <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
              <CustomInput
                labelText="検索ワード"
                id="searchWordAll"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: 'text',
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon className={classes.inputAdornmentIcon} />
                    </InputAdornment>
                  ),
                  autoComplete: 'off',
                  value: searchWordAll,
                  onChange: (e) => setSearchWordAll(e.target.value),
                }}
              />
            </form>
            <Accordion
              // active={0}
              collapses={[
                {
                  title: '絞り込み検索',
                  content: 'ユーザ情報を絞り込みます',
                },
              ]}
            />
            <Button
              // justIcon
              round
              color="primary"
              // className={classes.followButton}
              startIcon={<SearchIcon />}
              // onClick={() => {
              //   alert(`検索ワード${searchWordAll}`);
              //   // searchButtonOnClick();
              // }}
              onClick={searchButtonOnClick}
            >
              検索
            </Button>
          </GridItem>
        </GridContainer>

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

export default SearchPageMain;
