import { isArray, isBoolean, isNumber, isObject, isString } from "lodash";
import { PojosMetadataMap } from "@automapper/pojos";

function extractTypes(object: any, acc: any = {}, name: string = ""): any {
  for (let propName of Object.getOwnPropertyNames(object)) {
    const prop = object[propName];
    if (isObject(prop)) {
      PojosMetadataMap.create(propName, extractTypes(prop));
      acc[propName] = propName;
    }
    if (isNumber(prop)) {
      acc[propName] = Number;
    }
    if (isString(prop)) {
      acc[propName] = String;
    }
    if (isBoolean(prop)) {
      acc[propName] = Boolean;
    }
    if (isArray(prop)) {
      if (prop[0] && isObject(prop[0])) {
        PojosMetadataMap.create(propName, extractTypes(prop));
        acc[propName] = [propName];
      } else {
        acc[propName] = Array;
      }
    }
  }
  return acc;
}

export default extractTypes;
