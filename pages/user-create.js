import Link from 'src/components/atoms/Link';

import { AppLayout } from 'src/components/organisms/AppLayout';
/**
 * ユーザ作成ページ
 *
 * @export
 * @return {*}
 */
export default function UserCreatePage() {
  return (
    <AppLayout>
      <h1>ユーザ作成 ページ</h1>
      <Link href="/users/hoge/bookCreate">
        <a>手記作成</a>
      </Link>
    </AppLayout>
  );
}
