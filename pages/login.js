/* react */
import React from 'react';

/* MyApp */
import { RSC } from 'src/common/resource';
import { AppHead } from 'src/components/organisms/AppHead';
import { AppLayout } from 'src/components/organisms/AppLayout';
import LoginPageMain from 'src/components/templates/authPage/LoginPageMain';

/**
 * ログインページ
 *
 * @export
 * @return {*}
 */
export default function LoginPage() {
  return (
    <AppLayout>
      <AppHead pageTitle={RSC.loginPageTitle} />
      <LoginPageMain />
    </AppLayout>
  );
}
