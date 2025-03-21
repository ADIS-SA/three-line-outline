import { Color, GreaterDepth, ShaderMaterial } from 'three'
import vertexShader from './glsl/outline.vert'
import fragmentShader from './glsl/outline.frag'

export class OutlineMaterial extends ShaderMaterial {
  private _angleThreshold: number

  constructor(angleThreshold = 0, outline = true, color = '#ffffff') {
    super({
      vertexShader,
      fragmentShader,
      depthTest: true,
      depthFunc: GreaterDepth,
      depthWrite: false,
      uniforms: {
        uAngleThresh: { value: angleThreshold },
        uOutline: { value: Number(outline) },
        uColor: { value: new Color(color) },
      },
    })

    this._angleThreshold = angleThreshold
    this.angleThreshold = angleThreshold
  }

  set angleThreshold(degrees: number) {
    this._angleThreshold = degrees
    this.uniforms.uAngleThresh.value = ((degrees / 180) * Math.PI) % Math.PI
  }
  get angleThreshold(): number {
    return this._angleThreshold
  }

  set outline(outline: boolean) {
    this.uniforms.uOutline.value = Number(outline)
  }
  get outline(): boolean {
    return Boolean(this.uniforms.uOutline.value)
  }

  get color(): Color {
    return this.uniforms.uColor.value
  }
}
