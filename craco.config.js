const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            // antd
                            // '@primary-color': '#1DA57A'
                            '@font-family': 'Roboto, sans-serif',
                            // colors
                            '@color_primary': '#307dd2',
                            '@success-color': '#23ad44',
                            '@color_secondary': '#4267b2',
                            '@color_border': '#e9ebee',
                            '@color_light': '#f5f6f7',
                            '@color_sidebar_bg': ' #1a2d41',
                            '@color_sidebar_bg_hover': '#3d485a',
                            '@color_sidebar_color': '#a3abbb',
                            '@color_sidebar_color_hover': '#dcddec',
                            '@color_sidebar_customer_trial': '#f50',
                            '@color_sidebar_customer_premium': '#87d068',
                            '@text-color': '#101025',
                            '@color-border': '#e9ebee',
                            '@color_delivery': '#23b7e5',
                            '@color_success': '#23ad44',
                            '@color_danger': '#f05050',
                            '@color_warning': '#ffcd07',
                            '@color_form_header': '#f6f8f8',
                            '@color_text_bold': '#1a2d41',
                            '@color_text_black': '#000000',
                            '@color_text_white': '#ffffff',
                            '@background_gray': '#efefef',
                            '@background_purple': '#6c6fbf',
                            '@background_primary': '#0872d7',
                            '@border_color': '#dee5e7',
                            '@text_color': '#525253',
                            '@scrollbar_color': '#7a7c7e',
                            '@cool-grey': '#99a6ad',

                            // dark theme
                            '@menu-dark-color': '#7ca1bb',
                            '@menu-dark-arrow-color': '#7ca1bb',
                            '@layout-sider-background': '#1a2d41',
                            '@menu-dark-bg': '#1a2d41',
                            '@menu-dark-submenu-bg': '#1a2d41',
                            '@menu-dark-item-active-bg': '#142333',

                            '@height-sm': '28px',
                            '@btn-height-base': '38px',
                            '@input-height-base': '38px',
                            //  sizes
                            '@size_container': '1200px',
                            '@size_space': '15px',
                            '@size_border_radius': '5px',
                            '@size_header': '63px',
                            '@size-space': '16px',
                            '@size_input_height': '38px',
                            '@size_modal_with_card_height': '48px',

                            // spacing
                            '@spacing_m': '16px',
                            '@spacing_s': '18px',

                            '@heading-4-size': '18px',
                            //  modal
                            '@modal-header-bg': '#f6f6f8',
                            '@modal-body-padding': '16px 20px',
                            // card
                            '@card-head-height': '48px',
                            '@card-head-padding': '12px',
                            '@heading-color': '#101025',

                            // '@checkbox-size': '24px',
                            // '@radio-size': '24px',

                            '@font_size_title': '16px',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
