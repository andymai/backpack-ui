import { configure } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
import "./common.css";

setOptions({
  name: "Backpack UI",
  url: "https://lonelyplanet.github.io/backpack-ui",
});

function loadStories() {
  require("../stories");
}

configure(loadStories, module);
