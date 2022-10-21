import { PoapEvent } from "./lib/poap/poap.types";

export interface FormQuestion {
  label: string;
  type: string; // text, select, checkbox
  required?: boolean;
  options?: string[];
  other?: boolean;
}

export type FormIdPreImage = {
  title: string;
  description: string;
  unixTime: number;
  questions: FormQuestion[];
  settings: FormSettings;
  owner: string;
  status: string;
  appId: string;
};

export type FormUploadInput = {
  id: string;
} & FormIdPreImage;

export type Form = {
  id: string;
  title: string;
  description: string;
  unixTime: number;
  questions: FormQuestion[];
  settings: FormSettings;
  owner: string;
  arweaveTxId: string;
  signatureValid?: boolean;
  status: string;
};

export type FormAnswer = {
  questionIndex: number;
  answer: string | number;
};

export type Submission = {
  answers: string[];
  formId: string;
};

export type WagmiEIP712TypedMessage = {
  domain: {
    [additionalProperties: string]: string;
  };
  types: {
    [additionalProperties: string]: {
      name: string;
      type: string;
    }[];
  };
  value: FormUploadInput;
  primaryType: string;
};

export type EIP712TypedMessage = {
  types: {
    EIP712Domain: {
      name: string;
      type: string;
    }[];
    [additionalProperties: string]: {
      name: string;
      type: string;
    }[];
  };
  message: FormUploadInput;
} & WagmiEIP712TypedMessage;

export enum ProofVerificationStatus {
  Verified,
  Invalid,
  Verifying,
  Nonexistent
}

export type FormSubmission = {
  formId: string;
  answers: string[];
  txId: string;
  membershipProof?: FullProof;
  attestationProof?: FullProof;
  proofsVerified: ProofVerificationStatus;
  unixTime: number;
};

export type FormSubmissionInput = {
  membershipProof?: FullProof;
  attestationProof?: FullProof;
  formId: string;
  answers?: string[] | string;
  unixTime: number;
  appId: string;
};

export type PageInfo = {
  hasNextPage: boolean;
};

export type FormSettings = {
  gate?: {
    merkleRoot?: string;
    allowedAddresses: string[];
  };
};

export type FormInput = {
  title: string;
  description: string;
  questions: FormQuestion[];
  settings: FormSettings;
};

export interface ICreateFormContext {
  formInput: FormInput;
  setFormInput: (formInput: FormInput) => void;
  updateQuestion: (question: FormQuestion, questionIndex: number) => void;
  updateSettings: (settings: FormSettings) => void;
}

export interface IEditFormContext {
  formInput: FormInput | null | undefined;
  setFormInput: (formInput: FormInput) => void;
  updateQuestion: (question: FormQuestion, questionIndex: number) => void;
  updateSettings: (settings: FormSettings) => void;
  getForm: (formId: string) => void;
  formNotFound: boolean;
  formOwner: string | null | undefined;
  formStatus: string | null | undefined;
}

export type ArweveGraphQLResult = {
  data: {
    transactions: {
      edges: {
        node: ArweaveTx[];
      }[];
    };
  };
};

export type ArweaveTxTag = {
  name: string;
  value: string;
};
export type ArweaveTx = {
  id: string;
  tags: ArweaveTxTag[];
};

export type FullProof = {
  proof: string;
  publicSignals: {
    [additionalProperties: string]: string;
  };
};

export type PointPreComputes = bigint[][][][];

export type MembershipProofInput = {
  TPreComputes?: PointPreComputes; // Powers of r^-1 * R as 64bit integers
  T?: [bigint, bigint]; // Powers of r^-1 * R as 64bit integers
  U: [bigint[], bigint[]]; // -(r^-1 * msg * G) as 64bit registers
  s: bigint[];
  attestationHash: bigint;
  siblings: bigint[];
  pathIndices: number[];
  merkleRoot: bigint;
  attestationHashSquared: bigint;
};

export type AttestationProofInput = {
  attestationPreImage: bigint;
  submission: Submission;
};

export type Registers = [bigint, bigint, bigint, bigint];

export type MembershipProofConfig = {
  merkleLeaves: string[];
};
