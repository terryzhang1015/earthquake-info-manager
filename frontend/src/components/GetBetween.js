import { Button, Space } from 'antd';

export const GetBetweenButton = ({key}) => {
  return (
    <Space>
      <Button type='primary'>
        Get Info Between {key}
      </Button>
    </Space>
  );
}