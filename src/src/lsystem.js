export class LSystem {
  constructor(axiom, rules, iterations) {
    this.axiom = axiom; this.rules = rules; this.iterations = iterations;
  }
  generate() {
    let str = this.axiom;
    for (let i = 0; i < this.iterations; i++) {
      str = [...str].map(c => this.rules[c] || c).join('');
    }
    return str;
  }
}
export function interpretTurtle(scene, commands, length, angle) {
  const stack = [];
  let pos = new THREE.Vector3(), dir = new THREE.Vector3(0,1,0), quat = new THREE.Quaternion();
  const mat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
  for (const c of commands) switch (c) {
    case 'F': {
      const geo = new THREE.CylinderGeometry(0.1,0.1,length,8);
      const m = new THREE.Mesh(geo, mat);
      m.position.copy(pos.clone().add(dir.clone().multiplyScalar(length/2)));
      m.quaternion.copy(quat).rotateX(Math.PI/2);
      scene.add(m);
      pos.add(dir.clone().multiplyScalar(length));
      break;
    }
    case '+': {
      const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1), THREE.MathUtils.degToRad(angle));
      quat.multiply(q); dir.applyQuaternion(q);
      break;
    }
    case '-': {
      const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1), THREE.MathUtils.degToRad(-angle));
      quat.multiply(q); dir.applyQuaternion(q);
      break;
    }
    case '[':
      stack.push({ pos: pos.clone(), dir: dir.clone(), quat: quat.clone() });
      break;
    case ']': {
      const s = stack.pop();
      pos = s.pos; dir = s.dir; quat = s.quat;
      break;
    }
  }
}
