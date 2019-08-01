# YUNHA INDUSTY

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

```
npx eleventy
```

Or build and host locally for local development
```
npx eleventy --serve
```

Or build automatically when a template changes:
```
npx eleventy --watch
```

Or in debug mode:
```
DEBUG=* npx eleventy
```