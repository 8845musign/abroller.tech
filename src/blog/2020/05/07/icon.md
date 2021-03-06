---
title: "インタフェースデザインにおけるアイコンの取り扱いについて"
date: "2020-05-07"
tags: ['blog', 'Design']
---

腹筋しろよ。

最近アイコンの取り扱いについて悩んでいる。

私の観測範囲内では、アイコンに依存したインタフェースは減ってきているように思う。僕が毎日開くWeb版のTwitterクライアントでは、「ツイート」アクションへ単に「ツイートする」というテキストが割り振られている。そこにアイコンはない。

ユーザのメンタルモデルとして確率されているとは言えがたいアイコンの利用はユーザにとって不便であると結論付けられそうなデータは随分前からある。例えばサイトメニューに使われるハンバーガーメニューへ「MENU」などのテキストを追加することでクリック率が改善されるのは有名な話だ。

別の視点で、不用意なアイコン（もしくはグラフィック）の利用がリリーススピードもしくはサイト全体の一貫性に悪影響を及ぼす。

最近業務で「無理なアイコンの利用はやめて欲しい。」というリクエストをPMから受け、素直に同意した。アイコンに悩む時間、リリースまでに持ってくスピードおよび全体の整合性を天秤にかけた結果、アイコンは必要ないと思った（ただしこれは私の力不足による部分も大きい）。

ただし、ある「追加」というテキストのみを持つボタンをレイアウトした際に、コンテキストがややつかみにくいケースが出てきた。もう少し詳しく説明するとツリーチャート、つまりはX/Yの2軸を自由にレイアウトされるデザインでだ。
試しに「+（プラス）」を付与してみたところしっくりきた。  
この「しっくりきた」を言語化することが、今はまだうまくできない。そして、ユーザの反応を見なければこの「+（プラス）」がどう機能するのかはわからない。

別のレイアウトで使われる「追加ボタン」はアイコンによる補助がなくても十分機能しているように見えた。そのボタンは、あるカード状のUIに内包されたリストへ続いて配置されており、「何が追加されるか」が明白だっった。

アイコンについて述べた文献はいくか見てきたけれど、周りの要素と連動してどう作用するかについての知見を僕はあまり持っていない。

しばらくはこの問題に向き合っていくことになるだろう。
