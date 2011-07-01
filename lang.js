var langNames = { 'en': 'English', 'ja': '日本語 (Japanese)' , 'zh-cn': '简体中文 (Simplified Chinese)'};
var langList = ['ja','zh-cn']; // 'en' shouldn't be added here
var langResources = {
	'Twitter / user': ['Twitter / ユーザ','Twitter / 用户'],
	'Twitter / tweet': ['Twitter / ツイート','Twitter / 发言'],
	'Delete tweet': ['ツイートを削除','删除该发言'],
	'Retweet': ['リツイート','官方锐推'],
	'Quote with RT:': ['RT:を付けて引用','加入RT:引用回复'],
	'Block this user': ['ユーザをブロック', '加入黑名单'],
	'Unblock this user': ['ユーザをブロック解除', '从黑名单中去除'],
	'Report as spam': ['スパム報告', '举报垃圾信息'],
	'GeoTagging': ['ジオタグ','地理标签'],
	'Location':	['場所','方位'],
	'URL':	['URL','URL'],
	'following':	['人をフォロー','关注该用户'],
	'followers':	['人がフォロー','关注的用户'],
	'tweets':	['ツイート','发言'],
	'favs':	['fav','收藏'],
	'Follow $1':	['$1をフォロー','关注$1'],
	'Remove $1':	['$1をリムーブ','取消关注$1'],
	'$1 is following you!':	['$1はあなたをフォローしています!','$1正在关注你！'],
	'show user info':	['ユーザ情報を表示','显示用户详细信息'],
	'Log out':	['ログアウト','注销'],
	'Preferences':	['設定','选项'],
	'language':	['言語','语言'],
	'max #msgs in TL':	['TLの最大表示数','TL最大显示发言数'],
	'#msgs in TL on update (max=200)':	['起動時のTL取得数(最大200)','启动后取得TL数目(最大为200条)'],
	'#msgs in user on update (max=200)':	['ユーザTL取得数(最大200)','用户界面取得TL数目(最大为200条)'],
	'update interval':	['自動更新間隔','自动更新时间间隔'],
	'Update after post':	['発言後に自動更新','在发言之后自动更新'],
	'since_id check':	['TL取得時にsince_idを使用','在取得TL的时候使用since_id'],
	'Show not-following replies in TL':	['フォローしていない返信もTLに表示','没有关注的用户的回复也在TL上显示'],
	'Show retweets in "RT:" form':	['リツイートを"RT:〜"形式で表示','官方锐推也用RT:～来显示'],
	'Auto-resize field':	['発言欄のサイズを自動調整','输入框大小自动调整'],
	'Post length counter':	['残り文字数を表示','显示发言的剩余字数'],
	'Post with ctrl/shift+enter':	['ctrl+enter/shift+enterで発言','敲击Ctrl+回车或Shift+回车来发言'],
	'Enable GeoTagging':	['ジオタグ(位置情報)を有効に','开启地理标签（方位信息）'],
	'Use HTTPS':	['HTTPSを使用','使用HTTPS'],
	'Footer':	['フッター','加尾修饰'],
	'Plugins':	['プラグイン','插件'],
	'user stylesheet':	['ユーザスタイルシート','用户自定义样式表'],
	'Twitter API status':	['Twitter APIの状態','TwitterAPI状态'],
	'hourly limit':	['1時間当たりの制限','一小时之内API限制'],
	'reset at':	['リセット日時','重置时刻'],
	'Save':	['保存','保存'],
	'API error (Twitter may be over capacity?)': ['APIエラー(Twitter過負荷?)',null],
	'This tweet is too long.': ['ツイートが長すぎます。','发送字数过多。'],
	'Your settings are saved. Please reload to apply plugins and CSS.': ['設定を保存しました。プラグイン、CSSの変更を反映するにはリロードが必要です。','选项已保存。请刷新页面以应用插件以及样式表的修改。'],
	'Plugin error': ['プラグインのエラー','插件发生了错误'],
	'Are you sure to logout? You need to re-authenticate twicli at next launch.': ['ログアウトしてもよろしいですか? 次回起動時には再認証が必要になります。','确定要注销？下次启动的时候需要重新进行认证。'],
	'Retweet to your followers?': ['あなたのフォロワーにこのツイートをRT(リツイート)してもよろしいですか?'],
	'This tweet is protected; Are you sure to retweet?': ['このツイートはプロテクトされています。本当にRTしますか?','该发言已被用户锁定。你确定要RT吗？'],
	'This tweet is protected.': ['このツイートはプロテクトされています。', '该发言已被用户锁定。'],
	'Are you sure to delete this tweet?': ['このツイートを削除してもよろしいですか?','确定要删除该发言？'],
	'Are you sure to remove $1?': ['本当に $1 をリムーブしますか?','确定要取消关注$1吗？'],
	'Are you sure to block $1?': ['本当に $1 をブロックしますか?','真的要把 $1 加入黑名单么？'],
	'Are you sure to report $1 as spam?': ['本当に $1 をスパムとして報告しますか?','真的要举报 $1 么？'],
	'An external plugin is specified. This plugin can fully access to your account.\nAre you sure to load this?': ['外部プラグインが指定されています。このプラグインはあなたのアカウントに自由にアクセス可能になります。本当にロードしてもよろしいですか?','你欲加载外部地址上的插件。这个插件将自由访问你的帐号信息。确认加载？'],
	'Cannot access to direct messages. Please re-auth twicli for DM access.': ['ダイレクトメッセージにアクセスできません。お手数ですが再度認証を行ってください。'],
	'An old HTML file is loaded. Please reload it. If the problem is not fixed, please try erasing caches.': ['古いHTMLファイルがロードされています。リロードしてみて下さい。それでも解決しない場合はキャッシュを削除してみて下さい。']
};
