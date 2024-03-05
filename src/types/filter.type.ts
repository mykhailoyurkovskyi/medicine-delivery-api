export interface Filter {
  name: string;
  categoryId?: number;
  medicinalForm: string;
  contraindications?: string[] | null;
}