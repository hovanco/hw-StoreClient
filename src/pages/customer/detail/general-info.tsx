import React, { FC } from 'react';
import { Row, Col, Card, Space, Typography, Tooltip } from 'antd';
import { Gender } from '../../../constants/gender';
import CustomerInfoAction from './customer-info-action';
import { useCustomer } from './context';
import { guest } from '../../../constants/guest';
import './general-info.less';

interface Props {}

const GeneralInfo: FC<Props> = () => {
    const { customer } = useCustomer();

    const getGenderName = (gender: Gender) => {
        return gender === Gender.MALE ? 'Nam' : 'Nữ';
    };

    return (
        <Card
            title={
                <Space>
                    <Typography.Text>Thông tin khách hàng</Typography.Text>
                    {customer._id !== guest._id && <CustomerInfoAction />}
                </Space>
            }
            className='customer-general-info'
        >
            <Row gutter={[10, 16]}>
                <Col span={8}>
                    <Row>
                        <Col span={10}>
                            <div className='text-bold'>Nhóm khách hàng</div>
                        </Col>
                        <Col span={12} className='ellipsis-text'>
                            :
                            <Tooltip placement='bottom' title='Khách lẻ'>
                                {' '}
                                Khách lẻ
                            </Tooltip>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row>
                        <Col span={6}>
                            <div className='text-bold'>Giới tính</div>
                        </Col>
                        <Col span={12} className='ellipsis-text'>
                            :
                            {customer.gender ? (
                                <Tooltip placement='bottom' title={getGenderName(customer.gender)}>
                                    {' '}
                                    {getGenderName(customer.gender)}
                                </Tooltip>
                            ) : (
                                ' ---'
                            )}
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row>
                        <Col span={10}>
                            <div className='text-bold'>Mã khách hàng</div>
                        </Col>
                        <Col span={12} className='ellipsis-text'>
                            :
                            {customer.code && customer.code.length > 0 ? (
                                <Tooltip placement='bottom' title={customer.code}>
                                    {' '}
                                    {customer.code}
                                </Tooltip>
                            ) : (
                                ' ---'
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row gutter={[10, 0]}>
                <Col span={8}>
                    <Row>
                        <Col span={10}>
                            <div className='text-bold'>Số điện thoại</div>
                        </Col>
                        <Col span={12} className='ellipsis-text'>
                            :
                            {customer.phoneNo
                                ? customer.phoneNo.length > 0 && (
                                      <Tooltip placement='bottom' title={customer.phoneNo}>
                                          {' '}
                                          {customer.phoneNo}
                                      </Tooltip>
                                  )
                                : ' ---'}
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row>
                        <Col span={6}>
                            <div className='text-bold'>Email</div>
                        </Col>
                        <Col span={12} className='ellipsis-text'>
                            :
                            {customer.email ? (
                                <Tooltip placement='bottom' title={customer.email}>
                                    {' '}
                                    {customer.email}
                                </Tooltip>
                            ) : (
                                ' ---'
                            )}
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row>
                        <Col span={10}>
                            <div className='text-bold'>Ngày sinh</div>
                        </Col>
                        <Col span={12} className='ellipsis-text'>
                            :
                            {customer.dateOfBirth ? (
                                <Tooltip placement='bottom' title={customer.dateOfBirth}>
                                    {' '}
                                    {customer.dateOfBirth}
                                </Tooltip>
                            ) : (
                                ' ---'
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

export default GeneralInfo;
