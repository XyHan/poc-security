export type findAllOptions = {
  sort?: string;
  offsetStart?: number;
  size?: number;
  filters?: Map<string, string | number>;
  sources?: any[];
};
