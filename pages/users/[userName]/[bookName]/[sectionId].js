import {
  getUserDataFromUserName,
  getBookDataFromBookName,
  getAllSectionIdPaths,
  getSectionDataFromSectionId,
} from 'src/common/common';

import { RSC } from 'src/common/resource';
import { AppHead } from 'src/components/organisms/AppHead';

import SectionPageMain from 'src/components/templates/sectionPage/SectionPageMain';

import { AppLayout } from 'src/components/organisms/AppLayout';

/**
 * 静的パス取得
 *
 * @export
 * @return {*}
 */
export async function getStaticPaths() {
  // すべてのユーザ名とブック名とセクションIDを含んだパス生成用配列を取得
  const paths = await getAllSectionIdPaths();

  //
  // デバッグ情報
  //
  // if (paths) {
  //   paths.map((p) => {
  //     console.log(
  //       `SSG対象セクションページ ${p.params.userName}/${p.params.bookName}/${p.params.sectionId}`,
  //     );
  //   });
  // }

  return { paths, fallback: true };
}

/**
 * 静的パラメータ取得
 *
 * @export
 * @param {*} { params }
 * @return {*}
 */
export async function getStaticProps({ params }) {
  const { userName, bookName, sectionId } = params;

  // ユーザネームからユーザデータを取得
  const { userData } = await getUserDataFromUserName(userName);
  // ブックネームからブックデータを取得
  const { bookData } = await getBookDataFromBookName(userName, bookName);
  // セクションIDからセクションデータを取得
  const { sectionData } = await getSectionDataFromSectionId(
    userName,
    bookName,
    sectionId,
  );
  // 該当セクションIDのデータが存在しない場合はデータ部をNullで返す
  if (!userData || !bookData || !sectionData) {
    console.log('ユーザ、ブック、セクションのデータ全てが揃いませんでした\n');
    return {
      props: {
        userName,
        userData,
        bookName,
        bookData,
        sectionId,
        sectionData: null,
      },
    };
  }

  return {
    // Next.jsはDate型を返してほしくないようなのでこのような対処をしている
    props: {
      userName,
      userData: JSON.parse(JSON.stringify(userData)),
      bookName,
      bookData: JSON.parse(JSON.stringify(bookData)),
      sectionId,
      sectionData: JSON.parse(JSON.stringify(sectionData)),
    },
  };
}

/**
 * セクションIDからページを作成する
 *
 * @export
 * @param {*} {
 *     userName,
 *     userData,
 *     bookName,
 *     bookData
 *     sectionId,
 *     sectionData,
 * }
 * @return {*}
 */
export default function SectionIdPage({
  userName,
  userData,
  bookName,
  bookData,
  sectionId,
  sectionData,
}) {
  return (
    <AppLayout>
      <SectionPageMain
        userName={userName}
        userData={userData}
        bookName={bookName}
        bookData={bookData}
        sectionId={sectionId}
        sectionData={sectionData}
      />
    </AppLayout>
  );
}
