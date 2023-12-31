<template>
    <form :modelValue="modelValue">
        <input
            v-for="(order, index) in count"
            class="inputUnit"
            @keyup="Backspace($event, order)"
            :ref="(el: Element | ComponentPublicInstance | null) => setInputRef(order, el)"
            :key="index"
            @input="constraintInput($event as InputEvent, order)"
            @focus="currentPosition = order"
            :style="{
                width: cellWidth,
                height: cellHeight,
                textShadow: fontColor,
            }"
        />
    </form>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue', 'submit', 'check'])
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    count: {
        type: Number,
        default: 6,
        min: 1,
    },
    cellUnit: {
        type: Number,
        default: 1,
        min: 1,
    },
    cellWidth: {
        type: String,
        default: '2em',
    },
    cellHeight: {
        type: String,
        default: '2em',
    },
    fontColor: {
        type: String,
        default: '',
    },
    focusOn: {
        type: Number,
        default: 1,
    },
})

// 最终用于提交的结果
const result = ref('')

// 当前输入框位置
const currentPosition = ref<number>(1)

// 所有输入框的引用
const refs: Record<number, HTMLInputElement> = {}
const setInputRef = (
    order: number,
    el: Element | ComponentPublicInstance | null
) => {
    nextTick(() => {
        refs[`${order}`] = el as HTMLInputElement
    })
}

// 自动聚焦输入框
const autoFocus = (index: number) => {
    nextTick(() => {
        refs[index]?.focus()
    })
}

const checkInput = (target: HTMLInputElement) => {
    emit('check', target.value, (result: boolean) => {
        if (!result && target) {
            target.value = ''
            return
        }
    })
}

// 判断是否是数字
// 控制输入
const constraintInput = (event: InputEvent, order: number) => {
    let target = event.target as HTMLInputElement
    checkInput(target)
    if (order) {
        const nextOrder = order + 1
        if (target.value.length > props.cellUnit) {
            target.value = target.value.slice(0, props.cellUnit)
            refs[`${nextOrder}`]?.focus()
        } else if (target.value.length === props.cellUnit) {
            target.value = target.value.slice(0, props.cellUnit)
            refs[`${nextOrder}`]?.focus()
        }
        updateResult()
    } else {
        console.error('order is not defined')
    }
}

// 控制黏贴
const constraintPaste = () => {
    window.navigator.clipboard.readText().then((text) => {
        text.split('').forEach((item, index) => {
            emit('check', item, (result: boolean) => {
                if (result) {
                    let nextOrder = index + 1
                    var el: HTMLInputElement = refs[`${nextOrder}`]
                    if (el) {
                        el?.focus()
                        el.value = item
                        updateResult()
                    }
                    currentPosition.value = text.length
                } else {
                    return
                }
            })
        })
    })
}

// 更新最终结果
const updateResult = () => {
    result.value = Object.values(refs)
        .map((item) => item.value)
        .join('')
    emit('update:modelValue', result.value)
    if (result.value.length === props.count * props.cellUnit) {
        emit('submit', result.value)
    }
}

// 监听删除键
const Backspace = (event: KeyboardEvent, order: number) => {
    if (event.key === 'Backspace' && order >= 1) {
        updateResult()
        let preOrder = order - 1
        var current = refs[`${order}`]?.value
        if (current.length === 0 && preOrder > 0) {
            refs[`${preOrder}`]?.focus()
            currentPosition.value = preOrder
        }
        return
    }
}

// 监听粘贴事件
window.addEventListener('paste', constraintPaste)

// 获取指定元素的ref
const getRef = (index: number) => {
    return refs[`${index}`]
}

// 自动聚焦
const initComponent = () => {
    if (props.focusOn > props.count) {
        autoFocus(currentPosition.value)
    } else {
        currentPosition.value = props.focusOn
        autoFocus(currentPosition.value)
    }
}

// 组件加载时自动聚焦
onMounted(() => {
    initComponent()
})

// 组件卸载时移除黏贴监听
onUnmounted(() => {
    window.removeEventListener('paste', constraintPaste)
})

defineExpose({
    refs,
    getRef,
    currentPosition,
})
</script>

<style scoped>
.inputUnit:focus {
    box-shadow: 0 0 0 1px #449bf2 inset;
}
input {
    margin: 0.2rem;
    border-radius: 0.5rem;
    color: transparent;
    border: none;
    outline: 0;
    text-align: center;
    font-size: 1.5em;
    font-weight: bold;
    background-color: transparent;
    box-shadow: 0 0 0 1px #e4e7ed inset;
}
</style>
