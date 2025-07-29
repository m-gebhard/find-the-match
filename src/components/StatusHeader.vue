<template>
    <nav class="status-header">
        <transition-group tag="ul" class="status-header__pairs" name="list">
            <li v-if="getUniqueCards.length < 10"
                v-for="(item, i) in getUniqueCards"
                :key="`cards-${i}`"
                class="status-header__pairs-item"
                :class="{'status-header__pairs-item--found': hasPairFound(item)}">
                {{ item}}
            </li>
        </transition-group>
        <div class="status-header__score">
            <font-awesome-icon icon="bahai"></font-awesome-icon>
            <span>{{ failed }}</span>
        </div>
        <div class="status-header__time">
            <font-awesome-icon icon="clock"></font-awesome-icon>
            <span>{{ getTimeElapsed }}</span>
        </div>
    </nav>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name:     'status-header',
        props:    ['pairs', 'cards', 'failed'],
        computed: {
            ...mapGetters(['getSSecondsElapsed']),

            getTimeElapsed() {
                let seconds   = this.getSSecondsElapsed;
                const minutes = Math.floor(seconds / 60);

                seconds -= minutes * 60;

                return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            },
            getUniqueCards() {
                const sorted = this.cards.filter((v, i, a) => a.indexOf(v) === i);
                return [...new Set(sorted.map((_item) => _item.content))];
            },
        },
        methods:  {
            hasPairFound(card) {
                return this.pairs.find((_pair) => _pair.pair.content === card);
            }
        }
    };
</script>

