import 'babel-polyfill'; // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import * as PIXI from 'pixi.js';

const loadImages = [
  { name: 'a', url: '1.png' },
  { name: 'b', url: '2.png' },
  { name: 'c', url: '3.png' },
  { name: 'tile', url: 'tileset.png' },
];

window.addEventListener('DOMContentLoaded', () => {
  const type = PIXI.utils.isWebGLSupported() ? 'WebGL' : 'canvas';
  PIXI.utils.sayHello(type);

  const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
  const stage = new PIXI.Container();
  renderer.render(stage);

  setTimeout(() => {
    PIXI.loader
      .add(loadImages)
      .on('progress', (loader, resource) => {
        console.log('loading:', resource.name);
        console.log('progress:', loader.progress + '%');
      })
      .load(() => {
        Object.values(PIXI.loader.resources).forEach((resource, i) => {
          if (resource.name === 'tile') {
            resource.texture.frame = new PIXI.Rectangle(192, 128, 64, 64);
            const sprite = new PIXI.Sprite(resource.texture);
            sprite.position.set(i * 300, i * 200);  // shorthand
            stage.addChild(sprite);

            const move = () => {
              requestAnimationFrame(move);
              sprite.x += 1;
              renderer.render(stage);
            };
            move();
          } else {
            const sprite = new PIXI.Sprite(resource.texture);
            // sprite.x = i * 300;
            // sprite.y = i * 200;
            sprite.position.set(i * 300, i * 200);  // shorthand

            // sprite.width = sprite.width / (i + 1);
            // sprite.height = sprite.height / (i + 1);
            sprite.scale.set(1 / (i + 1), 1 / (i + 1)); // relative mode

            sprite.rotation = 1 / (i + 1);  // radian
            // sprite.anchor.x = 0.8;
            // sprite.anchor.y = 0.6;
            sprite.anchor.set(0.3, 0.2);  // shorthand
            stage.addChild(sprite);
          }

          renderer.render(stage);

          // remove
          // setTimeout(() => {
          //   stage.removeChild(sprite);
          //   // sprite.visible = false;  // or...
          //   renderer.render(stage);
          // }, (loadImages.length - i) * 500);
        });
      });

    (renderer as any).backgroundColor = 0xf61639;
    renderer.autoResize = true;
    renderer.render(stage);
  }, 1000);

  document.body.appendChild(renderer.view);
});
