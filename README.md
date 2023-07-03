# HumanWrites/AiO

## What is it?

This package is a set of two components TextWriter and CodeWriter which imitate the human writing style on a keyboard.

They are available as web components and as Vue3 plugin.

  <img src="assets/public/webcomponents.svg" alt="Web components" style="width:128px;"/><img src="assets/public/plus.svg" alt="plus" style="width:128px;"/><img src="assets/public/vue.svg" alt="vue3" style="width:128px;"/>

### Features

TextWriter writes raw and HTML text, when an HTML tag is found the style of this tag is applied to the text.

CodeWriter writes HTML text inside a _pre_ tag embedding a _code_ tag for the decoration. When a tag is found it is
written as is and not interpreted.

CodeWriter supports code highlighting thanks to HighlightJS library integration. All resources of the HighlightJS
library are requested inside the web component, so you do not have to worry about them.

The writing speed depends on the delay between two charaters plus the process time to determine the character to
display. The delay is 60 milliseconds by default.

Both components also propose to:

- make typos :angry:
- correct typos right away :smile:
- chain two components with the parameter _depends-on-selector_, eg: with 2 components if the second references the
  first it starts when the first finishes.
- write at random speed. The speed is computed from 25% faster to 75% slower than the given speed parameter.

## Live demo

Go to https://human-writes.io/ to see how they work. Look at the page source to see the implementations.

## Installation

### As a script in a page

You can also find the script here https://www.human-writes.io/js/human-writes/latest/human-writes.min.js.

Add this line in the head section of your page:

```html

<script src="https://www.human-writes.io/js/human-writes/latest/human-writes.min.js"></script>
```

### As a module

These components are designed for use with browser only. However, if you have a NodeJS based project you can get the
module:

```bash
npm i human-writes
```

or

```bash
yarn add human-writes
```

The module is built with webpack so you can find the actual script in
_node_modules/human-writes/dist/human-writes.min.js_.

## Use cases

### TextWriter

You have a text block to describe the features of a project, to promote a product or to introduce a longer text.
TextWriter can help you to catch the attention of the visitor on this part of your site.

#### Implementation

Store your text block in a place accessible by URL and declare it as a source of the component.

```html

<text-writer
    name="hello"
    source="/my-block-of-text.html"
    speed="20"
    make-typos="true"
    styles="/css/index.css,/css/app.css"
    classes="App-content"
>
</text-writer>

```

### CodeWriter

You have an IT oriented technical documentation, and you want to share code snippets. This is a quite common use-case
nowadays.

CodeWriter does the same job as TextWriter except it follows code syntax workflow by opening and closing brackets before
it writes code in between.

#### Implementation

Store your block of code in a place accessible by URL and declare it as a source of the component.

```html
<code-writer
    depends-on-selector="text-writer[name='hello']"
    source="/my-block-of-code.html"
    use-highlight-js="true"
    theme="base16/monokai"
    language="php"
>
</code-writer>
```

Note that when using the Vue3 plugin, you cannot point the component by its tag name since Vue3 only renders the content of the component. The attributes of the Vue3 plugin are transfered to the first child of the plugin content which is a div.

```html
<code-writer
    depends-on-selector="div[name='hello']"
    source="/my-block-of-code.html"
    use-highlight-js="true"
    theme="base16/monokai"
    language="php"
>
</code-writer>
```

The use of HighlightJS library is disabled by default so you must declare it to _true_ to use it. Once enabled, you can
pass the _theme_ and the _language_ as parameters. Default values are respectively **"base16/monokai"** and **"html"**.
Find more themes and languages on https://highlightjs.org.

## State of the project

Feel free to send me feedback of your experience to _ohmyinbox99_at_gmail_dot_com_ (yes that's it).

## Roadmap

features to come:

- use component slot to set the text block instead of fetching a source by URL,
- raise an event when a specific word is found,
- and more...
