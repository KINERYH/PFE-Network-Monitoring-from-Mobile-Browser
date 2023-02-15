/* The logic behind the automated browsing is:
1) Close the previous tab (if it's not the only tab open)
2) Load the current page
3) Carry out the measurements
4) Save the measurements
5) Open a new tab
*/

// Flag for browsing automation
// const automation = true;
const automation = false;

// List of websites for browsing automation
// const websitesList = [
//   'google.com',
//   'youtube.com',
//   'baidu.com',
//   'bilibili.com',
//   'qq.com',
//   'twitter.com',
//   'zhihu.com',
//   'wikipedia.org',
//   'amazon.com',
//   'instagram.com',
//   'linkedin.com'
// ];

const websitesList = ['google.com', 'zunaso.com', 'youtube.com', 'baidu.com', 'bilibili.com', 'facebook.com', 'qq.com', 'twitter.com', 'zhihu.com', 'wikipedia.org', 'amazon.com', 'instagram.com', 'linkedin.com', 'reddit.com', 'whatsapp.com', 'openai.com', 'yahoo.com', 'bing.com', 'taobao.com', '163.com', 'xvideos.com', 'live.com', 'pornhub.com', 'microsoft.com', 'vk.com', 'zoom.us', 'github.com', 'jd.com', 'weibo.com', 'tiktok.com', 'canva.com', 'csdn.net', 'fandom.com', 'office.com', 'naver.com', 'apple.com', 'sina.com.cn', 'aliexpress.com', 'microsoftonline.com', 'yahoo.co.jp', 'xhamster.com', 'paypal.com', 'iqiyi.com', 'spankbang.com', 'pinterest.com', 'mail.ru', 'ebay.com', 'douban.com', 'msn.com', 'imdb.com', 'amazon.in', 'netflix.com', 'adobe.com', 'telegram.org', 'dzen.ru', 'quora.com', 'stackoverflow.com', 'sohu.com', 'spotify.com', 'aliyun.com', 'xnxx.com', '1688.com', 'myshopify.com', 'tmall.com', 'indeed.com', 'deepl.com', 'twimg.com', 'pixiv.net', 'feishu.cn', 'duckduckgo.com', 'amazon.co.jp', 'msn.cn', 'tencent.com', 'freepik.com', 'etsy.com', 'amazon.co.uk', 'booking.com', 'imgur.com', 'jianshu.com', 'ilovepdf.com', 'twitch.tv', 'atlassian.net', 'force.com', 'dropbox.com', 'office365.com', 'alipay.com', 'discord.com', 'namu.wiki', 't.me', 'wordpress.com', 'nih.gov', 'tradingview.com', 'avito.ru', '3dmgame.com', 'xiaohongshu.com', 'instructure.com', 'onlyfans.com', 'amazonaws.com', 'flipkart.com', 'hao123.com', 'alibaba.com', 'hupu.com', 'cnki.net', 'mediafire.com', 'tistory.com', 'figma.com', 'smzdm.com', 'doubleclick.net', 'youdao.com', '52pojie.cn', 'sogou.com', 'chaturbate.com', 'ok.ru', 'realsrv.com', 'eastmoney.com', 'trello.com', 'slack.com', 'nytimes.com', 'fiverr.com', 'tumblr.com', 'notion.so', 'shopify.com', 'toutiao.com', 'bbc.com', 'okta.com', 'digikala.com', 'w3schools.com', 'medium.com', 'so.com', 'douyin.com', 'fc2.com', 'cnn.com', 'weather.com', 'udemy.com', 'gitee.com', 'missav.com', 'autohome.com.cn', 'amazon.it', 'quizlet.com', 'archive.org', 'intuit.com', 'speedtest.net', 'mega.nz', 'researchgate.net', 'ozon.ru', 'youku.com', 'wetransfer.com', 'vimeo.com', 'chase.com', 'rakuten.co.jp', 'binance.com', 'walmart.com', 'cnblogs.com', 'sciencedirect.com', '115.com', 'hitomi.la', 'behance.net', 'grammarly.com', 'eporner.com', '51cto.com', 'linktr.ee', 'upwork.com', 'fmkorea.com', 'gamersky.com', 'ali213.net', 'gstatic.com', 'salesforce.com', 'dmm.co.jp', 'espn.com', 'shutterstock.com', 'zendesk.com', 'godaddy.com', 'ixigua.com', 'zxx.edu.cn', 'savefrom.net', 'mozilla.org', 'zillow.com', 'amazon.ca', 'yandex.com', 'amazon.fr', 'deviantart.com', 'e-hentai.org', 'indiatimes.com', 'hubspot.com', 'stripe.com', 'quillbot.com', 'uol.com.br', 'douyu.com', 'dailymail.co.uk', 'amazon.es', 'cloudfront.net', 'runoob.com', 'pexels.com', 'bytedance.net', 'yuque.com', 'ifeng.com', 'livejasmin.com', 'wildberries.ru', 'nhentai.net', 'zoho.com', 'samsung.com', 'theguardian.com', 'remove.bg', 'amazon.de', 'yts.mx', 'bankofamerica.com', 'daum.net', 'greasyfork.org', 'sxyprn.com', 'coinmarketcap.com', 'cloudflare.com', 'eastday.com', 'y2mate.com', 'apple.com.cn', 'yiyouliao.com', 'zhipin.com', 'investing.com', 'livedoor.jp', 'oracle.com', 'gosuslugi.ru', 'shein.com', 'blogger.com', 'pixabay.com', 'qidian.com', 'roblox.com', 'chess.com', 'envato.com', 'pinimg.com', 'line.me', 'noodlemagazine.com', '360.cn', 'shopee.tw', 'tianyancha.com', 'zerodha.com', 'nicovideo.jp', 'shaparak.ir', 'coupang.com', 'nvidia.com', 'zoro.to', 'myworkday.com', 'aparat.com', 'animeflv.net', 'alibaba-inc.com', 'ya.ru', 'bbc.co.uk', 'mercadolibre.com.ar', 'crunchyroll.com', 'coursera.org', 'unsplash.com', 'v2ex.com', 'jable.tv', 'amazon.com.mx', 'jb51.net', 'soundcloud.com', 'huaban.com', 'scribd.com', 'craigslist.org', 'xxxxx520.com', 'zol.com.cn', 'steampowered.com', 'hdfcbank.com', 'pconline.com.cn', '1337x.to', 'manatoki215.net', '9gag.com', 'asana.com', 'www.gov.uk', '360.com', 'dell.com', 'hotstar.com', 'nga.cn', 'wikimedia.org', 'cupfox.app', 'wellsfargo.com', 'quark.cn', 'similarweb.com', 'xueqiu.com', 'blog.jp', 'chegg.com', 'myanimelist.net', 'varzesh3.com', 'dailymotion.com', 'wix.com', 'foxnews.com', 'xhamsterlive.com', 'lenovo.com.cn', 'patreon.com', 'reverso.net', 'china.com', 'dingtalk.com', 'book118.com', 'kakao.com', 'myworkdayjobs.com', 'huawei.com', 'geeksforgeeks.org', 'ups.com', 'stripchat.com', 'cambridge.org', 'docin.com', 'mi.com', 'nexon.com', 'xhamster18.desi', 'forbes.com', 'hp.com', 'usps.com', 'wordpress.org', 'bet365.com', 'gogoanime.bid', 'kdocs.cn', 'gitlab.com', 'healthline.com', 'istockphoto.com', 'zhibo8.cc', 'torob.com', 'wiley.com', 'divar.ir', 'artstation.com', 'qcc.com', 'cctv.com', 'wowhead.com', '360doc.com', 'lanzoug.com', 'goodreads.com', 'chinaz.com', 'ea.com', 'oraclecloud.com', 'youporn.com', 'primevideo.com', 'gofile.io', 'fast.com', 'biligame.com', 'shaggyselectmast.com', 'office.net', 'dcinside.com', 'americanexpress.com', 'springer.com', 'asus.com', 'capitalone.com', 'homedepot.com', 'sahibinden.com', 'thisvid.com', 'erome.com', 'mangaraw.to', 'supjav.com', 'service-now.com', 'genius.com', 'npmjs.com', 'sina.cn', 'adp.com', 'nudgeworry.com', 'dribbble.com', 'sourceforge.net', 'solemnvine.com', 'hostinger.com', 'marca.com', 'dlsite.com', 'sweepfrequencydissolved.com', 'pearson.com', 'mydrivers.com', 'onlinesbi.sbi', 'jetbrains.com', 'smartedu.cn', 'chsi.com.cn', 'javdb.com', 'globo.com', 'powerbi.com', 'mercadolibre.com.mx', 'dongchedi.com', 'gamer.com.tw', 'themeforest.net', 'feignthat.com', 'aliyuncs.com', 'taboola.com', 'chapmanganato.com', 'softonic.com', 'thepaper.cn', 'oschina.net', 'theporndude.com', 'wikihow.com', 'aliexpress.ru', 'trendyol.com', 'equitydefault.com', 'lanhuapp.com', 'skype.com', 'naukri.com', 'messenger.com', 'yelp.com', 'gd.gov.cn', 'docker.com', '9animetv.to', 'tokopedia.com', 'excretekings.com', 'xiaomi.com', 'icicibank.com', 'ign.com', 'wise.com', 'mheducation.com', '4chan.org', 'chaoxing.com', 'discordapp.com', 'arxiv.org', 'for-j.com', 'naveljutmistress.com', 'dytt8.net', 'academia.edu', 'convertio.co', 'zippyshare.com', 'gumroad.com', '178.com', 'fidelity.com', 'stackexchange.com', 'aliexpress.us', 'kinopoisk.ru', 'ampproject.org', 'archiveofourown.org', 'redd.it', 'fedex.com', 't66y.com', 'zoukankan.com', 'shopee.co.id', 'bitbucket.org', 'bestbuy.com', 'atlassian.com', 'payoneer.com', 'tripadvisor.com', 'bendibao.com', 'smallpdf.com', 'accuweather.com', 'hulu.com', 'turkiye.gov.tr', 'wps.cn', 'ctfile.com', 'redtube.com', 'acfun.cn', 'target.com', 'steamcommunity.com', 'python.org', 'amap.com', 'tragicbeyond.com', 'bdimg.com', 'ibm.com', 'shopee.co.th', 'nike.com', 'hbomax.com', 'irs.gov', 'tnaflix.com', '66law.cn', 'cdninstagram.com', 'ixxx.com', 'ouo.io', 'docomo.ne.jp', 'gamewith.jp', 'hepsiburada.com', 'miro.com', 'shopee.com.my', 'tktube.com', 'bitly.com', 'leetcode.cn', 'btnull.org', 'midjourney.com', 'box.com', 'mailchimp.com', 'trustpilot.com', '4399.com', 'digitalocean.com', 'nextdoor.com', 'intel.com', 'mercari.com', 'icloud.com', 'zcool.com.cn', 'rule34.xxx', 'fitgirl-repacks.site', 'woa.com', 'kuaishou.com', 'merriam-webster.com', 'alicdn.com', 'lenovo.com', 'arca.live', 'itch.io', 'seznam.cz', 'calendly.com', 'wnacg.org', 'mit.edu', 'huaweicloud.com', 'weibo.cn', 'b2clogin.com', 'tokyomotion.net', 'chinatax.gov.cn', 'codepen.io', 'cricbuzz.com', 'porntrex.com', 'rutracker.org', 'namecheap.com', 'proton.me', 'europa.eu', 'eksisozluk.com', 'crjpgate.com', 'freeok.vip', 'investopedia.com', 'tapd.cn', 'harvard.edu', 'lanzoui.com', 'shimo.im', 'wiktionary.org', 'xbox.com', '423down.com', 'gamespot.com', 'soap2day.to', 'slideshare.net', 'ptt.cc', 'webpkgcache.com', 'onet.pl', 'cnbc.com', 'wp.pl', 'gsmarena.com', 'fapello.com', 'ddys.art', 'jinritemai.com', 'futbin.com', 'ca.gov', 'flaticon.com', 'zhaopin.com', 'shopee.vn', 'bbsmax.com', 'drctcldfa.com', 'motherless.com', 'xunlei.com', '2345.com', 'mcmod.cn', 'agemys.net', 'state.gov', 'apache.org', 'manage.wix.com', 'huggingface.co', 'wsj.com', 'mdpi.com', 'boyfriendtv.com', 'duolingo.com', 'txxx.com', 'ithome.com', 'thesaurus.com', 'olevod.com', 'wayfair.com', 'donmai.us', 'agoda.com', 'monday.com', 'brave.com', 'asurascans.com', 'mnw.cn', 'espncricinfo.com', 'infobae.com', 'poki.com', '11467.com', 'canada.ca', 'syosetu.com', 'qualtrics.com', 'washingtonpost.com', 'squarespace.com', 'bunkr.ru', 'vnexpress.net', 'freecodecamp.org', 'ebay.co.uk', 'as.com', 'playstation.com', 'amazon.cn', '360kuai.com', 'lazada.co.th', 'rumble.com', 'hanime1.me', 'moneycontrol.com', 'nature.com', '5ch.net', 'britannica.com', 'notion.site', 'forms.gle', 'noonoo26.tv', 'opensea.io', '51job.com', 'ameblo.jp', 'dood.yt', 'evernote.com', 'mayoclinic.org', 'ctrip.com', 'hotmart.com', 'azure.com', 'airbnb.com', 'cloudconvert.com', 'ilive.cn', 'wikiwiki.jp', 'amazon.com.au', 'rottentomatoes.com', '123pan.com', 'reuters.com', 'thingiverse.com', 'pornpics.com', 'raw.githubusercontent.com', 'semrush.com', 'ikea.com', 'glassdoor.com', 'anahitagirted.uno', 'gismeteo.ru', 'loom.com', 'hqporner.com', 'autodesk.com', 'zxxk.com', 'zaobao.com', 'udn.com', 'ieee.org', '6080dy2.com', 'rt.com', 'weiyun.com', 'airtable.com', 'cengage.com', 'lenta.ru', 'typeform.com', 'disneyplus.com', 'xuexi.cn', 'ria.ru', 'duosecurity.com', 'tampermonkey.net', 'hh.ru', 'rezka.ag', 'eroterest.net', 'rakuten.com', '1fichier.com', 'upornia.com', 'gmw.cn', 'juejin.cn', 'smdyy.cc', '9anime.to', 'redgifs.com', 'pornzog.com', 'wattpad.com', 'substack.com', 'hao6v.cc', 'hdmoli.com', 'clickup.com', 'redfin.com', 'sz.gov.cn', '18comic.vip', 'unity.com', 'ahhhhfs.com', 'windowsazure.com', 'businessinsider.com', 'pdfdrive.com', 'segmentfault.com', 'att.com', 'irctc.co.in', '9game.cn', 'rule34video.com', 'doorblog.jp', 'uptodown.com', 'docusign.com', 'yourbestjournal.com', 'bloomberg.com', 'anjuke.com', 'miyoushe.com', 'netease.com', 'uptobox.com', 'auth0.com', 'citi.com', 'nypost.com', 'superuser.com', 'dafont.com', 'epicgames.com', 'costco.com', 'yoojia.com', 'xfantazy.com', 'goo.ne.jp', 'dogdrip.net', 'xero.com', 'vidhub.top', 'ylwt33.com', 'indiamart.com', 'bilibili.tv', 'snapchat.com', 'lectortmo.com', 'smallseotools.com', 'pchome.com.tw', 'ondemand.com', 'processon.com', 'realtor.com', 'mgtv.com', 'atwiki.jp', 'rubika.ir', 'speedtest.cn', 'newtoki215.com', 'court.gov.cn', 'youjizz.com', 'wordreference.com', 'justwatch.com', 'anxia.com', 'byjus.com', 'internetdownloadmanager.com', 'chiphell.com', 'fang.com', 'jav.guru', 'gitee.io', 'interia.pl', 'ezgif.com', 'ebay.com.au', 'javatpoint.com', 'antfin.com', 'zapier.com', 'weebly.com', 'liepin.com', '189.cn', 'sberbank.ru', 'getbootstrap.com', 'iwara.tv', 'iloveimg.com', 'gmarket.co.kr', 'zztongyun.com', 'pixhost.to', 'ebay-kleinanzeigen.de', 'subhd.tv', 'makeuseof.com', 'patria.org.ve', 'mos.ru', 'ytimg.com', 'amazon.ae', 'dhl.com', 'ximalaya.com', 'apa.az', 'vecteezy.com', 'bale.ai', 'frontiersin.org', 'onlinedown.net', 'basecamp.com', 'meesho.com', 'mat6tube.com', 'nalog.ru', 'docusign.net', 'feimaoyun.com', 'expedia.com', 'cityheaven.net', 'javmix.tv', 'simpcity.su', 'vuejs.org', 'flickr.com', 'shuzhiduo.com', 'kakaku.com', 'ke.com', 'oxu.az', 'teachable.com', 'youzan.com', 'zoominfo.com', 'ghxi.com', 'issuu.com', 'lowes.com', 'tvmao.com', 'surveymonkey.com', 'slickdeals.net', 'javhdporn.net', 'bdys01.com', 'huatu.com', 'livejournal.com', 'doc88.com', 'hm.com', 'xiaoman.cn', 'tsinghua.edu.cn', 'coonandeg.xyz', 'fmovies.to', 'camwhores.tv', 'emofid.com', 'faphouse.com', 'mangadex.org', 'amazon.sa', '126.com', 'xlivrdr.com', 'socialmediagirls.com', 'imagetwist.com', 'windows.net', 'www.gov.cn', 'maigoo.com', '58.com', 'pngtree.com', 'beijing.gov.cn', 'jotform.com', 'dmm.com', 'blackboard.com', 'made-in-china.com', 'gamerant.com', 'lanzoux.com', 'o8tv.com', 'askubuntu.com', 'sheetvibe.com', 'pixnet.net', 'bandcamp.com', 'guancha.cn', 'dreamstime.com', '18183.com', 'hsforms.com', 'streamtape.com', 'creditkarma.com', 'spiegel.de', 'onelogin.com', 'pornone.com', 'shaheed4u.work', 'dns-shop.ru', 'elpais.com', 'pypi.org', 'drctcldfafwr.com', 'wondershare.com', 'pinduoduo.com', 'consultant.ru', 'bankmellat.ir', 'experimentalconcerningsuck.com', 'wp.com', '10086.cn', 't-online.de', 'sspai.com', '11st.co.kr', 'tandfonline.com', 'liquipedia.net', 'payu.in', 'leetcode.com', 'forexfactory.com', 'note.com', 'ikco.ir', 'meijutt.tv', 'billdesk.com', 'rambler.ru', 'flash.cn', 'hatenablog.com', 'feedly.com', 'usatoday.com', 'sinaimg.cn', 'yangkeduo.com', 'manganato.com', 'idnes.cz', 'adobelogin.com', 'game8.jp', 'pikabu.ru', 'timeanddate.com', 'vmware.com', 'coingecko.com', '17track.net', 'prototypewailrubber.com', 'sap.com', 'optnx.com', 'codecanyon.net', 'justdial.com', 'criteo.com', 'ebay.de', 'goo.gl', 'bongacams.com', 'avgle.com', 'list-manage.com', 'freelancer.com', 'td.com', 'oup.com', 'minecraft.net', 'emojipedia.org', 'sat.gob.mx', 'online-convert.com', 'livedoor.com', 'rediff.com', 'ahrefs.com', 'sketchfab.com', 'discover.com', 'asos.com', 'lichess.org', 'xfinity.com', 'osiextantly.com', 'fantuanhd.com', 'fuliba2023.net', 'lazada.com.ph', 'klaviyo.com', 'huijiwiki.com', 'redbubble.com', 'moegirl.org.cn', 'kahoot.it', 'wallhaven.cc', 'momoshop.com.tw', 'colamanhua.com', 'trip.com', 'pdffiller.com', 'battle.net', 'coinbase.com', 'visualstudio.com', 'allegro.pl', 'sex.com', 'ccschy.com', 'wjx.cn', 'editorialmanager.com', 'erothots.co', 'fanbox.cc', 'youtu.be', 'togetter.com', 'byted.org', 'webmd.com', '4channel.org', 'oaxyteek.net', 'detik.com', 'hifini.com', 'nexusmods.com', 'eitaa.com', 'ettoday.net', 'khanacademy.org', 'buzzfeed.com', 'ustc.edu.cn', 'doordash.com', 'tutorialspoint.com', 'rightmove.co.uk', 'iau.ir', 'activehosted.com', 'modao.cc', 'drom.ru', 'ecosia.org', 'aol.com', 'bild.de', 'concursolutions.com', 'igram.io', 'lanzouw.com', 'taleo.net', 'amazon.eg', 'zsxq.com', 'studocu.com', 'habr.com', 'bytedance.com', 'novinky.cz', 'cnet.com', 'roudoduor.com', 'huya.com', 'leagueoflegends.com', 'amd.com', 'screenrant.com', 'xiaoheimi.net', 'pixlr.com', 'teacherspayteachers.com', 'themoviedb.org', 'report.az', 'bmi.ir', 'tamin.ir', 'czzy01.com', 'acesso.gov.br', 'dw.com', 'hanime.tv', 'eventbrite.com', 'likecs.com', 'shopee.ph', 'library.lol', 'aznude.com', 'fazenda.gov.br', 'xiumi.us', 'teambition.com', 'akamaized.net', 'calculator.net', 'booth.pm', 'thegamer.com', 'jjwxc.net', 'dev.to', 'iknight.lol', 'nfl.com', 'uber.com', 'nba.com', 'iconfont.cn', 'yadongtube.net', 'veed.io', 'ibb.co', 'lever.co', 'sdo.com', 'kooora.com', 'e621.net', 'hostinger.in', 'tsetmc.com', 'razorpay.com', 'bp.blogspot.com', 'flashscore.com', 'linkvertise.com', 'brightspace.com', 'makemytrip.com', 'coursehero.com', 'aa.com', 'crunchbase.com', 'bit.ly', 'mercadolibre.com.ve', 'javgg.net', 'epfindia.gov.in', 'pcauto.com.cn', 'impress.co.jp', 'media-amazon.com', 'files.wordpress.com', 'odcoc.com', 'myntra.com', 'amazon.com.tr', 'peacocktv.com', 'giphy.com', 'ruliweb.com', 'nintendo.com', 'telegra.ph', 'sportskeeda.com', 'myzaker.com', 'quickconnect.cn', 'pelisplus.lat', 'freepik.es', 'marketwatch.com', 'webtoons.com'];

// Setting a toolbar badge text
browser.runtime.onMessage.addListener((request, sender) => {
  // This cache stores page load time for each tab, so they don't interfere
  browser.storage.local.get('cache').then(data => {
    if (!data.cache) data.cache = {};
    data.cache['tab' + sender.tab.id] = request.timing;
    get(request.timing);
    // Set the badge of the extension
    browser.storage.local.set(data).then(() => {
      browser.browserAction.setBadgeText({ text: request.time, tabId: sender.tab.id });
      browser.browserAction.setPopup({ tabId: sender.tab.id, popup: "popup.html" })
    });
  });
  if (automation) {
    try{
      var websiteIndex = localStorage.getItem("websiteIndex");
      if (websiteIndex == 'null') {
        websiteIndex = "-1";
      } else {
        closePreviousTab();
      }
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentTab = tabs[0];
        if (currentTab) {
          console.log(currentTab.url)
        }
        var newWebsiteIndex = parseInt(websiteIndex);
        openNewTab(newWebsiteIndex);
      })
    } catch (err) {
      console.log("Error");
      var websiteIndex = localStorage.getItem("websiteIndex");
      if (websiteIndex == 'null') {
        websiteIndex = "-1";
      }
      console.log(websiteIndex);
      var newWebsiteIndex = parseInt(websiteIndex);
      console.log(websiteIndex);
      openNewTab(newWebsiteIndex);
    }
  } else {
    localStorage.setItem("websiteIndex", null);
  }
});



function closePreviousTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // If it's the only tab opened i don't close nothing (TO BE FIXED)
    // if (tabs.length > 1) {
    var activeTab = tabs[0];
    if (activeTab) {
      chrome.tabs.query({ index: activeTab.index - 1 }, function (tabs) {
        var previousTab = tabs[0];
        chrome.tabs.remove(previousTab.id);
      });
    }
    // }
  });
}

function openNewTab(newWebsiteIndex) {
  // var newIndex = 0;
  // If the current url is in the list of websites, i select the next one
  // Otherwise I start from the beginning of the list

  // for (let i = 0; i < websitesList.length; i++) {
  //   if (url.includes(websitesList[i])) {
  //     newIndex = i + 1;
  //     break;
  //   }
  // }
  var newWebsiteIndex = newWebsiteIndex + 1;
  if (newWebsiteIndex < websitesList.length) {
    localStorage.setItem("websiteIndex", newWebsiteIndex);
    window.open("https://www." + websitesList[newWebsiteIndex], "_blank");
  } else {
    localStorage.setItem("websiteIndex", null);
  }
}

function initMemory() {
  let systemInfo = {};
  chrome.system.memory.getInfo(function (memoryInfo) {
    systemInfo.systemAvailableCapacity = (memoryInfo.availableCapacity / (1024 ** 3)).toFixed(2);
    systemInfo.systemCapacity = (memoryInfo.capacity / (1024 ** 3)).toFixed(2);
  });
  return systemInfo;
}

function getSystemMemoryInfo() {
  let systemInfo = {};
  if (window.navigator.deviceMemory) {
    systemInfo.systemCapacity = `${window.navigator.deviceMemory} GB`;
  } else {
    systemInfo.systemCapacity = "Information not available.";
  }

  try {
    let memory = window.performance.memory;
    systemInfo.systemAvailableCapacity = `${((memory.totalJSHeapSize - memory.usedJSHeapSize) / (1024 ** 2)).toFixed(2)} MB`;
  } catch (e) {
    systemInfo.systemAvailableCapacity = "Information not available.";
  }
  return systemInfo;
}

async function getCpuInfo() {
  return new Promise((resolve, reject) => {
    chrome.system.cpu.getInfo(function (info) {
      if (info) {
        var cpuName = info.modelName;
        var cpuArch = info.archName.replace(/_/g, '-');
        var cpuFeatures = info.features.join(' ').toUpperCase().replace(/_/g, '.') || '-';
        var cpuNumOfProcessors = info.numOfProcessors;
        var cpuProcessors = info.processors;

        let cpuInformation = { cpuName: cpuName, cpuArch: cpuArch, cpuFeatures: cpuFeatures, cpuNumOfProcessors: cpuNumOfProcessors, cpuProcessors: cpuProcessors }
        resolve(cpuInformation);
      } else {
        reject(new Error('Unable to get CPU information'));
      }
    });
  });
}
// cache eviction
browser.tabs.onRemoved.addListener(tabId => {
  localStorage.removeItem("displayData");
  browser.storage.local.get('cache').then(data => {
    if (data.cache) delete data.cache['tab' + tabId];
    browser.storage.local.set(data);
  });
});

function set(id, start, end, noacc) {

  var displayData = "";

  displayData += Math.round(start);
  displayData += ' ';
  displayData += Math.round(end - start);
  displayData += ' ';
  displayData += noacc ? '-' : Math.round(end);
  return displayData;
}

async function get(t) {

  const connection = window.navigator.connection || window.navigator.mozConnection || null;

  var systemInfo = initMemory();
  // var systemInfo = getSystemMemoryInfo();
  let cpuInformation = await getCpuInfo();

  var displayData = "";

  // https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/NavigationTiming/Overview.html#processing-model
  displayData += set('redirect', t.redirectStart, t.redirectEnd);
  displayData += ',';
  displayData += set('dns', t.domainLookupStart, t.domainLookupEnd);
  displayData += ',';
  displayData += set('connect', t.connectStart, t.connectEnd);
  displayData += ',';
  displayData += set('request', t.requestStart, t.responseStart);
  displayData += ',';
  displayData += set('response', t.responseStart, t.responseEnd);
  displayData += ',';
  displayData += set('dom', t.responseEnd, t.domComplete);
  displayData += ',';
  displayData += set('domParse', t.responseEnd, t.domInteractive);
  displayData += ',';
  displayData += set('domScripts', t.domInteractive, t.domContentLoadedEventStart);
  displayData += ',';
  displayData += set('contentLoaded', t.domContentLoadedEventStart, t.domContentLoadedEventEnd);
  displayData += ',';
  displayData += set('domSubRes', t.domContentLoadedEventEnd, t.domComplete);
  displayData += ',';
  displayData += set('load', t.loadEventStart, t.loadEventEnd);
  displayData += ',';
  displayData += connection.effectiveType;
  displayData += ',';
  displayData += connection.downlink;
  displayData += ',';
  displayData += connection.rtt;
  displayData += ',';
  displayData += systemInfo.systemCapacity;
  displayData += ',';
  displayData += systemInfo.systemAvailableCapacity;
  displayData += ',';
  displayData += JSON.stringify(cpuInformation.cpuName);
  displayData += ',';
  displayData += JSON.stringify(cpuInformation.cpuArch)
  displayData += ',';
  displayData += JSON.stringify(cpuInformation.cpuFeatures);
  displayData += ',';
  displayData += JSON.stringify(cpuInformation.cpuNumOfProcessors);
  displayData += ',';
  displayData += JSON.stringify(cpuInformation.cpuProcessors).replace(/,/g, " ");
  displayData += ',';
  displayData += new Date(t.start).toString();
  displayData += ',';
  displayData += Math.round(t.duration);
  displayData += ',';
  displayData += JSON.stringify(t.name);

  localStorage.setItem("displayData", displayData);

  saveData(displayData.split(','));
}

function saveData(displayData) {
  var data = "";
  for (let i = 0; i <= 10; i++) {
    data = data + displayData[i].split(' ')[1] + ',';
  }
  for (let i = 11; i < (displayData.length - 2); i++) {
    data = data + displayData[i] + ',';
  }
  data = data + extractDomain(displayData[displayData.length - 1]) + ';\n'

  previousData = localStorage.getItem("testData");
  if (previousData == null) {
    localStorage.setItem("testData", data)
  } else {
    localStorage.setItem("testData", previousData + data)
  }
}


// function extractDomain(url) {
//   let domain;
//   if (url.indexOf("://") > -1) {
//     domain = url.split("/")[2];
//   } else {
//     domain = url.split("/")[0];
//   }
//   domain = domain.split(":")[0];

//   return domain.split(".")
//     .slice(-2)
//     .join(".");
// }

function extractDomain(url) {
  let protocolIndex = url.indexOf("://");
  let domainIndex = url.indexOf("/", protocolIndex + 3);
  let domain = url.substring(1, domainIndex);
  return domain;
}
