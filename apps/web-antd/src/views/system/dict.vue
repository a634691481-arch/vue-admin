<script setup lang="ts">
  import { Page, useVbenModal } from '@vben/common-ui'
  import { Button, message } from 'ant-design-vue'
  import dayjs from 'dayjs'
  import { DEFAULT_MODAL_OPTIONS, DEFAULT_MODAL_FORM_OPTIONS, DEFAULT_GRID_OPTIONS, DEFAULT_GRID_FORM_OPTIONS } from '#/adapter/config'
  import { useVbenForm } from '#/adapter/form'
  import { useVbenVxeGrid } from '#/adapter/vxe-table'

  import { gridApiColumns, formApiSchema, gridApiSchema } from './data/dict'

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

    const typeMap: Record<string, string> = {
      system: '系统字典',
      business: '业务字典',
    }

    const dictNames = ['性别', '用户状态', '订单状态', '支付方式', '通知类型', '优先级', '审批状态', '任务类型', '日志类型', '文件类型']
    const dictCodes = [
      'gender',
      'user_status',
      'order_status',
      'pay_type',
      'notice_type',
      'priority',
      'approval_status',
      'task_type',
      'log_type',
      'file_type',
    ]

    const mockData = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      dictName: dictNames[i % 10],
      dictCode: dictCodes[i % 10] + (i > 9 ? `_${i}` : ''),
      dictType: typeMap[['system', 'business'][i % 2] as string],
      status: Math.random() > 0.3 ? 1 : 0,
      remark: `这是第${i + 1}个字典`,
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
    formModalApi.setState({ title: '编辑字典' }).open()
  }

  /**
   * 添加行
   */
  function addForm() {
    formModalApi.setState({ title: '添加字典' }).setData({}).open()
  }
</script>

<template>
  <Page auto-content-height title="" description="">
    <Grid table-title="" table-title-help="">
      <template #toolbar-actions>
        <div class="flex gap-3" @click="addForm">
          <Button type="primary">添加字典</Button>
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
