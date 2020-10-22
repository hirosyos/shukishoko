/* next */
import Head from 'next/head';
/* MyApp */
import { RSC } from 'src/common/resource';

export const AppHead = ({ pageTitle, description, keyword, image, url }) => {
  //変動しないようなHead情報は _app や _documents を使う
  return (
    <Head>
      <title>{`${pageTitle}`}</title>
      {/* サイト名などのブランド情報を含まない、記事のタイトル。 */}
      <meta property="og:title" content={`${pageTitle}`} />
      {/* コンテンツの簡単な説明。2～4文が一般的。 */}
      <meta property="og:description" content={description} />
      <meta name="keywords" content="手記書庫" />
      {/* コンテンツのメディアのタイプ。このタグにより、ニュースフィードでコンテンツがどのように表示されるかが決まります。タイプを指定しない場合、デフォルトはwebsiteです。 */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      {/* コンテンツがFacebookでシェアされたときに表示される画像のURL。 */}
      <meta
        property="og:image"
        content={`${RSC.domain}/logo_shukishoko_fullscreen.jpg`}
      />
      <meta property="og:site_name" content={pageTitle} />

      {/* for Twitter */}
      {/* 大画面付きTwitterカード */}
      <meta name="twitter:card" content="product" />
      {/* WEBサイトのTwitterアカウント */}
      <meta name="twitter:site" content="@shukishokoinfo" />
      {/* 作者ののTwitterアカウント */}
      <meta name="twitter:creator" content="@miniusagi33" />
      <meta name="twitter:url" content={url} />
      {/* <meta name="twitter:title" content={pageTitle} /> */}
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={`${RSC.domain}/logo_shukishoko_fullscreen.jpg`}
      />
      <link rel="canonical" href={url} />
      <link
        rel="shortcut icon"
        href={`${RSC.domain}/logo_shukishoko_circle.svg`}
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${RSC.domain}/logo_shukishoko_icon.svg`}
      />
    </Head>
  );
};
