
<template>
    <el-tooltip content="请输入验证码" :visible="tooltipVisible">
        <div class="ryu_code_wrapper">
            <div class="w-100% h-100% text-center">
                <form :modelValue="modelValue">
                    <input class="inputUnit" @keyup="Backspace($event, order)"
                        :ref="(el: HTMLInputElement) => setInputRef(el, order)" @input="constraintInput($event, order)"
                        :style="{ width: cellWidth, height: cellHeight }" v-for="order in count" />
                </form>
            </div>
        </div>
    </el-tooltip>
</template>
  
<script setup lang='ts'>
// 因为要动态生成ref，所以需要关闭ts检查
// @ts-nocheck
const tooltipVisible = ref(true)
const emit = defineEmits(['update:modelValue', 'submit'])
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    activeInputBorderColor: {
        type: String,
        default: '#449bf2'
    },
    count: {
        type: Number,
        default: 6
    },
    tooltipDisappearsAt: {
        type: String,
        default: '2'
    },
    cellUnit: {
        type: Number,
        default: 1
    },
    cellWidth: {
        type: String,
        default: '2em'
    },
    cellHeight: {
        type: String,
        default: '2em'
    },
})

const currentPosition = ref(1)
const refs: Record<string, HTMLInputElement> = {}
const setInputRef = (el: HTMLInputElement, order: number) => {
    if (el) {
        refs[`${order}`] = el
    }
}
const AutoFocus = () => {
    nextTick(() => {
        refs['1']?.focus()
    })
}

const result = ref('')
const constraintInput = (event: InputEvent, order: number) => {
    const target = event.target as HTMLInputElement
    if (!testNumber(event.data as string)) {
        // write code to stop input
        if (target) {
            target.value = ''
        }
        return
    }
    if (order) {
        if (target.value.length >= props.cellUnit) {
            target.value = target.value.slice(0, props.cellUnit)
        }
        const nextOrder = order + 1
        if (nextOrder <= props.count) {
            currentPosition.value = nextOrder
            refs[`${nextOrder}`]?.focus()
        }
        updateResult()
    }
}
const updateResult = () => {
    result.value = Object.values(refs).map((item) => item.value).join('')
    emit('update:modelValue', result.value)
    if (result.value.length === props.count) {
        emit('submit', result.value)
    }
}
const Backspace = (event: KeyboardEvent, order: number) => {
    if (event.key === 'Backspace' && order > 1) {
        updateResult()
        let preOrder = order - 1
        refs[`${preOrder}`]?.focus()
        currentPosition.value = preOrder
        return
    }
}

window.addEventListener("paste", function () {
    this.navigator.clipboard.readText().then((text) => {
        text.split('').forEach((item, index) => {
            let nextOrder = index + 1
            if (!testNumber(item)) {
                return
            }
            if (refs[`${nextOrder}`]) {
                refs[`${nextOrder}`]?.focus()
                refs[`${nextOrder}`].value = item
                updateResult()
            }
            currentPosition.value = Object.keys(refs).length
        })
    });
})

watchEffect(() => {
    if (currentPosition.value > Number(props.tooltipDisappearsAt)) {
        tooltipVisible.value = false
    } else {
        tooltipVisible.value = true
    }
})

const testNumber = (str: string) => {
    return /^\d+$/.test(str)
}

defineExpose({
    result
})
onMounted(() => {
    AutoFocus()
})
</script>
  
<style lang='scss' scoped>
.ryu_code_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .inputUnit {
        &:focus {
            box-shadow: 0 0 0 1px #449bf2 inset;
        }

    }

    input {
        margin: 0.2rem;
        border-radius: 0.5rem;
        color: transparent;
        text-shadow: 0 0 0 var(--el-text-color-primary);
        border: none;
        outline: 0;
        text-align: center;
        font-size: 1.5em;
        font-weight: bold;
        background-color: transparent;
        box-shadow: 0 0 0 1px #e4e7ed inset;
    }
}
</style>