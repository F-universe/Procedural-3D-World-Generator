export default class Noise {
  constructor() {
    this.noise = new Noise(); // global from noisejs
  }
  perlin(x, _y, z) {
    return this.noise.perlin2(x, z);
  }
}
