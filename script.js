window.onload = () => {
    const image = document.getElementById("image");
    const slider = document.getElementById("zoom");
    const main = document.getElementById("main");
    const main_width = main.offsetWidth;
    const main_height = main.offsetHeight;
    image.width = main_width;
    image.height = main_height;
    let prev_scroll_top;
    let prev_scroll_left;
    let zooming = false;
    let moved = false;
    let zoom_value;
    function zoom_image() {
        zooming = true;
        zoom_value = parseInt(this.value);
        const new_width = main_width + zoom_value * 10;
        const new_height = main_height + zoom_value * 10;
        image.style.width = `${new_width}px`;
        image.style.height = `${new_height}px`;
        if (zoom_value < 1) moved = false;
        if (moved) {
            main.scrollTop = prev_scroll_top;
            main.scrollLeft = prev_scroll_left;
        } else {
            main.scrollLeft = main.scrollWidth / 2 - main_width / 2;
            main.scrollTop = main.scrollHeight / 2 - main_height / 2;
        }
    }
    slider.oninput = zoom_image;
    function handle_scroll(e) {
        if (!zooming && zoom_value > 0) {
            moved = true;
            prev_scroll_top = main.scrollTop;
            prev_scroll_left = main.scrollLeft;
        }
        zooming = false;
    }
    main.onscroll = handle_scroll;
    let startY;
    let startX;
    let scrollLeft;
    let scrollTop;
    let isDown;
    main.addEventListener('mousedown', e => mouseIsDown(e));
    main.addEventListener('mouseup', e => mouseUp(e))
    main.addEventListener('mouseleave', e => mouseLeave(e));
    main.addEventListener('mousemove', e => mouseMove(e));
    function mouseIsDown(e) {
        isDown = true;
        startY = e.pageY - main.offsetTop;
        startX = e.pageX - main.offsetLeft;
        scrollLeft = main.scrollLeft;
        scrollTop = main.scrollTop;
    }
    function mouseUp(e) {
        isDown = false;
    }
    function mouseLeave(e) {
        isDown = false;
    }
    function mouseMove(e) {
        if (isDown) {
            e.preventDefault();
            const y = e.pageY - main.offsetTop;
            const walkY = y - startY;
            main.scrollTop = scrollTop - walkY;
            const x = e.pageX - main.offsetLeft;
            const walkX = x - startX;
            main.scrollLeft = scrollLeft - walkX;

        }
    }
}