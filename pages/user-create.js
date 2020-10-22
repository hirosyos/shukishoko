import Link from 'src/components/atoms/Link';

import { AppLayout } from 'src/components/organisms/AppLayout';
import { RSC } from 'src/common/resource';
import { AppHead } from 'src/components/organisms/AppHead';

/**
 * ユーザ作成ページ
 *
 * @export
 * @return {*}
 */
export default function UserCreatePage() {
  return (
    <>
      {/*******************/}
      {/* ヘッダ情報        */}
      {/*******************/}
      <AppHead
        pageTitle={`${RSC.appTitle}`}
        description={`${RSC.appTitle}は${RSC.topPageDescription_1}`}
        url={`${RSC.domain}/user-create`}
      />
      <AppLayout>
        <h1>ユーザ作成 ページ</h1>
        <Link href="/users/hoge/bookCreate">
          <a>手記作成</a>
        </Link>
      </AppLayout>
    </>
  );
}
