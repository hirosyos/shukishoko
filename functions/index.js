const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const algoliasearch = require('algoliasearch');
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;
const ALGOLIA_INDEX_NAME = 'shukishoko';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

const index = client.initIndex(ALGOLIA_INDEX_NAME);



// exports.onProductCreated = functions.firestore
//   .document('validUsers/{id}')
//   .onCreate((snap, context) => {
//     const data = snap.data();
//     data.objectID = context.params.id;
//     const index = client.initIndex(ALGOLIA_INDEX_NAME);
//     return index.saveObject(data);
//   });

// exports.onProductUpdated = functions.firestore
//   .document('validUsers/{id}')
//   .onCreate((snap, context) => {
//     const data = snap.data();
//     data.objectID = context.params.id;
//     const index = client.initIndex(ALGOLIA_INDEX_NAME);
//     return index.saveObject(data);
//   });

// 有効ユーザ

// algolia全文検索API利用関数// コレクションに新規レコードが追加されると起動
exports.onValidUserCreated = functions.firestore
  .document('validUsers/{id}')
  .onCreate((snap, context) => {
    // 新規レコードの情報をIndex用オブジェクトに格納
    const objectID = snap.id;
    const data = snap.data();
    // AlgoliaへIndex
    return index.addObject({
      objectID,
      ...data,
    });
  });

// algolia全文検索API利用関数// コレクションのレコードが削除されると起動
exports.onValidUserDeleted = functions.firestore
  .document('validUsers/{id}')
  .onDelete((snap, context) => {
    // Index用オブジェクトを削除
    index.deleteObject(snap.id);
  });

// algolia全文検索API利用関数// コレクションのレコードが更新されると起動
exports.onValidUserUpdated = functions.firestore
  .document('validUsers/{id}')
  .onUpdate((change, context) => {
    // 更新レコードの情報をIndex用オブジェクトに格納
    const objectID = change.after.id;
    const newData = change.after.data();
    // AlgoliaへIndex
    return index.saveObject({
      objectID,
      ...newData,
    });
  });

  // 有効手記

  // algolia全文検索API利用関数// コレクションに新規レコードが追加されると起動
exports.onValidBookCreated = functions.firestore
  .document('validUsers/{id}/validBooks/{bookId}')
  .onCreate((snap, context) => {
    // 新規レコードの情報をIndex用オブジェクトに格納
    const objectID = snap.id;
    const data = snap.data();
    // AlgoliaへIndex
    return index.saveObject({
      objectID,
      ...data,
    });
  });

// algolia全文検索API利用関数// コレクションのレコードが削除されると起動
exports.onValidBookDeleted = functions.firestore
  .document('validUsers/{id}/validBooks/{bookId}')
  .onDelete((snap, context) => {
    // Index用オブジェクトを削除
    index.deleteObject(snap.id);
  });

// algolia全文検索API利用関数// コレクションのレコードが更新されると起動
exports.onValidBookUpdated = functions.firestore
  .document('validUsers/{id}/validBooks/{bookId}')
  .onUpdate((change, context) => {
    // 更新レコードの情報をIndex用オブジェクトに格納
    const objectID = change.after.id;
    const newData = change.after.data();
    // AlgoliaへIndex
    return index.saveObject({
      objectID,
      ...newData,
    });
  });

  // 有効セクション

    // algolia全文検索API利用関数// コレクションに新規レコードが追加されると起動
exports.onValidSectionCreated = functions.firestore
  .document('validUsers/{id}/validBooks/{bookId}/varidSections/{sectionId}')
  .onCreate((snap, context) => {
    // 新規レコードの情報をIndex用オブジェクトに格納
    const objectID = snap.id;
    const data = snap.data();
    // AlgoliaへIndex
    return index.saveObject({
      objectID,
      ...data,
    });
  });

// algolia全文検索API利用関数// コレクションのレコードが削除されると起動
exports.onValidSectionDeleted = functions.firestore
  .document('validUsers/{id}/validBooks/{bookId}/varidSections/{sectionId}')
  .onDelete((snap, context) => {
    // Index用オブジェクトを削除
    index.deleteObject(snap.id);
  });

// algolia全文検索API利用関数// コレクションのレコードが更新されると起動
exports.onValidSectionUpdated = functions.firestore
  .document('validUsers/{id}/validBooks/{bookId}/varidSections/{sectionId}')
  .onUpdate((change, context) => {
    // 更新レコードの情報をIndex用オブジェクトに格納
    const objectID = change.after.id;
    const newData = change.after.data();
    // AlgoliaへIndex
    return index.saveObject({
      objectID,
      ...newData,
    });
  });