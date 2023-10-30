import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
    // ...UnoCSS选项
    theme: {
        breakpoints: {
            xs: '480px',
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            xxl: '1600px',
        },
    },
    rules: [
        [
            'absolute-center',
            {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                margin: 'auto',
            },
        ],
        [
            'flex-center',
            {
                display: 'flex',
                'justify-content': 'center',
                'align-items': 'center',
            },
        ],
        [
            'flex-end',
            {
                display: 'flex',
                'justify-content': 'flex-end',
            },
        ],
        [
            'flex-between',
            {
                display: 'flex',
                'justify-content': 'space-between',
            },
        ],
        [
            'flex-around',
            {
                display: 'flex',
                'justify-content': 'space-around',
            },
        ],
        [
            'flex-evenly',
            {
                display: 'flex',
                'justify-content': 'space-evenly',
            },
        ],
        [
            'flex-start',
            {
                display: 'flex',
                'justify-content': 'flex-start',
            },
        ],
        [
            'flex-col',
            {
                display: 'flex',
                'flex-direction': 'column',
            },
        ],
        [
            'flex-col-start',
            {
                display: 'flex',
                'flex-direction': 'column',
                'justify-content': 'flex-start',
            },
        ],
        [
            'flex-col-reverse',
            {
                display: 'flex',
                'flex-direction': 'column-reverse',
            },
        ],
        [
            'font-smiley',
            {
                'font-family': 'smiley-sans',
            },
        ],
        [
            'p-r',
            {
                position: 'relative',
            },
        ],
        [
            'p-a',
            {
                position: 'absolute',
            },
        ],
        [
            'm-a',
            {
                margin: 'auto',
            },
        ],
        [
            'c-p',
            {
                cursor: 'pointer',
            },
        ],
        // [
        //     /^min-\[\w+\]-(\w+)$/,
        //     ([, w, s], { rawSelector, theme }) => {
        //         const selector = e(rawSelector)
        //         // return a string instead of an object
        //         return `@media (min-width: ${theme.breakpoints.lg.width}) {
        //                     ${selector} {
        //                         display: ${theme.breakpoints.lg.visible};
        //                     }
        //                 }`
        //     },
        // ],
        // [
        //     /^text-(\w+)$/,
        //     ([, c]) => {
        //         return {
        //             color: c,
        //         }
        //     },
        // ],
    ],
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            extraProperties: {
                display: 'inline-block',
                'vertical-align': 'middle',
            },
        }),
    ],
})
