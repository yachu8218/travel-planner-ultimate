
const STORAGE_KEY='travelPlannerProV11';
const themes={
 cream:{name:'奶油手帳',v:['#a9ddd2','#c9bce9','#f5dfa0','#f6bea8','#f8f1e6','#fffaf1']},
 rose:{name:'乾燥玫瑰',v:['#d8a5b3','#e6c1ca','#f3d6a4','#d7b7d8','#f8ecec','#fff8f1']},
 forest:{name:'奶油森林',v:['#9fc4aa','#c6d8b7','#efd89a','#d6a5a5','#edf3e9','#fff7e9']},
 sky:{name:'晴空手帳',v:['#9acddb','#b7d7eb','#f2dc9e','#e6b1bd','#edf7f8','#fff9ed']},
 lavender:{name:'薰衣草紙膠帶',v:['#b9aadf','#d7cbed','#f1dea3','#e4b2c5','#f3eff9','#fff9ee']},
 cocoa:{name:'可可文具',v:['#b9957b','#d8c1aa','#ecd49a','#c99da7','#f1e8df','#fff8ed']}
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
const flightPresets={
 'KE2086':{airline:'大韓航空',from:'桃園國際機場 第二航廈（TPE）',to:'金海國際機場（PUS）',depart:'12:00',arrive:'15:30',fromGeo:{name:'桃園國際機場 第二航廈',address:'台灣桃園市大園區航站南路9號',lat:25.07755,lon:121.23224},toGeo:{name:'金海國際機場',address:'대한민국 부산광역시 강서구 공항진입로 108',lat:35.17953,lon:128.93822}},
 'LJ751':{airline:'真航空',from:'金海國際機場（PUS）',to:'桃園國際機場 第一航廈（TPE）',depart:'22:00',arrive:'23:40',fromGeo:{name:'金海國際機場',address:'대한민국 부산광역시 강서구 공항진입로 108',lat:35.17953,lon:128.93822},toGeo:{name:'桃園國際機場 第一航廈',address:'台灣桃園市大園區航站南路17之1號',lat:25.08167,lon:121.23791}}
};
let state=loadState();
let isShareMode=false,activePhraseCat='全部',map,mapMarkers=[],userMarker,fxRate=0,suggestTimer=null,suggestionCache={};

function defaultState(){
 return {
  setup:false,theme:'cream',tripName:'',destination:'',countryCode:'',currency:'KRW',lang:'ko',locale:'ko-KR',langName:'韓文',
  start:'',end:'',center:[35.1796,129.0756],selectedDay:null,days:[],
  people:[{id:1,name:'我'}],expenses:[],checklist:checklistDefaults.map((x,i)=>({id:i+1,group:x[0],text:x[1],done:false})),
  rateCache:{},translations:{},sharePrefs:{hideMoney:true,hidePrivate:true}
 }
}
function loadState(){try{return Object.assign(defaultState(),JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}'))}catch{return defaultState()}}
function saveState(){if(!isShareMode)localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function toast(t){$('toast').textContent=t;$('toast').style.display='block';setTimeout(()=>$('toast').style.display='none',1800)}
function uid(){return Date.now()+Math.floor(Math.random()*10000)}
function applyTheme(k){state.theme=k;let v=themes[k]?.v||themes.cream.v,st=document.documentElement.style;['--p','--p2','--yellow','--pink','--bg1','--bg2'].forEach((x,i)=>st.setProperty(x,v[i]));saveState();renderThemes()}
function selectedDay(){return state.days.find(d=>d.id===state.selectedDay)||state.days[0]}
function dateLabel(d){return d?new Date(d+'T00:00:00').toLocaleDateString('zh-TW',{month:'numeric',day:'numeric',weekday:'short'}):''}
function longDate(d){return d?new Date(d+'T00:00:00').toLocaleDateString('zh-TW',{year:'numeric',month:'long',day:'numeric',weekday:'long'}):''}
function daysRange(a,b){let out=[],d=new Date(a+'T00:00:00'),e=new Date(b+'T00:00:00');while(d<=e){out.push(d.toISOString().slice(0,10));d.setDate(d.getDate()+1)}return out}
function enforceDestination(){let r=destinationRules.find(x=>x.re.test(`${state.destination} ${state.countryCode}`));if(r)Object.assign(state,{countryCode:r.cc,currency:r.cur,lang:r.lang,locale:r.locale,langName:r.lname});if(state.countryCode==='KR')Object.assign(state,{currency:'KRW',lang:'ko',locale:'ko-KR',langName:'韓文'})}
function switchTab(id){document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));$(id).classList.add('active');document.querySelectorAll('.bottom-nav button').forEach(x=>x.classList.toggle('active',x.dataset.tab===id));if(id==='map')setTimeout(()=>{initMap();plotSelectedDay()},100);if(id==='money')fetchRate()}
function renderAll(){
 enforceDestination();applyTheme(state.theme);
 $('heroTitle').textContent=state.tripName||'旅行積木';
 $('heroSub').textContent=state.setup?`${state.destination}・${state.start}～${state.end}・${state.currency}・${state.langName}`:'把每一段旅程，拼成最可愛的回憶。';
 document.querySelectorAll('.owner-only').forEach(x=>x.classList.toggle('hidden',isShareMode));
 $('shareBanner').classList.toggle('hidden',!isShareMode);
 renderHome();renderChecklist();renderPlan();renderMoney();renderPhrases();renderQuantityTable();renderThemes();renderSettings();
 saveState()
}
function renderHome(){
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
function placeField(id,label,val,placeholder='輸入地點名稱或地址'){return `<div class="suggest-wrap"><label>${label}</label><input id="${id}" class="input" autocomplete="off" value="${esc(val||'')}" placeholder="${placeholder}" oninput="queueSuggestions('${id}',this.value)"><div id="${id}Suggestions" class="suggestions"></div></div>`}
function transportFields(i){let opts=['台灣高鐵','機場捷運','台北捷運','台中捷運','高雄捷運','台鐵','公車','計程車','飛機','地鐵','步行','其他'];return `<div id="transportFields" class="${i.type==='transport'?'':'hidden'}"><label>交通方式</label><select id="itemTransport" class="input" onchange="$('flightNoWrap').classList.toggle('hidden',this.value!=='飛機')">${opts.map(x=>`<option ${i.transport===x?'selected':''}>${x}</option>`).join('')}</select><div id="flightNoWrap" class="${i.transport==='飛機'?'':'hidden'}"><label>航班號</label><input id="itemFlightNo" class="input" value="${esc(i.flightNo||'')}" placeholder="例如 KE2086"><button class="brick white full space-top" type="button" onclick="searchFlight()">搜尋航班資訊</button></div><div class="grid2"><div><label>搭乘時間</label><input id="departTime" type="time" class="input" value="${esc(i.departTime||'')}"></div><div><label>抵達時間</label><input id="arriveTime" type="time" class="input" value="${esc(i.arriveTime||'')}"></div></div>${placeField('departPlace','搭乘地點',i.departPlace,'車站、機場或地址')}${placeField('arrivePlace','抵達地點',i.arrivePlace,'車站、機場或地址')}</div>`}
function openItemEditor(id){
 let d=selectedDay(),i=id?d.items.find(x=>x.id===id):{type:'attraction',startTime:'09:00',endTime:'10:00',place:'',note:'',privateNote:''};suggestionCache={mainPlace:i.lat?{name:i.place,address:i.address,lat:i.lat,lon:i.lon}:null,departPlace:i.departGeo||null,arrivePlace:i.arriveGeo||null};
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
 let text=q.toLowerCase(),transport=$('itemTransport')?.value||'';
 return stationPresets.filter(x=>[x.name,...x.aliases].some(a=>a.toLowerCase().includes(text)||text.includes(a.toLowerCase())) || ((transport==='台灣高鐵'||transport==='機場捷運')&&x.country==='TW'&&x.name.includes(q))).slice(0,8).map(x=>({...x,display_name:x.address,preset:true}));
}
function searchCountryHint(q,id){
 let transport=$('itemTransport')?.value||'';
 if(transport==='台灣高鐵'||transport==='機場捷運'||/高鐵|機捷|桃園機場|台北車站|台中站|左營/i.test(q))return'tw';
 if(/부산|서울|해운대|남포|대한민국|釜山|首爾|海雲台|南浦/i.test(q)||state.countryCode==='KR')return'kr';
 return state.countryCode?.toLowerCase()||''
}
async function nominatimSearch(q,country=''){
 let params=new URLSearchParams({format:'jsonv2',addressdetails:'1',limit:'8','accept-language':'zh-TW'});params.set('q',q);if(country)params.set('countrycodes',country);
 let r=await fetch('https://nominatim.openstreetmap.org/search?'+params.toString(),{headers:{Accept:'application/json'}});if(!r.ok)throw new Error('Nominatim '+r.status);return await r.json()
}
async function photonSearch(q){
 let r=await fetch('https://photon.komoot.io/api/?limit=8&lang=zh&q='+encodeURIComponent(q));if(!r.ok)throw 0;let j=await r.json();return (j.features||[]).map(f=>({name:f.properties.name||f.properties.street||q,display_name:[f.properties.name,f.properties.street,f.properties.city,f.properties.state,f.properties.country].filter(Boolean).join(', '),lat:f.geometry.coordinates[1],lon:f.geometry.coordinates[0]}))
}
async function fetchSuggestions(id,q){
 let box=$(id+'Suggestions');if(!box)return;box.classList.add('show');box.innerHTML='<button>搜尋中…</button>';
 try{
  let presets=presetMatches(q,id),country=searchCountryHint(q,id),queries=[q];
  if(state.destination&&!/高鐵|機捷|桃園機場/i.test(q))queries.push(`${q}, ${state.destination}`);
  let list=[];
  try{
   let api=await fetch(`/api/places-search?q=${encodeURIComponent(q)}&destination=${encodeURIComponent(state.destination||'')}`);
   if(api.ok){let body=await api.json();list.push(...(body.results||[]))}
  }catch{}
  for(const query of queries){try{let a=await nominatimSearch(query,country);list.push(...a)}catch{}if(list.length>=6)break}
  if(list.length<3){try{list.push(...await photonSearch(`${q} ${country==='tw'?'Taiwan':country==='kr'?'South Korea':state.destination||''}`))}catch{}}
  let seen=new Set();list=[...presets,...list].filter(x=>{let k=`${x.lat},${x.lon}`;if(seen.has(k))return false;seen.add(k);return true}).slice(0,10);
  box._items=list;box.innerHTML=list.length?list.map((x,n)=>`<button type="button" onclick="chooseSuggestion('${id}',${n})"><b>${esc(x.name||x.display_name.split(',')[0])}</b><small>${esc(x.display_name||x.address||'')} ${x.source?`<span class=\"source-badge\">${esc(x.source)}</span>`:''}</small></button>`).join(''):`<button type="button" onclick="useTypedPlace('${id}')">找不到結果，點此使用目前輸入文字並稍後定位</button>`
 }catch{box.innerHTML=`<button type="button" onclick="useTypedPlace('${id}')">搜尋服務暫時無法使用，點此保留目前輸入文字</button>`}
}
function useTypedPlace(id){let name=$(id).value.trim();if(!name)return;let o={name,address:name,lat:null,lon:null};suggestionCache[id]=o;hideSuggestions(id);if(id==='mainPlace'){$('chosenAddress').textContent='📍 '+name;$('chosenAddress').classList.remove('hidden')}toast('已保留文字，儲存後會再嘗試定位')}
function chooseSuggestion(id,n){let box=$(id+'Suggestions'),x=box._items?.[n];if(!x)return;let o={name:x.name||x.display_name?.split(',')[0]||x.address,address:x.display_name||x.address||x.name,lat:+x.lat,lon:+x.lon};$(id).value=o.name;suggestionCache[id]=o;hideSuggestions(id);if(id==='mainPlace'){$('chosenAddress').textContent='📍 '+o.address;$('chosenAddress').classList.remove('hidden')}}
function hideSuggestions(id){$(id+'Suggestions')?.classList.remove('show')}
document.addEventListener('click',e=>{if(!e.target.closest('.suggest-wrap'))document.querySelectorAll('.suggestions').forEach(x=>x.classList.remove('show'))});
async function geocode(q){
 let preset=presetMatches(q,'mainPlace')[0];if(preset)return{lat:+preset.lat,lon:+preset.lon,address:preset.address};
 let country=searchCountryHint(q,'mainPlace'),queries=[q];if(state.destination)queries.push(`${q}, ${state.destination}`);
 for(const query of queries){try{let a=await nominatimSearch(query,country);if(a?.[0])return{lat:+a[0].lat,lon:+a[0].lon,address:a[0].display_name}}catch{}}
 try{let a=await photonSearch(`${q} ${country==='tw'?'Taiwan':country==='kr'?'South Korea':state.destination||''}`);if(a?.[0])return{lat:+a[0].lat,lon:+a[0].lon,address:a[0].display_name}}catch{}
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
function renderMoney(){let total=state.expenses.reduce((s,e)=>s+Number(e.amount||0),0);$('moneySummary').innerHTML=`<div class="small" style="color:#fff">旅程總支出</div><div class="amount">${state.currency} ${total.toLocaleString()}</div><div>${state.people.length} 位旅伴・${state.expenses.length} 筆消費</div>`;$('fxCurrency').value=state.currency;$('peopleChips').innerHTML=state.people.map(p=>`<span class="chip">${esc(p.name)}${!isShareMode&&state.people.length>1?`<button onclick="removePerson(${p.id})">×</button>`:''}</span>`).join('');$('expenses').innerHTML=isShareMode&&state.sharePrefs.hideMoney?'<div class="card lego small">分帳明細已由分享者隱藏。</div>':state.expenses.map(e=>`<div class="card lego between"><div><b>${esc(e.title)}</b><div class="small">${esc(personName(e.payerId))} 先付款・${e.sharedBy.length} 人分攤</div></div><b>${state.currency} ${Number(e.amount).toLocaleString()}</b></div>`).join('');renderSettlements()}
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
function convertFx(){$('fxResult').textContent='約 NT$ '+Math.round((+$('fxAmount').value||0)*fxRate).toLocaleString()}
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
async function refreshProviderStatus(){let f=$('flightProviderStatus'),s=$('serviceProviderStatus');if(!f||!s)return;f.innerHTML=s.innerHTML='<div class="small">正在檢查…</div>';try{let r=await fetch('/api/provider-status'),j=await r.json();f.innerHTML=(j.flight||[]).map(x=>`<div class="provider-item"><span><b>${esc(x.name)}</b><br><small>${esc(x.use||'')}</small></span><span class="${x.configured?'status-ok':'status-off'}">${x.configured?'已設定':'待設定'}</span></div>`).join('');s.innerHTML=(j.services||[]).map(x=>`<div class="provider-item"><span><b>${esc(x.name)}</b><br><small>${esc(x.use||'')}</small></span><span class="${x.configured?'status-ok':'status-off'}">${x.configured?'已設定':'待設定'}</span></div>`).join('')}catch{f.innerHTML=s.innerHTML='<div class="api-note small">Netlify Functions 尚未部署或暫時無法連線。</div>'}}
function renderThemes(){$('themeGrid').innerHTML=Object.entries(themes).map(([k,t])=>`<button class="theme-option ${state.theme===k?'active':''}" style="background:linear-gradient(135deg,${t.v[0]},${t.v[1]})" onclick="applyTheme('${k}')">${t.name}</button>`).join('')}
function renderSettings(){$('settingsSummary').innerHTML=`旅行：${esc(state.tripName)}<br>目的地：${esc(state.destination)}<br>日期：${esc(state.start)} ～ ${esc(state.end)}<br>當地幣別：${state.currency}<br>當地語言：${state.langName}（${state.locale}）`;$('languageBadge').textContent=`${state.langName}・${state.currency}`;updateTranslatePlaceholder()}
function openWizard(edit=false){$('wizard').classList.add('show');$('wizardDestination').value=state.destination;$('wizardStart').value=state.start;$('wizardEnd').value=state.end;$('wizardName').value=state.tripName}
async function finishWizard(){let dest=$('wizardDestination').value.trim(),start=$('wizardStart').value,end=$('wizardEnd').value,name=$('wizardName').value.trim();if(!dest||!start||!end||end<start)return $('wizardStatus').textContent='請輸入完整目的地與正確日期。';$('wizardStatus').textContent='正在偵測國家、語言與幣別…';try{let rule=destinationRules.find(x=>x.re.test(dest)),g=await geocode(dest);if(!g)throw 0;Object.assign(state,{setup:true,tripName:name||`${dest}旅行`,destination:dest,start,end,center:[g.lat,g.lon]});if(rule)Object.assign(state,{countryCode:rule.cc,currency:rule.cur,lang:rule.lang,locale:rule.locale,langName:rule.lname});let old=new Map(state.days.map(d=>[d.date,d]));state.days=daysRange(start,end).map((date,i)=>old.get(date)||{id:uid()+i,title:`Day ${i+1}`,date,items:[]});state.selectedDay=state.days[0]?.id;$('wizard').classList.remove('show');renderAll();fetchRate();toast('旅行已建立')}catch{$('wizardStatus').textContent='找不到目的地，請輸入較完整的城市名稱。'}}
function showModal(html){$('modal').innerHTML=html;$('modalBackdrop').classList.add('show')}
function closeModal(){$('modalBackdrop').classList.remove('show')}
function openShareModal(){let opts=state.sharePrefs;showModal(`<h3>👨‍👩‍👧‍👦 分享給親友</h3><p class="small">產生唯讀分享連結。家人不用登入，也能查看行程。</p><label><input id="hideMoney" type="checkbox" ${opts.hideMoney?'checked':''}> 隱藏分帳與花費</label><label><input id="hidePrivate" type="checkbox" ${opts.hidePrivate?'checked':''}> 隱藏私人備註</label><div class="modal-footer"><button class="brick white" onclick="closeModal()">取消</button><button class="brick primary" onclick="createShareLink()">產生分享連結</button></div>`)}
function compactShareData(){let copy=JSON.parse(JSON.stringify(state));if($('hideMoney')?.checked){copy.expenses=[];copy.sharePrefs.hideMoney=true}else copy.sharePrefs.hideMoney=false;if($('hidePrivate')?.checked){copy.days.forEach(d=>d.items.forEach(i=>delete i.privateNote));copy.sharePrefs.hidePrivate=true}else copy.sharePrefs.hidePrivate=false;delete copy.rateCache;delete copy.translations;return copy}
function encodeShare(obj){let str=encodeURIComponent(JSON.stringify(obj)).replace(/%([0-9A-F]{2})/g,(_,p)=>String.fromCharCode('0x'+p));return btoa(str).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
function decodeShare(v){let b=v.replace(/-/g,'+').replace(/_/g,'/');while(b.length%4)b+='=';let str=atob(b),pct=[...str].map(c=>'%'+c.charCodeAt(0).toString(16).padStart(2,'0')).join('');return JSON.parse(decodeURIComponent(pct))}
function createShareLink(){state.sharePrefs={hideMoney:$('hideMoney').checked,hidePrivate:$('hidePrivate').checked};saveState();let url=location.origin+location.pathname+'#share='+encodeShare(compactShareData()),qr=`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;showModal(`<h3>分享連結已建立</h3><div class="qr-wrap"><img src="${qr}" alt="分享 QR Code"></div><input id="shareUrl" class="input space-top" value="${esc(url)}" readonly><div class="grid2 space-top"><button class="brick primary" onclick="shareNative()">分享到 LINE</button><button class="brick white" onclick="copyShareUrl()">複製連結</button></div><p class="small">任何拿到連結的人都能查看分享內容，請不要放入護照號碼等敏感資料。</p>`)}
async function shareNative(){let url=$('shareUrl').value;try{if(navigator.share)await navigator.share({title:state.tripName,text:`${state.tripName} 行程`,url});else{await navigator.clipboard.writeText(url);toast('連結已複製，可貼到 LINE')}}catch{}}
async function copyShareUrl(){await navigator.clipboard.writeText($('shareUrl').value);toast('分享連結已複製')}
function loadShareMode(){let m=location.hash.match(/^#share=(.+)$/);if(!m)return false;try{state=decodeShare(m[1]);isShareMode=true;return true}catch{return false}}
function exitShareMode(){location.hash='';location.reload()}
function exportBackup(){let blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`${state.tripName||'travel'}-backup.json`;a.click();URL.revokeObjectURL(a.href)}
function importBackup(e){let f=e.target.files?.[0];if(!f)return;let r=new FileReader();r.onload=()=>{try{state=Object.assign(defaultState(),JSON.parse(r.result));renderAll();toast('備份已匯入')}catch{toast('備份檔格式錯誤')}};r.readAsText(f)}
function init(){
 loadShareMode();applyTheme(state.theme);renderAll();
 if(!state.setup&&!isShareMode)openWizard();
 if(state.setup){fetchRate();scheduleFxAutoUpdate();refreshProviderStatus()}
}
init();
