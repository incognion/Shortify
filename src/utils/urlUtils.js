export const isValidUrl = (urlString) => {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' +
        '((([a-z0-9](?!-)[a-z0-9-]{0,61}[a-z0-9])\\.)+[a-z]{2,6}|' +
        'localhost|' +
        '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' +
        '\\[?[a-fA-F0-9]*:[a-fA-F0-9:]+\\]?)' +
        '(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)*$',
        'i'
    );
    return !!pattern.test(urlString);
};
