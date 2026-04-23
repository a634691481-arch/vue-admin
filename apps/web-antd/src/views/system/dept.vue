<script setup>
  import { Page, useVbenModal, useVbenDrawer } from '@vben/common-ui'
  import { Button, message, Modal } from 'ant-design-vue'

  import dayjs from 'dayjs'
  import { useVbenForm } from '#/adapter/form'
  import { useVbenVxeGrid } from '#/adapter/vxe-table'
  import { DEFAULT_MODAL_OPTIONS, DEFAULT_MODAL_FORM_OPTIONS, DEFAULT_GRID_OPTIONS, DEFAULT_GRID_FORM_OPTIONS } from '#/adapter/config'
  import { gridApiColumns, formApiSchema, gridApiSchema } from './data/dept'

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
    // formOptions: {
    //   ...DEFAULT_GRID_FORM_OPTIONS,
    //   schema: gridApiSchema(),
    // },
    gridOptions: {
      ...DEFAULT_GRID_OPTIONS,
      columns: gridApiColumns(onActionClick),
      proxyConfig: {
        ajax: {
          query: fetchTableData,
        },
      },
      treeConfig: {
        transform: false,
        parentField: 'pid',
        rowField: 'id',
        showLine: true,
        expandAll: true,
      },
    },
  })

  // ============= 事件处理 =============

  /**
   * 表格操作按钮的回调函数
   */
  function onActionClick({ code, row }) {
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
  async function fetchTableData(page, formValues) {
    console.log('搜索参数:', { page, formValues })

    const mockData = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      pid: 0,
      deptName: ['技术部', '销售部', '市场部', '人事部', '财务部'][i % 5] + (i > 4 ? `-${Math.floor(i / 5) + 1}` : ''),
      status: Math.random() > 0.3 ? 1 : 0,
      createTime: dayjs()
        .subtract(Math.floor(Math.random() * 365), 'day')
        .format('YYYY/MM/DD HH:mm:ss'),
      remark: `这是第${i + 1}个部门`,
      children:
        Math.random() > 0.5
          ? Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
              id: (i + 1) * 100 + j + 1,
              pid: i + 1,
              deptName: `　子部门${i + 1}-${j + 1}`,
              status: Math.random() > 0.5 ? 1 : 0,
              createTime: dayjs()
                .subtract(Math.floor(Math.random() * 180), 'day')
                .format('YYYY/MM/DD HH:mm:ss'),
              remark: `子部门备注${i + 1}-${j + 1}`,
            }))
          : undefined,
    }))

    return {
      total: 100,
      items: mockData,
    }
  }

  /**
   * 提交表单
   */
  async function handleSubmit() {
    const { valid } = await formApi.validate()
    if (!valid) return

    const data = await formApi.getValues()
    console.log('🚀 ~ handleSubmit ~ data:', data)

    // 通过 id 判断是编辑还是添加
    const isEdit = !!data.id // 有 id 就是编辑

    console.log(isEdit ? '编辑模式' : '添加模式')
    console.log('提交数据:', data)

    formModalApi.lock()
    await new Promise(resolve => setTimeout(resolve, 2000))

    try {
      message.success(isEdit ? '编辑成功' : '添加成功')
      formModalApi.close()
      gridApi.query() // 刷新表格
    } finally {
      formModalApi.lock(false)
    }
  }

  /**
   * 删除行
   */
  function deleteRow(row) {
    const hideLoading = message.loading({
      content: `正在删除中...`,
      duration: 0,
      key: 'action_process_msg',
    })
    setTimeout(() => {
      message.success({
        content: `删除成功`,
        key: 'action_process_msg',
      })
      gridApi.query()
    }, 2000)
  }

  /**
   * 编辑行
   */
  function editRow(row) {
    formApi.setValues(row)
    formModalApi
      .setState({
        title: '编辑部门',
      })
      .open()
  }

  /**
   * 添加行
   */
  function addForm(row) {
    formModalApi
      .setState({
        title: '添加部门',
      })
      .setData(row)
      .open()
  }

  function toggleExpandAll() {
    let isExpand = gridApi.grid?.getTreeExpandRecords()
    message.info(`当前展开状态: ${!!isExpand.length ? '已展开' : '已收起'}`)
    gridApi.grid?.setAllTreeExpand(!isExpand.length)
  }
</script>

<template>
  <Page auto-content-height title="" description="">
    <Grid table-title="" table-title-help="">
      <template #table-title></template>
      <template #toolbar-actions>
        <div class="flex gap-3" @click="addForm">
          <Button type="primary">添加部门</Button>
        </div>
      </template>
      <template #toolbar-tools>
        <div class="flex gap-3">
          <Button type="primary" @click="toggleExpandAll">全部展开/收起</Button>
        </div>
      </template>
    </Grid>

    <!-- 弹框 -->
    <FormModal>
      <Form></Form>
    </FormModal>
  </Page>
</template>
