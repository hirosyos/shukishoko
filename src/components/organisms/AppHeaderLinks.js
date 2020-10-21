/* eslint-disable */
import React, { useContext } from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// react components for routing our app without refresh
import Link from 'src/components/atoms/Link';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';

// @material-ui/icons
import Apps from '@material-ui/icons/Apps';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import ViewDay from '@material-ui/icons/ViewDay';
import Dns from '@material-ui/icons/Dns';
import Build from '@material-ui/icons/Build';
import ListIcon from '@material-ui/icons/List';
import People from '@material-ui/icons/People';
import Assignment from '@material-ui/icons/Assignment';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import Chat from '@material-ui/icons/Chat';
import Call from '@material-ui/icons/Call';
import ViewCarousel from '@material-ui/icons/ViewCarousel';
import NotesIcon from '@material-ui/icons/Notes';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';

import AccountBalance from '@material-ui/icons/AccountBalance';
import ArtTrack from '@material-ui/icons/ArtTrack';
import ViewQuilt from '@material-ui/icons/ViewQuilt';
import LocationOn from '@material-ui/icons/LocationOn';
import Fingerprint from '@material-ui/icons/Fingerprint';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import AttachMoney from '@material-ui/icons/AttachMoney';
import Store from '@material-ui/icons/Store';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Layers from '@material-ui/icons/Layers';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import LineStyle from '@material-ui/icons/LineStyle';
import Error from '@material-ui/icons/Error';

// core components
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import Button from 'components/CustomButtons/Button.js';

import styles from 'assets/jss/nextjs-material-kit-pro/components/headerLinksStyle.js';

import { AuthContext } from 'pages/_app';

const useStyles = makeStyles(styles);
/**
 * App専用ヘッダーリンク
 *
 * @export
 * @param {*} props
 * @return {*}
 */
export default function AppHeaderLinks(props) {
  //認証情報取得
  const { user, userData } = useContext(AuthContext);

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    if (window.location.pathname === '/sections') {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i,
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };
  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function () {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };
  var onClickSections = {};

  const { dropdownHoverColor } = props;
  const classes = useStyles();
  return (
    <List className={classes.list + ' ' + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="移動"
          buttonProps={{
            className: classes.navLink,
            color: 'transparent',
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link href="/top">
              <a className={classes.dropdownLink}>
                <HomeIcon className={classes.dropdownIcons} />
                トップ
              </a>
            </Link>,
            <Link href="/serach">
              <a className={classes.dropdownLink}>
                <SearchIcon className={classes.dropdownIcons} />
                検索
              </a>
            </Link>,
            <Link href="/landing-page">
              <a className={classes.dropdownLink}>
                <SearchIcon className={classes.dropdownIcons} />
                マニュアル
              </a>
            </Link>,
            <Link href="/pricing">
              <a className={classes.dropdownLink}>
                <SearchIcon className={classes.dropdownIcons} />
                料金
              </a>
            </Link>,
            <Link href="/about-us">
              <a className={classes.dropdownLink}>
                <SearchIcon className={classes.dropdownIcons} />
                開発者について
              </a>
            </Link>,
          ]}
        />
      </ListItem>

      <ListItem className={classes.listItem}>
        {user && (
          <CustomDropdown
            noLiPadding
            navDropdown
            hoverColor={dropdownHoverColor}
            buttonText="ユーザー"
            buttonProps={{
              className: classes.navLink,
              color: 'transparent',
            }}
            buttonIcon={AccountCircle}
            dropdownList={[
              <Link href={`/users/${userData.userName}`}>
                <a className={classes.dropdownLink}>
                  <AccountCircle className={classes.dropdownIcons} />
                  マイページ（{userData.userDisplayName}）
                </a>
              </Link>,
              <Link href={`/user-setting`}>
                <a className={classes.dropdownLink}>
                  <SettingsIcon className={classes.dropdownIcons} />
                  ユーザ設定
                </a>{' '}
              </Link>,
              <Link href={`/book-create`}>
                <a className={classes.dropdownLink}>
                  <LibraryBooks className={classes.dropdownIcons} />
                  手記作成
                </a>
              </Link>,
              <Link href={`/book-setting`}>
                <a className={classes.dropdownLink}>
                  <SettingsIcon className={classes.dropdownIcons} />
                  手記設定
                </a>
              </Link>,
              <Link href={`/section-create`}>
                <a className={classes.dropdownLink}>
                  <NotesIcon className={classes.dropdownIcons} />
                  セクション作成
                </a>
              </Link>,
              <Link href={`/section-setting`}>
                <a className={classes.dropdownLink}>
                  <SettingsIcon className={classes.dropdownIcons} />
                  セクション設定
                </a>
              </Link>,
              <Link href="/logout">
                <a className={classes.dropdownLink}>
                  <ExitToAppIcon className={classes.dropdownIcons} /> ログアウト
                </a>
              </Link>,
            ]}
          />
        )}
        {!user && (
          <CustomDropdown
            noLiPadding
            navDropdown
            hoverColor={dropdownHoverColor}
            buttonText="ゲスト"
            buttonProps={{
              className: classes.navLink,
              color: 'transparent',
            }}
            buttonIcon={ViewCarousel}
            dropdownList={[
              <Link href="/login">
                <a className={classes.dropdownLink}>
                  <LockOpenIcon className={classes.dropdownIcons} /> ログイン
                </a>
              </Link>,
              <Link href="/auth/signup">
                <a className={classes.dropdownLink}>
                  <PersonAdd className={classes.dropdownIcons} /> サインアップ
                </a>
              </Link>,
            ]}
          />
        )}
      </ListItem>
    </List>
  );
}

AppHeaderLinks.defaultProps = {
  hoverColor: 'primary',
};

AppHeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    'dark',
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'rose',
  ]),
};
