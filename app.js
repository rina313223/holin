/**
 * 喝林 Holin — 雙重獨立隨機飲料選擇器
 */

(function () {
  'use strict';

  // ===== 資料陣列 =====
  const types = ['純茶', '奶類', '果茶', '無咖啡因', '沁酸系'];

  const stores = [
    // — 第一批 —
    '翰林茶館',
    '春陽茶事',
    '春水堂',
    'CoCo都可',
    '日出茶太',
    '貢茶',
    '鹿角巷',
    '快可立',
    '幸福堂',
    '迷客夏',
    '茶之魔手',
    '大苑子',
    '休閒小站',
    "TEA'S原味",
    '珍煮丹',
    '老虎堂',
    '茶湯會',
    'COMEBUY',
    '麥吉 Machi',
    'Mr. Wish',
    '丸作食茶',
    '吃茶三千',
    'DING TEA',
    '台茶一號',
    // — 第二批 —
    '南海茶道',
    '清心福全',
    '50嵐',
    '老賴茶棧',
    '麻古茶坊',
    '好了啦超大杯',
    '甲文青',
    '三分春色',
    '天仁茗茶',
    '康青龍',
    '鶴茶樓',
    '先喝道',
    '烏弄 UNOCHA',
    'SOMA 特調飲品',
    '約翰紅茶公司',
    '可不可熟成紅茶',
    '一手私藏世界紅茶',
    '一沐日',
    '龜記茗品',
    '得正',
    '上宇林',
    '水巷茶弄',
    '八曜和茶',
    '不要對我尖叫',
    'BLIKE 奶茶專門',
    '五桐號',
    '喫茶趣',
    '十口茶',
    '叮哥茶飲',
    // — 第三批 —
    '再睡5分鐘',
    '特好喝',
    '十盛 SHISHENG',
    '拾汣茶屋',
    '有飲',
    'UG 樂己',
    'Machi Machi',
    '黛黛茶 DailyDae',
    '署茗職茶 @AtTea',
    'COFFEE.TEA.OR',
    '樂法 Le Phare',
    '樺達奶茶',
    // — 第四批（新增） —
    '橘子工坊',
    '黑丸嫩仙草',
    '多那之',
    '茶本味手作茶舖',
    '紅太陽',
    '自在軒',
    '手作功夫茶',
    '喬治派克',
    '鮮茶道',
    '圓石',
    '台灣第一味',
    '喫茶小舖',
    '嚮茶',
    '優汁台茶',
    '御可香',
    '大沏茶',
    '大井烤茶',
    '北回木瓜牛奶',
    'Ikiwi趣味果飲',
    '好茶坊',
    '蓋不同',
    '十二韻茶飲',
    '茶聚',
    '鮮自然特極連鎖茶飲',
    '清原芋圓',
    '茶明載波',
    '布萊恩紅茶',
    '圓稼嚼感飲品',
    '老江紅茶牛奶',
    '樂台羽茶',
    '季洋莊園咖啡',
    '春宅',
    '小佐お茶作',
    '理茶',
    '序序茶',
    '菁囍',
    '萬波島嶼紅茶',
  ];

  // ===== DOM 元素 =====
  const reelType = document.getElementById('reelType');
  const reelStore = document.getElementById('reelStore');
  const btnSpin = document.getElementById('btnSpin');
  const resultSection = document.getElementById('resultSection');
  const resultText = document.getElementById('resultText');
  const btnMap = document.getElementById('btnMap');

  // ===== 狀態 =====
  let isSpinning = false;

  // ===== 隨機取值（排除指定值，避免連續同結果） =====
  function getRandomItem(arr, exclude) {
    if (arr.length <= 1) return arr[0];
    let item;
    do {
      item = arr[Math.floor(Math.random() * arr.length)];
    } while (item === exclude);
    return item;
  }

  // ===== 拉霸跳動動畫 =====
  function animateReel(reelEl, dataArr, duration, onDone) {
    const windowEl = reelEl.parentElement;
    const spanEl = reelEl.querySelector('span');

    windowEl.classList.remove('done', 'stopping');
    windowEl.classList.add('spinning');

    const intervalBase = 50;
    const startTime = Date.now();
    let currentInterval = intervalBase;
    let timer;

    function tick() {
      const elapsed = Date.now() - startTime;
      spanEl.textContent = dataArr[Math.floor(Math.random() * dataArr.length)];

      if (elapsed < duration) {
        // 最後 30% 的時間逐步減慢
        const progress = elapsed / duration;
        if (progress > 0.7) {
          currentInterval = intervalBase + (progress - 0.7) / 0.3 * 300;
        }
        timer = setTimeout(tick, currentInterval);
      } else {
        windowEl.classList.remove('spinning');
        windowEl.classList.add('stopping');

        const finalValue = onDone();
        spanEl.textContent = finalValue;

        setTimeout(() => {
          windowEl.classList.remove('stopping');
          windowEl.classList.add('done');
        }, 400);
      }
    }

    timer = setTimeout(tick, currentInterval);
  }

  // ===== 灑彩紙效果 =====
  function spawnConfetti(count) {
    const colors = ['#e94560', '#f5a623', '#00d2ff', '#a855f7', '#22c55e', '#f472b6'];
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'confetti';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.top = '-10px';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.setProperty('--fall-duration', (1.5 + Math.random() * 2) + 's');
      el.style.width = (6 + Math.random() * 6) + 'px';
      el.style.height = (6 + Math.random() * 6) + 'px';
      el.style.animationDelay = Math.random() * 0.5 + 's';
      document.body.appendChild(el);

      el.addEventListener('animationend', () => el.remove());
    }
  }

  // ===== Google Maps 搜尋連結 =====
  function buildMapUrl(storeName) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storeName)}`;
  }

  // ===== 顯示結果 =====
  function showResult(selectedType, selectedStore) {
    resultText.innerHTML =
      '今天就去 <span class="highlight-store">' + selectedStore + '</span> 買杯 ' +
      '<span class="highlight-type">' + selectedType + '</span> 吧！';

    btnMap.href = buildMapUrl(selectedStore);
    resultSection.classList.add('visible');

    spawnConfetti(40);
  }

  // ===== 主要流程 =====
  function spin() {
    if (isSpinning) return;
    isSpinning = true;
    btnSpin.disabled = true;
    resultSection.classList.remove('visible');

    const currentType = reelType.querySelector('span').textContent;
    const currentStore = reelStore.querySelector('span').textContent;

    let selectedType, selectedStore;

    const typeDuration = 2000 + Math.random() * 500;
    const storeDuration = 2500 + Math.random() * 500;

    animateReel(reelType, types, typeDuration, () => {
      selectedType = getRandomItem(types, currentType);
      return selectedType;
    });

    animateReel(reelStore, stores, storeDuration, () => {
      selectedStore = getRandomItem(stores, currentStore);
      return selectedStore;
    });

    // 等最長的動畫結束後顯示結果
    setTimeout(() => {
      showResult(selectedType, selectedStore);
      isSpinning = false;
      btnSpin.disabled = false;
    }, storeDuration + 500);
  }

  // ===== 附近飲料店（GPS 定位） =====
  const btnNearby = document.getElementById('btnNearby');
  const NEARBY_FALLBACK = 'https://www.google.com/maps/search/?api=1&query=飲料店';

  function updateNearbyLink(lat, lng) {
    btnNearby.href =
      `https://www.google.com/maps/search/飲料店/@${lat},${lng},15z`;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => updateNearbyLink(pos.coords.latitude, pos.coords.longitude),
      () => { btnNearby.href = NEARBY_FALLBACK; }
    );
  } else {
    btnNearby.href = NEARBY_FALLBACK;
  }

  // ===== 事件綁定 =====
  btnSpin.addEventListener('click', spin);

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && document.activeElement !== btnMap) {
      e.preventDefault();
      spin();
    }
  });
})();
