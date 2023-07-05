import { Modal, Form, Input, InputNumber, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const ruleRequired = [{required:true, message:'Cannot be empty'}];

export const ModModal = ({isAddInfo, updateInfo, originInfo, open, closeModal}) => {
  const [showInfo, setShowInfo] = useState(originInfo);
  const [form] = Form.useForm();

  return (
    <Modal
      title='Modify Information'
      okText='Confirm'
      open={open}
      onOk={() => {
        form.validateFields().then((values) => {
          values.time = values.time.format('YYYY-MM-DD HH:mm:ss');
          if (!isAddInfo) values.id = originInfo.id;
          updateInfo(values);
          isAddInfo ? form.resetFields() : setShowInfo(values);
          closeModal();
        }).catch(() => console.log('Empty item'));
      }}
      onCancel={closeModal}
    >
      <Form form={form} layout='horizontal' initialValues={showInfo && {
            'time': dayjs(showInfo.time),
            'lat': showInfo.lat,
            'lon': showInfo.lon,
            'deep': showInfo.deep,
            'level': showInfo.level,
            'position': showInfo.position,
          }}>
        {isAddInfo && <Form.Item name='id' label='Id' rules={ruleRequired}>
          <InputNumber />
        </Form.Item>}
        <Form.Item name='time' label='Time' rules={ruleRequired}>
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item name='lat' label='Lat' rules={ruleRequired}>
          <InputNumber min={-90} max={90} />
        </Form.Item>
        <Form.Item name='lon' label='Lon' rules={ruleRequired}>
          <InputNumber min={-180} max={180} />
        </Form.Item>
        <Form.Item name='deep' label='Deep' rules={ruleRequired}>
          <InputNumber min={0} max={10000000} />
        </Form.Item>
        <Form.Item name='level' label='Level' rules={ruleRequired}>
          <InputNumber min={0} max={9.9} />
        </Form.Item>
        <Form.Item name='position' label='Position'>
          <Input.TextArea showCount autoSize maxLength={120} />
        </Form.Item>
      </Form>
    </Modal>
  );
}