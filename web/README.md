# The web components

## Installation

You can also find the script here https://www.human-writes.io/js/human-writes/latest/human-writes.min.js.

Add this line in the head section of your page:

```html

<script src="https://www.human-writes.io/js/human-writes/latest/human-writes.min.js"></script>
```

## Implementation

Let's say you have a PHP project tree looking like this:

```text
|-> app/
    |-> components/
        |-> My.phtml    
    |-> App.phtml
|-> public/
    |-> css/
        |-> index.css
        |-> app.css
    |-> snippets/
        |-> code.html
    |-> texts/
        |-> introduction.html
    |-> bootstrap.php    
    |-> index.php    
|-> vendor/
composer.json
```

### TextWriter

Store your text block in a place accessible by URL and declare it as a source of the component.

```html

<text-writer
        name="hello"
        source="/texts/introduction.html"
        speed="20"
        make-typos="true"
        styles="/css/index.css,/css/app.css"
        classes="App-content"
>
</text-writer>
```

### CodeWriter

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

## Live demo

Go to https://human-writes.io/ to see how they work. Look at the page source to see the implementations.

[Back to main README](../README.md)
