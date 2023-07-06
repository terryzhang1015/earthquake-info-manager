import { Modal, Form, Input, InputNumber, DatePicker, Slider, Row, Col } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const ruleRequired = [{required:true, message:'Cannot be empty'}];

export const ModModal = ({isAddInfo, updateInfo, originInfo, open, closeModal}) => {
  const [form] = Form.useForm();
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (newValue) => {
    setSliderValue(newValue);
  }

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
      }}
      onOk={async () => {
        const values = await form.validateFields();
        values.time = values.time.format('YYYY-MM-DD HH:mm:ss');
        values.level = sliderValue;
        if (!isAddInfo) values.id = originInfo.id;
        updateInfo(values);
        closeModal();
      }}
      onCancel={closeModal}
    >
      <Form form={form} layout='horizontal' initialValues={originInfo && { 
        'time': dayjs(originInfo.time),
        'lat': originInfo.lat,
        'lon': originInfo.lon,
        'deep': originInfo.deep,
        'level': originInfo.level,
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
        <Form.Item name='level' label='Level' rules={ruleRequired}>
          <Row>
            <Col span={16}>
              <Slider
                min={0} max={9.9} step={.1}
                value={
                  typeof sliderValue==='number' ? sliderValue>=0 && sliderValue<=9.9
                    ? sliderValue : (sliderValue < 0 ? 0 : 9.9) : 0
                }
                onChange={handleSliderChange}
              />
            </Col>
            <Col span={5}>
              <InputNumber
                min={0} max={9.9} value={sliderValue}
                onChange={handleSliderChange}
              />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item name='position' label='Position'>
          <Input.TextArea showCount autoSize maxLength={120} />
        </Form.Item>
      </Form>
    </Modal>
  );
}