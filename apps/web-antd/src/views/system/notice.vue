<script setup lang="ts">
  import { Page, useVbenModal } from '@vben/common-ui'
  import { Button, message } from 'ant-design-vue'
  import dayjs from 'dayjs'
  import { DEFAULT_MODAL_OPTIONS, DEFAULT_MODAL_FORM_OPTIONS, DEFAULT_GRID_OPTIONS, DEFAULT_GRID_FORM_OPTIONS } from '#/adapter/config'
  import { useVbenForm } from '#/adapter/form'
  import { useVbenVxeGrid } from '#/adapter/vxe-table'

  import { gridApiColumns, formApiSchema, gridApiSchema, detailFormApiSchema } from './data/notice'

  /**
   * 详情弹窗
   */
  const [DetailModal, detailModalApi] = useVbenModal({
    ...DEFAULT_MODAL_OPTIONS,
    showCancelButton: false,
    confirmText: '关闭',
    onConfirm: () => detailModalApi.close(),
  })

  /**
   * 详情表单（只读）
   */
  const [DetailForm, detailFormApi] = useVbenForm({
    ...DEFAULT_MODAL_FORM_OPTIONS,
    showDefaultActions: false,
    schema: detailFormApiSchema(),
  })

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
    handleSubmit: () => {
      /* 拦截默认提交 */
    },
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
      case 'add': {
        showAdd()
        break
      }
      case 'detail': {
        showDetail(row)
        break
      }
      case 'edit': {
        showEdit(row)
        break
      }
      case 'delete': {
        handleDelete(row)
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

    const mockData = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: ['系统维护通知', '清明节放假安排', '新版功能上线公告', '服务器升级公告', '安全漏洞修复通知', '系统性能优化通知'][i % 6],
      type: i % 3 === 0 ? 'announcement' : 'notice',
      status: i % 4 === 0 ? 0 : 1,
      content: '这是一段通知公告的内容描述，用于演示假数据效果。',
      publisher: ['admin', 'zhangsan', 'lisi'][i % 3],
      publishTime: dayjs()
        .subtract(Math.floor(Math.random() * 30), 'day')
        .format('YYYY/MM/DD HH:mm:ss'),
      createTime: dayjs()
        .subtract(Math.floor(Math.random() * 60), 'day')
        .format('YYYY/MM/DD HH:mm:ss'),
      remark: ['', '重要', '紧急', ''][i % 4],
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
   * 查看详情
   */
  function showDetail(row: any) {
    detailFormApi.setValues(row)
    detailModalApi.setState({ title: '通知公告详情' }).open()
  }

  /**
   * 新增
   */
  function showAdd() {
    formApi.resetForm()
    formModalApi.setState({ title: '新增通知公告' }).open()
  }

  /**
   * 编辑
   */
  function showEdit(row: any) {
    formApi.setValues(row)
    formModalApi.setState({ title: '编辑通知公告' }).open()
  }

  /**
   * 删除
   */
  function handleDelete(row: any) {
    message.success(`删除成功：${row.title}`)
    gridApi.reload()
  }

  /**
   * 弹窗提交
   */
  async function handleSubmit() {
    const values = await formApi.validateAndSubmitForm()
    console.log('提交数据:', values)
    message.success('保存成功')
    formModalApi.close()
    gridApi.reload()
  }
</script>

<template>
  <Page auto-content-height title="" description="">
    <Grid table-title="" table-title-help="">
      <template #toolbar-actions>
        <div class="flex gap-3">
          <Button type="primary" @click="showAdd">新增</Button>
        </div>
      </template>
      <template #toolbar-tools>
        <div class="flex gap-3 items-center" />
      </template>
    </Grid>
    <FormModal>
      <Form />
    </FormModal>
    <DetailModal>
      <DetailForm />
    </DetailModal>
  </Page>
</template>
