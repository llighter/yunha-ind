---
title: "하나의 컴퓨터 두 개의 자바 환경(jenv)"
subhead: |
  jenv를 활용하여 여러 자바 버전을 설치해서 손쉽게 전환해보자.
date: 2019-09-09
authors:
  - llighter
hero: hero.jpg
alt: introduction of jenv
description: |
  한 컴퓨터 환경에서 여러 자바 버전을 설치하고 필요에 따라 손쉽게 환경을 구성하는 방법에 대해 알아본다.
tags:
  - post
  - java
  - jenv
---

## `jevn`란?

개발을 할때 목적에 따라 여러 개발 환경을 세팅해야할 때가 있다. 예를들어 안드로이드 개발환경에서는 `Java 8`이 필요하지만 서버를 개발할때는 최신버전이 필요하다. 이처럼 필요에 따라 다양한 자바 버전을 쉽게 사용하기 만든것이 `jenv`이다. 

## Contents

1. 시작하기
2. 워크플로우 예제

## 1. 시작하기

지금부터 `jenv` 설치를 진행할 것이다. 아래 진행되는 순서를 천천히 따라하면 어려움 없이 설치가 완료될 것이다.

### 1.1 `jenv` 설치하기

macOS의 경우 [Homebrew](https://brew.sh/index_ko)를 이용하면 간편하게 설치할 수 있다.

```bash
brew install jenv
```

{% Aside 'note' %}
[Homebrew](https://brew.sh/index_ko)는 맥 환경에서 여러 프로그램을 간편하게 설치할 수 있는 패키지 관리자 입니다.
{% endAside %}

{% Aside 'caution' %}
`jenv`는 오픈소스로 최신 macOS 버전을 지원하지 않을 수 도 있다. 자신이 사용하는 OS 환경에 따라 다를 수 있음에 유의하자.
{% endAside %}

다른 방식으로는, 아래와 같은 명령어를 사용해 리눅스와 같은 환경에서 설치할 수 있다. 자신이 사용하는 쉘 환경에 따라 설정을 저장하는 곳이 다름에 유의하자.

```bash
git clone https://github.com/jenv/jenv.git ~/.jenv
# Shell: bash
echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(jenv init -)"' >> ~/.bash_profile
# Shell: zsh
echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(jenv init -)"' >> ~/.zshrc
```

사용중인 쉘을 닫았다 열어서 재시작을하거나 `exec $SHELL -l` 실행해서 변경사항을 적용시킨다.

`jenv` 설치가 정상적으로 진행되었는지 확인하기 위해 `jenv doctor`를 실행한다.



