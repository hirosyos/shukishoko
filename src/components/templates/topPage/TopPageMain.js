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
import Code from '@material-ui/icons/Code';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import Avatar from '@material-ui/core/Avatar';

import { BookList } from 'src/components/molecules/BookList';
import { SectionList } from 'src/components/molecules/SectionList';
import { AuthContext } from 'pages/_app';

/* MyApp */
import { RSC } from 'src/common/resource';
import { AppMain } from 'src/components/organisms/AppMain';

import { UserList } from 'src/components/molecules/UserList';

import profilePageStyle from 'assets/jss/nextjs-material-kit-pro/pages/profilePageStyle.js';
const useStyles = makeStyles(profilePageStyle);

/**
 * トップページメイン
 *
 * @param {*} { userDataList }
 * @return {*}
 */
const TopPageMain = ({
  userDataList,
  bookDataList,
  sectionDataList,
  // futureDataList,
}) => {
  // console.log('TopPageMain');
  // console.log({ bookDataList });
  const classes = useStyles();

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid,
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  return (
    <>
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
                <h3 className={classes.title}>{RSC.appTitle}</h3>
                <h6>{RSC.appConcept}</h6>
              </div>
            </div>
          </GridItem>
        </GridContainer>
        {/*****************/}
        {/* APP 紹介文     */}
        {/*****************/}
        <div className={classNames(classes.description, classes.textCenter)}>
          <p>{RSC.appIntro}</p>
        </div>
        <div className={classes.profileTabs}>
          <NavPills
            // 初期フォーカスはユーザとする
            active="0"
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
                        <UserList userDataList={userDataList} />
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
                        <BookList bookDataList={bookDataList} />
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
                        <SectionList sectionDataList={sectionDataList} />
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
