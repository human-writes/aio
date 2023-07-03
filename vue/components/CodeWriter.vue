<template>
    <div ref="root" class="code-snippet">
        <div class="to-be-placed">
            <pre
                class="to-place"
                :class="placeholderId"
            ><code :class="codeId"></code></pre>
        </div>
        <div class="to-be-written">
            <pre 
                class="to-write" 
                :class="paperId"
            ><code :class="codeId"></code></pre>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Writer } from "../../core/writer.js";

const root = ref(null);
const mainId = ref("");
const placeholderId = ref("");
const paperId = ref("");
const codeId = ref("");

const props = defineProps({
    source: {
        default: ""
    },
    speed: {
        default: "60"
    },
    dependsOnSelector: {
        default: ""
    },
    makeTypos: {
        default: false
    },
    styles: {
        default: ""
    },
    classes: {
        default: ""
    },
    finished: {
        default: false
    },
    restart: {
        default: false
    },
    useHighlightJs: {
        default: false
    },
    theme: {
        default: "base16/monokai"
    },
    language: {
        default: "html"
    }
});

const makeId = () => {
    let result = Date.now().toString();
    result = result.substring(result.length - 4);
    result = btoa(result);
    result = result.replace(/=/g, "");

    return result;
};

mainId.value = makeId();
placeholderId.value = "to-place-" + mainId.value;
paperId.value = "to-write-" + mainId.value;
codeId.value = "to-code-" + mainId.value;

onMounted(async () => {
    const doc = root.value.ownerDocument;
    if (props.useHighlightJs && window.hljs === undefined) {
        const $theme = props.theme ?? "base16/monokai";
        const $language = props.language ?? "html";

        const script = doc.createElement("script");
        script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js";
        doc.head.appendChild(script);

        const $styleList = [];
        $styleList.push(
            "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"
        );
        $styleList.push(
            `https://highlightjs.org/static/demo/styles/${$theme}.css`
        );

        $styleList.forEach(($item) => {
            const style = doc.createElement("style");
            style.innerHTML = `@import "${$item}"`;

            doc.head.appendChild(style);
        });

        const $parentDiv = doc.querySelectorAll("." + codeId.value);
        for (const node of $parentDiv) {
            node.setAttribute("class", `language-${$language}`);
        }
    }
    /**
     * The magic starts here
     */
    if (props.styles !== "" && props.classes !== "") {
        const $styleList = props.styles.split(",");

        $styleList.forEach(($item) => {
            const style = doc.createElement("style");
            style.innerHTML = `@import "${$item}"`;

            doc.head.appendChild(style);
        });

        const parentDiv = doc.getElementById(paperId.value);
        parentDiv.setAttribute("class", props.classes);
    }

    if (props.dependsOnSelector !== "") {
        const component = doc.querySelector(props.dependsOnSelector);
        if (component !== null) {
            // Options for the observer (which mutations to observe)
            const config = { attributes: true };

            // Callback function to execute when mutations are observed
            // Create an observer instance linked to the callback function
            const observer = new MutationObserver(
                async (mutationList, observer) => {
                    for (const mutation of mutationList) {
                        if (
                            mutation.type === "attributes" &&
                            mutation.attributeName === "finished"
                        ) {
                            const attr = component.getAttribute("finished");

                            if (attr === "true") {
                                observer.disconnect();
                                await writeLikeAHuman();
                            }
                        }
                    }
                }
            );

            // Start observing the target node for configured mutations
            observer.observe(component, config);
        }
    } else {
        await writeLikeAHuman();
    }
});

const onFinishedWriting = function (html) {
    // Raise an event outside the shadow DOM
    // when all is done and ready
    const finishedEvent = new CustomEvent("finishedWriting", {
        bubbles: true,
        cancellable: true,
        detail: {
            content: html
        }
    });
    root.value.dispatchEvent(finishedEvent);
    root.value.setAttribute("finished", "true");
};

const writeLikeAHuman = async () => {
    const doc = root.value.ownerDocument;

    const tw = new Writer(
        doc,
        props.source,
        props.speed,
        props.makeTypos,
        onFinishedWriting
    );
    await tw.writeLikeAHuman(paperId.value, placeholderId.value);
};
</script>
<script>
import { defineComponent } from "vue";
import "../src/style.css";

export default defineComponent({
    name: "CodeWriter"
});
</script>
// watches
<!-- static get observeAttributes() {
//         /**
//          * Attributes passed inline to the component
//          */
//         return [
//             "source",
//             "speed",
//             "depends-on-selector",
//             "make-mistakes",
//             "styles",
//             "classes",
//             "finished"
//         ];
//     } -->
