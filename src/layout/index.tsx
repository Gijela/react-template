import React, { useEffect, useState, Suspense } from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Spin } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom'
const { Content, Sider } = Layout;

import './index.scss'
import routes from '../router.config'
import Header from './Header'

type MenuItem = Required<MenuProps>['items'][number];

const BaseLayout: React.FC = () => {
  const navigate = useNavigate()
  const [pathRelationShip, setPathRelationShip] = useState<Array<string>>(
    window.location.pathname === '/' ? ['/'] : window.location.pathname.slice(1).split('/') 
  )
  const [menuItems, setMenuItems] = useState<Array<MenuItem>>([])
  const [breadCMsg, setBreadCMsg] = useState<Array<string>>([])

  const getBreadMsg = (routes: any[], route: Array<string>, breadCMsg: Array<string>) => {
    if (!route.length) return
    const currentPath = route[0]
    const remainingPaths = route.slice(1)
    const matchedRoute = routes.find((item: { path: string }) => item.path === currentPath)
    breadCMsg.push(matchedRoute.label)
    if (matchedRoute.children) {
      getBreadMsg(matchedRoute.children, remainingPaths, breadCMsg)
    } else {
      setBreadCMsg(breadCMsg)
    }
  }

  const handleClickMenu = (params: { keyPath: Array<string> })=> {
    const curRoute = [...params.keyPath].reverse() // 当前路径 path; 格式：['父级path', '子级path']
    setPathRelationShip(curRoute)
    getBreadMsg(routes, curRoute, [])
    // 目前只考虑两层菜单
    navigate(curRoute.length === 1 && curRoute[0] === '/' ? '/' : `/${curRoute.join('/')}`);
  }

  // 递归获取 router.config.ts 中的 label 层级关系作为菜单栏
  const routeToMenu = (label: React.ReactNode, key: React.Key, children?: any): MenuItem => {
    let childPage = []
    if (children && children.length > 0) {
      childPage = children.map((item: { label: any; path: any; children: any; }) => {
        const { label, path, children } = item
        return routeToMenu(label, path, children)
      })
    }
    children = childPage.length > 0 ? childPage : ''
    return { key, children, label } as MenuItem
  }

  useEffect(() => {
    // 获取菜单栏
    const menuItems = routes.map(route => {
      const { label, path, children } = route
      return routeToMenu(label, path, children)
    })
    setMenuItems(menuItems)

    // 边界情况: 刷新后初始化显示面包屑
    getBreadMsg(routes, pathRelationShip, [])
  }, [])

  // 递归获取路径对应的 component 的递归函数
  const getComponent = (routes: any[], paths: string[]): any => {
    if (paths.length === 0) return

    const currentPath = paths[0]
    const remainingPaths = paths.slice(1)

    const matchedRoute = routes.find(route => route.path === currentPath)

    if (remainingPaths.length === 0) {
      return matchedRoute?.component
    } else {
      return getComponent(matchedRoute.children, remainingPaths) 
    }
  }

  // 将 router.config.ts 的 component 动态渲染到指定位置
  const TrendsComponent = getComponent(routes, pathRelationShip)

  return (
    <Layout style={{ minHeight: '100vh', margin: 0 }}>
      {/* 菜单栏 */}
      <Sider>
        <div style={{ color: 'white', textAlign: 'center', height: 50, lineHeight: '50px', fontSize: '18px' }}>项目名字</div>
        <Menu 
          items={menuItems} 
          defaultOpenKeys={pathRelationShip.length === 1 ? pathRelationShip : [pathRelationShip[0]]} 
          defaultSelectedKeys={pathRelationShip.length === 1 ? pathRelationShip : [pathRelationShip[1]]} 
          onClick={handleClickMenu}
          theme="dark" 
          mode="inline" 
        />
      </Sider>
      
      {/* 内容区 */}
      <Layout>
        <Header />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            { breadCMsg.map((route, index) => <Breadcrumb.Item key={index}>{route}</Breadcrumb.Item>) }
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: 'white' }}>
            <Suspense fallback={<Spin />}>
              <Routes>
                <Route path={`/${pathRelationShip[1] || '/'}`} element={<TrendsComponent />}></Route> 
              </Routes>
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;