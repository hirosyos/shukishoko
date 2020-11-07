/* MyApp */
import SearchPageMain from 'src/components/templates/searchPage/SearchPageMain';
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
// export const getServerSideProps = async ({ params }) => {
export const getStaticProps = async ({ params }) => {
  // const userDataList = await getUserDataList();

  // const bookDataList = await getBookDataList();

  // const sectionDataList = await getSectionDataList();

  // const futureDataList = getSectionDataList(false);

  return {
    // Next.jsはDate型を返してほしくないようなのでこのような対処をしている
    props: {
      // userDataList: JSON.parse(JSON.stringify(userDataList)),
      // bookDataList: JSON.parse(JSON.stringify(bookDataList)),
      // sectionDataList: JSON.parse(JSON.stringify(sectionDataList)),
      // futureDataList: JSON.parse(JSON.stringify(futureDataList)),
    },
    revalidate: 1,
  };
};

/**
 * サービストップページ
 *
 * @export
 * @return {*}
 */
export default function SearchPage({
  // userDataList,
  // bookDataList,
  // sectionDataList,
  // futureDataList,
}) {
  return (
    <>
      <AppLayout>
        <SearchPageMain
          // userDataList={userDataList}
          // bookDataList={bookDataList}
          // sectionDataList={sectionDataList}
          // futureDataList={futureDataList}
        />
      </AppLayout>
    </>
  );
}
