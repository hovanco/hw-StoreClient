import { Button, Col, Row, Space, Typography } from 'antd';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { InsaButton } from '..';
import { EBillingPackageType } from '../../api/billing-api';
import icActionsCloseSimple from '../../assets/images/ic-actions-close-simple.svg';
import imageForBuy from '../../assets/images/image-for-buy.svg';
import { checkWarningTrialExpiration } from '../../helper/get-time';
import { useBilling } from '../../pages/setting/create-billing/state/context';
import './banner-notify-package.less';

const { Title } = Typography;

interface Props {
    packageName?: string;
    closeWarning?: Function;
    forTrial?: boolean;
    onAction?: Function;
}

const BannerNotifyPackage: FC<Props> = ({ packageName, closeWarning, forTrial, onAction }) => {
    const { packagesActive } = useBilling();
    const [willExpired, setWillExpired] = useState<boolean>(false);
    const [daysUntilExpiration, setDaysUntilExpiration]= useState<number>();

    useEffect(() => {
        if (forTrial) {
            const packageTrial = packagesActive.find(
                (item) => item.packageType === EBillingPackageType.Trial
            );
            
            if (packageTrial) {
                setWillExpired(checkWarningTrialExpiration(packageTrial.expiredAt));
                setDaysUntilExpiration(Math.round(moment(packageTrial.expiredAt).diff(moment(), 'days', true)));
            };
        } else {
            const isWillExpired = packagesActive.length !== 0;
            setWillExpired(isWillExpired);
        }
}   , [forTrial, packagesActive])

    return (
        <Row className="banner-notify-package" align="middle" justify="center">
            {forTrial ? (
                <>
                    <Col>
                        <img src={imageForBuy} alt="icon" />
                    </Col>
                    <Col>
                        <Title level={4} className="notify-content">
                            { willExpired ?
                                `Tài khoản dùng thử của bạn sẽ hết hạn trong ${daysUntilExpiration} ngày. 
                                Vui lòng mua gói dịch vụ để không bị gián đoạn` :
                                'Tài khoản dùng thử của bạn đã hết hạn. Vui lòng mua gói dịch vụ để tiếp tục sử dụng'
                            }
                        </Title>
                    </Col>
                    <Col span={1} />
                    <Col>
                        <InsaButton
                            icon={null}
                            type="default"
                            onClick={() => onAction && onAction()}
                        >
                            Xem các gói
                        </InsaButton>
                    </Col>
                    <Button
                        type="text"
                        className="btn-close"
                        onClick={() => closeWarning && closeWarning()}
                    >
                        <img src={icActionsCloseSimple} alt="icon" />
                    </Button>
                </>
            ) : (
                <>
                    <Col>
                        <img src={imageForBuy} alt="icon" />
                    </Col>
                    <Col span={1} />
                    <Col>
                        <Space>
                            <Title level={4}>Gói dịch vụ</Title>
                            <Title level={3}>{packageName}</Title>
                            <Title level={4}>
                                { willExpired ? 'của bạn sắp hết hạn' : 'của bạn đã hết hạn' }
                            </Title>
                        </Space>
                    </Col>
                    <Col span={1} />
                    <Col>
                        <InsaButton
                            icon={null}
                            type="default"
                            onClick={() => onAction && onAction()}
                        >
                            { willExpired ? 'Gia hạn gói dịch vụ' : 'Thay đổi gói dịch vụ' }
                        </InsaButton>
                    </Col>
                    <Button
                        type="text"
                        className="btn-close"
                        onClick={() => closeWarning && closeWarning()}
                    >
                        <img src={icActionsCloseSimple} alt="icon" />
                    </Button>
                </>
            )}
        </Row>
    );
};

export default BannerNotifyPackage;
