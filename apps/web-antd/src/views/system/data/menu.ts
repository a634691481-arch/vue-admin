import type { VbenFormSchema } from '#/adapter/form'

/**
 * 菜单类型选项
 */
export function getMenuTypeOptions() {
  return [
    { color: 'processing', label: '目录', value: 'catalog' },
    { color: 'default', label: '菜单', value: 'menu' },
    { color: 'error', label: '按钮', value: 'button' },
    { color: 'success', label: '内嵌', value: 'embedded' },
    { color: 'warning', label: '外链', value: 'link' },
  ]
}

/**
 * 弹窗表单字段配置
 */
export function formApiSchema(): VbenFormSchema[] {
  const typeOptions = getMenuTypeOptions()

  return [
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        optionType: 'button',
        options: typeOptions,
      },
      defaultValue: 'menu',
      fieldName: 'type',
      label: '类型',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '请输入菜单名称' },
      fieldName: 'name',
      label: '菜单名称',
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择父级菜单',
      },
      fieldName: 'pid',
      label: '父级菜单',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '请输入菜单标题' },
      fieldName: 'meta.title',
      label: '菜单标题',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '请输入路径，以 / 开头' },
      dependencies: {
        show: values => ['catalog', 'embedded', 'menu'].includes(values.type),
        triggerFields: ['type'],
      },
      fieldName: 'path',
      label: '路径',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '请输入组件路径' },
      dependencies: {
        show: values => values.type === 'menu',
        triggerFields: ['type'],
      },
      fieldName: 'component',
      label: '组件',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入图标，如 mdi:home',
      },
      dependencies: {
        show: values => ['catalog', 'embedded', 'link', 'menu'].includes(values.type),
        triggerFields: ['type'],
      },
      fieldName: 'meta.icon',
      label: '图标',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '请输入权限标识' },
      dependencies: {
        show: values => ['button', 'catalog', 'embedded', 'menu'].includes(values.type),
        triggerFields: ['type'],
      },
      fieldName: 'authCode',
      label: '权限标识',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
        optionType: 'button',
      },
      defaultValue: 1,
      fieldName: 'status',
      label: '状态',
    },
    {
      component: 'InputNumber',
      componentProps: { placeholder: '请输入排序号' },
      fieldName: 'order',
      label: '排序',
    },
    {
      component: 'Checkbox',
      dependencies: {
        show: values => values.type === 'menu',
        triggerFields: ['type'],
      },
      fieldName: 'meta.keepAlive',
      label: '缓存',
      renderComponentContent() {
        return { default: () => '缓存页面' }
      },
    },
    {
      component: 'Checkbox',
      dependencies: {
        show: values => !['button', 'link'].includes(values.type),
        triggerFields: ['type'],
      },
      fieldName: 'meta.hideInMenu',
      label: '隐藏',
      renderComponentContent() {
        return { default: () => '隐藏菜单' }
      },
    },
  ]
}

/**
 * 表格列配置
 * @param onActionClick 操作按钮点击回调
 */
export function gridApiColumns(onActionClick: any) {
  return [
    {
      align: 'left' as const,
      field: 'meta.title',
      fixed: 'left' as const,
      slots: { default: 'title' },
      title: '菜单标题',
      treeNode: true,
      width: 250,
    },
    {
      align: 'center' as const,
      cellRender: {
        name: 'CellTag' as const,
        attrs: { options: getMenuTypeOptions() },
      },
      field: 'type',
      title: '类型',
      width: 100,
    },
    {
      field: 'name',
      title: '菜单名称',
      width: 150,
    },
    {
      align: 'left' as const,
      field: 'path',
      title: '路径',
      width: 200,
    },
    {
      align: 'left' as const,
      field: 'component',
      title: '组件',
      width: 200,
    },
    {
      field: 'authCode',
      title: '权限标识',
      width: 200,
    },
    {
      cellRender: {
        name: 'CellTag' as const,
      },
      field: 'status',
      title: '状态',
      width: 100,
    },
    {
      align: 'right' as const,
      cellRender: {
        attrs: {
          nameField: 'name',
          onClick: onActionClick,
        },
        name: 'CellOperation' as const,
        options: [
          { code: 'append', text: '新增下级' },
          { code: 'edit', text: '编辑' },
          { code: 'delete', text: '删除' },
        ],
      },
      field: 'operation',
      fixed: 'right' as const,
      headerAlign: 'center' as const,
      showOverflow: false,
      title: '操作',
      width: 220,
    },
  ]
}

/**
 * 搜索表单字段配置
 */
export function gridApiSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      componentProps: { placeholder: '请输入菜单名称' },
      fieldName: 'name',
      label: '菜单名称',
    },
    {
      component: 'Select',
      componentProps: {
        options: getMenuTypeOptions(),
        placeholder: '请选择类型',
      },
      fieldName: 'type',
      label: '类型',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
        placeholder: '请选择状态',
      },
      fieldName: 'status',
      label: '状态',
    },
  ]
}
