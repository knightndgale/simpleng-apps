export interface ClarifaiInterface {
  status: Status;
  outputs: Output[];
}

export interface Output {
  id: string;
  status: ModelVersionStatus;
  created_at: string;
  model: Model;
  input: Input;
  data: OutputData;
}

export interface OutputData {
  regions: Region[];
}

export interface Region {
  id: string;
  region_info: RegionInfo;
  data: RegionData;
  value: number;
}

export interface RegionData {
  concepts: Concept[];
}

export interface Concept {
  id: string;
  name: string;
  value: string;
}

export interface RegionInfo {
  bounding_box: BoundingBox;
}

export type BoundingBox = {
  top_row: number;
  left_col: number;
  bottom_row: number;
  right_col: number;
};

export type Box = {
  boundigBox: BoundingBox;
  imageWidth: number;
  imageHeight: number;
};
export type CalculatedBoundingBox = {
  leftCol: number;
  topRow: number;
  rightCol: number;
  bottomRow: number;
};

export interface Input {
  id: string;
  data: InputData;
}

export interface InputData {
  image: Image;
}

export interface Image {
  url: string;
}

export interface Model {
  id: string;
  name: string;
  created_at: string;
  modified_at: string;
  model_version: ModelVersion;
  user_id: string;
  model_type_id: string;
  visibility: Visibility;
  toolkits: any[];
  use_cases: any[];
  languages: any[];
  languages_full: any[];
  check_consents: any[];
  workflow_recommended: boolean;
}

export interface ModelVersion {
  id: string;
  created_at: string;
  status: ModelVersionStatus;
  visibility: Visibility;
  user_id: string;
}

export interface ModelVersionStatus {
  code: number;
  description: string;
}

export interface Visibility {
  gettable: number;
}

export interface Status {
  code: number;
  description: string;
  req_id: string;
}
