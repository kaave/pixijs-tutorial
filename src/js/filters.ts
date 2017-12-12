import 'babel-polyfill'; // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import * as PIXI from 'pixi.js';
import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom';
import { GodrayFilter } from '@pixi/filter-godray';

class Main {
  renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  stage: PIXI.Container;
  filters: {
    advancedBloomFilter: AdvancedBloomFilter,
    godray: GodrayFilter,
  };

  constructor() {
    this.onDOMContentLoaded = this.onDOMContentLoaded.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  onDOMContentLoaded() {
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    this.stage = new PIXI.Container();

    PIXI.loader
      .add({ name: 'unsplash', url: '4.jpg' })
      .load(() => {
        const container = new PIXI.Container();
        Object.values(PIXI.loader.resources).forEach((resource, i) => {
          const sprite = new PIXI.Sprite(resource.texture);
          sprite.position.set(0, 0);
          sprite.width = this.renderer.width;
          sprite.height = this.renderer.height;
          container.addChild(sprite);
        });
        this.filters = {
          advancedBloomFilter: new AdvancedBloomFilter(),
          godray: new GodrayFilter(),
        };

        container.filters = Object.values(this.filters);
        this.stage.addChild(container);
        this.updateFilter();
        this.updateRenderer();
        window.addEventListener('scroll', this.onScroll);
      });

    this.renderer.autoResize = true;

    document.body.appendChild(this.renderer.view);
  }

  onScroll() {
    this.updateFilter();
  }

  updateFilter() {
    this.filters.advancedBloomFilter.threshold = 1 - (window.pageYOffset / document.body.getBoundingClientRect().height);
    this.filters.godray.gain = window.pageYOffset / document.body.getBoundingClientRect().height;
    this.updateRenderer();
  }

  updateRenderer() {
    this.renderer.render(this.stage);
  }
}

const main = new Main();
window.addEventListener('DOMContentLoaded', main.onDOMContentLoaded);
