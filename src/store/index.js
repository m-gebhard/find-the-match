import Vue  from 'vue';
import Vuex from 'vuex';

import { GAME_STATE, SHOW_CARDS_TIME } from '../utils/gameConfig';

Vue.use(Vuex);

export default new Vuex.Store({
    state:     {
        gameState:      GAME_STATE.MENU,
        cardType:       -1,
        rows:           -1,
        columns:        -1,
        intervalTimer:  -1,
        secondsElapsed: 0,
        lastGame:       {},
    },
    mutations: {
        SET_GAME_STATE(state, gameState) {
            state.gameState = gameState;
        },
        SET_CARD_TYPE(state, cardType) {
            state.cardType = cardType;
        },
        SET_ROWS(state, rows) {
            state.rows = rows;
        },
        SET_COLUMNS(state, columns) {
            state.columns = columns;
        },
        SET_SECONDS_ELAPSED(state, seconds) {
            state.secondsElapsed = seconds;
        },
        SET_INTERVAL_TIMER(state, timer) {
            state.intervalTimer = timer;
        },
        SET_LAST_GAME(state, game) {
            state.lastGame = game;
        },
    },
    actions:   {
        startGame({ commit, dispatch, state }, options) {
            commit('SET_CARD_TYPE', options.cardType);
            commit('SET_ROWS', options.rows);
            commit('SET_COLUMNS', options.columns);
            commit('SET_GAME_STATE', GAME_STATE.PLAYING);
            commit('SET_SECONDS_ELAPSED', 0);

            setTimeout(() => {
                const interval = window.setInterval(() => {
                    dispatch('increaseSecondsElapsed');
                }, 1000);

                commit('SET_INTERVAL_TIMER', interval);
            }, SHOW_CARDS_TIME);
        },
        stopGame({ commit, dispatch, state }, failed) {
            commit('SET_GAME_STATE', GAME_STATE.GAME_OVER);
            commit('SET_LAST_GAME', {
                failedAttempts: failed,
                time:           state.secondsElapsed,
                pairs:          Math.floor((state.rows * state.columns) / 2),
            });

            dispatch('resetSecondsElapsed');
        },
        resetToMenu({ commit }) {
            commit('SET_GAME_STATE', GAME_STATE.MENU);
        },
        increaseSecondsElapsed({ commit, state }) {
            commit('SET_SECONDS_ELAPSED', state.secondsElapsed += 1);
        },
        resetSecondsElapsed({ commit, state }) {
            commit('SET_SECONDS_ELAPSED', 0);

            window.clearInterval(state.intervalTimer);

            commit('SET_INTERVAL_TIMER', null);
        },
    },
    getters:   {
        getCardType:        state => state.cardType,
        getGameState:       state => state.gameState,
        getGameOptions:     state => {
            return {
                cardType: state.cardType,
                rows:     state.rows,
                columns:  state.columns,
            };
        },
        getSSecondsElapsed: state => state.secondsElapsed,
        getLastGame:        state => state.lastGame,
    }
});
