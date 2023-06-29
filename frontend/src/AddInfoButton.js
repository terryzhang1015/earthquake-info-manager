import { Button } from 'antd';
import { ModModal } from './ModModal';
import { useState } from 'react';

export const AddInfoButton = ({disabled, addInfo}) => {
  const [openMod, setOpenMod] = useState(false);

  return (
    <div>
      <Button
        type='primary'
        onClick={() => {if (!disabled) setOpenMod(true);}}
      >
        Add info
      </Button>
      <ModModal
        isAddInfo={true}
        open={openMod}
        closeModal={() => setOpenMod(false)}
        updateInfo={addInfo}
      />
    </div>
  );
}