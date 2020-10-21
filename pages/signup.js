/* react */
import React from 'react';
/* MyApp */
import { RSC } from 'src/common/resource';
import { AppHead } from 'src/components/organisms/AppHead';
import { AppLayout } from 'src/components/organisms/AppLayout';
import { SignupPageMain } from 'src/components/templates/authPage/SignupPageMain';

/**
 * サインアップページ
 *
 * @export
 * @param {*} { ...rest }
 * @return {*}
 */
export default function SignUpPage({ ...rest }) {
  return (
    <AppLayout>
      <AppHead pageTitle={RSC.signupPageTitle} />
      <SignupPageMain />
    </AppLayout>
  );
}
