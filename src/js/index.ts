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
        const container = new PIXI.Container();
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
            container.addChild(sprite);
          }

          // remove
          // setTimeout(() => {
          //   stage.removeChild(sprite);
          //   // sprite.visible = false;  // or...
          //   renderer.render(stage);
          // }, (loadImages.length - i) * 500);
        });

        stage.addChild(container);
        console.log('Local position:', container.children[1].position);
        console.log('Global position:', container.children[1].toGlobal(container.children[1].position));
        container.position.set(400, 80);
        renderer.render(stage);
      });

    /*
     * Generate graphics
     */
    const graphicContainer = new PIXI.Container();
    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(0x290ff8);
    rectangle.lineStyle(5, 0x000000, 0.8);
    rectangle.drawRect(0, 0, 100, 100);
    rectangle.drawCircle(0, 0, 32);
    rectangle.endFill();
    rectangle.position.set(renderer.width - 300, renderer.height - 150);
    graphicContainer.addChild(rectangle);

    const circle = new PIXI.Graphics();
    circle.beginFill(0x99f152);
    circle.lineStyle(10, 0xffffff, 0.3);
    circle.drawCircle(0, 0, 32);
    circle.endFill();
    circle.position.set(renderer.width - 400, renderer.height - 350);
    graphicContainer.addChild(circle);

    const roundBox = new PIXI.Graphics();
    roundBox.lineStyle(4, 0x99CCFF, 1);
    roundBox.beginFill(0xFF9933);
    roundBox.drawRoundedRect(0, 0, 84, 36, 10);
    roundBox.endFill();
    roundBox.position.set(renderer.width - 500, renderer.height - 350);
    graphicContainer.addChild(roundBox);

    const line = new PIXI.Graphics();
    line.lineStyle(4, 0xFFFFFF, 1);
    line.moveTo(0, 0);
    line.lineTo(80, 50);
    line.moveTo(80, 100);
    line.lineTo(100, 50);
    line.position.set(renderer.width - 600, renderer.height - 350);
    graphicContainer.addChild(line);

    const triangle = new PIXI.Graphics();
    triangle.beginFill(0x66DD33);
    triangle.drawPolygon([
        -32, 64, // First point
        32, 64,  // Second point
        0, 0,     // Third point
    ]);
    triangle.endFill();
    triangle.position.set(renderer.width - 650, renderer.height - 200);
    graphicContainer.addChild(triangle);

    stage.addChild(graphicContainer);

    /*
     * text
     */
    const textContainer = new PIXI.Container();

    const message = new PIXI.Text(
      `Hello Pixi! ${new Date()}`,
      { fontFamily: 'Impact', fontSize: 32, fill: 0xe3d1f4, letterSpacing: 10 },
    );

    const updateMessage = () => {
      const now = new Date();
      message.text = `Hello Pixi! ${now} ${now.getMilliseconds()}`;
      renderer.render(stage);
      requestAnimationFrame(updateMessage);
    };

    updateMessage();

    message.anchor.set(0, 1);
    message.position.set(0, renderer.height);
    textContainer.addChild(message);

    stage.addChild(textContainer);

    (renderer as any).backgroundColor = 0xf61639;
    renderer.autoResize = true;
    renderer.render(stage);
  }, 1000);

  document.body.appendChild(renderer.view);
});
