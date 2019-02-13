(function () {
    let renderer = new PIXI.autoDetectRenderer('1920', '1080', {transparent: true});
    let stage = new PIXI.Container();
    let slidesContainer = new PIXI.Container();
    let displacementSprite = new PIXI.Sprite.fromImage('public/dist/img/clouds.jpg');
    let displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

    this.initPixi = function () {
        document.body.appendChild(renderer.view);
        stage.addChild(slidesContainer);

        renderer.view.style.objectFit = 'cover';
        renderer.view.style.width = '100%';
        renderer.view.style.height = '100%';
        renderer.view.style.top = '50%';
        renderer.view.style.left = '50%';
        renderer.view.style.webkitTransform = 'translate( -50%, -50% )';
        renderer.view.style.transform = 'translate( -50%, -50% )';
        renderer.resize(window.innerWidth, 810);

        displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

        stage.filters = [displacementFilter];

        displacementSprite.scale.x = 4;
        displacementSprite.scale.y = 4;
        displacementFilter.autoFit = true;

        stage.addChild(displacementSprite);
    };

    this.loadPixiSprite = function (sprites) {
        let texture = new PIXI.Texture.fromImage(document.querySelector('.header__background').getAttribute('src'));
        let image = new PIXI.Sprite(texture);

        slidesContainer.addChild(image);
    };

    let ticker = new PIXI.ticker.Ticker();
    ticker.autoStart = true;
    ticker.add(function (delta) {
        displacementSprite.x += 0.3 * delta;
        displacementSprite.y += 0.3;

        renderer.render(stage);
    });

    let mouseX = window.innerWidth / 2;
    let mouseY = 100;
    TweenLite.to(displacementFilter.scale, 1, {
        x: "+=" + Math.sin(mouseX) * 1200 + "",
        y: "+=" + Math.cos(mouseY) * 200 + ""
    });

    this.initPixi();
    this.loadPixiSprite();
})();

(function () {
    let anchorlinks = document.querySelectorAll('a[href^="#"]')

    for (let item of anchorlinks) {
        item.addEventListener('click', (e) => {
            let hashval = item.getAttribute('href');
            let target = document.querySelector(hashval);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            e.preventDefault();
        })
    }
})();