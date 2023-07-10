import { Modal, Form, Input, InputNumber, DatePicker, message } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { LevelSlider } from './LevelSlider';

const ruleRequired = [{required:true, message:'Cannot be empty'}];

export const ModModal = ({isAddInfo, updateInfo, originInfo, open, closeModal}) => {
  const [form] = Form.useForm();
  const [sliderValue, setSliderValue] = useState(0);
  const [msgApi, context] = message.useMessage();

  return (
    <Modal
      title='Modify Information'
      okText='Confirm'
      open={open}
      afterOpenChange={(open) => {
        if (open) {
          form.resetFields();
          setSliderValue(originInfo ? originInfo.level : 0);
        }
        else {
          form.setFieldsValue({
            'time': null,
            'lat': null,
            'lon': null,
            'deep': null,
            'position': null,
          });
        }
      }}
      onOk={() => {
        form.validateFields().then((values) => {
          values.time = values.time.format('YYYY-MM-DD HH:mm:ss');
          values.level = sliderValue;
          // const regex = /\d+/;
          // if (!regex.test(values.level))
            // throw Error('Level not number');
          if (!isAddInfo) values.id = originInfo.id;
          closeModal();
          updateInfo(values);
        }).catch(() => {
          msgApi.open({
            type: 'error',
            content: 'Please fill all the required information in the correct format',
          });
        });
      }}
      onCancel={closeModal}
    >
      {context}
      <Form form={form} layout='horizontal' initialValues={originInfo && { 
        'time': dayjs(originInfo.time),
        'lat': originInfo.lat,
        'lon': originInfo.lon,
        'deep': originInfo.deep,
        'position': originInfo.position,
      }}>
        {
          isAddInfo && <Form.Item name='id' label='Id' rules={ruleRequired}>
            <InputNumber />
          </Form.Item>
        }
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
        <Form.Item label='Level' rules={ruleRequired}>
          <LevelSlider
            value={sliderValue}
            onChange={setSliderValue}
          />
        </Form.Item>
        <Form.Item name='position' label='Position'>
          <Input.TextArea showCount autoSize maxLength={120} />
        </Form.Item>
      </Form>
    </Modal>
  );
}