/**
 * 弹窗表单字段配置
 */
export function formApiSchema() {
  return [
    {
      component: 'Input',
      componentProps: { placeholder: '请输入字典名称' },
      defaultValue: '',
      fieldName: 'dictName',
      label: '字典名称',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '请输入字典编码' },
      defaultValue: '',
      fieldName: 'dictCode',
      label: '字典编码',
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        placeholder: '请选择字典类型',
        options: [
          { label: '系统字典', value: 'system' },
          { label: '业务字典', value: 'business' },
        ],
      },
      defaultValue: 'system',
      fieldName: 'dictType',
      label: '字典类型',
      rules: 'selectRequired',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        class: 'w-full',
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
        optionType: 'button',
      },
      defaultValue: 1,
      fieldName: 'status',
      label: '状态',
      rules: 'required',
    },
    {
      component: 'Textarea',
      componentProps: {
        maxLength: 50,
        rows: 3,
        showCount: true,
      },
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
    { title: '字典名称', field: 'dictName', width: 150 },
    { title: '字典编码', field: 'dictCode', width: 150 },
    { title: '字典类型', field: 'dictType', width: 120 },
    {
      title: '状态',
      field: 'status',
      width: 100,
      cellRender: {
        name: 'CellTag' as const,
        attrs: {
          options: [
            { label: '正常', value: 1, color: 'success' },
            { label: '禁用', value: 0, color: 'error' },
          ],
        },
      },
    },
    { title: '备注', field: 'remark', showOverflow: true },
    { title: '创建时间', field: 'createTime', width: 150 },
    {
      align: 'right' as const,
      cellRender: {
        attrs: { onClick: onActionClick },
        name: 'CellOperation' as const,
        options: [
          { code: 'edit' },
          { code: 'delete' },
        ],
      },
      field: 'operation',
      fixed: 'right' as const,
      showOverflow: false,
      title: '操作',
      width: 120,
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
      fieldName: 'dictName',
      label: '字典名称',
      componentProps: { placeholder: '请输入字典名称' },
    },
    {
      component: 'Input',
      fieldName: 'dictCode',
      label: '字典编码',
      componentProps: { placeholder: '请输入字典编码' },
    },
    {
      component: 'Select',
      fieldName: 'dictType',
      label: '字典类型',
      componentProps: {
        placeholder: '请选择字典类型',
        options: [
          { label: '系统字典', value: 'system' },
          { label: '业务字典', value: 'business' },
        ],
      },
    },
    {
      component: 'Select',
      fieldName: 'status',
      label: '状态',
      componentProps: {
        placeholder: '请选择状态',
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
      },
    },
  ]
}
