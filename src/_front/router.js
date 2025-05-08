import { createRouter, createWebHistory } from 'vue-router';

import wwPage from './views/wwPage.vue';

import { initializeData, initializePlugins, onPageUnload } from '@/_common/helpers/data';

let router;
const routes = [];

function scrollBehavior(to) {
    if (to.hash) {
        return {
            el: to.hash,
            behavior: 'smooth',
        };
    } else {
        return { top: 0 };
    }
}

 
/* wwFront:start */
import pluginsSettings from '../../plugins-settings.json';

// eslint-disable-next-line no-undef
window.wwg_designInfo = {"id":"a99f2de8-739b-4ff8-9bf1-21670155bbfd","homePageId":"d6094d6e-953a-4920-9f95-088f7adb1ec6","authPluginId":null,"baseTag":null,"defaultTheme":"light","langs":[{"lang":"fr","default":true}],"background":{},"workflows":[],"pages":[{"id":"9474c442-07f2-414c-811b-73eb7f38872d","linkId":"8e106f57-c664-4b2a-90e5-97bfc461d9d2","name":"Home","folder":"backup/frugall/","paths":{"en":"home","default":"home"},"langs":["fr"],"cmsDataSetPath":null,"sections":[{"uid":"7ceb59c3-1f66-463c-9f78-2faee0f8be07","sectionTitle":"Simple navigation","linkId":"a664bd63-6dac-48d7-9a94-03861f252cc9"},{"uid":"6c023159-a285-4150-8db4-7b03e5deb02a","sectionTitle":"frugall_homepage","linkId":"39dbffac-9774-42ed-b3e4-0866ce88aca7"},{"uid":"c609cb06-3c74-49d2-aef9-61deb642938f","sectionTitle":"Blank","linkId":"13aed0ac-783d-48db-9244-75abb16d9f8f"}],"pageUserGroups":[],"title":{"en":"Blank | Start from scratch","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"f746fd28-d491-4ee7-9578-d69fd9c3e035","linkId":"f746fd28-d491-4ee7-9578-d69fd9c3e035","name":"dashboard","folder":"backup/old ds/","paths":{"fr":"dashboard","default":"dashboard"},"langs":["fr"],"cmsDataSetPath":null,"sections":[{"uid":"462efab2-9f85-454e-9917-7af227ab411a","sectionTitle":"Main Section","linkId":"4fe91515-fc25-48e8-b9b5-2ed9235a146d"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"__typename":"PageMeta","socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"d6094d6e-953a-4920-9f95-088f7adb1ec6","linkId":"d6094d6e-953a-4920-9f95-088f7adb1ec6","name":"home","folder":"design system/","paths":{"fr":"ds","default":"ds"},"langs":["fr"],"cmsDataSetPath":null,"sections":[{"uid":"e43b52e5-b40e-4726-8180-378e7411ec75","sectionTitle":"Sidemenu","linkId":"b96d679a-7019-4212-b917-a066bab4ad2c"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"03cee960-e0d9-469d-b4e2-ee0ed29eb20e","linkId":"03cee960-e0d9-469d-b4e2-ee0ed29eb20e","name":"frugall design","folder":"backup/frugall/","paths":{"fr":"test","default":"test"},"langs":["fr"],"cmsDataSetPath":null,"sections":[{"uid":"6698e72e-860f-4141-8944-a23b239057ab","sectionTitle":"frugall- mes produits","linkId":"63cca958-f214-401d-b92b-f1aa47cd4075"}],"pageUserGroups":[],"title":{"en":"Blank | Start from scratch","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"816a7a5e-b654-43ce-8636-69e5c94c50d4","linkId":"816a7a5e-b654-43ce-8636-69e5c94c50d4","name":"login","folder":"backup/the field/","paths":{"fr":"login","default":"login"},"langs":["fr"],"cmsDataSetPath":null,"sections":[{"uid":"adc89085-69a3-451d-885b-e82c4769cf1d","sectionTitle":"google login","linkId":"52ba297f-fa4f-42d8-95d3-466e7ba1d50a"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"f10e8f4d-d35f-4fe4-900f-1d1a6f3d0bb0","linkId":"f10e8f4d-d35f-4fe4-900f-1d1a6f3d0bb0","name":"group buttons","folder":"backup/old ds/","paths":{"fr":"typo","default":"typo"},"langs":["fr"],"cmsDataSetPath":null,"sections":[{"uid":"4eda0516-7a7c-4977-b3bf-f6f276b0b408","sectionTitle":"Main Section","linkId":"f720646b-bb86-4309-90b5-5097455df519"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"ee89fd33-2ef1-4de2-a142-bbc6d9b5ae9f","linkId":"ee89fd33-2ef1-4de2-a142-bbc6d9b5ae9f","name":"simple buttons","folder":"backup/old ds/","paths":{"fr":"simple-buttons","default":"simple-buttons"},"langs":["fr"],"cmsDataSetPath":null,"sections":[{"uid":"9058deea-2fd6-485a-af16-30524db60ade","sectionTitle":"Buttons Demo Container","linkId":"3d4aa03e-4bfa-4aa3-8cc0-83451bd87485"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""}],"plugins":[]};
// eslint-disable-next-line no-undef
window.wwg_cacheVersion = 7;
// eslint-disable-next-line no-undef
window.wwg_pluginsSettings = pluginsSettings;
// eslint-disable-next-line no-undef
window.wwg_disableManifest = false;

const defaultLang = window.wwg_designInfo.langs.find(({ default: isDefault }) => isDefault) || {};

const registerRoute = (page, lang, forcedPath) => {
    const langSlug = !lang.default || lang.isDefaultPath ? `/${lang.lang}` : '';
    let path =
        forcedPath ||
        (page.id === window.wwg_designInfo.homePageId ? '/' : `/${page.paths[lang.lang] || page.paths.default}`);

    //Replace params
    path = path.replace(/{{([\w]+)\|([^/]+)?}}/g, ':$1');

    routes.push({
        path: langSlug + path,
        component: wwPage,
        name: `page-${page.id}-${lang.lang}`,
        meta: {
            pageId: page.id,
            lang,
            isPrivate: !!page.pageUserGroups?.length,
        },
        async beforeEnter(to, from) {
            if (to.name === from.name) return;
            //Set page lang
            wwLib.wwLang.defaultLang = defaultLang.lang;
            wwLib.$store.dispatch('front/setLang', lang.lang);

            //Init plugins
            await initializePlugins();

            //Check if private page
            if (page.pageUserGroups?.length) {
                // cancel navigation if no plugin
                if (!wwLib.wwAuth.plugin) {
                    return false;
                }

                await wwLib.wwAuth.init();

                // Redirect to not sign in page if not logged
                if (!wwLib.wwAuth.getIsAuthenticated()) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthenticatedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }

                //Check roles are required
                if (
                    page.pageUserGroups.length > 1 &&
                    !wwLib.wwAuth.matchUserGroups(page.pageUserGroups.map(({ userGroup }) => userGroup))
                ) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthorizedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }
            }

            try {
                await import(`@/pages/${page.id.split('_')[0]}.js`);
                await wwLib.wwWebsiteData.fetchPage(page.id);

                //Scroll to section or on top after page change
                if (to.hash) {
                    const targetElement = document.getElementById(to.hash.replace('#', ''));
                    if (targetElement) targetElement.scrollIntoView();
                } else {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }

                return;
            } catch (err) {
                wwLib.$store.dispatch('front/showPageLoadProgress', false);

                if (err.redirectUrl) {
                    return { path: err.redirectUrl || '404' };
                } else {
                    //Any other error: go to target page using window.location
                    window.location = to.fullPath;
                }
            }
        },
    });
};

for (const page of window.wwg_designInfo.pages) {
    for (const lang of window.wwg_designInfo.langs) {
        if (!page.langs.includes(lang.lang)) continue;
        registerRoute(page, lang);
    }
}

const page404 = window.wwg_designInfo.pages.find(page => page.paths.default === '404');
if (page404) {
    for (const lang of window.wwg_designInfo.langs) {
        // Create routes /:lang/:pathMatch(.*)* etc for all langs of the 404 page
        if (!page404.langs.includes(lang.lang)) continue;
        registerRoute(
            page404,
            {
                default: false,
                lang: lang.lang,
            },
            '/:pathMatch(.*)*'
        );
    }
    // Create route /:pathMatch(.*)* using default project lang
    registerRoute(page404, { default: true, isDefaultPath: false, lang: defaultLang.lang }, '/:pathMatch(.*)*');
} else {
    routes.push({
        path: '/:pathMatch(.*)*',
        async beforeEnter() {
            window.location.href = '/404';
        },
    });
}

let routerOptions = {};

const isProd =
    !window.location.host.includes(
        '-staging.' + (process.env.WW_ENV === 'staging' ? process.env.VUE_APP_PREVIEW_URL : '')
    ) && !window.location.host.includes(process.env.VUE_APP_PREVIEW_URL);

if (isProd && window.wwg_designInfo.baseTag?.href) {
    let baseTag = window.wwg_designInfo.baseTag.href;
    if (!baseTag.startsWith('/')) {
        baseTag = '/' + baseTag;
    }
    if (!baseTag.endsWith('/')) {
        baseTag += '/';
    }

    routerOptions = {
        base: baseTag,
        history: createWebHistory(baseTag),
        routes,
    };
} else {
    routerOptions = {
        history: createWebHistory(),
        routes,
    };
}

router = createRouter({
    ...routerOptions,
    scrollBehavior,
});

//Trigger on page unload
let isFirstNavigation = true;
router.beforeEach(async (to, from) => {
    if (to.name === from.name) return;
    if (!isFirstNavigation) await onPageUnload();
    isFirstNavigation = false;
    wwLib.globalVariables._navigationId++;
    return;
});

//Init page
router.afterEach((to, from, failure) => {
    wwLib.$store.dispatch('front/showPageLoadProgress', false);
    let fromPath = from.path;
    let toPath = to.path;
    if (!fromPath.endsWith('/')) fromPath = fromPath + '/';
    if (!toPath.endsWith('/')) toPath = toPath + '/';
    if (failure || (from.name && toPath === fromPath)) return;
    initializeData(to);
});
/* wwFront:end */

export default router;
