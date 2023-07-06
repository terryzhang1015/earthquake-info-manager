import { Row, Col, Slider, InputNumber } from 'antd';

export const LevelSlider = ({range, value, onChange}) => {
  return (
    <Row>
      <Col flex={5}>
        <Slider range={range}
          min={0} max={9.9} step={.1}
          value={
            range ? value : typeof value==='number' ? value>=0 && value<=9.9
              ? value : (value < 0 ? 0 : 9.9) : 0
          }
          onChange={onChange}
        />
      </Col>
      {
        !range && <Col flex={1}>
          <center>
            <InputNumber
              min={0} max={9.9} value={value}
              onChange={onChange}
            />
          </center>
        </Col>
      }
    </Row>
  );
}