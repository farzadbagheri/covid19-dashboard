import { EpidemicModelPersistent } from "../impact-dashboard/EpidemicModelContext";
import { RtData, RtError } from "../infection-model/rt";

export interface ModelInputs extends EpidemicModelPersistent {
  observedAt: Date;
  updatedAt: Date;
}

export type Facility = {
  id: string;
  scenarioId: string;
  name: string;
  description?: string;
  systemType?: string;
  modelInputs: ModelInputs;
  createdAt: Date;
  updatedAt: Date;
};

export type Facilities = Facility[];

export type Scenario = {
  id: string;
  name: string;
  baseline: boolean;
  dataSharing: boolean;
  dailyReports: boolean;
  promoStatuses: PromoStatuses;
  baselinePopulations: BaselinePopulations[];
  description: string;
  roles: {
    [key: string]: "owner" | "viewer";
  };
  createdAt: Date;
  updatedAt: Date;
};

export type PromoStatuses = {
  [promoType: string]: boolean;
  dailyReports: boolean;
  dataSharing: boolean;
  addFacilities: boolean;
};

export type RtValue = RtData | RtError;

export type RtDataMapping = {
  [key in Facility["id"]]: RtValue;
};

export type BaselinePopulations = {
  date: Date;
  staffPopulation: number;
  incarceratedPopulation: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type ScenarioUsers = {
  owner: User | null | undefined;
  viewers: User[];
};
