import Link from 'src/components/atoms/Link';
import { AppLayout } from 'src/components/organisms/AppLayout';

/**
 * ユーザ設定ページ
 *
 * @return {*}
 */
export default function UserSettingPage() {
  return (
    <AppLayout>
      <h1>Welcome to ユーザ設定 ページ</h1>
      <Link href="/users/hoge/bookCreate">
        <a>手記作成</a>
      </Link>
    </AppLayout>
  );
}
