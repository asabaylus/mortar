import {Pestle} from '@natgeo/pestle';
import $ from 'jquery';
import _debounce from 'lodash/debounce';

//interval at which page will update parallax positions (in milliseconds)
const updateScrollInterval = 10;
const updateDocHeightInterval = 3000;

let i = 0;
let cachedScrollTop = null
let cachedRelativeScrollPosition = null;

module.exports = class ParallaxSceneManager {

  constructor(options) {
    this.pageConfig = {
      $document: $(document),
      $window: $(window),
      scrollTop: 0,
      documentHeight: null,
      viewportHeight: null
    };
    this.onResize = this.onResize.bind(this);
    this.scenes = [];
    this.updateScrollInterval = null;
  }

  resetPageMeasurements() {
    this.pageConfig.viewportHeight = this.pageConfig.$window.height();
  }

  addParallaxScene(msg, config) {
    const defaults = {
      scrollTop: null,
      scrollTopElement: $(config.triggerElement)
    }

    config = Object.assign(config, defaults);


    config["fixedWidth"] = config.parallaxElement.getBoundingClientRect().width;
    config.parallaxElement = $(config.parallaxElement);
    config.parallaxElement.css("width", config.fixedWidth);
    config.parallaxElement.addClass("mt3_parallax-wrap--active");

    this.scenes.push(this.updateScene(config));

    //if this is the first scene, start the interval for page updates
    if(this.scenes.length === 1) {
      this.updateScrollInterval = setInterval(this.updatePage.bind(this), updateScrollInterval);
      this.updateDocHeightInterval = setInterval(this.updateDocHeight.bind(this), updateDocHeightInterval);
    }

    this.checkForUpdates(true);
  }

  //check which scenes need an update
  checkForUpdates(forceUpdate) {
    if(!forceUpdate && this.pageConfig.scrollTop === cachedScrollTop) {
      return;
    } else {
      cachedScrollTop = this.pageConfig.scrollTop;
    }

    for(let scene of this.scenes) {
      if(!scene.scrollTop) {
        return;
      }
      let scrollTop = this.pageConfig.scrollTop

      if(scene.onEnterViewport) {
        scrollTop += this.pageConfig.viewportHeight;
      }

      if(scrollTop > scene.scrollTop + scene.duration) {
        if(scene.status !== "below") {
          scene.parallaxElement.removeClass("mt3_parallax-wrap--fixed");
          scene.status = "below";
          this.animateElement(scene, "below", scrollTop);
        }
      } else if (scrollTop < scene.scrollTop) {
        if(scene.status !== "above") {
          scene.parallaxElement.removeClass("mt3_parallax-wrap--fixed");
          scene.status = "above";
          this.animateElement(scene, "above", scrollTop);
        }
      } else {
        if(scene.status !== "active") {
          if(scene.translationOffset) {
            scene.parallaxElement.css("top",scene.translationOffset);
          }
          scene.parallaxElement.addClass("mt3_parallax-wrap--fixed");
          scene.status = "active";
        }

        this.animateElement(scene, "active", scrollTop);
      }
    }
  }

  animateElement(scene, pos, scrollTop) {
    let transformPixelValue = 0;

    if(pos === "active") {
      const relativeScrollPercentage = (scrollTop - scene.scrollTop) / scene.duration;

      //don't do anything If scrollpercentage hasn't changed
      if (relativeScrollPercentage === cachedRelativeScrollPosition) {
        return;
      } else {
        cachedRelativeScrollPosition = relativeScrollPercentage;
      }

      //"pin after percentage" prop supports 2-part animations where the element becomes pinned after an initial movement
      if (scene.pinAfterPercentage) {
        let initialAnimationPercentage = 1;

        if(relativeScrollPercentage <= scene.pinAfterPercentage) {
          initialAnimationPercentage = (scrollTop - scene.scrollTop) / (scene.duration * scene.pinAfterPercentage);
        }
        transformPixelValue = (Math.round(1000 * initialAnimationPercentage  * scene.transformDistance))/1000;
      } else {
        let fixedTransformDifference = scene.duration - scene.transformDistance;

        transformPixelValue = 0 - (Math.round(1000 * relativeScrollPercentage * fixedTransformDifference))/1000;
      }

    } else if (pos === "below") {
      transformPixelValue = scene.bottomPositionOverride ? scene.bottomPositionOverride : scene.transformDistance;
    }

    scene.parallaxElement.css({
      'transform':    'translate3d(0px, ' + transformPixelValue + 'px, 0px)'
    })
  }

  updateScene(scene) {
    scene.scrollTop = scene.scrollTopElement.offset().top;

    return scene;
  }

  updateScrollTop() {
    this.pageConfig.scrollTop = this.pageConfig.$window.scrollTop();
  }

  //this function will be called at an interval (though less often than the "updatePage" function) to check if new measurements are needed
  updateDocHeight() {
    //check doc height
    const newDocHeight = this.pageConfig.$document.height()

    //if the doc's height has changed, reset parallax measurements wholesale (like a resize event)
    if(newDocHeight !== this.pageConfig.documentHeight) {
      this.pageConfig.documentHeight = newDocHeight;

      //keep reference to scenes before destroying them
      let scenesCached = this.scenes;

      //the resize handler will destroy the scenes array
      this.onResize();

      // call scene resize listeners manually
      if(scenesCached.length) {
        for(let scene of scenesCached) {
          if(scene.resetFunction) {
            scene.resetFunction();
          }
        }
      }
    }
  }

  //this is the function that is called most often. it should only update the page-wide scrollTop value, and check each scene for resulting updates
  updatePage() {
    window.requestAnimationFrame(() => {
      this.updateScrollTop()
      this.checkForUpdates();
    });

  }

  onResize() {
    //on resize events, the parallax scene manager will reset itself, and rely on child components to re-init
    if(this.updateScrollInterval) {
      clearInterval(this.updateScrollInterval);
    }
    if(this.updateDocHeightInterval) {
      clearInterval(this.updateDocHeightInterval);
    }
    if (this.scenes.length) {
      for(let scene of this.scenes) {
        scene.parallaxElement.removeAttr("style")
        scene.parallaxElement.removeClass("mt3_parallax-wrap--active").removeClass("mt3_parallax-wrap--fixed")
      }
      this.scenes = [];
    }

    this.resetPageMeasurements();
  }


  init() {
    this.resetPageMeasurements();
    Pestle.PubSub.subscribe('ParallaxScenes.addParallaxScene', this.addParallaxScene.bind(this));
    this.resizeHandler = _debounce(this.onResize, 249);
    window.addEventListener('resize', this.resizeHandler);
  }
};
