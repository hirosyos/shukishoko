import { useState } from 'react';
import firebase from 'src/common/firebase';
import { VALIDUSERS, VALIDBOOKS, VALIDSECTIONS } from 'src/common/common';

/**
 * セクション作成フォーム
 *
 * @param {object} userData
 * @param {object} bookData
 * @param {string} bookId
 * @return {JSX}
 */
const SectionCreateInputForm = ({ userData, bookData, bookId }) => {
  //
  // デバッグ情報
  //
  // console.log('\nファイル Section.js');
  // console.log('関数 SectionCreateInputForm');
  // console.log({ userData, bookData, bookId });

  const [isPublic, setIsPublic] = useState('');
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [tag, setTag] = useState('');
  const [url, setUrl] = useState('');
  const [emo, setEmo] = useState('');

  // Firestoreにデータを送信する関数
  const postDataToFirestore = async (
    userCollectionName,
    userId,
    bookCollectionName,
    bookId,
    sectionCollectionName,
    sectionId,
    postData,
  ) => {
    const addedData = await firebase
      .firestore()
      .collection(userCollectionName)
      .doc(userId)
      .collection(bookCollectionName)
      .doc(bookId)
      .collection(sectionCollectionName)
      .doc(sectionId)
      .set(postData);
    return addedData;
  };

  // submitボタンクリック時の処理
  const submitData = async () => {
    if (
      isPublic === '' ||
      date === '' ||
      title === '' ||
      contents === '' ||
      tag === '' ||
      url === '' ||
      emo === ''
    ) {
      alert('いまのところ全部埋めてください');
      return false;
    }

    // sectionIdを事前に取得
    const sectionId = firebase
      .firestore()
      .collection(VALIDUSERS)
      .doc(userData.uid)
      .collection(VALIDBOOKS)
      .doc(bookId)
      .collection(VALIDSECTIONS)
      .doc().id;

    const postData = {
      isPublic,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: userData.uid,
      userDocRef: `/${VALIDUSERS}/${userData.uid}`,
      bookId,
      bookDocRef: `/${VALIDUSERS}/${userData.uid}/${VALIDBOOKS}/${bookId}`,
      sectionId,
      sectionDocRef: `/${VALIDUSERS}/${userData.uid}/${VALIDBOOKS}/${bookId}/${VALIDSECTIONS}/${sectionId}/`,
      date: new Date(date),
      title,
      contents,
      tag,
      url,
      emo,
      quoteRef: '',
      quotedRef: '',
      quotedCount: '',
    };
    const addedData = await postDataToFirestore(
      VALIDUSERS,
      userData.uid,
      VALIDBOOKS,
      bookId,
      VALIDSECTIONS,
      sectionId,
      postData,
    );

    setIsPublic('');
    setDate('');
    setTitle('');
    setContents('');
    setTag('');
    setUrl('');
    setEmo('');

    // getTodosFromFirestore();
  };

  //
  // デバッグ情報
  //
  console.log('正常終了 SectionCreateInputForm\n');

  return (
    <form action="">
      <ul>
        <li>
          <label htmlFor="isPublic">セクション公開設定(true/false)：</label>
          <input
            type="text"
            id="isPublic"
            value={isPublic}
            onChange={(e) => setIsPublic(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="date">発生日：</label>
          <input
            type="datetime-local"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="title">タイトル：</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="contents">内容：</label>
          <textarea
            type="text"
            id="contents"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="tag">タグ：</label>
          <input
            type="text"
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="url">URL：</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="emo">喜怒哀楽：</label>
          <input
            type="text"
            id="emo"
            value={emo}
            onChange={(e) => setEmo(e.target.value)}
          />
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

export default SectionCreateInputForm;
