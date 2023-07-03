<script lang="ts" setup>
// import "./assets/main.css";
import "../../assets/style.css";
</script>

<template>
    <div>

        <div>
            <code-writer
                name="code-hello"
                depends-on-selector="text-writer[name='text-you-did']"
                language="php"
                source="/snippets/hello.phtml"
                speed="40"
                v-bind:use-highlight-js="true"
                theme="base16/3024"
            />
        </div>
        <div>
            <text-writer
                name="text-world"
                depends-on-selector="div[name='code-hello']"
                source="/texts/com.html"
                speed="40"
            />
        </div>
        <div>
            <code-writer
                depends-on-selector="div[name='text-world']"
                source="/snippets/world.phtml"
                v-bind:use-highlight-js="true"
                speed="20"
            />
        </div>
    </div>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
