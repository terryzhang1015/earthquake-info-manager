import { Button, Popconfirm } from 'antd';

export const DeleteButton = ({loading, buttonText='Delete', type, deleteInfo}) => {
  return (
    <Popconfirm
      title='DELETE'
      description='Are you sure to delete?'
      onConfirm={deleteInfo}
    >
      <Button danger loading={loading} type={type}>
        {buttonText}
      </Button>
    </Popconfirm>
  );
}