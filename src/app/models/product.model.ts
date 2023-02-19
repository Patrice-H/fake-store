export class Product {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public price: number,
    public category: string,
    public thumbnail: string,
    public image: string[]
  ) {}
}
