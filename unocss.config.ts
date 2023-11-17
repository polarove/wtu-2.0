// unocss.config.ts
import { defineConfig, presetAttributify, presetUno, presetIcons } from 'unocss'

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
    // 以下配置是为了可以在组件中更方便地使用图标<el-button icon="i-ep-lock"/>
    // 需要安装来自iconify-json/icon-set-name的图标才行, 如 iconify-json/ep
    variants: [
        {
            match: (s) => {
                if (s.startsWith('i-')) {
                    return {
                        matcher: s,
                        selector: (s) => {
                            return s.startsWith('.') ? `${s.slice(1)},${s}` : s
                        },
                    }
                }
            },
        },
    ],
    rules: [
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
