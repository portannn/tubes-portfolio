/**
 * A tiny spring integrator for pointer-driven effects.
 *
 * Each channel is pulled toward its target by a damped spring, so motion is continuous and
 * frame-rate independent (a CSS transition restarts on every pointer move, a spring does not).
 * The loop runs only while something is still moving, then stops by itself.
 *
 *   const spring = createSpring(3, ([x, y, hover]) => { ...write CSS variables... })
 *   spring.to([0.4, -0.2, 1], { k: 520, c: 34 })   // stiff, nearly critically damped: glued to the cursor
 *   spring.to([0, 0, 0], { k: 190, c: 11 })        // loose and underdamped: overshoots, then settles
 *   spring.stop()
 *
 * k = stiffness, c = damping. Damping ratio = c / (2 * sqrt(k)); below 1 it overshoots.
 */
export function createSpring(size, onFrame) {
  const pos = new Array(size).fill(0)
  const vel = new Array(size).fill(0)
  const target = new Array(size).fill(0)
  let k = 400
  let c = 30
  let raf = 0
  let last = 0

  function step(now) {
    const dt = Math.min((now - last) / 1000, 1 / 30) // never integrate a huge gap (tab switch)
    last = now
    const sub = 2 // two sub-steps keep the stiff setting stable
    const h = dt / sub
    for (let s = 0; s < sub; s++) {
      for (let i = 0; i < size; i++) {
        const a = k * (target[i] - pos[i]) - c * vel[i]
        vel[i] += a * h
        pos[i] += vel[i] * h
      }
    }

    let moving = false
    for (let i = 0; i < size; i++) {
      if (Math.abs(target[i] - pos[i]) > 0.0008 || Math.abs(vel[i]) > 0.004) {
        moving = true
        break
      }
    }

    if (moving) {
      onFrame(pos)
      raf = requestAnimationFrame(step)
    } else {
      for (let i = 0; i < size; i++) {
        pos[i] = target[i]
        vel[i] = 0
      }
      onFrame(pos)
      raf = 0
    }
  }

  function wake() {
    if (raf) return
    last = performance.now()
    raf = requestAnimationFrame(step)
  }

  return {
    /** Set new targets (and optionally new spring parameters), and start the loop if it is idle. */
    to(values, params) {
      for (let i = 0; i < size; i++) target[i] = values[i]
      if (params) {
        k = params.k
        c = params.c
      }
      wake()
    },
    stop() {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    },
  }
}
