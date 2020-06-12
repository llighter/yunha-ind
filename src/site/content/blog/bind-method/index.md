---
title: "클래스 컴포넌트에서 Bind 이벤트 핸들러가가 필요한 이유"
subhead: |
  커스텀 엘리먼트(custom element)의 생성자(constructor)에서 컴포넌트 인스턴스에 이벤트 핸들러를 연결해주기 
date: 2020-06-12
updated: 2020-06-12
authors:
  - llighter
hero: hero.png
alt: Bind method
description: |
  why we need to bind event handlers in Class Components(Custom element)
tags:
  - post
  - javascript
  - Custom element
---

## Bind 메소드는 어디에 쓰이나?

리엑트를 사용하거나 혹은 나처럼 [커스텀 엘리먼트(custom element)][1]를 사용하여 기존의 엘리먼트들을 대신하여 기능을 캡슐화 한 [커스텀 엘리먼트][1]를 생성하고자 할 때 아래와 같은 `bind()` 메소드를 볼 수 있다. 이와 같이 [커스텀 엘리먼트][1]의 기능을 추가할 때는 생성자에서 `this` 객체에 바인딩을 해줘야 한다.

```javascript
constructor() {
   super();
   this.onCopy = this.onCopy.bind(this);
}
```

## Bind 메소드의 정체는 무엇인가?

### 데모: Function.bind()

[`bind()`][2] 메소드가 호출되면 새로이 바인딩한 함수를 생성한다. 바인딩한 함수는 원본 함수 객체를 감싸는 함수로, ECMAScript 2015에서 말하는 특이 함수 객체(exotic function object)이다. 바인딩한 함수를 호출하면 일반적으로 래핑된 함수가 호출 된다. 자세한 설명은 [여기][2]를 참조하도록 하자.

```javascript
this.x = 9;
var module = {
 x: 81,
 getX: function() { return this.x; }
};
 
module.getX(); // 81
 
var retrieveX = module.getX;
retrieveX();
// 9 반환 - 함수가 전역 스코프에서 호출됐음
 
// module과 바인딩된 'this'가 있는 새로운 함수 생성
// 신입 프로그래머는 전역 변수 x와
// module의 속성 x를 혼동할 수 있음
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81
```

### 바인딩된 함수 생성

`bind()`의 가장 간단한 사용법은 호출 방법과 관계없이 특정 this 값으로 호출되는 함수를 만드는 것이다. 초보 JavaScript 프로그래머로서 흔한 실수는 객체로부터 메소드를 추출한 뒤 그 함수를 호출할때, 원본 객체가 그 함수의 this로 사용될 것이라 기대하는 것이다.(예시 : 콜백 기반 코드에서 해당 메소드 사용). 그러나 특별한 조치가 없으면, 대부분의 경우 원본 객체는 손실됩니다. 원본 객체가 바인딩 되는 함수를 생성하면, 이러한 문제를 깔끔하게 해결할 수 있습니다.


## 정리

위의 예제에서 본 바와 같이 호출하는 함수에 객체를 바인딩 해주지 않으면 자바스크립트는 전역 객체로부터 값을 받아오려고 하기 때문에 내가 원하는 값이 아닌 다른 값을 가지게 된다. 그래서 우리는 생성자에서 컴포넌트 객체에 `this`의 이벤트 핸들러를 바인딩 해주는 것이다.

간단하게 정리한 내용이어서 개념적으로 더 깊이 알고 싶다면 Saurabh Misra가 작성한 [This is why we need to bind event handlers in Class Components in React][3] 글을 참고한다면 좋을 것이다.

[1]:https://developer.mozilla.org/ko/docs/Web/Web_Components/Using_custom_elements
[2]:https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
[3]:https://www.freecodecamp.org/news/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb/
