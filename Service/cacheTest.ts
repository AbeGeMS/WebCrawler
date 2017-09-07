/// <reference path="./lib/memory-cache.d.ts"/>

import * as cache from "memory-cache"

cache.put("key1", 2);
cache.put("key1", 3);
console.log(cache.get("key1"));
console.log(cache.get("key2") == "");
console.log(!!cache.get('key2'));
console.log(!!cache.get('key1'));