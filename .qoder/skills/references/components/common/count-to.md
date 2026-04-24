# Vben CountTo 数字动画

基于 `@vueuse/core` 的 `useTransition` 封装的数字滚动动画组件，每次改变当前值都会产生平滑的过渡动画效果。

## 导入方式

```ts
import { CountTo, TransitionPresetsKeys } from '@vben/common-ui'
import type { CountToProps, TransitionPresets } from '@vben/common-ui'
```

## 基础用法

```vue
<script setup lang="ts">
  import { CountTo } from '@vben/common-ui'
</script>

<template>
  <CountTo :start-val="0" :end-val="2024" :duration="2000" />
</template>
```

## 自定义格式

```vue
<template>
  <!-- 带前缀和后缀 -->
  <CountTo :start-val="0" :end-val="9999" prefix="¥" suffix="元" />

  <!-- 带小数位 -->
  <CountTo :start-val="0" :end-val="99.99" :decimals="2" />

  <!-- 自定义分隔符 -->
  <CountTo :start-val="0" :end-val="1000000" separator="," />
</template>
```

## 完整配置示例

```vue
<script setup lang="ts">
  import { reactive } from 'vue'
  import { CountTo, Page, TransitionPresetsKeys } from '@vben/common-ui'
  import type { CountToProps, TransitionPresets } from '@vben/common-ui'

  const props = reactive<CountToProps & { transition: TransitionPresets }>({
    decimal: '.',
    decimals: 2,
    decimalStyle: {
      fontSize: 'small',
      fontStyle: 'italic',
    },
    delay: 0,
    disabled: false,
    duration: 2000,
    endVal: 100_000,
    mainStyle: {
      color: 'hsl(var(--primary))',
      fontSize: 'xx-large',
      fontWeight: 'bold',
    },
    prefix: '￥',
    prefixStyle: {
      paddingRight: '0.5rem',
    },
    separator: ',',
    startVal: 0,
    suffix: '元',
    suffixStyle: {
      paddingLeft: '0.5rem',
    },
    transition: 'easeOutQuart',
  })

  function changeNumber() {
    props.endVal = Math.floor(Math.random() * 100_000_000) / 10 ** (props.decimals || 0)
  }

  function onStarted() {
    console.log('动画开始')
  }

  function onFinished() {
    console.log('动画结束')
  }
</script>

<template>
  <Page title="CountTo 示例">
    <CountTo v-bind="props" @started="onStarted" @finished="onFinished" />
    <Button @click="changeNumber">随机数值</Button>
  </Page>
</template>
```

## Props 属性

| 属性名       | 描述                     | 类型                                                       | 默认值        |
| ------------ | ------------------------ | ---------------------------------------------------------- | ------------- |
| startVal     | 起始值                   | `number`                                                   | `0`           |
| endVal       | 结束值（必填）           | `number`                                                   | -             |
| duration     | 动画持续时间（ms）       | `number`                                                   | `2000`        |
| delay        | 延迟动画开始的时间（ms） | `number`                                                   | `0`           |
| disabled     | 是否禁用动画             | `boolean`                                                  | `false`       |
| prefix       | 前缀                     | `string`                                                   | `''`          |
| suffix       | 后缀                     | `string`                                                   | `''`          |
| separator    | 千分位分隔符             | `string`                                                   | `','`         |
| decimal      | 小数点分隔符             | `string`                                                   | `'.'`         |
| decimals     | 保留小数位数             | `number`                                                   | `0`           |
| transition   | 过渡效果预设             | `TransitionPresets \| CubicBezierPoints \| EasingFunction` | `easeOutExpo` |
| mainClass    | 整数部分类名             | `string`                                                   | -             |
| decimalClass | 小数部分类名             | `string`                                                   | -             |
| prefixClass  | 前缀部分类名             | `string`                                                   | -             |
| suffixClass  | 后缀部分类名             | `string`                                                   | -             |
| mainStyle    | 整数部分样式             | `StyleValue`                                               | -             |
| decimalStyle | 小数部分样式             | `StyleValue`                                               | -             |
| prefixStyle  | 前缀部分样式             | `StyleValue`                                               | -             |
| suffixStyle  | 后缀部分样式             | `StyleValue`                                               | -             |

## Events 事件

| 事件名   | 描述           | 类型         |
| -------- | -------------- | ------------ |
| started  | 动画开始时触发 | `() => void` |
| finished | 动画结束时触发 | `() => void` |

## 插槽

| 插槽名 | 描述                                   |
| ------ | -------------------------------------- |
| prefix | 自定义前缀内容，默认显示 `prefix` 文本 |
| suffix | 自定义后缀内容，默认显示 `suffix` 文本 |

## 过渡预设

```vue
<script setup lang="ts">
  import { CountTo, TransitionPresetsKeys } from '@vben/common-ui'
</script>

<template>
  <CountTo :end-val="1000" transition="easeOutQuart" />

  <!-- 使用下拉选择过渡效果 -->
  <Select v-model:value="transitionValue">
    <Select.Option v-for="preset in TransitionPresetsKeys" :key="preset" :value="preset">
      {{ preset }}
    </Select.Option>
  </Select>
</template>
```

可用的过渡预设（通过 `TransitionPresetsKeys` 获取完整列表）：

- `linear`
- `easeInQuad`, `easeOutQuad`, `easeInOutQuad`
- `easeInCubic`, `easeOutCubic`, `easeInOutCubic`
- `easeInQuart`, `easeOutQuart`, `easeInOutQuart`
- `easeInQuint`, `easeOutQuint`, `easeInOutQuint`
- `easeInSine`, `easeOutSine`, `easeInOutSine`
- `easeInExpo`, `easeOutExpo`, `easeInOutExpo`
- `easeInCirc`, `easeOutCirc`, `easeInOutCirc`
- `easeInBack`, `easeOutBack`, `easeInOutBack`
- `easeInElastic`, `easeOutElastic`, `easeInOutElastic`
- `easeInBounce`, `easeOutBounce`, `easeInOutBounce`

## 使用场景

- 统计数据展示
- 仪表盘数字
- 倒计时效果
- 金融数字展示
- 实时数据变化动画

## 注意事项

1. `endVal` 为必填属性，改变该值会自动触发动画
2. `disabled` 为 `true` 时，数值会瞬间变化，无过渡效果
3. `delay` 只在初始挂载时生效，后续 `endVal` 变化不会重新延迟
4. `transition` 支持传入预设名称字符串、贝塞尔曲线点数组或自定义缓动函数
5. 组件内部使用 `useTransition`，更多细节请参考 [VueUse useTransition 文档](https://vueuse.org/core/useTransition/)
