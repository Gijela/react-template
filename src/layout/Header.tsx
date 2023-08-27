import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

const UserHeader = () => {
  const navigate = useNavigate()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span onClick={() => navigate('/login')}>退出登录</span>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', background: 'white', minHeight: 60 }}>
      <Dropdown menu={{ items }} trigger={['hover']}>
        <Space>
          <img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' style={{ width: 30, height: 30, marginRight: 20, borderRadius: 15, cursor: 'pointer' }} />
        </Space>
      </Dropdown>
    </div>
  )
}

export default UserHeader