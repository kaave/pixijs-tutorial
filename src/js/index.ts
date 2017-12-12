import 'babel-polyfill'; // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import * as PIXI from 'pixi.js';

const loadImages = [
  { name: 'a', url: '1.png' },
  { name: 'b', url: '2.png' },
  { name: 'c', url: '3.png' },
  { name: 'tile', url: 'tileset.png' },
];

window.addEventListener('DOMContentLoaded', () => {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  const texture = PIXI.Texture.fromImage(loadImages[0].url);

  /*
   * tile pattern sprite
   */
  const tilingSprite = new PIXI.extras.TilingSprite(
    texture,
    app.renderer.width,
    app.renderer.height,
  );
  app.stage.addChild(tilingSprite);
  // tilingSprite.tileScale.set(2 + Math.sin(count), 2 + Math.cos(count));
  // tilingSprite.tilePosition.x += 1;
  // tilingSprite.tilePosition.y += 1;
});
