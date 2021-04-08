import { sync, load, LoadOptions } from "all-package-names";
import validate from "validate-npm-package-name";
import { conflictsAny } from "package-name-conflict";

export type Options = LoadOptions & {
  /**
   * Setting optimistic to true will skip syncing latest packages from NPM.
   * This is faster, but may lead to inconsistencies with recently published packages.
   */
  optimistic?: boolean;
};

export function isValid(name: string) {
  return validate(name).validForNewPackages;
}

function getSave(options?: Options) {
  if(options?.optimistic) {
    return load(options);
  } else {
    return sync(options);
  }
}

export async function isTaken(name: string, options?: Options): Promise<string | boolean> {
  if(isValid(name)) {
    return getSave(options).then(({ packageNames }) => {
      return conflictsAny(name, packageNames);
    });
  } else {
    return Promise.resolve(true);
  }
}
