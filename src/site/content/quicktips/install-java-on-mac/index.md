---
title: "맥에서 Brew로 자바 설치하기(feat. 자바버전 바꾸기)"
subhead: |
  macOS에서 여러가지 자바 버전을 설치하고 세팅하는 방법에 대해 알아본다.
description: |
  "Install variouse java version on mac with brew"

# A list of authors. Supports more than one.
authors:
  - llighter

date: 2020-12-27
# Add an updated date to your post if you edit in the future.
# updated: 2019-11-01

# Add the scheduled flag if you'd like your post to automatically go live
# during a future date. Posts will deploy at 7am PST / 15:00 UTC.
# Example: A post with `date: 2050-01-01`, `scheduled: true`, will go live at
# 7am PST, January 1st, 2050.
# If you don't use the scheduled flag then setting a future date has no effect.
# scheduled: true

# !!! IMPORTANT: If your post does not contain a hero image it will not appear
# on the homepage.
# Hero images should be 3200 x 920.
hero: hero.jpg
# You can adjust the fit of your hero image with this property.
# Values: contain | cover (default)
# hero_fit: contain

# You can adjust the position of your hero image with this property.
# Values: top | bottom | center (default)
# hero_position: bottom

# You can provide an optional cropping of your hero image to be used as a
# thumbnail. Note the alt text will be the same for both the thumbnail and
# the hero.
# thumbnail: thumbnail.jpg

hero_position: center

alt: java

# You can provide a custom thumbnail and description for social media cards.
# Thumbnail images should be 896 x 480.
# If no social thumbnail is provided then the post will attempt to fallback to
# the post's thumbnail or hero from above. It will also reuse the alt.
# social:
#   google:
#     title: A title for Google search card.
#     description: A description for Google search card.
#     thumbnail: google_thumbnail.jpg
#     alt: Provide an alt for your thumbnail.
#   facebook:
#     title: A title for Facebook card.
#     description: A description for Facebook card.
#     thumbnail: facebook_thumbnail.jpg
#     alt: Provide an alt for your thumbnail.
#   twitter:
#     title: A title for Twitter card.
#     description: A description for Twitter card.
#     thumbnail: twitter_thumbnail.jpg
#     alt: Provide an alt for your thumbnail.

tags:
  - tip # blog is a required tag for the article to show up in the blog.
  - java
  - brew
  - macOS
---

macOS 환경에서 자바 개발을 할 때 가장 먼저 해야할 일 중에 하나는 [JDK](https://ko.wikipedia.org/wiki/%EC%9E%90%EB%B0%94_%EA%B0%9C%EB%B0%9C_%ED%82%A4%ED%8A%B8)를 설치하는 것이다. 자바를 설치하는 방법에는 여러가지가 있지만 맥을 사용하면서 다양한 설치 패키지들을 관리하기 위해서는 [Brew](https://brew.sh/index_ko)라는 패키지 매니저를 많이 사용한다.
brew를 사용하면 자바를 손쉽게 설치할 수 있고 더불어 다양한 자바 버전을 필요할 때마다 변경해서 사용할 수 있다.
이 글에서는 brew 패키지 관리자를 통해 OpenJDK를 설치하는 과정에 대해 설명할 것이다. 이 글은 [How to install Java on Mac OS](https://mkyong.com/java/how-to-install-java-on-mac-osx/)에 게재된 내용을 바탕으로 작성되었다. 만약 아래 글 이외의 자세한 정보를 확인하고자 한다면 [위 글](https://mkyong.com/java/how-to-install-java-on-mac-osx/))에서 확인해보기 바란다.

## 1. JAVA 설치하기

### 1.1 [Homebrew](https://brew.sh/index_ko) 설치 및 업데이트

```bash
brew update
```

### 1.2 [adoptopenjdk/openjdk](https://github.com/AdoptOpenJDK/homebrew-openjdk) 추가하기

```bash
brew tap adoptopenjdk/openjdk
```

### 1.3 설치 가능한 모든 JDK 찾기

```bash
brew search jdk
```

```bash
❯ brew search jdk
==> Formulae
openjdk ✔                                     openjdk@11                                    openjdk@8
==> Casks
adoptopenjdk                      adoptopenjdk12                    adoptopenjdk14-jre                adoptopenjdk8-jre
adoptopenjdk-jre                  adoptopenjdk12-jre                adoptopenjdk14-openj9             adoptopenjdk8-openj9
adoptopenjdk-openj9               adoptopenjdk12-openj9             adoptopenjdk14-openj9-jre         adoptopenjdk8-openj9-jre
adoptopenjdk-openj9-jre           adoptopenjdk12-openj9-jre         adoptopenjdk14-openj9-jre-large   adoptopenjdk8-openj9-jre-large
adoptopenjdk-openj9-jre-large     adoptopenjdk12-openj9-jre-large   adoptopenjdk14-openj9-large       adoptopenjdk8-openj9-large
adoptopenjdk-openj9-large         adoptopenjdk12-openj9-large       adoptopenjdk15                    adoptopenjdk9
adoptopenjdk10                    adoptopenjdk13                    adoptopenjdk15-jre                jdk-mission-control
adoptopenjdk11 ✔                  adoptopenjdk13-jre                adoptopenjdk15-openj9             oracle-jdk
adoptopenjdk11-jre                adoptopenjdk13-openj9             adoptopenjdk15-openj9-jre         oracle-jdk-javadoc
adoptopenjdk11-openj9             adoptopenjdk13-openj9-jre         adoptopenjdk15-openj9-jre-large   sapmachine-jdk
adoptopenjdk11-openj9-jre         adoptopenjdk13-openj9-jre-large   adoptopenjdk15-openj9-large
adoptopenjdk11-openj9-jre-large   adoptopenjdk13-openj9-large       adoptopenjdk8
adoptopenjdk11-openj9-large       adoptopenjdk14 ✔                  adoptopenjdk8
```

### 1.4 Java 8,9,10,11,12,13,14,15 중에 원하는 버전을 [설치](https://formulae.brew.sh/cask/adoptopenjdk#default)한다

원하는 버전을 선택해서 아래와 같이 입력한다. 나의 경우는 11버전과 14버전을 설치하였다.

```bash
brew install --cask adoptopenjdk11
brew install --cask adoptopenjdk14
```

{% Aside 'caution' %}
  cask 옵션은 을 사용할 떄는 `--cask` 와 같이 입력해야 한다.
{% endAside %}

### 1.5 자바가 설치된 곳 확인하기

```bash
/usr/libexec/java_home -V
```

```bash
❯ /usr/libexec/java_home -V
Matching Java Virtual Machines (2):
    14.0.2 (x86_64) "AdoptOpenJDK" - "AdoptOpenJDK 14" /Library/Java/JavaVirtualMachines/adoptopenjdk-14.jdk/Contents/Home
    11.0.9.1 (x86_64) "AdoptOpenJDK" - "AdoptOpenJDK 11" /Library/Java/JavaVirtualMachines/adoptopenjdk-11.jdk/Contents/Home
```

### 1.6 자바 버전 확인하기

여러 자바 버전을 설치하면 기본적으로 가장 최신 버전의 자바 버전으로 세팅된다.

```bash
java --version
```

```bash
❯ java --version
openjdk 14.0.2 2020-07-14
OpenJDK Runtime Environment AdoptOpenJDK (build 14.0.2+12)
OpenJDK 64-Bit Server VM AdoptOpenJDK (build 14.0.2+12, mixed mode, sharing)
```

## 2. 자바 버전 바꾸기

내가 brew를 통해 Java11과 Java14를 설치하면서 내 맥에는 두 개의 자바가 설치되었다. 물론 여러개를 설치한 경우 최신 버전을 기본값으로 하고 있기 떄문에 14버전이 세팅되어 있다.

{% Aside 'gotchas' %}
자바 버전을 바꾸는 방법중에는 [jEnv](https://www.jenv.be)를 활용하는 방법도 있지만 여기에서는 `export JAVA_HOME` 명령어로 직접 변경하는 방법을 사용한다. 이 방법을 사용하는 이유는 직관적이고 간단하면서 내가 하려는 것을 명확히 알 수 있기 떄문이다.
{% endAside %}

### 2.1 `bash_profile`에서 자바 버전 세팅하기

자신이 사용하고있는 쉘 종류에 따라 다르지만 기본적으로 자주 쓰는 환경 값이나 경로들을 저장해두는 곳이 있다. `bash`쉘을 사용하는 경우는 `
~/.bash_profile`이고 `zsh`쉘인 경우 `~/.zshrc` 파일을 수정해주명된다.

내가 사용중인 쉘이 무엇인지 확인하려면 아래와 같이 입력하면된다.

```bash
echo $SHELL
```

```bash
❯ echo $SHELL
/bin/zsh
```

나는 `zsh` 쉘을 사용하고 있기 때문에 `~/.zshrc`를 수정하였다.

```bash
vi ~/.zshrc
```

입력내용을 아래와 같다. 11버전(`JAVA_HOME_11`)과 14버전(`JAVA_HOME_14`)을 변수로 만들어두고 아래에서 11버전을 사용하도록 `JAVA_HOME`을 설정해두었다.

```vim
# Java Paths
export JAVA_HOME_11=$(/usr/libexec/java_home -v11)
export JAVA_HOME_14=$(/usr/libexec/java_home -v14)

# Java 11
export JAVA_HOME=$JAVA_HOME_11

# Java 14
# 14버전을 사용하고자 하는 경우 아래 주석(#)을 해제하고 위에 11버전을 주석처리 하면된다.
# export JAVA_HOME=$JAVA_HOME_14
```

### 2.2 변경사항을 반영한다

내가 사용하는 쉘이 `zsh`인 경우

```bash
source ~/.zshrc
```

내가 사옹하는 쉘이 `bash`인 경우

```bash
source ~/.bash_profile
```

아래의 명령어로 현재 세팅되어 있는 자바 버전을 다시 확인해보자.

```bash
❯ java --version
openjdk 11.0.9.1 2020-11-04
OpenJDK Runtime Environment AdoptOpenJDK (build 11.0.9.1+1)
OpenJDK 64-Bit Server VM AdoptOpenJDK (build 11.0.9.1+1, mixed mode)
```

## 마치며

이상으로 [Brew](https://brew.sh/index_ko) 패키지 관리자를 통해 여러가지 자바 버전을 설치하고 원하는 버전으로 변경하는 방법을 알아보았다. 서버 개발과 안드로이드 개발을 병행하거나 특정 버전을 세팅해서 사용해야하는 사람들이 있다면 위 포스트가 도움이 되었기를 바란다.

> 여기서 사용된 메인 사진은 [Unsplash](https://unsplash.com/s/photos/java?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)에서 [Michiel Leunens](https://unsplash.com/@leunesmedia?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)님이 제공한 사진입니다.
