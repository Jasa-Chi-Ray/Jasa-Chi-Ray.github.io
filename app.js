'use strict';

const toast = document.querySelector('.toast');
let toastTimer;
function announce(message) {
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2500);
}

function activateTab(tab) {
  const group = tab.closest('[role="tablist"]');
  group.querySelectorAll('[role="tab"]').forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
  if (tab.dataset.preview) {
    const captions = {
      chat: '01 — 熟悉的对话界面，连接你自己的工作流。',
      login: '02 — 独立的登录入口，让用户与管理各归其位。',
      access: '03 — 明确访问边界，按需配置禁止访问路径。'
    };
    document.getElementById('preview-description').textContent = captions[tab.dataset.preview];
  }

}

document.querySelectorAll('[role="tablist"]').forEach(group => {
  const tabs = [...group.querySelectorAll('[role="tab"]')];
  group.addEventListener('click', event => {
    const tab = event.target.closest('[role="tab"]');
    if (tab) activateTab(tab);
  });
  group.addEventListener('keydown', event => {
    const index = tabs.indexOf(document.activeElement);
    if (index < 0) return;
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    activateTab(tabs[next]);
    tabs[next].focus();
  });
});

document.querySelectorAll('.copy-button').forEach(button => {
  button.setAttribute('aria-label', `复制 ${button.parentElement.querySelector('span').textContent} 命令`);
  button.addEventListener('click', async () => {
    const code = button.closest('.code-block').querySelector('code');
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(code.textContent);
      button.textContent = '已复制 ✓';
      announce('命令已复制');
      setTimeout(() => { button.textContent = '复制'; }, 2000);
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
      announce('已选中代码，请按 Ctrl+C（Mac 使用 ⌘C）复制');
    }
  });
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '打开导航');
  navigation.classList.remove('is-open');
}
menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  menuButton.setAttribute('aria-label', expanded ? '关闭导航' : '打开导航');
  navigation.classList.toggle('is-open', expanded);
});
navigation?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});

const dialog = document.getElementById('image-dialog');
document.querySelector('.enlarge')?.addEventListener('click', () => {
  if (!dialog) return;
  const source = document.querySelector('.preview-frame [role="tabpanel"]:not([hidden]) img');
  if (!source) return;
  const target = dialog.querySelector('img');
  target.src = source.src;
  target.alt = source.alt;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
});
dialog?.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog?.addEventListener('close', () => { document.body.style.overflow = ''; });

const sectionLinks = [...document.querySelectorAll('.docs-sidebar > a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting);
    if (!visible.length) return;
    sectionLinks.forEach(link => link.classList.toggle('active', link.hash === `#${visible[0].target.id}`));
  }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
  sectionLinks.forEach(link => { const target = document.querySelector(link.hash); if (target) observer.observe(target); });
}


// Material-style press feedback shared by every project page.
// Render outside controls so copying text or toggling details cannot remove the wave.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function pressFeedback(target, clientX, clientY) {
  if (reducedMotion.matches || target.matches(':disabled, [aria-disabled="true"]')) return;
  const rect = target.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const x = clientX ?? rect.left + rect.width / 2;
  const y = clientY ?? rect.top + rect.height / 2;
  const diameter = 2 * Math.hypot(Math.max(x - rect.left, rect.right - x), Math.max(y - rect.top, rect.bottom - y));
  const layer = document.createElement('span');
  layer.className = 'press-layer';
  layer.setAttribute('aria-hidden', 'true');
  Object.assign(layer.style, {left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px`, borderRadius: getComputedStyle(target).borderRadius});
  const wave = document.createElement('span');
  wave.className = 'press-wave';
  Object.assign(wave.style, {width: `${diameter}px`, height: `${diameter}px`, left: `${x - rect.left - diameter / 2}px`, top: `${y - rect.top - diameter / 2}px`});
  layer.append(wave);
  document.body.append(layer);
  wave.addEventListener('animationend', () => layer.remove(), {once: true});
  setTimeout(() => layer.remove(), 650);
}
const interactiveSelector = 'button, a[href], summary';
document.addEventListener('pointerdown', event => {
  if (event.button !== 0) return;
  const target = event.target.closest(interactiveSelector);
  if (target) pressFeedback(target, event.clientX, event.clientY);
});
document.addEventListener('keydown', event => {
  if (event.repeat || !['Enter', ' '].includes(event.key)) return;
  const target = event.target.closest(interactiveSelector);
  if (target && !(target.matches('a') && event.key === ' ')) pressFeedback(target);
});
// Avoid a fixed wave being left behind when a link scrolls the document.
window.addEventListener('scroll', () => document.querySelectorAll('.press-layer').forEach(layer => layer.remove()), {passive: true});
