import { useState } from "react"
import { Button } from "antd"
import * as Api from '@/service/api'

interface IData {
  message: string
}

function Content2() {
  const [data, setData] = useState<IData>({message: '-'})

  const handleGetJokes = async () => {
    const { data } = await Api.getMsg({})
    setData(data.result)
  }

  return (
    <>
     <h2>数据请求 --- 跨域配置</h2>
     <p>{data.message}</p>
     <Button type="primary" onClick={handleGetJokes}>请求段子数据</Button>
    </>
  )
}

export default Content2
