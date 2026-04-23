/**
 * 获取编辑表单的字段配置
 */
export function formApiSchema() {
  return [
    {
      component: 'Input',
      fieldName: 'deptName',
      label: '部门名称',
      rules: 'required',
    },
    {
      component: 'ApiTreeSelect',
      componentProps: {
        allowClear: true,
        class: 'w-full',
        labelField: 'deptName',
        valueField: 'id',
        childrenField: 'children',
        showSearch: true,
        treeNodeFilterProp: 'deptName',
      },
      fieldName: 'pid',
      label: '上级部门',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: '正常', value: 1 },
          { label: '禁用', value: 0 },
        ],
        optionType: 'button',
      },
      defaultValue: 1,
      fieldName: 'status',
      label: '部门状态',
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
      rules: 'required',
    },
  ]
}

/**
 * 获取表格列配置
 * @param onActionClick 表格操作按钮点击事件
 */
export function gridApiColumns(onActionClick: any) {
  return [
    {
      title: '#',
      type: 'seq',
      width: 50,
      fixed: 'left',
    },
    {
      align: 'left',
      field: 'deptName',
      fixed: 'left',
      title: '部门名称',
      treeNode: true,
      width: 150,
    },
    {
      cellRender: { name: 'CellTag' },
      field: 'status',
      title: '部门状态',
      width: 100,
    },
    {
      field: 'createTime',
      title: '创建时间',
      width: 180,
    },
    {
      field: 'remark',
      title: '备注',
    },
    {
      align: 'right',
      cellRender: {
        attrs: {
          nameField: 'deptName',
          nameTitle: '部门',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          {
            code: 'append',
            text: '新增下级',
          },
          'edit',
          {
            code: 'delete',
            disabled: (row: any) => {
              return !!(row.children && row.children.length > 0)
            },
          },
        ],
      },
      field: 'operation',
      fixed: 'right',
      headerAlign: 'center',
      showOverflow: false,
      title: '操作',
      width: 200,
    },
  ]
}

/**
 * 获取搜索表单的字段配置
 */
export function gridApiSchema() { }
