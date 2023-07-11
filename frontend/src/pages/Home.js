import '../styles/Home.css';
import { useEffect, useState } from 'react';
import { message, Space } from 'antd';
import { AddInfoButton } from '../components/widgets/AddInfoButton';
import { DeleteButton } from '../components/widgets/DeleteButton';
import { InfoUpload } from '../components/widgets/InfoUpload';
import { SortDropdown } from '../components/widgets/SortDropdown';
import { InfoTable } from '../components/InfoTable';
import { GetBetween } from '../components/GetBetween';

export const Home = () => {
  const [timeFilter, setTimeFilter] = useState();
  const [levelFilter, setLevelFilter] = useState([0, 9.9]);
  const [sortKey, setSortKey] = useState(0);
  const [infoList, setInfoList] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msgApi, context] = message.useMessage();

  const getUrl = (sort) => '/info/filter?st=' +
      (timeFilter ? timeFilter[0] : '') + '&ed=' +
      (timeFilter ? timeFilter[1] : '') +
      '&d1=' + levelFilter[0] +
      '&d2=' + levelFilter[1] +
      (sort ? '&key='+ sortKey : '');

  const resetFilter = () => {
    setTimeFilter();
    setLevelFilter([0, 9.9]);
  }

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
    getFilteredInfo();
  }

  const getFilteredInfo = async () => {
    setLoading(true);
    const infoUrl = getUrl(true);
    const response = await fetch(infoUrl);
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
    getFilteredInfo();
  }

  const clear = async () => {
    setLoading(true);
    const infoUrl = getUrl();
    const response = await fetch(infoUrl, {method: 'DELETE'});
    const body = await response.json();
    handleError(body);
    getFilteredInfo();
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
    getFilteredInfo();
  }


  useEffect(() => {getFilteredInfo();}, [sortKey, timeFilter, levelFilter]);
  return (
    <div>
      {context}
      <h1>EARTHQUAKE INFO</h1>
      <Space className='control-panel'>
        <SortDropdown onClick={(key) => {setSortKey(key.key);}} />
        <AddInfoButton loading={loading} addInfo={addInfo} />
        <InfoUpload
          loading={loading}
          action='/info/add-from-file'
          onStart={() => setLoading(true)}
          onFinish={getFilteredInfo}
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
      <GetBetween
        timeFilter={timeFilter}
        levelFilter={levelFilter}
        setTimeFilter={setTimeFilter}
        setLevelFilter={setLevelFilter}
        resetFilter={resetFilter}
      />
      <InfoTable
        loading={loading}
        infoList={infoList}
        selectedRowKeys={selectedKeys}
        onChange={(newKeys) => setSelectedKeys(newKeys)}
        updateInfo={updateInfo}
        deleteInfo={async (index) => {
          setLoading(true);
          await deleteInfo(index);
          getFilteredInfo();
          setLoading(false);
        }}
      />
    </div>
  );
}