import { ArrowRightOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import moment from 'moment';
import get from 'lodash/get';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { getPosts } from '../../../../api/blog-api';
import { Loading } from '../../../../components';
import constants from '../../../../constants';
import './style.less';

interface IPost {
    id: string;
    title: string;
    description: string;
    link: string;

    date: Date;
    excerpt: string;
    featuredImage: {
        node: {
            id: string;
            sourceUrl: string;
        };
    };
    slug: string;
    uri: string;
}

const Post: FC<{ post: IPost }> = ({ post }) => (
    <Row key={post.id} gutter={[20, 20]} className='user-guide-post'>
        <Col>
            <a
                href={`${constants.INSA_HOMEPAGE}/kham-pha${post.uri}`}
                target='_blank'
                rel='noreferrer'
            >
                <Avatar
                    shape='square'
                    style={{ width: 230, height: 138 }}
                    src={post.featuredImage.node.sourceUrl}
                />
            </a>
        </Col>
        <Col style={{ flex: 1 }}>
            <Space direction='vertical' size={3}>
                <Typography.Title level={5} style={{ margin: 0 }}>
                    <a
                        href={`${constants.INSA_HOMEPAGE}/kham-pha${post.uri}`}
                        target='_blank'
                        rel='noreferrer'
                    >
                        {post.title}
                    </a>
                </Typography.Title>
                <div>
                    <Space>
                        <ClockCircleOutlined style={{ color: '#9e9e9e' }} />
                        <Typography.Text style={{ color: '#9e9e9e' }}>
                            {moment(post.date).format('DD/MM/YYYY')}
                        </Typography.Text>
                    </Space>
                </div>

                <div
                    style={{ color: '#787878' }}
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                ></div>

                <Button
                    style={{ borderRadius: 30 }}
                    href={`${constants.INSA_HOMEPAGE}/kham-pha${post.uri}`}
                    target='_blank'
                >
                    Đọc tiếp <ArrowRightOutlined />
                </Button>
            </Space>
        </Col>
    </Row>
);

function usePosts() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadPosts() {
            try {
                setLoading(true);
                const response = await getPosts();

                setPosts(get(response.data, 'posts.nodes') || []);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }
        loadPosts();
    }, []);

    return useMemo(
        () => ({
            loading,
            posts,
        }),
        [loading, posts],
    );
}

const UserGuidePost: FC = () => {
    const { loading, posts } = usePosts();

    if (loading) {
        return <Loading full />;
    }

    return (
        <Row gutter={[20, 20]}>
            {posts.map((post) => (
                <Col span={24} key={post.id}>
                    <Post key={post.id} post={post} />
                </Col>
            ))}
        </Row>
    );
};

export default UserGuidePost;
