<script setup lang="ts">
  import { Page, useVbenModal } from '@vben/common-ui'
  import { Button, message } from 'ant-design-vue'
  import dayjs from 'dayjs'
  import { DEFAULT_MODAL_OPTIONS, DEFAULT_MODAL_FORM_OPTIONS, DEFAULT_GRID_OPTIONS, DEFAULT_GRID_FORM_OPTIONS } from '#/adapter/config'
  import { useVbenForm } from '#/adapter/form'
  import { useVbenVxeGrid } from '#/adapter/vxe-table'

  import { gridApiColumns, formApiSchema, gridApiSchema } from './data/log'

  /**
   * 弹窗（日志详情查看）
   */
  const [FormModal, formModalApi] = useVbenModal({
    ...DEFAULT_MODAL_OPTIONS,
    showCancelButton: false,
    confirmText: '关闭',
    onConfirm: () => formModalApi.close(),
  })

  /**
   * 表单（仅展示）
   */
  const [Form, formApi] = useVbenForm({
    ...DEFAULT_MODAL_FORM_OPTIONS,
    showDefaultActions: false,
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
      case 'detail': {
        showDetail(row)
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

    const actionTypes = ['新增', '编辑', '删除', '查询', '登录', '导出']
    const modules = ['用户管理', '角色管理', '部门管理', '菜单管理', '字典管理', '日志管理']
    const descriptions = ['新增用户信息', '编辑角色权限', '删除部门数据', '查询用户列表', '用户登录系统', '导出数据报表', '修改字典配置', '分配用户角色']

    const mockData = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      username: ['admin', 'zhangsan', 'lisi', 'wangwu'][i % 4],
      module: modules[i % 6],
      actionType: actionTypes[i % 6],
      ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
      duration: Math.floor(Math.random() * 500) + 50,
      status: Math.random() > 0.1 ? 1 : 0,
      description: descriptions[i % 8],
      createTime: dayjs()
        .subtract(Math.floor(Math.random() * 30), 'day')
        .subtract(Math.floor(Math.random() * 24), 'hour')
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
   * 查看日志详情
   */
  function showDetail(row: any) {
    formApi.setValues(row)
    formModalApi.setState({ title: '日志详情' }).open()
  }

  /**
   * 清空日志
   */
  function clearLogs() {
    const hideLoading = message.loading({
      content: '正在清空日志...',
      duration: 0,
      key: 'clear_logs_msg',
    })
    setTimeout(() => {
      message.success({ content: '日志清空成功', key: 'clear_logs_msg' })
      gridApi.reload()
    }, 2000)
  }
</script>

<template>
  <Page auto-content-height title="" description="">
    <Grid table-title="" table-title-help="">
      <template #toolbar-actions>
        <div class="flex gap-3">
          <Button type="primary" danger @click="clearLogs">清空日志</Button>
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
