import { Row, Col, Slider, InputNumber } from 'antd';

export const LevelSlider = ({range, value, onChange}) => {
  return (
    <Row>
      <Col flex={5}>
        <Slider range={range}
          min={0} max={9.9} step={.1}
          value={value}
          onChange={onChange}
        />
      </Col>
      {
        !range && <Col flex={1}>
          <center>
            <InputNumber
              required min={0} max={9.9}
              value={value} onChange={(v) => {
                onChange(typeof v==='number' ? v>=0 && v<=9.9
                ? v : (v < 0 ? 0 : 9.9) : 0);
              }}
            />
          </center>
        </Col>
      }
    </Row>
  );
}