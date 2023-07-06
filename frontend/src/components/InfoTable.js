import { Table, Button, Space } from 'antd';
import { ModModal } from './widgets/ModModal';
import { DeleteButton } from './widgets/DeleteButton';
import { useState } from 'react';

const cols = [
  {title: 'Id', dataIndex: 'id'},
  {title: 'Time',dataIndex: 'time'},
  {title: 'Lat', dataIndex: 'lat'},
  {title: 'Lon', dataIndex: 'lon'},
  {title: 'Deep', dataIndex: 'deep'},
  {title: 'Level', dataIndex: 'level'},
  {title: 'Position', dataIndex: 'position'},
  {title: null, dataIndex: 'modify'},
];

export const InfoTable = ({updateInfo, deleteInfo, loading,
      infoList, selectedRowKeys, onChange}) => {
  const [openMod, setOpenMod] = useState(-1);
  const rowSelection = {
    selectedRowKeys,
    onChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  return (
    <div>
      <Table
        rowSelection={rowSelection}
        columns={cols}
        dataSource={infoList.map((info) => {
          info.modify = (
            <Space>
              <Button loading={loading} onClick={() => setOpenMod(info.key)}>
                Modify
              </Button>
              <DeleteButton loading={loading} deleteInfo={() => deleteInfo(info.key)}>
                Delete
              </DeleteButton>
            </Space>
          );
          return info;
        })}
      />
      <ModModal
        open={openMod ^ -1}
        originInfo={infoList[openMod]}
        updateInfo={updateInfo}
        closeModal={() => setOpenMod(-1)}
      />
    </div>
  );
}