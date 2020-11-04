/* react */
import React, { useState, useEffect } from 'react';
/* clsx */
import clsx from 'clsx';
/* material-ui */
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
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
import CardFooter from 'components/Card/CardFooter.js';
/* MyApp */
import { RSC } from 'src/common/resource';
import {
  getDefaultImg,
  getUserDataFromUserName,
  getBookDataFromBookName,
  secToSlashDateTimeTokyo,
  secToSlashDateTokyo,
  convertFromTimestampToDatetime,
} from 'src/common/common';
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
    marginLeft: 'auto',
    transition: style.transitions.create('transform', {
      duration: style.transitions.duration.shortest,
    }),
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardContent:{
    marginLeft:'0.5rem'
  },
}));

/**
 * セクションカード
 *
 * @param {*} { userName, bookName, sectionId, sectionData }
 * @return {*}
 */
export const SectionCard = ({ userName, bookName, sectionId, sectionData }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [userData, setUserData] = useState({});
  const [bookData, setBookData] = useState({});

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // 親のbookとuser情報取得
  useEffect(() => {
    async function fetchData() {
      const { userData } = await getUserDataFromUserName(userName);
      setUserData(userData);
      const { bookData } = await getBookDataFromBookName(userName, bookName);
      setBookData(bookData);
      console.log('ここは何度も通らない');
    }
    fetchData();
  }, []);

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea>
        <Link
          underline="none"
          href={`/users/${userName}/${bookName}/${sectionId}`}
        >
          <CardMedia
            className={classes.media}
            image={
              sectionData.sectionCoverImageUrl
                ? sectionData.sectionCoverImageUrl
                : getDefaultImg({
                    pageType: 'section',
                    imgType: 'cover',
                    seed: sectionData.sectionId,
                  })
            }
            title="section"
          />
        </Link>
      </CardActionArea>
      <CardHeader
        avatar={
          <AvatarGroup max={4}>
            {/* <Avatar
              aria-label="🙆"
              src={
                userData.userIconImageUrl
                  ? userData.userIconImageUrl
                  : getDefaultImg({
                      pageType: 'user',
                      imgType: 'avatar',
                      seed: userData.uid,
                    })
              }
              className={classes.avatar}
            ></Avatar>
            <Avatar
              aria-label="📖"
              src={
                bookData.bookIconImageUrl
                  ? bookData.bookIconImageUrl
                  : getDefaultImg({
                      pageType: 'book',
                      imgType: 'avatar',
                      seed: bookData.bookId,
                    })
              }
              className={classes.avatar}
            ></Avatar> */}
            <Avatar
              aria-label=""
              src={
                sectionData.sectionIconImageUrl
                  ? sectionData.sectionIconImageUrl
                  : getDefaultImg({
                      pageType: 'section',
                      imgType: 'avatar',
                      seed: sectionData.sectionId,
                    })
              }
              className={classes.avatar}
            >
              {sectionData.sectionIconEmoji}
            </Avatar>
          </AvatarGroup>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${RSC.sectionEmoji}${sectionData.title}`}
        subheader={`${secToSlashDateTokyo(sectionData.date.seconds)} の思い出`}
      />
      <Divider />
      {/* <CardBody> */}
      {/* <h4 className={classes.cardTitle}>📖{sectionData.title}</h4> */}
      <CardContent className={classes.cardContent}>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {RSC.contentsEmoji}
          {sectionData.contents}
        </Typography>
        <br />
        <Typography variant="body2" color="textSecondary" component="p">
          喜怒哀楽：{sectionData.emo}
        </Typography>
        <br />
        <Link
          href={`/users/${userData.userName}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <Typography variant="body2" color="textSecondary" component="p">
            {RSC.bookEmoji}
            {bookData.bookDisplayName}
          </Typography>
        </Link>
        <br />
        <Link
          href={`/users/${userData.userName}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <Typography variant="body2" color="textSecondary" component="p">
            {RSC.userEmoji}
            {userData.userDisplayName} の書庫
          </Typography>
        </Link>
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
          {secToSlashDateTokyo(sectionData.createdAt.seconds)} <br />
          {RSC.updateEmoji}
          {secToSlashDateTokyo(sectionData.createdAt.seconds)}
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
        <CardContent>
          <Typography paragraph>詳細:</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
