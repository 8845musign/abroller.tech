---
title: "僕らが定義リストと呼んでいたモノについて"
date: "2017-11-18"
tags: ['post']
---

腹筋しろ

昨日、[まぼろしのマークアップ勉強会#1](https://maboroshi.connpass.com/event/69974/)に参加してきました。当日の様子は今なら[#mbrs\_markup\_study](https://twitter.com/hashtag/mbrs_markup_study?src=hash)でわかるかもしれません。 お酒飲みながら畳に鎮座し、参加者全員がLTやっていくという独特なスタイルの会で良かった。 帰りに無意識にラーメン食べてて、体重増えてて良かった。（ヨクナイ）

会のなかで定義リストはもはや定義という狭義のマークアップ要素ではなくなっているというマサカリを頂いたのでまとめます。 「定義リスト」という言葉のイメージにおいてのコンテンツとマークアップは以下の様なものとします。

<p class="codepen" data-height="265" data-theme-id="0" data-slug-hash="yPpyyx" data-default-tab="html,result" data-user="8845musign" data-embed-version="2" data-pen-title="defined list">See the Pen <a href="https://codepen.io/8845musign/pen/yPpyyx/">defined list</a> by hiroki yokouchi (<a href="https://codepen.io/8845musign">@8845musign</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

HTML5が盛り上がった際に自分もさらっと見た気がしたんですが忘れてた...

## 僕らが定義リストと呼んでいた時代では

### HTML 4.01

HTML 4.01 Specificationから一部を引用します。

[10.3 Definition lists: the DL, DT, and DD elements](https://www.w3.org/TR/html401/struct/lists.html#h-10.3)

> Definition lists vary only slightly from other types of lists in that list items consist of two parts: a term and a description. The term is given by the DT element and is restricted to inline content. The description is given with a DD element that contains block-level content.

節のタイトルにはっきり「定義リスト」と記述されており、引用した説明にも「用語と説明、２つの構成部分からなる」とあります。

対して現在ではどのような仕様になっているのでしょうか。

## 現在の仕様

### HTML 5.2

[4.4. Grouping content](https://www.w3.org/TR/html52/grouping-content.html#grouping-content)の中に該当する仕様が見当たります。

[4.4.9. The dl element](https://www.w3.org/TR/html52/grouping-content.html#the-dl-element)

節のタイトルからして、「定義リスト」という言葉が消えています。単純に「dl要素」というタイトルになりました。

> The dl element represents a description list of zero or more term-description groups.

上記は説明文からの引用です。**term-description groups**とは何を意味するのでしょうか、続く説明を引用します。

> Term-description groups may be names and definitions, questions and answers, categories and topics, or any other groups of term-description pairs.

- 名前と定義
- 質問と回答
- カテゴリーとトピックス
- グループと用語の解説のペア

より幅広い用途で使えるような説明になっています。 また、dl要素の子にはdiv要素を含めることができるようになっています。

### HTML Living Standard

2017年11月18日時点でのHTML Living Standardではどのような説明になっているのでしょうか。 HTML5.2とほぼ同様の節に説明を見つけることができます。

[4.4.9 The dl element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element)

> The dl element represents an association list consisting of zero or more name-value groups (a description list).

**Term-description groups**は**Name-value groups**という言葉に置き換わっています。 name-value groupsに関する説明を引用します。

> Name-value groups may be terms and definitions, metadata topics and values, questions and answers, or any other groups of name-value data.

おおむねHTML 5.2においてのTerm-description groupsに対する説明とだいたい同じかなと思います。ただ言葉がName-value groupsに変わったことにより「用語の説明」という使い方は主ではなく、あくまで一つの使い方であるというような印象を受けるようになりました。

まとめると、最新の仕様では下のサンプルのような使い方もできるということですね。

<p class="codepen" data-height="265" data-theme-id="0" data-slug-hash="bYaNqv" data-default-tab="html,result" data-user="8845musign" data-embed-version="2" data-pen-title="bYaNqv">See the Pen <a href="https://codepen.io/8845musign/pen/bYaNqv/">bYaNqv</a> by hiroki yokouchi (<a href="https://codepen.io/8845musign">@8845musign</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## まとめ

要素を知ることはマークアップする上での語彙を増やすことになります。語彙がなければdivの暗黒面に落ちていくことになるわけです。マジで！？しか言えない感じみたいなアレ、アレだよ！ divの乱用はユーザへ不便を強いり、マサカリを呼び寄せ、我々自信にもメンテ性の低下となって襲ってくるのでした。 （div自体が悪いわけではないですが）

仕様知ってこ。
