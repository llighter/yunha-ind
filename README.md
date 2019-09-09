# YUNHA INDUSTY 
[![Build Status](https://travis-ci.com/llighter/yunha-ind.svg?branch=master)](https://travis-ci.com/llighter/yunha-ind)

A starter repository showing how to build a blog with the [Eleventy](https://github.com/11ty/eleventy) static site generator.

## Getting Started

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

In this project, I'm using `webpack` and `gulp` with `eleventy`. You need to use `npm run build` command to build this project at Once.

```json
"scripts": {
    "start": "eleventy --serve",
    "build:webpack": "webpack -p --output-path ./docs",
    "build:gulp": "npx gulp build",
    "build:eleventy": "eleventy",
    "build": "npm run build:eleventy && npm run build:gulp && npm run build:webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

```bash
# build all at once
npm run build
```



Or build and host locally for local development

```bash
# run directly
npx eleventy --serve

# run with npm command
npm run start
```
