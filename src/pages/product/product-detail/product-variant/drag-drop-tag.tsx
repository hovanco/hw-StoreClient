import React, { FC, useState, useEffect } from 'react';
import { isEqual } from 'lodash';

import { DragDropList } from '../../../../components';
import IconActionMore from './icon-action-mores';

type Props = {
    attribute: any;
    onTagsChange: Function;
};

const DragDropTags: FC<Props> = ({ attribute, onTagsChange }) => {
    const [tags, setTags] = useState<string[]>(attribute.tags);

    useEffect(() => {
        !isEqual(tags, attribute.tags) && onTagsChange(tags);
        // eslint-disable-next-line
    }, [tags]);

    useEffect(() => {
        setTags(attribute.tags);
    }, [attribute.tags]);

    const handleTagsMove = (dataTags: string[]) => {
        setTags(dataTags);
    };

    return (
        <div>
            <DragDropList
                accepts={[attribute._id]}
                dataSource={tags}
                onDragEnd={handleTagsMove}
                renderItem={(tag: any) => (
                    <span className="tag">
                        <IconActionMore />
                        <span>{tag}</span>
                    </span>
                )}
            />
        </div>
    );
};

export default DragDropTags;
