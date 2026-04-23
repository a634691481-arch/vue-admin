<script setup lang="ts">
  import { ref } from 'vue'

  import { Page, useVbenDrawer } from '@vben/common-ui'
  import { IconifyIcon } from '@vben/icons'
  import { Button, message, Modal } from 'ant-design-vue'

  import { DEFAULT_MODAL_OPTIONS, DEFAULT_MODAL_FORM_OPTIONS, DEFAULT_GRID_OPTIONS, DEFAULT_GRID_FORM_OPTIONS } from '#/adapter/config'
  import { useVbenForm } from '#/adapter/form'
  import { useVbenVxeGrid } from '#/adapter/vxe-table'

  import { gridApiColumns, formApiSchema, gridApiSchema } from './data/menu'

  /**
   * 当前菜单数据（用于树形选项）
   */
  const menuList = ref<any[]>([])

  /**
   * 抽屉
   */
  const [FormDrawer, formDrawerApi] = useVbenDrawer({
    ...DEFAULT_MODAL_OPTIONS,
    class: 'w-100',
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
      pagerConfig: { enabled: false },
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
   * 表格操作按钮回调
   */
  function onActionClick({ code, row }: { code: string; row: any }) {
    switch (code) {
      case 'append': {
        showAppend(row)
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
  async function fetchTableData(_page: any, _formValues: any) {
    await sleep()

    const mockData = [
      {
        id: 1,
        name: 'Dashboard',
        meta: { title: '首页', icon: 'mdi:home' },
        type: 'catalog',
        path: '/dashboard',
        component: '',
        authCode: '',
        status: 1,
        pid: 0,
        order: 1,
        children: [
          {
            id: 11,
            name: 'Analytics',
            meta: { title: '分析页', icon: 'mdi:chart-line' },
            type: 'menu',
            path: '/dashboard/analytics',
            component: '/views/dashboard/analytics/index.vue',
            authCode: '',
            status: 1,
            pid: 1,
            order: 1,
          },
          {
            id: 12,
            name: 'Workspace',
            meta: { title: '工作台', icon: 'mdi:briefcase' },
            type: 'menu',
            path: '/dashboard/workspace',
            component: '/views/dashboard/workspace/index.vue',
            authCode: '',
            status: 1,
            pid: 1,
            order: 2,
          },
        ],
      },
      {
        id: 2,
        name: 'System',
        meta: { title: '系统管理', icon: 'mdi:cog' },
        type: 'catalog',
        path: '/system',
        component: '',
        authCode: '',
        status: 1,
        pid: 0,
        order: 2,
        children: [
          {
            id: 21,
            name: 'User',
            meta: { title: '用户管理', icon: 'mdi:account' },
            type: 'menu',
            path: '/system/user',
            component: '/views/system/user/index.vue',
            authCode: 'system:user:list',
            status: 1,
            pid: 2,
            order: 1,
          },
          {
            id: 22,
            name: 'Role',
            meta: { title: '角色管理', icon: 'mdi:shield-account' },
            type: 'menu',
            path: '/system/role',
            component: '/views/system/role/index.vue',
            authCode: 'system:role:list',
            status: 1,
            pid: 2,
            order: 2,
          },
          {
            id: 23,
            name: 'Menu',
            meta: { title: '菜单管理', icon: 'mdi:menu' },
            type: 'menu',
            path: '/system/menu',
            component: '/views/system/menu/index.vue',
            authCode: 'system:menu:list',
            status: 1,
            pid: 2,
            order: 3,
          },
          {
            id: 24,
            name: 'Dept',
            meta: { title: '部门管理', icon: 'charm:organisation' },
            type: 'menu',
            path: '/system/dept',
            component: '/views/system/dept/index.vue',
            authCode: 'system:dept:list',
            status: 1,
            pid: 2,
            order: 4,
          },
        ],
      },
      {
        id: 3,
        name: 'Profile',
        meta: { title: '个人中心', icon: 'mdi:account-circle' },
        type: 'menu',
        path: '/profile',
        component: '/views/profile/index.vue',
        authCode: '',
        status: 1,
        pid: 0,
        order: 3,
      },
    ]

    menuList.value = flatMenuList(mockData)
    return { items: mockData, total: mockData.length }
  }

  /**
   * 延时工具
   */
  function sleep(time = 500) {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  /**
   * 扁平化菜单列表（用于父级选择）
   */
  function flatMenuList(list: any[], result: any[] = []) {
    for (const item of list) {
      result.push({ label: item.meta?.title || item.name, value: item.id })
      if (item.children?.length) {
        flatMenuList(item.children, result)
      }
    }
    return result
  }

  /**
   * 更新父级菜单选项
   */
  function updatePidOptions() {
    ;(formApi as any).updateSchema([
      {
        component: 'Select',
        componentProps: {
          allowClear: true,
          options: [{ label: '顶级菜单', value: 0 }, ...menuList.value],
          placeholder: '请选择父级菜单',
        },
        fieldName: 'pid',
        label: '父级菜单',
      },
    ])
  }

  /**
   * 新增顶级菜单
   */
  function showAdd() {
    formApi.resetForm()
    updatePidOptions()
    formDrawerApi.setState({ title: '新增菜单' }).open()
  }

  /**
   * 新增下级菜单
   */
  function showAppend(row: any) {
    formApi.resetForm()
    updatePidOptions()
    formApi.setValues({ pid: row.id, type: 'menu' })
    formDrawerApi.setState({ title: '新增下级菜单' }).open()
  }

  /**
   * 编辑菜单
   */
  function showEdit(row: any) {
    formApi.setValues(row)
    updatePidOptions()
    formDrawerApi.setState({ title: '编辑菜单' }).open()
  }

  /**
   * 删除菜单
   */
  function handleDelete(row: any) {
    Modal.confirm({
      content: `确定删除菜单「${row.meta?.title || row.name}」吗？`,
      onOk: () => {
        message.success('删除成功')
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
          <Button type="primary" @click="showAdd">新增菜单</Button>
        </div>
      </template>
      <template #toolbar-tools>
        <div class="flex gap-3 items-center" />
      </template>
      <template #title="{ row }">
        <div class="flex w-full items-center gap-1">
          <div class="size-5 shrink-0">
            <IconifyIcon v-if="row.type === 'button'" class="size-full" icon="carbon:security" />
            <IconifyIcon v-else-if="row.meta?.icon" :icon="row.meta.icon" class="size-full" />
          </div>
          <span class="flex-auto">{{ row.meta?.title }}</span>
        </div>
      </template>
    </Grid>
    <FormDrawer class="w-200">
      <Form />
    </FormDrawer>
  </Page>
</template>
