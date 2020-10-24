import Link from 'src/components/atoms/Link';

import { AppLayout } from 'src/components/organisms/AppLayout';
import { RSC } from 'src/common/resource';
import { AppHead } from 'src/components/organisms/AppHead';

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
    <>
      {/*******************/}
      {/* ヘッダ情報        */}
      {/*******************/}
      <AppHead
        pageTitle={`${RSC.appTitle}`}
        description={`${RSC.appTitle}は${RSC.topPageDescription_1}`}
        url={`${RSC.domain}/book-settting`}
      />
      <AppLayout>
        {/* <Layout> */}

        <h1>手記設定</h1>

        <p> ユーザー: {props.userName}</p>

        <Link href={`/users/${props.userName}`}>
          <a>ユーザページ</a>
        </Link>

        {/* </Layout> */}
      </AppLayout>
    </>
  );
}
