/* MyApp */
import {
  getAllUserNamesPaths,
  getUserDataFromUserName,
  getBookDataListFromUserData,
  getSectionDataListFromUserData,
} from 'src/common/common';
import { RSC } from 'src/common/resource';
import { UserPageMain } from 'src/components/templates/userPage/UserPageMain';
import { AppHead } from 'src/components/organisms/AppHead';
import { AppLayout } from 'src/components/organisms/AppLayout';

/**
 * 静的パス取得
 *
 * @export
 * @return {*}
 */
export const getStaticPaths = async () => {
  // すべてのユーザ名を含んだパス生成用配列を取得
  const paths = await getAllUserNamesPaths();

  // デバッグ情報
  // if (paths) {
  //   paths.map((p) => {
  //     console.log(`SSG対象ユーザページ ${p.params.userName}`);
  //   });
  // }

  return { paths, fallback: true };
};

/**
 * 静的パラメータ取得
 *
 * @export
 * @param {*} { params }
 * @return {*}
 */
// export async function getStaticProps({ params }) {
export const getStaticProps = async ({ params }) => {
  // パスから切り出された値が入っている
  const { userName } = params;

  // ユーザ名からユーザデータを取得
  const { userData } = await getUserDataFromUserName(userName);

  // 該当ユーザ名のデータが存在しない場合はデータ部をNullで返す;
  if (!userData) {
    // デバッグ情報
    console.log('異常終了 該当ユーザ名のデータが存在しない\n');

    return {
      props: {
        userName,
        userData: null,
      },
    };
  }

  // ユーザデータ配下のブックデータリストを取得
  const bookDataList = await getBookDataListFromUserData(userData);

  // ユーザデータ配下のセクションデータリストを取得
  const sectionDataList = await getSectionDataListFromUserData(userData);

  return {
    // Next.jsはDate型を返してほしくないようなのでこのような対処をしている
    props: {
      userName,
      userData: JSON.parse(JSON.stringify(userData)),
      bookDataList: JSON.parse(JSON.stringify(bookDataList)),
      sectionDataList: JSON.parse(JSON.stringify(sectionDataList)),
    },
  };
};

/**
 * ユーザページ
 *
 * @param {string} userName ユーザネーム
 * @param {object} userData ユーザデータ
 * @return {JSX}
 */
export default function UserNamePage({
  userName,
  userData,
  bookDataList,
  sectionDataList,
}) {
  return (
    <>
      <AppLayout>
        <UserPageMain
          userName={userName}
          userData={userData}
          bookDataList={bookDataList}
          sectionDataList={sectionDataList}
        />
      </AppLayout>
    </>
  );
}
