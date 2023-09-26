import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
    // ...UnoCSS选项
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
                'align-items': 'center',
            },
        ],
        [
            'flex-between',
            {
                display: 'flex',
                'justify-content': 'space-between',
                'align-items': 'center',
            },
        ],
        [
            'flex-around',
            {
                display: 'flex',
                'justify-content': 'space-around',
                'align-items': 'center',
            },
        ],
        [
            'flex-evenly',
            {
                display: 'flex',
                'justify-content': 'space-evenly',
                'align-items': 'center',
            },
        ],
        [
            'flex-start',
            {
                display: 'flex',
                'justify-content': 'flex-start',
                'align-items': 'center',
            },
        ],
        [
            'flex-col',
            {
                display: 'flex',
                'flex-direction': 'column',
                'justify-content': 'center',
                'align-items': 'center',
            },
        ],
        [
            'flex-col-start',
            {
                display: 'flex',
                'flex-direction': 'column',
                'justify-content': 'flex-start',
                'align-items': 'center',
            },
        ],
        [
            'flex-col-reverse',
            {
                display: 'flex',
                'flex-direction': 'column-reverse',
                'justify-content': 'center',
                'align-items': 'center',
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
