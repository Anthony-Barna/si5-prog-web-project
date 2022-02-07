import { XMLParser } from "fast-xml-parser";

const options = {
  ignoreAttributes: false,
  allowBooleanAttributes: true,
  attributeNamePrefix: "",
};

const parser = new XMLParser(options);

export { parser };
