/**
 * 获取编辑表单的字段配置
 */
export function formApiSchema() {
  return [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入'
      },
      defaultValue: '',
      fieldName: 'name',
      label: '角色名称',
      rules: 'required'
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
        optionType: 'button'
      },
      defaultValue: 1,
      fieldName: 'status',
      label: '角色状态',
      formItemClass: 'items-end',
      rules: 'required'
    },

    {
      component: 'Textarea',
      componentProps: {
        maxLength: 50,
        rows: 3,
        showCount: true,
      },
      fieldName: 'remark',
      label: '角色备注',
      rules: 'required',
      formItemClass: 'items-start',

    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入'
      },
      fieldName: 'permissions',
      formItemClass: 'items-start',
      label: '角色授权',
      modelPropName: 'modelValue',
    },
  ]
}

/**
 * 获取表格列配置
 * @param onActionClick 表格操作按钮点击事件
 */
export function gridApiColumns(onActionClick: any, onStatusChange: any) {
  return [
    {
      title: '#',
      type: 'seq' as const,
      width: 50,
      fixed: 'left' as const,
    },
    {
      title: '角色名称',
      field: 'name',
      width: 120,
    },
    {
      title: '角色ID',
      field: 'id',
      width: 120,
    },
    {
      title: '角色状态',
      field: 'status',
      width: 120,
      cellRender: {
        attrs: {
          options: [
            {
              label: '正常',
              value: 1,
            },
            {
              label: '禁用',
              value: 0,
            },
          ],
          beforeChange: onStatusChange
        },
        name: onStatusChange ? 'CellSwitch' as const : 'CellTag' as const,
      },
    },
    {
      title: '备注',
      field: 'remark',
    },
    {
      title: '创建时间',
      field: 'createTime',
      width: 150,
    },
    {
      align: 'right' as const,
      cellRender: {
        attrs: {
          nameField: 'name',
          nameTitle: '角色',
          onClick: onActionClick,
        },
        name: 'CellOperation' as const,
        options: [
          { code: 'edit', text: '编辑' },
          { code: 'delete', text: '删除' },
        ],
      },
      field: 'operation',
      fixed: 'right' as const,
      headerAlign: 'center' as const,
      showOverflow: false,
      title: '操作',
      width: 130,
    },
  ]
}

/**
 * 获取搜索表单的字段配置
 */
export function gridApiSchema() {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: '角色名称',
    },
    {
      component: 'Input',
      fieldName: 'id',
      label: '角色ID',
    },
    {
      component: 'Select',
      fieldName: 'status',
      label: '角色状态',
      componentProps: {
        options: [
          {
            label: '正常',
            value: 1,
          },
          {
            label: '禁用',
            value: 0,
          },
        ],
      },
    },
    {
      component: 'Input',
      fieldName: 'remark',
      label: '备注',
    },
    {
      component: 'RangePicker',
      fieldName: 'createTime',
      label: '创建时间',
    },
  ]
}
