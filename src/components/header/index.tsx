import { Col, Row } from 'antd';
import classnames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useBilling } from '../../pages/setting/create-billing/state/context';
import { IState } from '../../store/rootReducer';
import BannerNotifyPackage from '../banner-notify-package';
import HeaderRight from './header-right';
import './style.less';

const Header = () => {
    const isCollapsed = useSelector((state: IState) => state.global.isCollapsed);
    const {
        showWarningExperiedPackage,
        closeWaringExperiedPackage,
        namePackageExperied,
        showWarningExperiedTrail,
        closeWaringExperiedTrail,
        packagesSelect,
    } = useBilling();
    const history = useHistory();
    const onAction = () => {
        if (showWarningExperiedPackage) {
            history.push(
                `/setting/billings/create?packagesSelect=${packagesSelect[0]?.code}&reorder=true`
            );
        } else {
            history.push('/setting/billings/list');
        }
    };

    const onClose = () => {
        closeWaringExperiedPackage();
        closeWaringExperiedTrail();
    };

    return (
        <div className={classnames('header-wrap', { collapsed: isCollapsed })}>
            <Row className="warning-top">
                <Col span={24}>
                    {(showWarningExperiedPackage || showWarningExperiedTrail) && (
                        <BannerNotifyPackage
                            forTrial={showWarningExperiedTrail}
                            packageName={
                                namePackageExperied.length > 0 ? namePackageExperied.join(', ') : ''
                            }
                            closeWarning={onClose}
                            onAction={onAction}
                        />
                    )}
                </Col>
                <Col span={24} className="header-right">
                    <Row justify="end">
                        <Col>
                            <HeaderRight />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Header;
