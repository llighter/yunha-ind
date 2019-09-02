---
title: "VS Code Snippet(코드조각) 만들기"
subhead: |
  코드조각을 활용하여 반복작업을 줄이고 편하게 코딩하자.
date: 2019-08-01
updated: 2019-08-17
authors:
  - llighter
hero: hero.jpg
alt: VS Code Snippet
description: |
  VS Code 에디터의 기본 기능중 코드조각 만들기를 활용하여 반복되는 작업을 줄이는 매크로를 만든다.
tags:
  - post
---

{% YouTube 'zEks4QvLRjs' %}

## VS Code Snippet(코드조각) 만들기

코딩을 하다보면 파일을 생성시 기본적으로 들어가는 내용들이 있다.
가령 주석이나 템플릿코드들은 형식이 정해져있지만 필요할 때마다 작성해야하는 불편함이 있다.
이렇게 형식이 정해진 코드 조각들을 필요할 때마다 불러서 사용하는 방법이 **사용자 코드 조각**이다.
이 글에서는 어떻게 사용자 코드 조각을 생성하고 작성한 후 사용하지에 대해 알아보겠다.

{% Aside %}
영어가 불편하지 않다면 [Creating your own snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets) 글을 참조하면 보다 자세하고 정확한 정보를 확인할 수 있다.
{% endAside %}

### 1. 코드 조각 생성

맥북 기준
Code > 기본설정 > 사용자 코드 조각
새로 생성

### 2. 각 멤버 설명

#### 2.1 scope

이 코드 조각을 호출 할 수 있는 확장자를 가지는 언어들을 넣어줍니다.

{% Aside %}
ex. javascript, typescript, html
{% endAside %}

#### 2.2 prefix

코드 조각을 **호출** 할 때 사용되며 인텔리센싱 키를 활용하거나 타자 입력시 자동으로 추천하게 됩니다. 해당 **prefix**를 선택하면 코드 조각 **본문(body)**이 삽입됩니다.

#### 2.3 body

자신이 만들고 싶은 코드 조각을 입력합니다. 여기에는 `$1`, `$2`, ... `$0` 과 같이 변수를 둬서 코드 조각을 생성할 때마다 동적으로 변수의 내용을 입력할 수 있습니다. 각 변수의 내용을 입력한 후에는 `Tab`을 통해 다음 변수로 이동합니다.

{% Aside %}
변수는 `$1`부터 시작하고 **마지막 탭 위치**를 지정하고 싶은 경우 `$0`을 사용합니다.
{% endAside %}

#### 2.4 description

마지막으로 **description**은 이 코드 조각에 대한 설명으로 코드 조각을 사용하기 위해 인텔리센싱 하거나 타자 입력시 나타나는 prefix와 더불어 표시됩니다.

### 코드 조각 사용 예제

``` json
{
    "Generate default HTML form": {
		"scope": "html",
		"prefix": "generate-html-form",
		"body": [
			"<!DOCTYPE html>",
			"<html>",
			"<head>",
			"<title>${1:title name}</title>",
			"</head>",
			"<body>",
				"<h2>Let me introduce myself</h2>",
				"<h3>My name is ${2:name}.</h3>",
				"<h3>I live in ${3:location}.</h3>",
				"$0",
			"</body>"
		],
		"description": "Generate default html form"
	}
}
```

[1]: https://code.visualstudio.com/docs/editor/userdefinedsnippets