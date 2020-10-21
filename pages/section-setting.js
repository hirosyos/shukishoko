import Link from 'src/components/atoms/Link';

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
//  * @export
//  * @param {*} { params }
//  * @return {*}
//  */
// export async function getStaticProps({ params }) {
//   return {
//     props: {
//       userName: params.userName,
//       bookName: params.bookName,
//     },
//   };
// }
/**
 * セクション設定ページ
 *
 * @param {*} props
 * @return {*}
 */
export default function SectionSettingPage(props) {
  return (
    <AppLayout>
      <h1>Welcome to セクション 設定ページ</h1>
      <p> ユーザー: {props.userName}</p>
      <p> 手記: {props.bookName}</p>
      <Link href={`/users/${props.userName}`}>
        <a>ユーザページ</a>
      </Link>
      <Link href={`/users/${props.userName}/${props.bookName}`}>
        <a>手記ページ</a>
      </Link>
    </AppLayout>
  );
}
