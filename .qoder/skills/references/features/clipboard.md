# 剪切板 Clipboard

基于 `@vueuse/core` 的 `useClipboard` 封装，用于读写系统剪贴板内容。

## 导入方式

```ts
import { useClipboard } from '@vueuse/core'
```

## 基础用法

```vue
<script setup lang="ts">
  import { ref } from 'vue'
  import { useClipboard } from '@vueuse/core'

  const source = ref('Hello')
  const { copy, text } = useClipboard({ legacy: true, source })
</script>

<template>
  <div>
    <p>
      当前剪贴板内容:
      <code>{{ text || 'none' }}</code>
    </p>
    <input v-model="source" />
    <button @click="copy(source)">复制</button>
  </div>
</template>
```

## 复制指定内容

```vue
<script setup lang="ts">
  import { useClipboard } from '@vueuse/core'
  import { Button, message } from 'ant-design-vue'

  const { copy } = useClipboard({ legacy: true })

  async function handleCopy(content: string) {
    await copy(content)
    message.success('复制成功')
  }
</script>

<template>
  <Button @click="handleCopy('要复制的内容')">点击复制</Button>
</template>
```

## 配合表单使用

```vue
<script setup lang="ts">
  import { ref } from 'vue'
  import { useClipboard } from '@vueuse/core'
  import { Button, Input, message } from 'ant-design-vue'

  const inputValue = ref('')
  const { copy, text } = useClipboard({ legacy: true })

  async function handleCopy() {
    if (!inputValue.value) {
      message.warning('请输入内容')
      return
    }
    await copy(inputValue.value)
    message.success('复制成功')
  }
</script>

<template>
  <Card title="剪切板示例">
    <p class="mb-3">
      当前剪贴板内容:
      <code>{{ text || 'none' }}</code>
    </p>
    <div class="flex gap-3">
      <Input v-model:value="inputValue" class="w-50" />
      <Button type="primary" @click="handleCopy">复制</Button>
    </div>
  </Card>
</template>
```

## 复制表格数据

```vue
<script setup lang="ts">
  import { useClipboard } from '@vueuse/core'
  import { Button, message } from 'ant-design-vue'

  const { copy } = useClipboard({ legacy: true })

  const tableData = [
    { name: '张三', age: 25, city: '北京' },
    { name: '李四', age: 30, city: '上海' },
  ]

  async function copyAsJson() {
    await copy(JSON.stringify(tableData, null, 2))
    message.success('JSON 格式复制成功')
  }

  async function copyAsCsv() {
    const headers = Object.keys(tableData[0]).join(',')
    const rows = tableData.map(row => Object.values(row).join(','))
    await copy([headers, ...rows].join('\n'))
    message.success('CSV 格式复制成功')
  }
</script>

<template>
  <Button @click="copyAsJson">复制为 JSON</Button>
  <Button @click="copyAsCsv">复制为 CSV</Button>
</template>
```

## API 说明

### useClipboard 参数

```ts
const { copy, copied, text, isSupported } = useClipboard(options)
```

| 参数         | 描述                             | 类型               | 默认值  |
| ------------ | -------------------------------- | ------------------ | ------- |
| legacy       | 是否使用兼容模式（旧浏览器支持） | `boolean`          | `false` |
| source       | 默认复制的源内容                 | `MaybeRef<string>` | -       |
| read         | 是否读取剪贴板（需要用户授权）   | `boolean`          | `false` |
| copiedDuring | 复制成功状态的持续时间（ms）     | `number`           | `1500`  |

### 返回值

| 属性        | 描述                                     | 类型                              |
| ----------- | ---------------------------------------- | --------------------------------- |
| copy        | 复制函数                                 | `(text: string) => Promise<void>` |
| copied      | 是否刚刚复制成功（受 copiedDuring 控制） | `Ref<boolean>`                    |
| text        | 当前剪贴板内容                           | `Ref<string>`                     |
| isSupported | 当前浏览器是否支持剪贴板 API             | `Ref<boolean>`                    |

## 使用场景

- 复制验证码/密钥
- 复制链接/地址
- 复制表格数据为 CSV/JSON
- 复制代码片段
- 一键复制表单内容

## 注意事项

1. **HTTPS 要求**：在非 HTTPS 环境下，现代剪贴板 API 可能受限，建议开启 `legacy: true`
2. **用户交互**：剪贴板操作必须在用户交互（如点击事件）中触发，否则会被浏览器阻止
3. **权限**：`read: true` 时需要用户授权才能读取剪贴板内容
4. **兼容性**：`legacy: true` 使用 `document.execCommand('copy')` 作为降级方案
