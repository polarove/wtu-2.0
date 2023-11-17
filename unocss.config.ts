import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
    // reference: https://element-plus.org/zh-CN/component/layout.html#col-attributes
    theme: {
        breakpoints: {
            xs: '576px',
            sm: '768px',
            md: '992px',
            lg: '1200px',
            xl: '1920px',
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
