import { Button, Row, Col, Space, Tabs, Typography } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { InsaButton } from '../../../../components';
import './style.less';
import addProductGuide from '../../assets/add-product-guide.svg';
import addressGuide from '../../assets/address-guide.svg';
import posGuide from '../../assets/pos-guide.svg';
import BtnAddPosChannel from './btn-add-pos-channel';
import EditStore from './edit-store';

const { TabPane } = Tabs;

const UserGuideSetting: FC = () => {
    return (
        <div className='setting-guide-tab'>
            <Tabs tabPosition='left'>
                <TabPane tab='Thêm sản phẩm' key='1'>
                    <Row justify='space-between' align='middle' gutter={30}>
                        <Col>
                            <Typography.Title level={5}>Bạn chưa có sản phẩm nào</Typography.Title>
                            <Space direction='vertical'>
                                <div>
                                    <Typography.Text>
                                        Hãy giúp cho khách hàng biết đến những sản phẩm tuyệt vời
                                        của bạn
                                    </Typography.Text>
                                </div>

                                <div>
                                    <Link to='/products/new'>
                                        <InsaButton type='primary'>Thêm sản phẩm</InsaButton>
                                    </Link>
                                </div>
                                <Button
                                    type='link'
                                    href='https://insa.app/kham-pha/huong-dan-cach-them-san-pham-moi/'
                                    target='_blank'
                                >
                                    Xem hướng dẫn
                                </Button>
                            </Space>
                        </Col>
                        <Col>
                            <img src={addProductGuide} alt='Thêm sản phẩm' />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab='Thiết lập địa chỉ' key='2'>
                    <Row justify='space-between' align='middle' gutter={30}>
                        <Col>
                            <Typography.Title level={5}>
                                Thiết lập địa chỉ của cửa hàng
                            </Typography.Title>
                            <Space direction='vertical'>
                                <div>
                                    <Typography.Text>
                                        Thêm hoặc thay đổi địa chỉ, đây có thể vừa là kho vừa là cửa
                                        hàng của bạn
                                    </Typography.Text>
                                </div>

                                <div>
                                    <EditStore />
                                </div>
                                <Button
                                    type='link'
                                    href='https://insa.app/kham-pha/huong-dan-thiet-lap-dia-chi-cua-hang/'
                                    target='_blank'
                                >
                                    Xem hướng dẫn
                                </Button>
                            </Space>
                        </Col>
                        <Col>
                            <img src={addressGuide} alt='Thiết lập địa chỉ của cửa hàng' />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab='Khám phá POS' key='3'>
                    <Row justify='space-between' align='middle' gutter={30}>
                        <Col>
                            <Typography.Title level={5}>
                                Khám phá giao diện bán hàng INSA POS
                            </Typography.Title>
                            <Space direction='vertical'>
                                <div>
                                    <Typography.Text>
                                        Bắt đầu trải nghiệm các tính năng bán hàng cùng INSA POS
                                    </Typography.Text>
                                </div>

                                <div>
                                    <BtnAddPosChannel />
                                </div>
                                <Button
                                    type='link'
                                    href='https://insa.app/kham-pha/huong-dan-kham-pha-insa-pos/'
                                    target='_blank'
                                >
                                    Xem hướng dẫn
                                </Button>
                            </Space>
                        </Col>
                        <Col>
                            <img src={posGuide} alt=' Khám phá giao diện bán hàng INSA POS' />
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default UserGuideSetting;
