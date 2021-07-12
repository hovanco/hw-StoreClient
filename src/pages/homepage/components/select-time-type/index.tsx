import { CaretDownFilled } from '@ant-design/icons';
import { Button, Col, Dropdown, Menu, Row } from 'antd';
import React from 'react';
import { useReport } from '../../state';

interface Props {}

interface IDataTime {
    type: string;
    title: string;
}

const listDataTime: IDataTime[] = [
    {
        type: 'month',
        title: 'Tháng',
    },
    {
        type: 'week',
        title: 'Tuần',
    },
];

const getLabel = (type: string) => {
    const type_time = listDataTime.find((item: IDataTime) => item.type === type);
    if (type_time) return type_time.title;
    return '';
};

const SelectTimeType = (props: Props) => {
    const { time, selectTypeTime } = useReport();

    const handleSelectTypeTime = (menu: any) => {
        selectTypeTime(menu.key);
    };

    const overlay = (
        <Menu selectedKeys={[time.type]} onClick={handleSelectTypeTime}>
            {listDataTime.map((item: IDataTime) => (
                <Menu.Item key={item.type}>{item.title}</Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown overlay={overlay} className="warehouses-btn">
            <Button>
                <Row justify="space-between" align="middle">
                    <Col>{getLabel(time.type)}</Col>
                    <Col>
                        <CaretDownFilled />
                    </Col>
                </Row>
            </Button>
        </Dropdown>
    );
};

export default SelectTimeType;
