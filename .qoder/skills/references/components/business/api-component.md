# Vben ApiComponent API组件包装器

用于包装其它组件，为目标组件提供自动获取远程数据的能力。

## 基础用法

包装 Select 组件，自动获取远程选项：

```vue
<script setup lang="ts">
  import { ApiComponent } from '@vben/common-ui'
  import { Select } from 'ant-design-vue'

  async function fetchOptions() {
    const res = await getUserListApi()
    return res.data
  }
</script>

<template>
  <ApiComponent v-model="selectedValue" :api="fetchOptions" :component="Select" label-field="name" value-field="id" />
</template>
```

## 包装级联选择器

```vue
<script setup lang="ts">
  import { ApiComponent } from '@vben/common-ui'
  import { Cascader } from 'ant-design-vue'

  async function fetchTreeData() {
    const res = await getRegionTreeApi()
    return res.data
  }
</script>

<template>
  <ApiComponent
    v-model="selectedRegion"
    :api="fetchTreeData"
    :component="Cascader"
    :immediate="false"
    children-field="children"
    loading-slot="suffixIcon"
    visible-event="onDropdownVisibleChange"
  />
</template>
```

## 请求参数

```vue
<script setup lang="ts">
  const params = ref({ type: 'user' })

  async function fetchOptions(params) {
    const res = await getOptionsApi(params)
    return res.data
  }
</script>

<template>
  <ApiComponent v-model="value" :api="fetchOptions" :params="params" :component="Select" />
</template>
```

## 请求前后处理

```vue
<script setup lang="ts">
  async function beforeFetch(params) {
    // 请求前处理参数
    return { ...params, status: 1 }
  }

  async function afterFetch(data) {
    // 请求后处理数据
    return data.map(item => ({
      ...item,
      label: `${item.name} (${item.code})`,
    }))
  }
</script>

<template>
  <ApiComponent v-model="value" :api="fetchOptions" :component="Select" :before-fetch="beforeFetch" :after-fetch="afterFetch" />
</template>
```

## autoSelect 自动设置选项

如果当前值为 undefined，在选项数据成功加载之后，自动从备选项中选择一个作为当前值。默认值为 `false`，即不自动选择选项。注意：该属性不应用于多选组件。

可选值：

- `"first"`：自动选择第一个选项
- `"last"`：自动选择最后一个选项
- `"one"`：有且仅有一个选项时，自动选择它
- **自定义函数**：自定义选择逻辑，函数的参数为 options，返回值为选择的选项
- `false`：不自动选择选项

```vue
<template>
  <!-- 自动选择第一个 -->
  <ApiComponent v-model="value" :api="fetchOptions" :component="Select" auto-select="first" />

  <!-- 自定义选择逻辑 -->
  <ApiComponent v-model="value" :api="fetchOptions" :component="Select" :auto-select="options => options.find(item => item.default) || options[0]" />
</template>
```

## Props 属性

| 属性名          | 描述                                                | 类型                                                                            | 默认值       |
| --------------- | --------------------------------------------------- | ------------------------------------------------------------------------------- | ------------ |
| modelValue      | 当前值                                              | `any`                                                                           | -            |
| component       | 欲包装的组件（目标组件）                            | `Component`                                                                     | -            |
| api             | 获取数据的函数                                      | `(arg?) => Promise<OptionsItem[] \| Record<string, any>>`                       | -            |
| params          | 传递给 api 的参数                                   | `Record<string, any>`                                                           | -            |
| resultField     | 从结果中提取 options 数组的字段名                   | `string`                                                                        | -            |
| labelField      | label 字段名                                        | `string`                                                                        | `label`      |
| valueField      | value 字段名                                        | `string`                                                                        | `value`      |
| childrenField   | 子级数据字段名，需要层级数据的组件可用              | `string`                                                                        | -            |
| optionsPropName | 目标组件接收 options 数据的属性名称                 | `string`                                                                        | `options`    |
| modelPropName   | 目标组件的双向绑定属性名                            | `string`                                                                        | `modelValue` |
| immediate       | 是否立即调用 api                                    | `boolean`                                                                       | `true`       |
| alwaysLoad      | 每次 visibleEvent 事件发生时都重新请求数据          | `boolean`                                                                       | `false`      |
| beforeFetch     | 在 api 请求之前的回调函数                           | `AnyPromiseFunction<any, any>`                                                  | -            |
| afterFetch      | 在 api 请求之后的回调函数                           | `AnyPromiseFunction<any, any>`                                                  | -            |
| options         | 直接传入选项数据，也作为 api 返回空数据时的后备数据 | `OptionsItem[]`                                                                 | -            |
| visibleEvent    | 触发重新请求数据的事件名                            | `string`                                                                        | -            |
| loadingSlot     | 目标组件的插槽名称，用来显示"加载中"的图标          | `string`                                                                        | -            |
| numberToString  | 是否将 value 从数字转为 string                      | `boolean`                                                                       | `false`      |
| autoSelect      | 自动设置选项                                        | `'first' \| 'last' \| 'one' \| ((item: OptionsItem[]) => OptionsItem) \| false` | `false`      |

## Methods 方法

| 方法            | 描述                 | 类型                  |
| --------------- | -------------------- | --------------------- |
| getComponentRef | 获取被包装组件的实例 | `() => T`             |
| updateParam     | 设置接口请求参数     | `(params) => void`    |
| getOptions      | 获取已加载的选项数据 | `() => OptionsItem[]` |
| getValue        | 获取当前值           | `() => any`           |

## 并发和缓存

使用 Tanstack Query 包装接口请求，实现并发控制和缓存：

```ts
import { useQuery } from '@tanstack/vue-query'

function useUserOptions() {
  return useQuery({
    queryKey: ['user-options'],
    queryFn: () => getUserListApi(),
    staleTime: 5 * 60 * 1000, // 5分钟缓存
  })
}
```

## 适配器配置

在应用适配器中预包装组件：

```ts
// src/adapter/component.ts
import { ApiComponent } from '@vben/common-ui'
import { Select, TreeSelect } from 'ant-design-vue'

const components = {
  ApiSelect: (props, { attrs, slots }) => {
    return h(
      ApiComponent,
      {
        ...props,
        ...attrs,
        component: Select,
      },
      slots,
    )
  },
  ApiTreeSelect: (props, { attrs, slots }) => {
    return h(
      ApiComponent,
      {
        ...props,
        ...attrs,
        component: TreeSelect,
        childrenField: 'children',
      },
      slots,
    )
  },
}
```
