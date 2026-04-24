# Vben Tippy 提示组件

基于 Tippy.js 封装的轻量级提示工具组件，支持指令和组件两种使用方式，可创建工具提示、引导提示等交互式提示。

## 导入方式

```ts
import { Tippy } from '@vben/common-ui'
import type { TippyProps } from '@vben/common-ui'
```

指令形式无需显式导入，框架已全局注册 `v-tippy` 指令。

## 指令形式使用

指令形式简洁直接，适用于固定内容的工具提示场景。

### 基础用法

```vue
<template>
  <!-- 字符串内容 -->
  <Button v-tippy="'这是一个提示'">默认配置</Button>

  <!-- 对象配置 -->
  <Button
    v-tippy="{
      theme: 'light',
      content: '这是一个提示，总是light主题',
    }"
  >
    指定主题
  </Button>

  <!-- 延时显示 -->
  <Button
    v-tippy="{
      content: '这个提示将在100毫秒后激活',
      delay: 100,
    }"
  >
    指定延时
  </Button>

  <!-- 自定义动画 -->
  <Button
    v-tippy="{
      content: '本提示的动画为 scale',
      animation: 'scale',
    }"
  >
    指定动画
  </Button>
</template>
```

## 组件形式使用

组件形式更灵活，支持响应式配置、动态内容更新，适合需要实时调整提示属性的场景。

### 基础用法

```vue
<script setup lang="ts">
  import { reactive } from 'vue'
  import { Tippy } from '@vben/common-ui'
  import type { TippyProps } from '@vben/common-ui'

  const tippyProps = reactive<TippyProps>({
    animation: 'shift-away',
    arrow: true,
    content: '这是一个提示',
    delay: [200, 200],
    duration: 200,
    followCursor: false,
    hideOnClick: false,
    inertia: true,
    maxWidth: 'none',
    placement: 'top',
    theme: 'dark',
    trigger: 'mouseenter focusin',
  })
</script>

<template>
  <Tippy v-bind="tippyProps">
    <Button>鼠标移到这个组件上来体验效果</Button>
  </Tippy>
</template>
```

### 配合表单动态配置

```vue
<script setup lang="ts">
  import { reactive } from 'vue'
  import { Page, Tippy } from '@vben/common-ui'
  import { Button } from 'ant-design-vue'
  import { useVbenForm } from '#/adapter/form'
  import type { TippyProps } from '@vben/common-ui'

  const tippyProps = reactive<TippyProps>({
    animation: 'shift-away',
    arrow: true,
    content: '这是一个提示',
    delay: [200, 200],
    duration: 200,
    followCursor: false,
    hideOnClick: false,
    inertia: true,
    maxWidth: 'none',
    placement: 'top',
    theme: 'dark',
    trigger: 'mouseenter focusin',
  })

  // 辅助函数：将字符串形式的布尔值转为实际布尔值
  function parseBoolean(value: string) {
    switch (value) {
      case 'false': {
        return false
      }
      case 'true': {
        return true
      }
      default: {
        return value
      }
    }
  }

  // 表单联动更新 tippy 配置
  const [Form] = useVbenForm({
    handleValuesChange(values) {
      Object.assign(tippyProps, {
        ...values,
        delay: [values.delay1, values.delay2],
        followCursor: parseBoolean(values.followCursor),
        hideOnClick: parseBoolean(values.hideOnClick),
        trigger: values.trigger.join(' '),
      })
    },
    schema: [
      {
        component: 'RadioGroup',
        componentProps: {
          buttonStyle: 'solid',
          class: 'w-full',
          options: [
            { label: '自动', value: 'auto' },
            { label: '暗色', value: 'dark' },
            { label: '亮色', value: 'light' },
          ],
          optionType: 'button',
        },
        defaultValue: tippyProps.theme,
        fieldName: 'theme',
        label: '主题',
      },
      {
        component: 'Select',
        componentProps: {
          class: 'w-full',
          options: [
            { label: '向上滑入', value: 'shift-away' },
            { label: '向下滑入', value: 'shift-toward' },
            { label: '缩放', value: 'scale' },
            { label: '透视', value: 'perspective' },
            { label: '淡入', value: 'fade' },
          ],
        },
        defaultValue: tippyProps.animation,
        fieldName: 'animation',
        label: '动画类型',
      },
      {
        component: 'Select',
        componentProps: {
          class: 'w-full',
          options: [
            { label: '顶部', value: 'top' },
            { label: '顶左', value: 'top-start' },
            { label: '顶右', value: 'top-end' },
            { label: '底部', value: 'bottom' },
            { label: '底左', value: 'bottom-start' },
            { label: '底右', value: 'bottom-end' },
            { label: '左侧', value: 'left' },
            { label: '左上', value: 'left-start' },
            { label: '左下', value: 'left-end' },
            { label: '右侧', value: 'right' },
            { label: '右上', value: 'right-start' },
            { label: '右下', value: 'right-end' },
          ],
        },
        defaultValue: tippyProps.placement,
        fieldName: 'placement',
        label: '位置',
      },
      {
        component: 'InputNumber',
        componentProps: {
          addonAfter: '毫秒',
        },
        defaultValue: tippyProps.duration,
        fieldName: 'duration',
        label: '动画时长',
      },
      {
        component: 'Input',
        defaultValue: tippyProps.content,
        fieldName: 'content',
        label: '内容',
      },
    ],
    showDefaultActions: false,
  })
</script>

<template>
  <Page title="Tippy 示例">
    <Tippy v-bind="tippyProps">
      <Button>触发提示</Button>
    </Tippy>
    <Form class="mt-4" />
  </Page>
</template>
```

## Props 属性

| 属性名       | 描述                  | 类型                                                                   | 默认值                 |
| ------------ | --------------------- | ---------------------------------------------------------------------- | ---------------------- |
| animation    | 动画类型              | `'shift-away' \| 'shift-toward' \| 'scale' \| 'perspective' \| 'fade'` | `'shift-away'`         |
| arrow        | 是否显示箭头          | `boolean`                                                              | `true`                 |
| content      | 提示内容              | `string`                                                               | `'这是一个提示'`       |
| delay        | 显示/隐藏延迟（毫秒） | `[number, number]`                                                     | `[200, 200]`           |
| duration     | 动画持续时间（毫秒）  | `number`                                                               | `200`                  |
| followCursor | 是否跟随指针          | `boolean \| 'horizontal' \| 'vertical' \| 'initial'`                   | `false`                |
| hideOnClick  | 点击后是否隐藏        | `boolean \| 'toggle'`                                                  | `false`                |
| inertia      | 动画惯性效果          | `boolean`                                                              | `true`                 |
| maxWidth     | 最大宽度              | `string`                                                               | `'none'`               |
| placement    | 提示位置              | ` Placement`                                                           | `'top'`                |
| theme        | 主题风格              | `'auto' \| 'dark' \| 'light'`                                          | `'dark'`               |
| trigger      | 触发方式              | `string`                                                               | `'mouseenter focusin'` |

### placement 可选值

```
'top', 'top-start', 'top-end',
'bottom', 'bottom-start', 'bottom-end',
'left', 'left-start', 'left-end',
'right', 'right-start', 'right-end'
```

### trigger 可选值

支持多个触发方式组合，用空格分隔：

- `mouseenter` - 鼠标移入
- `click` - 被点击
- `focusin` - 获得焦点
- `manual` - 无触发，仅手动控制

## 使用场景

- 按钮 hover 提示
- 表单字段说明
- 图标含义解释
- 操作引导提示
- 数据展示补充说明

## 注意事项

1. **指令形式**适用于静态内容，`content` 不支持响应式更新
2. **组件形式**支持响应式配置，通过 `v-bind` 绑定 props 对象
3. `followCursor` 和 `hideOnClick` 的字符串值 `'true'` / `'false'` 需要通过辅助函数转为实际布尔值
4. `trigger` 多值组合时，组件形式中需传入数组，内部通过 `join(' ')` 转为字符串
5. 更多配置请参考 [Tippy.js 官方文档](https://atomiks.github.io/tippyjs/v6/all-props/)
