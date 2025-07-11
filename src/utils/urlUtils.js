export const isValidUrl = (urlString) => {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // Optional (http or https)
        '(([a-z0-9](?!-)[a-z0-9-]{0,61}[a-z0-9]\\.)+[a-z]{2,6})' + // Domain
        '(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)*$', // Optional path
        'i' // Case-insensitive
    );
    return !!pattern.test(urlString);
};
