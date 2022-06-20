const extractTypes = require("enhanced-mapper");
import { PojosMetadataMap, pojos } from "@automapper/pojos";
import { createMapper, createMap } from "@automapper/core";

const frontendData = {
  floors: 4,
  modelVersion: 4,
  oid: "some string",
  numbers: [1, 2, 3],
  strings: ["1", "2", "3"],
  bio: {
    story: "Not much to tell",
    age: 23,
  },
  rockStars: [
    {
      name: "Adam Gontier",
      band: "Three Days Grace",
    },
    { name: "Robert Plant", band: "Led Zeppelin" },
  ],
  matrix: [
    [1, 2, 3],
    ["a", "b", "c"],
    [{ a: 1 }, { b: 2, c: 3 }],
  ],
};

// const fdt = {
//   floors: Number,
//   modelVersion: Number,
//   oid: String,
//   bio: "Bio",
//   rockStars: ["Rockstar"],
// };

interface Bio {
  story: string;
  age: Number;
}

interface RockStar {
  name: string;
  band: string;
}

interface BackendData {
  floors: number;
  modelVersion: number;
  oid: string;
  numbers: number[];
  strings: string[];
  bio: Bio;
  rockStars: RockStar[];
  matrix: any[];
}

interface FrontendData {
  floors: number;
  modelVersion: number;
  oid: string;
  numbers: number[];
  strings: string[];
  bio: Bio;
  rockStars: RockStar[];
  matrix: any[];
}

function createMetaData() {
  PojosMetadataMap.create<FrontendData>("FrontendData", extractTypes(frontendData));
  PojosMetadataMap.create<BackendData>("BackendData", extractTypes(frontendData));
}

createMetaData();

const mapper = createMapper({ strategyInitializer: pojos() });

createMap<FrontendData, BackendData>(mapper, "FrontendData", "BackendData");

const dto = mapper.map<FrontendData, BackendData>(frontendData, "FrontendData", "BackendData");

console.log(dto);
