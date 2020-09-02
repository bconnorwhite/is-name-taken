import { sync } from "all-package-names";
import validate from "validate-npm-package-name";
import { conflictsAny } from "package-name-conflict";

export function isValid(name: string) {
  return validate(name).validForNewPackages;
}

export async function isTaken(name: string): Promise<string | boolean> {
  if(isValid(name)) {
    return sync().then(({ packageNames }) => {
      return conflictsAny(name, packageNames);
    });
  } else {
    return Promise.resolve(true);
  }
}
