import {TagInfo} from './tag-info.data';
export interface SymbolInfo {
    symbolId: string;
    symbolType: string;
    viewBox: string;
    viewBoxHeight: number;
    viewBoxWidth: number;
    tagId: string;
    tagName: string;
    positionXRatio: number;
    positionYRatio: number;
    positionX: number;
    positionY: number;
    widthRatio: number;
    svgWidth: number;
    strokeRGB: string;
    isFocus: boolean;
    tagInfo: TagInfo;
}
