'use strict';

window.define && define(
    [
        'ennovum.Environment',
        'ennovum.Utils',
        './../views/input'
    ],
    function (
        mEnvironment,
        mUtils,
        mArmadillogInputView
    ) {
/* ==================================================================================================== */

// debug console logs switch
var DEBUG = false;

/**
 * ArmadillogInput static
 */
var armadillogInputStatic = {
};

/**
 * ArmadillogInput interface
 */
var armadillogInputInterface = {
    clearLabelSet: function (value) {}
};

/**
 * ArmadillogInput constructor
 */
var ArmadillogInput = function ArmadillogInput() {
    this.init.apply(this, arguments);
    return mUtils.obj.implement({}, this, armadillogInputInterface);
};

/**
 * ArmadillogInput prototype
 */
ArmadillogInput.prototype = {

    /**
     * Initializes instance
     *
     * @param {object} config configuration object
     */
    init: function ArmadillogInput_init(config, application) {
        DEBUG && console.log('ArmadillogInput', 'init', arguments);

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
    configSet: function ArmadillogInput_configSet(config) {
        DEBUG && console.log('ArmadillogInput', 'configSet', arguments);

        switch (false) {
            case !!config:
            case typeof config === 'object':
                console.error('ArmadillogInput', 'configSet', 'invalid input');
                return false;
        };

        this.config = {
            boxEl: config.inputBoxEl || null
        };

        return true;
    },

    /**
     * Initializes data
     */
    dataInit: function ArmadillogInput_dataInit(application) {
        DEBUG && console.log('ArmadillogInput', 'dataInit', arguments);

        this.application = application;

        return true;
    },

    /**
     * Initializes view
     */
    viewInit: function ArmadillogInput_viewInit() {
        DEBUG && console.log('ArmadillogInput', 'viewInit', arguments);

        this.armadillogView = new mArmadillogInputView.ArmadillogInputView();

        this.bodyEl = this.config.bodyEl;

        this.boxEl = this.config.boxEl;
        if (!this.boxEl) {
            console.error('ArmadillogInput', 'viewInit', 'invalid boxEl');
            return false;
        };

        this.view = this.armadillogView.inputViewGet();
        this.boxEl.appendChild(this.view.clearBoxEl);
        this.boxEl.appendChild(this.view.fileBoxEl);
        this.boxEl.appendChild(this.view.pasteBoxEl);
        this.boxEl.appendChild(this.view.urlBoxEl);

        return true;
    },

    /**
     * Initializes UI
     */
    uiInit: function ArmadillogInput_uiInit() {
        DEBUG && console.log('ArmadillogInput', 'uiInit', arguments);

        this.view.clearButtonEl.addEventListener(
            'click',
            function ArmadillogInput_uiInit_clearButtonElClickHandler(evt) {
                if (!this.application.busy.check() && confirm('Are you sure?')) {
                    this.application.content.clear();
                }

                evt.preventDefault();
                evt.stopPropagation();
            }.bind(this));

        this.view.fileInputEl.addEventListener(
            'change',
            function ArmadillogInput_uiInit_fileInputElChangeHandler(evt) {
                if (!this.application.busy.check()) {
                    var files = evt.target.files;
                    if (files.length) {
                        this.application.content.clear();
                        this.application.content.fileSet(files[0], files[0].name);
                    }
                }

                evt.preventDefault();
                evt.stopPropagation();
            }.bind(this));

        this.view.fileButtonEl.addEventListener(
            'click',
            function ArmadillogInput_uiInit_fileButtonElClickHandler(evt) {
                if (!this.application.busy.check()) {
                    this.view.fileInputEl.click();
                }

                evt.preventDefault();
                evt.stopPropagation();
            }.bind(this));

        this.view.pasteButtonEl.addEventListener(
            'click',
            function ArmadillogInput_uiInit_pasteButtonElClickHandler(evt) {
                if (!this.application.busy.check() && this.view.pasteInputEl.value) {
                    this.application.content.clear();
                    this.application.content.textSet(this.view.pasteInputEl.value, '(pasted text)');
                    this.view.pasteInputEl.value = '';
                }

                evt.preventDefault();
                evt.stopPropagation();
            }.bind(this));

        this.view.urlInputEl.addEventListener(
            'keypress',
            function ArmadillogInput_uiInit_urlInputElKeypressHandler(evt) {
                if (evt.keyCode === 13) {
                    this.view.urlButtonEl.click();

                    evt.preventDefault();
                    evt.stopPropagation();
                }
            }.bind(this));

        this.view.urlButtonEl.addEventListener(
            'click',
            function ArmadillogInput_uiInit_urlButtonElClickHandler(evt) {
                if (!this.application.busy.check() && this.view.urlInputEl.value) {
                    this.application.content.clear();
                    this.application.content.urlSet(this.view.urlInputEl.value, this.view.urlInputEl.value);
                    this.view.urlInputEl.value = '';
                }

                evt.preventDefault();
                evt.stopPropagation();
            }.bind(this));

        return true;
    },

    /**
     *
     */
    clearLabelSet: function ArmadillogInput_clearLabelSet(value) {
        DEBUG && console.log('ArmadillogInput', 'uiInit', arguments);

        this.view.clearLabelEl.innerHTML = value || '';

        return true;
    },

    /**
     *
     */
    toString: function ArmadillogInput_toString() {
        return 'ennovum.ArmadillogInput';
    }

};

/* ==================================================================================================== */
        return {
            'armadillogInputStatic': armadillogInputStatic,
            'armadillogInputInterface': armadillogInputInterface,
            'ArmadillogInput': ArmadillogInput
        };
    });