import { Button } from 'antd';
import { ModModal } from './ModModal';
import { useState } from 'react';

export const AddInfoButton = ({loading, addInfo}) => {
  const [openMod, setOpenMod] = useState(false);

  return (
    <div>
      <Button
        type='primary'
        loading={loading}
        onClick={() => {setOpenMod(true);}}
      >
        Add info
      </Button>
      <ModModal
        isAddInfo
        open={openMod}
        closeModal={() => setOpenMod(false)}
        updateInfo={addInfo}
      />
    </div>
  );
}