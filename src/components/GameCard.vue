<template>
    <button class="game-card"
            :class="classes"
            :disabled="disabled">
        <div class="game-card-wrapper">
            <div class="game-card__border" :style="style"></div>
            <div class="game-card__content" @click="onClick">
                {{ opened ? card.content : '?' }}
            </div>
        </div>
    </button>
</template>

<script>
    export default {
        name:     'game-card',
        props:    ['opened', 'card', 'index', 'highlight', 'disabled', 'hidden'],
        methods:  {
            onClick() {
                this.$emit('click', this.index);
            }
        },
        computed: {
            classes() {
                return {
                    ['game-card--open']:      this.opened,
                    ['game-card--hidden']:    this.hidden,
                    ['game-card--highlight']: this.highlight,
                };
            },
            style() {
                const background = `${this.card.color}`;

                return {
                    background,
                };
            },
        },
    };
</script>
