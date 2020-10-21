import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Chat from '@material-ui/icons/Chat';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Fingerprint from '@material-ui/icons/Fingerprint';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import InfoArea from 'components/InfoArea/InfoArea.js';

import productStyle from 'assets/jss/nextjs-material-kit-pro/pages/landingPageSections/productStyle.js';

const useStyles = makeStyles(productStyle);

export default function SectionProduct() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>
          <h2 className={classes.title}>手記書庫-ShukiShoko 操作マニュアル</h2>
          <h5 className={classes.description}>
            ここでは 手記書庫-ShukiShoko の使い方を細かく説明します。
            現状開発中であるため、各種挙動が冗長であったり、うまく機能しない場合がありますがご了承ください。
          </h5>
        </GridItem>
      </GridContainer>
      <h3 className={classes.title}>手記書庫-ShukiShoko 操作マニュアル</h3>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="ユーザ登録/ユーザ削除"
              description="新規ユーザの方は、右上のゲストボタンからサインアップを選択し、ユーザ登録をしてください。
              本サービスは閲覧のみであればユーザ登録をしなくても利用できますが、
              登録をすると、より思い出のつながりを感じることができます。
              ユーザ名はURLで使用するためアルファベットで登録お願いします。
              現在開発中であるため、メールアドレスはダミーアドレス（○○＠example.com）で登録することを推奨します。
              本番運用までにはSNS認証等を導入予定です。また、ユーザ削除は未実装です。直接連絡いただければ対応いたします。"
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="ログイン/ログアウト"
              description="既存ユーザの方は、右上のゲストボタンからログインを選択し、ログインしてください。
              ログインすると右上のゲストボタンはログインしたユーザのユーザ名に変わります。
              ユーザ名を押すとログアウトボタンが選択できますので、ログアウトの際はそこを押してください。
              "
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="トップページ"
              description="現在サービスに登録されているすべての情報が出力されています。ユーザタグでは"
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="ユーザページ"
              description="ユーザが作成した手記やセクション、未来を閲覧することができます。"
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="手記ページ"
              description="ユーザタブでは、手記の管理ユーザをたどることができます。
              手記タブは手記そのものです
              セクションタブは手記に属するセクションがすべて表示されます。
              気になるセクションを選択してセクションページに遷移します。"
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="セクションページ"
              description="ユーザタブでは、セクションの管理ユーザをたどることができます。
              手記タブでは、セクションの管理手記をたどることができます。
              セクションタブはセクションそのものです。"
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="手記作成"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="セクション作成"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="手記再編集"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="セクション再編集"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="ユーザ設定変更"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="手記設定変更"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="セクション設定変更"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>
          <h2 className={classes.title}>手記書庫-ShukiShoko 使用技術</h2>
          <h5 className={classes.description}>
            ここでは 手記書庫-ShukiShoko を構成する技術について解説します。
          </h5>
        </GridItem>
      </GridContainer>
      <h3 className={classes.title}>フロントエンド</h3>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="ユーザ登録/ユーザ削除"
              description="新規ユーザの方は、右上のゲストボタンからサインアップを選択し、ユーザ登録をしてください。
              本サービスは閲覧のみであればユーザ登録をしなくても利用できますが、
              登録をすると、より思い出のつながりを感じることができます。
              ユーザ名はURLで使用するためアルファベットで登録お願いします。
              現在開発中であるため、メールアドレスはダミーアドレス（○○＠example.com）で登録することを推奨します。
              本番運用までにはSNS認証等を導入予定です。また、ユーザ削除は未実装です。直接連絡いただければ対応いたします。"
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="ログイン/ログアウト"
              description="既存ユーザの方は、右上のゲストボタンからログインを選択し、ログインしてください。
              ログインすると右上のゲストボタンはログインしたユーザのユーザ名に変わります。
              ユーザ名を押すとログアウトボタンが選択できますので、ログアウトの際はそこを押してください。
              "
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="トップページ"
              description="現在サービスに登録されているすべての情報が出力されています。ユーザタグでは"
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="ユーザページ"
              description="ユーザが作成した手記やセクション、未来を閲覧することができます。"
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="手記ページ"
              description="ユーザタブでは、手記の管理ユーザをたどることができます。
              手記タブは手記そのものです
              セクションタブは手記に属するセクションがすべて表示されます。
              気になるセクションを選択してセクションページに遷移します。"
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="セクションページ"
              description="ユーザタブでは、セクションの管理ユーザをたどることができます。
              手記タブでは、セクションの管理手記をたどることができます。
              セクションタブはセクションそのものです。"
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="手記作成"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="セクション作成"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="手記再編集"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="セクション再編集"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="ユーザ設定変更"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="手記設定変更"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="セクション設定変更"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
