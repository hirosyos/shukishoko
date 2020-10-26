/* MyApp */
import TopPageMain from 'src/components/templates/topPage/TopPageMain';
import {
  getBookDataListFromUserData,
  getUserDataList,
  getBookDataList,
  getSectionDataList,
} from 'src/common/common';
import { RSC } from 'src/common/resource';

import { makeStyles } from '@material-ui/core/styles';
import { AppLayout } from 'src/components/organisms/AppLayout';
import { AppHead } from 'src/components/organisms/AppHead';

/******************************************************************
 * TODO:
 * 20201026 暫定対処                                                                       
 * SSGだと新規手記投稿の結果をユーザページが認識せず古いHTMLを見せ続ける
 * この問題は手記ページとセクションページでも同様に起きる
 * URLでダイレクトにページにアクセスするとフォールバック機能でページは生成
 * されるが、親ページにそれが伝わらないためと考える
 * 暫定対処として、getStaticPathsを削除
 * getStaticPropsをgetServerSidePropsに変更する
 * 対処が必要ないページもあると思うが取り急ぎ全ソースコードそのようにする
 ******************************************************************/

/**
 * 静的パラメータ取得
 *
 * @export
 * @param {*} { params }
 * @return {*}
 */
export const getServerSideProps = async ({ params }) => {
// export const getStaticProps = async ({ params }) => {
  const userDataList = await getUserDataList();

  const bookDataList = await getBookDataList();

  const sectionDataList = await getSectionDataList();

  // const futureDataList = getSectionDataList(false);

  return {
    // Next.jsはDate型を返してほしくないようなのでこのような対処をしている
    props: {
      userDataList: JSON.parse(JSON.stringify(userDataList)),
      bookDataList: JSON.parse(JSON.stringify(bookDataList)),
      sectionDataList: JSON.parse(JSON.stringify(sectionDataList)),
      // futureDataList: JSON.parse(JSON.stringify(futureDataList)),
    },
  };
};

/**
 * サービストップページ
 *
 * @export
 * @return {*}
 */
export default function TopPage({
  userDataList,
  bookDataList,
  sectionDataList,
  // futureDataList,
}) {
  return (
    <>
      <AppLayout>
        <TopPageMain
          userDataList={userDataList}
          bookDataList={bookDataList}
          sectionDataList={sectionDataList}
          // futureDataList={futureDataList}
        />
      </AppLayout>
    </>
  );
}
