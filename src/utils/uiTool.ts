export const getScrollTop = (element?: HTMLElement) => {
    if (element) {
        return element.scrollTop;
    }

    return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
};

export const getScrollHeight = (element?: HTMLElement) => {
    if (element) {
        return element.scrollHeight;
    }

    return Math.max(document.documentElement.scrollHeight, document.body.scrollTop);
};

const preventDefaultTouchMove = (e: TouchEvent) => e.preventDefault();

export const preventScroll = (element: HTMLElement = document.documentElement) => {
    // eslint-disable-next-line
    element.addEventListener('touchmove', preventDefaultTouchMove, { passive: false });
};

export const allowScroll = (element: HTMLElement = document.documentElement) => {
    // eslint-disable-next-line
    element.removeEventListener('touchmove', preventDefaultTouchMove);
};
