import emitter from 'tiny-emitter/instance';
import services from './services/index.js';
import { useIconsStore } from '@/pinia/icons';

 /* wwFront:start */
// eslint-disable-next-line no-undef
;
/* wwFront:end */

import { computed, reactive } from 'vue';

export default {
    ...services,
     $on(event, fn) {
        emitter.on(event, fn);
    },
    $once(event, fn) {
        emitter.once(event, fn);
    },
    $emit(event, ...args) {
        if (!event) {
            return;
        }
        emitter.emit(event, ...args);
    },
    $off(event, fn) {
        emitter.off(event, fn);
    },
     front: {},
    $focus: null,
    env: process.env.NODE_ENV,
    async initFront({ router, store }) {
 
        this.front.router = router;
        /* wwFront:start */
        this.$store = store;
        /* wwFront:end */

        //Init services
        this.wwLog.init();

 
        wwLib.logStore.verbose('Starting the application...');
        await this.wwWebsiteData.init();
        this.wwLang.init(router);

        /* wwFront:start */
        // eslint-disable-next-line no-undef
        ;
        /* wwFront:end */

 
        services.scrollStore.start();
        services.keyboardEventStore.start();
    },
     // TODO: Verify with Alexis, still uses wwImageMultiLang
    getResponsiveStyleProp({ store, style, uid, states = [], prop }) {
        store = store || wwLib.getFrontWindow().wwLib.$store;
        if (!style && uid) {
            const wwObject = this.$store.getters['websiteData/getWwObjects'][uid];
            if (!wwObject) return '';
            style = (wwObject._state || {}).style || {};
        }

        const screenSizes = store.getters['front/getScreenSizes'];
        const screenSize = store.getters['front/getScreenSize'];

        let value = '';

        for (const media in screenSizes) {
            if (style[media] && typeof style[media][prop] !== 'undefined') {
                value = style[media][prop];
            }
            if (media === screenSize) {
                break;
            }
        }
        for (const state of states) {
            for (const media in screenSizes) {
                if (style[`${state}_${media}`] && style[`${state}_${media}`][prop]) {
                    value = style[`${state}_${media}`][prop];
                }
                if (media === screenSize) {
                    break;
                }
            }
        }

        return value;
    },
    globalContext: reactive({
        page: computed(() => {
            const page = wwLib.$store.getters['websiteData/getPage'];
            if (!page) return {};
            else if (!page.cmsDataSetPath) return { ...pageSanitizer(page) };
            return { ...pageSanitizer(page), data: wwLib.$store.getters['data/getPageCollectionData'] };
        }),
        pageParameters: computed(() => {
            const pageParameters = Object.values(wwLib.$store.getters['data/getPageParameterVariables']);
            const pageParametersValueMap = {};
            for (const pageParameter of pageParameters) pageParametersValueMap[pageParameter.id] = pageParameter.value;
            return pageParametersValueMap;
        }),
        pages: computed(() => {
            const pages = wwLib.$store.getters['websiteData/getPages'];
            const pagesValueMap = {};
            for (const page of pages) pagesValueMap[page.id] = pageSanitizer(page);
            return pagesValueMap;
        }),
        colors: computed(() => {
            const theme = wwLib.$store.getters['front/getTheme'];
             /* wwFront:start */
            // eslint-disable-next-line no-unreachable, no-undef
            return theme === 'dark' ? {"65e0fd0a-b56b-4513-a236-93dae9882cfd":"#ffffff","e4e47e9a-a741-45c6-99ed-a6313055789d":"#ffffff","1445654b-e5ec-434e-9fd8-9226867baffc":"#ffffff","a6c3429c-8fda-4a47-adc5-8b417d07530e":"#ffffff","cc70eb8a-44f7-4ae5-822b-ec9a8e49b6c8":"#f1f5f9","72a60d8b-3ada-47f0-9a07-5e27e700207a":"#cbd5e1","8ad94c30-1656-423b-a9d7-748fc6cc746c":"#475569","6b81aec6-b06c-43d8-8250-7d648e3900e2":"#1e293b","3260e48a-8a31-41fd-bc65-5ee107041468":"#0f172a","1e7fc44b-81d6-4d02-b1b0-56bf5079572a":"#f9fafb","c2794e99-20cd-4c9c-90e7-2aaca0e88ed3":"#374151","aca0cdc0-5f47-434a-8d57-5da96c5841c3":"#1f2937","1f3e3f84-6390-4075-bde5-a3efd6f5f70f":"#030712","94874502-1188-4ed2-9910-411275608321":"#f4f4f5","54a805c0-1284-4e95-b2d4-90b80be1e69d":"#a1a1aa","6eb752bd-46c7-42d6-bb98-24bcfe0127a8":"#52525b","d870f568-0097-4ef6-adba-8851a0bdb924":"#3f3f46","42654e99-a589-4ce2-ad07-ccf0216f5b25":"#d4d4d4","0bdda255-6e70-4517-a616-c1892de0a10c":"#a3a3a3","a588e333-d1b5-4a05-9416-0d1bef7f3251":"#737373","b782f309-a463-4f0f-b094-d18dc0249974":"#262626","ae63ca56-5d27-451b-a0f4-fab393fae728":"#e7e5e4","aa1c8196-d73c-4451-844d-3701888c9317":"#d6d3d1","0d8b6019-4afa-41e9-aa18-af3cbc760987":"#a8a29e","bc04dbc1-a740-4c54-97a8-ba2f75d1ac4a":"#78716c","efb6cfef-17dc-4012-9a0f-9e0f523ad9e7":"#44403c","cbebcfee-ffb6-4ad2-a684-2b51c7ab529d":"#292524","59adb885-310a-4485-a6b8-70569f04fac4":"#f0fdf4","a88ec730-c007-49e4-b0bd-5ea960579b1a":"#dcfce7","d0a0103f-a288-41c0-a566-7fc88cf97257":"#bbf7d0","eeaab4a7-c192-45ed-aafd-a73ad7890907":"#16a34a","3fa164fd-38fa-44a4-8f1c-916f77d268a9":"#ffffff","c0e629a3-1d27-4c29-9cff-580fdaa124ef":"#ffffff","3520f811-7a25-4c30-b166-e0b8c3c0697d":"#ffffff","99b5e546-8a0b-4e7a-80a8-59e2f3608480":"#ffffff","d179f5ba-533c-4271-abb8-eaca02c9de3e":"#ffffff","7e30621d-782e-4464-9e04-6d5dff7ba055":"#ffffff","3e7193b4-6a2f-432a-b1c3-c35a08a33edc":"#f8fafc","b8a2bf53-da50-4ba6-8e6b-003abccd70c1":"#e2e8f0","8955fa86-ea14-46e1-a005-15bf2de5c6fa":"#94a3b8","8bf3f5ee-d944-4441-9a79-2cd84b6a41fa":"#64748b","19862ed1-e01d-419e-ae1c-1de8cc0e22fc":"#334155","bc6324d9-b498-4fed-b90a-45596c7565b3":"#020617","03375e17-4eb8-4fe0-b993-800bfb9ca1b3":"#e5e7eb","cf5cbad3-c991-47ab-a44b-118f8ee3c7c4":"#4b5563","83c4d3d9-5589-4e97-98b8-9bc10c396297":"#111827","052efd4f-e4ac-4c5e-a58c-fa7a954053d4":"#fafafa","38b09540-fe99-4586-b6f8-9128c671a047":"#e4e4e7","9ead6530-f496-4abf-8eba-bbbfed33ba79":"#d4d4d8","5ddb2632-e5ad-408b-bb36-dbe20bb76e5c":"#71717a","e55099b0-0811-4f1a-b522-a91b749348da":"#27272a","5ff93411-b4a6-48f6-8f5b-fff9f5ca1aae":"#d9f99d","967f3cf5-2037-42a2-8ef0-d97a42469720":"#a3e635","609b043b-1dc1-42c7-b21b-cc23b1d8ebeb":"#65a30d","b1c39f97-933e-4518-b077-711e6be21435":"#3f6212","385783bd-6891-4f5a-81f8-21ba53135b50":"#86efac","99ab2ec7-9d41-4f4f-9070-3c1e9e309795":"#22c55e","9ef0b6c2-542c-4dab-959a-3e81e81b62ac":"#15803d","8dd199a2-3e9b-4701-9984-906794424813":"#14532d","ba846cde-1b17-41a3-870d-6f6169ab4e23":"#ecfdf5","bccf8801-6753-4a46-8493-a40d5a2a5ef1":"#6ee7b7","2b1da28a-810f-4946-ae41-db17ccaf11cc":"#34d399","93d55e75-3356-4d7c-87ee-32020a4ef1e1":"#059669","2658c780-a816-44be-b180-bef989e8688c":"#064e3b","39f0d8a4-a489-4368-8de8-2e626d7f31c6":"#022c22","ba4dcdd3-2243-4e1b-bbe6-84ec18a0becc":"#042f2e","62bd3444-e8f2-43d7-96a9-dfbcb75ae44b":"#06b6d4","b89ca08a-1d9c-4755-a185-eab720f3b22c":"#0e7490","08382661-a6f7-4f8c-8ab2-1ccf56ae7cd3":"#155e75","d4091f28-f6dc-4041-a3ab-ae9c939e5cf8":"#164e63","1684951a-d18f-4e20-8e23-18e28e73f989":"#f0f9ff","c2f02a1a-6d8e-4161-b187-d5866667d885":"#bae6fd","c061e387-3052-4717-a82e-ecc510fa6e16":"#0284c7","2949d6c3-4b66-4202-b49a-2194156c241a":"#0369a1","1c8e67c2-448b-4a83-8c07-90223d9818fb":"#0c4a6e","b4ab0dde-dbf1-4df8-9168-26371770440e":"#dbeafe","f31aab52-47be-4be6-9d4e-fe0ad22824c7":"#93c5fd","a510110a-c54b-4d4e-b5af-a33baedfaf9a":"#a5b4fc","1fe549bc-b0d3-4be5-941e-52770a266b3b":"#6366f1","71119176-bf66-49fa-b6b1-b8fe9f59a264":"#3730a3","c1f4692d-8c63-4918-87aa-474c0518ab74":"#312e81","c872683e-ed26-4e69-a842-c73e7e56b6db":"#f5f3ff","d9766256-1dae-421c-bf02-a34bef3b75a7":"#ede9fe","5cca33fb-2779-49b9-829a-96fa232a9d8d":"#ffffff","3e8343b5-8d86-465d-baf6-030dc3fb13f3":"#ffffff","8b02beb0-5e99-4b05-83db-a428426093bb":"#ffffff","94b743ec-1cb4-461c-91b5-73d2d881f4b3":"#f3f4f6","6fa1ac05-38a0-4a57-8d69-130323b5b06e":"#d1d5db","7d3b7e26-a649-4f77-b803-413fb93d0076":"#9ca3af","b95b6750-4288-4aab-b66c-b27874072ff7":"#6b7280","712305b4-8077-4c4e-afbd-fdf1d3ba5f84":"#ea580c","6e00b59e-9998-44ab-91f2-3ba0f1f9d943":"#c2410c","49554059-1995-4842-a0cb-43e46811d133":"#7c2d12","1739ffe2-d27c-4b82-8419-f666b3a58806":"#fffbeb","6227b0e6-e7df-4a8a-9243-636f59b56382":"#fde68a","8297485f-e34d-43ca-83af-4af250bfd41f":"#fbbf24","41881bd5-469e-4ef4-8969-cdf67259c60e":"#d97706","ba85abd9-c0b5-463a-9f4e-093cd6c6738e":"#92400e","6200eebe-39c0-4bd4-a1b1-e1cf5111639e":"#451a03","9ea9e6b8-12cf-439e-9493-bbc13840d467":"#fefce8","a38406a9-d658-4615-bcba-66542283826a":"#fde047","0fb3aeb6-e80b-4951-b55f-961608f347be":"#ca8a04","d00006e4-8df4-4cd4-8434-d35fe4846966":"#a16207","37df1c2d-a739-4fa7-af24-177a9628e8d9":"#713f12","497305b7-34bd-4fac-b3a8-6d2fa0716c22":"#fef2f2","1aa63a96-75dc-4324-b9a4-eb8277bd231e":"#f0fdf4","0bbfab52-7d32-4938-8682-8471ecf5de41":"#18181b","f0476b85-c3c0-46c4-b816-585e54779f44":"#09090b","5bf849be-1bb1-4ebe-8a1d-27cbd853eca4":"#fafafa","2be2ca23-4fea-4f4c-af5f-fda8bee8ceb8":"#f5f5f5","739e795a-7577-48a2-af37-419d81390f4d":"#e5e5e5","e64554b0-86dc-4d68-a990-79ce8db4db30":"#525252","054f0ac0-29f2-4adb-8a00-97098b4a4094":"#404040","9b3a078b-93ff-4414-8c1f-c1b0d50e4368":"#171717","c176d54d-185a-4837-97b6-e37127794a41":"#0a0a0a","f53f51dc-d1a5-4a4e-8d71-be58429c8ffa":"#fafaf9","06a81ea4-96ca-4386-b52b-e6e6bd9dd6b3":"#f5f5f4","f76cffbd-12c3-4d04-a7d6-0e76f51c6fe0":"#57534e","be324605-b963-4dc4-98f0-b8f7f254c59d":"#292524","d7f56af1-e123-463e-9c84-297b5f9c5dc5":"#0c0a09","2ff940f9-c8c9-445c-a50e-27eef3c2c1f3":"#f7fee7","7619dcc1-395e-4306-9154-781c9a6c0165":"#ecfccb","44bace26-8ab1-400d-a877-e261d47e40dd":"#bef264","321d0a57-f873-45e7-8132-2fb84b8cb51e":"#84cc16","8fcb4201-75d9-4486-9cb2-83a0fb72589d":"#4d7c0f","18946f2e-a31d-4ebe-a0fa-d0a326c190a3":"#365314","c9a434bf-3a52-4df3-bf6b-9e5d2046dfb2":"#1a2e05","939dfbd4-4348-4a90-8e86-0b3dd59848f7":"#4ade80","8245735f-58fa-4cbd-a338-36e2216868b3":"#166534","7bc6889f-c2e0-40a6-88ae-67b3dcfdb61c":"#052e16","073c33fc-1656-433d-8973-f6ba28e0ad41":"#d1fae5","c7a4a49c-4d35-4600-8e49-c044540275da":"#a7f3d0","584d3606-f0a8-40da-b418-94115e19558a":"#10b981","7db1e29f-ec3c-4019-a689-f07ff75dbbc5":"#047857","c498d5d2-71a5-4740-b919-2a1b84451026":"#065f46","e1dd073a-587b-494a-a924-bd337d45f551":"#f0fdfa","88552b6e-ae0e-471a-9132-d79e877640ba":"#5eead4","dc7d4c31-7a37-4dd5-806b-22f212056d85":"#14b8a6","1f5dc540-a693-46d5-9147-9da3879280d7":"#0d9488","d4f3993d-405f-4d23-962b-7d315bb7d39f":"#115e59","e0182bf2-0197-4fd1-be23-8e1000e97c8a":"#ecfeff","844b05fe-c6ef-4b08-9b84-b8ff209e8a51":"#a5f3fc","f95be63b-9eb0-478e-a8f5-2071843417be":"#67e8f9","f518f023-ac7d-45dc-8093-e625d76a23e0":"#22d3ee","019bd829-107a-478f-a54c-5af003411951":"#0891b2","46102c07-2181-4279-a10b-9b11f5679e3a":"#38bdf8","f826d5ba-84f3-419e-965a-269f80efb000":"#eff6ff","373807ba-a716-435b-9b4e-b2f58a17e458":"#bfdbfe","ad5122a7-e103-4768-9e24-0b6cd25fe7d3":"#60a5fa","bb7bde18-1a1a-4e8a-b230-a784c8a628c8":"#1e40af","ac7bac6c-4779-46d1-83d9-dbb449e74c99":"#172554","264f18a2-7d50-4588-92d6-e3e998407216":"#e0e7ff","16155b9b-78ae-4b4f-a2e9-31054f236611":"#7c3aed","7ef7c683-8e80-4821-8e8e-6b569cb3bf6c":"#6d28d9","175c690e-f7dc-4b9e-83bd-3a3b5bbcb711":"#2e1065","a0547f9b-85a2-4d7d-9aed-0fc16cbaf715":"#f3e8ff","54910133-a722-4d3a-9668-2388aec0536f":"#d8b4fe","df23e9b6-c987-4358-9c87-43e99bc45722":"#a855f7","4048b808-442a-4856-a266-a6c0529d94b7":"#9333ea","6937f48f-af1a-498f-ba15-48a2766f95fe":"#3b0764","752459f9-a184-4c09-9178-a35bd59618ce":"#fae8ff","20fccb4f-0087-4912-908b-03ef142c695a":"#f5d0fe","017b9c31-2b50-4eaf-9c56-8888124d5469":"#f0abfc","19ae91b8-8c59-41e4-9894-b8450350cafc":"#d946ef","231e0867-3e27-408f-9eb5-5189addcb835":"#c026d3","1a558ded-87ce-4a7f-b3c7-4df516f970b3":"#a21caf","1484b49e-8b57-4a9a-8e6a-bf17ddc1ea47":"#86198f","c9cad4c8-e980-465d-a064-f9f5ffc86704":"#701a75","d9bcd91c-9aea-42a1-ba26-f3030d536612":"#4a044e","3843d14a-790c-4cf0-bed6-af3655d9e7b5":"#fdf2f8","e01e117d-3924-4576-926b-866d923b6518":"#fbcfe8","29b2e52a-746b-4b0c-b0bb-25dd1cf21409":"#f9a8d4","7778deab-707c-437d-8892-9f64a096fa18":"#ec4899","fc49a348-3c5b-4fbb-b72a-f36201aad74f":"#ffedd5","6a47a85b-7645-4984-b196-d1b2d87a536b":"#fed7aa","c94dee77-340d-4dc9-a5d3-18c078769ab0":"#fdba74","25135c42-d2ee-48fe-966e-77d43d8c3a7e":"#fb923c","4e9bcc80-89c3-4b27-9a0b-019b494ac5f7":"#eef2ff","c47c8ded-d333-489b-846d-62ae8f3cee1a":"#ccfbf1","15763ec4-1108-4a2e-96b2-13b36d6f4277":"#99f6e4","d108cfe9-5def-43f9-af21-f171c6344afa":"#2dd4bf","7b4d3b50-5ea9-4b62-beca-73306263a58e":"#0f766e","132247cc-392b-4223-b4b4-d0cea9cc6c92":"#134e4a","e033e639-44d2-4765-a4b8-e909ac582cf8":"#cffafe","253187e7-25a6-493c-846f-5ca696fa0841":"#083344","2c40e477-039e-4d4d-9a19-64778d71d7da":"#e0f2fe","31bc74d5-849c-4cf9-b380-5e00309d47b4":"#7dd3fc","fdc01a9c-b9c1-49fe-803a-23bab8c4467b":"#0ea5e9","5c502e42-5ef9-4d77-bb8e-9ad5f4610081":"#075985","13f4ed89-2c37-4b6b-8a2e-e4051891f544":"#082f49","d0a4f27d-af7f-4a53-ac30-babbf8d67332":"#3b82f6","db72fa95-1345-42f6-8c33-067fc395c3df":"#2563eb","e00d0d69-cefc-4fe9-9289-f0fe0b3657ac":"#1d4ed8","8e9ab522-bb99-4e90-80d2-67c6a1f92fef":"#1e3a8a","32897c02-01a7-4d1b-8df3-8a250b101b62":"#eef2ff","c2c53206-7a69-4722-91cd-b1cc6aa6a232":"#c7d2fe","55c5a7d5-7f73-4f9b-aebe-ec8ac698b1a5":"#818cf8","bd2d6eb4-dcad-4526-8d56-a944fec0a815":"#4f46e5","510e0e68-eda2-4ab9-adf1-2677533694d7":"#4338ca","76fa08fc-29c2-46b5-b33a-12568fed9f31":"#1e1b4b","eb235201-468e-4ef7-9c57-3ea72b15b4df":"#8b5cf6","2aba6f1c-e70e-43e2-adce-5d02b08d05a6":"#7e22ce","0be35a3c-6e14-4b3b-97a8-cf52bd62d6f0":"#6b21a8","ab5c53a6-f6a0-47be-beec-fb6c4a7d77dd":"#581c87","c7d15ba4-b925-4d1b-8e60-66e62260f15e":"#fdf4ff","0fac599f-e823-4e1d-af28-d343232847d3":"#e879f9","6233fa1d-ffde-4ccc-af27-de9d72e8c522":"#db2777","0e177be4-2c1f-4fe1-a6e8-69cfcd4e1757":"#be185d","ff5a63a6-b76f-4e3e-ad4b-459cb7e715fe":"#500724","267eaf62-75e9-46de-8db6-6482a80a4825":"#fff1f2","91cd4cb2-7aa6-4b4f-97b4-d80b0d941617":"#ffe4e6","7f198d44-be47-4ee6-a517-6266486da38c":"#fda4af","a5690f09-166d-46bc-8c2a-aae8516e2c2e":"#e11d48","6fda5901-fc6e-47ed-b8e1-98d282cbde18":"#9f1239","a5d4a9e2-1a6c-4a98-962c-b143890f4c96":"#4c0519","9a067a75-7a21-41a6-b7fe-d19c1d34adac":"#fef2f2","c37c3097-d402-44b9-9083-55f2861f0f33":"#fecaca","da600d04-f453-4530-89a7-f8ab32d2c095":"#f87171","3573ab82-1f82-4dfd-9954-afa6411ddf9b":"#dc2626","35e45753-2b49-4b6b-9800-8b0a1f6f2c05":"#991b1b","b7580654-64bc-4868-b7a5-9ea5b567c678":"#450a0a","ec332519-b9aa-4f0a-89c6-70449d3af87f":"#fff7ed","e17c8800-9b61-4072-a884-bd8277aac181":"#ddd6fe","4b9c7887-fb70-41e2-a55d-95009d4ec8c0":"#c4b5fd","728ff459-b76e-4774-96fd-f7f2a7237336":"#a78bfa","c18430ef-fcf2-49f8-ae2c-d706fb0c29ac":"#5b21b6","6aa7466a-d3f0-4f22-80cf-90f7a2267e96":"#4c1d95","80abb334-4288-4181-9a7b-eee066cfbb65":"#faf5ff","bfc1f149-0e6b-4af4-8342-890b685da0a1":"#e9d5ff","6410f110-d259-46e6-a0a3-f4426b11cf1e":"#c084fc","1da637fe-d359-47aa-9817-bdcb2da56c50":"#fdf2f8","6214805d-216a-4d60-8e42-7e32fed81566":"#f472b6","6a7367a7-cf10-4f43-9d1c-464945bea8d3":"#9d174d","fab6d2fc-7341-4d2d-9a9a-1b2c482d9d4b":"#831843","5b9fb286-ca2e-4b56-b0a5-45aa0240cb7b":"#fecdd3","5295cec5-de99-4fbe-8417-b6b612062b63":"#fb7185","faab41b7-e26d-43af-b14c-e18bca984d33":"#f43f5e","d59c2c6f-7e91-4086-b72d-311b6cfed127":"#be123c","b31bbc65-b8e5-4982-b7d6-c9d17688995e":"#881337","82b7e495-9466-4805-a03e-05d321c5bccd":"#fee2e2","22d51917-94c2-486d-a6e1-ba297b046688":"#fca5a5","8bf2ec80-1cf8-444d-9062-94792bd313ef":"#ef4444","95eab4d5-fef8-4a2a-98ab-6f684a5262d0":"#b91c1c","fe7f05b2-e5a5-4c0f-aefd-11c1556532ea":"#7f1d1d","9abbc9cb-0ddf-482f-8f33-e740f72a29f2":"#f97316","852fd829-e117-4cfa-aea2-85aa06ebdb28":"#9a3412","514d15d5-4f41-43cc-8107-1094584295ea":"#431407","70aa4ef9-b641-43c0-bc85-8f0632fbee7d":"#fef3c7","cb99f497-7830-44ce-b4af-a1758b385815":"#fcd34d","ee8d8114-4964-43e7-b14c-737169087053":"#f59e0b","c2419136-fc2b-46d0-ad9c-879cca8bc41c":"#b45309","4da27cf0-24d5-4f75-9f80-43be07a29ac2":"#78350f","2fedc4b9-75bb-4f6f-8d0b-0bab772c812f":"#fef9c3","c48634ae-3f50-41b0-bd06-db60a7489c82":"#fef08a","f47d03ec-0fed-4dc2-a540-46cadf9fe8e9":"#facc15","f4a518b1-6296-42a6-ae8f-667907a57ef1":"#eab308","3af6d5a0-ed42-4002-999a-27aeca524224":"#854d0e","20acd56d-16ed-4b49-b09e-0339a3eb744d":"#422006","c0d9d3da-0cf1-482a-927c-f55a17004add":"#ffffff","94f5b2ed-297f-45c9-8a92-e1ff46bc2e52":"#f9fafb","ef8fe6b2-0297-4523-a94a-08f24e5bfda2":"#fefce8","c301ecb7-ef9c-4710-89ec-7ffecbd3f929":"#eff6ff","f6d16555-445a-40f7-9f40-66d0325615e8":"#faf5ff","2ccbcd95-e5bc-4524-bbee-b90b46f78cef":"#fdf2f8","72197116-52eb-4f45-a6a6-05c7d97dc4b1":"#000000","5d5f2a2d-e25d-483a-a7a0-38b549abdcce":"#666666","553abae1-715a-4d02-93c8-456730874b95":"#9e9e9e","5c33a999-70b0-4e32-89cc-2050bd83baf4":"#ffffff","138817f5-3f96-4c90-9f5e-a90e259a0e49":"#cccccc","54a582c6-d752-4c81-a7c0-7ed7a9af222e":"#888888","db3e6e80-309d-4a9e-8fde-892224ff9c3b":"#1976d2","48caa47d-a4fe-4983-bc9a-86b2b970e9d3":"#63a4ff","acd75149-6076-4b86-9a33-26e1b639b79e":"#004ba0","135a8902-7c82-41f1-8c58-78747d4ff648":"#ffffff","d8d747d5-5857-4d0e-8e1c-15a8631bb23f":"#1565c0","64693c67-25fa-46be-9049-5448a00ec8f2":"#0d47a1","730ac853-eb9b-4760-86f5-017eb9da335f":"#90caf9","ebfbe2da-e701-4084-9f18-97d76c4a68ae":"#e3f2fd","86fbc7b2-6311-46e2-a560-123090c8e30b":"#000000","2d0c8896-18ef-43fe-b769-0418ce6ba65a":"#d05ce3","2c98d865-25f9-4faa-a2be-05984929579a":"#ce93d8","ef485f9b-b05f-41fe-ad12-888d75d575f7":"#f3e5f5","41acc69e-107a-45cf-87d7-888be424dd56":"#d32f2f","f11c4160-2557-4b0e-b0ca-7c6756c52007":"#c62828","6050cc46-4adb-42c1-8804-0cad93e223aa":"#ed6c02","6a8bf0ca-cf14-4457-bee0-fbc461ddf85a":"#ffb74d","ab4ad273-ef3d-4278-8a05-d8a97b0d9c0f":"#ffe0b2","60be8419-6b75-4a45-ad17-abc4b07992e1":"#0288d1","4ab7c4e7-c8fb-4f0e-989a-6fb927316657":"#03a9f4","2a1f997b-e51a-4b66-83dd-21162365fedf":"#b3e5fc","25739d75-2a4e-4219-b6b5-5eed317eda16":"#4fc3f7","267a2092-6f55-45ff-9746-b2053688c5f0":"#2e7d32","6a341412-ea3b-4557-9c34-7896b0acee50":"#4caf50","660bfcbb-05d1-4741-970e-e72f621831ab":"#a5d6a7","d5dee834-9237-4532-8561-2ce2f11599b3":"#c8e6c9","050d32b6-8ae4-4b3b-8f76-cb8a49a8bf8d":"#ffffff","5cd0503b-87b9-4e47-9788-1697060af7f1":"#ebebeb","73fd0d80-796b-4c46-a9df-04ac6c61c3e5":"#1e1e1e","b9755355-d3ea-452c-b732-30bd3484c657":"#ffffff","63a669fa-d848-497c-90c7-f8659116b548":"#000000","74ffb4e3-7c4f-41db-9a98-c11bb9f741c7":"#ffffff","f35c3cef-47b2-4bce-9101-e461c0ab2bf6":"#000000","220c00d3-c925-4e06-983b-2f5a7be491b8":"#115293","86350a2a-52ce-473b-9e16-67bb884b1fb7":"#0b3c91","a5604982-bdc3-48fe-bcb3-82598f967e9b":"#90caf9","22e1690a-db46-4d50-af9e-9f70836f3ec9":"#42a5f5","dcaa1330-1f21-4fc8-8eb1-114c561c2fa9":"#9c27b0","73c44167-ac7d-4e53-8afc-e2be6da4c8bf":"#6a0080","1006be4f-0a7f-4d3b-bb17-2bc803327d68":"#e57373","e8479112-23e9-4dea-87a5-1ea6ba325255":"#ff9800","70e64714-cc01-439f-be40-203d9ccff9f1":"#e65100","f1ac88ea-999c-4715-985f-3caecc000afc":"#ff9800","434916e3-e805-43c7-ab03-37024c887536":"#81d4fa","c4638e81-9a4f-419a-bfe1-62cfb80e52d0":"#ab47bc","548edd33-0f72-4f5b-a075-ac7bb8eeb31d":"#ef5350","c76ab136-abe0-4466-a5c1-8d80251112e7":"#ef9a9a","87e698a4-1def-411c-89f1-2f5e96172484":"#ffcdd2","2c79bb58-0fbc-4bea-9f92-5238a574943f":"#01579b","1c5235f5-e69f-4349-9bdd-b252b3e5cce1":"#1b5e20","3f13ea9e-c4f8-4aa0-827f-882277a95038":"#81c784","0eb1a3da-4640-49c7-93de-e6223ccb8e0d":"#f7f7f7","769313a3-e1ae-45c4-8d24-cd3c8e6fe6f4":"#121212","7c5cc8c9-0206-4497-942c-d57fad441f4f":"#2c2c2c"} : {"65e0fd0a-b56b-4513-a236-93dae9882cfd":"#ffffff","e4e47e9a-a741-45c6-99ed-a6313055789d":"#ffffff","1445654b-e5ec-434e-9fd8-9226867baffc":"#ffffff","a6c3429c-8fda-4a47-adc5-8b417d07530e":"#ffffff","cc70eb8a-44f7-4ae5-822b-ec9a8e49b6c8":"#f1f5f9","72a60d8b-3ada-47f0-9a07-5e27e700207a":"#cbd5e1","8ad94c30-1656-423b-a9d7-748fc6cc746c":"#475569","6b81aec6-b06c-43d8-8250-7d648e3900e2":"#1e293b","3260e48a-8a31-41fd-bc65-5ee107041468":"#0f172a","1e7fc44b-81d6-4d02-b1b0-56bf5079572a":"#f9fafb","c2794e99-20cd-4c9c-90e7-2aaca0e88ed3":"#374151","aca0cdc0-5f47-434a-8d57-5da96c5841c3":"#1f2937","1f3e3f84-6390-4075-bde5-a3efd6f5f70f":"#030712","94874502-1188-4ed2-9910-411275608321":"#f4f4f5","54a805c0-1284-4e95-b2d4-90b80be1e69d":"#a1a1aa","6eb752bd-46c7-42d6-bb98-24bcfe0127a8":"#52525b","d870f568-0097-4ef6-adba-8851a0bdb924":"#3f3f46","42654e99-a589-4ce2-ad07-ccf0216f5b25":"#d4d4d4","0bdda255-6e70-4517-a616-c1892de0a10c":"#a3a3a3","a588e333-d1b5-4a05-9416-0d1bef7f3251":"#737373","b782f309-a463-4f0f-b094-d18dc0249974":"#262626","ae63ca56-5d27-451b-a0f4-fab393fae728":"#e7e5e4","aa1c8196-d73c-4451-844d-3701888c9317":"#d6d3d1","0d8b6019-4afa-41e9-aa18-af3cbc760987":"#a8a29e","bc04dbc1-a740-4c54-97a8-ba2f75d1ac4a":"#78716c","efb6cfef-17dc-4012-9a0f-9e0f523ad9e7":"#44403c","cbebcfee-ffb6-4ad2-a684-2b51c7ab529d":"#292524","59adb885-310a-4485-a6b8-70569f04fac4":"#f0fdf4","a88ec730-c007-49e4-b0bd-5ea960579b1a":"#dcfce7","d0a0103f-a288-41c0-a566-7fc88cf97257":"#bbf7d0","eeaab4a7-c192-45ed-aafd-a73ad7890907":"#16a34a","3fa164fd-38fa-44a4-8f1c-916f77d268a9":"#ffffff","c0e629a3-1d27-4c29-9cff-580fdaa124ef":"#ffffff","3520f811-7a25-4c30-b166-e0b8c3c0697d":"#ffffff","99b5e546-8a0b-4e7a-80a8-59e2f3608480":"#ffffff","d179f5ba-533c-4271-abb8-eaca02c9de3e":"#ffffff","7e30621d-782e-4464-9e04-6d5dff7ba055":"#ffffff","3e7193b4-6a2f-432a-b1c3-c35a08a33edc":"#f8fafc","b8a2bf53-da50-4ba6-8e6b-003abccd70c1":"#e2e8f0","8955fa86-ea14-46e1-a005-15bf2de5c6fa":"#94a3b8","8bf3f5ee-d944-4441-9a79-2cd84b6a41fa":"#64748b","19862ed1-e01d-419e-ae1c-1de8cc0e22fc":"#334155","bc6324d9-b498-4fed-b90a-45596c7565b3":"#020617","03375e17-4eb8-4fe0-b993-800bfb9ca1b3":"#e5e7eb","cf5cbad3-c991-47ab-a44b-118f8ee3c7c4":"#4b5563","83c4d3d9-5589-4e97-98b8-9bc10c396297":"#111827","052efd4f-e4ac-4c5e-a58c-fa7a954053d4":"#fafafa","38b09540-fe99-4586-b6f8-9128c671a047":"#e4e4e7","9ead6530-f496-4abf-8eba-bbbfed33ba79":"#d4d4d8","5ddb2632-e5ad-408b-bb36-dbe20bb76e5c":"#71717a","e55099b0-0811-4f1a-b522-a91b749348da":"#27272a","5ff93411-b4a6-48f6-8f5b-fff9f5ca1aae":"#d9f99d","967f3cf5-2037-42a2-8ef0-d97a42469720":"#a3e635","609b043b-1dc1-42c7-b21b-cc23b1d8ebeb":"#65a30d","b1c39f97-933e-4518-b077-711e6be21435":"#3f6212","385783bd-6891-4f5a-81f8-21ba53135b50":"#86efac","99ab2ec7-9d41-4f4f-9070-3c1e9e309795":"#22c55e","9ef0b6c2-542c-4dab-959a-3e81e81b62ac":"#15803d","8dd199a2-3e9b-4701-9984-906794424813":"#14532d","ba846cde-1b17-41a3-870d-6f6169ab4e23":"#ecfdf5","bccf8801-6753-4a46-8493-a40d5a2a5ef1":"#6ee7b7","2b1da28a-810f-4946-ae41-db17ccaf11cc":"#34d399","93d55e75-3356-4d7c-87ee-32020a4ef1e1":"#059669","2658c780-a816-44be-b180-bef989e8688c":"#064e3b","39f0d8a4-a489-4368-8de8-2e626d7f31c6":"#022c22","ba4dcdd3-2243-4e1b-bbe6-84ec18a0becc":"#042f2e","62bd3444-e8f2-43d7-96a9-dfbcb75ae44b":"#06b6d4","b89ca08a-1d9c-4755-a185-eab720f3b22c":"#0e7490","08382661-a6f7-4f8c-8ab2-1ccf56ae7cd3":"#155e75","d4091f28-f6dc-4041-a3ab-ae9c939e5cf8":"#164e63","1684951a-d18f-4e20-8e23-18e28e73f989":"#f0f9ff","c2f02a1a-6d8e-4161-b187-d5866667d885":"#bae6fd","c061e387-3052-4717-a82e-ecc510fa6e16":"#0284c7","2949d6c3-4b66-4202-b49a-2194156c241a":"#0369a1","1c8e67c2-448b-4a83-8c07-90223d9818fb":"#0c4a6e","b4ab0dde-dbf1-4df8-9168-26371770440e":"#dbeafe","f31aab52-47be-4be6-9d4e-fe0ad22824c7":"#93c5fd","a510110a-c54b-4d4e-b5af-a33baedfaf9a":"#a5b4fc","1fe549bc-b0d3-4be5-941e-52770a266b3b":"#6366f1","71119176-bf66-49fa-b6b1-b8fe9f59a264":"#3730a3","c1f4692d-8c63-4918-87aa-474c0518ab74":"#312e81","c872683e-ed26-4e69-a842-c73e7e56b6db":"#f5f3ff","d9766256-1dae-421c-bf02-a34bef3b75a7":"#ede9fe","5cca33fb-2779-49b9-829a-96fa232a9d8d":"#ffffff","3e8343b5-8d86-465d-baf6-030dc3fb13f3":"#ffffff","8b02beb0-5e99-4b05-83db-a428426093bb":"#ffffff","94b743ec-1cb4-461c-91b5-73d2d881f4b3":"#f3f4f6","6fa1ac05-38a0-4a57-8d69-130323b5b06e":"#d1d5db","7d3b7e26-a649-4f77-b803-413fb93d0076":"#9ca3af","b95b6750-4288-4aab-b66c-b27874072ff7":"#6b7280","712305b4-8077-4c4e-afbd-fdf1d3ba5f84":"#ea580c","6e00b59e-9998-44ab-91f2-3ba0f1f9d943":"#c2410c","49554059-1995-4842-a0cb-43e46811d133":"#7c2d12","1739ffe2-d27c-4b82-8419-f666b3a58806":"#fffbeb","6227b0e6-e7df-4a8a-9243-636f59b56382":"#fde68a","8297485f-e34d-43ca-83af-4af250bfd41f":"#fbbf24","41881bd5-469e-4ef4-8969-cdf67259c60e":"#d97706","ba85abd9-c0b5-463a-9f4e-093cd6c6738e":"#92400e","6200eebe-39c0-4bd4-a1b1-e1cf5111639e":"#451a03","9ea9e6b8-12cf-439e-9493-bbc13840d467":"#fefce8","a38406a9-d658-4615-bcba-66542283826a":"#fde047","0fb3aeb6-e80b-4951-b55f-961608f347be":"#ca8a04","d00006e4-8df4-4cd4-8434-d35fe4846966":"#a16207","37df1c2d-a739-4fa7-af24-177a9628e8d9":"#713f12","497305b7-34bd-4fac-b3a8-6d2fa0716c22":"#fef2f2","1aa63a96-75dc-4324-b9a4-eb8277bd231e":"#f0fdf4","0bbfab52-7d32-4938-8682-8471ecf5de41":"#18181b","f0476b85-c3c0-46c4-b816-585e54779f44":"#09090b","5bf849be-1bb1-4ebe-8a1d-27cbd853eca4":"#fafafa","2be2ca23-4fea-4f4c-af5f-fda8bee8ceb8":"#f5f5f5","739e795a-7577-48a2-af37-419d81390f4d":"#e5e5e5","e64554b0-86dc-4d68-a990-79ce8db4db30":"#525252","054f0ac0-29f2-4adb-8a00-97098b4a4094":"#404040","9b3a078b-93ff-4414-8c1f-c1b0d50e4368":"#171717","c176d54d-185a-4837-97b6-e37127794a41":"#0a0a0a","f53f51dc-d1a5-4a4e-8d71-be58429c8ffa":"#fafaf9","06a81ea4-96ca-4386-b52b-e6e6bd9dd6b3":"#f5f5f4","f76cffbd-12c3-4d04-a7d6-0e76f51c6fe0":"#57534e","be324605-b963-4dc4-98f0-b8f7f254c59d":"#292524","d7f56af1-e123-463e-9c84-297b5f9c5dc5":"#0c0a09","2ff940f9-c8c9-445c-a50e-27eef3c2c1f3":"#f7fee7","7619dcc1-395e-4306-9154-781c9a6c0165":"#ecfccb","44bace26-8ab1-400d-a877-e261d47e40dd":"#bef264","321d0a57-f873-45e7-8132-2fb84b8cb51e":"#84cc16","8fcb4201-75d9-4486-9cb2-83a0fb72589d":"#4d7c0f","18946f2e-a31d-4ebe-a0fa-d0a326c190a3":"#365314","c9a434bf-3a52-4df3-bf6b-9e5d2046dfb2":"#1a2e05","939dfbd4-4348-4a90-8e86-0b3dd59848f7":"#4ade80","8245735f-58fa-4cbd-a338-36e2216868b3":"#166534","7bc6889f-c2e0-40a6-88ae-67b3dcfdb61c":"#052e16","073c33fc-1656-433d-8973-f6ba28e0ad41":"#d1fae5","c7a4a49c-4d35-4600-8e49-c044540275da":"#a7f3d0","584d3606-f0a8-40da-b418-94115e19558a":"#10b981","7db1e29f-ec3c-4019-a689-f07ff75dbbc5":"#047857","c498d5d2-71a5-4740-b919-2a1b84451026":"#065f46","e1dd073a-587b-494a-a924-bd337d45f551":"#f0fdfa","88552b6e-ae0e-471a-9132-d79e877640ba":"#5eead4","dc7d4c31-7a37-4dd5-806b-22f212056d85":"#14b8a6","1f5dc540-a693-46d5-9147-9da3879280d7":"#0d9488","d4f3993d-405f-4d23-962b-7d315bb7d39f":"#115e59","e0182bf2-0197-4fd1-be23-8e1000e97c8a":"#ecfeff","844b05fe-c6ef-4b08-9b84-b8ff209e8a51":"#a5f3fc","f95be63b-9eb0-478e-a8f5-2071843417be":"#67e8f9","f518f023-ac7d-45dc-8093-e625d76a23e0":"#22d3ee","019bd829-107a-478f-a54c-5af003411951":"#0891b2","46102c07-2181-4279-a10b-9b11f5679e3a":"#38bdf8","f826d5ba-84f3-419e-965a-269f80efb000":"#eff6ff","373807ba-a716-435b-9b4e-b2f58a17e458":"#bfdbfe","ad5122a7-e103-4768-9e24-0b6cd25fe7d3":"#60a5fa","bb7bde18-1a1a-4e8a-b230-a784c8a628c8":"#1e40af","ac7bac6c-4779-46d1-83d9-dbb449e74c99":"#172554","264f18a2-7d50-4588-92d6-e3e998407216":"#e0e7ff","16155b9b-78ae-4b4f-a2e9-31054f236611":"#7c3aed","7ef7c683-8e80-4821-8e8e-6b569cb3bf6c":"#6d28d9","175c690e-f7dc-4b9e-83bd-3a3b5bbcb711":"#2e1065","a0547f9b-85a2-4d7d-9aed-0fc16cbaf715":"#f3e8ff","54910133-a722-4d3a-9668-2388aec0536f":"#d8b4fe","df23e9b6-c987-4358-9c87-43e99bc45722":"#a855f7","4048b808-442a-4856-a266-a6c0529d94b7":"#9333ea","6937f48f-af1a-498f-ba15-48a2766f95fe":"#3b0764","752459f9-a184-4c09-9178-a35bd59618ce":"#fae8ff","20fccb4f-0087-4912-908b-03ef142c695a":"#f5d0fe","017b9c31-2b50-4eaf-9c56-8888124d5469":"#f0abfc","19ae91b8-8c59-41e4-9894-b8450350cafc":"#d946ef","231e0867-3e27-408f-9eb5-5189addcb835":"#c026d3","1a558ded-87ce-4a7f-b3c7-4df516f970b3":"#a21caf","1484b49e-8b57-4a9a-8e6a-bf17ddc1ea47":"#86198f","c9cad4c8-e980-465d-a064-f9f5ffc86704":"#701a75","d9bcd91c-9aea-42a1-ba26-f3030d536612":"#4a044e","3843d14a-790c-4cf0-bed6-af3655d9e7b5":"#fdf2f8","e01e117d-3924-4576-926b-866d923b6518":"#fbcfe8","29b2e52a-746b-4b0c-b0bb-25dd1cf21409":"#f9a8d4","7778deab-707c-437d-8892-9f64a096fa18":"#ec4899","fc49a348-3c5b-4fbb-b72a-f36201aad74f":"#ffedd5","6a47a85b-7645-4984-b196-d1b2d87a536b":"#fed7aa","c94dee77-340d-4dc9-a5d3-18c078769ab0":"#fdba74","25135c42-d2ee-48fe-966e-77d43d8c3a7e":"#fb923c","4e9bcc80-89c3-4b27-9a0b-019b494ac5f7":"#eef2ff","c47c8ded-d333-489b-846d-62ae8f3cee1a":"#ccfbf1","15763ec4-1108-4a2e-96b2-13b36d6f4277":"#99f6e4","d108cfe9-5def-43f9-af21-f171c6344afa":"#2dd4bf","7b4d3b50-5ea9-4b62-beca-73306263a58e":"#0f766e","132247cc-392b-4223-b4b4-d0cea9cc6c92":"#134e4a","e033e639-44d2-4765-a4b8-e909ac582cf8":"#cffafe","253187e7-25a6-493c-846f-5ca696fa0841":"#083344","2c40e477-039e-4d4d-9a19-64778d71d7da":"#e0f2fe","31bc74d5-849c-4cf9-b380-5e00309d47b4":"#7dd3fc","fdc01a9c-b9c1-49fe-803a-23bab8c4467b":"#0ea5e9","5c502e42-5ef9-4d77-bb8e-9ad5f4610081":"#075985","13f4ed89-2c37-4b6b-8a2e-e4051891f544":"#082f49","d0a4f27d-af7f-4a53-ac30-babbf8d67332":"#3b82f6","db72fa95-1345-42f6-8c33-067fc395c3df":"#2563eb","e00d0d69-cefc-4fe9-9289-f0fe0b3657ac":"#1d4ed8","8e9ab522-bb99-4e90-80d2-67c6a1f92fef":"#1e3a8a","32897c02-01a7-4d1b-8df3-8a250b101b62":"#eef2ff","c2c53206-7a69-4722-91cd-b1cc6aa6a232":"#c7d2fe","55c5a7d5-7f73-4f9b-aebe-ec8ac698b1a5":"#818cf8","bd2d6eb4-dcad-4526-8d56-a944fec0a815":"#4f46e5","510e0e68-eda2-4ab9-adf1-2677533694d7":"#4338ca","76fa08fc-29c2-46b5-b33a-12568fed9f31":"#1e1b4b","eb235201-468e-4ef7-9c57-3ea72b15b4df":"#8b5cf6","2aba6f1c-e70e-43e2-adce-5d02b08d05a6":"#7e22ce","0be35a3c-6e14-4b3b-97a8-cf52bd62d6f0":"#6b21a8","ab5c53a6-f6a0-47be-beec-fb6c4a7d77dd":"#581c87","c7d15ba4-b925-4d1b-8e60-66e62260f15e":"#fdf4ff","0fac599f-e823-4e1d-af28-d343232847d3":"#e879f9","6233fa1d-ffde-4ccc-af27-de9d72e8c522":"#db2777","0e177be4-2c1f-4fe1-a6e8-69cfcd4e1757":"#be185d","ff5a63a6-b76f-4e3e-ad4b-459cb7e715fe":"#500724","267eaf62-75e9-46de-8db6-6482a80a4825":"#fff1f2","91cd4cb2-7aa6-4b4f-97b4-d80b0d941617":"#ffe4e6","7f198d44-be47-4ee6-a517-6266486da38c":"#fda4af","a5690f09-166d-46bc-8c2a-aae8516e2c2e":"#e11d48","6fda5901-fc6e-47ed-b8e1-98d282cbde18":"#9f1239","a5d4a9e2-1a6c-4a98-962c-b143890f4c96":"#4c0519","9a067a75-7a21-41a6-b7fe-d19c1d34adac":"#fef2f2","c37c3097-d402-44b9-9083-55f2861f0f33":"#fecaca","da600d04-f453-4530-89a7-f8ab32d2c095":"#f87171","3573ab82-1f82-4dfd-9954-afa6411ddf9b":"#dc2626","35e45753-2b49-4b6b-9800-8b0a1f6f2c05":"#991b1b","b7580654-64bc-4868-b7a5-9ea5b567c678":"#450a0a","ec332519-b9aa-4f0a-89c6-70449d3af87f":"#fff7ed","e17c8800-9b61-4072-a884-bd8277aac181":"#ddd6fe","4b9c7887-fb70-41e2-a55d-95009d4ec8c0":"#c4b5fd","728ff459-b76e-4774-96fd-f7f2a7237336":"#a78bfa","c18430ef-fcf2-49f8-ae2c-d706fb0c29ac":"#5b21b6","6aa7466a-d3f0-4f22-80cf-90f7a2267e96":"#4c1d95","80abb334-4288-4181-9a7b-eee066cfbb65":"#faf5ff","bfc1f149-0e6b-4af4-8342-890b685da0a1":"#e9d5ff","6410f110-d259-46e6-a0a3-f4426b11cf1e":"#c084fc","1da637fe-d359-47aa-9817-bdcb2da56c50":"#fdf2f8","6214805d-216a-4d60-8e42-7e32fed81566":"#f472b6","6a7367a7-cf10-4f43-9d1c-464945bea8d3":"#9d174d","fab6d2fc-7341-4d2d-9a9a-1b2c482d9d4b":"#831843","5b9fb286-ca2e-4b56-b0a5-45aa0240cb7b":"#fecdd3","5295cec5-de99-4fbe-8417-b6b612062b63":"#fb7185","faab41b7-e26d-43af-b14c-e18bca984d33":"#f43f5e","d59c2c6f-7e91-4086-b72d-311b6cfed127":"#be123c","b31bbc65-b8e5-4982-b7d6-c9d17688995e":"#881337","82b7e495-9466-4805-a03e-05d321c5bccd":"#fee2e2","22d51917-94c2-486d-a6e1-ba297b046688":"#fca5a5","8bf2ec80-1cf8-444d-9062-94792bd313ef":"#ef4444","95eab4d5-fef8-4a2a-98ab-6f684a5262d0":"#b91c1c","fe7f05b2-e5a5-4c0f-aefd-11c1556532ea":"#7f1d1d","9abbc9cb-0ddf-482f-8f33-e740f72a29f2":"#f97316","852fd829-e117-4cfa-aea2-85aa06ebdb28":"#9a3412","514d15d5-4f41-43cc-8107-1094584295ea":"#431407","70aa4ef9-b641-43c0-bc85-8f0632fbee7d":"#fef3c7","cb99f497-7830-44ce-b4af-a1758b385815":"#fcd34d","ee8d8114-4964-43e7-b14c-737169087053":"#f59e0b","c2419136-fc2b-46d0-ad9c-879cca8bc41c":"#b45309","4da27cf0-24d5-4f75-9f80-43be07a29ac2":"#78350f","2fedc4b9-75bb-4f6f-8d0b-0bab772c812f":"#fef9c3","c48634ae-3f50-41b0-bd06-db60a7489c82":"#fef08a","f47d03ec-0fed-4dc2-a540-46cadf9fe8e9":"#facc15","f4a518b1-6296-42a6-ae8f-667907a57ef1":"#eab308","3af6d5a0-ed42-4002-999a-27aeca524224":"#854d0e","20acd56d-16ed-4b49-b09e-0339a3eb744d":"#422006","c0d9d3da-0cf1-482a-927c-f55a17004add":"#ffffff","94f5b2ed-297f-45c9-8a92-e1ff46bc2e52":"#f9fafb","ef8fe6b2-0297-4523-a94a-08f24e5bfda2":"#fefce8","c301ecb7-ef9c-4710-89ec-7ffecbd3f929":"#eff6ff","f6d16555-445a-40f7-9f40-66d0325615e8":"#faf5ff","2ccbcd95-e5bc-4524-bbee-b90b46f78cef":"#fdf2f8","72197116-52eb-4f45-a6a6-05c7d97dc4b1":"#000000","5d5f2a2d-e25d-483a-a7a0-38b549abdcce":"#666666","553abae1-715a-4d02-93c8-456730874b95":"#9e9e9e","5c33a999-70b0-4e32-89cc-2050bd83baf4":"#ffffff","138817f5-3f96-4c90-9f5e-a90e259a0e49":"#cccccc","54a582c6-d752-4c81-a7c0-7ed7a9af222e":"#888888","db3e6e80-309d-4a9e-8fde-892224ff9c3b":"#1976d2","48caa47d-a4fe-4983-bc9a-86b2b970e9d3":"#63a4ff","acd75149-6076-4b86-9a33-26e1b639b79e":"#004ba0","135a8902-7c82-41f1-8c58-78747d4ff648":"#ffffff","d8d747d5-5857-4d0e-8e1c-15a8631bb23f":"#1565c0","64693c67-25fa-46be-9049-5448a00ec8f2":"#0d47a1","730ac853-eb9b-4760-86f5-017eb9da335f":"#90caf9","ebfbe2da-e701-4084-9f18-97d76c4a68ae":"#e3f2fd","86fbc7b2-6311-46e2-a560-123090c8e30b":"#000000","2d0c8896-18ef-43fe-b769-0418ce6ba65a":"#d05ce3","2c98d865-25f9-4faa-a2be-05984929579a":"#ce93d8","ef485f9b-b05f-41fe-ad12-888d75d575f7":"#f3e5f5","41acc69e-107a-45cf-87d7-888be424dd56":"#d32f2f","f11c4160-2557-4b0e-b0ca-7c6756c52007":"#c62828","6050cc46-4adb-42c1-8804-0cad93e223aa":"#ed6c02","6a8bf0ca-cf14-4457-bee0-fbc461ddf85a":"#ffb74d","ab4ad273-ef3d-4278-8a05-d8a97b0d9c0f":"#ffe0b2","60be8419-6b75-4a45-ad17-abc4b07992e1":"#0288d1","4ab7c4e7-c8fb-4f0e-989a-6fb927316657":"#03a9f4","2a1f997b-e51a-4b66-83dd-21162365fedf":"#b3e5fc","25739d75-2a4e-4219-b6b5-5eed317eda16":"#4fc3f7","267a2092-6f55-45ff-9746-b2053688c5f0":"#2e7d32","6a341412-ea3b-4557-9c34-7896b0acee50":"#4caf50","660bfcbb-05d1-4741-970e-e72f621831ab":"#a5d6a7","d5dee834-9237-4532-8561-2ce2f11599b3":"#c8e6c9","050d32b6-8ae4-4b3b-8f76-cb8a49a8bf8d":"#ffffff","5cd0503b-87b9-4e47-9788-1697060af7f1":"#ebebeb","73fd0d80-796b-4c46-a9df-04ac6c61c3e5":"#1e1e1e","b9755355-d3ea-452c-b732-30bd3484c657":"#ffffff","63a669fa-d848-497c-90c7-f8659116b548":"#000000","74ffb4e3-7c4f-41db-9a98-c11bb9f741c7":"#ffffff","f35c3cef-47b2-4bce-9101-e461c0ab2bf6":"#000000","220c00d3-c925-4e06-983b-2f5a7be491b8":"#115293","86350a2a-52ce-473b-9e16-67bb884b1fb7":"#0b3c91","a5604982-bdc3-48fe-bcb3-82598f967e9b":"#90caf9","22e1690a-db46-4d50-af9e-9f70836f3ec9":"#42a5f5","dcaa1330-1f21-4fc8-8eb1-114c561c2fa9":"#9c27b0","73c44167-ac7d-4e53-8afc-e2be6da4c8bf":"#6a0080","1006be4f-0a7f-4d3b-bb17-2bc803327d68":"#e57373","e8479112-23e9-4dea-87a5-1ea6ba325255":"#ff9800","70e64714-cc01-439f-be40-203d9ccff9f1":"#e65100","f1ac88ea-999c-4715-985f-3caecc000afc":"#ff9800","434916e3-e805-43c7-ab03-37024c887536":"#81d4fa","c4638e81-9a4f-419a-bfe1-62cfb80e52d0":"#ab47bc","548edd33-0f72-4f5b-a075-ac7bb8eeb31d":"#ef5350","c76ab136-abe0-4466-a5c1-8d80251112e7":"#ef9a9a","87e698a4-1def-411c-89f1-2f5e96172484":"#ffcdd2","2c79bb58-0fbc-4bea-9f92-5238a574943f":"#01579b","1c5235f5-e69f-4349-9bdd-b252b3e5cce1":"#1b5e20","3f13ea9e-c4f8-4aa0-827f-882277a95038":"#81c784","0eb1a3da-4640-49c7-93de-e6223ccb8e0d":"#f7f7f7","769313a3-e1ae-45c4-8d24-cd3c8e6fe6f4":"#121212","7c5cc8c9-0206-4497-942c-d57fad441f4f":"#2c2c2c"};
            /* wwFront:end */
        }),
        spacings:
         /* wwFront:start */
        // eslint-disable-next-line no-unreachable, no-undef
        {"8e8fc3ae-fe16-43bc-9774-ff956cd476e2":"4px"},
        /* wwFront:end */
        typographies:
         /* wwFront:start */
        // eslint-disable-next-line no-unreachable, no-undef
        {"c20cae53-4085-4792-8df7-14d65049cb59":"300 12px/16px var(--ww-default-font-family, sans-serif)","1964b5d4-484d-4377-97f9-a7b657c55061":"400 12px/16px var(--ww-default-font-family, sans-serif)","6eb43cef-c8cd-4757-b043-634eeef514ef":"500 12px/16px var(--ww-default-font-family, sans-serif)","ce041abc-c3fb-435a-a59b-033e876c5498":"300 14px/20px var(--ww-default-font-family, sans-serif)","b8fa86af-4a56-4418-a1ce-a2dbdc1063d6":"500 14px/20px var(--ww-default-font-family, sans-serif)","c44ca270-62b1-4ec2-919e-164389e18b51":"400 16px/24px var(--ww-default-font-family, sans-serif)","c32651cf-ea21-4c86-adce-c65e09490a30":"600 16px/24px var(--ww-default-font-family, sans-serif)","72083b48-d9b3-4820-be32-bacdeadc88ec":"600 12px/16px var(--ww-default-font-family, sans-serif)","a298dbe4-aa01-4bbe-b83c-1e246db344a9":"700 12px/16px var(--ww-default-font-family, sans-serif)","d8129b8b-d0a1-4a91-8f35-d6625d30f27d":"400 14px/20px var(--ww-default-font-family, sans-serif)","6127096f-dfc6-424b-8205-e94a7609a8f3":"600 14px/20px var(--ww-default-font-family, sans-serif)","573ffdea-2363-4a8c-8646-a711eba88664":"700 14px/20px var(--ww-default-font-family, sans-serif)","77c2e04e-4ab0-4a9c-94aa-0cddab508321":"300 16px/24px var(--ww-default-font-family, sans-serif)","c3e3f6f1-4688-4e8d-8ce7-f28d5ac7dfee":"500 16px/24px var(--ww-default-font-family, sans-serif)","40574314-20f4-4e32-b5ea-57bd33884404":"700 16px/24px var(--ww-default-font-family, sans-serif)","71b2f209-000d-406f-835b-04a7e1224d52":"300 18px/undefined var(--ww-default-font-family, sans-serif)","f15df165-72b3-45b6-98bb-6c5262f78160":"500 18px/undefined var(--ww-default-font-family, sans-serif)","7a3ff116-70ce-435c-b198-0a8fe987b1c1":"700 18px/undefined var(--ww-default-font-family, sans-serif)","38873e23-c662-4968-ba1c-5882a5b6ba98":"400 20px/undefined var(--ww-default-font-family, sans-serif)","3c1acb0b-5d87-41b0-87b7-5d43103c2050":"600 20px/undefined var(--ww-default-font-family, sans-serif)","3264774a-771e-41d0-aca3-edc98a8f6ce1":"700 20px/undefined var(--ww-default-font-family, sans-serif)","b334ac4a-9811-4b09-92ae-4d30b9840871":"300 24px/undefined var(--ww-default-font-family, sans-serif)","f23408b0-a139-4544-a6cc-ec56b93d30fc":"500 24px/undefined var(--ww-default-font-family, sans-serif)","5a8b7882-c52a-4ed8-938f-b81ce3500b70":"700 24px/undefined var(--ww-default-font-family, sans-serif)","40b81bec-5490-461c-af52-575ede48fefa":"400 30px/undefined var(--ww-default-font-family, sans-serif)","6f3df55a-afd6-41b4-95d7-a2537c8665ca":"600 30px/undefined var(--ww-default-font-family, sans-serif)","13d11668-43d9-4510-b266-98a2b7ff61fe":"700 30px/undefined var(--ww-default-font-family, sans-serif)","cd48fd89-2e63-406e-833d-e3893f4c2a22":"700 60px/undefined var(--ww-default-font-family, sans-serif)","458d9fd8-0c78-4797-b011-49c020573b5d":"300 72px/undefined var(--ww-default-font-family, sans-serif)","52d1e31d-2c83-41bd-99ca-7ffe055ad8aa":"500 72px/undefined var(--ww-default-font-family, sans-serif)","131b736b-537e-4a1a-9ce9-0b836a779f5d":"700 72px/undefined var(--ww-default-font-family, sans-serif)","79628f5e-af0f-43ae-9d48-e4c3a1349525":"300 96px/undefined var(--ww-default-font-family, sans-serif)","d00673c6-38b0-4f4d-93da-ca57cc650808":"400 96px/undefined var(--ww-default-font-family, sans-serif)","6be2fd94-f74f-41e8-a848-9519979b1d91":"600 96px/undefined var(--ww-default-font-family, sans-serif)","81fcee7b-9a1d-4b81-994f-cb85d2cf76e2":"300 128px/undefined var(--ww-default-font-family, sans-serif)","336bc1ee-23c0-4e2c-83e6-679b71d8435a":"500 128px/undefined var(--ww-default-font-family, sans-serif)","408aa99c-b6ff-4adc-8ec6-ff13bde4e4dc":"500 14px/undefined var(--ww-default-font-family, sans-serif)","02f704c4-42df-4a20-a29e-e42df8afffc6":"500 15px/undefined var(--ww-default-font-family, sans-serif)","c69d2ccb-2e6b-4fc1-97be-d255f1651f88":"500 20px/undefined var(--ww-default-font-family, sans-serif)","72a12d32-3035-4d57-9ade-3aaefadfb931":"600 20px/undefined var(--ww-default-font-family, sans-serif)","a8127864-be69-439d-bcbe-1a01d2be7304":"400 12px/undefined var(--ww-default-font-family, sans-serif)","09a25b7c-991c-4502-83c5-a6dd28895729":"400 18px/28px var(--ww-default-font-family, sans-serif)","e3e12c5c-1200-4706-a3e7-1bbb077cb11c":"400 18px/undefined var(--ww-default-font-family, sans-serif)","1e02187c-0bd2-4c87-abe0-a83267b53afe":"600 18px/undefined var(--ww-default-font-family, sans-serif)","35ecd4dd-1fae-4513-9e98-834c5374fcb6":"300 20px/undefined var(--ww-default-font-family, sans-serif)","fcc4ecb6-4c18-4d3b-9c05-f6403da39e81":"500 20px/undefined var(--ww-default-font-family, sans-serif)","ebbf36e8-e9e8-4751-afa0-71870440da52":"400 24px/undefined var(--ww-default-font-family, sans-serif)","8db1a829-8705-4944-9af3-ece2c85855c0":"600 24px/undefined var(--ww-default-font-family, sans-serif)","091b212f-4d77-484e-96ea-46ac7f40b88c":"300 30px/undefined var(--ww-default-font-family, sans-serif)","dee9c604-15f9-49d7-bbfa-c69308eef763":"500 30px/undefined var(--ww-default-font-family, sans-serif)","3f6bd797-b190-4601-bf91-3b86eb15fc9d":"500 36px/undefined var(--ww-default-font-family, sans-serif)","a88259d3-643d-4e85-841a-f09dbce7d71e":"300 48px/undefined var(--ww-default-font-family, sans-serif)","3809bd6d-9a2d-42d0-8de5-d2b0eb1f37a1":"300 60px/undefined var(--ww-default-font-family, sans-serif)","3d8108e9-015c-46bb-92a3-373b6597b56d":"600 60px/undefined var(--ww-default-font-family, sans-serif)","542b655e-2ea1-4113-8b10-52bb6453a5e3":"300 36px/undefined var(--ww-default-font-family, sans-serif)","63fde603-5c6b-434c-a5b5-1535acf03c30":"400 36px/undefined var(--ww-default-font-family, sans-serif)","ae95b36f-bc57-471d-84ba-8e4dbf2ae28a":"600 36px/undefined var(--ww-default-font-family, sans-serif)","6f047ad5-ae1b-489c-8880-ea1ea4b08bb8":"700 36px/undefined var(--ww-default-font-family, sans-serif)","7b90c845-c9c6-4618-9904-a4709a439d6c":"400 48px/undefined var(--ww-default-font-family, sans-serif)","17febefb-e5ef-4082-9c6d-ae203898874e":"500 48px/undefined var(--ww-default-font-family, sans-serif)","de4151d0-013f-4a2b-8368-0f43705b2b2f":"600 48px/undefined var(--ww-default-font-family, sans-serif)","69fee900-2b82-4682-a967-71d12a6d16fe":"700 48px/undefined var(--ww-default-font-family, sans-serif)","1ca3324e-cfa5-45bb-a23d-a556af267c8a":"400 60px/undefined var(--ww-default-font-family, sans-serif)","71b02b26-a73f-459f-a0d4-5f7a12fb3683":"500 60px/undefined var(--ww-default-font-family, sans-serif)","12db64be-36f9-41fb-a63e-bbc243563aff":"400 72px/undefined var(--ww-default-font-family, sans-serif)","77235b1a-443b-4f42-a5e0-da989f7ecf01":"600 72px/undefined var(--ww-default-font-family, sans-serif)","b1852bf8-4fa1-4686-a484-8d2f3598f489":"500 96px/undefined var(--ww-default-font-family, sans-serif)","16898d0e-4467-4040-86d3-81592da09ab5":"700 96px/undefined var(--ww-default-font-family, sans-serif)","009b822d-efe7-4412-b31b-1c9c451d5345":"400 128px/undefined var(--ww-default-font-family, sans-serif)","aec8e26a-dc54-44d1-9800-5407be1c5f35":"600 128px/undefined var(--ww-default-font-family, sans-serif)","76688269-a449-4424-ac99-bd90621b30da":"700 128px/undefined var(--ww-default-font-family, sans-serif)","2783f705-cfb2-4356-ba6d-602f8189457b":"600 14px/undefined var(--ww-default-font-family, sans-serif)","35d2d3c9-8ee2-4ce6-9301-5daf63925487":"600 15px/undefined var(--ww-default-font-family, sans-serif)","407cfffa-68b5-4581-a247-c2f77775d048":"500 10px/16px var(--ww-default-font-family, sans-serif)","266d0e70-aa65-47ed-9b30-805ab5649f3a":"400 16px/24px var(--ww-default-font-family, sans-serif)","18ab0f6e-a95a-4e54-a0bb-b22489520d33":"300 96px/undefined var(--ww-default-font-family, sans-serif)","bd4d2ac6-8561-4c60-8dd5-accac926681f":"300 60px/undefined var(--ww-default-font-family, sans-serif)","5ad1a6b3-6b37-4c4e-94fc-f165f5525227":"400 48px/undefined var(--ww-default-font-family, sans-serif)","1c27b20c-be19-4475-89eb-180854eef5b0":"400 34px/undefined var(--ww-default-font-family, sans-serif)","26308074-4ba5-4192-a948-28f5cbc688fc":"400 24px/undefined var(--ww-default-font-family, sans-serif)","c3ed288e-0aab-40e3-a15e-47759bc9adbe":"500 20px/undefined var(--ww-default-font-family, sans-serif)","d1072a2f-21dd-4d4b-b365-d3d1979b1534":"400 16px/undefined var(--ww-default-font-family, sans-serif)","69ba1a54-e382-45d5-8457-0741a3e57c86":"400 14px/undefined var(--ww-default-font-family, sans-serif)","a70c8486-b0a0-442d-b563-af9f74177b8b":"400 16px/undefined var(--ww-default-font-family, sans-serif)","2f8d3f41-39c3-4bdd-b401-d4786649e9fa":"400 12px/undefined var(--ww-default-font-family, sans-serif)","36296ef0-9089-4edb-a4b6-7250624df816":"500 16px/undefined var(--ww-default-font-family, sans-serif)","480f51f9-0ad9-458b-85db-1caa8ffd66fd":"400 20px/20px var(--ww-default-font-family, sans-serif)","492dda89-265a-40f1-8ca8-d736b278352d":"400 12px/12px var(--ww-default-font-family, sans-serif)","3ab04976-438b-4fa6-98b5-690cfe0e9b62":"400 14px/undefined var(--ww-default-font-family, sans-serif)","dcf62809-0300-49ac-b70a-d7adb8ff9600":"500 13px/22px var(--ww-default-font-family, sans-serif)","a8de724a-d57e-41f7-a61f-20478039cc8d":"500 16px/undefined var(--ww-default-font-family, sans-serif)","3464cc88-ab99-4779-b9dd-98542512707c":"400 16px/24px var(--ww-default-font-family, sans-serif)","607b80c8-e7c4-47bd-991c-ddd822bcb86c":"500 14px/48px var(--ww-default-font-family, sans-serif)","a13a5a4b-e83e-4736-b255-fed6f28f27e2":"400 14px/24px var(--ww-default-font-family, sans-serif)","8a98c944-cbba-4f0c-9f74-4f67d693db68":"500 10px/14px var(--ww-default-font-family, sans-serif)","8b62b441-4d81-412c-8b1a-c0f3df6ac655":"500 12px/12px var(--ww-default-font-family, sans-serif)","91f350c6-d5cc-42e6-969a-1bb1ac2eedc0":"500 14px/undefined var(--ww-default-font-family, sans-serif)","78c7d436-968f-4735-a3a1-09a13a001bea":"400 12px/undefined var(--ww-default-font-family, sans-serif)","69c74607-de15-4193-a542-f3e752c56f52":"500 14px/undefined var(--ww-default-font-family, sans-serif)","d42818b6-689b-45be-97a8-924d333b61a3":"400 10px/10px var(--ww-default-font-family, sans-serif)","3e700b2f-3e17-4be6-b670-a8cac46f39f1":"500 12px/20px var(--ww-default-font-family, sans-serif)","2fe5697d-459c-4dd6-b805-9fe97e6914db":"500 15px/26px var(--ww-default-font-family, sans-serif)","80ac4dfb-fb58-49d4-bd5f-3199e6d5bc6e":"500 14px/24px var(--ww-default-font-family, sans-serif)","10b2e8c4-6a58-4858-878d-a5d840691e92":"400 13px/18px var(--ww-default-font-family, sans-serif)","1ee216c7-cb92-4031-af5c-50ab0f286847":"400 12px/12px var(--ww-default-font-family, sans-serif)","27c74c43-46f4-4870-b398-caabeb2d0f48":"400 12px/undefined var(--ww-default-font-family, sans-serif)","ca410a55-1ee8-4ba6-94e6-c9ff908e87d8":"400 16px/undefined var(--ww-default-font-family, sans-serif)","e77088d4-6fd7-40ef-9203-b81ebb53e64d":"500 14px/24px var(--ww-default-font-family, sans-serif)","26344d09-b8c6-4431-85b1-66f80047898a":"500 64px/undefined var(--ww-default-font-family, sans-serif)"},
        /* wwFront:end */
        browser: computed(() => {
            const router = wwLib.manager ? wwLib.getEditorRouter() : wwLib.getFrontRouter();
            const currentRoute = router.currentRoute.value;
            let currentQueries = currentRoute.query;
             return {
                url: window.location.origin + currentRoute.fullPath,
                path: currentRoute.path,
                // verify if auth plugin
                 /* wwFront:start */
                // eslint-disable-next-line no-dupe-keys
                source: currentQueries._source,
                /* wwFront:end */
                query: currentQueries,
                domain: window.location.hostname,
                baseUrl: window.location.origin,
                breakpoint: wwLib.$store.getters['front/getScreenSize'],
                environment: wwLib.getEnvironment(),
                theme: wwLib.$store.getters['front/getTheme'],
            };
        }),
        screen: services.scrollStore.screen,
        componentPositionInfo: services.scrollStore.componentPositionInfo,
    }),

    pageData: computed(() => {
        const lang = wwLib.$store.getters['front/getLang'];
        const cmsDataSetPath = wwLib.$store.getters['websiteData/getPage'].cmsDataSetPath;
        if (!cmsDataSetPath) {
            return { lang };
        }

        return { lang, data: wwLib.$store.getters['data/getPageCollectionData'] };
    }),

    getEnvironment() {
        return wwLib.manager
            ? 'editor'
            : window.location.host.includes(
                  '-staging.' + (process.env.WW_ENV === 'staging' ? process.env.VUE_APP_PREVIEW_URL : '')
              )
            ? 'staging'
            : window.location.host.includes(process.env.VUE_APP_PREVIEW_URL)
            ? 'preview'
            : 'production';
    },

    useBaseTag() {
        return (
            wwLib.getEnvironment() === 'production' &&
            window.wwg_designInfo.baseTag &&
            window.wwg_designInfo.baseTag.href
        );
    },

    getBaseTag() {
        let baseTag = window.wwg_designInfo.baseTag?.href || '';
        if (!baseTag.startsWith('/')) {
            baseTag = '/' + baseTag;
        }
        if (!baseTag.endsWith('/')) {
            baseTag += '/';
        }
        return baseTag;
    },

    /**
     * @PUBLIC_API
     */
    getFrontWindow() {
        if (document.querySelector('.ww-manager-iframe')) {
            return document.querySelector('.ww-manager-iframe').contentWindow;
        }
        return window;
    },

    /**
     * @PUBLIC_API
     */
    getFrontDocument() {
        return this.getFrontWindow().document;
    },

    /**
     * @PUBLIC_API
     */
    getFrontRouter() {
        return this.front.router;
    },

    /**
     * @PUBLIC_API
     */
    getEditorWindow() {
         // eslint-disable-next-line no-unreachable
        return null;
    },

    /**
     * @PUBLIC_API
     */
    getEditorDocument() {
         // eslint-disable-next-line no-unreachable
        return null;
    },

    /**
     * @PUBLIC_API
     */
    getEditorRouter() {
        return this.editor.router;
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwApp.goTo
     */
    goTo(...args) {
        wwLib.wwLog.warn('wwLib.goTo is DEPRECATED, use wwLib.wwApp.goTo instead');
        wwLib.wwApp.goTo(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwUtils.getStyleFromToken
     */
    getStyleFromToken(...args) {
        // wwLib.wwLog.warn('wwLib.getStyleFromToken is DEPRECATED, use wwLib.wwUtils.getStyleFromToken instead');
        return wwLib.wwUtils.getStyleFromToken(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwUtils.getTypoFromToken
     */
    getTypoFromToken(...args) {
        // wwLib.wwLog.warn('wwLib.getTypoFromToken is DEPRECATED, use wwLib.wwUtils.getTypoFromToken instead');
        return wwLib.wwUtils.getTypoFromToken(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED
     */
    element(value) {
        wwLib.wwLog.warn('wwLib.element is DEPRECATED');
        if (typeof value === 'object') {
            return { isWwObject: true, ...value };
        } else {
            return { isWwObject: true, type: value };
        }
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwUtils.resolveObjectPropertyPath
     */
    resolveObjectPropertyPath(...args) {
        // wwLib.wwLog.warn(
        //     'wwLib.resolveObjectPropertyPath is DEPRECATED, use wwLib.wwUtils.resolveObjectPropertyPath instead'
        // );
        return wwLib.wwUtils.resolveObjectPropertyPath(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwutils.getTextStyleFromContent
     */
    getTextStyleFromContent(...args) {
        // wwLib.wwLog.warn(
        //     'wwLib.getTextStyleFromContent is DEPRECATED, use wwLib.wwUtils.getTextStyleFromContent instead'
        // );
        return wwLib.wwUtils.getTextStyleFromContent(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwWorkflow.executeGlobal
     */
    async executeWorkflow(...args) {
        wwLib.wwLog.warn('wwLib.executeWorkflow is DEPRECATED, use wwLib.wwWorkflow.executeGlobal instead');
        return wwLib.wwWorkflow.executeGlobal(...args);
    },

    /**
     * @PUBLIC_API
     * @EDITOR
     * @DEPRECATED wwLib.wwEditor.findParentUidByFlag
     */
    findParentUidByFlag(...args) {
        wwLib.wwLog.warn('wwLib.wwEditor.findParentUidByFlag is DEPRECATED, use wwLib.findParentUidByFlag instead');
        return wwLib.wwEditor.findParentUidByFlag(...args);
    },

    /**
     * @PUBLIC_API
     * @EDITOR
     * @DEPRECATED wwLib.wwEditor.selectParentByFlag
     */
    selectParentByFlag(...args) {
        wwLib.wwLog.warn('wwLib.wwEditor.selectParentByFlag is DEPRECATED, use wwLib.selectParentByFlag instead');
        return wwLib.wwEditor.selectParentByFlag(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwElement.useCreate
     */
    useCreateElement() {
        wwLib.wwLog.warn('wwLib.useCreateElement is DEPRECATED, use wwLib.wwElement.useCreate instead');
        return this.wwElement.useCreate();
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwElement.useLayoutStyle
     */
    useLayoutStyle() {
        wwLib.wwLog.warn('wwLib.useLayoutStyle is DEPRECATED, use wwLib.wwElement.useLayoutStyle instead');
        return wwLib.wwElement.useLayoutStyle();
    },

    /**
     * @PUBLIC_API
     */
    useIcons() {
        const store = useIconsStore();
        return {
            getIcon: store.getIcon,
        };
    },
};

function pageSanitizer(page) {
    const keysToInclude = [
        'id',
        'name',
        'folder',
        'metaImage',
        'pageLoaded',
        'paths',
        'langs',
        'meta',
        'title',
        'sections',
        'pageUserGroups',
    ];

    const _page = {};
    keysToInclude.forEach(key => {
        _page[key] = page[key];
    });

    _page.meta && delete _page.meta.__typename;
    for (const section of _page.sections || []) {
        delete section.__typename;
    }

    const lang = wwLib.$store.getters['front/getLang'];
    if (_page.paths) _page.path = _page.paths[lang] || _page.paths.default;
    else _page.path = null;

    _page.lang = lang;

    return _page;
}
