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
//     },
//   };
// }
/**
 * 手記設定ページ
 *
 * @export
 * @param {*} props
 * @return {*}
 */
export default function BookSettingPage(props) {
  return (
    <AppLayout>
      {/* <Layout> */}

      <h1>手記設定</h1>

      <p> ユーザー: {props.userName}</p>

      <Link href={`/users/${props.userName}`}>
        <a>ユーザページ</a>
      </Link>

      {/* </Layout> */}
    </AppLayout>
  );
}
