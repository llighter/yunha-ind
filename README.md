# 🚀 YUNHA INDUSTY 
[![Build Status](https://travis-ci.com/llighter/yunha-ind.svg?branch=master)](https://travis-ci.com/llighter/yunha-ind)

A starter repository showing how to build a blog with the [Eleventy](https://github.com/11ty/eleventy) static site generator.

## 🤠 Getting Started

### 1. Clone this repository:

```
git clone https://github.com/llighter/yunha-ind.git my-blog-name
```


### 2. Navigate to the directory

```
cd my-blog-name
```

Specifically have a look at `.eleventy.js` to see if you want to configure any Eleventy options differently.

### 3. Install dependencies

```
npm install
```

### 4. Edit _data/metadata.json

### 5. Run Eleventy

In this project, I'm using `rollup` and `gulp` and `sass` with `eleventy`. You need to use `npm run build` command to build this project at Once.

```json
"scripts": {
    "clean": "rm -rf docs",
    "start": "eleventy --serve",
    "build:gulp": "npx gulp build",
    "build:eleventy": "eleventy --quiet",
    "build:rollup": "node build.js",
    "build:sass": "node ./compile-css.js src/styles/all.scss docs/app.css",
    "build": "npm-run-all --serial clean build:sass build:eleventy build:gulp build:rollup",
    "test": "echo \"Error: no test specified\" && exit 1",
    "deploy": "ELEVENTY_ENV=prod npm run build"
},
```

```bash
# Build all at once
npm run build
```

```bash
# Deploy all at once
npm run deploy
```


Or build and host locally for local development

```bash
# run directly
npx eleventy --serve

# run with npm command
npm run start
```
