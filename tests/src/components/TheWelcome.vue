<script setup></script>

<template>
  <div>
    <div>
      <text-writer
        name="text-intro"
        source="/texts/ad.html"
        speed="40"
        depends-on-selector="div[name='text-world']"
      />
    </div>
    <div>
      <code-writer
        depends-on-selector="div[name='text-intro']"
        source="/snippets/hello-world.vue"
        v-bind:use-highlight-js="true"
        speed="50"
        language="javascript"
      />
    </div>
  </div>
</template>
