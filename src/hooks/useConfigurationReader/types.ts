import { Label } from "../../options/types";

export type UseConfigurationFileReader = () => {
  readAndValidate: (file: File) => Promise<Label[] | undefined>;
  isLoading: boolean;
  errorMessage: string | undefined;
};
