/**
 * 弹窗表单字段配置（日志详情查看）
 */
export function formApiSchema() {
  return [
    {
      component: 'Input',
      componentProps: { placeholder: '', disabled: true },
      fieldName: 'username',
      label: '操作人',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '', disabled: true },
      fieldName: 'module',
      label: '操作模块',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '', disabled: true },
      fieldName: 'actionType',
      label: '操作类型',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '', disabled: true },
      fieldName: 'ip',
      label: 'IP 地址',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '', disabled: true },
      fieldName: 'duration',
      label: '耗时(ms)',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '', disabled: true },
      fieldName: 'status',
      label: '操作状态',
    },
    {
      component: 'Textarea',
      componentProps: {
        rows: 4,
        disabled: true,
      },
      fieldName: 'description',
      label: '操作描述',
    },
  ]
}

/**
 * 表格列配置
 * @param onActionClick 操作按钮点击回调
 */
export function gridApiColumns(onActionClick: any) {
  return [
    { title: '#', type: 'seq' as const, width: 50, fixed: 'left' as const },
    { title: '操作人', field: 'username', width: 120 },
    { title: '操作模块', field: 'module', width: 120 },
    { title: '操作类型', field: 'actionType', width: 100 },
    { title: 'IP 地址', field: 'ip', width: 130 },
    { title: '耗时', field: 'duration', width: 90 },
    {
      title: '状态',
      field: 'status',
      width: 90,
      cellRender: {
        name: 'CellTag' as const,
        attrs: {
          options: [
            { label: '成功', value: 1, color: 'success' },
            { label: '失败', value: 0, color: 'error' },
          ],
        },
      },
    },
    { title: '操作描述', field: 'description', showOverflow: true, minWidth: 200 },
    { title: '操作时间', field: 'createTime', width: 160 },
    {
      align: 'right' as const,
      cellRender: {
        attrs: { onClick: onActionClick },
        name: 'CellOperation' as const,
        options: [
          { code: 'detail', text: '详情' },
        ],
      },
      field: 'operation',
      fixed: 'right' as const,
      showOverflow: false,
      title: '操作',
      width: 100,
    },
  ]
}

/**
 * 搜索表单字段配置
 */
export function gridApiSchema() {
  return [
    {
      component: 'Input',
      fieldName: 'username',
      label: '操作人',
      componentProps: { placeholder: '请输入操作人' },
    },
    {
      component: 'Input',
      fieldName: 'module',
      label: '操作模块',
      componentProps: { placeholder: '请输入操作模块' },
    },
    {
      component: 'Select',
      fieldName: 'actionType',
      label: '操作类型',
      componentProps: {
        placeholder: '请选择操作类型',
        options: [
          { label: '新增', value: '新增' },
          { label: '编辑', value: '编辑' },
          { label: '删除', value: '删除' },
          { label: '查询', value: '查询' },
          { label: '登录', value: '登录' },
          { label: '导出', value: '导出' },
        ],
      },
    },
    {
      component: 'Select',
      fieldName: 'status',
      label: '操作状态',
      componentProps: {
        placeholder: '请选择状态',
        options: [
          { label: '成功', value: 1 },
          { label: '失败', value: 0 },
        ],
      },
    },
  ]
}
