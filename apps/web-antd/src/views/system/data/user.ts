/**
 * 弹窗表单字段配置
 */
export function formApiSchema() {
  return [
    {
      component: 'Input',
      componentProps: { placeholder: '请输入用户名' },
      defaultValue: '',
      fieldName: 'username',
      label: '用户名',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '请输入昵称' },
      defaultValue: '',
      fieldName: 'nickname',
      label: '昵称',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '请输入手机号' },
      defaultValue: '',
      fieldName: 'phone',
      label: '手机号',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '请输入邮箱' },
      defaultValue: '',
      fieldName: 'email',
      label: '邮箱',
    },
    {
      component: 'Select',
      componentProps: {
        placeholder: '请选择角色',
        options: [
          { label: '管理员', value: 'admin' },
          { label: '编辑', value: 'editor' },
          { label: '审核员', value: 'auditor' },
          { label: '访客', value: 'visitor' },
        ],
      },
      defaultValue: 'visitor',
      fieldName: 'role',
      label: '角色',
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
    { title: '用户名', field: 'username', width: 120 },
    { title: '昵称', field: 'nickname', width: 120 },
    { title: '手机号', field: 'phone', width: 130 },
    { title: '邮箱', field: 'email', width: 180, showOverflow: true },
    { title: '角色', field: 'role', width: 100 },
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
      fieldName: 'username',
      label: '用户名',
      componentProps: { placeholder: '请输入用户名' },
    },
    {
      component: 'Input',
      fieldName: 'phone',
      label: '手机号',
      componentProps: { placeholder: '请输入手机号' },
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
    {
      component: 'Select',
      fieldName: 'role',
      label: '角色',
      componentProps: {
        placeholder: '请选择角色',
        options: [
          { label: '管理员', value: 'admin' },
          { label: '编辑', value: 'editor' },
          { label: '审核员', value: 'auditor' },
          { label: '访客', value: 'visitor' },
        ],
      },
    },
  ]
}
