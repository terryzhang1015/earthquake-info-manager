import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button } from 'antd';

export const InfoUpload = ({disabled, action, onStart, onFinish}) => (
  <Upload
    disabled={disabled}
    maxCount={1}
    multiple={false}
    action={action}
    method='POST'
    onChange={(info) => {
      if (info.file.status === 'uploading') {
        onStart();
        return;
      }
      onFinish();
    }}
  >
    <Button className='upload-button' type='primary' icon={<UploadOutlined />}>
      Upload File
    </Button>
  </Upload>
);