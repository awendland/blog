import { Map_filter } from "./std.mjs";

export const onlyEntriesNamed = (nameRegex) => (e) =>
  e.entryName.match(nameRegex);

export const loadBundles = (map, e) => {
  const bundleName = e.entryName.split("/")[1];
  const bundle = map.get(bundleName) ?? { info: null, text: null };
  if (e.entryName.match(/info.json$/)) {
    bundle.info = JSON.parse(e.getData().toString("utf8"));
  }
  if (e.entryName.match(/text.txt$/)) {
    bundle.text = e.getData().toString("utf8");
  }
  map.set(bundleName, bundle);
  return map;
};

export const onlyActiveBundles = (map) =>
  Map_filter(
    map,
    ([, { info }]) =>
      info["net.shinyfrog.bear"].archived == 0 &&
      info["net.shinyfrog.bear"].trashed == 0,
  );

export const concatBundleText = (orderedKeys) => (map) => {
  let doc = "";
  for (const key of orderedKeys) {
    if (!map.has(key)) {
      throw new Error(`Unable to find ${key} in extracted bundles`);
    }
    doc += map.get(key).text + "\n";
  }
  return doc;
};
