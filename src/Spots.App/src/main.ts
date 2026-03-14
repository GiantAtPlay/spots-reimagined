import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCube, faSignOutAlt, faPlus, faMoon, faThLarge, faLayerGroup, faPlusCircle, faExchangeAlt, faTasks, faMapMarkerAlt, faCog, faSun, faCheck, faFileImport, faDatabase, faSnowflake, faUsers, faServer, faCloudDownload, faDollarSign, faEdit, faTrash, faExclamationTriangle, faTimes, faUserShield, faUser, faSearch, faFilter, faSort, faChevronLeft, faChevronRight, faBox, faGem, faSkull, faFire, faLeaf, faGavel, faBolt, faArrowDown, faTh, faTint, faList, faTurnDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import './style.css';

library.add(faCube, faSignOutAlt, faPlus, faMoon, faThLarge, faLayerGroup, faPlusCircle, faExchangeAlt, faTasks, faMapMarkerAlt, faCog, faSun, faCheck, faFileImport, faDatabase, faSnowflake, faUsers, faServer, faCloudDownload, faDollarSign, faEdit, faTrash, faExclamationTriangle, faTimes, faUserShield, faUser, faSearch, faFilter, faSort, faChevronLeft, faChevronRight, faBox, faGem, faSkull, faFire, faLeaf, faGavel, faBolt, faArrowDown, faTh, faTint, faList, faTurnDown, faMinus);

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
