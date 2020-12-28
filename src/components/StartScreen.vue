<template>
    <div class="start-screen">
        <h1>Game</h1>
        <form class="start-screen__options" @submit.prevent="onStartClick" action="#">
            <div class="start-screen__options-group">
                <label for="size">Size</label>
                <select v-model="inputSize"
                       type="number"
                       name="size"
                       id="size"
                       value="4">
                    <option value="2">2x2</option>
                    <option value="4">4x4</option>
                    <option value="6">6x6</option>
                    <option value="8">8x8</option>
                </select>
            </div>
            <div class="start-screen__options-group">
                <label for="card-type">Card Type</label>
                <select v-model="inputCardType"
                        name="card-type"
                        id="card-type">
                    <option value="numbers">Numbers</option>
                    <option value="letters">Letters</option>
                    <option value="emoji">Emoji's</option>
                </select>
            </div>
            <button type="submit"
                    id="submit">
                Start
                <font-awesome-icon icon="arrow-right"></font-awesome-icon>
            </button>
        </form>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name:     'start-screen',
        data() {
            return {
                inputSize:     '4',
                inputCardType: 'emoji',
            };
        },
        computed: {
            ...mapGetters(['']),
        },
        methods:  {
            ...mapActions(['startGame']),

            onStartClick() {
                const size = parseInt(this.inputSize);

                this.startGame({
                    cardType: this.inputCardType,
                    rows:     size,
                    columns:  size,
                });
            }
        },
    };
</script>

