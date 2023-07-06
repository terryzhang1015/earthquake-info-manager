import { Row, Col, Space, Button, DatePicker } from 'antd';
import { LevelSlider } from './widgets/LevelSlider';
import moment from 'moment';

export const GetBetween = ({timeFilter, levelFilter, setTimeFilter, setLevelFilter,
      reset, refresh}) => {
  return (
    <Row align='center'>
      <Col className='wtf' span={8}>
        <center>
          <DatePicker.RangePicker
            value={timeFilter && timeFilter.map((t) => moment(t))} showTime
            format='YYYY-MM-DD HH:mm:ss'
            onChange={(_, value) => setTimeFilter(value)}
          />
        </center>
      </Col>
      <Col className='asdf' span={5}>
        Level Range
        <LevelSlider range value={levelFilter} onChange={(value) => setLevelFilter(value)} />
      </Col>
      <Col className='wtf' span={5}>
        <center>
          <Space>
            <Button onClick={refresh}>
              Confirm
            </Button>
            <Button danger onClick={reset}>
              Clear
            </Button>
          </Space>
        </center>
      </Col>
    </Row>
  );
}