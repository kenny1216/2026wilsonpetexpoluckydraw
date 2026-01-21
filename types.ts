
export interface Prize {
  id: number;
  label: string;
  probability: number;
  color: string;
  icon: string;
}

export interface ResultState {
  prize: Prize | null;
  geminiMessage: string;
  isLoading: boolean;
}
