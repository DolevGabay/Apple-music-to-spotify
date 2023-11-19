export const login = (platform, tokens) => ({
    type: 'LOGIN',
    service: platform,
    token: tokens
});

export const logout = (platform) => ({
    type: 'LOGOUT',
    service: platform
});