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

/**
 * 静的パラメータ取得
 *
 * @export
 * @param {*} { params }
 * @return {*}
 */
export const getStaticProps = async ({ params }) => {
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
      <AppHead
        pageTitle={`トップ`}
        description="ディスクリプション"
        keyword="キーワード"
        image="http://shukishoko.com/logo_shukishoko_fullscreen.png"
        url="http://shukishoko.com/top/"
      />
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
