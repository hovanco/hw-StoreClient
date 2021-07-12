export const API_URI = process.env.REACT_APP_API_URI as string;
export const NOTIFICATION_SERVER_URI = process.env.REACT_APP_NOTIFICATION_SERVER_URI as string;
export const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID as string;
export const FACEBOOK_SCOPE =
    'pages_manage_metadata,pages_read_engagement,pages_read_user_content,pages_messaging, pages_manage_engagement, pages_manage_posts';

export const GOOGLE_APP_ID = process.env.REACT_APP_GOOGLE_APP_ID as string;
export const SOCIAL_NETWORK_PATH = '/social-network';
export const SOCIAL_NETWORK_VER = 'v1';

export const IMG_URL = process.env.REACT_APP_IMG_URL as string;
export const FACEBOOK_URL = process.env.REACT_APP_FACEBOOK_URL as string;
export const POS_URL = process.env.REACT_APP_POS_URL as string;
export const SHOPEE_URL = process.env.REACT_APP_SHOPEE_URL as string;

// if (!API_URI || !NOTIFICATION_SERVER_URI || !FACEBOOK_SCOPE || !IMG_URL)
//     throw new Error('Missing required env');
