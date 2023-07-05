import { Upload, Button } from 'antd';

export const InfoUpload = ({loading, action, onStart, onFinish}) => (
  <Upload
    disabled={loading}
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
    <Button type='primary' loading={loading}>Upload File</Button>
  </Upload>
);