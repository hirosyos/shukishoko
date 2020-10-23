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
import ListItemText from '@material-ui/core/ListItemText';
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
import HelpIcon from '@material-ui/icons/Help';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CodeIcon from '@material-ui/icons/Code';

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
            <ListItem
              button
              component={Link}
              href="/top"
              style={{ textDecoration: 'none' }}
            >
              <HomeIcon className={classes.dropdownIcons} />
              <ListItemText primary="トップ" />
            </ListItem>,
            <ListItem
              button
              component={Link}
              href="/search"
              style={{ textDecoration: 'none' }}
            >
              <SearchIcon className={classes.dropdownIcons} />
              <ListItemText primary="検索" />
            </ListItem>,
            <ListItem
              button
              component={Link}
              href="/landing-page"
              style={{ textDecoration: 'none' }}
            >
              <HelpIcon className={classes.dropdownIcons} />
              <ListItemText primary="マニュアル" />
            </ListItem>,
            <ListItem
              button
              component={Link}
              href="/pricing"
              style={{ textDecoration: 'none' }}
            >
              <MonetizationOnIcon className={classes.dropdownIcons} />
              <ListItemText primary="料金" />
            </ListItem>,
            <ListItem
              button
              component={Link}
              href="/about-us"
              style={{ textDecoration: 'none' }}
            >
              <CodeIcon className={classes.dropdownIcons} />
              <ListItemText primary="開発者について" />
            </ListItem>,
          ]}
        />
      </ListItem>

      <ListItem className={classes.listItem}>
        {user && (
          <CustomDropdown
            noLiPadding
            navDropdown
            hoverColor={dropdownHoverColor}
            buttonText={`ユーザ（${userData.userDisplayName}）`}
            buttonProps={{
              className: classes.navLink,
              color: 'transparent',
            }}
            buttonIcon={AccountCircle}
            dropdownList={[
              <ListItem
                button
                component={Link}
                href={`/users/${userData.userName}`}
                style={{ textDecoration: 'none' }}
              >
                <AccountCircle className={classes.dropdownIcons} />
                <ListItemText primary="マイページ" />
              </ListItem>,
              <ListItem
                button
                component={Link}
                href="/user-setting"
                style={{ textDecoration: 'none' }}
              >
                <SettingsIcon className={classes.dropdownIcons} />
                <ListItemText primary="ユーザ設定" />
              </ListItem>,
              <ListItem
                button
                component={Link}
                href="/book-create"
                style={{ textDecoration: 'none' }}
              >
                <LibraryBooks className={classes.dropdownIcons} />
                <ListItemText primary="手記作成" />
              </ListItem>,
              <ListItem
                button
                component={Link}
                href="/book-setting"
                style={{ textDecoration: 'none' }}
              >
                <SettingsIcon className={classes.dropdownIcons} />
                <ListItemText primary="手記設定" />
              </ListItem>,
              <ListItem
                button
                component={Link}
                href="/section-create"
                style={{ textDecoration: 'none' }}
              >
                <NotesIcon className={classes.dropdownIcons} />
                <ListItemText primary="セクション作成" />
              </ListItem>,
              <ListItem
                button
                component={Link}
                href="/section-setting"
                style={{ textDecoration: 'none' }}
              >
                <SettingsIcon className={classes.dropdownIcons} />
                <ListItemText primary="セクション設定" />
              </ListItem>,
              <ListItem
                button
                component={Link}
                href="/logout"
                style={{ textDecoration: 'none' }}
              >
                <ExitToAppIcon className={classes.dropdownIcons} />
                <ListItemText primary="ログアウト" />
              </ListItem>,
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
              <ListItem
                button
                component={Link}
                href="/login"
                style={{ textDecoration: 'none' }}
              >
                <LockOpenIcon className={classes.dropdownIcons} />
                <ListItemText primary="ログイン" />
              </ListItem>,
              <ListItem
                button
                component={Link}
                href="/signup"
                style={{ textDecoration: 'none' }}
              >
                <LockOpenIcon className={classes.dropdownIcons} />
                <ListItemText primary="サインアップ" />
              </ListItem>,
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
