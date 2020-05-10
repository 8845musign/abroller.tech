---
title: "アクセシブルなデータグリッドを実装する"
date: "2017-12-22"
tags: ['blog', 'Accessibility']
---

腹筋しろよ

本記事は[Web Accessibility Advent Calendar 2017](https://adventar.org/calendars/2088)の22日目です。

仕事柄、複雑な**グリッド**を実装する機会　が非常に多かったのですが、アクセシブルなグリッドとはどういうものか？どう実装すべきか？について考えたことがありませんでした。

そこで！ 今は[WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/)を参考にしながらひとつのグリッドを実装することで理解を深めたいと思います！

## 参考文献

参考にしたページを最初に整理しておきます。W3Cの資料です。

- [Accessible Rich Internet Applications (WAI-ARIA) 1.1（翻訳） /  Grid他](https://momdo.github.io/wai-aria-1.1/#grid) WAI-ARIAの仕様です。
- [WAI-ARIA Authoring Practices 1.1 / 3.11 Grids : Interactive Tabular Data and Layout Containers](https://www.w3.org/TR/wai-aria-practices-1.1/#grid) WAI-ARIAを使ってアクセシブルかつリッチなUIをどう実装すればよいのかをまとめています。
- [WAI-ARIA Authoring Practices 1.1 / Data Grid Examples](https://www.w3.org/TR/wai-aria-practices-1.1/examples/grid/dataGrids.html) 上記のページに沿ったサンプル実装です。

Practicesのサンプル実装を触るのが雰囲気を知るには手っ取り早いのですが、今回自分が作ろうと思ったグリッドとは微妙に仕様が違ったためWAI-ARIA を読みつつ、自分の解釈をいれて実装を進めました。

## グリッドとは

CSSグリッドなんかもあって紛らわしいので、まずはグリッドとは何か、から整理しようと思います。

[2.13 Grids : Interactive Tabular Data and Layout Containers](https://www.w3.org/TR/wai-aria-practices/#grid)より引用します。

> A grid widget is a container that enables users to navigate the information or interactive elements it contains using directional navigation keys, such as arrow keys, Home , and End. As a generic container widget that offers flexible keyboard navigation, it can serve a wide variety of needs. It can be used for purposes as simple as grouping a collection of checkboxes or navigation links or as complex as creating a full-featured spreadsheet application. While ARIA properties and assistive technologies use row and column nomenclature when describing and presenting the logical structure of elements with the grid role, using the grid role on an element does not necessarily imply that its visual presentation is tabular.

ざっくり意味を読み取ると

- ユーザが情報をキーボードの方向キーやHOME / ENDキーなどでナビゲーションできるもの。
- 使い道は幅広い
    - 単純にチェックボックスやナビゲーションリンクなどをグルーピングするもの
    - スプレッドシートのようなもの
- 視覚的に**表である必要はない**

みたいな感じでしょうか。

ナビゲーションを必要とする大規模な表や、複雑な操作を必要とするスプレッドシートのほか、単純なナビゲーションリンクの集まりなどを総称してグリッドと読ぶそうです。 混同しやすいのですが、テーブルとグリッドは区別されるものみたいです。

## 今回実装したグリッド

\[caption id="attachment\_254" align="alignnone" width="900"\]![DataGrid](/assets/images/2017/12/data-grid.png) スクリーンショットです\[/caption\]

こちらのページにサンプル実装をおいておきます。 [https://8845musign.github.io/accessible-data-grid/](https://8845musign.github.io/accessible-data-grid/)

実装はReactでやってて設計は既に破綻気味です。どこかでリファクタしたい...

[8845musign/accessible-data-grid](https://github.com/8845musign/accessible-data-grid)

### 実装した機能

- 配列によるデータを動的に変換してグリッドを生成する
- キーボードによるナビゲーション
- ショートカットキーによる各行の選択の実装
- ロールおよびWAI-ARIAステートおよびプロパティによる意味づけ

WAI-ARIA Authoring Practices 1.1の[グリッド](https://www.w3.org/TR/wai-aria-practices-1.1/#grid)をほぼ参考にしています。

### WAI-ARIA ロールやステートおよびプロパティ

Gridを扱うにあたり、WAI-ARIAによりロールやステートおよびプロパティを付与します。ただし、table要素を使う場合は、要素が本来持っているロールやプロパティに改めてWAI-ARIAを記述する必要ありません。セマンティクスが足りない部分にのみWAI-ARIAを記述します。 参考: [WAI-ARIA Roles, States, and Properties](https://www.w3.org/TR/wai-aria-practices/#grid_roles_states_props) (Noteを参照)

今回はWAI-ARIAをたくさん使ったみたかったのですべてdiv要素を使ったマークアップで実装を行ってみます。

下記に今回使用したロールとWAI-ARIAステートとプロパティをまとめていきます。 各項目にはWAI-ARIA1.1日本語訳（もんどさんによる翻訳、ありがとうございます！）へのリンクも付与しておきます。

#### grid（ロール） [日本語訳](https://momdo.github.io/wai-aria-1.1/#grid)

今回、一番基本となるロールです。 tableロールとgridロールでは役割が違うため、table要素を用いてグリッドを実装する場合にもこのロールを付与します。

gridロールの子孫はフォーカスを**管理すべきである**と述べられています。実際にどう実装したかは後述します。

#### rowgroup（ロール） [日本語訳](https://momdo.github.io/wai-aria-1.1/#rowgroup)

thead要素やtbody要素など同じような構造を提供するロールです。rowロールの関係性を定義します。 ただしWAI-ARIA1.1では、thead要素なのか？tfood要素なのかという種類は区別することができず、WAI-ARIA 2.0へ向けて提起がされている状態です。

#### row（ロール） [日本語訳](https://momdo.github.io/wai-aria-1.1/#row)

これはそのまんま行のことです。テーブル要素でいうtrです。 tableロールもしくはgridロールの両方から利用されます。

#### gridcell（ロール） [日本語訳](https://momdo.github.io/wai-aria-1.1/#columnheader)

名前の通りcellのことです。table要素でいうtdです。 rowロールに含まれます。

#### columnheader（ロール） [日本語訳](https://momdo.github.io/wai-aria-1.1/#columnheader)

table要素でいうth要素で、**列のヘッダー**情報をもつセルです。 ※行のヘッダーを表すには[rowheader（ロール）](https://momdo.github.io/wai-aria-1.1/#rowheader)があります。

#### aria-labelledby（プロパティ） [日本語訳](https://momdo.github.io/wai-aria-1.1/#aria-labelledby)

要素を識別するためのプロパティです。 今回の実装では行選択をするためのチェックボックスを、名前列により説明するために使用しています。

スクリーンリーダーを使用したときに、チェックボックスにフォーカスした際に関連する名前が読み上げられます。

#### aria-selected（ステート） [日本語訳](https://momdo.github.io/wai-aria-1.1/#aria-selected)

要素が選択されていることを表します。 行の選択を表すために使用しています。

#### aria-multiselectable（プロパティ） [日本語訳](https://momdo.github.io/wai-aria-1.1/#aria-multiselectable)

子孫要素が複数項目を選択できることを表します。 今回は行を複数選択できる仕様のため、gridロールを設定した要素へ付与します。

### キーボードによるナビゲーション

※PageDown / PageTopによる操作もあるのですが、今回は割愛しました。

#### カーソルキー

セルを上下左右に移動させます。基本の操作です。

#### Home / End

フォーカス中の、行の先頭/最後尾に移動します。 ちなみにMacのキーボードにはHome / Endキーは見当たりませんが、 代替としてfn + ← /  fn + → で入力することができます。

#### Control + Home / Control + End

グリッドの先頭および最後へ移動することができます。左上と右下への移動です。

### ショートカットキー

#### 行選択（Shift + Space）

現在フォーカス中のセルがいる行の選択をトグルします。

#### 行の全選択（Control + A）

この操作に関しては、スクリーンリーダーのユーザーにライブリージョンを用いて「全行を選択しました」というメッセージを伝えるようにしています。 前述の単一の行選択時にもあったほうが適切ではないか？と思ったのですが時間切れで実装できませんでした...。

### フォーカス管理

Gridにおいて肝となりそうなフォーカス管理についてです。

サンプルでは以下のような仕様で実装を行っています。

- tabindexを用いてセルにフォーカス可能に
- セル内にフォーカス可能な子要素がある場合は、セル自体ではなく子要素へフォーカスを付与
- focusが当たっているセル以外はtabindex="-1"とし、tabキーによるフォーカス移動の対象から除外
- セルをマウスでクリックした場合は対象のセルにフォーカスを移動

フォーカスされていないセルへtabindex="-1"を付与することで必要のないタイミングで大量のフォーカスに引っかかってしまうことを防いでいます。 また、セル内にリンクやボタンが配置されている場合、セルではなく直接子要素へフォーカスを当てるようにしています。（サンプルではリンクしかありませんが）

## データグリッドとの付き合い方

データグリッドで人生を浪費している私ですがどれも**仕様が複雑でした。**

- 各セルで表現される要素が、文字/アイコン/グラフ/ツールチップなどの動的な要素を持つものなど多種多彩
- 扱うデータ量が非常に多い、数万件クラス
- 複雑な見出しの固定表示

これらの特徴を素早く実装するためにだいたいOSSのコンポーネントを使うことになりますが、アクセシビリティ的に十分な品質になっているものが現在見つかっていないです。（プロジェクトの関係でReactコンポーネントでさがしてます）

OSSなんだからプルリクを送ればいいのでは？とも思いましたが、機能が複雑になればなるほど、実装が複雑で手が出しづらい傾向にあります。

以前、星の数が多く品質の高さをうたったOSSのデータグリッドを案件で使用したことがありました。 行を固定ににするオプションと、各行をチェックボックスによる選択を可能にするといった二つのオプションを掛け合わせたところ、バグによりグリッドの機能が破壊されてしまいました。 膨大な機能に対してすべての掛け合わせテストは難しく、多機能であることのリスクを感じました。

今回サンプルでデータグリッドを実装したことで「ギリギリフルスクラッチもいけるな」という感想もったので、必要最低限と自由にアクセシビリティ対応したデータグリッドを案件に合わせて、作ることも選択肢の一つとしていれていいのかなと思いました。 データグリッド、「ユーザにとってアクセシブルであるためにはどう作ればよいか」が振れ幅が大きいように感じるのもフルスクラッチしたい理由の一つです。

もしこの記事をお読みの方で、逆にこのOSSのコンポーネントはアクセシビリティ的にすごいいいよ！といったアドバイスがあれば是非いただきたいです！

ここまでお付き合いいただきありがとうございました。

明日の[Web Accessibility Advent Calendar 2017](https://adventar.org/calendars/2088)はemimさんです！
