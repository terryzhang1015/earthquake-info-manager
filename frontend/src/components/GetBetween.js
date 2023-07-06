import { Row, Col, Space, Button, DatePicker } from 'antd';
import { LevelSlider } from './widgets/LevelSlider';
import moment from 'moment';

export const GetBetween = ({timeFilter, levelFilter, setTimeFilter, setLevelFilter, resetFilter}) => {
  return (
    <Row align='center'>
      <Col span={8}>
        <center>
          <DatePicker.RangePicker
            value={timeFilter && timeFilter.map((t) => moment(t))} showTime
            format='YYYY-MM-DD HH:mm:ss'
            onChange={(_, value) => setTimeFilter(value)}
          />
        </center>
      </Col>
      <Col span={5}>
        Level Range
        <LevelSlider range value={levelFilter} onChange={(value) => setLevelFilter(value)} />
      </Col>
      <Col span={4}>
        <center>
          <Button danger onClick={resetFilter}>
            Reset
          </Button>
        </center>
      </Col>
    </Row>
  );
}