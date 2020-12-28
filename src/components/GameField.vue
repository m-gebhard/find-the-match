<template>
    <div class="game-field" :class="gameFieldClasses">
        <status-header :pairs="pairs"
                       :cards="cardItems"
                       :failed="failedAttempts">
        </status-header>

        <div class="game-field__content">
            <transition-group name="list" tag="div">
                <game-card v-for="(card, i) in cardItems"
                           :key="`game-card-${i}`"
                           :index="i"
                           :hidden="card.hide"
                           :opened="getCardOpenState(i) || openAll"
                           :card="card"
                           :disabled="showInfo && !isCardHighLighted(i) && !openAll"
                           :highlight="isCardHighLighted(i)"
                           @click="onCardClick(i, card)">
                </game-card>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import GameCard                   from './GameCard';
    import {
        CARD_ITEMS,
        DISPLAY_STATUS_TIME,
        SHOW_CARDS_TIME,
        CARD_COLORS,
    }                                 from './../utils/gameConfig';
    import StatusHeader               from './StatusHeader';

    export default {
        name:       'game-field',
        components: { StatusHeader, GameCard },
        data() {
            return {
                openAll:        false,
                showInfo:       false,
                pairs:          [],
                selectedCards:  [],
                cardItems:      [],
                cardOpenStates: [],
                failedAttempts: 0,
            };
        },
        computed:   {
            ...mapGetters(['getGameOptions', 'getCardType', 'getSSecondsElapsed', 'getGameState']),

            getTotalCardCount() {
                return this.getGameOptions.rows * this.getGameOptions.columns;
            },
            gameFieldClasses() {
                return [
                    `game-field--${this.getGameOptions.columns}`,
                    [this.getGameOptions.columns >= 8 ? 'game-field--small-font' : null],
                ];
            },
        },
        methods:    {
            ...mapActions(['stopGame']),

            onCardClick(cardIndex, card) {
                if (this.selectedCards.length < 2) {
                    if (!this.selectedCards.find((_card) => _card.index === cardIndex)) {
                        const state = this.cardOpenStates.find((_state) => _state.index === cardIndex);

                        this.$set(state, 'open', true);

                        this.selectedCards.push({
                            index: cardIndex,
                            card:  card,
                        });
                    }
                }

                if (this.selectedCards.length === 2) {
                    const indexA = this.selectedCards[0].index;
                    const indexB = this.selectedCards[1].index;

                    if (this.selectedCards[0].card.content === this.selectedCards[1].card.content) {
                        this.pairs.push({
                            time: this.getSSecondsElapsed,
                            pair: card,
                        });

                        setTimeout(() => {
                            this.$set(this.cardItems[indexA], 'hide', true);
                            this.$set(this.cardItems[indexB], 'hide', true);

                            this.selectedCards = [];

                            if (this.cardItems.filter((_item) => _item.hide).length === this.cardItems.length) {
                                this.stopGame(this.failedAttempts);

                                this.failedAttempts = 0;
                            }
                        }, DISPLAY_STATUS_TIME);
                    } else {
                        this.failedAttempts++;

                        setTimeout(() => {
                            this.selectedCards = [];
                        }, DISPLAY_STATUS_TIME);
                    }

                    this.pauseForInfo(true);
                }
            },
            getCardOpenState(cardIndex) {
                return this.cardOpenStates.find((_state) => _state.index === cardIndex).open;
            },
            isCardHighLighted(index) {
                return !!this.selectedCards.find((_card) => _card.index === index);
            },
            closeAllCards() {
                this.cardOpenStates.forEach((_state) => {
                    this.$set(_state, 'open', false);
                });
            },
            pauseForInfo(closeAfterwards) {
                this.showInfo = true;

                setTimeout(() => {
                    if (closeAfterwards) this.closeAllCards();

                    this.showInfo = false;
                }, DISPLAY_STATUS_TIME);
            },
        },
        created() {
            const count = this.getTotalCardCount;

            // get random card contents
            const itemsByType = CARD_ITEMS.find((_item) => _item.type === this.getCardType).items;

            switch (this.getCardType) {
                case 'numbers':
                    for (let i = 0; i < count; i++) {
                        itemsByType[i] = i + 1;
                    }
            }

            let items = [];

            for (let i = 0; i < count; i++) {
                this.cardOpenStates.push({
                    index: i,
                    open:  false,
                });
            }

            for (let i = 0; i < Math.floor(count / 2); i++) {
                const rand = Math.floor(Math.random() * itemsByType.length);

                const gradient1 = CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)];
                const gradient2 = CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)];

                items.push({ content: itemsByType[rand], color: gradient1[0] });
                items.push({ content: itemsByType[rand], color: gradient2[0] });

                itemsByType.splice(rand, 1);
            }

            items.sort(() => Math.random() - 0.5);
            this.cardItems = items;

            this.openAll  = true;
            this.showInfo = true;

            setTimeout(() => {
                this.openAll  = false;
                this.showInfo = false;
            }, SHOW_CARDS_TIME);
        },
    };
</script>
