
const STORAGE_KEY='travelPlannerUltimateV1';
const PORTFOLIO_KEY='travelPlannerUltimatePortfolioV15';
const themes={
 cream:{name:'奶油老書店',v:['#9a8f78','#c7b99a','#d4b36f','#b77f7d','#eee5d3','#f8f1e4','#453f36','#fffaf0']},
 rose:{name:'乾燥玫瑰',v:['#a96f75','#c49a97','#d1b177','#8e6f78','#ead9d7','#f7ece4','#493c40','#fff8f3']},
 forest:{name:'森林郵局',v:['#758875','#a5aa89','#c7aa66','#9a7166','#dde4d8','#f2ebdc','#374239','#fbf7eb']},
 sky:{name:'霧藍車票',v:['#6f8c91','#9eb0ae','#d0b471','#a47c7d','#dce6e4','#f2ecdf','#354347','#fbf7ed']},
 lavender:{name:'灰紫信紙',v:['#887c96','#afa2ad','#c8ad6e','#9d7781','#e4dce5','#f5ede1','#413b48','#fcf7ef']},
 cocoa:{name:'可可文具店',v:['#7d6657','#a68f78','#c6a461','#956b6b','#e2d6c8','#f3eadb','#44372f','#fbf4e9']},
 summer:{name:'夏日陽光',v:['#5faeb8','#8fd3c7','#f3cf67','#e98b6d','#dff3ee','#fff4cf','#34484a','#fffdf4']}
};
const destinationRules=[
 {re:/south korea|republic of korea|korea|busan|seoul|incheon|jeju|daegu|釜山|首爾|仁川|濟州|大邱|韓國|南韓/i,cc:'KR',cur:'KRW',lang:'ko',locale:'ko-KR',lname:'韓文'},
 {re:/japan|tokyo|osaka|kyoto|fukuoka|sapporo|okinawa|日本|東京|大阪|京都|福岡|札幌|沖繩/i,cc:'JP',cur:'JPY',lang:'ja',locale:'ja-JP',lname:'日文'},
 {re:/united kingdom|england|london|scotland|英國|倫敦/i,cc:'GB',cur:'GBP',lang:'en',locale:'en-GB',lname:'英文'},
 {re:/thailand|bangkok|chiang mai|phuket|泰國|曼谷|清邁|普吉/i,cc:'TH',cur:'THB',lang:'th',locale:'th-TH',lname:'泰文'},
 {re:/vietnam|hanoi|ho chi minh|da nang|越南|河內|胡志明|峴港/i,cc:'VN',cur:'VND',lang:'vi',locale:'vi-VN',lname:'越南文'},
 {re:/singapore|新加坡/i,cc:'SG',cur:'SGD',lang:'en',locale:'en-SG',lname:'英文'},
 {re:/france|paris|法國|巴黎/i,cc:'FR',cur:'EUR',lang:'fr',locale:'fr-FR',lname:'法文'},
 {re:/italy|rome|milan|義大利|羅馬|米蘭/i,cc:'IT',cur:'EUR',lang:'it',locale:'it-IT',lname:'義大利文'},
 {re:/spain|barcelona|madrid|西班牙|巴塞隆納|馬德里/i,cc:'ES',cur:'EUR',lang:'es',locale:'es-ES',lname:'西班牙文'},
 {re:/united states|usa|new york|los angeles|美國|紐約|洛杉磯/i,cc:'US',cur:'USD',lang:'en',locale:'en-US',lname:'英文'}
];
const checklistDefaults=[
 ['證件與預訂','護照／身分證'],['證件與預訂','檢查護照效期'],['證件與預訂','機票與訂房確認單'],['證件與預訂','簽證或入境許可'],['證件與預訂','旅遊保險'],
 ['金錢與連線','現金與信用卡'],['金錢與連線','網卡／eSIM'],['金錢與連線','行動電源與充電線'],['金錢與連線','轉接插頭'],
 ['行李與健康','常備藥品'],['行李與健康','盥洗用品'],['行李與健康','換洗衣物'],['行李與健康','外套／雨具'],['行李與健康','舒適好走的鞋'],
 ['交通與安全','交通票券'],['交通與安全','景點門票／預約資料'],['交通與安全','下載離線地圖'],['交通與安全','緊急聯絡資訊'],['交通與安全','確認行李重量限制'],['交通與安全','家中水電與門窗確認']
];
const phrases=[
 ['基本','你好。'],['基本','謝謝。'],['基本','不好意思。'],['基本','再見。'],['基本','請說慢一點。'],
 ['機場','請問報到櫃檯在哪裡？'],['機場','我的航班延誤了嗎？'],['機場','登機門在哪裡？'],['機場','我的行李不見了。'],['機場','這是我的護照。'],
 ['交通','請問車站在哪裡？'],['交通','我要去這個地方。'],['交通','這班車有到目的地嗎？'],['交通','要在哪一站下車？'],['交通','請幫我叫計程車。'],['交通','下一班車幾點？'],['交通','可以幫我看一下路線嗎？'],['交通','我要買一張票。'],['交通','這裡可以使用交通卡嗎？'],['交通','請在這裡停車。'],
 ['餐廳','請給我菜單。'],['餐廳','兩位。'],['餐廳','請不要辣。'],['餐廳','請給我一杯水。'],['餐廳','請幫我結帳。'],['餐廳','有推薦的料理嗎？'],['餐廳','我對堅果過敏。'],['餐廳','這道菜有豬肉嗎？'],['餐廳','可以外帶嗎？'],['餐廳','請不要加香菜。'],
 ['購物','這個多少錢？'],['購物','可以刷卡嗎？'],['購物','可以退稅嗎？'],['購物','有其他尺寸嗎？'],['購物','有其他顏色嗎？'],['購物','可以試穿嗎？'],['購物','請給我一個袋子。'],['購物','可以便宜一點嗎？'],['購物','我只是看看。'],['購物','可以幫我包裝嗎？'],
 ['住宿','我有預訂。'],['住宿','可以先寄放行李嗎？'],['住宿','早餐幾點開始？'],['住宿','房間的冷氣壞了。'],['住宿','可以延後退房嗎？'],
 ['求助','請問洗手間在哪裡？'],['求助','我聽不懂。'],['求助','請幫幫我。'],['求助','我迷路了。'],['求助','請幫我叫救護車。']
];
const stationPresets=[
 {name:'高鐵台北站',aliases:['台北高鐵站','高鐵台北','THSR Taipei'],address:'台灣台北市中正區北平西路3號',lat:25.04775,lon:121.51706,country:'TW'},
 {name:'高鐵板橋站',aliases:['板橋高鐵站','高鐵板橋'],address:'台灣新北市板橋區縣民大道二段7號',lat:25.01415,lon:121.46374,country:'TW'},
 {name:'高鐵桃園站',aliases:['桃園高鐵站','高鐵桃園','THSR Taoyuan'],address:'台灣桃園市中壢區高鐵北路一段6號',lat:25.01317,lon:121.21401,country:'TW'},
 {name:'高鐵新竹站',aliases:['新竹高鐵站','高鐵新竹'],address:'台灣新竹縣竹北市高鐵七路6號',lat:24.80810,lon:121.04027,country:'TW'},
 {name:'高鐵苗栗站',aliases:['苗栗高鐵站','高鐵苗栗'],address:'台灣苗栗縣後龍鎮高鐵三路268號',lat:24.60534,lon:120.82547,country:'TW'},
 {name:'高鐵台中站',aliases:['台中高鐵站','高鐵台中','THSR Taichung'],address:'台灣台中市烏日區站區二路8號',lat:24.11272,lon:120.61572,country:'TW'},
 {name:'高鐵彰化站',aliases:['彰化高鐵站','高鐵彰化'],address:'台灣彰化縣田中鎮站區路二段99號',lat:23.87436,lon:120.57462,country:'TW'},
 {name:'高鐵雲林站',aliases:['雲林高鐵站','高鐵雲林'],address:'台灣雲林縣虎尾鎮站前東路301號',lat:23.73613,lon:120.41642,country:'TW'},
 {name:'高鐵嘉義站',aliases:['嘉義高鐵站','高鐵嘉義'],address:'台灣嘉義縣太保市高鐵西路168號',lat:23.45950,lon:120.32318,country:'TW'},
 {name:'高鐵台南站',aliases:['台南高鐵站','高鐵台南'],address:'台灣台南市歸仁區歸仁大道100號',lat:22.92491,lon:120.28606,country:'TW'},
 {name:'高鐵左營站',aliases:['左營高鐵站','高鐵左營','高鐵高雄'],address:'台灣高雄市左營區高鐵路105號',lat:22.68772,lon:120.30909,country:'TW'},
 {name:'機場捷運 A1 台北車站',aliases:['A1台北車站','機捷台北車站'],address:'台灣台北市中正區鄭州路8號',lat:25.04802,lon:121.51464,country:'TW'},
 {name:'機場捷運 A3 新北產業園區站',aliases:['A3新北產業園區','機捷A3'],address:'台灣新北市新莊區五工路37號',lat:25.06182,lon:121.45992,country:'TW'},
 {name:'機場捷運 A8 長庚醫院站',aliases:['A8長庚醫院','機捷A8'],address:'台灣桃園市龜山區文化一路6號',lat:25.06057,lon:121.37079,country:'TW'},
 {name:'機場捷運 A12 機場第一航廈站',aliases:['A12第一航廈','桃園機場第一航廈','TPE T1'],address:'台灣桃園市大園區航站南路17之1號',lat:25.08167,lon:121.23791,country:'TW'},
 {name:'機場捷運 A13 機場第二航廈站',aliases:['A13第二航廈','桃園機場第二航廈','TPE T2'],address:'台灣桃園市大園區航站南路9號',lat:25.07755,lon:121.23224,country:'TW'},
 {name:'機場捷運 A18 高鐵桃園站',aliases:['A18高鐵桃園','機捷高鐵桃園'],address:'台灣桃園市中壢區高鐵北路一段5號',lat:25.01345,lon:121.21425,country:'TW'},
 {name:'釜山站',aliases:['Busan Station','부산역'],address:'대한민국 부산광역시 동구 중앙대로 206',lat:35.11516,lon:129.04143,country:'KR'},
 {name:'海雲台站',aliases:['Haeundae Station','해운대역'],address:'대한민국 부산광역시 해운대구 해운대로 626',lat:35.16370,lon:129.15875,country:'KR'},
 {name:'南浦站',aliases:['Nampo Station','남포역'],address:'대한민국 부산광역시 중구 구덕로 지하 12',lat:35.09785,lon:129.03473,country:'KR'}
];
const busanMetroStations=[{"name":"多大浦海水浴場站","aliases":["多大浦海水浴場","多大浦海水浴場站","다대포해수욕장","다대포해수욕장","다대포해수욕장역","Dadaepo Beach","Dadaepo Beach Station"],"address":"韓國釜山都市鐵道 1號線・다대포해수욕장역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"다대포해수욕장","en":"Dadaepo Beach"},{"name":"多大浦港站","aliases":["多大浦港","多大浦港站","다대포항","다대포항","다대포항역","Dadaepo Harbor","Dadaepo Harbor Station"],"address":"韓國釜山都市鐵道 1號線・다대포항역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"다대포항","en":"Dadaepo Harbor"},{"name":"納介站","aliases":["納介","納介站","낫개","낫개","낫개역","Natgae","Natgae Station"],"address":"韓國釜山都市鐵道 1號線・낫개역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"낫개","en":"Natgae"},{"name":"新長林站","aliases":["新長林","新長林站","신장림","신장림","신장림역","Sinjangnim","Sinjangnim Station"],"address":"韓國釜山都市鐵道 1號線・신장림역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"신장림","en":"Sinjangnim"},{"name":"長林站","aliases":["長林","長林站","장림","장림","장림역","Jangnim","Jangnim Station"],"address":"韓國釜山都市鐵道 1號線・장림역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"장림","en":"Jangnim"},{"name":"東梅站","aliases":["東梅","東梅站","동매","동매","동매역","Dongmae","Dongmae Station"],"address":"韓國釜山都市鐵道 1號線・동매역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"동매","en":"Dongmae"},{"name":"新平站","aliases":["新平","新平站","신평","신평","신평역","Sinpyeong","Sinpyeong Station"],"address":"韓國釜山都市鐵道 1號線・신평역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"신평","en":"Sinpyeong"},{"name":"下端站","aliases":["下端","下端站","하단","하단","하단역","Hadan","Hadan Station"],"address":"韓國釜山都市鐵道 1號線・하단역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"하단","en":"Hadan"},{"name":"堂里站","aliases":["堂里","堂里站","당리","당리","당리역","Dangni","Dangni Station"],"address":"韓國釜山都市鐵道 1號線・당리역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"당리","en":"Dangni"},{"name":"沙下站","aliases":["沙下","沙下站","사하","사하","사하역","Saha","Saha Station"],"address":"韓國釜山都市鐵道 1號線・사하역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"사하","en":"Saha"},{"name":"槐亭站","aliases":["槐亭","槐亭站","괴정","괴정","괴정역","Goejeong","Goejeong Station"],"address":"韓國釜山都市鐵道 1號線・괴정역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"괴정","en":"Goejeong"},{"name":"大峙站","aliases":["大峙","大峙站","대티","대티","대티역","Daeti","Daeti Station"],"address":"韓國釜山都市鐵道 1號線・대티역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"대티","en":"Daeti"},{"name":"西大新站","aliases":["西大新","西大新站","서대신","서대신","서대신역","Seodaesin","Seodaesin Station"],"address":"韓國釜山都市鐵道 1號線・서대신역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"서대신","en":"Seodaesin"},{"name":"東大新站","aliases":["東大新","東大新站","동대신","동대신","동대신역","Dongdaesin","Dongdaesin Station"],"address":"韓國釜山都市鐵道 1號線・동대신역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"동대신","en":"Dongdaesin"},{"name":"土城站","aliases":["土城","土城站","토성","토성","토성역","Toseong","Toseong Station"],"address":"韓國釜山都市鐵道 1號線・토성역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"토성","en":"Toseong"},{"name":"札嘎其站","aliases":["札嘎其","札嘎其站","자갈치","자갈치","자갈치역","Jagalchi","Jagalchi Station"],"address":"韓國釜山都市鐵道 1號線・자갈치역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"자갈치","en":"Jagalchi"},{"name":"南浦站","aliases":["南浦","南浦站","남포","남포","남포역","Nampo","Nampo Station"],"address":"韓國釜山都市鐵道 1號線・남포역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"남포","en":"Nampo"},{"name":"中央站","aliases":["中央","中央站","중앙","중앙","중앙역","Jungang","Jungang Station"],"address":"韓國釜山都市鐵道 1號線・중앙역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"중앙","en":"Jungang"},{"name":"釜山站站","aliases":["釜山站","釜山站站","부산역","부산","부산역역","Busan Station","Busan Station Station"],"address":"韓國釜山都市鐵道 1號線・부산역역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"부산역","en":"Busan Station"},{"name":"草梁站","aliases":["草梁","草梁站","초량","초량","초량역","Choryang","Choryang Station"],"address":"韓國釜山都市鐵道 1號線・초량역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"초량","en":"Choryang"},{"name":"釜山鎮站","aliases":["釜山鎮","釜山鎮站","부산진","부산진","부산진역","Busanjin","Busanjin Station"],"address":"韓國釜山都市鐵道 1號線・부산진역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"부산진","en":"Busanjin"},{"name":"佐川站","aliases":["佐川","佐川站","좌천","좌천","좌천역","Jwacheon","Jwacheon Station"],"address":"韓國釜山都市鐵道 1號線・좌천역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"좌천","en":"Jwacheon"},{"name":"凡一站","aliases":["凡一","凡一站","범일","범일","범일역","Beomil","Beomil Station"],"address":"韓國釜山都市鐵道 1號線・범일역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"범일","en":"Beomil"},{"name":"凡內谷站","aliases":["凡內谷","凡內谷站","범내골","범내골","범내골역","Beomnaegol","Beomnaegol Station"],"address":"韓國釜山都市鐵道 1號線・범내골역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"범내골","en":"Beomnaegol"},{"name":"西面站","aliases":["西面","西面站","서면","서면","서면역","Seomyeon","Seomyeon Station"],"address":"韓國釜山都市鐵道 1號線・서면역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"서면","en":"Seomyeon"},{"name":"釜田站","aliases":["釜田","釜田站","부전","부전","부전역","Bujeon","Bujeon Station"],"address":"韓國釜山都市鐵道 1號線・부전역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"부전","en":"Bujeon"},{"name":"楊亭站","aliases":["楊亭","楊亭站","양정","양정","양정역","Yangjeong","Yangjeong Station"],"address":"韓國釜山都市鐵道 1號線・양정역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"양정","en":"Yangjeong"},{"name":"市廳站","aliases":["市廳","市廳站","시청","시청","시청역","City Hall","City Hall Station"],"address":"韓國釜山都市鐵道 1號線・시청역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"시청","en":"City Hall"},{"name":"蓮山站","aliases":["蓮山","蓮山站","연산","연산","연산역","Yeonsan","Yeonsan Station"],"address":"韓國釜山都市鐵道 1號線・연산역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"연산","en":"Yeonsan"},{"name":"教大站","aliases":["教大","教大站","교대","교대","교대역","Busan Nat'l Univ. of Education","Busan Nat'l Univ. of Education Station"],"address":"韓國釜山都市鐵道 1號線・교대역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"교대","en":"Busan Nat'l Univ. of Education"},{"name":"東萊站","aliases":["東萊","東萊站","동래","동래","동래역","Dongnae","Dongnae Station"],"address":"韓國釜山都市鐵道 1號線・동래역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"동래","en":"Dongnae"},{"name":"明倫站","aliases":["明倫","明倫站","명륜","명륜","명륜역","Myeongnyun","Myeongnyun Station"],"address":"韓國釜山都市鐵道 1號線・명륜역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"명륜","en":"Myeongnyun"},{"name":"溫泉場站","aliases":["溫泉場","溫泉場站","온천장","온천장","온천장역","Oncheonjang","Oncheonjang Station"],"address":"韓國釜山都市鐵道 1號線・온천장역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"온천장","en":"Oncheonjang"},{"name":"釜山大學站","aliases":["釜山大學","釜山大學站","부산대","부산대","부산대역","Pusan Nat'l Univ.","Pusan Nat'l Univ. Station"],"address":"韓國釜山都市鐵道 1號線・부산대역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"부산대","en":"Pusan Nat'l Univ."},{"name":"長箭站","aliases":["長箭","長箭站","장전","장전","장전역","Jangjeon","Jangjeon Station"],"address":"韓國釜山都市鐵道 1號線・장전역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"장전","en":"Jangjeon"},{"name":"久瑞站","aliases":["久瑞","久瑞站","구서","구서","구서역","Guseo","Guseo Station"],"address":"韓國釜山都市鐵道 1號線・구서역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"구서","en":"Guseo"},{"name":"斗實站","aliases":["斗實","斗實站","두실","두실","두실역","Dusil","Dusil Station"],"address":"韓國釜山都市鐵道 1號線・두실역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"두실","en":"Dusil"},{"name":"南山站","aliases":["南山","南山站","남산","남산","남산역","Namsan","Namsan Station"],"address":"韓國釜山都市鐵道 1號線・남산역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"남산","en":"Namsan"},{"name":"梵魚寺站","aliases":["梵魚寺","梵魚寺站","범어사","범어사","범어사역","Beomeosa","Beomeosa Station"],"address":"韓國釜山都市鐵道 1號線・범어사역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"범어사","en":"Beomeosa"},{"name":"老圃站","aliases":["老圃","老圃站","노포","노포","노포역","Nopo","Nopo Station"],"address":"韓國釜山都市鐵道 1號線・노포역","lat":null,"lon":null,"country":"KR","station":true,"line":"1號線","ko":"노포","en":"Nopo"},{"name":"萇山站","aliases":["萇山","萇山站","장산","장산","장산역","Jangsan","Jangsan Station"],"address":"韓國釜山都市鐵道 2號線・장산역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"장산","en":"Jangsan"},{"name":"中洞站","aliases":["中洞","中洞站","중동","중동","중동역","Jung-dong","Jung-dong Station"],"address":"韓國釜山都市鐵道 2號線・중동역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"중동","en":"Jung-dong"},{"name":"海雲台站","aliases":["海雲台","海雲台站","해운대","해운대","해운대역","Haeundae","Haeundae Station"],"address":"韓國釜山都市鐵道 2號線・해운대역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"해운대","en":"Haeundae"},{"name":"冬柏站","aliases":["冬柏","冬柏站","동백","동백","동백역","Dongbaek","Dongbaek Station"],"address":"韓國釜山都市鐵道 2號線・동백역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"동백","en":"Dongbaek"},{"name":"BEXCO站","aliases":["BEXCO","BEXCO站","벡스코","벡스코","벡스코역","BEXCO","BEXCO Station"],"address":"韓國釜山都市鐵道 2號線・벡스코역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"벡스코","en":"BEXCO"},{"name":"Centum City站","aliases":["Centum City","Centum City站","센텀시티","센텀시티","센텀시티역","Centum City","Centum City Station"],"address":"韓國釜山都市鐵道 2號線・센텀시티역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"센텀시티","en":"Centum City"},{"name":"民樂站","aliases":["民樂","民樂站","민락","민락","민락역","Millak","Millak Station"],"address":"韓國釜山都市鐵道 2號線・민락역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"민락","en":"Millak"},{"name":"水營站","aliases":["水營","水營站","수영","수영","수영역","Suyeong","Suyeong Station"],"address":"韓國釜山都市鐵道 2號線・수영역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"수영","en":"Suyeong"},{"name":"廣安站","aliases":["廣安","廣安站","광안","광안","광안역","Gwangan","Gwangan Station"],"address":"韓國釜山都市鐵道 2號線・광안역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"광안","en":"Gwangan"},{"name":"金蓮山站","aliases":["金蓮山","金蓮山站","금련산","금련산","금련산역","Geumnyeonsan","Geumnyeonsan Station"],"address":"韓國釜山都市鐵道 2號線・금련산역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"금련산","en":"Geumnyeonsan"},{"name":"南川站","aliases":["南川","南川站","남천","남천","남천역","Namcheon","Namcheon Station"],"address":"韓國釜山都市鐵道 2號線・남천역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"남천","en":"Namcheon"},{"name":"慶星大·釜慶大站","aliases":["慶星大·釜慶大","慶星大·釜慶大站","경성대·부경대","경성대·부경대","경성대·부경대역","Kyungsung Univ.·Pukyong Nat'l Univ.","Kyungsung Univ.·Pukyong Nat'l Univ. Station"],"address":"韓國釜山都市鐵道 2號線・경성대·부경대역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"경성대·부경대","en":"Kyungsung Univ.·Pukyong Nat'l Univ."},{"name":"大淵站","aliases":["大淵","大淵站","대연","대연","대연역","Daeyeon","Daeyeon Station"],"address":"韓國釜山都市鐵道 2號線・대연역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"대연","en":"Daeyeon"},{"name":"池谷站","aliases":["池谷","池谷站","못골","못골","못골역","Motgol","Motgol Station"],"address":"韓國釜山都市鐵道 2號線・못골역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"못골","en":"Motgol"},{"name":"支架谷站","aliases":["支架谷","支架谷站","지게골","지게골","지게골역","Jigegol","Jigegol Station"],"address":"韓國釜山都市鐵道 2號線・지게골역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"지게골","en":"Jigegol"},{"name":"門峴站","aliases":["門峴","門峴站","문현","문현","문현역","Munhyeon","Munhyeon Station"],"address":"韓國釜山都市鐵道 2號線・문현역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"문현","en":"Munhyeon"},{"name":"國際金融中心·釜山銀行站","aliases":["國際金融中心·釜山銀行","國際金融中心·釜山銀行站","국제금융센터·부산은행","국제금융센터·부산은행","국제금융센터·부산은행역","Busan Int'l Finance Center·Busan Bank","Busan Int'l Finance Center·Busan Bank Station"],"address":"韓國釜山都市鐵道 2號線・국제금융센터·부산은행역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"국제금융센터·부산은행","en":"Busan Int'l Finance Center·Busan Bank"},{"name":"田浦站","aliases":["田浦","田浦站","전포","전포","전포역","Jeonpo","Jeonpo Station"],"address":"韓國釜山都市鐵道 2號線・전포역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"전포","en":"Jeonpo"},{"name":"西面站","aliases":["西面","西面站","서면","서면","서면역","Seomyeon","Seomyeon Station"],"address":"韓國釜山都市鐵道 2號線・서면역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"서면","en":"Seomyeon"},{"name":"釜岩站","aliases":["釜岩","釜岩站","부암","부암","부암역","Buam","Buam Station"],"address":"韓國釜山都市鐵道 2號線・부암역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"부암","en":"Buam"},{"name":"伽倻站","aliases":["伽倻","伽倻站","가야","가야","가야역","Gaya","Gaya Station"],"address":"韓國釜山都市鐵道 2號線・가야역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"가야","en":"Gaya"},{"name":"東義大站","aliases":["東義大","東義大站","동의대","동의대","동의대역","Dong-eui Univ.","Dong-eui Univ. Station"],"address":"韓國釜山都市鐵道 2號線・동의대역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"동의대","en":"Dong-eui Univ."},{"name":"開琴站","aliases":["開琴","開琴站","개금","개금","개금역","Gaegeum","Gaegeum Station"],"address":"韓國釜山都市鐵道 2號線・개금역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"개금","en":"Gaegeum"},{"name":"冷井站","aliases":["冷井","冷井站","냉정","냉정","냉정역","Naengjeong","Naengjeong Station"],"address":"韓國釜山都市鐵道 2號線・냉정역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"냉정","en":"Naengjeong"},{"name":"周禮站","aliases":["周禮","周禮站","주례","주례","주례역","Jurye","Jurye Station"],"address":"韓國釜山都市鐵道 2號線・주례역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"주례","en":"Jurye"},{"name":"甘田站","aliases":["甘田","甘田站","감전","감전","감전역","Gamjeon","Gamjeon Station"],"address":"韓國釜山都市鐵道 2號線・감전역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"감전","en":"Gamjeon"},{"name":"沙上站","aliases":["沙上","沙上站","사상","사상","사상역","Sasang","Sasang Station"],"address":"韓國釜山都市鐵道 2號線・사상역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"사상","en":"Sasang"},{"name":"德浦站","aliases":["德浦","德浦站","덕포","덕포","덕포역","Deokpo","Deokpo Station"],"address":"韓國釜山都市鐵道 2號線・덕포역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"덕포","en":"Deokpo"},{"name":"毛德站","aliases":["毛德","毛德站","모덕","모덕","모덕역","Modeok","Modeok Station"],"address":"韓國釜山都市鐵道 2號線・모덕역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"모덕","en":"Modeok"},{"name":"毛羅站","aliases":["毛羅","毛羅站","모라","모라","모라역","Mora","Mora Station"],"address":"韓國釜山都市鐵道 2號線・모라역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"모라","en":"Mora"},{"name":"龜明站","aliases":["龜明","龜明站","구명","구명","구명역","Gumyeong","Gumyeong Station"],"address":"韓國釜山都市鐵道 2號線・구명역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"구명","en":"Gumyeong"},{"name":"龜南站","aliases":["龜南","龜南站","구남","구남","구남역","Gunam","Gunam Station"],"address":"韓國釜山都市鐵道 2號線・구남역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"구남","en":"Gunam"},{"name":"德川站","aliases":["德川","德川站","덕천","덕천","덕천역","Deokcheon","Deokcheon Station"],"address":"韓國釜山都市鐵道 2號線・덕천역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"덕천","en":"Deokcheon"},{"name":"水亭站","aliases":["水亭","水亭站","수정","수정","수정역","Sujeong","Sujeong Station"],"address":"韓國釜山都市鐵道 2號線・수정역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"수정","en":"Sujeong"},{"name":"華明站","aliases":["華明","華明站","화명","화명","화명역","Hwamyeong","Hwamyeong Station"],"address":"韓國釜山都市鐵道 2號線・화명역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"화명","en":"Hwamyeong"},{"name":"栗里站","aliases":["栗里","栗里站","율리","율리","율리역","Yulli","Yulli Station"],"address":"韓國釜山都市鐵道 2號線・율리역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"율리","en":"Yulli"},{"name":"東院站","aliases":["東院","東院站","동원","동원","동원역","Dongwon","Dongwon Station"],"address":"韓國釜山都市鐵道 2號線・동원역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"동원","en":"Dongwon"},{"name":"金谷站","aliases":["金谷","金谷站","금곡","금곡","금곡역","Geumgok","Geumgok Station"],"address":"韓國釜山都市鐵道 2號線・금곡역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"금곡","en":"Geumgok"},{"name":"湖浦站","aliases":["湖浦","湖浦站","호포","호포","호포역","Hopo","Hopo Station"],"address":"韓國釜山都市鐵道 2號線・호포역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"호포","en":"Hopo"},{"name":"甑山站","aliases":["甑山","甑山站","증산","증산","증산역","Jeungsan","Jeungsan Station"],"address":"韓國釜山都市鐵道 2號線・증산역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"증산","en":"Jeungsan"},{"name":"釜山大梁山校區站","aliases":["釜山大梁山校區","釜山大梁山校區站","부산대양산캠퍼스","부산대양산캠퍼스","부산대양산캠퍼스역","Pusan Nat'l Univ. Yangsan Campus","Pusan Nat'l Univ. Yangsan Campus Station"],"address":"韓國釜山都市鐵道 2號線・부산대양산캠퍼스역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"부산대양산캠퍼스","en":"Pusan Nat'l Univ. Yangsan Campus"},{"name":"南梁山站","aliases":["南梁山","南梁山站","남양산","남양산","남양산역","Namyangsan","Namyangsan Station"],"address":"韓國釜山都市鐵道 2號線・남양산역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"남양산","en":"Namyangsan"},{"name":"梁山站","aliases":["梁山","梁山站","양산","양산","양산역","Yangsan","Yangsan Station"],"address":"韓國釜山都市鐵道 2號線・양산역","lat":null,"lon":null,"country":"KR","station":true,"line":"2號線","ko":"양산","en":"Yangsan"},{"name":"水營站","aliases":["水營","水營站","수영","수영","수영역","Suyeong","Suyeong Station"],"address":"韓國釜山都市鐵道 3號線・수영역","lat":null,"lon":null,"country":"KR","station":true,"line":"3號線","ko":"수영","en":"Suyeong"},{"name":"望美站","aliases":["望美","望美站","망미","망미","망미역","Mangmi","Mangmi Station"],"address":"韓國釜山都市鐵道 3號線・망미역","lat":null,"lon":null,"country":"KR","station":true,"line":"3號線","ko":"망미","en":"Mangmi"},{"name":"盃山站","aliases":["盃山","盃山站","배산","배산","배산역","Baesan","Baesan Station"],"address":"韓國釜山都市鐵道 3號線・배산역","lat":null,"lon":null,"country":"KR","station":true,"line":"3號線","ko":"배산","en":"Baesan"},{"name":"水滿谷站","aliases":["水滿谷","水滿谷站","물만골","물만골","물만골역","Mulmangol","Mulmangol Station"],"address":"韓國釜山都市鐵道 3號線・물만골역","lat":null,"lon":null,"country":"KR","station":true,"line":"3號線","ko":"물만골","en":"Mulmangol"},{"name":"蓮山站","aliases":["蓮山","蓮山站","연산","연산","연산역","Yeonsan","Yeonsan Station"],"address":"韓國釜山都市鐵道 3號線・연산역","lat":null,"lon":null,"country":"KR","station":true,"line":"3號線","ko":"연산","en":"Yeonsan"},{"name":"巨堤站","aliases":["巨堤","巨堤站","거제","거제","거제역","Geoje","Geoje Station"],"address":"韓國釜山都市鐵道 3號線・거제역","lat":null,"lon":null,"country":"KR","station":true,"line":"3號線","ko":"거제","en":"Geoje"},{"name":"綜合運動場站","aliases":["綜合運動場","綜合運動場站","종합운동장","종합운동장","종합운동장역","Sports Complex","Sports Complex Station"],"address":"韓國釜山都市鐵道 3號線・종합운동장역","lat":null,"lon":null,"country":"KR","station":true,"line":"3號線","ko":"종합운동장","en":"Sports Complex"},{"name":"社稷站","aliases":["社稷","社稷站","사직","사직","사직역","Sajik","Sajik Station"],"address":"韓國釜山都市鐵道 3號線・사직역","lat":null,"lon":null,"country":"KR","station":true,"line":"3號線","ko":"사직","en":"Sajik"},{"name":"美南站","aliases":["美南","美南站","미남","미남","미남역","Minam","Minam Station"],"address":"韓國釜山都市鐵道 3號線・미남역","lat":null,"lon":null,"country":"KR","station":true,"line":"3號線","ko":"미남","en":"Minam"},{"name":"萬德站","aliases":["萬德","萬德站","만덕","만덕","만덕역","Mandeok","Mandeok Station"],"address":"韓國釜山都市鐵道 3號線・만덕역","lat":null,"lon":null,"country":"KR","station":true,"line":"3號線","ko":"만덕","en":"Mandeok"},{"name":"南山亭站","aliases":["南山亭","南山亭站","남산정","남산정","남산정역","Namsanjeong","Namsanjeong Station"],"address":"韓國釜山都市鐵道 3號線・남산정역","lat":null,"lon":null,"country":"KR","station":true,"line":"3號線","ko":"남산정","en":"Namsanjeong"},{"name":"淑嶝站","aliases":["淑嶝","淑嶝站","숙등","숙등","숙등역","Sukdeung","Sukdeung Station"],"address":"韓國釜山都市鐵道 3號線・숙등역","lat":null,"lon":null,"country":"KR","station":true,"line":"3號線","ko":"숙등","en":"Sukdeung"},{"name":"德川站","aliases":["德川","德川站","덕천","덕천","덕천역","Deokcheon","Deokcheon Station"],"address":"韓國釜山都市鐵道 3號線・덕천역","lat":null,"lon":null,"country":"KR","station":true,"line":"3號線","ko":"덕천","en":"Deokcheon"},{"name":"龜浦站","aliases":["龜浦","龜浦站","구포","구포","구포역","Gupo","Gupo Station"],"address":"韓國釜山都市鐵道 3號線・구포역","lat":null,"lon":null,"country":"KR","station":true,"line":"3號線","ko":"구포","en":"Gupo"},{"name":"江西區廳站","aliases":["江西區廳","江西區廳站","강서구청","강서구청","강서구청역","Gangseo-gu Office","Gangseo-gu Office Station"],"address":"韓國釜山都市鐵道 3號線・강서구청역","lat":null,"lon":null,"country":"KR","station":true,"line":"3號線","ko":"강서구청","en":"Gangseo-gu Office"},{"name":"體育公園站","aliases":["體育公園","體育公園站","체육공원","체육공원","체육공원역","Sports Park","Sports Park Station"],"address":"韓國釜山都市鐵道 3號線・체육공원역","lat":null,"lon":null,"country":"KR","station":true,"line":"3號線","ko":"체육공원","en":"Sports Park"},{"name":"大渚站","aliases":["大渚","大渚站","대저","대저","대저역","Daejeo","Daejeo Station"],"address":"韓國釜山都市鐵道 3號線・대저역","lat":null,"lon":null,"country":"KR","station":true,"line":"3號線","ko":"대저","en":"Daejeo"},{"name":"美南站","aliases":["美南","美南站","미남","미남","미남역","Minam","Minam Station"],"address":"韓國釜山都市鐵道 4號線・미남역","lat":null,"lon":null,"country":"KR","station":true,"line":"4號線","ko":"미남","en":"Minam"},{"name":"東萊站","aliases":["東萊","東萊站","동래","동래","동래역","Dongnae","Dongnae Station"],"address":"韓國釜山都市鐵道 4號線・동래역","lat":null,"lon":null,"country":"KR","station":true,"line":"4號線","ko":"동래","en":"Dongnae"},{"name":"壽安站","aliases":["壽安","壽安站","수안","수안","수안역","Suan","Suan Station"],"address":"韓國釜山都市鐵道 4號線・수안역","lat":null,"lon":null,"country":"KR","station":true,"line":"4號線","ko":"수안","en":"Suan"},{"name":"樂民站","aliases":["樂民","樂民站","낙민","낙민","낙민역","Nakmin","Nakmin Station"],"address":"韓國釜山都市鐵道 4號線・낙민역","lat":null,"lon":null,"country":"KR","station":true,"line":"4號線","ko":"낙민","en":"Nakmin"},{"name":"忠烈祠站","aliases":["忠烈祠","忠烈祠站","충렬사","충렬사","충렬사역","Chungnyeolsa","Chungnyeolsa Station"],"address":"韓國釜山都市鐵道 4號線・충렬사역","lat":null,"lon":null,"country":"KR","station":true,"line":"4號線","ko":"충렬사","en":"Chungnyeolsa"},{"name":"鳴藏站","aliases":["鳴藏","鳴藏站","명장","명장","명장역","Myeongjang","Myeongjang Station"],"address":"韓國釜山都市鐵道 4號線・명장역","lat":null,"lon":null,"country":"KR","station":true,"line":"4號線","ko":"명장","en":"Myeongjang"},{"name":"書洞站","aliases":["書洞","書洞站","서동","서동","서동역","Seodong","Seodong Station"],"address":"韓國釜山都市鐵道 4號線・서동역","lat":null,"lon":null,"country":"KR","station":true,"line":"4號線","ko":"서동","en":"Seodong"},{"name":"錦絲站","aliases":["錦絲","錦絲站","금사","금사","금사역","Geumsa","Geumsa Station"],"address":"韓國釜山都市鐵道 4號線・금사역","lat":null,"lon":null,"country":"KR","station":true,"line":"4號線","ko":"금사","en":"Geumsa"},{"name":"盤如農產品市場站","aliases":["盤如農產品市場","盤如農產品市場站","반여농산물시장","반여농산물시장","반여농산물시장역","Banyeo Agricultural Market","Banyeo Agricultural Market Station"],"address":"韓國釜山都市鐵道 4號線・반여농산물시장역","lat":null,"lon":null,"country":"KR","station":true,"line":"4號線","ko":"반여농산물시장","en":"Banyeo Agricultural Market"},{"name":"石坮站","aliases":["石坮","石坮站","석대","석대","석대역","Seokdae","Seokdae Station"],"address":"韓國釜山都市鐵道 4號線・석대역","lat":null,"lon":null,"country":"KR","station":true,"line":"4號線","ko":"석대","en":"Seokdae"},{"name":"靈山大站","aliases":["靈山大","靈山大站","영산대","영산대","영산대역","Youngsan Univ.","Youngsan Univ. Station"],"address":"韓國釜山都市鐵道 4號線・영산대역","lat":null,"lon":null,"country":"KR","station":true,"line":"4號線","ko":"영산대","en":"Youngsan Univ."},{"name":"東釜山大學站","aliases":["東釜山大學","東釜山大學站","동부산대학","동부산대학","동부산대학역","Dong-Pusan College","Dong-Pusan College Station"],"address":"韓國釜山都市鐵道 4號線・동부산대학역","lat":null,"lon":null,"country":"KR","station":true,"line":"4號線","ko":"동부산대학","en":"Dong-Pusan College"},{"name":"古村站","aliases":["古村","古村站","고촌","고촌","고촌역","Gochon","Gochon Station"],"address":"韓國釜山都市鐵道 4號線・고촌역","lat":null,"lon":null,"country":"KR","station":true,"line":"4號線","ko":"고촌","en":"Gochon"},{"name":"安平站","aliases":["安平","安平站","안평","안평","안평역","Anpyeong","Anpyeong Station"],"address":"韓國釜山都市鐵道 4號線・안평역","lat":null,"lon":null,"country":"KR","station":true,"line":"4號線","ko":"안평","en":"Anpyeong"},{"name":"沙上站","aliases":["沙上","沙上站","사상","사상","사상역","Sasang","Sasang Station"],"address":"韓國釜山都市鐵道 金海輕軌・사상역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"사상","en":"Sasang"},{"name":"掛法 Renecite站","aliases":["掛法 Renecite","掛法 Renecite站","괘법르네시떼","괘법르네시떼","괘법르네시떼역","Gwaebeop Renecite","Gwaebeop Renecite Station"],"address":"韓國釜山都市鐵道 金海輕軌・괘법르네시떼역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"괘법르네시떼","en":"Gwaebeop Renecite"},{"name":"西釜山流通地區站","aliases":["西釜山流通地區","西釜山流通地區站","서부산유통지구","서부산유통지구","서부산유통지구역","Seobusan Yutongjigu","Seobusan Yutongjigu Station"],"address":"韓國釜山都市鐵道 金海輕軌・서부산유통지구역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"서부산유통지구","en":"Seobusan Yutongjigu"},{"name":"金海國際機場站","aliases":["金海國際機場","金海國際機場站","공항","공항","공항역","Gimhae International Airport","Gimhae International Airport Station"],"address":"韓國釜山都市鐵道 金海輕軌・공항역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"공항","en":"Gimhae International Airport"},{"name":"德斗站","aliases":["德斗","德斗站","덕두","덕두","덕두역","Deokdu","Deokdu Station"],"address":"韓國釜山都市鐵道 金海輕軌・덕두역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"덕두","en":"Deokdu"},{"name":"登龜站","aliases":["登龜","登龜站","등구","등구","등구역","Deunggu","Deunggu Station"],"address":"韓國釜山都市鐵道 金海輕軌・등구역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"등구","en":"Deunggu"},{"name":"大渚站","aliases":["大渚","大渚站","대저","대저","대저역","Daejeo","Daejeo Station"],"address":"韓國釜山都市鐵道 金海輕軌・대저역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"대저","en":"Daejeo"},{"name":"平江站","aliases":["平江","平江站","평강","평강","평강역","Pyeonggang","Pyeonggang Station"],"address":"韓國釜山都市鐵道 金海輕軌・평강역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"평강","en":"Pyeonggang"},{"name":"大沙站","aliases":["大沙","大沙站","대사","대사","대사역","Daesa","Daesa Station"],"address":"韓國釜山都市鐵道 金海輕軌・대사역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"대사","en":"Daesa"},{"name":"佛岩站","aliases":["佛岩","佛岩站","불암","불암","불암역","Buram","Buram Station"],"address":"韓國釜山都市鐵道 金海輕軌・불암역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"불암","en":"Buram"},{"name":"池內站","aliases":["池內","池內站","지내","지내","지내역","Jinae","Jinae Station"],"address":"韓國釜山都市鐵道 金海輕軌・지내역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"지내","en":"Jinae"},{"name":"金海大學站","aliases":["金海大學","金海大學站","김해대학","김해대학","김해대학역","Gimhae College","Gimhae College Station"],"address":"韓國釜山都市鐵道 金海輕軌・김해대학역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"김해대학","en":"Gimhae College"},{"name":"仁濟大站","aliases":["仁濟大","仁濟大站","인제대","인제대","인제대역","Inje University","Inje University Station"],"address":"韓國釜山都市鐵道 金海輕軌・인제대역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"인제대","en":"Inje University"},{"name":"金海市廳站","aliases":["金海市廳","金海市廳站","김해시청","김해시청","김해시청역","Gimhae City Hall","Gimhae City Hall Station"],"address":"韓國釜山都市鐵道 金海輕軌・김해시청역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"김해시청","en":"Gimhae City Hall"},{"name":"府院站","aliases":["府院","府院站","부원","부원","부원역","Buwon","Buwon Station"],"address":"韓國釜山都市鐵道 金海輕軌・부원역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"부원","en":"Buwon"},{"name":"鳳凰站","aliases":["鳳凰","鳳凰站","봉황","봉황","봉황역","Bonghwang","Bonghwang Station"],"address":"韓國釜山都市鐵道 金海輕軌・봉황역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"봉황","en":"Bonghwang"},{"name":"首露王陵站","aliases":["首露王陵","首露王陵站","수로왕릉","수로왕릉","수로왕릉역","Royal Tomb of King Suro","Royal Tomb of King Suro Station"],"address":"韓國釜山都市鐵道 金海輕軌・수로왕릉역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"수로왕릉","en":"Royal Tomb of King Suro"},{"name":"博物館站","aliases":["博物館","博物館站","박물관","박물관","박물관역","Museum","Museum Station"],"address":"韓國釜山都市鐵道 金海輕軌・박물관역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"박물관","en":"Museum"},{"name":"蓮池公園站","aliases":["蓮池公園","蓮池公園站","연지공원","연지공원","연지공원역","Yeonji Park","Yeonji Park Station"],"address":"韓國釜山都市鐵道 金海輕軌・연지공원역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"연지공원","en":"Yeonji Park"},{"name":"長神大站","aliases":["長神大","長神大站","장신대","장신대","장신대역","Presbyterian University","Presbyterian University Station"],"address":"韓國釜山都市鐵道 金海輕軌・장신대역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"장신대","en":"Presbyterian University"},{"name":"加耶大站","aliases":["加耶大","加耶大站","가야대","가야대","가야대역","Kaya University","Kaya University Station"],"address":"韓國釜山都市鐵道 金海輕軌・가야대역","lat":null,"lon":null,"country":"KR","station":true,"line":"金海輕軌","ko":"가야대","en":"Kaya University"},{"name":"釜田站","aliases":["釜田","釜田站","부전","부전","부전역","Bujeon","Bujeon Station"],"address":"韓國釜山都市鐵道 東海線・부전역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"부전","en":"Bujeon"},{"name":"巨堤迎日站","aliases":["巨堤迎日","巨堤迎日站","거제해맞이","거제해맞이","거제해맞이역","Geojehaemaji","Geojehaemaji Station"],"address":"韓國釜山都市鐵道 東海線・거제해맞이역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"거제해맞이","en":"Geojehaemaji"},{"name":"巨堤站","aliases":["巨堤","巨堤站","거제","거제","거제역","Geoje","Geoje Station"],"address":"韓國釜山都市鐵道 東海線・거제역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"거제","en":"Geoje"},{"name":"教大站","aliases":["教大","教大站","교대","교대","교대역","Gyodae","Gyodae Station"],"address":"韓國釜山都市鐵道 東海線・교대역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"교대","en":"Gyodae"},{"name":"東萊站","aliases":["東萊","東萊站","동래","동래","동래역","Dongnae","Dongnae Station"],"address":"韓國釜山都市鐵道 東海線・동래역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"동래","en":"Dongnae"},{"name":"安樂站","aliases":["安樂","安樂站","안락","안락","안락역","Allak","Allak Station"],"address":"韓國釜山都市鐵道 東海線・안락역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"안락","en":"Allak"},{"name":"釜山院洞站","aliases":["釜山院洞","釜山院洞站","부산원동","부산원동","부산원동역","Busan Won-dong","Busan Won-dong Station"],"address":"韓國釜山都市鐵道 東海線・부산원동역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"부산원동","en":"Busan Won-dong"},{"name":"栽松站","aliases":["栽松","栽松站","재송","재송","재송역","Jaesong","Jaesong Station"],"address":"韓國釜山都市鐵道 東海線・재송역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"재송","en":"Jaesong"},{"name":"Centum站","aliases":["Centum","Centum站","센텀","센텀","센텀역","Centum","Centum Station"],"address":"韓國釜山都市鐵道 東海線・센텀역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"센텀","en":"Centum"},{"name":"BEXCO站","aliases":["BEXCO","BEXCO站","벡스코","벡스코","벡스코역","BEXCO","BEXCO Station"],"address":"韓國釜山都市鐵道 東海線・벡스코역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"벡스코","en":"BEXCO"},{"name":"新海雲台站","aliases":["新海雲台","新海雲台站","신해운대","신해운대","신해운대역","Sinhaeundae","Sinhaeundae Station"],"address":"韓國釜山都市鐵道 東海線・신해운대역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"신해운대","en":"Sinhaeundae"},{"name":"松亭站","aliases":["松亭","松亭站","송정","송정","송정역","Songjeong","Songjeong Station"],"address":"韓國釜山都市鐵道 東海線・송정역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"송정","en":"Songjeong"},{"name":"奧西利亞站","aliases":["奧西利亞","奧西利亞站","오시리아","오시리아","오시리아역","OSIRIA","OSIRIA Station"],"address":"韓國釜山都市鐵道 東海線・오시리아역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"오시리아","en":"OSIRIA"},{"name":"機張站","aliases":["機張","機張站","기장","기장","기장역","Gijang","Gijang Station"],"address":"韓國釜山都市鐵道 東海線・기장역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"기장","en":"Gijang"},{"name":"日光站","aliases":["日光","日光站","일광","일광","일광역","Ilgwang","Ilgwang Station"],"address":"韓國釜山都市鐵道 東海線・일광역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"일광","en":"Ilgwang"},{"name":"佐川站","aliases":["佐川","佐川站","좌천","좌천","좌천역","Jwacheon","Jwacheon Station"],"address":"韓國釜山都市鐵道 東海線・좌천역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"좌천","en":"Jwacheon"},{"name":"月內站","aliases":["月內","月內站","월내","월내","월내역","Wollae","Wollae Station"],"address":"韓國釜山都市鐵道 東海線・월내역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"월내","en":"Wollae"},{"name":"西生站","aliases":["西生","西生站","서생","서생","서생역","Seosaeng","Seosaeng Station"],"address":"韓國釜山都市鐵道 東海線・서생역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"서생","en":"Seosaeng"},{"name":"南倉站","aliases":["南倉","南倉站","남창","남창","남창역","Namchang","Namchang Station"],"address":"韓國釜山都市鐵道 東海線・남창역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"남창","en":"Namchang"},{"name":"望陽站","aliases":["望陽","望陽站","망양","망양","망양역","Mangyang","Mangyang Station"],"address":"韓國釜山都市鐵道 東海線・망양역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"망양","en":"Mangyang"},{"name":"德下站","aliases":["德下","德下站","덕하","덕하","덕하역","Deokha","Deokha Station"],"address":"韓國釜山都市鐵道 東海線・덕하역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"덕하","en":"Deokha"},{"name":"開雲浦站","aliases":["開雲浦","開雲浦站","개운포","개운포","개운포역","Gaeunpo","Gaeunpo Station"],"address":"韓國釜山都市鐵道 東海線・개운포역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"개운포","en":"Gaeunpo"},{"name":"太和江站","aliases":["太和江","太和江站","태화강","태화강","태화강역","Taehwagang","Taehwagang Station"],"address":"韓國釜山都市鐵道 東海線・태화강역","lat":null,"lon":null,"country":"KR","station":true,"line":"東海線","ko":"태화강","en":"Taehwagang"}];
const flightPresets={
 'KE2086':{airline:'大韓航空',from:'桃園國際機場 第一航廈（TPE）',to:'金海國際機場 國際線航廈（PUS）',depart:'12:00',arrive:'15:30',fromGeo:{name:'桃園國際機場 第一航廈',address:'台灣桃園市大園區航站南路17之1號',lat:25.08167,lon:121.23791},toGeo:{name:'金海國際機場 國際線航廈',address:'대한민국 부산광역시 강서구 공항진입로 108 국제선청사',lat:35.17953,lon:128.93822}},
 'LJ751':{airline:'真航空',from:'金海國際機場（PUS）',to:'桃園國際機場 第一航廈（TPE）',depart:'22:00',arrive:'23:40',fromGeo:{name:'金海國際機場',address:'대한민국 부산광역시 강서구 공항진입로 108',lat:35.17953,lon:128.93822},toGeo:{name:'桃園國際機場 第一航廈',address:'台灣桃園市大園區航站南路17之1號',lat:25.08167,lon:121.23791}}
};
let portfolio=loadPortfolio();
let state=portfolio.trips.find(t=>t.tripId===portfolio.activeTripId)||portfolio.trips[0]||defaultState();
portfolio.activeTripId=state.tripId;
let isShareMode=false,activePhraseCat='全部',map,mapMarkers=[],userMarker,fxRate=0,fxDirection='localToTwd',suggestTimer=null,suggestionCache={},pickerMaps={},pickerMarkers={},pickerSelections={},wizardCreateMode=false;

function defaultState(){
 return {
  setup:false,theme:'cream',tripName:'',destination:'',countryCode:'',currency:'KRW',lang:'ko',locale:'ko-KR',langName:'韓文',
  start:'',end:'',center:[35.1796,129.0756],selectedDay:null,days:[],
  people:[{id:1,name:'我'}],expenses:[],checklist:checklistDefaults.map((x,i)=>({id:i+1,group:x[0],text:x[1],done:false})),
  rateCache:{},translations:{},sharePrefs:{hideMoney:true,hidePrivate:true}
 }
}
function normalizeTripObject(raw){
 let base=defaultState(),trip=Object.assign(base,raw||{});
 trip.tripId=trip.tripId||uid();
 trip.days=Array.isArray(trip.days)?trip.days:[];
 trip.checklist=Array.isArray(trip.checklist)?trip.checklist:base.checklist;
 trip.people=Array.isArray(trip.people)&&trip.people.length?trip.people:base.people;
 trip.expenses=Array.isArray(trip.expenses)?trip.expenses:[];
 return trip;
}
function loadPortfolio(){
 try{
  let saved=JSON.parse(localStorage.getItem(PORTFOLIO_KEY)||'null');
  if(saved&&Array.isArray(saved.trips)&&saved.trips.length){
   saved.trips=saved.trips.map(normalizeTripObject);
   saved.activeTripId=saved.activeTripId||saved.trips[0].tripId;
   return saved;
  }
 }catch{}
 let legacy=null;
 try{legacy=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null')}catch{}
 let first=normalizeTripObject(legacy||{});
 return{activeTripId:first.tripId,trips:[first]};
}
function savePortfolio(){
 if(isShareMode)return;
 let idx=portfolio.trips.findIndex(t=>t.tripId===state.tripId);
 if(idx>=0)portfolio.trips[idx]=state;else portfolio.trips.push(state);
 portfolio.activeTripId=state.tripId;
 localStorage.setItem(PORTFOLIO_KEY,JSON.stringify(portfolio));
 localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
}
function saveState(){savePortfolio()}
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function toast(t){$('toast').textContent=t;$('toast').style.display='block';setTimeout(()=>$('toast').style.display='none',1800)}
function uid(){return Date.now()+Math.floor(Math.random()*10000)}
function applyTheme(k){
 state.theme=k;
 let v=themes[k]?.v||themes.cream.v,st=document.documentElement.style;
 ['--p','--p2','--yellow','--pink','--bg1','--bg2','--ink','--card'].forEach((x,i)=>st.setProperty(x,v[i]));
 st.setProperty('--outline',v[6]);
 document.documentElement.dataset.theme=k;
 saveState();
 renderThemes();
}
function selectedDay(){return state.days.find(d=>d.id===state.selectedDay)||state.days[0]}
function dateLabel(d){return d?new Date(d+'T00:00:00').toLocaleDateString('zh-TW',{month:'numeric',day:'numeric',weekday:'short'}):''}
function longDate(d){return d?new Date(d+'T00:00:00').toLocaleDateString('zh-TW',{year:'numeric',month:'long',day:'numeric',weekday:'long'}):''}
function localDateString(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function daysRange(a,b){let out=[],d=new Date(a+'T00:00:00'),e=new Date(b+'T00:00:00');while(d<=e){out.push(localDateString(d));d.setDate(d.getDate()+1)}return out}
function normalizeTripDates(){
 if(!state.start||!state.end)return;
 let expected=daysRange(state.start,state.end),current=Array.isArray(state.days)?state.days:[];
 if(expected.length===current.length&&expected.every((date,i)=>current[i]?.date===date))return;
 let oldSelectedIndex=Math.max(0,current.findIndex(d=>d.id===state.selectedDay));
 state.days=expected.map((date,i)=>{
  let exact=current.find(d=>d.date===date),base=exact||current[i]||{};
  return {...base,id:base.id||uid()+i,title:base.title||`Day ${i+1}`,date,items:Array.isArray(base.items)?base.items:[]}
 });
 state.selectedDay=state.days[Math.min(oldSelectedIndex,state.days.length-1)]?.id||state.days[0]?.id||null;
 saveState()
}

function migrateKnownFlightData(){
 let changed=false;
 for(const day of state.days||[]){
  for(const item of day.items||[]){
   if((item.flightNo||'').replace(/\s+/g,'').toUpperCase()==='KE2086'){
    const f=flightPresets.KE2086;
    item.departPlace=f.from; item.arrivePlace=f.to;
    item.departGeo=f.fromGeo; item.arriveGeo=f.toGeo;
    changed=true;
   }
  }
 }
 if(changed)saveState();
}

function enforceDestination(){let r=destinationRules.find(x=>x.re.test(`${state.destination} ${state.countryCode}`));if(r)Object.assign(state,{countryCode:r.cc,currency:r.cur,lang:r.lang,locale:r.locale,langName:r.lname});if(state.countryCode==='KR')Object.assign(state,{currency:'KRW',lang:'ko',locale:'ko-KR',langName:'韓文'})}
function switchTab(id){document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));$(id).classList.add('active');document.querySelectorAll('.bottom-nav button').forEach(x=>x.classList.toggle('active',x.dataset.tab===id));if(id==='map')setTimeout(()=>{initMap();plotSelectedDay()},100);if(id==='money')fetchRate()}
function renderAll(){
 normalizeTripDates();migrateKnownFlightData();enforceDestination();applyTheme(state.theme);
 $('heroTitle').textContent=state.tripName||'旅行積木';
 $('heroSub').textContent=state.setup?`${state.destination}・${state.start}～${state.end}・${state.currency}・${state.langName}`:'把每一段旅程，拼成最可愛的回憶。';
 document.querySelectorAll('.owner-only').forEach(x=>x.classList.toggle('hidden',isShareMode));
 $('shareBanner').classList.toggle('hidden',!isShareMode);
 renderHome();renderChecklist();renderPlan();renderMoney();renderPhrases();renderQuantityTable();renderThemes();renderSettings();
 saveState()
}

function tripStatusLabel(trip){
 if(!trip.start||!trip.end)return '尚未設定日期';
 let today=localDateString(new Date());
 if(today<trip.start)return `距離出發 ${Math.ceil((new Date(trip.start+'T12:00:00')-new Date(today+'T12:00:00'))/86400000)} 天`;
 if(today>trip.end)return '旅程已結束';
 return '旅行進行中';
}
function renderTripPortfolio(){
 let box=$('tripPortfolio');if(!box)return;
 if(isShareMode){
  box.innerHTML=`<div class="card lego"><div class="small">親友唯讀行程</div><h3>${esc(state.tripName)}</h3><div>${esc(state.destination)}・${esc(state.start)} ～ ${esc(state.end)}</div></div>`;
  return;
 }
 box.innerHTML=portfolio.trips.map(trip=>{
  let active=trip.tripId===state.tripId;
  return `<article class="trip-library-card ${active?'active':''}">
   <button class="trip-library-main" onclick="switchTrip('${trip.tripId}')">
    <span class="trip-library-icon">${trip.countryCode==='JP'?'🗾':trip.countryCode==='KR'?'🧳':'✈️'}</span>
    <span>
     <small>${active?'目前開啟・':''}${esc(tripStatusLabel(trip))}</small>
     <b>${esc(trip.tripName||trip.destination||'未命名旅行')}</b>
     <em>${esc(trip.destination||'尚未設定目的地')}・${esc(trip.start||'----')} ～ ${esc(trip.end||'----')}</em>
    </span>
   </button>
   <div class="trip-library-actions">
    <button class="brick white" onclick="switchTrip('${trip.tripId}')">開啟</button>
    <button class="brick white" onclick="editTripFromLibrary('${trip.tripId}')">編輯</button>
    ${portfolio.trips.length>1?`<button class="brick white" onclick="deleteTrip('${trip.tripId}')">刪除</button>`:''}
   </div>
  </article>`;
 }).join('')||'<div class="card">尚未建立旅行。</div>';
}
function switchTrip(id){
 if(isShareMode)return;
 savePortfolio();
 let target=portfolio.trips.find(t=>t.tripId===id);if(!target)return;
 state=target;portfolio.activeTripId=id;
 map=null;mapMarkers=[];userMarker=null;fxRate=0;
 savePortfolio();applyTheme(state.theme);renderAll();switchTab('home');fetchRate();
 toast(`已切換至「${state.tripName||state.destination}」`);
}
function editTripFromLibrary(id){
 if(id!==state.tripId)switchTrip(id);
 openWizard(true,false);
}
function deleteTrip(id){
 if(isShareMode||portfolio.trips.length<=1)return;
 let trip=portfolio.trips.find(t=>t.tripId===id);
 if(!confirm(`確定刪除「${trip?.tripName||'這個旅行'}」？此動作無法復原。`))return;
 portfolio.trips=portfolio.trips.filter(t=>t.tripId!==id);
 if(state.tripId===id){
  state=portfolio.trips[0];portfolio.activeTripId=state.tripId;
 }
 savePortfolio();renderAll();toast('旅行已刪除');
}
function createNewTrip(){openWizard(false,true)}

function renderHome(){
 renderTripPortfolio();
 if(!state.setup){$('tripOverview').innerHTML='<div class="card lego"><h3>還沒有建立旅行</h3><p class="small">先填寫目的地與日期，系統就會建立行程分頁。</p><button class="brick primary full owner-only" onclick="openWizard()">開始建立</button></div>';return}
 $('tripOverview').innerHTML=`<div class="summary-card"><div class="small" style="color:#fff">目前旅程</div><div class="amount">${esc(state.tripName)}</div><b>📍 ${esc(state.destination)}</b><div>${esc(state.start)} ～ ${esc(state.end)}</div><div style="margin-top:6px">💱 ${state.currency}　🗣️ ${state.langName}</div></div>`;
 let diff=Math.ceil((new Date(state.start+'T00:00:00')-new Date())/86400000);
 $('countdownCard').innerHTML=`<div class="lego-studs"><i></i><i></i><i></i></div><h3>⏳ 旅行倒數</h3><div style="font-size:28px;font-weight:950;color:var(--pink)">${diff>0?`還有 ${diff} 天`:diff===0?'今天出發！':'旅程進行中／已結束'}</div><div class="small">準備清單已完成 ${state.checklist.filter(x=>x.done).length}／${state.checklist.length} 項</div>`;
 let day=selectedDay()||state.days[0];$('todayPreview').innerHTML=day?`<div class="card lego"><h3>🧱 ${esc(day.title)}・${dateLabel(day.date)}</h3>${day.items.slice(0,3).map(i=>`<div class="check-row"><b>${i.startTime}</b><span>${esc(i.place)}</span></div>`).join('')||'<div class="small">這一天還沒有行程。</div>'}<button class="brick white full space-top" onclick="switchTab('plan')">查看完整行程</button></div>`:''
}
function renderChecklist(){
 let groups=[...new Set(state.checklist.map(x=>x.group))];
 $('checklistContent').innerHTML=groups.map(g=>`<div class="card lego"><h3>${esc(g)}</h3>${state.checklist.filter(x=>x.group===g).map(x=>`<label class="check-row ${x.done?'done':''}"><input type="checkbox" ${x.done?'checked':''} ${isShareMode?'disabled':''} onchange="toggleChecklist(${x.id},this.checked)"><span>${esc(x.text)}</span>${!isShareMode&&x.id>20?`<button type="button" class="brick white" onclick="removeChecklist(${x.id})">刪除</button>`:''}</label>`).join('')}</div>`).join('')
}
function toggleChecklist(id,v){let x=state.checklist.find(x=>x.id===id);if(x)x.done=v;renderChecklist();renderHome();saveState()}
function addChecklist(){let t=prompt('新增準備項目');if(t?.trim()){state.checklist.push({id:uid(),group:'自訂項目',text:t.trim(),done:false});renderAll()}}
function removeChecklist(id){state.checklist=state.checklist.filter(x=>x.id!==id);renderAll()}
function renderPlan(){
 $('dayStrip').innerHTML=state.days.map(d=>`<button class="day-btn ${d.id===state.selectedDay?'active':''}" onclick="selectDay(${d.id})"><small>${dateLabel(d.date)}</small><b>${esc(d.title)}</b></button>`).join('');
 let d=selectedDay();if(!d){$('planContent').innerHTML='<div class="card small">尚未建立日期。</div>';return}
 let items=[...d.items].sort((a,b)=>a.startTime.localeCompare(b.startTime));
 $('planContent').innerHTML=`<div class="card lego between"><div><div class="small">${longDate(d.date)}</div><h3>${esc(d.title)}</h3></div>${isShareMode?'':`<button class="brick white" onclick="openDayEditor(${d.id})">編輯</button>`}</div>`+
 items.map((i,idx)=>itineraryCard(i,idx,items)).join('')+
 (isShareMode?'':'<button class="brick primary full" onclick="openItemEditor()">＋ 加入行程</button>');
 setTimeout(()=>{loadWeather();calculateLegs()},50)
}
function itineraryCard(i,idx,items){
 let label=i.type==='restaurant'?'🍽️ 餐廳':i.type==='dessert'?'🍰 甜點':i.type==='transport'?'🚆 交通':i.type==='hotel'?'🏨 住宿':'🎡 景點';
 let transport=i.type==='transport'?`<div class="transport-box"><b>${esc(i.transport||'交通')}</b><div class="between"><span>${esc(i.departTime||'')} ${esc(i.departPlace||'')}</span><b>➜</b><span>${esc(i.arriveTime||'')} ${esc(i.arrivePlace||'')}</span></div>${i.flightNo?`<div class="space-top"><b>✈️ 航班 ${esc(i.flightNo)}</b>　<a target="_blank" href="https://www.google.com/search?q=${encodeURIComponent(i.flightNo+' flight status '+selectedDay().date)}">查詢航班</a></div>`:''}</div>`:'';
 let privateNote=(!isShareMode||!state.sharePrefs.hidePrivate)&&i.privateNote?`<div class="notice">🔒 ${esc(i.privateNote)}</div>`:'';
 return `<div class="card lego"><div class="lego-studs"><i></i><i></i><i></i></div><div class="trip-row"><div class="time-block">${esc(i.startTime)}<br>～<br>${esc(i.endTime)}</div><div class="trip-main"><div class="small">${label}</div><h3>${esc(i.place)}</h3>${i.note?`<div class="small">${esc(i.note)}</div>`:''}${i.address?`<div class="address">📍 ${esc(i.address)}</div>`:''}${privateNote}<div id="weather-${i.id}" class="weather-pill">🌤️ 取得天氣中…</div>${transport}<div class="actions"><button class="brick yellow" onclick="navigateTo('${encodeURIComponent(i.address||i.place)}')">Google 導航</button><button class="brick mint" onclick="openNaverMap('${encodeURIComponent(i.address||i.place)}')">Naver Map</button>${isShareMode?'':`<button class="brick white" onclick="openItemEditor(${i.id})">編輯</button><button class="brick white" onclick="deleteItem(${i.id})">刪除</button>`}</div></div></div></div>${idx<items.length-1?`<div id="leg-${i.id}-${items[idx+1].id}" class="leg-info">🧱 正在計算下一站距離…</div>`:''}`
}
function selectDay(id){state.selectedDay=id;renderPlan();saveState();if(map)setTimeout(plotSelectedDay,80)}
function openDayEditor(id){
 let d=id?state.days.find(x=>x.id===id):{title:`Day ${state.days.length+1}`,date:''};
 showModal(`<h3>${id?'編輯':'新增'}旅遊日</h3><label>標題</label><input id="dayTitle" class="input" value="${esc(d.title)}"><label>日期</label><input id="dayDate" type="date" class="input" value="${esc(d.date)}"><div class="modal-footer"><button class="brick white" onclick="closeModal()">取消</button><button class="brick primary" onclick="saveDay(${id||0})">儲存</button></div>`)
}
function saveDay(id){let title=$('dayTitle').value.trim(),date=$('dayDate').value;if(!title||!date)return toast('請填寫標題與日期');if(id)Object.assign(state.days.find(x=>x.id===id),{title,date});else{let n=uid();state.days.push({id:n,title,date,items:[]});state.selectedDay=n}closeModal();renderAll()}
function typeOptions(i){return ['attraction|景點','restaurant|餐廳','dessert|甜點／咖啡廳','hotel|住宿','transport|交通移動'].map(x=>{let[a,b]=x.split('|');return`<option value="${a}" ${i.type===a?'selected':''}>${b}</option>`}).join('')}
function placeField(id,label,val,placeholder='輸入地點名稱或地址'){
 return `<div class="suggest-wrap"><label>${label}</label>
 <input id="${id}" class="input" autocomplete="off" value="${esc(val||'')}" placeholder="${placeholder}" oninput="queueSuggestions('${id}',this.value)">
 <div class="place-tools">
  <button type="button" class="brick yellow" onclick="openExternalPlaceSearch('google',encodeURIComponent($('${id}').value))">Google 地圖搜尋</button>
  <button type="button" class="brick mint" onclick="toggleInlinePicker('${id}')">在地圖上選位置</button>
 </div>
 <div id="${id}PickerWrap" class="inline-picker hidden">
  <div id="${id}Picker" class="inline-picker-map"></div>
  <div class="small">請點地圖上的正確位置，再按「套用此位置」。</div>
  <button type="button" class="brick primary full space-top" onclick="confirmInlinePicker('${id}')">套用此位置</button>
 </div>
 <div id="${id}Suggestions" class="suggestions"></div></div>`;
}
function handleTransportChange(value){
 $('flightNoWrap')?.classList.toggle('hidden',value!=='飛機');
 if(value==='釜山地鐵'){
  ['departPlace','arrivePlace'].forEach(id=>{
   const el=$(id);if(el&&!el.value)el.placeholder='輸入中文、韓文或英文站名';
  });
 }
}
function transportFields(i){
 let opts=['台灣高鐵','機場捷運','台北捷運','台中捷運','高雄捷運','台鐵','公車','計程車','飛機','釜山地鐵','地鐵','步行','其他'];
 return `<div id="transportFields" class="${i.type==='transport'?'':'hidden'}"><label>交通方式</label>
 <select id="itemTransport" class="input" onchange="handleTransportChange(this.value)">${opts.map(x=>`<option ${i.transport===x?'selected':''}>${x}</option>`).join('')}</select>
 <div id="flightNoWrap" class="${i.transport==='飛機'?'':'hidden'}"><label>航班號</label><input id="itemFlightNo" class="input" value="${esc(i.flightNo||'')}" placeholder="例如 KE2086"><button class="brick white full space-top" type="button" onclick="searchFlight()">搜尋航班資訊</button></div>
 <div class="grid2"><div><label>搭乘時間</label><input id="departTime" type="time" class="input" value="${esc(i.departTime||'')}"></div><div><label>抵達時間</label><input id="arriveTime" type="time" class="input" value="${esc(i.arriveTime||'')}"></div></div>
 ${placeField('departPlace','搭乘地點',i.departPlace,'車站、機場或地址')}
 ${placeField('arrivePlace','抵達地點',i.arrivePlace,'車站、機場或地址')}</div>`;
}
function openItemEditor(id){
 pickerMaps={};pickerMarkers={};pickerSelections={};let d=selectedDay(),i=id?d.items.find(x=>x.id===id):{type:'attraction',startTime:'09:00',endTime:'10:00',place:'',note:'',privateNote:''};suggestionCache={mainPlace:i.lat?{name:i.place,address:i.address,lat:i.lat,lon:i.lon}:null,departPlace:i.departGeo||null,arrivePlace:i.arriveGeo||null};
 showModal(`<h3>${id?'編輯':'新增'}行程積木</h3><label>類型</label><select id="itemType" class="input" onchange="$('transportFields').classList.toggle('hidden',this.value!=='transport')">${typeOptions(i)}</select><div class="grid2"><div><label>開始時間</label><input id="startTime" type="time" class="input" value="${esc(i.startTime)}"></div><div><label>結束時間</label><input id="endTime" type="time" class="input" value="${esc(i.endTime)}"></div></div>${placeField('mainPlace','主要地點',i.place)}<div id="chosenAddress" class="address ${i.address?'':'hidden'}">${i.address?'📍 '+esc(i.address):''}</div><label>公開備註</label><textarea id="itemNote" class="input" rows="2">${esc(i.note)}</textarea><label>私人備註（分享時可隱藏）</label><textarea id="privateNote" class="input" rows="2">${esc(i.privateNote)}</textarea>${transportFields(i)}<div class="modal-footer"><button class="brick white" onclick="closeModal()">取消</button><button class="brick primary" onclick="saveItem(${id||0})">儲存</button></div>`)
}
function saveItem(id){let d=selectedDay(),sel=suggestionCache.mainPlace,o={id:id||uid(),type:$('itemType').value,startTime:$('startTime').value,endTime:$('endTime').value,place:$('mainPlace').value.trim(),note:$('itemNote').value.trim(),privateNote:$('privateNote').value.trim(),address:sel?.address||'',lat:sel?.lat||null,lon:sel?.lon||null};if(!o.place)return toast('請輸入主要地點');if(o.type==='transport')Object.assign(o,{transport:$('itemTransport').value,flightNo:$('itemFlightNo')?.value.trim().toUpperCase()||'',departTime:$('departTime').value,arriveTime:$('arriveTime').value,departPlace:$('departPlace').value.trim(),arrivePlace:$('arrivePlace').value.trim(),departGeo:suggestionCache.departPlace||null,arriveGeo:suggestionCache.arrivePlace||null});if(id)d.items[d.items.findIndex(x=>x.id===id)]=o;else d.items.push(o);closeModal();renderAll()}
function deleteItem(id){if(confirm('確定刪除此行程？')){selectedDay().items=selectedDay().items.filter(x=>x.id!==id);renderAll()}}
async function searchFlight(){
 let no=$('itemFlightNo').value.trim().replace(/\s+/g,'').toUpperCase();if(!no)return toast('請輸入航班號');
 showFlightResult('正在依序查詢可用航空資料 API…');
 try{
  let r=await fetch(`/api/flight-lookup?flight=${encodeURIComponent(no)}&date=${encodeURIComponent(selectedDay().date)}`);
  if(r.ok){let body=await r.json(),f=body.flight;if(f){
   $('departTime').value=f.departTime||'';$('arriveTime').value=f.arriveTime||'';$('departPlace').value=f.departAirport||'';$('arrivePlace').value=f.arriveAirport||'';
   if(f.departGeo)suggestionCache.departPlace=f.departGeo;if(f.arriveGeo)suggestionCache.arrivePlace=f.arriveGeo;
   showFlightResult(`✅ ${esc(f.airline||'')} ${esc(no)}<br>${esc(f.departAirport||'')} ${esc(f.departTime||'')} → ${esc(f.arriveAirport||'')} ${esc(f.arriveTime||'')}<br><span class="source-badge">${esc(body.provider||'API')}</span>`);toast('航班資訊已自動帶入');return
  }}
 }catch{}
 let f=flightPresets[no];
 if(f){$('departTime').value=f.depart;$('arriveTime').value=f.arrive;$('departPlace').value=f.from;$('arrivePlace').value=f.to;suggestionCache.departPlace=f.fromGeo;suggestionCache.arrivePlace=f.toGeo;showFlightResult(`✅ 已帶入 ${f.airline} ${no}<br>${f.from} ${f.depart} → ${f.to} ${f.arrive}<br><span class="source-badge">內建班表</span>`);toast('航班資訊已自動帶入');return}
 showFlightResult(`目前沒有設定可用的航空 API，或查不到 ${esc(no)}。請先手動填寫；設定頁可查看支援的 API 供應商。`)
}
function showFlightResult(html){let old=$('flightInlineResult');if(!old){old=document.createElement('div');old.id='flightInlineResult';old.className='notice';$('flightNoWrap').appendChild(old)}old.innerHTML=html}
function queueSuggestions(id,q){clearTimeout(suggestTimer);if(!q||q.trim().length<2){hideSuggestions(id);return}suggestTimer=setTimeout(()=>fetchSuggestions(id,q.trim()),500)}
function presetMatches(q,id){
 let text=q.toLowerCase().replace(/\s+/g,''),transport=$('itemTransport')?.value||'';
 let all=[...stationPresets,...busanMetroStations];
 return all.filter(x=>{
  let aliases=[x.name,...(x.aliases||[])].map(a=>String(a).toLowerCase().replace(/\s+/g,''));
  let matched=aliases.some(a=>a.includes(text)||text.includes(a));
  if((transport==='台灣高鐵'||transport==='機場捷運')&&x.country==='TW')return matched||x.name.includes(q);
  if((transport==='釜山地鐵'||transport==='地鐵')&&x.country==='KR')return matched;
  return matched;
 }).slice(0,16).map(x=>({...x,display_name:x.address,preset:true,source:x.line||'內建站名'}));
}
function searchCountryHint(q,id){
 let transport=$('itemTransport')?.value||'';
 if(transport==='台灣高鐵'||transport==='機場捷運'||/高鐵|機捷|桃園機場|台北車站|台中站|左營/i.test(q))return'tw';
 if(transport==='釜山地鐵'||/부산|서울|해운대|남포|서면|광안|대한민국|釜山|首爾|海雲台|南浦|西面|廣安/i.test(q)||state.countryCode==='KR')return'kr';
 return state.countryCode?.toLowerCase()||''
}
async function nominatimSearch(q,country=''){
 let params=new URLSearchParams({format:'jsonv2',addressdetails:'1',limit:'8','accept-language':'zh-TW'});params.set('q',q);if(country)params.set('countrycodes',country);
 let r=await fetch('https://nominatim.openstreetmap.org/search?'+params.toString(),{headers:{Accept:'application/json'}});if(!r.ok)throw new Error('Nominatim '+r.status);return await r.json()
}
async function photonSearch(q){
 let r=await fetch('https://photon.komoot.io/api/?limit=8&lang=zh&q='+encodeURIComponent(q));if(!r.ok)throw 0;let j=await r.json();return (j.features||[]).map(f=>({name:f.properties.name||f.properties.street||q,display_name:[f.properties.name,f.properties.street,f.properties.city,f.properties.state,f.properties.country].filter(Boolean).join(', '),lat:f.geometry.coordinates[1],lon:f.geometry.coordinates[0]}))
}
async function arcgisSearch(q){
 let params=new URLSearchParams({SingleLine:q,f:'json',outFields:'Match_addr,PlaceName,Type',maxLocations:'10',forStorage:'false'});
 let r=await fetch('https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?'+params.toString());if(!r.ok)throw 0;
 let j=await r.json();return (j.candidates||[]).filter(x=>x.score>=55).map(x=>({name:x.attributes?.PlaceName||x.address||q,display_name:x.attributes?.Match_addr||x.address,lat:x.location?.y,lon:x.location?.x,source:'ArcGIS'}))
}
function placeQueryVariants(q){
 let variants=[q],dest=state.destination||'';
 if(dest)variants.push(`${q}, ${dest}`);
 if(state.countryCode==='KR'){
  variants.push(`${q}, 부산광역시, 대한민국`);
  variants.push(`${q}, Busan, South Korea`);
  if(!/부산|대한민국|korea|busan/i.test(q))variants.push(`대한민국 부산광역시 ${q}`);
 }
 return [...new Set(variants)]
}

async function buildPlaceQueries(q){
 let queries=placeQueryVariants(q);
 if(state.countryCode==='KR'&&/[\u3400-\u9fff]/.test(q)){
  try{
   let ko=await translateText(q,'zh-TW','ko');
   if(ko&&ko!==q){
    queries.push(`${ko}, 부산광역시, 대한민국`);
    queries.push(`${ko.replace(/\s+/g,'')}, 부산광역시, 대한민국`);
   }
  }catch{}
 }
 return [...new Set(queries)];
}

async function fetchSuggestions(id,q){
 let box=$(id+'Suggestions');if(!box)return;box.classList.add('show');box.innerHTML='<button>正在搜尋多個地圖資料庫…</button>';
 try{
  let presets=presetMatches(q,id),country=searchCountryHint(q,id),queries=await buildPlaceQueries(q),list=[];
  for(const query of queries){
   try{list.push(...await arcgisSearch(query))}catch{}
   try{list.push(...await nominatimSearch(query,country))}catch{}
   if(list.length>=12)break
  }
  if(list.length<5){for(const query of queries.slice(0,2)){try{list.push(...await photonSearch(query))}catch{}}}
  let seen=new Set();list=[...presets,...list].filter(x=>{
   let lat=Number(x.lat),lon=Number(x.lon);
   if(x.preset&&(!Number.isFinite(lat)||!Number.isFinite(lon))){
    let k='preset:'+x.name+':'+(x.line||'');if(seen.has(k))return false;seen.add(k);return true;
   }
   if(!Number.isFinite(lat)||!Number.isFinite(lon))return false;
   if(country==='kr'&&(lat<33||lat>39||lon<124||lon>132))return false;
   if(country==='tw'&&(lat<21||lat>26.5||lon<119||lon>123))return false;
   let k=`${lat.toFixed(5)},${lon.toFixed(5)}`;if(seen.has(k))return false;seen.add(k);return true
  }).slice(0,16);
  box._items=list;
  box.innerHTML=list.length?list.map((x,n)=>`<button type="button" onclick="chooseSuggestion('${id}',${n})"><b>${esc(x.name||x.display_name?.split(',')[0]||q)}</b><small>${esc(x.display_name||x.address||'')} ${x.source?`<span class="source-badge">${esc(x.source)}</span>`:''}</small></button>`).join(''):`<button type="button" onclick="useTypedPlace('${id}')">仍找不到結果：保留文字，並可用 Google／Naver 地圖確認</button><button type="button" onclick="openExternalPlaceSearch('google','${encodeURIComponent(q)}')">用 Google Maps 搜尋</button>${state.countryCode==='KR'?`<button type="button" onclick="openExternalPlaceSearch('naver','${encodeURIComponent(q)}')">用 Naver Map 搜尋</button>`:''}`
 }catch{box.innerHTML=`<button type="button" onclick="useTypedPlace('${id}')">搜尋服務暫時無法使用，點此保留目前輸入文字</button>`}
}

function toggleInlinePicker(id){
 let wrap=$(id+'PickerWrap');if(!wrap)return;
 wrap.classList.toggle('hidden');
 if(wrap.classList.contains('hidden'))return;
 setTimeout(()=>{
  if(pickerMaps[id]){pickerMaps[id].invalidateSize();return}
  let center=suggestionCache[id]?.lat?[suggestionCache[id].lat,suggestionCache[id].lon]:state.center;
  let m=L.map(id+'Picker').setView(center,state.countryCode==='KR'?12:11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(m);
  pickerMaps[id]=m;
  m.on('click',e=>{
   pickerSelections[id]={lat:e.latlng.lat,lon:e.latlng.lng};
   if(pickerMarkers[id])m.removeLayer(pickerMarkers[id]);
   pickerMarkers[id]=L.marker(e.latlng).addTo(m).bindPopup('選擇的位置').openPopup();
  });
 },100);
}
async function confirmInlinePicker(id){
 let p=pickerSelections[id];if(!p)return toast('請先點選地圖位置');
 let address=`緯度 ${p.lat.toFixed(6)}，經度 ${p.lon.toFixed(6)}`;
 try{
  let r=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${p.lat}&lon=${p.lon}&accept-language=zh-TW`);
  if(r.ok){let j=await r.json();if(j.display_name)address=j.display_name}
 }catch{}
 let name=$(id).value.trim()||address.split(',')[0];
 suggestionCache[id]={name,address,lat:p.lat,lon:p.lon};
 if(!$(id).value.trim())$(id).value=name;
 if(id==='mainPlace'){$('chosenAddress').textContent='📍 '+address;$('chosenAddress').classList.remove('hidden')}
 $(id+'PickerWrap').classList.add('hidden');
 toast('已套用地圖位置，可正常計算距離');
}

function openExternalPlaceSearch(provider,q){q=decodeURIComponent(q);let full=`${q} ${state.destination||''}`.trim();window.open(provider==='naver'?`https://map.naver.com/p/search/${encodeURIComponent(full)}`:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(full)}`,'_blank')}
function useTypedPlace(id){let name=$(id).value.trim();if(!name)return;let o={name,address:name,lat:null,lon:null};suggestionCache[id]=o;hideSuggestions(id);if(id==='mainPlace'){$('chosenAddress').textContent='📍 '+name;$('chosenAddress').classList.remove('hidden')}toast('已保留文字，儲存後會再嘗試定位')}
async function resolvePresetLocation(x){
 if(Number.isFinite(Number(x.lat))&&Number.isFinite(Number(x.lon)))return x;
 let queries=x.station?[`${x.ko}역 부산광역시 대한민국`,`${x.en} Station Busan South Korea`]:[x.address||x.name];
 for(const q of queries){
  try{let a=await nominatimSearch(q,'kr');if(a?.[0])return {...x,lat:+a[0].lat,lon:+a[0].lon,address:a[0].display_name}}catch{}
  try{let a=await arcgisSearch(q);if(a?.[0])return {...x,lat:+a[0].lat,lon:+a[0].lon,address:a[0].display_name}}catch{}
 }
 return x;
}
async function chooseSuggestion(id,n){
 let box=$(id+'Suggestions'),x=box._items?.[n];if(!x)return;
 if(x.preset)x=await resolvePresetLocation(x);
 let lat=Number(x.lat),lon=Number(x.lon);
 let o={name:x.name||x.display_name?.split(',')[0]||x.address,address:x.display_name||x.address||x.name,lat:Number.isFinite(lat)?lat:null,lon:Number.isFinite(lon)?lon:null};
 $(id).value=o.name;suggestionCache[id]=o;hideSuggestions(id);
 if(id==='mainPlace'){$('chosenAddress').textContent='📍 '+o.address;$('chosenAddress').classList.remove('hidden')}
 toast(o.lat?'地點已定位':'已選擇站名，儲存時會再次定位');
}
function hideSuggestions(id){$(id+'Suggestions')?.classList.remove('show')}
document.addEventListener('click',e=>{if(!e.target.closest('.suggest-wrap'))document.querySelectorAll('.suggestions').forEach(x=>x.classList.remove('show'))});
async function geocode(q){
 let preset=presetMatches(q,'mainPlace')[0];
 if(preset){
  preset=await resolvePresetLocation(preset);
  if(Number.isFinite(Number(preset.lat))&&Number.isFinite(Number(preset.lon)))return{lat:+preset.lat,lon:+preset.lon,address:preset.address};
 }
 let country=searchCountryHint(q,'mainPlace');
 for(const query of placeQueryVariants(q)){
  try{let a=await arcgisSearch(query);if(a?.[0])return{lat:+a[0].lat,lon:+a[0].lon,address:a[0].display_name}}catch{}
  try{let a=await nominatimSearch(query,country);if(a?.[0])return{lat:+a[0].lat,lon:+a[0].lon,address:a[0].display_name}}catch{}
 }
 try{let a=await photonSearch(`${q} ${country==='tw'?'Taiwan':country==='kr'?'Busan South Korea':state.destination||''}`);if(a?.[0])return{lat:+a[0].lat,lon:+a[0].lon,address:a[0].display_name}}catch{}
 return null
}
async function ensureCoords(i){if(i.lat&&i.lon)return{lat:+i.lat,lon:+i.lon};let g=await geocode(i.address||i.place);if(g){Object.assign(i,{lat:g.lat,lon:g.lon,address:i.address||g.address});saveState();return g}return null}
function weatherText(code){if(code===0)return['☀️','晴朗'];if(code<=3)return['⛅','多雲'];if(code<=48)return['🌫️','有霧'];if(code<=67)return['🌧️','下雨'];if(code<=77)return['❄️','下雪'];if(code<=82)return['🌦️','陣雨'];return['⛈️','雷雨']}
async function loadWeather(){let d=selectedDay();for(const i of d.items){let el=$('weather-'+i.id);if(!el)continue;try{let c=await ensureCoords(i);if(!c)c={lat:state.center[0],lon:state.center[1]};let date=d.date,today=new Date().toISOString().slice(0,10),days=(new Date(date)-new Date(today))/86400000,url=days>=0&&days<=15?`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&start_date=${date}&end_date=${date}`:`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current=temperature_2m,weather_code&timezone=auto`,w=await(await fetch(url)).json();if(w.daily?.time?.length){let[ic,tx]=weatherText(w.daily.weather_code[0]);el.textContent=`${ic} ${tx} ${Math.round(w.daily.temperature_2m_min[0])}～${Math.round(w.daily.temperature_2m_max[0])}°C`}else{let[ic,tx]=weatherText(w.current.weather_code);el.textContent=`${ic} ${tx} ${Math.round(w.current.temperature_2m)}°C`}}catch{el.textContent='🌤️ 天氣暫時無法讀取'}}}
function haversine(a,b){let R=6371,r=x=>x*Math.PI/180,dLat=r(b.lat-a.lat),dLon=r(b.lon-a.lon),x=Math.sin(dLat/2)**2+Math.cos(r(a.lat))*Math.cos(r(b.lat))*Math.sin(dLon/2)**2;return 2*R*Math.asin(Math.sqrt(x))}
function duration(m){m=Math.max(1,Math.round(m));return m>=60?`${Math.floor(m/60)}小時${m%60?m%60+'分':''}`:`${m}分鐘`}
async function calculateLegs(){let a=[...selectedDay().items].sort((x,y)=>x.startTime.localeCompare(y.startTime));for(let n=0;n<a.length-1;n++){let el=$(`leg-${a[n].id}-${a[n+1].id}`);if(!el)continue;try{let x=await ensureCoords(a[n]),y=await ensureCoords(a[n+1]);if(!x||!y)throw 0;let direct=haversine(x,y),km=direct*1.2,drive=km/30*60;try{let j=await(await fetch(`https://router.project-osrm.org/route/v1/driving/${x.lon},${x.lat};${y.lon},${y.lat}?overview=false`)).json();if(j.routes?.[0]){km=j.routes[0].distance/1000;drive=j.routes[0].duration/60}}catch{}el.innerHTML=`<b>🧱 下一站約 ${km.toFixed(km<10?1:0)} 公里</b><div class="mode-grid"><span>🚶 ${duration(km/4.5*60)}</span><span>🚲 ${duration(km/15*60)}</span><span>🚗 ${duration(drive)}</span><span>🚇 ${duration(km/24*60+8)}</span></div><div class="small">步行、自行車及大眾運輸為估算時間。</div>`}catch{el.textContent='🧱 無法計算下一站，請重新選擇完整地點。'}}}
function initMap(){if(map||!window.L)return;map=L.map('mapCanvas').setView(state.center,11);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(map)}
async function plotSelectedDay(){initMap();mapMarkers.forEach(m=>map.removeLayer(m));mapMarkers=[];let bounds=[];for(const i of selectedDay()?.items||[]){let c=await ensureCoords(i);if(!c)continue;let m=L.marker([c.lat,c.lon]).addTo(map).bindPopup(`<b>${esc(i.place)}</b><br>${esc(i.startTime)}～${esc(i.endTime)}<br>${esc(i.address||'')}`);mapMarkers.push(m);bounds.push([c.lat,c.lon])}if(bounds.length)map.fitBounds(bounds,{padding:[30,30],maxZoom:15});$('mapStatus').textContent=`已標記 ${bounds.length} 個行程地點。`}
function locateMe(){initMap();navigator.geolocation.getCurrentPosition(p=>{let ll=[p.coords.latitude,p.coords.longitude];if(userMarker)map.removeLayer(userMarker);userMarker=L.circleMarker(ll,{radius:9,color:'#2477ff',fillColor:'#64a7ff',fillOpacity:.9}).addTo(map).bindPopup('目前位置');map.setView(ll,15)},()=>toast('請允許位置權限'))}
function navigateTo(q){window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(decodeURIComponent(q))}`,'_blank')}
function openNaverMap(q){window.open(`https://map.naver.com/p/search/${encodeURIComponent(decodeURIComponent(q))}`,'_blank')}
function renderMoney(){let total=state.expenses.reduce((sum,e)=>sum+Number(e.amount||0),0);$('moneySummary').innerHTML=`<div class="small" style="color:#fff">旅程總支出</div><div class="amount">${state.currency} ${total.toLocaleString()}</div><div>${state.people.length} 位旅伴・${state.expenses.length} 筆消費</div>`;$('fxDirection').value=fxDirection;$('fxFromLabel').textContent=fxDirection==='localToTwd'?state.currency:'TWD';$('fxToLabel').textContent=fxDirection==='localToTwd'?'TWD':state.currency;$('peopleChips').innerHTML=state.people.map(p=>`<span class="chip">${esc(p.name)}${!isShareMode&&state.people.length>1?`<button onclick="removePerson(${p.id})">×</button>`:''}</span>`).join('');$('expenses').innerHTML=isShareMode&&state.sharePrefs.hideMoney?'<div class="card lego small">分帳明細已由分享者隱藏。</div>':state.expenses.map(e=>`<div class="card lego between"><div><b>${esc(e.title)}</b><div class="small">${esc(personName(e.payerId))} 先付款・${e.sharedBy.length} 人分攤</div></div><b>${state.currency} ${Number(e.amount).toLocaleString()}</b></div>`).join('');convertFx();renderSettlements()}
function personName(id){return state.people.find(p=>p.id===id)?.name||'未知'}
function addPerson(){let n=prompt('旅伴名稱');if(n?.trim()){state.people.push({id:uid(),name:n.trim()});renderAll()}}
function removePerson(id){if(state.people.length<=1)return;if(confirm('刪除此旅伴？')){state.people=state.people.filter(x=>x.id!==id);state.expenses=state.expenses.filter(e=>e.payerId!==id).map(e=>({...e,sharedBy:e.sharedBy.filter(x=>x!==id)}));renderAll()}}
function openExpenseEditor(){showModal(`<h3>新增消費</h3><label>項目</label><input id="expenseTitle" class="input"><label>金額（${state.currency}）</label><input id="expenseAmount" type="number" class="input"><label>付款人</label><select id="expensePayer" class="input">${state.people.map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select><label>共同分攤者</label>${state.people.map(p=>`<label><input name="expenseShared" type="checkbox" value="${p.id}" checked> ${esc(p.name)}</label>`).join('')}<div class="modal-footer"><button class="brick white" onclick="closeModal()">取消</button><button class="brick primary" onclick="saveExpense()">儲存</button></div>`)}
function saveExpense(){let o={id:uid(),title:$('expenseTitle').value.trim(),amount:+$('expenseAmount').value,payerId:+$('expensePayer').value,sharedBy:[...document.querySelectorAll('[name=expenseShared]:checked')].map(x=>+x.value)};if(!o.title||o.amount<=0||!o.sharedBy.length)return toast('請完整填寫');state.expenses.push(o);closeModal();renderAll()}
function renderSettlements(){if(isShareMode&&state.sharePrefs.hideMoney){$('settlements').innerHTML='<div class="small">分享者已隱藏分帳內容。</div>';return}let bal={};state.people.forEach(p=>bal[p.id]=0);state.expenses.forEach(e=>{let valid=e.sharedBy.filter(id=>bal[id]!==undefined);if(!valid.length||bal[e.payerId]===undefined)return;let share=e.amount/valid.length;bal[e.payerId]+=e.amount;valid.forEach(id=>bal[id]-=share)});let c=Object.entries(bal).filter(x=>x[1]>.5).map(x=>({id:+x[0],a:x[1]})),d=Object.entries(bal).filter(x=>x[1]<-.5).map(x=>({id:+x[0],a:-x[1]})),out=[],i=0,j=0;while(i<d.length&&j<c.length){let a=Math.min(d[i].a,c[j].a);out.push([personName(d[i].id),personName(c[j].id),a]);d[i].a-=a;c[j].a-=a;if(d[i].a<.5)i++;if(c[j].a<.5)j++}$('settlements').innerHTML=out.length?out.map(x=>`<div class="between check-row"><span>${esc(x[0])} 給 ${esc(x[1])}</span><b>${state.currency} ${Math.round(x[2]).toLocaleString()}</b></div>`).join(''):'<div class="small">目前帳目平衡。</div>'}
async function fetchRate(show){
 if(state.currency==='TWD'){fxRate=1;$('fxNote').textContent='目的地使用台幣';convertFx();return}
 $('fxNote').textContent='正在取得最新參考匯率…';
 try{
  let j=await(await fetch(`https://open.er-api.com/v6/latest/${state.currency}`)).json();
  if(j.result!=='success'||!j.rates?.TWD)throw 0;
  fxRate=j.rates.TWD;state.rateCache[state.currency]={rate:fxRate,date:j.time_last_update_utc||new Date().toISOString(),checkedAt:Date.now()};
  $('fxNote').textContent=`1 ${state.currency} ≈ ${fxRate.toFixed(state.currency==='KRW'?4:2)} TWD（今日自動更新）`;convertFx();saveState();if(show)toast('匯率已更新');return
 }catch{}
 try{
  let j=await(await fetch(`https://api.frankfurter.dev/v1/latest?base=${state.currency}&symbols=TWD`)).json();if(!j.rates?.TWD)throw 0;
  fxRate=j.rates.TWD;state.rateCache[state.currency]={rate:fxRate,date:j.date,checkedAt:Date.now()};$('fxNote').textContent=`1 ${state.currency} ≈ ${fxRate.toFixed(4)} TWD（${j.date}）`;convertFx();saveState();if(show)toast('匯率已更新');return
 }catch{}
 let c=state.rateCache[state.currency];if(c){fxRate=c.rate;$('fxNote').textContent='目前離線，使用上次儲存的參考匯率';convertFx()}else{$('fxNote').textContent='暫時無法取得匯率，請確認網路後再按更新';fxRate=0;convertFx()}
}
function scheduleFxAutoUpdate(){let c=state.rateCache[state.currency],stale=!c?.checkedAt||Date.now()-c.checkedAt>6*60*60*1000;if(stale)fetchRate(false);clearInterval(window.__fxTimer);window.__fxTimer=setInterval(()=>fetchRate(false),6*60*60*1000)}
function setFxDirection(v){fxDirection=v;renderMoney()}
function swapFxDirection(){fxDirection=fxDirection==='localToTwd'?'twdToLocal':'localToTwd';renderMoney()}
function formatFx(n,currency){if(!Number.isFinite(n))return'0';let digits=currency==='KRW'?0:2;return n.toLocaleString('zh-TW',{maximumFractionDigits:digits,minimumFractionDigits:digits===2?2:0})}
function convertFx(){let amount=+$('fxAmount').value||0,result=0,to='TWD';if(fxDirection==='localToTwd'){result=amount*fxRate;to='TWD'}else{result=fxRate?amount/fxRate:0;to=state.currency}$('fxFromLabel').textContent=fxDirection==='localToTwd'?state.currency:'TWD';$('fxToLabel').textContent=to;$('fxResult').textContent=`約 ${to} ${formatFx(result,to)}`}
async function translateText(t,from,to,provider='auto'){
 let key=`${provider}|${from}|${to}|${t}`;if(state.translations[key])return state.translations[key];
 if(provider==='google'||provider==='papago'){
  try{let r=await fetch('/api/translate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:t,source:from,target:to,provider})});if(r.ok){let j=await r.json();if(j.translation){state.translations[key]=j.translation;saveState();return j.translation}}}catch{}
 }
 let j=await(await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(t)}&langpair=${encodeURIComponent(from)}|${encodeURIComponent(to)}`)).json(),r=j.responseData?.translatedText;if(!r)throw 0;state.translations[key]=r;saveState();return r
}
async function translateWithProvider(provider){
 let t=$('translateText').value.trim();if(!t)return toast('請先輸入文字');let dir=$('translateDirection').value,from=dir==='toLocal'?'zh-TW':state.lang,to=dir==='toLocal'?state.lang:'zh-TW';$('translationBox').classList.remove('hidden');$('translationText').textContent=`正在使用 ${provider==='google'?'Google':'Papago'} 翻譯…`;
 try{let r=await translateText(t,from,to,provider);$('translationText').textContent=r;$('translationRoman').textContent=dir==='toLocal'?romanize(r):'';return}catch{}
 let url=provider==='google'?`https://translate.google.com/?sl=${encodeURIComponent(from)}&tl=${encodeURIComponent(to)}&text=${encodeURIComponent(t)}&op=translate`:`https://papago.naver.com/?sk=auto&tk=${encodeURIComponent(to)}&st=${encodeURIComponent(t)}`;
 $('translationText').textContent='尚未設定 API 金鑰，已開啟官方翻譯頁面。';window.open(url,'_blank')
}
function renderPhrases(){let cats=['全部',...new Set(phrases.map(x=>x[0]))],q=($('phraseSearch')?.value||'').trim();$('phraseCategories').innerHTML=cats.map(c=>`<button class="brick ${c===activePhraseCat?'primary':'white'}" onclick="activePhraseCat='${c}';renderPhrases()">${c}</button>`).join('');let rows=phrases.map((x,i)=>({cat:x[0],zh:x[1],i})).filter(x=>(activePhraseCat==='全部'||x.cat===activePhraseCat)&&(!q||x.zh.includes(q)));$('phrases').innerHTML=rows.map(x=>{let key=`zh-TW|${state.lang}|${x.zh}`,r=state.translations[key]||'';return`<div class="phrase-card"><div class="small">${esc(x.cat)}・${esc(x.zh)}</div><div id="phrase-${x.i}" class="foreign">${esc(r||`翻譯成${state.langName}`)}</div><div id="roman-${x.i}" class="small">${r?esc(romanize(r)):''}</div><div class="actions"><button class="brick primary" onclick="loadPhrase(${x.i})">翻譯</button><button class="brick yellow" onclick="speakPhrase(${x.i})">播放</button><button class="brick white" onclick="copyText('phrase-${x.i}')">複製</button></div></div>`}).join('')}
function romanize(t){if(state.lang!=='ko')return'';let map={'안녕하세요':'annyeonghaseyo','감사합니다':'gamsahamnida','죄송합니다':'joesonghamnida','화장실':'hwajangsil','어디':'eodi','주세요':'juseyo','얼마예요':'eolmayeyo','도와주세요':'dowajuseyo','괜찮아요':'gwaenchanayo','메뉴':'menyu','계산':'gyesan','물':'mul','역':'yeok','택시':'taeksi','카드':'kadeu'};let r=t;Object.entries(map).forEach(([a,b])=>r=r.replaceAll(a,b));return r===t?'':r}
async function loadPhrase(i){let [cat,zh]=phrases[i],el=$('phrase-'+i);el.textContent='翻譯中…';try{let r=await translateText(zh,'zh-TW',state.lang);el.textContent=r;$('roman-'+i).textContent=romanize(r)}catch{el.textContent='翻譯失敗'}}
async function speakPhrase(i){let el=$('phrase-'+i);if(el.textContent.includes('翻譯成')||el.textContent==='翻譯失敗')await loadPhrase(i);let u=new SpeechSynthesisUtterance(el.textContent);u.lang=state.locale;u.rate=0.72;u.pitch=1;speechSynthesis.cancel();speechSynthesis.speak(u)}
function updateTranslatePlaceholder(){let dir=$('translateDirection').value;$('translateText').placeholder=dir==='toLocal'?`輸入中文，翻譯成${state.langName}`:`輸入${state.langName}，翻譯成中文`}
async function translateCustom(){let t=$('translateText').value.trim();if(!t)return toast('請先輸入文字');let dir=$('translateDirection').value,from=dir==='toLocal'?'zh-TW':state.lang,to=dir==='toLocal'?state.lang:'zh-TW';$('translationBox').classList.remove('hidden');$('translationText').textContent='翻譯中…';try{let r=await translateText(t,from,to);$('translationText').textContent=r;$('translationRoman').textContent=dir==='toLocal'?romanize(r):''}catch{$('translationText').textContent='翻譯暫時無法使用'}}
function speakCurrentTranslation(){let t=$('translationText').textContent;if(!t||t.includes('翻譯中')||t.includes('無法'))return;let u=new SpeechSynthesisUtterance(t);u.lang=$('translateDirection').value==='toLocal'?state.locale:'zh-TW';u.rate=0.72;u.pitch=1;speechSynthesis.cancel();speechSynthesis.speak(u)}
async function copyText(id){let t=$(id)?.textContent;if(!t)return;try{await navigator.clipboard.writeText(t);toast('已複製')}catch{toast('瀏覽器不允許複製')}}

const quantityCounters={
 '幾位（人）':['한 명','두 명','세 명','네 명','다섯 명','여섯 명','일곱 명','여덟 명','아홉 명','열 명'],
 '幾杯／幾杯飲料':['한 잔','두 잔','세 잔','네 잔','다섯 잔','여섯 잔','일곱 잔','여덟 잔','아홉 잔','열 잔'],
 '幾份（人份）':['일 인분','이 인분','삼 인분','사 인분','오 인분','육 인분','칠 인분','팔 인분','구 인분','십 인분'],
 '幾個':['한 개','두 개','세 개','네 개','다섯 개','여섯 개','일곱 개','여덟 개','아홉 개','열 개'],
 '幾瓶':['한 병','두 병','세 병','네 병','다섯 병','여섯 병','일곱 병','여덟 병','아홉 병','열 병'],
 '幾碗':['한 그릇','두 그릇','세 그릇','네 그릇','다섯 그릇','여섯 그릇','일곱 그릇','여덟 그릇','아홉 그릇','열 그릇'],
 '幾盤':['한 접시','두 접시','세 접시','네 접시','다섯 접시','여섯 접시','일곱 접시','여덟 접시','아홉 접시','열 접시']
};
function renderQuantityTable(){let el=$('quantityTable');if(!el)return;let heads=Object.keys(quantityCounters);el.innerHTML=`<div class="quantity-scroll"><table class="quantity-table"><tr><th>數量</th>${heads.map(h=>`<th>${h}</th>`).join('')}</tr>${Array.from({length:10},(_,i)=>`<tr><th>${i+1}</th>${heads.map(h=>`<td><button class="quantity-speak" onclick="speakQuantity('${encodeURIComponent(quantityCounters[h][i])}')">${quantityCounters[h][i]} 🔊</button></td>`).join('')}</tr>`).join('')}</table></div>`}
function toggleQuantityTable(){$('quantityTable').classList.toggle('hidden')}
function speakQuantity(t){let u=new SpeechSynthesisUtterance(decodeURIComponent(t));u.lang='ko-KR';u.rate=.62;u.pitch=1;speechSynthesis.cancel();speechSynthesis.speak(u)}
async function refreshProviderStatus(){
 let f=$('flightProviderStatus'),s=$('serviceProviderStatus');
 if(!f||!s)return;
 f.innerHTML=`
  <div class="provider-item"><span><b>內建航班資料</b><br><small>已支援常用航班自動帶入與外部查詢。</small></span><span class="status-ok">可使用</span></div>
  <div class="provider-item"><span><b>即時航空 API</b><br><small>尚未啟用付費或需金鑰的即時供應商。</small></span><span class="status-info">選用</span></div>`;
 s.innerHTML=`
  <div class="provider-item"><span><b>App 內地圖定位</b><br><small>OpenStreetMap、ArcGIS 與手動地圖選點可使用。</small></span><span class="status-ok">可使用</span></div>
  <div class="provider-item"><span><b>Google／Naver 外部搜尋</b><br><small>按鈕會開啟官方地圖搜尋與導航。</small></span><span class="status-ok">可使用</span></div>
  <div class="provider-item"><span><b>Google／Naver 官方店家 API</b><br><small>尚未設定金鑰，不影響目前地圖與導航功能。</small></span><span class="status-info">選用</span></div>`;
}
function renderThemes(){
 $('themeGrid').innerHTML=Object.entries(themes).map(([k,t])=>`
 <button class="theme-option ${state.theme===k?'active':''}" style="--swatch:${t.v[0]};--swatch2:${t.v[2]}" onclick="applyTheme('${k}')">
  <span class="theme-dots"><i></i><i></i></span>${t.name}
 </button>`).join('');
}
function renderSettings(){refreshProviderStatus();$('settingsSummary').innerHTML=`旅行：${esc(state.tripName)}<br>目的地：${esc(state.destination)}<br>日期：${esc(state.start)} ～ ${esc(state.end)}<br>當地幣別：${state.currency}<br>當地語言：${state.langName}（${state.locale}）`;$('languageBadge').textContent=`${state.langName}・${state.currency}`;updateTranslatePlaceholder()}
function openWizard(edit=false,createNew=false){
 wizardCreateMode=!!createNew;
 $('wizard').classList.add('show');
 let source=createNew?defaultState():state;
 $('wizardDestination').value=source.destination||'';
 $('wizardStart').value=source.start||'';
 $('wizardEnd').value=source.end||'';
 $('wizardName').value=source.tripName||'';
 $('wizardStatus').textContent=createNew?'建立一個新的獨立旅行。':'';
}
async function finishWizard(){
 let dest=$('wizardDestination').value.trim(),start=$('wizardStart').value,end=$('wizardEnd').value,name=$('wizardName').value.trim();
 if(!dest||!start||!end||end<start)return $('wizardStatus').textContent='請輸入完整目的地與正確日期。';
 $('wizardStatus').textContent='正在偵測國家、語言與幣別…';
 try{
  let rule=destinationRules.find(x=>x.re.test(dest)),g=await geocode(dest);if(!g)throw 0;
  if(wizardCreateMode){
   savePortfolio();
   state=defaultState();
   state.tripId=uid();
   portfolio.trips.push(state);
   portfolio.activeTripId=state.tripId;
  }
  Object.assign(state,{setup:true,tripName:name||`${dest}旅行`,destination:dest,start,end,center:[g.lat,g.lon]});
  if(rule)Object.assign(state,{countryCode:rule.cc,currency:rule.cur,lang:rule.lang,locale:rule.locale,langName:rule.lname});
  let old=new Map((state.days||[]).map(d=>[d.date,d]));
  state.days=daysRange(start,end).map((date,i)=>old.get(date)||{id:uid()+i,title:`Day ${i+1}`,date,items:[]});
  state.selectedDay=state.days[0]?.id;
  wizardCreateMode=false;
  $('wizard').classList.remove('show');
  savePortfolio();renderAll();switchTab('home');fetchRate();
  toast('旅行已建立');
 }catch{$('wizardStatus').textContent='找不到目的地，請輸入較完整的城市名稱。'}
}
function showModal(html){$('modal').innerHTML=html;$('modalBackdrop').classList.add('show')}
function closeModal(){$('modalBackdrop').classList.remove('show')}
function openShareModal(){let opts=state.sharePrefs;showModal(`<h3>👨‍👩‍👧‍👦 分享給親友</h3><p class="small">產生唯讀分享連結。家人不用登入，也能查看行程。</p><label><input id="hideMoney" type="checkbox" ${opts.hideMoney?'checked':''}> 隱藏分帳與花費</label><label><input id="hidePrivate" type="checkbox" ${opts.hidePrivate?'checked':''}> 隱藏私人備註</label><div class="modal-footer"><button class="brick white" onclick="closeModal()">取消</button><button class="brick primary" onclick="createShareLink()">產生分享連結</button></div>`)}
function compactShareData(){let copy=JSON.parse(JSON.stringify(state));if($('hideMoney')?.checked){copy.expenses=[];copy.sharePrefs.hideMoney=true}else copy.sharePrefs.hideMoney=false;if($('hidePrivate')?.checked){copy.days.forEach(d=>d.items.forEach(i=>delete i.privateNote));copy.sharePrefs.hidePrivate=true}else copy.sharePrefs.hidePrivate=false;delete copy.rateCache;delete copy.translations;return copy}
function bytesToBase64Url(bytes){
 let binary='',chunk=0x8000;
 for(let i=0;i<bytes.length;i+=chunk)binary+=String.fromCharCode(...bytes.subarray(i,i+chunk));
 return btoa(binary).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
function base64UrlToBytes(v){
 let b=v.replace(/-/g,'+').replace(/_/g,'/');while(b.length%4)b+='=';
 let binary=atob(b),bytes=new Uint8Array(binary.length);
 for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
 return bytes;
}
function encodeShareLegacy(obj){
 let str=encodeURIComponent(JSON.stringify(obj)).replace(/%([0-9A-F]{2})/g,(_,p)=>String.fromCharCode('0x'+p));
 return btoa(str).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
function decodeShareLegacy(v){
 let b=v.replace(/-/g,'+').replace(/_/g,'/');while(b.length%4)b+='=';
 let str=atob(b),pct=[...str].map(c=>'%'+c.charCodeAt(0).toString(16).padStart(2,'0')).join('');
 return JSON.parse(decodeURIComponent(pct));
}
async function encodeShareData(obj){
 let json=JSON.stringify(obj);
 if('CompressionStream' in window){
  let stream=new Blob([json]).stream().pipeThrough(new CompressionStream('gzip'));
  let bytes=new Uint8Array(await new Response(stream).arrayBuffer());
  return'g.'+bytesToBase64Url(bytes);
 }
 return'j.'+encodeShareLegacy(obj);
}
async function decodeShareData(v){
 if(v.startsWith('g.')&&'DecompressionStream' in window){
  let bytes=base64UrlToBytes(v.slice(2));
  let stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
  return JSON.parse(await new Response(stream).text());
 }
 if(v.startsWith('j.'))return decodeShareLegacy(v.slice(2));
 return decodeShareLegacy(v);
}
async function createShareLink(){
 state.sharePrefs={hideMoney:$('hideMoney').checked,hidePrivate:$('hidePrivate').checked};
 saveState();
 toast('正在建立專屬分享連結…');
 let payload=await encodeShareData(compactShareData());
 let url=new URL(location.origin+location.pathname);
 url.searchParams.set('share',payload);
 let shareUrl=url.toString(),qr=`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shareUrl)}`;
 showModal(`<h3>「${esc(state.tripName)}」分享連結</h3><div class="qr-wrap"><img src="${qr}" alt="分享 QR Code"></div><input id="shareUrl" class="input space-top" value="${esc(shareUrl)}" readonly><div class="grid2 space-top"><button class="brick primary" onclick="shareNative()">分享到 LINE</button><button class="brick white" onclick="copyShareUrl()">複製連結</button></div><p class="small">親友打開後會直接進入這一份唯讀行程，不會建立空白旅行。</p>`);
}
async function shareNative(){
 let url=$('shareUrl').value;
 try{
  if(navigator.share)await navigator.share({title:state.tripName,text:`查看「${state.tripName}」唯讀行程`,url});
  else{await navigator.clipboard.writeText(url);toast('連結已複製，可貼到 LINE')}
 }catch{}
}
async function copyShareUrl(){await navigator.clipboard.writeText($('shareUrl').value);toast('分享連結已複製')}
async function loadShareMode(){
 let params=new URLSearchParams(location.search),value=params.get('share');
 if(!value){
  let m=location.hash.match(/^#share=(.+)$/);value=m?.[1]||'';
 }
 if(!value)return false;
 try{
  state=normalizeTripObject(await decodeShareData(value));
  isShareMode=true;
  portfolio={activeTripId:state.tripId,trips:[state]};
  return true;
 }catch(err){
  console.error('Share link decode failed',err);
  return false;
 }
}
function exitShareMode(){location.href=location.origin+location.pathname}

function formatPdfDate(date){
 try{return new Intl.DateTimeFormat('zh-TW',{year:'numeric',month:'long',day:'numeric',weekday:'short'}).format(new Date(date+'T12:00:00'))}
 catch{return date}
}
function pdfSafe(v){return esc(String(v??''))}
function exportItineraryPDF(){
 const days=(state.days||[]).map((day,dayIndex)=>{
  const items=(day.items||[]).map((item,itemIndex)=>{
   const transport=item.type==='transport'&&item.transport?`
    <div class="pdf-transport">
      <b>${pdfSafe(item.transport)}</b>
      ${item.flightNo?`・航班 ${pdfSafe(item.flightNo)}`:''}
      ${item.departPlace||item.arrivePlace?`<br>${pdfSafe(item.departTime||'')} ${pdfSafe(item.departPlace||'')} → ${pdfSafe(item.arriveTime||'')} ${pdfSafe(item.arrivePlace||'')}`:''}
    </div>`:'';
   const notes=[item.publicNote,item.note].filter(Boolean).join('／');
   return `<div class="pdf-item">
    <div class="pdf-time">${pdfSafe(item.start||'--:--')}<br><span>～</span><br>${pdfSafe(item.end||'--:--')}</div>
    <div class="pdf-content">
      <div class="pdf-type">${pdfSafe(typeNames[item.type]||item.type||'行程')}</div>
      <h3>${pdfSafe(item.place||'未命名行程')}</h3>
      ${item.address?`<div class="pdf-address">📍 ${pdfSafe(item.address)}</div>`:''}
      ${transport}
      ${notes?`<div class="pdf-note">備註：${pdfSafe(notes)}</div>`:''}
    </div>
   </div>`;
  }).join('')||'<div class="pdf-empty">尚未安排當日行程</div>';
  return `<section class="pdf-day">
   <div class="pdf-day-head"><span>DAY ${dayIndex+1}</span><div><b>${pdfSafe(day.title||`Day ${dayIndex+1}`)}</b><br>${pdfSafe(formatPdfDate(day.date))}</div></div>
   ${items}
  </section>`;
 }).join('');
 const checklist=(state.checklist||[]).filter(x=>x.checked).map(x=>`<li>${pdfSafe(x.text||x.name||x.title||'')}</li>`).join('');
 const html=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8">
 <meta name="viewport" content="width=device-width,initial-scale=1">
 <title>${pdfSafe(state.tripName||'旅行行程')}</title>
 <style>
  @import url('https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC:wght@700&family=Gowun+Dodum&display=swap');
  *{box-sizing:border-box}
  body{margin:0;background:#f3ecdf;color:#3f403b;font-family:"LXGW WenKai TC","Gowun Dodum",cursive;font-weight:700}
  .pdf-wrap{max-width:860px;margin:auto;padding:32px}
  .pdf-cover{border:4px solid #3f403b;background:#d9a7a1;padding:30px;box-shadow:8px 8px 0 #3f403b;margin-bottom:30px}
  .pdf-cover h1{font-size:34px;margin:0 0 12px}.pdf-meta{font-size:18px}
  .pdf-day{break-inside:avoid-page;margin:0 0 26px;border:3px solid #3f403b;background:#fffaf0;box-shadow:6px 6px 0 #3f403b}
  .pdf-day-head{display:flex;gap:18px;align-items:center;padding:16px;border-bottom:3px solid #3f403b;background:#c7b99a}
  .pdf-day-head>span{background:#3f403b;color:#fffaf0;padding:8px 12px}
  .pdf-item{display:grid;grid-template-columns:110px 1fr;gap:18px;padding:18px;border-bottom:2px dashed #9a8f78}
  .pdf-item:last-child{border-bottom:0}.pdf-time{text-align:center;font-size:20px;border:3px solid #3f403b;background:#e5eee8;padding:12px}
  .pdf-time span{font-size:14px}.pdf-content h3{font-size:24px;margin:4px 0 10px}.pdf-type{color:#8d6f72}.pdf-address,.pdf-note,.pdf-transport{margin-top:9px;line-height:1.6}
  .pdf-transport{padding:10px;border:2px solid #3f403b;background:#f3dfac}.pdf-note{background:#eee5d3;padding:8px}
  .pdf-empty{padding:20px}.pdf-check{border:3px solid #3f403b;background:#fffaf0;padding:18px;margin-top:25px}
  .pdf-actions{position:sticky;top:0;display:flex;gap:10px;justify-content:center;padding:12px;background:#3f403b}
  .pdf-actions button{font:inherit;font-weight:700;border:2px solid #fffaf0;padding:10px 18px;background:#f3cf67;color:#3f403b}
  .pdf-help{padding:12px;text-align:center;background:#dff3ee;border-bottom:2px solid #3f403b}
  @page{size:A4;margin:12mm}
  @media print{
   body{background:#fff}.pdf-wrap{max-width:none;padding:0}.pdf-actions,.pdf-help{display:none}
   .pdf-cover,.pdf-day{box-shadow:none}
  }
  @media(max-width:600px){.pdf-wrap{padding:14px}.pdf-item{grid-template-columns:82px 1fr}.pdf-cover h1{font-size:27px}}
 </style></head><body>
 <div class="pdf-actions"><button onclick="window.print()">列印／儲存 PDF</button><button onclick="window.close()">關閉</button></div>
 <div class="pdf-help">iPhone：點「列印／儲存 PDF」，再於預覽畫面用兩指放大，最後點分享。</div>
 <main class="pdf-wrap">
  <section class="pdf-cover">
   <div>TRAVEL PLANNER ULTIMATE</div>
   <h1>${pdfSafe(state.tripName||'我的旅行')}</h1>
   <div class="pdf-meta">${pdfSafe(state.destination)}・${pdfSafe(state.start)} ～ ${pdfSafe(state.end)}・${pdfSafe(state.currency)}</div>
  </section>
  ${days}
  ${checklist?`<section class="pdf-check"><h2>已完成的旅行準備</h2><ul>${checklist}</ul></section>`:''}
 </main></body></html>`;
 const blob=new Blob([html],{type:'text/html;charset=utf-8'});
 const url=URL.createObjectURL(blob);
 let win=window.open(url,'_blank');
 if(!win){
  const a=document.createElement('a');
  a.href=url;
  a.target='_blank';
  a.rel='noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
 }
 setTimeout(()=>URL.revokeObjectURL(url),60000);
 toast('PDF 預覽已開啟');
}

function exportBackup(){
 savePortfolio();
 let blob=new Blob([JSON.stringify({version:15,portfolio},null,2)],{type:'application/json'}),a=document.createElement('a');
 a.href=URL.createObjectURL(blob);a.download='travel-planner-all-trips-backup.json';a.click();URL.revokeObjectURL(a.href)
}
function importBackup(e){let f=e.target.files?.[0];if(!f)return;let r=new FileReader();r.onload=()=>{try{state=Object.assign(defaultState(),JSON.parse(r.result));renderAll();toast('備份已匯入')}catch{toast('備份檔格式錯誤')}};r.readAsText(f)}
async function init(){
 await loadShareMode();
 normalizeTripDates();applyTheme(state.theme);renderAll();
 if(!state.setup&&!isShareMode)openWizard(false,true);
 if(state.setup){fetchRate();scheduleFxAutoUpdate();refreshProviderStatus()}
}
init();
