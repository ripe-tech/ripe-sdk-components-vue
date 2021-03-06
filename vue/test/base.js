const testUtils = require("@vue/test-utils");
const globalEvents = require("vue-global-events");

const components = require("../components");
const localVue = testUtils.createLocalVue();

localVue.use(components.install);
localVue.component("global-events", globalEvents.default);

/**
 * Initializes a mounted component.
 *
 * @param {String} component The name of the component.
 * @param {Object} options An options object with:
 * - 'props' - The props to initialize the component with.
 * - 'route' - Optionally, define the current route for Vue Router.
 * - 'mixins' - Optionally, add or override mixins for the component.
 * - 'mocks' - The set of mocks to apply.
 */
const getComponent = function(
    component,
    { props = {}, route = null, mixins = [], mocks = {} } = {}
) {
    const options = {
        propsData: props,
        localVue: localVue,
        mixins: mixins,
        mocks: mocks
    };
    if (route) {
        options.mocks.$route = route;
    }
    const wrapper = testUtils.mount(components[component] || {}, options);
    return wrapper;
};

module.exports = {
    getComponent: getComponent
};
