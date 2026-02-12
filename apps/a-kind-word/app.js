const encouragements = [
  "你今天做得很棒了。",
  "别忘了喝水。",
  "休息一下也没关系的。",
  "一件一件来。",
  "你已经很努力了。",
  "慢慢来,比较快。",
  "今天的你也在发光。",
  "深呼吸,放松一下。",
  "你值得被温柔以待。",
  "小步前进也是前进。",
  "给自己一个拥抱吧。",
  "你比想象中更坚强。",
  "每一步都算数。",
  "不必那么完美。",
  "你的感受是真实的。",
  "今天也辛苦了。",
  "慢一点没关系。",
  "你正在做得很好。",
  "相信自己的节奏。",
  "休息不是浪费时间。",
  "你已经足够好了。",
  "给自己一点耐心。",
  "今天也要好好吃饭哦。",
  "你的努力都会有意义。",
  "允许自己不开心。",
  "你不需要向任何人证明什么。",
  "进步不需要很大。",
  "你值得所有美好的事物。",
  "做自己就很好。",
  "今天也要温柔待己。",
  "你不是一个人。",
  "累了就歇一歇。",
  "你已经很棒了。",
  "给今天的自己一个赞。",
  "你的存在本身就很有价值。",
  "别对自己太严格。",
  "小小的进步也值得庆祝。",
  "你正走在对的路上。",
  "记得对自己好一点。",
  "你的努力都看得见。",
  "今天也要好好休息。",
  "你比自己想的更勇敢。",
  "慢慢来,一切都会好的。",
  "你值得拥有快乐。",
  "别忘了照顾自己。",
  "每一天都是新的开始。",
  "你做到了,真的很棒。",
  "给自己多一点温柔。",
  "你的感受很重要。",
  "今天也在认真生活呢。",
  "给自己泡一杯喜欢的饮品。",
  "阳光很好,出去走走吧。",
  "把小事做好,就是大事。",
  "不着急,慢慢变好就行。",
  "试着对自己微笑一下。",
  "把今天过好,明天自然会来。",
  "给大脑放个小假吧。",
  "不需要一直坚强,可以休息。",
  "你已经很努力在生活了。",
  "接受此刻的不完美。",
  "专注呼吸,让心静下来。",
  "去喝点温水,身体会感谢你。",
  "如果焦虑,先把手机放下五分钟。",
  "把房间稍微收拾一下,会更舒服。",
  "今天的你也配得上被好好对待。",
  "把注意力放在脚下的这一步。",
  "你并不需要一次完成所有事情。",
  "不舒服就停一下,再出发。",
  "揉揉肩,放松一下身体。",
  "给自己说句: 我已经够好了。",
  "情绪有起伏很正常。",
  "找一个喜欢的歌单听听。",
  "把任务拆小,从第一小步开始。",
  "允许自己慢一点。",
  "为自己倒数三个深呼吸。",
  "写下三件让你感到舒心的小事。",
  "今天也值得一枚小小的奖章。",
  "把期待放低一点,把赞赏给多一点。",
  "不用和任何人比较。",
  "给过去的自己道一声谢谢。",
  "你已经跨过很多难关了。",
  "把注意力放回当下。",
  "试着看向窗外,世界很温柔。",
  "说一句: 我相信自己。",
  "今天也请照顾好情绪。",
  "做一个让你舒服的小决定。",
  "再给自己一点时间吧。",
  "心累了就换个节奏。",
  "你的存在让世界更完整。",
  "请放心地慢下来。",
  "给喜欢的人发个问候。",
  "把未读信息清一清,轻松一些。",
  "不回应也可以,先照顾自己。",
  "把窗户开一会儿,换换空气。",
  "对镜子里的你说句辛苦了。",
  "紧张时可以握拳再放松。",
  "把今天的你拥抱一下。",
  "你并不需要把一切都想明白。",
  "给自己设一个温柔的边界。",
  "把喜欢的衣服穿上吧。",
  "读一页书,心会安静一点。",
  "你的节奏不需要讨好任何人。",
  "允许偶尔的无所事事。",
  "今天也请善待自己的身体。",
  "你值得被理解与接纳。",
  "把手机调成勿扰,安心一会儿。",
  "你在慢慢长成喜欢的样子。",
  "请相信温柔的力量。",
  "把视线从屏幕移到远处。",
  "喝口水,我们继续。",
  "做一件只为自己而做的小事。",
  "情绪来时,先接住它。",
  "停下来,对自己说声: 没关系。",
  "今天也值得被世界善待。",
  "你的努力正在被看见。",
  "一切都会在合适的时候到来。",
  "即使缓慢,也在前进。",
  "请为自己骄傲一分钟。",
  "把担心写下来,它就没那么重了。",
  "你有权利选择更轻松的活法。",
  "把呼吸拉长,把心事放下。",
  "谢谢你一直坚持到现在。",
  "你不需要立刻变好,先好好睡一觉。",
  "给今天的自己点个赞吧。"
];

const btn = document.getElementById('encourage-btn');
const notice = document.getElementById('notice');
let label = btn.textContent || '';
let longPressTimer = null;
let didLongPress = false;
let hideNoticeTimer = null;

function getRandomEncouragement() {
  const idx = Math.floor(Math.random() * encouragements.length);
  return encouragements[idx];
}

function pickDifferent() {
  if (encouragements.length === 0) return label;
  if (encouragements.length === 1) return encouragements[0];
  let next = getRandomEncouragement();
  let tries = 0;
  while (next === label && tries < 5) {
    next = getRandomEncouragement();
    tries += 1;
  }
  return next;
}

async function copyText(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {}
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

function showNotice(text) {
  if (hideNoticeTimer) {
    clearTimeout(hideNoticeTimer);
    hideNoticeTimer = null;
  }
  notice.textContent = text;
  notice.classList.remove('opacity-0');
  notice.classList.add('opacity-100');
  hideNoticeTimer = setTimeout(() => {
    notice.classList.remove('opacity-100');
    notice.classList.add('opacity-0');
    setTimeout(() => { notice.textContent = ''; }, 200);
  }, 1000);
}

function handleClick() {
  if (didLongPress) {
    didLongPress = false;
    return;
  }
  const nextLabel = pickDifferent();
  btn.style.opacity = '0';
  requestAnimationFrame(() => {
    label = nextLabel;
    btn.textContent = nextLabel;
    btn.style.opacity = '1';
  });
}

function startLongPress() {
  if (longPressTimer) clearTimeout(longPressTimer);
  didLongPress = false;
  longPressTimer = setTimeout(async () => {
    didLongPress = true;
    const ok = await copyText(label);
    showNotice(ok ? '已复制到剪贴板' : '复制失败');
  }, 600);
}

function cancelLongPress() {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
}

btn.addEventListener('click', handleClick);
btn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleClick();
  }
});
btn.addEventListener('mousedown', startLongPress);
btn.addEventListener('mouseup', cancelLongPress);
btn.addEventListener('mouseleave', cancelLongPress);
btn.addEventListener('touchstart', startLongPress, {passive: true});
btn.addEventListener('touchend', cancelLongPress);
btn.addEventListener('touchcancel', cancelLongPress);
