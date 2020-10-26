import GridItem from 'components/Grid/GridItem.js';

import BookCard from 'src/components/molecules/BookCard';

/**
 * ユーザが作成した手記リスト
 *
 * @param {*} userData
 * @return {*}
 */
export const BookList = ({ userData, bookDataList }) => {
  //
  // デバッグ情報
  //
  // console.log('\nファイル User.js');
  console.log('関数 BookList');
  console.log({ bookDataList });

  //
  // デバッグ情報
  //
  console.log('正常終了 BookList\n');

  return (
    <>
      {bookDataList?.map((x) => (
        <BookCard
          key={x.data.bookId}
          userName={x.userName}
          bookName={x.data.bookName}
          bookData={x.data}
        />
      ))}
    </>
  );
};
