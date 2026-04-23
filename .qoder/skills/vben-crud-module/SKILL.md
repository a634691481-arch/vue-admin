---
name: vben-crud-module
description: 基于 Vben Admin 5.0 快速生成标准化的 CRUD 模块页面。当用户需要新增系统管理模块（如用户、角色、部门、菜单等）或创建带表格+表单+弹窗的列表页面时自动触发。提供 data.ts 配置分离 + index.vue 基础模板的标准结构。
---

# Vben Admin CRUD 模块标准

## 文件结构

每个 CRUD 模块固定为 **2 个文件**，平铺在同一目录下：

```
system/                      # 或任意业务模块目录
├── data/
│   └── user.ts              # 所有 Schema 配置（表单、表格列、搜索）
└── user.vue                 # 基础模板页面（通用逻辑，尽量不改动）
```

## 创建步骤

### 1. 创建 data.ts

存放所有与 UI 配置相关的数据，**禁止在 index.vue 中写死配置**。

```ts
/**
 * 弹窗表单字段配置
 */
export function formApiSchema() {
  return [
    {
      component: 'Input',
      componentProps: { placeholder: '请输入' },
      defaultValue: '',
      fieldName: 'name',
      label: '名称',
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        class: 'w-full',
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
        optionType: 'button',
      },
      defaultValue: 1,
      fieldName: 'status',
      label: '状态',
      rules: 'required',
    },
    {
      component: 'Textarea',
      componentProps: {
        maxLength: 50,
        rows: 3,
        showCount: true,
      },
      fieldName: 'remark',
      label: '备注',
    },
  ]
}

/**
 * 表格列配置
 * @param onActionClick 操作按钮点击回调
 * @param onStatusChange 状态切换回调（可选）
 */
export function gridApiColumns(onActionClick: any, onStatusChange?: any) {
  return [
    { title: '#', type: 'seq', width: 50, fixed: 'left' },
    { title: '名称', field: 'name', width: 120 },
    { title: '状态', field: 'status', width: 120 },
    { title: '备注', field: 'remark' },
    { title: '创建时间', field: 'createTime', width: 150 },
    {
      align: 'right',
      cellRender: {
        attrs: { onClick: onActionClick },
        name: 'CellOperation',
        options: [{ code: 'edit' }, { code: 'delete', disabled: (row: any) => !!row.children?.length }],
      },
      field: 'operation',
      fixed: 'right',
      showOverflow: false,
      title: '操作',
      width: 120,
    },
  ]
}

/**
 * 搜索表单字段配置
 */
export function gridApiSchema() {
  return [
    { component: 'Input', fieldName: 'name', label: '名称' },
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
  ]
}
```

### 2. 创建 模块名.vue

**基础模板页面，保持简洁通用**。所有配置从 `data/模块名.ts` 引入，默认选项从 `#/adapter/config` 引入。

```vue
<script setup lang="ts">
  import { Page, useVbenModal } from '@vben/common-ui'
  import { Button, message } from 'ant-design-vue'
  import { DEFAULT_MODAL_OPTIONS, DEFAULT_MODAL_FORM_OPTIONS, DEFAULT_GRID_OPTIONS, DEFAULT_GRID_FORM_OPTIONS } from '#/adapter/config'
  import { useVbenForm } from '#/adapter/form'
  import { useVbenVxeGrid } from '#/adapter/vxe-table'

  import { gridApiColumns, formApiSchema, gridApiSchema } from './data/模块名'

  /**
   * 弹窗
   */
  const [FormModal, formModalApi] = useVbenModal({
    ...DEFAULT_MODAL_OPTIONS,
    onConfirm: handleSubmit,
  })

  /**
   * 表单
   */
  const [Form, formApi] = useVbenForm({
    ...DEFAULT_MODAL_FORM_OPTIONS,
    schema: formApiSchema(),
  })

  /**
   * 表格
   */
  const [Grid, gridApi] = useVbenVxeGrid({
    formOptions: {
      ...DEFAULT_GRID_FORM_OPTIONS,
      schema: gridApiSchema(),
    },
    gridOptions: {
      ...DEFAULT_GRID_OPTIONS,
      columns: gridApiColumns(onActionClick),
      proxyConfig: {
        ajax: {
          query: fetchTableData,
        },
      },
    },
  })

  // ============= 事件处理 =============

  /**
   * 表格操作按钮回调
   */
  function onActionClick({ code, row }: { code: string; row: any }) {
    switch (code) {
      case 'append': {
        addForm(row)
        break
      }
      case 'edit': {
        editRow(row)
        break
      }
      case 'delete': {
        deleteRow(row)
        break
      }
    }
  }

  /**
   * 获取表格数据
   */
  async function fetchTableData(page: any, formValues: any) {
    console.log('搜索参数:', { page, formValues })
    // TODO: 替换为真实 API
    const mockData = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `示例${i + 1}`,
      status: 1,
      remark: `备注${i + 1}`,
    }))
    return { total: 100, items: mockData }
  }

  /**
   * 提交表单
   */
  async function handleSubmit() {
    const { valid } = await formApi.validate()
    if (!valid) return

    const data = await formApi.getValues()
    const isEdit = !!data.id

    formModalApi.lock()
    await sleep(2000)

    try {
      message.success(isEdit ? '编辑成功' : '添加成功')
      formModalApi.close()
      gridApi.query()
    } finally {
      formModalApi.lock(false)
    }
  }

  /**
   * 删除行
   */
  function deleteRow(row: any) {
    const hideLoading = message.loading({
      content: '正在删除中...',
      duration: 0,
      key: 'action_process_msg',
    })
    setTimeout(() => {
      message.success({ content: '删除成功', key: 'action_process_msg' })
      gridApi.query()
    }, 2000)
  }

  /**
   * 编辑行
   */
  function editRow(row: any) {
    formApi.setValues(row)
    formModalApi.setState({ title: '编辑' }).open()
  }

  /**
   * 添加行
   */
  function addForm(row?: any) {
    formModalApi
      .setState({ title: '添加' })
      .setData(row || {})
      .open()
  }

  /**
   * 延时工具
   */
  function sleep(time = 500) {
    return new Promise(resolve => setTimeout(resolve, time))
  }
</script>

<template>
  <Page auto-content-height title="" description="">
    <Grid table-title="" table-title-help="">
      <template #toolbar-actions>
        <div class="flex gap-3" @click="addForm">
          <Button type="primary">添加</Button>
        </div>
      </template>
      <template #toolbar-tools>
        <div class="flex gap-3 items-center" />
      </template>
    </Grid>
    <FormModal>
      <Form />
    </FormModal>
  </Page>
</template>
```

## 开发原则

1. **配置分离**：所有 schema、columns 必须写在 `data/模块名.ts`，`模块名.vue` 只保留业务逻辑
2. **默认配置**：弹窗/表单/表格的默认选项统一从 `#/adapter/config` 导入，不在页面中重复定义
3. **类型安全**：`fetchTableData` 和 `onActionClick` 的参数需声明类型，禁止隐式 `any`
4. **简洁优先**：一个模块只保留 `data/模块名.ts` + `模块名.vue` 两个文件，不额外拆分
5. **命名规范**：
   - 弹窗表单配置：`formApiSchema()`
   - 表格列配置：`gridApiColumns(onActionClick, ...)`
   - 搜索表单配置：`gridApiSchema()`
