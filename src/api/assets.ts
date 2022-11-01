export interface AssetsModel {
  id: number;
  title: string;
  previewUrl: "https://static.poly.pizza/330fcf5d-aeb5-4961-b494-62c186f4e461.webp";
  price: number;
}

export interface CreateAssetsModel {
  title: string;
  price: number;
}
