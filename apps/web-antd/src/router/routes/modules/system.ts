import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ion:settings-outline',
      order: 9997,
      title: '系统管理',
    },
    name: 'System',
    path: '/system',
    children: [
      // 角色管理
      {
        path: '/system/role',
        name: 'SystemRole',
        meta: {
          icon: 'mdi:account-group',
          title: '角色管理',
        },
        component: () => import('#/views/system/role.vue'),
      },
      // 菜单管理
      {
        path: '/system/menu',
        name: 'SystemMenu',
        meta: {
          icon: 'mdi:menu',
          title: '菜单管理',
        },
        component: () => import('#/views/system/menu.vue'),
      },
      // 部门管理
      {
        path: '/system/dept',
        name: 'SystemDept',
        meta: {
          icon: 'charm:organisation',
          title: '部门管理',
        },
        component: () => import('#/views/system/dept.vue'),
      },
      // 用户管理
      {
        path: '/system/user',
        name: 'SystemUser',
        meta: {
          icon: 'mdi:account',
          title: '用户管理',
        },
        component: () => import('#/views/system/user.vue'),
      },
      // 字典管理
      {
        path: '/system/dict',
        name: 'SystemDict',
        meta: {
          icon: 'mdi:format-list-bulleted-type',
          title: '字典管理',
        },
        component: () => import('#/views/system/dict.vue'),
      },
      // 日志管理
      {
        path: '/system/log',
        name: 'SystemLog',
        meta: {
          icon: 'mdi:file-document-outline',
          title: '日志管理',
        },
        component: () => import('#/views/system/log.vue'),
      },
      // 通知公告
      {
        path: '/system/notice',
        name: 'SystemNotice',
        meta: {
          icon: 'mdi:bullhorn-outline',
          title: '通知公告',
        },
        component: () => import('#/views/system/notice.vue'),
      },
    ],
  },
]

export default routes
