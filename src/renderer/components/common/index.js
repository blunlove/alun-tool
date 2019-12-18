import baseInput from './baseInput.vue';
import baseSelect from './baseSelect.vue';
import baseTable from './baseTable.vue';
import tablePage from './tablePage.vue';
import baseDialog from './baseDialog.vue';

const components = {
  baseInput,
  baseSelect,
  baseTable,
  tablePage,
  baseDialog,
}

const install = function (Vue) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  })
}

export default {
  install,
  ...components
}