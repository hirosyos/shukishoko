/* react */
import React, { useContext } from 'react';
/* nodejs library to set properties for components */
import PropTypes from 'prop-types';
/* @material-ui/core components */
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
/* @material-ui/icons */
import AccountCircle from '@material-ui/icons/AccountCircle';
import Apps from '@material-ui/icons/Apps';
import CodeIcon from '@material-ui/icons/Code';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SearchIcon from '@material-ui/icons/Search';
import ViewCarousel from '@material-ui/icons/ViewCarousel';
/* nectjs materialui kit core components */
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import styles from 'assets/jss/nextjs-material-kit-pro/components/headerLinksStyle.js';
/* MyApp */
import Link from 'src/components/atoms/Link';
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
            buttonText={
              userData.userDisplayName
                ? `${userData.userDisplayName}`
                : `登録済ユーザ`
            }
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
            buttonText="ゲストユーザ"
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
                <ListItemText primary="ユーザ登録" />
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
