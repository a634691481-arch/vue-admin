import {
  defineOverridesPreferences,
  definePreferencesExtension,
} from '@vben/preferences';

interface WebAntdPreferencesExtension {
  defaultTableSize: number;
  enableFormFullscreen: boolean;
  reportTitle: string;
  tenantMode: 'multi' | 'single';
}

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  
  app: {
    name: import.meta.env.VITE_APP_TITLE,
    layout: 'header-sidebar-nav'
  },
  widget: {
    fullscreen: true, // 是否显示全屏按钮
    globalSearch: true, // 是否显示全局搜索按钮
    languageToggle: false, // 是否显示语言切换按钮
    lockScreen: true, // 是否显示锁屏按钮
    notification: false, // 是否显示通知按钮
    refresh: true, // 是否显示刷新按钮
    sidebarToggle: true, // 是否显示侧边栏折叠/展开按钮
    themeToggle: true // 是否显示主题切换按钮（亮色/暗色模式）
  },

  breadcrumb: {
    hideOnlyOne: true,
    styleType: 'background'
  },
  navigation: {
    styleType: 'plain'
  },
  tabbar: {
    styleType: 'brisk'
  },
  theme: {
    builtinType: 'deep-blue',
    colorPrimary: 'hsl(211 91% 39%)',
    mode: 'light',
    radius: '0'
  }



});

export const preferencesExtension =
  definePreferencesExtension<WebAntdPreferencesExtension>({
    tabLabel: 'preferences.antd.tabLabel',
    title: 'preferences.antd.title',
    fields: [
      {
        component: 'switch',
        defaultValue: true,
        key: 'enableFormFullscreen',
        label: 'preferences.antd.fields.enableFormFullscreen.label',
        tip: 'preferences.antd.fields.enableFormFullscreen.tip',
      },
      {
        component: 'select',
        defaultValue: 'single',
        key: 'tenantMode',
        label: 'preferences.antd.fields.tenantMode.label',
        options: [
          {
            label: 'preferences.antd.fields.tenantMode.options.single.label',
            value: 'single',
          },
          {
            label: 'preferences.antd.fields.tenantMode.options.multi.label',
            value: 'multi',
          },
        ],
      },
      {
        component: 'number',
        componentProps: {
          max: 200,
          min: 10,
          step: 10,
        },
        defaultValue: 20,
        key: 'defaultTableSize',
        label: 'preferences.antd.fields.defaultTableSize.label',
      },
      {
        component: 'input',
        defaultValue: '',
        key: 'reportTitle',
        label: 'preferences.antd.fields.reportTitle.label',
        placeholder: 'preferences.antd.fields.reportTitle.placeholder',
      },
    ],
  });
