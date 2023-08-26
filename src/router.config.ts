// tip: react 中每一层级的 path 都必须唯一 

import { lazy } from "react"

const routes = [
  {
    path: '/',
    label: '页面',
    component: lazy(() => import('@/test/content')),
  },
  {
    path: 'content',
    label: '菜单1',
    children: [
      {
        path: '2',
        label: '2',
        component: lazy(() => import('@/test/content2')),
      },
      {
        path: '3',
        label: '3',
        component: lazy(() => import('@/test/content3')),
      },
    ]
  },
  {
    path: 'test',
    label: '菜单2',
    children: [
      {
        path: '4',
        label: '4',
        component: lazy(() => import('@/test/content4')),
      },
      {
        path: '5',
        label: '5',
        component: lazy(() => import('@/test/content5')),
      },
    ]
  },
  {
    path: 'test2',
    label: '菜单3',
    children: [
      {
        path: '6',
        label: '6',
        component: lazy(() => import('@/test/content6')),
      },
      {
        path: '7',
        label: '7',
        component: lazy(() => import('@/test/content7')),
      },
    ]
  },
  {
    path: 'test3',
    label: '页面4',
    component: lazy(() => import('@/test/content7')),
  },
]

export default routes