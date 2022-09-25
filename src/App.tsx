import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import './App.css';

type ResponceErrorDataType = {
  detail: string,
  status: number | undefined,
  title: string
}

function App() {

  const [name, setName] = useState('testuser@tt.ru')
  const [password, setPassword] = useState('TPipZn2h')
  const [token, setToken] = useState('')
  const [showToken, setShowToken] = useState(false)
  const [loading, setLoading] = useState(false)
  const [responceErrData, setResponceErrData] = useState<ResponceErrorDataType>({
    detail: '',
    status: undefined,
    title: ''
  })

  const truncate = (str: any, n: number) => {
    if (str)
      return str.length > n ? str.substr(0, n - 1) + '...' : str
  }

  const request = async () => {
    setLoading(true)
    const res = await axios.post('https://neurodoc-api.herokuapp.com/', {
      "username": name,
      "password": password
    })

    const { detail, status, title } = res.data
    setResponceErrData({ detail, status, title })

    setToken(res.data.returnedData?.id_token)
    setLoading(false)
  }

  const showTokenOnClick = () => setShowToken(state => !state)
  const onChangeEventHandlerName = (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)
  const onChangeEventHandlerPassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)


  return (
    <div className="app">
      <div>
        <div>
          <input value={name} type="email" onChange={onChangeEventHandlerName} />
        </div>
        <div>
          <input value={password} type="text" onChange={onChangeEventHandlerPassword} />
        </div>
      </div>

      <button onClick={request}>
        {loading && (
          <i
            className="fa fa-refresh fa-spin"
            style={{ margin: "0 10px 0 0" }}
          />
        )}
        request
      </button>

      <div className={showToken ? 'app__token' : 'app__token__tr'}>
        <span onClick={showTokenOnClick}>
          {showToken
            ? 'id token: ' + token
            : token && 'id token: ' + truncate(token, 24)
          }
        </span>
      </div>

      <div className='app__err'>
        <div>{responceErrData.detail && 'detail: ' + responceErrData.detail}</div>
        <div>{responceErrData.status && 'status code: ' + responceErrData.status}</div>
        <div>{responceErrData.title && 'title:  ' + responceErrData.title}</div>
      </div>
    </div>
  );
}

export default App;
