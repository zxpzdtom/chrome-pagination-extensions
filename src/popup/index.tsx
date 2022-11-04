import { createRoot } from 'react-dom/client'
import { Switch } from 'antd'

import 'antd/dist/antd.less'

import './index.less'

// 目前插件图标点击控制即可，后续看是否需要 做配置、打赏、关于等信息
function App() {
  return (
    <div>
      <Switch checkedChildren='开启' unCheckedChildren='关闭' defaultChecked />
    </div>
  )
}

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(<App />)
}
