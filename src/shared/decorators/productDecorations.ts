export const productDecorations: Record<
  number,
  {
    rating: string;
    reviewCount: number;
    discountPercentage?: number;
  }
> = {
  1: { rating: '4.7', reviewCount: 132, discountPercentage: 15 },
  2: { rating: '4.3', reviewCount: 89 },
  3: { rating: '4.9', reviewCount: 221, discountPercentage: 25 },
  4: { rating: '4.5', reviewCount: 54 },
};
