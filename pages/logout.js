/* react */
import React from 'react';

/* MyApp */
import { RSC } from 'src/common/resource';
import { AppHead } from 'src/components/organisms/AppHead';
import { AppLayout } from 'src/components/organisms/AppLayout';
import LogoutPageMain from 'src/components/templates/authPage/LogoutPageMain';

/**
 * ログアウトページ
 *
 * @export
 * @return {*}
 */
export default function LogoutPage() {
  return (
    <AppLayout>
      <AppHead pageTitle={RSC.logoutPageTitle} />
      <LogoutPageMain />
    </AppLayout>
  );
}
