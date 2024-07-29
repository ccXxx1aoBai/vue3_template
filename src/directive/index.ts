import { App } from 'vue';
import block from "./block";

const directives = {
  block
}

export default {
  install(app: App) {
    for(const [k, d] of Object.entries(directives)) {
      app.directive(k, d);
    }
  }
}