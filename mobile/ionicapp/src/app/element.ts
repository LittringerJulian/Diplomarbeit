import { Color } from 'ngx-color';

export class Element {
  identifier: string;
  specification: string;
  posx: number;
  posy: number;
  percentagex: number;
  percentagey: number;
  width: number;
  height: number;
  color: Color;
  rgbaColor: string;
  shortcut: any[];
  circle: Boolean

  constructor(identifier: string, specification: string, posx: number, posy: number, percentagex: number,
    percentagey: number, width: number, height: number, color: Color, rgbaColor: string,
    shortcut: any[], circle: Boolean) {
    this.identifier = identifier;
    this.specification = specification;
    this.posx = posx;
    this.posy = posy;
    this.percentagex = percentagex;
    this.percentagey = percentagey;
    this.width = width;
    this.height = height;
    this.color = color
    this.rgbaColor = rgbaColor
    this.shortcut = shortcut
    this.circle = circle
  }
}
