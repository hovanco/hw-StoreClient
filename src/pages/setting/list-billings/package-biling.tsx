import { Button, Image, Card, Col, Row, Typography } from 'antd';
import cx from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import iconChevron from '../../../assets/images/ic-chevron-left-right.svg';
import iconChevronWhite from '../../../assets/images/ic-chevron-left-right-white.svg';
import icActionsCheckSimple from '../../../assets/images/ic-actions-check-simple.svg';
import icActionsCheckSimpleWhite from '../../../assets/images/ic-actions-check-simple-white.svg';
import formatMoney from '../../../helper/format-money';
import formatDescription from '../../../helper/format';

const { Title, Text } = Typography;

export interface ICycleBiling {
    id: number;
    name: string;
    price: number;
}
export interface IPackageBiling {
    id: number;
    code: number;
    alias: string;
    color: string;
    name: string;
    logo?: string;
    icon?: string;
    price: number;
    unit: string;
    description: string;
    mostPopular: boolean;
    cycles: ICycleBiling[];
    package: string;
}

interface Props {
    packageBiling: IPackageBiling;
    handleChoosePackage: (packageBiling: IPackageBiling) => void;
}

const PackageBiling = (props: Props) => {
    const { packageBiling, handleChoosePackage } = props;
    const decs = formatDescription(packageBiling.description);

    const [isHover, setIsHover] = useState(false);

    const toggleHover = () => setIsHover(!isHover);

    return (
        <Card
            className={cx('package-biling', { "most-popular": isHover })}
            bordered={false}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            actions={[
                <Button
                    className={cx('btn-select', { "btn-select-most": isHover })}
                    type={isHover ? 'primary' : 'default'}
                    onClick={() => handleChoosePackage(packageBiling)}
                >
                    Chọn gói này
                </Button>,
            ]}
            cover={
                <>
                    <Title level={5} className="code">
                        {packageBiling.alias}
                    </Title>

                    <Text className="name">{packageBiling.name}</Text>
                </>
            }
        >
            <div className="price">{formatMoney(packageBiling.price, '.')}</div>
            <div className="unit">{packageBiling.unit}</div>
            <div className="desc-view">
                {decs.map((item: string, index: number) => {
                    return (
                        <Row key={index}>
                            <Col>
                                <img
                                    src={
                                        isHover
                                            ? icActionsCheckSimpleWhite
                                            : icActionsCheckSimple
                                    }
                                    alt="icon"
                                />
                                <Text className="description">{item}</Text>
                            </Col>
                        </Row>
                    );
                })}
            </div>
            {/* TODO: show after add feature
                <Link to="/" className="more">
                    Xem thêm{' '}
                    <img src={packageBiling.mostPopular ? iconChevronWhite : iconChevron} alt="icon" />
                </Link>
            */}
        </Card>
    );
};

export default PackageBiling;
