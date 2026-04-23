<script setup lang="ts">
  import { Page, useVbenModal } from '@vben/common-ui'
  import { Button, message } from 'ant-design-vue'
  import dayjs from 'dayjs'
  import { DEFAULT_MODAL_OPTIONS, DEFAULT_MODAL_FORM_OPTIONS, DEFAULT_GRID_OPTIONS, DEFAULT_GRID_FORM_OPTIONS } from '#/adapter/config'
  import { useVbenForm } from '#/adapter/form'
  import { useVbenVxeGrid } from '#/adapter/vxe-table'

  import { gridApiColumns, formApiSchema, gridApiSchema } from './data/user'

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
    await sleep()

    const roleMap: Record<string, string> = {
      admin: '管理员',
      editor: '编辑',
      auditor: '审核员',
      visitor: '访客',
    }

    const roleKeys = ['admin', 'editor', 'auditor', 'visitor'] as const

    const mockData = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      username: ['admin', 'zhangsan', 'lisi', 'wangwu', 'zhaoliu', 'chenqi', 'zhouba', 'wujiu'][i % 8] + (i > 7 ? `${i}` : ''),
      nickname: ['管理员', '张三', '李四', '王五', '赵六', '陈七', '周八', '吴九'][i % 8],
      phone: `1${[3, 4, 5, 6, 7, 8, 9][i % 7]}${String(Math.floor(Math.random() * 1000000000)).padStart(9, '0')}`,
      email: `user${i + 1}@example.com`,
      role: roleMap[roleKeys[i % 4] as string],
      status: Math.random() > 0.3 ? 1 : 0,
      remark: `这是第${i + 1}个用户`,
      createTime: dayjs()
        .subtract(Math.floor(Math.random() * 365), 'day')
        .format('YYYY/MM/DD HH:mm:ss'),
    }))

    return {
      total: 100,
      items: mockData,
    }
  }

  /**
   * 延时工具
   */
  function sleep(time = 500) {
    return new Promise(resolve => setTimeout(resolve, time))
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
    formModalApi.setState({ title: '编辑用户' }).open()
  }

  /**
   * 添加行
   */
  function addForm() {
    formModalApi.setState({ title: '添加用户' }).setData({}).open()
  }
</script>

<template>
  <Page auto-content-height title="" description="">
    <Grid table-title="" table-title-help="">
      <template #toolbar-actions>
        <div class="flex gap-3" @click="addForm">
          <Button type="primary">添加用户</Button>
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
