export interface ContentModel {
  fields: VerticalVideoList;
}

export interface VerticalVideoList {
  count?: number;
  layout: keyof typeof Layout;
  moreButtonTitle?: string;
  size: keyof typeof Size;
  sortOrder: number;
  tileType: keyof typeof TileType;
  title?: string;
  videoType: keyof typeof VideoType;
  categories?: string[];
  collection?: string;
  internalTitle: string;
  id: string;
}

export enum Layout {
  'row' = 'row',
  'grid' = 'grid',
}

export enum Size {
  'regular' = 'regular',
  'medium' = 'medium',
  'large' = 'large',
}

export enum TileType {
  'round' = 'round',
  'rectangular' = 'rectangular',
}

export enum VideoType {
  'stories' = 'stories',
  'clips' = 'clips',
}
