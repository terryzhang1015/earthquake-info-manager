import './App.css';
import { useEffect, useState } from 'react';
import { Button, message, Space } from 'antd';
import { AddInfoButton } from './AddInfoButton';
import { InfoTable } from './InfoTable';
import { InfoUpload } from './InfoUpload';

const App = () => {
  const [infoList, setInfoList] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [loadings, setLoadings] = useState(Array(2).fill(false));
  const [msgApi, context] = message.useMessage();

  const handleSelectChange = (newKeys) => setSelectedKeys(newKeys);

  const enterLoading = (loadingList) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      for (let i in loadingList)
        newLoadings[loadingList[i]] = true;
      return newLoadings;
    });
    setTimeout(() => finishLoading(loadingList), 10000);
  }

  const finishLoading = (loadingList) => 
      setLoadings(
          (prevLoadings) => {
            const newLoadings = [...prevLoadings];
            for (let i in loadingList)
              newLoadings[loadingList[i]] = false;
            return newLoadings;
          });


  const handleError = (body) => {
    if (body.code !== 200)
      return msgApi.open({
        type: 'error',
        content: body.msg + ' errCode: ' + body.code,
      });
  }


  const addInfo = async (values) => {
    enterLoading([0,1]);
    const response = await fetch('/info', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const body = await response.json();
    handleError(body);
    getAllInfo();
  }

  const getAllInfo = async () => {
    enterLoading([0,1]);
    const response = await fetch('/info');
    const body = await response.json();
    handleError(body);
    finishLoading([0,1]);
    setInfoList(body.data.map(
      (info, index) => {
        info.key = index;
        return info;
      },
    ));
    setSelectedKeys([]);
  }

  const deleteSelectedInfo = async () => {
    if (loadings[0]) return;
    enterLoading([0]);
    for (let i in selectedKeys) {
      const response = await fetch('/info/' + infoList[selectedKeys[i]].id, {method: 'DELETE'});
      const body = await response.json();
      handleError(body);
    }
    getAllInfo();
  }

  const clear = async () => {
    if (loadings[1]) return;
    enterLoading([1]);
    const response = await fetch('/info', {method: 'DELETE'});
    const body = await response.json();
    handleError(body);
    getAllInfo();
  }

  const updateInfo = async (values) => {
    const response = await fetch('/info', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const body = await response.json();
    handleError(body);
    getAllInfo();
  }


  useEffect(() => {getAllInfo();}, []);
  return (
    <div>
      {context}
      <h1>EARTHQUAKE INFO</h1>
      <Space className='control-panel'>
        <AddInfoButton
          disabled={loadings[0] || loadings[1]}
          addInfo={addInfo}
        />
        <InfoUpload
          disabled={loadings[0] || loadings[1]}
          action='/info/add-from-file'
          onStart={() => enterLoading([0,1])}
          onFinish={getAllInfo}
        />
        <Button
          type='primary'
          loading={loadings[0]}
          onClick={deleteSelectedInfo}
        >
          Delete Chosen
        </Button>
        <Button
          type='primary'
          loading={loadings[1]}
          onClick={clear}
        >
          Delete All
        </Button>
      </Space>
      <InfoTable
        disableModal={loadings[0] || loadings[1]}
        infoList={infoList}
        selectedRowKeys={selectedKeys}
        onChange={handleSelectChange}
        updateInfo={updateInfo}
      />
    </div>
  );
}

export default App;