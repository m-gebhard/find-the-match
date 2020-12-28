export const GAME_STATE = {
    MENU:      0,
    PLAYING:   1,
    PAUSED:    2,
    GAME_OVER: 3,
};

export const CARD_ITEMS = [
    {
        type:  'emoji',
        items: [
            '😋', '😃', '😙', '😅',
            '😉', '😍', '🤓', '🤪',
            '🥺', '🥰', '🥳', '🧐',
            '😎', '🥱', '😱', '🤯',

            '🐶‍', '🐱', '🐭', '🐹',
            '🐰', '🦊', '🐻', '🐼',
            '🐨', '🐯', '🦁', '🐮',
            '🐷', '🐧', '🐸', '🐒',
        ]
    },
    {
        type:  'letters',
        items: [
            'A', 'B', 'C', 'D',
            'E', 'F', 'G', 'H',
            'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P',
        ]
    },
    {
        type:  'numbers',
        items: [
            '1', '2', '3', '4',
            '5', '6', '7', '8',
            '9', '0', '33', '66',
            '77', '99', '69', '14',
        ]
    }
];

export const DISPLAY_STATUS_TIME = 2000;
export const SHOW_CARDS_TIME     = 5000;

export const CARD_COLORS = [
    ['#d4fc79', '#96e6a1'],
    ['#a1c4fd', '#c2e9fb'],
    ['#84fab0', '#8fd3f4'],
    ['#f6d365', '#fda085'],
    ['#fbc2eb', '#a6c1ee'],
    ['#a18cd1', '#fbc2eb'],
];
