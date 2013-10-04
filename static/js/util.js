function decode(data) {
    return JSON.parse(window.atob(data));
}