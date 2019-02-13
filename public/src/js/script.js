(function () {
    var renderer = new PIXI.autoDetectRenderer('1900', '1730', {transparent: true});
    var stage = new PIXI.Container();
    var slidesContainer = new PIXI.Container();
    var displacementSprite = new PIXI.Sprite.fromImage('public/dist/img/clouds.jpg');
    var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

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
        renderer.resize(window.innerWidth, 810)

        displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

        stage.filters = [displacementFilter];

        displacementSprite.scale.x = 4;
        displacementSprite.scale.y = 4;
        displacementFilter.autoFit = true;

        stage.addChild(displacementSprite);
    };

    this.loadPixiSprite = function (sprites) {
        var texture = new PIXI.Texture.fromImage(document.querySelector('.header__background').getAttribute('src'));
        var image = new PIXI.Sprite(texture);

        slidesContainer.addChild(image);
    };

    var ticker = new PIXI.ticker.Ticker();
    ticker.autoStart = true;
    ticker.add(function (delta) {

        displacementSprite.x += 0.3 * delta;
        displacementSprite.y += 0.3;

        renderer.render(stage);
    });

    var mouseX = window.innerWidth / 2;
    var mouseY = 400;
    TweenLite.to(displacementFilter.scale, 1, {
        x: "+=" + Math.sin(mouseX) * 1200 + "",
        y: "+=" + Math.cos(mouseY) * 200 + ""
    });

    this.initPixi();
    this.loadPixiSprite();
})();


var jsSocialShares = document.querySelectorAll(".contact__item--share a");
if (jsSocialShares) {
    [].forEach.call(jsSocialShares, function(anchor) {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();

            windowPopup(this.href, 500, 400);
        });
    });
}

function windowPopup(url, width, height) {
    var left = (screen.width / 2) - (width / 2),
        top = (screen.height / 2) - (height / 2);

    window.open(
        url, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
    );
}