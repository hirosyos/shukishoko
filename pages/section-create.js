import Link from 'src/components/atoms/Link';

import {
  getUserDataFromUserName,
  getBookDataFromBookName,
} from 'src/common/common';
import SectionCreateInputForm from 'src/components/molecules/Section';
import { AppLayout } from 'src/components/organisms/AppLayout';

// /**
//  * 静的パス取得
//  *
//  * @export
//  * @return {*}
//  */
// export async function getStaticPaths() {
//   const paths = [];

//   return { paths, fallback: true };
// }

// /**
//  * 静的パラメータ取得
//  *
//  * @export aa
//  * @param {*} aa
//  * @return {*}
//  */
// export async function getStaticProps({ params }) {
//   // ユーザ名からユーザデータを取得
//   const { userData } = await getUserDataFromUserName(params.userName);

//   // 該当ユーザ名のデータが存在しない場合はデータ部をNullで返す
//   if (!userData) {
//     console.log('関数：getStaticProps 該当ユーザ名のデータが見つからない');
//     return {
//       props: {
//         userName: params.userName,
//         userData: null,
//         bookName: params.bookName,
//         bookData: null,
//         bookId: null,
//       },
//     };
//   }

//   // ブック名からブックデータを取得
//   const { bookData } = await getBookDataFromBookName(
//     params.userName,
//     params.bookName,
//   );

//   // 該当ブック名のデータが存在しない場合はデータ部をNullで返す
//   if (!bookData) {
//     console.log('関数：getStaticProps 該当ブック名のデータが見つからない');
//     return {
//       props: {
//         userName: params.userName,
//         userData,
//         bookName: params.bookName,
//         bookData: null,
//         bookId: null,
//       },
//     };
//   }

//   return {
//     // Next.jsはDate型を返してほしくないようなのでこのような対処をしている
//     props: {
//       userName: params.userName,
//       userData: JSON.parse(JSON.stringify(userData)),
//       bookName: params.bookName,
//       bookData: JSON.parse(JSON.stringify(bookData)),
//       bookId: bookData.bookId,
//     },
//   };
// }

/**
 * セクション作成ページ
 *
 * @export
 * @param {*} props
 * @return {*}
 */
export default function SectionCreate(props) {
  return (
    <AppLayout>
      {/* <Layout> */}
      <h1>セクション作成</h1>
      <p>
        {' '}
        ユーザー:
        {props.userName}
      </p>
      <p>
        {' '}
        手記:
        {props.bookName}
      </p>

      <SectionCreateInputForm
        userData={props.userData}
        bookData={props.bookData}
        bookId={props.bookId}
      />

      <Link href={`/users/${props.userName}`}>
        <a>ユーザページへ戻る</a>
      </Link>
      <Link href={`/users/${props.userName}/${props.bookName}`}>
        <a>手記ページへ戻る</a>
      </Link>

      {/* </Layout> */}
    </AppLayout>
  );
}
