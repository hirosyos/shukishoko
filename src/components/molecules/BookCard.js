/* react */
import React, { useState, useEffect } from 'react';
/* clsx */
import clsx from 'clsx';
/* material-ui core */
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
/* MyApp */
import { getDefaultImg } from 'src/common/common';
import { convertFromTimestampToDatetime } from 'src/common/common';
import { getUserDataFromUserName } from 'src/common/common';
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
}));

/**
 * ブックカード
 *
 * @param {*} { userName, bookName, bookData }
 * @return {*}
 */
const BookCard = ({ userName, bookName, bookData }) => {
  //スタイル設定
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [userData, setUserData] = useState({});

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // 親のuser情報取得
  useEffect(() => {
    async function fetchData() {
      const { userData } = await getUserDataFromUserName(userName);
      setUserData(userData);
      console.log('ここは何度も通らない');
    }
    fetchData();
  }, []);

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardActionArea>
          <Link underline="none" href={`/users/${userName}/${bookName}`}>
            <CardMedia
              className={classes.media}
              image={
                bookData.bookCoverImageUrl
                  ? bookName.bookCoverImageUrl
                  : getDefaultImg({
                      pageType: 'book',
                      imgType: 'cover',
                      seed: bookData.bookId,
                    })
              }
              title="book"
            />
          </Link>
        </CardActionArea>
        <CardHeader
          avatar={
            <AvatarGroup max={4}>
              <Avatar
                aria-label="user"
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
                aria-label="book"
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
              ></Avatar>
            </AvatarGroup>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={`手記 『${bookData.bookDisplayName}』 by ${userData.userDisplayName}@${userData.userName}`}
          subheader={`更新日 ${convertFromTimestampToDatetime(
            bookData.updatedAt.seconds,
          )}`}
        />
        <Divider />
        <CardBody>
          <h4 className={classes.cardTitle}>
            手記 『{bookData.bookDisplayName}』 by
            {userData.userDisplayName}@${userData.userName}
          </h4>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              主人公：
              <br />
              {bookData.authorDisplayName}
              <br />
              <br />
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              主人公誕生日：
              <br />
              {convertFromTimestampToDatetime(bookData.authorBirthday.seconds)}
              <br />
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              <br />
              about：
              <br />
              {bookData.bookIntroduction}
              <br />
            </Typography>
          </CardContent>
        </CardBody>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
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

export default BookCard;
