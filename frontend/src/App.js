import './styles/App.css';
import { useEffect, useState } from 'react';
import { message, Space } from 'antd';
import { AddInfoButton } from './components/AddInfoButton';
import { DeleteButton } from './components/DeleteButton';
import { InfoTable } from './components/InfoTable';
import { InfoUpload } from './components/InfoUpload';

const App = () => {
  const [infoList, setInfoList] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msgApi, context] = message.useMessage();

  const handleError = (body, noShowOk) => {
    if (body.code !== 200)
      return msgApi.open({
        type: 'error',
        content: body.msg + ' errCode: ' + body.code,
      });
    if (!noShowOk)
      return msgApi.open({
        type: 'success',
        content: 'Operation Successful',
      });
  }

  const addInfo = async (values) => {
    setLoading(true);
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
    setLoading(true);
    const response = await fetch('/info');
    const body = await response.json();
    handleError(body, true);
    setLoading(false);
    setInfoList(body.data.map(
      (info, index) => {
        info.key = index;
        return info;
      },
    ));
    setSelectedKeys([]);
  }

  const deleteInfo = async (index, noShowOk) => {
    const response = await fetch('/info/' + infoList[index].id, {method: 'DELETE'});
    const body = await response.json();
    handleError(body, noShowOk);
  }

  const deleteSelectedInfo = async () => {
    setLoading(true);
    for (const i of selectedKeys)
      await deleteInfo(i, true);
    getAllInfo();
  }

  const clear = async () => {
    setLoading(true);
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
        <AddInfoButton loading={loading} addInfo={addInfo} />
        <InfoUpload
          loading={loading}
          action='/info/add-from-file'
          onStart={() => setLoading(true)}
          onFinish={getAllInfo}
        />
        <DeleteButton
          type='primary'
          buttonText='Delete Selected'
          loading={loading}
          deleteInfo={deleteSelectedInfo}
        />
        <DeleteButton
          type='primary'
          buttonText='Delete All'
          loading={loading}
          deleteInfo={clear}
        />
      </Space>
      <InfoTable
        loading={loading}
        infoList={infoList}
        selectedRowKeys={selectedKeys}
        onChange={(newKeys) => setSelectedKeys(newKeys)}
        updateInfo={updateInfo}
        deleteInfo={async (index) => {
          setLoading(true);
          await deleteInfo(index);
          getAllInfo();
          setLoading(false);
        }}
      />
    </div>
  );
}

export default App;