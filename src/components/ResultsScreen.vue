<template>
    <div class="results">
        <h1>
            You needed
            <span class="text--yellow">{{ getLastGame.time }}</span>
            seconds to find all
            <span class="text--yellow">{{ getLastGame.pairs }}</span>
            pairs.
        </h1>
        <br>
        <h2>This is
            <span class="text--yellow">{{ getResult }}</span>
            ...
        </h2>
        <h2 v-if="getLastGame.failedAttempts > 0">You only messed up
            <span class="text--yellow">{{ getLastGame.failedAttempts }}</span>
            times 🤡
        </h2>
        <div class="start-screen__options">
            <button type="submit"
                    id="submit"
                    @click="onRestartClick">
                Again
                <font-awesome-icon icon="arrow-right"></font-awesome-icon>
            </button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name:     'results-screen',
        computed: {
            ...mapGetters(['getLastGame']),

            getResult() {
                const possibilities = ['excellent', 'very good', 'good', 'ok', 'bad', 'slow', 'just unbelievable'];
                let time            = Math.floor(this.getLastGame.time / 15);

                if (time > possibilities.length) {
                    time = possibilities.length - 1;
                }

                return possibilities[time];
            },
        },
        methods:  {
            ...mapActions(['resetToMenu']),

            onRestartClick() {
                this.resetToMenu();
            }
        }
    };
</script>

