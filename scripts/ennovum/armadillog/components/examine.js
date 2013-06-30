'use strict';

window.define && define(
    [
        'ennovum.Environment',
        'ennovum.Utils',
        './../views/examine'
    ],
    function (
        mEnvironment,
        mUtils,
        mArmadillogExamineView
    ) {
/* ==================================================================================================== */

// debug console logs switch
var DEBUG = false;

/**
 * ArmadillogExamine static
 */
var armadillogExamineStatic = {
};

/**
 * ArmadillogExamine interface
 */
var armadillogExamineInterface = {
    set: function (contentLineItemMMap) {},
    clear: function () {}
};

/**
 * ArmadillogExamine constructor
 */
var ArmadillogExamine = function ArmadillogExamine() {
    this.init.apply(this, arguments);
    return mUtils.obj.implement({}, this, armadillogExamineInterface);
};

/**
 * ArmadillogExamine prototype
 */
ArmadillogExamine.prototype = {

    /**
     * Initializes instance
     *
     * @param {object} config configuration object
     */
    init: function ArmadillogExamine_init(config, application) {
        DEBUG && console.log('ArmadillogExamine', 'init', arguments);

        switch (true) {
            case !this.configSet(config):
            case !this.dataInit(application):
            case !this.viewInit():
            case !this.uiInit():
                return false;
                break;
        }

        return true;
    },

    /**
     * Initializes config
     *
     * @param {object} config configuration object
     */
    configSet: function ArmadillogExamine_configSet(config) {
        DEBUG && console.log('ArmadillogExamine', 'configSet', arguments);

        switch (false) {
            case !!config:
            case typeof config === 'object':
                console.error('ArmadillogExamine', 'configSet', 'invalid input');
                return false;
        };

        this.config = {
            boxEl: config.examineBoxEl || null
        };

        return true;
    },

    /**
     * Initializes data
     */
    dataInit: function ArmadillogExamine_dataInit(application) {
        DEBUG && console.log('ArmadillogExamine', 'dataInit', arguments);

        this.application = application;

        return true;
    },

    /**
     * Initializes view
     */
    viewInit: function ArmadillogExamine_viewInit() {
        DEBUG && console.log('ArmadillogExamine', 'viewInit', arguments);

        this.armadillogView = new mArmadillogExamineView.ArmadillogExamineView();

        this.bodyEl = this.config.bodyEl;

        this.boxEl = this.config.boxEl;
        if (!this.boxEl) {
            console.error('ArmadillogExamine', 'viewInit', 'invalid boxEl');
            return false;
        };

        this.view = this.armadillogView.examineViewGet();
        this.boxEl.appendChild(this.view.rawBoxEl);
        this.boxEl.appendChild(this.view.filteredBoxEl);

        return true;
    },

    /**
     * Initializes UI
     */
    uiInit: function ArmadillogExamine_uiInit() {
        DEBUG && console.log('ArmadillogExamine', 'uiInit', arguments);

        this.view.rawContentEl.addEventListener(
            'keyup',
            function (evt) {
                if (!(evt.keyCode === 27 && !evt.ctrlKey && !evt.altKey && !evt.shiftKey)) { // esc
                    evt.stopPropagation();
                }
            }.bind(this));

        this.view.filteredContentEl.addEventListener(
            'keyup',
            function (evt) {
                if (!(evt.keyCode === 27 && !evt.ctrlKey && !evt.altKey && !evt.shiftKey)) { // esc
                    evt.stopPropagation();
                }
            }.bind(this));

        return true;
    },

    /**
     * Sets examine content
     *
     * @param {object} contentLineItemMMap content line model object
     */
    set: function ArmadillogExamine_set(contentLineItemMMap) {
        DEBUG && console.log('ArmadillogExamine', 'set', arguments);

        this.view.rawContentEl.innerHTML = mUtils.string.escapeXML(contentLineItemMMap.get('textRaw'));
        this.view.filteredContentEl.innerHTML = contentLineItemMMap.get('view').el.innerHTML;

        return true;
    },

    /**
     * Clears examine content
     */
    clear: function ArmadillogExamine_clear() {
        DEBUG && console.log('ArmadillogExamine', 'clear', arguments);

        this.view.rawContentEl.innerHTML = '';
        this.view.filteredContentEl.innerHTML = '';

        return true;
    },

    /**
     *
     */
    toString: function ArmadillogExamine_toString() {
        return 'ennovum.ArmadillogExamine';
    }

};

/* ==================================================================================================== */
        return {
            'armadillogExamineStatic': armadillogExamineStatic,
            'armadillogExamineInterface': armadillogExamineInterface,
            'ArmadillogExamine': ArmadillogExamine
        };
    });