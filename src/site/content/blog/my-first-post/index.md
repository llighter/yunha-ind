---
title: "My First blog post"
subhead: |
  My first blog post using 11ty and Material Design Component.
date: 2019-08-01
updated: 2019-08-17
authors:
  - llighter
hero: hero.jpg
alt: First Step for my website
description: |
  My first blog post using 11ty and Material Design Component.
tags:
  - blog
---

## this is phasse

A great deal of talent is lost in the world for want of a little courage.

## 이건 한글이지

동해물과 백두산이 마르고 닳도록

Hi my name is Park, Yunha.
I'm the owner of this website.
Welcome to all of you guys.
Feel free to seeing around.

{% YouTube 'zEks4QvLRjs' %}

``` js
// this is the comment
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry);
  }
})

observer.observe({type: 'layout-shift', buffered: true});
```

## Aside 유형

{% Aside 'codelab' %}
Technically, this test will also pass if your site contains any
`h1`-`h6` elements or any of the HTML5 landmark
elements. But although the test is vague in its requirements, it's still
nice to pass it if you can!
{% endAside %}

{% Aside 'caution' %}
사용시 주의사항을 작성하는데 사용한다.
{% endAside %}

{% Aside 'key-term' %}
용어를 설명할 때 사용한다.
{% endAside %}

{% Aside 'caution' %}
주의사항을 작성할 때 사용한다.
{% endAside %}

{% Aside 'warning' %}
경고사항을 작성할 때 사용한다.
{% endAside %}

{% Aside 'success' %}
성공했을 때 사용한다.
{% endAside %}

{% Aside 'objective' %}
목적을 기술할 떄 사용한다.
{% endAside %}

{% Aside 'gotchas' %}
강조 하고 싶을 때 사용한다.
{% endAside %}

## Images


![image](incompatible-with-catalina.png)

Thank you.
