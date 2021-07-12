import React, { useEffect } from 'react';
import HomepageContent from './homepage-content';
import { ProviderUserGuide } from './state';
import './style.less';

function Homepage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <ProviderUserGuide>
            <HomepageContent />
        </ProviderUserGuide>
    );
}

export default Homepage;
