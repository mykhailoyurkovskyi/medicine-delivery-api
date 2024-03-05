export interface MedicineResult {
  id: number;
  categoryId: number;
  name: string;
  medicinalForm: string;
  description: string;
  price: number;
  expirationDate: Date;
  dosageInstructions: string;
  contraindications: string[] | null;
  photos: string[] | null;
}