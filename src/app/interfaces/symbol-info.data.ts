import {TagInfo} from './tag-info.data';
export interface SymbolInfo {
    symbolId: string;
    symbolType: string;
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
