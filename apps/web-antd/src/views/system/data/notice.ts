/**
 * 弹窗表单字段配置
 */
export function formApiSchema() {
  return [
    {
      component: 'Input',
      componentProps: { placeholder: '请输入标题' },
      fieldName: 'title',
      label: '标题',
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { label: '通知', value: 'notice' },
          { label: '公告', value: 'announcement' },
        ],
        placeholder: '请选择类型',
      },
      fieldName: 'type',
      label: '类型',
      rules: 'required',
    },
    {
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入内容',
        rows: 5,
      },
      fieldName: 'content',
      label: '内容',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '请输入发布人' },
      fieldName: 'publisher',
      label: '发布人',
    },
    {
      component: 'Textarea',
      componentProps: { placeholder: '请输入备注', rows: 3 },
      fieldName: 'remark',
      label: '备注',
    },
  ]
}

/**
 * 详情表单字段配置（只读）
 */
export function detailFormApiSchema() {
  return [
    {
      component: 'Input',
      componentProps: { placeholder: '', disabled: true },
      fieldName: 'title',
      label: '标题',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '', disabled: true },
      fieldName: 'type',
      label: '类型',
    },
    {
      component: 'Textarea',
      componentProps: { disabled: true, rows: 5 },
      fieldName: 'content',
      label: '内容',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '', disabled: true },
      fieldName: 'publisher',
      label: '发布人',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '', disabled: true },
      fieldName: 'publishTime',
      label: '发布时间',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '', disabled: true },
      fieldName: 'createTime',
      label: '创建时间',
    },
    {
      component: 'Textarea',
      componentProps: { disabled: true, rows: 3 },
      fieldName: 'remark',
      label: '备注',
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
    { title: '标题', field: 'title', showOverflow: true, minWidth: 200 },
    {
      title: '类型',
      field: 'type',
      width: 100,
      cellRender: {
        name: 'CellTag' as const,
        attrs: {
          options: [
            { label: '通知', value: 'notice', color: 'processing' },
            { label: '公告', value: 'announcement', color: 'warning' },
          ],
        },
      },
    },
    {
      title: '状态',
      field: 'status',
      width: 100,
      cellRender: {
        name: 'CellTag' as const,
        attrs: {
          options: [
            { label: '已发布', value: 1, color: 'success' },
            { label: '草稿', value: 0, color: 'default' },
          ],
        },
      },
    },
    { title: '发布人', field: 'publisher', width: 120 },
    { title: '发布时间', field: 'publishTime', width: 160 },
    { title: '创建时间', field: 'createTime', width: 160 },
    { title: '备注', field: 'remark', showOverflow: true, minWidth: 150 },
    {
      align: 'right' as const,
      cellRender: {
        attrs: { onClick: onActionClick },
        name: 'CellOperation' as const,
        options: [
          { code: 'detail', text: '详情' },
          { code: 'edit', text: '编辑' },
          { code: 'delete', text: '删除' },
        ],
      },
      field: 'operation',
      fixed: 'right' as const,
      showOverflow: false,
      title: '操作',
      width: 150,
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
      fieldName: 'title',
      label: '标题',
      componentProps: { placeholder: '请输入标题' },
    },
    {
      component: 'Select',
      fieldName: 'type',
      label: '类型',
      componentProps: {
        options: [
          { label: '通知', value: 'notice' },
          { label: '公告', value: 'announcement' },
        ],
        placeholder: '请选择类型',
      },
    },
    {
      component: 'Select',
      fieldName: 'status',
      label: '状态',
      componentProps: {
        options: [
          { label: '已发布', value: 1 },
          { label: '草稿', value: 0 },
        ],
        placeholder: '请选择状态',
      },
    },
  ]
}
