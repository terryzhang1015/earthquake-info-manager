import { Button, Dropdown } from 'antd';

const items = [
  {
    key: 0,
    label: 'Id',
  },
  {
    key: 1,
    label: 'Time',
  },
  {
    key: 2,
    label: 'Level',
  },
]

export const SortDropdown = ({onClick}) => {
  return (
    <Dropdown
      menu={{items, onClick}}
      placement="bottomLeft"
      arrow
    >
      <Button>Sort By</Button>
    </Dropdown>
  );
}