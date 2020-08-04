---
title: 배열 복사하기
subhead: |
  자바, 자바스크립트 그리고 다트로 배열 복사하는 API에 대해 알아보자
date: 2020-08-03
authors:
- llighter
hero: hero.png
cardHeroFit: cover
hero_position: center
alt: hero
description: |
  How to use array API to copying array
tags:
  - post
  - copy-array
---

프로그래밍에서 가장 흔하게 다루는 요소 중 하나는 **배열**이다. 특히 배열 값에서 일부를 가져와 그 다음 작업의 기초 데이터로 사용하는 경우가 많다. 이번 포스트에서는 몇 가지 언어 환경에서 배열을 복사하는 API에 대해 알아본다. 우리는 자바, 자바스크립트 그리고 다트를 사용한 예제를 살펴보고 각 언어별 API의 공통점 및 차이점에 대해서도 알아볼 것이다.

## TL; DL

대부분의 프로그래밍 언어는 배열을 다루는 기본 API를 제공한다. 다만 언어별로 사용법이 조금씩 다르기 때문에 정확히 알고 사용해야 한다. 우선 각 언어별로 배열을 복사하는 방법에 대해 알아보자.

[자바 API][1] 에서는 `java.util.Arrays.copyOfRange` 를 사용하여 배열의 일부를 복사할 수 있다.
```java
// 원래배열 - null 이면 NullPointerException 이 발생한다.
// 시작인덱스 - 0 이상 이어야 하고 원래배열의 전체길이보다는 작아야 한다.
// 끝인덱스 - 시작인덱스보다 크거나 같아야 한다.
int[] newArray = Arrays.copyOfRange(원래배열, 시작인덱스, 끝인덱스);
```

[자바스크립트 API][2] 에서는 `Array.prototype.slice()`을 사용하여 배열의 일부를 복사할 수 있다.
```javascript
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

// 끝인덱스가 없는 경우 배열의 끝까지 추출
console.log(animals.slice(2));  // Array ["camel", "duck", "elephant"]

// 시작인덱스는 포함, 끝인덱스는 미포함이다. (x >=2, x < 4)
console.log(animals.slice(2, 4));   // Array ["camel", "duck"]

// 끝인덱스가 배열의 길이보다 큰 경우 배열의 끝까지 추출
console.log(animals.slice(1, 5));   // Array ["bison", "camel", "duck", "elephant"]
```

[다트 API][3] 에서는 `sublist`를 사용하여 배열의 일부를 복사할 수 있다.
```dart
var colors = ["red", "green", "blue", "orange", "pink"];
// 0 <= 시작인덱스 <= 끝인덱스 <= this.length
print(colors.sublist(1, 3)); // [green, blue]

// 끝인덱스가 없는 경우 배열의 끝까지 추출
print(colors.sublist(1)); // [green, blue, orange, pink]
```

위 세 언어는 API 명칭이나 제약사항은 다른 부분이 있지만 기본적으로 모두 배열을 복사하여 새로운 배열을 반환한다는 공통점이 있다. 이제 각 언어 별로 좀 더 자세히 배열을 복사하는 법에 대해 알아보자.

## 각 언어별 배열 복사하기

### 자바 `java.util.Arrays.copyOfRange`

```java
public static int[] copyOfRange(int[] 원래배열, int 시작인덱스, int 끝인덱스)
```

`copyOfRange`는 지정된 배열의 지정된 범위를 새로운 배열로 복사한다. 이 때 범위의 시작인덱스는 0과 `원래배열.length` 사이의 값을 가진다.(`0`<= `시작인덱스` <=`원래배열.length`) 끝인덱스는 시작인덱스보다 크거나 같아야 하고 `원래배열.length`의 값보다 클 수 있다.

#### 매개변수

<div class="w-table-wrapper">
  <table>
    <tbody>
      <tr>
        <td>원래배열</td>
        <td>
          범위를 복사할 배열
        </td>
      </tr>
      <tr>
        <td>시작인덱스</td>
        <td>
          복사할 범위의 초기 인덱스(포함)
        </td>
      </tr>
      <tr>
        <td>끝인덱스</td>
        <td>
          복사할 범위의 최종 인덱스(미포함). 이 값은 배열 길이보다 클 수 있다.
        </td>
      </tr>
    </tbody>
  </table>
</div>

#### 반환 값

필요한 길이를 얻기 위해 0으로 채워지거나 채워진 원래 배열의 지정된 범위를 포함하는 새 배열

#### 예외 처리

<div class="w-table-wrapper">
  <table>
    <tbody>
      <tr>
        <td><code>ArrayIndexOutOfBoundsException</code></td>
        <td>
          시작인덱스 < 0 또는 시작인덱스 > <code>원래배열.length</code>
        </td>
      </tr>
      <tr>
        <td><code>IllegalArgumentException</code></td>
        <td>
          시작인덱스 > 끝인덱스 인 경우
        </td>
      </tr>
      <tr>
        <td><code>NullPointerException</code></td>
        <td>
          원래배열이 <code>null</code>인 경우
        </td>
      </tr>
    </tbody>
  </table>
</div>

#### 적용 버전

1.6 부터 적용

### 자바스크립트 `Array.prototype.slice()`

```javascript
arr.slice([시작인덱스[, 끝인덱스]])
```

`slice()` 메소드는 원래 배열의 시작인덱스부터 끝인덱스까지(끝인덱스는 미포함) 복사본을 새로운 배열 객체로 반환한다.

#### 매개변수

<div class="w-table-wrapper">
  <table>
    <tbody>
      <tr>
        <td><code>시작인덱스</code></td>
        <td>
          <ul>
            <li>복사할 범위의 초기 인덱스</li>
            <li>음수 인덱스인 경우 배열의 끝에서부터의 길이를 나타낸다.(<code>slice(-2)</code>는 배열에서 마지막 두 개의 엘리먼트를 추출한다.)</li>
            <li>시작인덱스가 <code>undefinded</code>인 경우에는, 0번 인덱스부터 <code>slice</code> 한다.</li>
            <li>시작인덱스가 배열의 길이보다 큰 경우에는, 빈 배열을 반환한다.</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td><code>끝인덱스</code></td>
        <td>
          <ul>
            <li>추출을 종료 할 0 기준 인덱스이다. <code>slice</code>는 끝인덱스를 제외하고 추출한다.</li>
            <li><code>slice(1,4)</code>는 두번째 요소부터 네번째 요소까지(1,2 및 3을 인덱스로 하는 요소) 추출한다.</li>
            <li>음수 인덱스는 배열의 끝에서부터의 길이를 나타낸다. 예를들어 <code>slice(2, -1)</code>은 세번째부터 끝에서 두번째 요소까지 추출한다.</li>
            <li>끝인덱스가 생략되면 <code>slice()</code>는 배열의 끝(<code>원래배열.length</code>)까지 추출한다.</li>
            <li>만약 끝인덱스의 값이 배열의 길이보다 크다면, <code>slice()</code>는 배열의 끝까지(<code>원래배열.length</code>) 추출한다.</li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</div>

#### 반환 값

원래 배열의 지정된 범위를 포함하는 새 배열

### 다트 `sublist`

```dart
List<E> sublist(int 시작인덱스, [int 끝인덱스])
```

`sublist` 메소드는 원래 배열의 시작인덱스부터 끝인덱스까지(끝인덱스는 미포함) 복사본을 새로운 배열 객체로 반환한다.

### 매개변수

<div class="w-table-wrapper">
  <table>
    <tbody>
      <tr>
        <td><code>시작인덱스</code></td>
        <td>
          0 <= 시작인덱스 <= 끝인덱스 <= <code>원래배열.length</code> 조건을 만족해야 한다.
        </td>
      </tr>
      <tr>
        <td><code>끝인덱스</code></td>
        <td>
          <ul>
            <li>끝인덱스가 생략되는 경우 <code>sublist()</code>는 배열의 끝(<code>원래배열.length</code>)까지 추출한다.</li>
            <li>만약 끝인덱스가 시작인덱스 값과 같으면 빈 배열을 반환한다.</li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</div>

#### 반환 값

원래 배열의 지정된 범위를 포함하는 새 배열

## 정리

지금까지 세 가지 언어(자바, 자바스크립트, 다트)로 배열을 복사하는 방법에 대해 알아보았다. 세 언어 모두 배열을 복사할 때 시작인덱스와 끝인덱스를 설정하여 원하는 범위의 배열을 새로운 배열로 복사하는 구조를 가지고 있다. 다만 이 매개변수들을 사용함에 있어 제약사항이 차이가 있었다. 자바스크립트 < 다트 < 자바 순서로 제약사항이 많았는데 이는 각 언어의 특성을 반영한 것이라고 볼 수 있다. 간단한 함수여서 직접 만들어 사용해도 되지만 위에서 설명한 것처럼 예외를 발생하는 조건들도 있고 안전하게 사용하려면 공식문서를 통해 API의 사용법을 정확히 숙지한 후 사용하는게 바람직하다.


[1]:https://docs.oracle.com/javase/7/docs/api/java/util/Arrays.html#copyOfRang(int%5B%5D,%20int,%20int)
[2]:https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
[3]:https://api.dart.dev/stable/2.8.4/dart-core/List/sublist.html
