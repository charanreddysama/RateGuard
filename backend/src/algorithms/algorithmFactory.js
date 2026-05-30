import { fixedWindow }
from "./fixedWindow.js";

import { slidingWindow }
from "./slidingWindow.js";

import { tokenBucket }
from "./tokenBucket.js";

import { leakyBucket }
from "./leakyBucket.js";

export const algorithmFactory = (
  algorithm
) => {

  switch (algorithm) {

    case "fixed_window":
      return fixedWindow;

    case "sliding_window":
      return slidingWindow;

    case "token_bucket":
      return tokenBucket;

    case "leaky_bucket":
      return leakyBucket;

    default:
      return fixedWindow;
  }
};