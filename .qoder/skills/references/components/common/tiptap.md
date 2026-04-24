# Vben Tiptap 富文本编辑器

基于 Tiptap 封装的富文本编辑器组件，内置常用编辑功能和工具栏，支持 HTML 内容的双向绑定。

## 导入方式

```ts
import { VbenTiptap, VbenTiptapPreview } from '@vben/plugins/tiptap'
import type { TipTapProps, VbenTiptapChangeEvent } from '@vben/plugins/tiptap'
```

## 基础用法

```vue
<script setup lang="ts">
  import { Page } from '@vben/common-ui'
  import { VbenTiptap, VbenTiptapPreview } from '@vben/plugins/tiptap'

  import { Card } from 'ant-design-vue'
  import { computed, ref } from 'vue'

  const content = ref(`
  <h1>标题</h1>
  <p>这是一段富文本内容。</p>
`)
  const previewContent = computed(() => content.value)
</script>

<template>
  <Page title="Tiptap 富文本">
    <Card title="编辑器">
      <VbenTiptap v-model="content" />
    </Card>

    <Card title="富文本预览">
      <VbenTiptapPreview :content="previewContent" />
    </Card>
  </Page>
</template>
```

## 只读模式

```vue
<script setup lang="ts">
  import { VbenTiptap } from '@vben/plugins/tiptap'

  const content = '<p>只读内容，不可编辑</p>'
</script>

<template>
  <VbenTiptap v-model="content" :editable="false" :toolbar="false" />
</template>
```

## 隐藏预览按钮

```vue
<template>
  <VbenTiptap v-model="content" :previewable="false" />
</template>
```

## 自定义占位符

```vue
<template>
  <VbenTiptap v-model="content" placeholder="请输入文章内容..." />
</template>
```

## 监听内容变化

```vue
<script setup lang="ts">
  import { VbenTiptap } from '@vben/plugins/tiptap'
  import type { VbenTiptapChangeEvent } from '@vben/plugins/tiptap'
  import { message } from 'ant-design-vue'
  import { ref } from 'vue'

  const content = ref('')

  function handleChange(event: VbenTiptapChangeEvent) {
    console.log('HTML:', event.html)
    console.log('纯文本:', event.text)
    console.log('JSON:', event.json)
    message.success('内容已更新')
  }
</script>

<template>
  <VbenTiptap v-model="content" @change="handleChange" />
</template>
```

## 自定义扩展

```vue
<script setup lang="ts">
  import { VbenTiptap } from '@vben/plugins/tiptap'
  import { ref } from 'vue'

  import StarterKit from '@tiptap/starter-kit'
  import Table from '@tiptap/extension-table'
  import TableCell from '@tiptap/extension-table-cell'
  import TableHeader from '@tiptap/extension-table-header'
  import TableRow from '@tiptap/extension-table-row'

  const content = ref('<p>带表格的编辑器</p>')

  const extensions = [StarterKit, Table.configure({ resizable: true }), TableRow, TableHeader, TableCell]
</script>

<template>
  <VbenTiptap v-model="content" :extensions="extensions" />
</template>
```

## VbenTiptap Props 属性

| 属性名      | 描述               | 类型               | 默认值                    |
| ----------- | ------------------ | ------------------ | ------------------------- |
| editable    | 是否可编辑         | `boolean`          | `true`                    |
| extensions  | 自定义 Tiptap 扩展 | `Extensions`       | 默认扩展                  |
| minHeight   | 内容最小高度       | `number \| string` | `240`                     |
| placeholder | 占位提示文本       | `string`           | `'ui.tiptap.placeholder'` |
| previewable | 是否显示预览按钮   | `boolean`          | `true`                    |
| toolbar     | 是否显示工具栏     | `boolean`          | `true`                    |

## VbenTiptapPreview Props 属性

| 属性名    | 描述       | 类型               | 默认值 |
| --------- | ---------- | ------------------ | ------ |
| content   | HTML 内容  | `string`           | `''`   |
| minHeight | 最小高度   | `number \| string` | `160`  |
| class     | 自定义类名 | `any`              | -      |

## Events 事件

| 事件名 | 描述           | 类型                                     |
| ------ | -------------- | ---------------------------------------- |
| change | 内容变化时触发 | `(event: VbenTiptapChangeEvent) => void` |

### VbenTiptapChangeEvent

```ts
interface VbenTiptapChangeEvent {
  html: string // HTML 格式内容
  json: JSONContent // JSON 格式内容
  text: string // 纯文本内容
}
```

## 默认内置扩展

组件默认内置以下 Tiptap 扩展：

| 扩展        | 功能                                 |
| ----------- | ------------------------------------ |
| StarterKit  | 基础功能（粗体、斜体、标题、列表等） |
| Underline   | 下划线                               |
| TextAlign   | 文本对齐                             |
| TextStyle   | 文本样式                             |
| Color       | 文字颜色                             |
| Highlight   | 高亮标记                             |
| Link        | 链接（自动识别、mailto、tel）        |
| Image       | 图片（支持 base64）                  |
| Placeholder | 占位提示                             |

### 默认工具栏功能

- **格式**：粗体、斜体、下划线、删除线
- **标题**：H1、H2、H3、H4
- **列表**：无序列表、有序列表
- **对齐**：左对齐、居中、右对齐、两端对齐
- **插入**：链接、图片、水平线、引用块
- **样式**：文字颜色、高亮颜色、清除格式
- **撤销/重做**
- **预览**（弹窗预览）

## 使用场景

- 文章/公告内容编辑
- 富文本邮件编辑
- 商品详情描述
- 评论内容编辑
- 任何需要富文本输入的场景

## 注意事项

1. `v-model` 绑定的是 **HTML 字符串**，不是纯文本
2. 组件基于 `@tiptap/vue-3` 封装，支持所有 Tiptap 原生扩展
3. 自定义 `extensions` 时会**完全替换**默认扩展，如需保留默认功能需手动引入
4. `minHeight` 支持数字（px）或字符串（如 `'300px'`）
5. 预览组件 `VbenTiptapPreview` 使用 `v-html` 渲染，注意 XSS 风险，服务端返回内容需做好过滤
