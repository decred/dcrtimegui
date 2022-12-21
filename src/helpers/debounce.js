const debounce = (func) => {
    let timer;
    return function (e) {
        e.preventDefault();
        if (timer) clearTimeout(timer);
        timer = setTimeout(async () => {
            timer = null;
            await func(e);
        }, 500);
    };
};

export default debounce;