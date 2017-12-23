// pixi-filters sample

import 'babel-polyfill'; // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import * as PIXI from 'pixi.js';
import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom';
import { GodrayFilter } from '@pixi/filter-godray';
import { ConvolutionFilter } from '@pixi/filter-convolution';

class Main {
  renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  stage: PIXI.Container;
  filters: {
    advancedBloomFilter: AdvancedBloomFilter,
    godray: GodrayFilter,
    convolution: ConvolutionFilter,
    blur: PIXI.filters.BlurFilter,
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
          convolution: new ConvolutionFilter([0, 0, 0, 1, 1, 1, 0, 0, 0], 300, 300),
          blur: new PIXI.filters.BlurFilter(),
        };
        this.filters.blur.quality = 2.5;

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
    const heightRate = window.pageYOffset / document.body.getBoundingClientRect().height;
    this.filters.advancedBloomFilter.threshold = 1 - heightRate;
    this.filters.godray.gain = window.pageYOffset / document.body.getBoundingClientRect().height;
    this.filters.convolution.width = 500 - (heightRate * 499);
    this.filters.blur.blur = heightRate * 10;
    this.updateRenderer();
  }

  updateRenderer() {
    this.renderer.render(this.stage);
  }
}

const main = new Main();
window.addEventListener('DOMContentLoaded', main.onDOMContentLoaded);
