# Vben Vxe Table 表格

基于 [vxe-table](https://vxetable.cn/v4/#/grid/api?apiKey=grid) 和 `Vben Form` 做了二次封装，用于构建带搜索表单的列表页面。

## 基础表格

```vue
<script setup lang="ts">
  import type { VxeGridListeners, VxeGridProps } from '#/adapter/vxe-table'
  import { useVbenVxeGrid } from '#/adapter/vxe-table'

  interface RowType {
    id: number
    name: string
    age: number
  }

  const gridOptions: VxeGridProps<RowType> = {
    columns: [
      { title: '序号', type: 'seq', width: 50 },
      { field: 'name', title: '名称' },
      { field: 'age', title: '年龄', sortable: true },
    ],
    data: [
      { id: 1, name: '张三', age: 18 },
      { id: 2, name: '李四', age: 20 },
    ],
    pagerConfig: {
      enabled: false,
    },
    sortConfig: {
      multiple: true,
    },
  }

  const gridEvents: VxeGridListeners<RowType> = {
    cellClick: ({ row }) => {
      message.info(`点击了: ${row.name}`)
    },
  }

  const [Grid, gridApi] = useVbenVxeGrid({ gridEvents, gridOptions })

  // 响应式状态
  const showBorder = gridApi.useStore(state => state.gridOptions?.border)

  function changeBorder() {
    gridApi.setGridOptions({
      border: !showBorder.value,
    })
  }
</script>

<template>
  <Grid>
    <template #toolbar-tools>
      <Button type="primary" @click="changeBorder">{{ showBorder ? '隐藏' : '显示' }}边框</Button>
    </template>
  </Grid>
</template>
```

## 远程加载

```vue
<script setup lang="ts">
  import { useVbenVxeGrid } from '#/adapter/vxe-table'
  import { getUserListApi } from '#/api'

  const [Grid, gridApi] = useVbenVxeGrid({
    gridOptions: {
      columns: [
        { type: 'seq', width: 50 },
        { field: 'name', title: '名称' },
        { field: 'age', title: '年龄' },
      ],
      proxyConfig: {
        ajax: {
          query: async ({ page }) => {
            const res = await getUserListApi({
              page: page.currentPage,
              pageSize: page.pageSize,
            })
            return {
              items: res.data.list,
              total: res.data.total,
            }
          },
        },
      },
    },
  })
</script>
```

## 搜索表单

```vue
<script setup lang="ts">
  import { useVbenVxeGrid } from '#/adapter/vxe-table';

  const [Grid, gridApi] = useVbenVxeGrid({
    formOptions: {
      schema: [
        {
          component: 'Input',
          fieldName: 'name',
          label: '名称',
        },
        {
          component: 'Select',
          fieldName: 'status',
          label: '状态',
          componentProps: {
            options: [
              { label: '启用', value: 1 },
              { label: '禁用', value: 0 },
            ],
          },
        },
      ],
    },
    gridOptions: {
      toolbarConfig: {
        search: true, // 显示搜索面板开关按钮
      },
      proxyConfig: {
        ajax: {
          query: async ({ page }, formValues) => {
            const res = await getUserListApi({
              ...formValues,
              page: page.currentPage,
              pageSize: page.pageSize,
            });
            return res;
          },
        },
      },
      columns: [...],
    },
  });
</script>
```

## 树形表格

```vue
<script setup lang="ts">
  import { useVbenVxeGrid } from '#/adapter/vxe-table';

  const [Grid, gridApi] = useVbenVxeGrid({
    gridOptions: {
      columns: [
        { type: 'seq', width: 70 },
        { field: 'name', title: '名称', treeNode: true, minWidth: 300 },
        { field: 'size', title: '大小' },
        { field: 'type', title: '类型' },
      ],
      data: [...],
      pagerConfig: {
        enabled: false,
      },
      treeConfig: {
        transform: true,
        parentField: 'parentId',
        rowField: 'id',
      },
    },
  });

  const expandAll = () => {
    gridApi.grid?.setAllTreeExpand(true);
  };

  const collapseAll = () => {
    gridApi.grid?.setAllTreeExpand(false);
  };
</script>

<template>
  <Grid>
    <template #toolbar-tools>
      <Button type="primary" @click="expandAll">展开全部</Button>
      <Button type="primary" @click="collapseAll">折叠全部</Button>
    </template>
  </Grid>
</template>
```

## 固定列

```ts
const columns = [
  { field: 'name', title: '名称', fixed: 'left', width: 100 },
  { field: 'age', title: '年龄' },
  { field: 'address', title: '地址' },
  { field: 'action', title: '操作', fixed: 'right', width: 100 },
]
```

## 单元格编辑

```ts
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    editConfig: {
      mode: 'cell', // 或 'row'
      trigger: 'click',
    },
    columns: [
      {
        field: 'name',
        title: '名称',
        editRender: { name: 'input' },
      },
    ],
  },
})
```

## 自定义渲染器

```ts
// 适配器配置
import { h } from 'vue'
import { Image, Button } from 'ant-design-vue'

vxeUI.renderer.add('CellImage', {
  renderTableDefault(_renderOpts, params) {
    const { column, row } = params
    return h(Image, { src: row[column.field] })
  },
})

vxeUI.renderer.add('CellLink', {
  renderTableDefault(renderOpts) {
    const { props } = renderOpts
    return h(
      Button,
      { size: 'small', type: 'link' },
      {
        default: () => props?.text,
      },
    )
  },
})

// 使用
const columns = [
  {
    field: 'avatar',
    title: '头像',
    cellRender: { name: 'CellImage' },
  },
  {
    field: 'link',
    title: '链接',
    cellRender: { name: 'CellLink', props: { text: '查看' } },
  },
]
```

## GridApi 方法

| 方法名           | 描述               | 类型                               |
| ---------------- | ------------------ | ---------------------------------- |
| setLoading       | 设置 loading 状态  | `(loading: boolean) => void`       |
| setGridOptions   | 更新 gridOptions   | `(options) => void`                |
| reload           | 重新加载，重置分页 | `(params?) => void`                |
| query            | 重新查询，保留分页 | `(params?) => void`                |
| grid             | vxe-grid 实例      | `VxeGridInstance`                  |
| formApi          | 搜索表单 API       | `FormApi`                          |
| toggleSearchForm | 切换搜索表单状态   | `(show?: boolean) => boolean`      |
| useStore         | 获取响应式状态     | `<T>(selector: (state) => T) => T` |

## Props 属性

| 属性名         | 描述                   | 类型                          |
| -------------- | ---------------------- | ----------------------------- |
| tableTitle     | 表格标题               | `string`                      |
| tableTitleHelp | 表格标题帮助信息       | `string`                      |
| class          | 外层容器的class        | `string`                      |
| gridClass      | vxe-grid的class        | `string`                      |
| gridOptions    | vxe-grid配置           | `VxeTableGridOptions`         |
| gridEvents     | vxe-grid事件           | `VxeGridListeners`            |
| formOptions    | 搜索表单配置           | `VbenFormProps`               |
| showSearchForm | 是否显示搜索表单       | `boolean`                     |
| separator      | 搜索表单与表格的分隔条 | `boolean \| SeparatorOptions` |

## 插槽

| 插槽名          | 描述             |
| --------------- | ---------------- |
| toolbar-actions | 工具栏左侧区域   |
| toolbar-tools   | 工具栏右侧区域   |
| table-title     | 自定义表格标题   |
| form-\*         | 搜索表单插槽转发 |

## 适配器配置

```ts
// src/adapter/vxe-table.ts
import { h } from 'vue'
import { setupVbenVxeTable, useVbenVxeGrid } from '@vben/plugins/vxe-table'
import { Button, Image } from 'ant-design-vue'
import { useVbenForm } from './form'

setupVbenVxeTable({
  configVxeTable: vxeUI => {
    vxeUI.setConfig({
      grid: {
        align: 'center',
        border: false,
        columnConfig: {
          resizable: true,
        },
        minHeight: 180,
        formConfig: {
          enabled: false,
        },
        proxyConfig: {
          autoLoad: true,
          response: {
            result: 'items',
            total: 'total',
            list: 'items',
          },
          showActiveMsg: true,
          showResponseMsg: false,
        },
        round: true,
        showOverflow: true,
        size: 'small',
      },
    })

    // 注册自定义渲染器
    vxeUI.renderer.add('CellImage', {
      renderTableDefault(_renderOpts, params) {
        const { column, row } = params
        return h(Image, { src: row[column.field] })
      },
    })

    vxeUI.renderer.add('CellLink', {
      renderTableDefault(renderOpts) {
        const { props } = renderOpts
        return h(
          Button,
          { size: 'small', type: 'link' },
          {
            default: () => props?.text,
          },
        )
      },
    })
  },
  useVbenForm,
})

export { useVbenVxeGrid }
export type * from '@vben/plugins/vxe-table'
```
