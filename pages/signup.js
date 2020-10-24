/* react */
import React from 'react';
/* MyApp */
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
      <SignupPageMain />
    </AppLayout>
  );
}
