

class NPCtraits {
  public will: number;
  public libido: number;
  public open: number;
  public vert: number;
  public diq: number;
  public iq: number;
  public op: boolean;
  public cl: boolean;
  public intro: boolean;
  public extro: boolean;
  public sexuality: number;
  public straight: boolean;
  public bi: boolean;
  public homo: boolean;
  public bitch: number;
  public lowEsteem: number;
  public _k: string;
  constructor(key, {
    will,
    libido,
    open,
    vert,
    diq,
    iq,
    op,
    cl,
    intro,
    extro,
    sexuality,
    straight,
    bi,
    homo,
    bitch,
    lowEsteem,
  }: DataTrait) {
    this._k = key;
    this.will = will;
    this.libido = libido;
    this.open = open;
    this.vert = vert;
    this.diq = diq;
    this.iq = iq;
    this.op = op;
    this.cl = cl;
    this.intro = intro;
    this.extro = extro;
    this.sexuality = sexuality;
    this.straight = straight;
    this.bi = bi;
    this.homo = homo;
    this.bitch = bitch;
    this.lowEsteem = lowEsteem;
  }
}

