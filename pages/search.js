import React from 'react';
import Head from 'next/head';
import Link from 'src/components/atoms/Link';

import { AppLayout } from 'src/components/organisms/AppLayout';
import { RSC } from 'src/common/resource';
import { AppHead } from 'src/components/organisms/AppHead';

/**
 * 検索ページ
 *
 * @export
 * @param {*} props
 * @return {*}
 */
export default function Search(props) {
  //
  // デバッグ情報
  //
  console.log('\nファイル /pages/serch.js');
  console.log('関数 Serch');
  console.log({ props });

  //
  // デバッグ情報
  //
  console.log('正常終了\n');

  return (
    <>
      {/*******************/}
      {/* ヘッダ情報        */}
      {/*******************/}
      <AppHead
        pageTitle={`${RSC.appTitle}`}
        description={`${RSC.appTitle}は${RSC.topPageDescription_1}`}
        url={`${RSC.domain}/search`}
      />
      <AppLayout>
        <div>
          <main>
            <h1>Welcome to 検索ページ</h1>

            <Link href={`/top`}>
              <a>トップページ</a>
            </Link>
          </main>

          <footer>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{' '}
              <img src="/logo_shukishoko_icon.svg" alt="ShukiShoko Logo" />
            </a>
          </footer>
        </div>
      </AppLayout>
    </>
  );
}
