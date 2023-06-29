import { Table, Button } from 'antd';
import { ModModal } from './ModModal';
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

export const InfoTable = ({updateInfo, disableModal,
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
    <Table
      rowSelection={rowSelection}
      columns={cols}
      dataSource={infoList.map((info, index) => {
        info['modify'] = (
          <div>
            <Button onClick={() => {if (!disableModal) setOpenMod(index);}}>
              Modify
            </Button>
            <ModModal
              open={openMod === index}
              originInfo={info}
              updateInfo={updateInfo}
              closeModal={() => setOpenMod(-1)}
            />
          </div>
        );
        return info;
      })}
    />
  );
}