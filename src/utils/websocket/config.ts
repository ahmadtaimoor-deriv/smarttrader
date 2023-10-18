export const domain_app_ids = {
    'smarttrader.deriv.app': 22168,
    'smarttrader.deriv.com': 22168,
    'smarttrader.deriv.me': 27315,
    'smarttrader.deriv.be': 31224,
    'staging-smarttrader.deriv.be': 31191,
    'staging-smarttrader.deriv.com': 22169,
};

export const getAppId = () => {
    let app_id = null;
    const user_endpoint_app_id = ''; // you can insert Application ID of your registered application here
    const config_app_id = window.localStorage.getItem('config.app_id');
    if (config_app_id) {
        app_id = config_app_id;
    } else if (/smarttrader-staging\.deriv\.app/i.test(window.location.hostname)) {
        // TODO: [app-link-refactor] - Remove backwards compatibility for `deriv.app`
        window.localStorage.removeItem('config.default_app_id');
        app_id = 22169;
    } else if (/staging-smarttrader\.deriv\.com/i.test(window.location.hostname)) {
        window.localStorage.removeItem('config.default_app_id');
        app_id = 22169;
    } else if (/staging-smarttrader\.deriv\.app/i.test(window.location.hostname)) {
        // TODO: [app-link-refactor] - Remove backwards compatibility for `deriv.app`
        window.localStorage.removeItem('config.default_app_id');
        app_id = 22169;
    } else if (user_endpoint_app_id.length) {
        window.localStorage.setItem('config.default_app_id', user_endpoint_app_id); // it's being used in endpoint chrome extension - please do not remove
        app_id = user_endpoint_app_id;
    } else if (/localhost/i.test(window.location.hostname)) {
        app_id = 39852;
    } else {
        window.localStorage.removeItem('config.default_app_id');
        const current_domain = getCurrentDomain();
        // TODO: remove is_new_app && deriv.com check when repos are split
        app_id =
            current_domain !== 'deriv.com'
                ? 22168
                : domain_app_ids[current_domain as keyof typeof domain_app_ids] || 22168;
    }
    return app_id;
};

export const getCurrentDomain = () =>
    Object.keys(domain_app_ids).find(
        domain => domain === window.location.hostname || `www.${domain}` === window.location.hostname
    );

export const getSocketURL = () => {
    const local_storage_server_url = window.localStorage.getItem('config.server_url');
    if (local_storage_server_url) return local_storage_server_url;

    let active_loginid_from_url;
    const search = window.location.search;
    if (search) {
        const params = new URLSearchParams(document.location.search.substring(1));
        active_loginid_from_url = params.get('acct1');
    }

    const loginid = window.localStorage.getItem('active_loginid') || active_loginid_from_url;
    const is_real = loginid && !/^(VRT|VRW|VRTC)/.test(loginid);

    const server = is_real ? 'green' : 'blue';
    const server_url = `${server}.binaryws.com`;

    return server_url;
};
