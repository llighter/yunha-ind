import { MDCRipple } from '@material/ripple/index';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCTabBar } from '@material/tab-bar';
import { MDCList } from "@material/list";
import { MDCDrawer } from "@material/drawer";

// // Instantiation

// // ripple
// const ripple = new MDCRipple(document.querySelector('.foo-button'));

// top-app-bar
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

// // tap bar
const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));

// card
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
// const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
//   return new MDCRipple(el);
// });

// drawer
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

// Drawer 안에서 사용
const list = MDCList.attachTo(document.querySelector('.mdc-list'));
list.wrapFocus = true;

// tabBar.listen('MDCTabBar:activated', (activatedEvent) => {
//   document.querySelectorAll('.adopt-a-pup-body').forEach((element, index) => {
//     if (index === activatedEvent.detail.index) {
//       element.classList.remove('adopt-a-pup-body--hidden');
//     } else {
//       element.classList.add('adopt-a-pup-body--hidden');
//     }
//   });
// });

const listEl = document.querySelector('.mdc-drawer .mdc-list');
const mainContentEl = document.querySelector('.main-content');
const menu = document.querySelector('.mdc-top-app-bar__navigation-icon');

listEl.addEventListener('click', (event) => {
  drawer.open = false;
});

// Deprecated
// TODO: 일단 위에 방식과 반대 방식으로 했는데 이게 맞는지 확인
// menu.addEventListener('click', (e) => {
//     drawer.open = true;
// })

// drawer를 열 때 공식문서에서 사용하는 예제
topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});

// TODO: 예제에 있는 코드인데 어떤 의미인지 파악해야 한다.
// 입력값이 있으면 그 곳으로 포커싱을 옮기는다는것 같은데 내 사이트에서 필요한지는 의문이다.
document.body.addEventListener('MDCDrawer:closed', () => {
  mainContentEl.querySelector('input, button').focus();
});



