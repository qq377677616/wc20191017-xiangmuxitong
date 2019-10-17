if (/Android/gi.test(navigator.userAgent)) {
    const innerHeight = window.innerHeight;
    window.addEventListener('resize', () => {
        const newInnerHeight = window.innerHeight;
        console.log(innerHeight)
        console.log(newInnerHeight)
        if (innerHeight > newInnerHeight) {
            // 键盘弹出事件处理
            document.getElementsByClassName('contact-wrapper')[0].classList.add('pd-top')
            document.getElementById('footer-wrapper').style.display = 'none';
        } else {
            // 键盘收起事件处理
            document.getElementsByClassName('contact-wrapper')[0].classList.remove('pd-top')
            document.getElementById('footer-wrapper').style.display = 'inline-block';
        }
    });
} else {
    window.addEventListener('focusin', () => {
        // 键盘弹出事件处理
        // document.getElementsByClassName('contact-wrapper')[0].classList.add('pd-top')
        document.getElementById('footer-wrapper').style.display = 'none';
    });
    window.addEventListener('focusout', () => {
        // 键盘收起事件处理
        // document.getElementsByClassName('contact-wrapper')[0].classList.remove('pd-top')
        document.getElementById('footer-wrapper').style.display = 'inline-block';
    });
}

