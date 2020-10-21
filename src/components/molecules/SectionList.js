import { SectionCard } from 'src/components/molecules/SectionCard';

/**
 * セクションリスト表示
 *
 * @param {*} sectionList
 * @return {*}
 */
export const SectionList = ({ sectionDataList }) => {
  //
  // デバッグ情報
  //
  // console.log('関数 SectionList');
  // console.log({ sectionDataList });

  // console.log('正常終了 SectionList2\n');

  return (
    <>
      {/* <table border="1">
        <tbody>
          <tr>
            <th>セクション公開設定</th>
            <th>セクション更新日</th>
            <th>セクションID</th>
            <th>タイトル</th>
            <th>セクションページへ移動ボタン</th>
          </tr>
          {sectionDataList?.map((x, index) => (
            <tr key={index}>
              <td>{x.sectionData.isPublic}</td>
              <td>{convertFromTimestampToDatetime(x.sectionData.updatedAt)}</td>
              <td>{x.sectionData.sectionId}</td>
              <td>{x.sectionData.title}</td>
              <td>
                <Link
                  href={`/users/${x.userName}/${x.bookName}/${x.sectionData.sectionId}`}
                >
                  セクションページへ
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {sectionDataList?.map((x) => (
        <SectionCard
          key={x.sectionId}
          userName={x.userName}
          bookName={x.bookName}
          sectionId={x.sectionId}
          sectionData={x.sectionData}
        />
      ))}
    </>
  );
};
