これはなに？

claude3 API で Haiku を使って、Google 検索経由でウェブサイトを読み取り、企業の業種を判別させます。

実行例
```sh
pnpm start industry 企業情報 会社概要

> haiku-example@1.0.0 start /Users/coji/progs/spike/claude/haiku-example
> tsx haiku.ts "industry" "人材紹介"

{
  url: 'https://www.adecco.co.jp/client/useful/201008_perm',
  companyName: '株式会社アデコ',
  industry: '人材サービス業',
  summary: '株式会社アデコは、人材紹介サービスを提供する企業です。同社は人材派遣、人材紹介、アウトソーシングなどの幅広いサービスを展開しており、企業の人材ニーズに合わせて最適なソリューションを提案しています。'
}
{
  url: 'https://www.staffservice.co.jp/client/client_faq0054.html',
  companyName: '株式会社スタッフサービス',
  industry: '人材サービス',
  summary: '株式会社スタッフサービスは、人材派遣、人材紹介、常用型派遣などの人材サービスを提供している企業です。同社は日本全国に営業拠点を持ち、幅広い職種にわたって人材を紹介しています。'
}
{
  url: 'https://www.saiyo-doda.jp/service/recruitment/column/merit-recruitment',
  companyName: 'doda',
  industry: 'Human Resources / Recruiting',
  summary: "The webpage describes a recruitment service provided by the company 'doda', which specializes in personnel introduction and recruitment support."
}
{
  url: 'https://www.r-agent.com/business/',
  companyName: 'リクルートエージェント',
  industry: '人材紹介・採用支援',
  summary: 'リクルートエージェントは企業や法人向けの中途採用支援サービスを提供しています。求人情報の作成や候補者の紹介、面接選考の支援など、採用活動の全般をサポートしています。採用決定時に成功報酬を得る完全成果報酬型のサービスです。'
}
{
  url: 'https://www.neo-career.co.jp/humanresource/knowhow/a-contents-middlecareer-dainisinsotu-e-jenthikaku-0913/',
  companyName: '株式会社ネオキャリア',
  industry: '人材紹介・採用支援サービス',
  summary: '株式会社ネオキャリアは、採用支援サービスを提供している企業です。中途採用、新卒採用、アルバイト採用など幅広い採用支援サービスを手がけており、企業の採用活動を総合的にサポートしています。人材紹介サービス、求人広告、適性検査、採用代行など、様々な採用支援ツールを提供しています。'
}
{
  url: 'https://mynavi-agent.jp/knowledge/common/755.html',
  companyName: 'マイナビエージェント',
  industry: '人材紹介/転職支援サービス',
  summary: 'マイナビエージェントは、企業と求職者をマッチングさせる人材紹介会社です。企業の採用要件を満たした人材を紹介し、転職活動の全般的なサポートを行っています。求職者には無料でサービスを提供し、企業から成果報酬を得ています。特徴として、非公開求人の紹介、専任のキャリアアドバイザーによるサポート、労働条件や給与の交渉代行などがあげられます。'
}
{
  url: 'http://www.jinzai-bank.net/edit/info.cfm/ug/003/',
  companyName: '人材バンクネット',
  industry: '人材紹介業',
  summary: '人材紹介のサービス内容、種類、メリット、選び方について解説しています。人材紹介会社の特徴や利用者のメリット・デメリットについても紹介しています。'
}
{
  url: 'https://www.tempstaff.co.jp/client/hr-knowledge/1814.html',
  companyName: 'パーソルテンプスタッフ',
  industry: '人材サービス業',
  summary: '人材派遣、アウトソーシング・BPO、紹介予定派遣、人材紹介など、人材サービスを提供する会社です。'
}
{
  url: 'https://www.manpowergroup.jp/client/manpowerclip/employ/permanent.html',
  companyName: 'マンパワーグループ株式会社',
  industry: '人材サービス',
  summary: 'マンパワーグループは人材サービスのグローバルカンパニーで、リクルーティング、評価、研修、人材育成、キャリアマネジメント、アウトソーシング、人材コンサルティングなど、人材に関するあらゆるソリューションを展開しています。人材紹介サービスは成功報酬型で、企業の要望に合わせた人材を探し出して紹介するサービスです。人材派遣と異なり、紹介された候補者を自社の社員として採用することが前提となります。'
}
```

設定
1. pnpm i 
2. .env に ANTHROPIC_API_KEY を設定してください。


使い方例
```
$ pnpm start industry 企業情報 会社概要
```

「企業情報 会社概要」の部分は Google の検索クエリになります。