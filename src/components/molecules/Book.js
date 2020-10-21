import { useState } from 'react';
import firebase from 'src/common/firebase';
import { VALIDUSERS, VALIDBOOKS } from 'src/common/common';

/**
 * 手記作成用フォーム
 *
 * @param {*} props
 * @return {*}
 */
export const BookCreateInputForm = ({ userData }) => {
  //
  // デバッグ情報
  //
  // console.log('\nファイル Book.js');
  // console.log('関数 BookCreateInputForm');
  // console.log({ userData });

  const [isPublic, setIsPublic] = useState('');
  const [bookName, setBookName] = useState('');
  const [bookDisplayName, setBookDisplayName] = useState('');
  const [authorDisplayName, setAuthorDisplayName] = useState('');
  const [authorBirthday, setAuthorBirthday] = useState('');
  const [chapterName, setChapterName] = useState('');
  const [chapterStartDate, setChapterStartDate] = useState('');

  // Firestoreにデータを送信する関数
  const postDataToFirestore = async (
    userCollectionName,
    userId,
    bookCollectionName,
    bookId,
    postData,
  ) => {
    const addedData = await firebase
      .firestore()
      .collection(userCollectionName)
      .doc(userId)
      .collection(bookCollectionName)
      .doc(bookId)
      .set(postData);
    return addedData;
  };

  // submitボタンクリック時の処理
  const submitData = async () => {
    if (
      isPublic === '' ||
      bookName === '' ||
      bookDisplayName === '' ||
      authorDisplayName === '' ||
      authorBirthday === '' ||
      chapterName === '' ||
      chapterStartDate === ''
    ) {
      console.log('いまのところ全部埋めてください');
      return false;
    }
    // bookIdを事前に取得
    const bookId = firebase
      .firestore()
      .collection(VALIDUSERS)
      .doc(userData.uid)
      .collection(VALIDBOOKS)
      .doc().id;

    const postData = {
      isPublic,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),

      uid: userData.uid,
      userName: userData.userName,
      userDocRef: `/${VALIDUSERS}/${userData.uid}`,
      bookId,
      bookDocRef: `/${VALIDUSERS}/${userData.uid}/${VALIDBOOKS}/${bookId}`,

      bookName,
      bookDisplayName,

      authorDisplayName,
      authorBirthday: new Date(authorBirthday),
      authorNowAge: '',

      bookIconImageUrl: '',
      bookCoverImageUrl: '',
      bookIntroduction: '',
      bookFavoritedCount: '',
      chapterName,
      chapterStartDate: new Date(chapterStartDate),
    };
    await postDataToFirestore(
      VALIDUSERS,
      userData.uid,
      VALIDBOOKS,
      bookId,
      postData,
    );

    setIsPublic('');
    setBookName('');
    setBookDisplayName('');
    setAuthorDisplayName('');
    setAuthorBirthday('');
    setChapterName('');
    setChapterStartDate('');

    // getTodosFromFirestore();
  };

  //
  // デバッグ情報
  //
  console.log('正常終了 BookCreateInputForm\n');

  return (
    <form action="">
      <ul>
        <li>
          <label htmlFor="isPublic">
            手記公開設定(true/false)：
            <input
              type="text"
              id="isPublic"
              value={isPublic}
              onChange={(e) => setIsPublic(e.target.value)}
            />
          </label>
        </li>
        <li>
          <label htmlFor="bookName">
            手記管理名(アルファベット)：
            <input
              type="text"
              id="bookName"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
          </label>
        </li>
        <li>
          <label htmlFor="bookDisplayName">
            手記表示名：
            <input
              type="text"
              id="bookDisplayName"
              value={bookDisplayName}
              onChange={(e) => setBookDisplayName(e.target.value)}
            />
          </label>
        </li>
        <li>
          <label htmlFor="authorDisplayName">
            著者表示名：
            <input
              type="text"
              id="authorDisplayName"
              value={authorDisplayName}
              onChange={(e) => setAuthorDisplayName(e.target.value)}
            />
          </label>
        </li>
        <li>
          <label htmlFor="authorBirthday">
            著者誕生日：
            <input
              type="datetime-local"
              id="authorBirthday"
              value={authorBirthday}
              onChange={(e) => setAuthorBirthday(e.target.value)}
            />
          </label>
        </li>
        <li>
          <label htmlFor="chapterName">
            時代名：
            <input
              type="text"
              id="chapterName"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
            />
          </label>
        </li>
        <li>
          <label htmlFor="chapterStartDate">
            時代開始日：
            <input
              type="datetime-local"
              id="chapterStartDate"
              value={chapterStartDate}
              onChange={(e) => setChapterStartDate(e.target.value)}
            />
          </label>
        </li>

        <li>
          <button type="button" onClick={submitData}>
            submit
          </button>
        </li>
      </ul>
    </form>
  );
};
