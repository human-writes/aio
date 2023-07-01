<script lang="ts" setup>
import CodeWriter from "./components/CodeWriter.vue";
import "./style.css";
</script>

<template>
    <CodeWriter
        language="php"
        source="/snippets/Hello.phtml"
        speed="80"
        use-highlight-js="true"
    />
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
