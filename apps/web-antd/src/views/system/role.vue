<script setup lang="ts">
  import { ref } from 'vue'

  import { Page, Tree, useVbenDrawer } from '@vben/common-ui'
  import { IconifyIcon } from '@vben/icons'
  import { Button, message, Modal, Spin } from 'ant-design-vue'
  import dayjs from 'dayjs'

  import { DEFAULT_MODAL_OPTIONS, DEFAULT_MODAL_FORM_OPTIONS, DEFAULT_GRID_OPTIONS, DEFAULT_GRID_FORM_OPTIONS } from '#/adapter/config'
  import { useVbenForm } from '#/adapter/form'
  import { useVbenVxeGrid } from '#/adapter/vxe-table'

  import { gridApiColumns, formApiSchema, gridApiSchema } from './data/role'

  /**
   * 权限树数据
   */
  const permissionsTreeData = ref<any[]>([
    {
      id: 1,
      meta: { title: '首页', icon: 'mdi:home' },
      children: [
        { id: 11, meta: { title: '分析页', icon: 'mdi:chart-line' } },
        { id: 12, meta: { title: '工作台', icon: 'mdi:briefcase' } },
      ],
    },
    {
      id: 2,
      meta: { title: '系统管理', icon: 'mdi:cog' },
      children: [
        {
          id: 21,
          meta: { title: '用户管理', icon: 'mdi:account' },
          children: [
            { id: 211, meta: { title: '新增' }, type: 'button' },
            { id: 212, meta: { title: '修改' }, type: 'button' },
            { id: 213, meta: { title: '删除' }, type: 'button' },
          ],
        },
        {
          id: 22,
          meta: { title: '角色管理', icon: 'mdi:shield-account' },
          children: [
            { id: 221, meta: { title: '新增' }, type: 'button' },
            { id: 222, meta: { title: '修改' }, type: 'button' },
            { id: 223, meta: { title: '删除' }, type: 'button' },
          ],
        },
        {
          id: 23,
          meta: { title: '菜单管理', icon: 'mdi:menu' },
          children: [
            { id: 231, meta: { title: '新增' }, type: 'button' },
            { id: 232, meta: { title: '修改' }, type: 'button' },
            { id: 233, meta: { title: '删除' }, type: 'button' },
          ],
        },
        {
          id: 24,
          meta: { title: '部门管理', icon: 'charm:organisation' },
          children: [
            { id: 241, meta: { title: '新增' }, type: 'button' },
            { id: 242, meta: { title: '修改' }, type: 'button' },
            { id: 243, meta: { title: '删除' }, type: 'button' },
          ],
        },
        {
          id: 25,
          meta: { title: '字典管理', icon: 'mdi:format-list-bulleted-type' },
          children: [
            { id: 251, meta: { title: '新增' }, type: 'button' },
            { id: 252, meta: { title: '修改' }, type: 'button' },
            { id: 253, meta: { title: '删除' }, type: 'button' },
          ],
        },
        {
          id: 26,
          meta: { title: '日志管理', icon: 'mdi:file-document-outline' },
          children: [
            { id: 261, meta: { title: '删除' }, type: 'button' },
            { id: 262, meta: { title: '清空' }, type: 'button' },
          ],
        },
        {
          id: 27,
          meta: { title: '通知公告', icon: 'mdi:bullhorn-outline' },
          children: [
            { id: 271, meta: { title: '新增' }, type: 'button' },
            { id: 272, meta: { title: '修改' }, type: 'button' },
            { id: 273, meta: { title: '删除' }, type: 'button' },
          ],
        },
      ],
    },
    {
      id: 3,
      meta: { title: '项目', icon: 'mdi:folder-open' },
      children: [
        { id: 31, meta: { title: '文档', icon: 'mdi:book-open' } },
        { id: 32, meta: { title: 'Github', icon: 'mdi:github' } },
        { id: 33, meta: { title: 'Ant Design Vue 版本', icon: 'mdi:vuejs' } },
        { id: 34, meta: { title: '关于', icon: 'mdi:information' } },
      ],
    },
    {
      id: 4,
      meta: { title: '关于', icon: 'mdi:information' },
    },
  ])

  /**
   * 抽屉
   */
  const [FormDrawer, formDrawerApi] = useVbenDrawer({
    ...DEFAULT_MODAL_OPTIONS,
    class: 'w-180',
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
      columns: gridApiColumns(onActionClick, onStatusChange),
      proxyConfig: {
        ajax: {
          query: fetchTableData,
        },
        response: {
          result: 'items',
          total: 'total',
        },
      },
      rowConfig: { keyField: 'id' },
    },
  })

  // ============= 事件处理 =============

  /**
   * 确认弹窗
   */
  function confirm(content: string, title: string) {
    return new Promise((resolve, reject) => {
      Modal.confirm({
        content,
        onCancel() {
          reject(new Error('已取消'))
        },
        onOk() {
          resolve(true)
        },
        title,
      })
    })
  }

  /**
   * 状态开关切换
   */
  async function onStatusChange(newStatus: number, row: any) {
    const statusMap: Record<string, string> = { 0: '禁用', 1: '启用' }
    await confirm(`你要将「${row.name}」的状态切换为【${statusMap[newStatus.toString()]}】吗？`, '切换状态')
    await sleep()
    gridApi.query()
    return true
  }

  /**
   * 表格操作按钮回调
   */
  function onActionClick({ code, row }: { code: string; row: any }) {
    switch (code) {
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
      id: i + 1859999666,
      name: ['管理员', '编辑', '审核员', '访客', '运营', '财务', '人事', '开发'][i % 8] + (i > 7 ? `-${Math.floor(i / 8) + 1}` : ''),
      status: Math.random() > 0.3 ? 1 : 0,
      remark: `这是第${i + 1}个角色`,
      createTime: dayjs()
        .subtract(Math.floor(Math.random() * 365), 'day')
        .format('YYYY/MM/DD HH:mm:ss'),
    }))

    return { total: 100, items: mockData }
  }

  /**
   * 延时工具
   */
  function sleep(time = 500) {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  /**
   * 树节点 class
   */
  function getNodeClass(node: any) {
    return node.type === 'button' ? 'permission-action' : ''
  }

  /**
   * 新增角色
   */
  function showAdd() {
    formApi.resetForm()
    formDrawerApi.setState({ title: '新增角色' }).open()
  }

  /**
   * 编辑角色
   */
  function showEdit(row: any) {
    formApi.setValues(row)
    formDrawerApi.setState({ title: '编辑角色' }).open()
  }

  /**
   * 删除角色
   */
  function handleDelete(row: any) {
    Modal.confirm({
      content: `确定删除角色「${row.name}」吗？`,
      onOk: async () => {
        const hideLoading = message.loading({
          content: `正在删除中...`,
          duration: 0,
          key: 'action_process_msg',
        })
        await sleep(2000)
        message.success({ content: '删除成功', key: 'action_process_msg' })
        gridApi.query()
      },
      title: '提示',
    })
  }

  /**
   * 弹窗提交
   */
  async function handleSubmit() {
    const values = await formApi.validateAndSubmitForm()
    console.log('提交数据:', values)
    message.success('保存成功')
    formDrawerApi.close()
    gridApi.query()
  }
</script>

<template>
  <Page auto-content-height title="" description="">
    <Grid table-title="" table-title-help="">
      <template #toolbar-actions>
        <div class="flex gap-3">
          <Button type="primary" @click="showAdd">新增角色</Button>
        </div>
      </template>
      <template #toolbar-tools>
        <div class="flex gap-3 items-center" />
      </template>
    </Grid>
    <FormDrawer>
      <Form>
        <template #permissions="slotProps">
          <Spin :spinning="false" wrapper-class-name="w-full">
            <Tree
              :tree-data="permissionsTreeData"
              multiple
              bordered
              :default-expanded-level="2"
              :get-node-class="getNodeClass"
              v-bind="slotProps"
              value-field="id"
              label-field="meta.title"
              icon-field="meta.icon"
            >
              <template #node="{ value }">
                <IconifyIcon v-if="value.meta?.icon" :icon="value.meta.icon" />
                {{ value.meta?.title }}
              </template>
            </Tree>
          </Spin>
        </template>
      </Form>
    </FormDrawer>
  </Page>
</template>

<style scoped>
  :deep(ul.ant-tree-child-tree:has(> li.permission-action)) {
    display: flex !important;
    flex-wrap: wrap;
    gap: 4px;
  }
  :deep(li.permission-action) {
    display: inline-flex !important;
    width: auto !important;
    padding: 0 !important;
  }
  :deep(li.permission-action .ant-tree-node-content-wrapper) {
    padding: 0 4px !important;
  }
  :deep(li.permission-action .ant-tree-indent) {
    display: none !important;
  }
</style>
