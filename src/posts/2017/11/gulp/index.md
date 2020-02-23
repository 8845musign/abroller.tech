---
title: "「ゼロからはじめるgulp入門書」を読んだ"
date: "2017-11-19"
tags: ['post']
---

腹筋しろよ

先日技術書展３なる技術系同人イベントに参加してきました。ナユさんが出している[**ゼロからはじめるgulp入門書**](https://nayucolony.booth.pm/items/665533)を**絶対感想書くマン枠**で購入してきたのでレビュー（というかほぼ感想）を書きます。

## 最新環境を前提とした内容

本のなかではnodeは8.X, gulpは4.0を前提として記述が進められており、ネットで見つかる情報では環境を明示していないものも少なくないので安心して読み進めていくことができます。

Gulpのインストールもlocalに導入する前提で書かれており、チーム作業への配慮かなと思いました。globalにインストールしたタスクランナー系で、他の人とバージョン違いにより上手く動かないことが何回かあったのでlocalに導入になっているのは安心です。

それに伴いコマンド実行もnpxが前提になっており、細かい配慮が良いなと思いました。

## コンテキストへの配慮

エンジニアが普段何気なく使う言葉には、デザイナーやディレクターにとっては馴染みの無いハイコンテキストな言葉が混ざっています。例えば**対話的に**を**対話するように**と表現する配慮が本には見られます。細かいことですが、読み手のリズムを崩さない丁寧な配慮ではないでしょうか。

またプラグインのgulp-plumberについての節に以下の一節がでてきます。

> 「plumber」とは「配管工」という意味という意味です。

plumber、ぱっと効いただけでは馴染みのない単語で、？マークがついてしまいやすいポイントです。？マークが読むにつれ増えれば触れるほど、本やその技術に対する「学ぼう」という意欲が薄れていく事があります。この本ではその「？」に対して丁寧な説明が入っています。 要所要所で腹落ちしつつ進められる構成になっています。

## 表紙デザイン

僕は紙モノのデザイン経験に乏しく、まともな感想が述べられるわけではないのですが、表紙デザインにとても惹かれたのでちょっと書きます。 [この本の表紙](https://nayucolony.booth.pm/items/665533)は技術書というよりはどちかというと雑誌の表紙に近い印象です。

雑誌の表紙には人物写真が扱われることが多いですが、これは人物に人は注目しやすい特性があるのかなと思っています。コンビニなどで雑誌が何冊か置かれたときに、思わず表紙の人物に目を止めてしまった経験はないでしょうか。例えば週間アスキーは比較的テック系の雑誌でありながらグラビア写真をデザインのメインに据えており特徴的です。

表紙の女の子のイラストもポージングや目線が写真に近いのかなぁと、良いなぁと思いました。目を合わせちゃいませんか？

## サンプルリポジトリ

本を追いながら実際に僕が手元で動かしたgulpプロジェクトをGithubにアップしておきました。 何かの参考になったら幸いです。

[8845musign/sample-gulp-tutorial](https://github.com/8845musign/sample-gulp-tutorial)

本に従って環境を作ったところ、serveタスクが終了しきっていない感じだったので自分でちょっと修正いれています。（なんか見落としてたら申し訳ないです。）

doneの部分です。

gulpfile.js

```js
gulp.task("serve", (done) => {
  browserSync.init(browserSyncOption)
  done()
})

```

あとはjsonの修正でも更新がかかるようにwatch対象を追加しています。

## 最後に

商業化の話も進んでいるとのことなので、今回の本が事実上のパイロット版的な位置づけになるのでしょうか？読み比べてみるのが楽しみです。

一冊の本としてまとめられることが少なかったgulp、ゼロからはじめるgulp入門書は貴重な**ちゃんと入門**できる本だと思います。ネットの断片情報を拾い読みしていくのが辛かった方は是非手にとってみてください。（[電子版がある](https://nayucolony.booth.pm/items/665533)ようなので）