# Vben ContextMenu 上下文菜单

右键点击触发上下文菜单，支持自定义菜单项、图标、快捷键、分割线等功能。

## 导入方式

```ts
import { VbenContextMenu } from '@vben-core/shadcn-ui'
import type { IContextMenuItem } from '@vben-core/shadcn-ui'
```

## 基础用法

```vue
<script setup lang="ts">
  import { VbenContextMenu } from '@vben-core/shadcn-ui'
  import { Button, message } from 'ant-design-vue'

  const contextMenus = () => {
    return [
      {
        text: '刷新',
        key: 'refresh',
        handler: (data: any) => {
          message.success('刷新成功', data)
        },
      },
      {
        text: '关闭当前',
        key: 'close-current',
        handler: (data: any) => {
          message.success('关闭当前', data)
        },
      },
      {
        text: '关闭其他',
        key: 'close-other',
        handler: (data: any) => {
          message.success('关闭其他', data)
        },
      },
      {
        text: '关闭所有',
        key: 'close-all',
        handler: (data: any) => {
          message.success('关闭所有', data)
        },
      },
    ]
  }
</script>

<template>
  <VbenContextMenu :menus="contextMenus">
    <Button>右键点击我打开上下文菜单</Button>
  </VbenContextMenu>
</template>
```

## 条件显示/隐藏菜单项

```vue
<script setup lang="ts">
  import { VbenContextMenu } from '@vben-core/shadcn-ui'
  import { Button, message } from 'ant-design-vue'

  const needHidden = (role: string) => {
    return role === 'user'
  }

  const contextMenus = () => {
    return [
      {
        text: '刷新',
        key: 'refresh',
        handler: (data: any) => {
          message.success('刷新成功', data)
        },
        hidden: needHidden('admin'),
      },
      {
        text: '关闭当前',
        key: 'close-current',
        handler: (data: any) => {
          message.success('关闭当前', data)
        },
        hidden: needHidden('user'),
      },
    ]
  }
</script>

<template>
  <VbenContextMenu :menus="contextMenus" :modal="true" item-class="pr-6">
    <Button>右键点击我打开上下文菜单(有隐藏项)</Button>
  </VbenContextMenu>
</template>
```

## 带图标和分割线

```vue
<script setup lang="ts">
  import { VbenContextMenu } from '@vben-core/shadcn-ui'
  import { Button } from 'ant-design-vue'
  import { h } from 'vue'
  import { IconifyIcon } from '@vben/icons'

  const contextMenus = () => {
    return [
      {
        text: '复制',
        key: 'copy',
        icon: h(IconifyIcon, { icon: 'lucide:copy' }),
        shortcut: 'Ctrl+C',
        handler: () => console.log('复制'),
      },
      {
        text: '粘贴',
        key: 'paste',
        icon: h(IconifyIcon, { icon: 'lucide:clipboard-paste' }),
        shortcut: 'Ctrl+V',
        handler: () => console.log('粘贴'),
      },
      {
        separator: true,
        key: 'separator-1',
        text: '',
      },
      {
        text: '删除',
        key: 'delete',
        icon: h(IconifyIcon, { icon: 'lucide:trash-2' }),
        handler: () => console.log('删除'),
      },
    ]
  }
</script>

<template>
  <VbenContextMenu :menus="contextMenus">
    <Button>右键点击我</Button>
  </VbenContextMenu>
</template>
```

## 传递数据到菜单处理函数

```vue
<script setup lang="ts">
  import { VbenContextMenu } from '@vben-core/shadcn-ui'
  import { Button, message } from 'ant-design-vue'

  const handlerData = {
    rowId: 1,
    rowName: '示例数据',
  }

  const contextMenus = () => {
    return [
      {
        text: '查看详情',
        key: 'view',
        handler: (data: any) => {
          message.success(`查看: ${data.rowName}`)
        },
      },
      {
        text: '编辑',
        key: 'edit',
        handler: (data: any) => {
          message.success(`编辑 ID: ${data.rowId}`)
        },
      },
    ]
  }
</script>

<template>
  <VbenContextMenu :menus="contextMenus" :handler-data="handlerData">
    <Button>右键点击查看数据传递</Button>
  </VbenContextMenu>
</template>
```

## Props 属性

| 属性名       | 描述                                 | 类型                                | 默认值 |
| ------------ | ------------------------------------ | ----------------------------------- | ------ |
| menus        | 菜单项配置（函数形式，返回菜单数组） | `(data: any) => IContextMenuItem[]` | 必填   |
| handlerData  | 传递给菜单处理函数的数据             | `Record<string, any>`               | -      |
| modal        | 是否以模态框形式展示                 | `boolean`                           | -      |
| class        | 自定义类名                           | `ClassType`                         | -      |
| contentClass | 内容区域类名                         | `ClassType`                         | -      |
| contentProps | 内容区域额外 props                   | `ContextMenuContentProps`           | -      |
| itemClass    | 菜单项类名                           | `ClassType`                         | -      |

## 菜单项 IContextMenuItem 配置

| 属性名    | 描述                             | 类型                  | 必填 |
| --------- | -------------------------------- | --------------------- | ---- |
| key       | 唯一标识                         | `string`              | 是   |
| text      | 菜单标题                         | `string`              | 是   |
| handler   | 点击事件处理函数                 | `(data: any) => void` | 否   |
| hidden    | 是否隐藏                         | `boolean`             | 否   |
| disabled  | 是否禁用                         | `boolean`             | 否   |
| icon      | 图标组件                         | `Component`           | 否   |
| inset     | 是否显示图标占位（无图标时缩进） | `boolean`             | 否   |
| shortcut  | 快捷键提示                       | `string`              | 否   |
| separator | 是否为分割线                     | `boolean`             | 否   |

## 插槽

| 插槽名  | 描述                   |
| ------- | ---------------------- |
| default | 触发右键菜单的内容区域 |

## 使用场景

- 表格行右键操作
- 文件列表右键菜单
- 标签页右键管理（刷新、关闭、关闭其他等）
- 画布/编辑器右键操作
- 任意元素右键快捷操作

## 注意事项

1. `menus` 必须是**函数**形式返回数组，支持动态计算菜单项
2. `hidden` 为 `true` 时菜单项不渲染，`disabled` 为 `true` 时菜单项显示但不可点击
3. `separator` 为 `true` 时渲染为分割线，此时 `text` 可为空字符串
4. 图标通过 `icon` 传入 Vue 组件，建议使用 `h()` 函数创建
5. `handlerData` 会传递给每个菜单项的 `handler` 函数
6. 组件基于 `reka-ui` 的 ContextMenu 封装，支持所有原生 ContextMenu 属性
