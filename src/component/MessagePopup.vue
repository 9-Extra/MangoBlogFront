<script lang="ts">
export default {
    name: 'XtxMessage',
    props: {
        text: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            // warn 警告  error 错误  success 成功
            default: 'warn'
        }
    },
    setup() {
        // 定义一个对象，包含三种情况的样式，对象key就是类型字符串
        const style = {
            warn: {
                icon: 'icon-warning',
                color: '#E6A23C',
                backgroundColor: 'rgb(253, 246, 236)',
                borderColor: 'rgb(250, 236, 216)'
            },
            error: {
                icon: 'icon-shanchu',
                color: '#F56C6C',
                backgroundColor: 'rgb(254, 240, 240)',
                borderColor: 'rgb(253, 226, 226)'
            },
            success: {
                icon: 'icon-queren2',
                color: '#67C23A',
                backgroundColor: 'rgb(240, 249, 235)',
                borderColor: 'rgb(225, 243, 216)'
            }
        }
        return { style }
    }
}
</script>

<template>
    <div class="xtx-message" :style="style[type as keyof typeof style]">
        <!-- 上面绑定的是样式 -->
        <!-- 不同提示图标会变 -->
        <i class="iconfont" :class="[style[type as keyof typeof style].icon]"></i>
        <span class="text">{{ text }}</span>
    </div>
</template>

<style scoped>
@charset "utf-8";
.xtx-message {
    width: 300px;
    height: 50px;
    position: fixed;
    z-index: 9999;
    left: 50%;
    margin-left: -150px;
    top: 15vh;
    line-height: 50px;
    padding: 0 25px;
    border: 1px solid #e4e4e4;
    background: #f5f5f5;
    color: #999;
    border-radius: 4px;

    transition: 1s;
}

.xtx-message > i {
    margin-right: 4px;
    vertical-align: middle;
}

.xtx-message > .text {
    vertical-align: middle;
}
</style>
  