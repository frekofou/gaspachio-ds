export default {
    type: 'wwObject',
    options: {
        sizable: true,
        ignoredStyleProperties: ['overflow'],
        displayAllowedValues: ['flex', 'inline-flex'],
    },
    editor: {
        label: {
            fr: 'Image',
            en: 'Image',
        },
        icon: 'photograph',
        deprecated: 'Use an image from the Elements panel instead of this one.',
    },
    properties: {
        url: {
            label: { en: 'Image', fr: 'Image' },
            type: 'Image',
            bindable: true,
            responsive: true,
            defaultValue: 'https://cdn.weweb.app/public/images/no_image_selected.png',
        },
        ratio: {
            hidden: true,
            defaultValue: 0.56,
            responsive: true,
            states: true,
        },
        zoom: {
            type: 'Number',
            label: { en: 'Zoom', fr: 'Zoom' },
            options: {
                min: 0.01,
                max: 5,
                step: 0.01,
            },
            responsive: true,
            states: true,
            defaultValue: 1,
        },
        x: {
            type: 'Number',
            label: { en: 'Position X', fr: 'Position X' },
            options: {
                min: -100,
                max: 100,
            },
            responsive: true,
            states: true,
            defaultValue: 0,
        },
        y: {
            type: 'Number',
            label: { en: 'Position Y', fr: 'Position Y' },
            options: {
                min: -100,
                max: 100,
            },
            responsive: true,
            states: true,
            defaultValue: 0,
        },
        reset: {
            type: 'Button',
            editorOnly: true,
            options: {
                text: { en: 'Reset zoom & pos.', fr: 'Réinit. zoom & pos.' },
                color: 'blue',
                action: 'resetZoom',
            },
        },
        coverContain: {
            type: 'Button',
            editorOnly: true,
            options: {
                text: { en: 'Switch Cover / Contain', fr: 'Zoom auto' },
                color: 'blue',
                action: 'switchCoverContain',
            },
        },
        style: {
            type: 'Object',
            options: {
                item: {
                    overlay: {
                        type: 'Color',
                        label: { en: 'Overlay', fr: 'Overlay' },
                        options: {
                            nullable: true,
                            gradient: true,
                        },
                    },
                    filter: {
                        type: 'CssFilters',
                        label: { en: 'Filters', fr: 'Filtres' },
                    },
                },
            },
            responsive: true,
            states: true,
            defaultValue: {},
        },
        alt: {
            section: 'settings',
            label: { en: 'Alt', fr: 'Alt' },
            type: 'Text',
            multiLang: true,
            bindable: true,
            options: {
                placeholder: 'Image description',
            },
            defaultValue: { en: '' },
        },
    },
};
