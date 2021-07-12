import { Row, Table, Typography } from 'antd';
import { ColumnType, TablePaginationConfig, TableProps } from 'antd/lib/table';
import classnames from 'classnames';
import { isNil } from 'lodash';
import React, { FC, memo, ReactNode } from 'react';
import './table.less';

interface IProps<T = any> extends TableProps<T> {
    name?: string;
    headerExtend?: ReactNode;
    hasDefaultColumn?: boolean;
    isShowTotal?: boolean;
}

const defaultColumn: ColumnType<any> = {
    title: 'STT',
    dataIndex: 'id',
    render: (_: any, record: any, index: number) => index + 1,
    align: 'center',
};

const InsaTable: FC<IProps> = ({
    name,
    pagination,
    className,
    headerExtend,
    columns,
    hasDefaultColumn,
    isShowTotal = false,
    ...props
}) => {
    const renderHeader = () => {
        if (name || headerExtend) {
            return (
                <>
                    {name && <Typography.Title level={4}>{name}</Typography.Title>}
                    {!isNil(headerExtend) && (
                        <Row
                            className="table__header__extend"
                            justify="space-between"
                            align="middle"
                        >
                            {headerExtend}
                        </Row>
                    )}
                </>
            );
        }
    };

    const showTotal = () => {
        if (!isShowTotal) return undefined;

        const _pagination = pagination as TablePaginationConfig;

        if (_pagination && _pagination.current && _pagination.pageSize && props.dataSource) {
            return (
                <Typography.Paragraph
                    style={{
                        fontWeight: 400,
                        color: '#525253',
                    }}
                >
                    {`Hiển thị kết quả từ ${
                        (_pagination?.current - 1) * _pagination.pageSize + 1
                    } - ${
                        (_pagination?.current - 1) * _pagination.pageSize + props.dataSource?.length
                    } trên tổng ${_pagination.total} mục`}
                </Typography.Paragraph>
            );
        }
    };

    const paginationConfig = pagination
        ? {
              ...pagination,
              showTotal,
          }
        : false;

    return (
        <Table
            className={classnames('table', className, {
                showTotal: isShowTotal,
            })}
            rowClassName={(record, index) =>
                index % 2 === 0 ? 'table-row-dark' : 'table-row-light'
            }
            title={renderHeader}
            columns={hasDefaultColumn ? [defaultColumn, ...(columns as [])] : columns}
            pagination={paginationConfig}
            {...props}
        />
    );
};

export default memo(InsaTable);
