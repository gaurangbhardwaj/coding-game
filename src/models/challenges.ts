export interface Examples {
  id: number;
  input: string;
  output: string;
}

export interface Testcase {
  id: number;
  input: string;
  output: string;
}

export interface Challenge {
  id: number;
  title: string;
  description: string[];
  notes?: string[];
  examples: Examples[];
  default_code: string;
  test_function: string[];
  testcases: Testcase[];
}
