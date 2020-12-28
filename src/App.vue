<template>
    <div id="app">
        <game-field v-if="getGameState === getGameStates.PLAYING"></game-field>
        <results-screen v-else-if="getGameState === getGameStates.GAME_OVER"></results-screen>
        <start-screen v-else></start-screen>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { GAME_STATE } from './utils/gameConfig';
    import GameField      from './components/GameField';
    import StartScreen    from './components/StartScreen';
    import ResultsScreen  from './components/ResultsScreen';

    export default {
        name:       'app',
        components: { ResultsScreen, StartScreen, GameField },
        computed:   {
            ...mapGetters(['getGameState']),

            getGameStates() {
                return GAME_STATE;
            }
        },
    };
</script>
