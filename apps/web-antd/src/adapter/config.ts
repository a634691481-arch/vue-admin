const DEFAULT_GRID_FORM_OPTIONS = {
  commonConfig: {
    colon: true,
    labelWidth: 66,
    componentProps: {
      class: '!w-full',
    },
  },

  layout: 'horizontal' as const, // 布局方式
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4', // 响应式布局
  collapsed: true, // 是否折叠
  collapsedRows: 1, // 折叠行数
  showCollapseButton: true, // 显示折叠按钮
  submitOnChange: false, // 值改变时提交
  submitOnEnter: true, // 回车提交
  showDefaultActions: true, // 显示默认操作按钮
  actionButtonsReverse: true, // 翻转按钮位置
  actionLayout: 'rowEnd' as const, // 按钮布局
  actionPosition: 'center' as const, // 按钮位置
}

const DEFAULT_MODAL_FORM_OPTIONS = {
  commonConfig: {
    colon: true,
    labelWidth: 80,
    componentProps: {
      class: '!w-full',
    },
  },
  layout: 'horizontal' as const, // 布局方式
  wrapperClass: 'grid-cols-1', // 一行一个
  showDefaultActions: false, // 不显示默认按钮
  actionPosition: 'center' as const, // 按钮位置
}

const DEFAULT_MODAL_OPTIONS = {
  centered: true, // 居中显示
  bordered: false, // 无边框
  draggable: false, // 不可拖拽
  destroyOnClose: true, // 关闭时销毁组件
  fullscreenButton: false, // 无全屏按钮
  overlayBlur: 5,
  closeOnPressEscape: false,
}

const DEFAULT_GRID_OPTIONS = {
  align: 'center' as const, // 内容对齐
  headerAlign: 'center' as const, // 表头对齐
  footerAlign: 'center' as const, // 表尾对齐
  showHeader: true, // 显示表头
  showFooter: true, // 显示表尾
  border: 'default' as const, // 边框样式
  columnConfig: {
    resizable: true, // 可调整列宽
  },
  customConfig: {
    mode: 'modal' as const,
  },
  rowConfig: {
    resizable: true, // 可调整行高
    isHover: true, // 悬停效果
  },
  formConfig: {
    enabled: false, // 禁用内置表单
  },
  minHeight: 180, // 最小高度
  proxyConfig: {
    autoLoad: true, // 自动加载
    response: {
      result: 'items', // 数据列表字段
      total: 'total', // 总数字段
      list: '',
    },
    showActiveMsg: true, // 显示加载提示
    showResponseMsg: false, // 不显示响应提示
  },
  round: true, // 圆角
  showOverflow: true, // 溢出省略
  size: 'small' as const, // 表格尺寸
  toolbarConfig: {
    custom: true, // 自定义列
    export: true, // 导出
    refresh: true, // 刷新
    resizable: true, // 调整工具栏
    search: false, // 搜索
    zoom: true, // 全屏
  },
  exportConfig: {}, // 导出配置
  height: 'auto' as const, // 高度自适应
  keepSource: true, // 保留原始数据
  pagerConfig: {}, // 分页配置
  checkboxConfig: {
    highlight: true, // 选中高亮
  },
  // treeConfig: {
  //   transform: false,
  //   parentField: 'pid',
  //   rowField: 'id',
  //   showLine: true,
  //   expandAll: true,
  // },
}

export {
  DEFAULT_GRID_FORM_OPTIONS, // 🔍 表格搜索表单配置
  DEFAULT_GRID_OPTIONS, // 📊 表格配置

  DEFAULT_MODAL_FORM_OPTIONS, // 📋 弹框表单配置
  DEFAULT_MODAL_OPTIONS, // 🪟 弹框配置
}
