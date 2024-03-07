export interface Filter {
  id?: number,
  name: string;
  categoryId?: number;
  medicinalForm: string;
  contraindications?: string[] | null;
}