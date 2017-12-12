import 'babel-polyfill'; // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import * as PIXI from 'pixi.js';

window.addEventListener('DOMContentLoaded', () => {
  const type = PIXI.utils.isWebGLSupported() ? 'WebGL' : 'canvas';
  PIXI.utils.sayHello(type);

  const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
  const stage = new PIXI.Container();
  renderer.render(stage);

  setTimeout(() => {
    PIXI.loader
      .add({ name: 'unsplash', url: '4.jpg' })
      .on('progress', (loader, resource) => {
        console.log('loading:', resource.name);
        console.log('progress:', loader.progress + '%');
      })
      .load(() => {
        const container = new PIXI.Container();
        Object.values(PIXI.loader.resources).forEach((resource, i) => {
          const sprite = new PIXI.Sprite(resource.texture);
          sprite.position.set(0, 0);
          sprite.width = renderer.width;
          sprite.height = renderer.height;
          container.addChild(sprite);
        });

        stage.addChild(container);
        renderer.render(stage);
      });

    renderer.autoResize = true;
    renderer.render(stage);
  }, 1000);

  document.body.appendChild(renderer.view);
});
