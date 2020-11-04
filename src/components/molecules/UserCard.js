/* react */
import React, { useState, useEffect } from 'react';
/* clsx */
import clsx from 'clsx';
/* material-ui core */
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
/* material-ui icon */
import CardActionArea from '@material-ui/core/CardActionArea';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
/* nextjs-materialui-kit */
import { cardTitle } from 'assets/jss/nextjs-material-kit-pro.js';
import CardBody from 'components/Card/CardBody.js';
/* MyApp */
import { RSC } from 'src/common/resource';
import {
  getBookDataListFromUserData,
  getSectionDataListFromUserData,
  convertFromTimestampToDatetime,
  secToSlashDateTimeTokyo,
  secToSlashDateTokyo,
} from 'src/common/common';
import { getDefaultImg } from 'src/common/common';
import Link from 'src/components/atoms/Link';

const useStyles = makeStyles((style) => ({
  root: {
    marginBottom: '1rem',
    width: '40rem',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardTitle,
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: style.transitions.create('transform', {
      duration: style.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardContent: {
    marginLeft: '0.5rem',
  },
  // textfield: {
  //   whiteSpace: pre - wrap,
  // },
}));

/**
 * ユーザカード
 *
 * @param {*} { userName, userData }
 * @return {*}
 */
const UserCard = ({ userName, userData }) => {
  //スタイル設定
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [bookDataList, setBookDataList] = useState([]);
  const [sectionDataList, setSectionDataList] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // 子の情報取得
  useEffect(() => {
    async function fetchData() {
      // ユーザデータ配下のブックデータリストを取得
      const bookDataList = await getBookDataListFromUserData(userData);
      // ユーザデータ配下のセクションデータリストを取得
      const sectionDataList = await getSectionDataListFromUserData(userData);

      setBookDataList(bookDataList);
      setSectionDataList(sectionDataList);
      console.log('ここは何度も通らない');
    }
    fetchData();
  }, []);


  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardActionArea>
          <Link underline="none" href={`/users/${userName}`}>
            <CardMedia
              className={classes.media}
              image={
                userData.userCoverImageUrl
                  ? userData.userCoverImageUrl
                  : getDefaultImg({
                      pageType: 'user',
                      imgType: 'cover',
                      seed: userData.uid,
                    })
              }
              title="user"
            />
          </Link>
        </CardActionArea>
        <CardHeader
          avatar={
            <Avatar
              aria-label="user"
              className={classes.avatar}
              src={
                userData.userIconImageUrl
                  ? userData.userIconImageUrl
                  : getDefaultImg({
                      pageType: 'user',
                      imgType: 'avatar',
                      seed: userData.uid,
                    })
              }
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={`${RSC.userEmoji}${userData.userDisplayName}`}
          subheader={`@${userData.userName}`}
        />
        <Divider />
        {/* <CardBody> */}
        {/* <h4 className={classes.cardTitle}>
            {RSC.userEmoji}
            {userData.userDisplayName}
          </h4> */}
        <CardContent className={classes.cardContent}>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {RSC.contentsEmoji}
            {userData.userIntroduction}
          </Typography>
          <br />
          <Typography variant="body2" color="textSecondary" component="p">
            {RSC.bookEmoji}
            {bookDataList.length}冊
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {RSC.sectionEmoji}
            {sectionDataList.length}セクション
          </Typography>
        </CardContent>
        {/* </CardBody> */}

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Typography variant="body2" color="textSecondary" component="p">
            {RSC.createEmoji}
            {secToSlashDateTokyo(userData.createdAt.seconds)} <br />
            {RSC.updateEmoji}
            {secToSlashDateTokyo(userData.createdAt.seconds)}
          </Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider />
          <CardContent>
            <Typography paragraph>詳細:</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default UserCard;
