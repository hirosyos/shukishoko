/* date-fns-timezone */
import { formatToTimeZone } from 'date-fns-timezone';
/* MyApp */
import firebase from 'src/common/firebase';

/* firebaseアクセス定数 */
export const VALIDUSERS = 'validUsers';
export const INVALIDUSERS = 'invalidUsers';
export const VALIDBOOKS = 'validBooks';
export const INVALIDBOOKS = 'invalidBooks';
export const VALIDSECTIONS = 'varidSections';
export const INVALIDSECTIONS = 'invaridSections';

/**
 * 全ユーザネームパス取得(getStaticPaths専用)
 *
 * @export
 * @return {getStaticPaths専用のオブジェクト配列}
 */
export const getAllUserNamesPaths = async () => {
  // 有効ユーザコレクションを取り出し
  const querySnapshot = await firebase.firestore().collection(VALIDUSERS).get();

  if (querySnapshot.size === 0) {
    // ユーザが一人もいないタイミング

    const paths = [];
    return paths;
  }

  // 有効ユーザコレクションのすべてのユーザドキュメントからユーザネーム取り出し
  return querySnapshot.docs.map((userDocSnapshot) => {
    return {
      params: {
        userName: userDocSnapshot.data().userName,
      },
    };
  });
};

/**
 * 全ブックネームパス取得(getStaticPaths専用)
 *
 * @export
 * @return {getStaticPaths専用のオブジェクト配列}
 */
export const getAllBookNamePaths = async () => {
  // 有効ブックコレクションに対してコレクショングループで一括取得
  const querySnapshot = await firebase
    .firestore()
    .collectionGroup(VALIDBOOKS)
    .get();

  if (querySnapshot.size === 0) {
    // サービス開始時などブックが一つもないタイミング

    const paths = [];
    return paths;
  }

  // 有効ブックコレクションの親ユーザドキュメントからユーザネーム取り出し
  const paths = await Promise.all(
    querySnapshot.docs.map(async (bookDocSnapshot) => {
      const userDocSnapshot = await bookDocSnapshot.ref.parent.parent.get();

      return {
        params: {
          userName: userDocSnapshot.data().userName,
          bookName: bookDocSnapshot.data().bookName,
        },
      };
    }),
  );

  return paths;
};

/**
 * 全セクションIDパス取得(getStaticPaths専用)
 *
 * @export
 * @return {getStaticPaths専用のオブジェクト配列}
 */
export const getAllSectionIdPaths = async () => {
  // 有効セクションコレクションに対してコレクショングループで一括取得
  const querySnapshot = await firebase
    .firestore()
    .collectionGroup(VALIDSECTIONS)
    .get();

  if (querySnapshot.size === 0) {
    // サービス開始時などセクションが一つもないタイミング

    const paths = [];
    return paths;
  }

  // 有効セクションコレクションの親ブックドキュメントからブックネーム取り出し
  // 親ブックドキュメントの親ユーザ毒面とからユーザネーム取り出し
  const paths = await Promise.all(
    querySnapshot.docs.map(async (sectionDocSnapshot) => {
      const userDocSnapshot = await sectionDocSnapshot.ref.parent.parent.parent.parent.get();
      const bookDocSnapshot = await sectionDocSnapshot.ref.parent.parent.get();
      return {
        params: {
          userName: userDocSnapshot.data().userName,
          bookName: bookDocSnapshot.data().bookName,
          sectionId: sectionDocSnapshot.data().sectionId,
        },
      };
    }),
  );

  return paths;
};

/**
 * ユーザドキュメント情報取得
 *
 * @export
 * @param {*} userName
 * @return {*}
 */
export async function getUserDataFromUserName(userName) {
  // 有効ユーザコレクションのユーザドキュメントからユーザネームが一致するものを取得
  const querySnapshot = await firebase
    .firestore()
    .collection(VALIDUSERS)
    .where('userName', '==', userName)
    .limit(1)
    .get();

  // 該当ユーザ名のデータが存在しない場合はデータ部をNullで返す
  if (querySnapshot.size === 0) {
    console.log(
      `異常終了 getUserDataFromUserName ${userName}のドキュメントは存在しません\n`,
    );
    return {
      userData: null,
    };
  }

  return {
    userData: querySnapshot.docs[0].data(),
  };
}

/**
 * ブックドキュメント情報取得
 *
 * @export
 * @param {*} userName
 * @param {*} bookName
 * @return {*}
 */
export async function getBookDataFromBookName(userName, bookName) {
  // ユーザデータ取得
  const { userData } = await getUserDataFromUserName(userName);
  // 該当ユーザ名のデータが存在しない場合はデータ部をNullで返す
  if (!userData) {
    console.log(
      '異常終了 getBookDataFromBookName 該当ユーザ名のデータが存在しない\n',
    );
    return {
      userName,
      bookName,
      bookData: null,
      bookId: null,
    };
  }

  // 有効ブックコレクションのブックドキュメントからブックネームが一致するものを取得
  const querySnapshot = await firebase
    .firestore()
    .collection(VALIDUSERS)
    .doc(userData.uid)
    .collection(VALIDBOOKS)
    .where('bookName', '==', bookName)
    .limit(1)
    .get();

  // 該当ユーザ名のデータが存在しない場合はデータ部をNullで返す
  if (querySnapshot.size === 0) {
    console.log(
      '異常終了 getBookDataFromBookName 該当ブック名のデータが存在しない\n',
    );
    return {
      userName,
      bookName,
      bookData: null,
      bookId: null,
    };
  }

  return {
    userName,
    bookName,
    bookData: querySnapshot.docs[0].data(),
    bookId: querySnapshot.docs[0].data().bookId,
  };
}

/**
 * セクションドキュメント情報取得関数
 *
 * @export
 * @param {*} userName
 * @param {*} bookName
 * @param {*} sectionId
 * @return {*}
 */
export const getSectionDataFromSectionId = async (
  userName,
  bookName,
  sectionId,
) => {
  // ブックデータ取得
  const { bookData } = await getBookDataFromBookName(userName, bookName);
  // console.log({ bookData });
  // ブックデータが存在しない場合はデータ部をNullで返す
  if (!bookData) {
    console.log(
      '異常終了 getSectionDataFromSectionId 該当ブック名のデータが存在しない\n',
    );
    return {
      userName,
      bookName,
      sectionId,
      sectionData: null,
    };
  }

  // 有効ユーザコレクションのユーザドキュメントからユーザネームが一致するものを取得
  const querySnapshot = await firebase
    .firestore()
    .collection(VALIDUSERS)
    .doc(bookData.uid)
    .collection(VALIDBOOKS)
    .doc(bookData.bookId)
    .collection(VALIDSECTIONS)
    .doc(sectionId)
    .get();

  if (!querySnapshot.exists) {
    console.log(
      '異常終了 getSectionDataFromSectionId セクションドキュメントスナップショットが取れなかった\n',
    );
    return {
      userName,
      bookName,
      sectionId,
      sectionData: null,
    };
  }

  return {
    userName,
    bookName,
    sectionId,
    sectionData: querySnapshot.data(),
  };
};

/**
 * 有効ユーザデータリストを取得
 *
 */
export const getUserDataList = async () => {
  const querySnapshot = await firebase
    .firestore()
    .collection(VALIDUSERS)
    .orderBy('updatedAt', 'desc')
    .get();
  // console.log({ querySnapshot });
  // console.log('querySnapshot.size');
  // console.log(querySnapshot.size);
  if (querySnapshot.size === 0) {
    return null;
  }

  const userDataList = querySnapshot.docs.map((x) => {
    // console.log('x.data()');
    // console.log(x.data());
    return {
      userName: x.data().userName,
      userData: x.data(),
    };
  });

  return userDataList;
};

/**
 * 有効ブックデータリストを取得
 *
 */
export const getBookDataList = async () => {
  // const userDataList = await getUserDataList();

  // const bookDataList = userDataList.map((x)=>{
  //   await getBookDataListFromUserData(userDataList.userData);
  //   return{
  //     userName: userData.userName,
  //     bookName: x.data.bookName,
  //     data: x.data(),
  //   };
  // });

  const querySnapshot = await firebase
    .firestore()
    .collectionGroup(VALIDBOOKS)
    .orderBy('updatedAt', 'desc')
    .get();
  // console.log({ querySnapshot });
  // console.log('querySnapshot.size');
  // console.log(querySnapshot.size);

  if (querySnapshot.size === 0) {
    return null;
  }

  const bookDataList = querySnapshot.docs.map((x) => {
    // console.log('x.data()');
    // console.log(x.data());
    return {
      userName: x.data().userName,
      bookName: x.data().bookName,
      data: x.data(),
      // bookId: x.data().bookId,
    };
  });

  // console.log(bookDataList);

  return bookDataList;
};

/**
 * 有効セクションデータリストを取得
 *
 */
export const getSectionDataList = async () => {
  const querySnapshot = await firebase
    .firestore()
    .collectionGroup(VALIDSECTIONS)
    // .where('isFuture', '==', isFuture)
    .orderBy('updatedAt', 'desc')
    .get();
  // console.log({ querySnapshot });
  // console.log('querySnapshot.size');
  // console.log(querySnapshot.size);
  if (querySnapshot.size === 0) {
    return null;
  }

  const userDataList = querySnapshot.docs.map((x) => {
    // console.log('x.data()');
    // console.log(x.data());
    return {
      userName: x.data().userName,
      bookName: x.data().bookName,
      sectionId: x.data().sectionId,
      sectionData: x.data(),
    };
  });

  // console.log({ userDataList });
  return userDataList;
};

/**
 * Uidからユーザデータを取得
 *
 * @param {*} uid
 */
export const getUserDataFromUid = async (uid) => {
  const docSnapshot = await firebase
    .firestore()
    .collection(VALIDUSERS)
    .doc(uid)
    .get();

  if (docSnapshot.size === 0) {
    return null;
  }

  return {
    userData: docSnapshot.data(),
  };
};

/**
 * ブックデータ配下の有効セクションリストを取得
 *
 * @param {*} uid
 * @param {*} bookId
 */
export const getSectionDataListFromBookData = async (userData, bookData) => {
  const querySnapshot = await firebase
    .firestore()
    .collection(VALIDUSERS)
    .doc(bookData.uid)
    .collection(VALIDBOOKS)
    .doc(bookData.bookId)
    .collection(VALIDSECTIONS)
    .orderBy('date', 'desc')
    .get();

  if (querySnapshot.size === 0) {
    return null;
  }

  const sectionDataList = querySnapshot.docs.map((x) => {
    return {
      userName: userData.userName,
      bookName: bookData.bookName,
      sectionId: x.data().sectionId,
      sectionData: x.data(),
    };
  });

  return sectionDataList;
};

/**
 * ユーザデータ配下のブックリストを取得
 *
 * @param {*} uid
 * @param {*} bookId
 */
export const getBookDataListFromUserData = async (userData) => {
  //
  // デバッグ情報
  //
  // console.log('\nファイル common.js');
  // console.log('関数 getBookDataListFromUserData');
  // console.log(userData.uid);

  const querySnapshot = await firebase
    .firestore()
    .collection(VALIDUSERS)
    .doc(userData.uid)
    .collection(VALIDBOOKS)
    .orderBy('updatedAt', 'desc')
    .get();

  // console.log({ querySnapshot });
  // console.log('querySnapshot.size');
  // console.log(querySnapshot.size);

  if (querySnapshot.size === 0) {
    return null;
  }
  const bookDataList = querySnapshot.docs.map((x) => {
    console.log('x.data()');
    console.log(x.data());

    return {
      userName: userData.userName,
      bookName: x.data.bookName,
      data: x.data(),
    };
  });

  return bookDataList;
};

/**
 * ユーザデータ配下のセクションデータリストを取得
 *
 * @param {*} uid
 * @param {*} bookId
 */
export const getSectionDataListFromUserData = async (userData) => {
  // 有効セクションコレクションに対してコレクショングループで一括取得
  const querySnapshot = await firebase
    .firestore()
    .collectionGroup(VALIDSECTIONS)
    .where('uid', '==', userData.uid)
    .orderBy('date', 'desc')
    .get();

  // console.log({ querySnapshot });
  // console.log('querySnapshot.size');
  // console.log(querySnapshot.size);

  if (querySnapshot.size === 0) {
    return null;
  }

  // 有効セクションコレクションの親ブックドキュメントからブックネーム取り出し
  const sectionDataList = await Promise.all(
    querySnapshot.docs.map(async (sectionDocSnapshot) => {
      const bookDocSnapshot = await sectionDocSnapshot.ref.parent.parent.get();
      return {
        userName: userData.userName,
        bookName: bookDocSnapshot.data().bookName,
        sectionId: sectionDocSnapshot.data().sectionId,
        sectionData: sectionDocSnapshot.data(),
      };
    }),
  );

  return sectionDataList;
};

/**
 * timestamp形式のデータをいい感じの形式に変換する
 *
 * @param {*} timestamp
 * @return {*} いい感じの形式
 */
export const convertFromTimestampToDatetime = (timestamp) => {
  const DD = timestamp ? new Date(timestamp * 1000) : new Date();
  const Y = DD.getFullYear();
  const m = (DD.getMonth() + 1).toString().padStart(2, '0');
  const d = DD.getDate().toString().padStart(2, '0');
  const H = DD.getHours().toString().padStart(2, '0');
  const i = DD.getMinutes().toString().padStart(2, '0');
  const s = DD.getSeconds().toString().padStart(2, '0');

  return `${Y}/${m}/${d} ${H}:${i}:${s}`;
};
/**
 * ファイアベースのエラーを日本語に
 *
 * @param {*} e
 * @param {*} method
 * @return {*}
 */
export const firebaseErrToTxt = (e, method) => {
  switch (e.code) {
    case 'auth/cancelled-popup-request':
    case 'auth/popup-closed-by-user':
      return null;
    case 'auth/email-already-in-use':
      if (method.indexOf('signup') !== -1) {
        return 'このメールアドレスは使用されています';
      } else {
        return 'メールアドレスまたはパスワードが違います';
      }
    case 'auth/invalid-email':
      return 'メールアドレスの形式が正しくありません';
    case 'auth/user-disabled':
      return 'サービスの利用が停止されています';
    case 'auth/user-not-found':
      return 'メールアドレスまたはパスワードが違います';
    case 'auth/user-mismatch':
      if (method === 'signin/popup') {
        return '認証されているユーザーと異なるアカウントが選択されました';
      } else {
        return 'メールアドレスまたはパスワードが違います';
      }
    case 'auth/weak-password':
      return 'パスワードは6文字以上にしてください';
    case 'auth/wrong-password':
      return 'メールアドレスまたはパスワードが違います';
    case 'auth/popup-blocked':
      return '認証ポップアップがブロックされました。ポップアップブロックをご利用の場合は設定を解除してください';
    case 'auth/operation-not-supported-in-this-environment':
    case 'auth/auth-domain-config-required':
    case 'auth/operation-not-allowed':
    case 'auth/unauthorized-domain':
      return '現在この認証方法はご利用頂けません';
    case 'auth/requires-recent-login':
      return '認証の有効期限が切れています';
    default:
      if (method.indexOf('signin') !== -1) {
        return '認証に失敗しました。しばらく時間をおいて再度お試しください';
      } else {
        return 'エラーが発生しました。しばらく時間をおいてお試しください';
      }
  }
};
/**
 * firestoreのTimestampのsecond部分をISO8601にする
 *
 * @param {*} seconds
 * @return {*}
 */
export const secToISO8601DateTimeTokyo = (seconds) => {
  return formatToTimeZone(seconds * 1000, 'YYYY-MM-DDTHH:mm', {
    timeZone: 'Asia/Tokyo',
  });
};

const getCoverImgUrl = (seed) => {
  /* 1:1.91   example 1280x670 1920x1005 */
  return `https://picsum.photos/seed/${seed}/1280/670`;
};
const getAvaterImgUrl = (seed) => {
  /* squre size*/
  return `https://picsum.photos/seed/${seed}/400/400`;
};

export const getDefaultImg = ({
  pageType,
  imgType,
  seed,
}) => {
  // console.log({ pageType });
  // console.log(imgType);
  // console.log({ seed });

  let defaultImg;
  switch (pageType) {
    case 'user':
      switch (imgType) {
        case 'cover':
          defaultImg = getCoverImgUrl(seed);
          break;
        case 'avatar':
          defaultImg = getAvaterImgUrl(seed);
          break;
        case 'icon':
          defaultImg = `🙆`;
          break;
        default:
          break;
      }
      break;
    case 'book':
      switch (imgType) {
        case 'cover':
          defaultImg = getCoverImgUrl(seed);
          break;
        case 'avatar':
          defaultImg = getAvaterImgUrl(seed);
          break;
        case 'icon':
          defaultImg = `📓`;
          break;
        default:
          break;
      }
      break;
    case 'section':
      switch (imgType) {
        case 'cover':
          defaultImg = getCoverImgUrl(seed);
          break;
        case 'avatar':
          defaultImg = getAvaterImgUrl(seed);
          break;
        case 'icon':
          defaultImg = `§`;
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
  return defaultImg;
};

// export const getDefaultImg = ({
//   pageType,
//   imgType,
//   userData,
//   bookData,
//   sectionData,
// }) => {
//   console.log({pageType});
//   console.log(imgType);
//   console.log({ userData });
//   console.log({ bookData });
//   console.log({ sectionData });

//   let defaultImg;
//   switch (pageType) {
//     case 'user':
//       switch (imgType) {
//         case 'cover':
//           defaultImg = getCoverImgUrl(userData.uid);
//           // defaultImg = `https://picsum.photos/seed/${userData.uid}/1280/670`;
//           break;
//         case 'avatar':
//           defaultImg = getAvaterImgUrl(userData.uid);
//           // defaultImg = `https://picsum.photos/seed/${userData.uid}/400/400`;
//           break;
//         case 'icon':
//           defaultImg = `🙆`;
//           break;
//         default:
//           break;
//       }
//       break;
//     case 'book':
//       switch (imgType) {
//         case 'cover':
//           defaultImg = getCoverImgUrl(bookData.bookId);
//           // defaultImg = `https://picsum.photos/seed/${bookData.bookId}/1280/670`;
//           break;
//         case 'avatar':
//           defaultImg = getAvaterImgUrl(bookData.bookId);
//           // defaultImg = `https://picsum.photos/seed/${bookData.bookId}/400/400`;
//           break;
//         case 'icon':
//           defaultImg = `📓`;
//           break;
//         default:
//           break;
//       }
//       break;
//     case 'section':
//       switch (imgType) {
//         case 'cover':
//           defaultImg = getCoverImgUrl(sectionData.sectionId);
//           // defaultImg = `https://picsum.photos/seed/${sectionData.sectionId}/1280/670`;
//           break;
//         case 'avatar':
//           defaultImg = getAvaterImgUrl(sectionData.sectionId);
//           // defaultImg = `https://picsum.photos/seed/${sectionData.sectionId}/400/400`;
//           break;
//         case 'icon':
//           defaultImg = `§`;
//           break;
//         default:
//           break;
//       }
//       break;
//     default:
//       break;
//   }
//   return defaultImg;
// };
