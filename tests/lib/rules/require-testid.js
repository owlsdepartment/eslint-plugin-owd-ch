/**
 * @fileoverview Require data-testid attribute on form elements
 * @author jędrzej
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/require-testid"),

RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const {
    ERROR_MSG_MISSING_TESTID_KEY,
    ERROR_MSG_MISSING_TESTID_VALUE,
} = require('../../../data')

const ruleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
        ecmaVersion: 2016,
    }
});

ruleTester.run("require-testid", rule, {
    valid: [
        {
            filename: 'test.vue',
            code: '<template><button data-testid="my-form-button"></button></template>'
        },
        {
            filename: 'test.vue',
            code: '<template><input data-testid="my-form-input" /></template>'
        },
        {
            filename: 'test.vue',
            code: '<template><select data-testid="my-form-select"></select></template>'
        },
        {
            filename: 'test.vue',
            code: '<template><textarea data-testid="my-form-textarea"></textarea></template>'
        },
    ],
    invalid: [
        {
            filename: 'test.vue',
            code: '<template><button></button></template>',
            errors: [ERROR_MSG_MISSING_TESTID_KEY]
        },
        {
            filename: 'test.vue',
            code: '<template><button data-testid></button></template>',
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: '<template><button data-testid=""></button></template>',
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: '<template><input /></template>',
            errors: [ERROR_MSG_MISSING_TESTID_KEY]
        },
        {
            filename: 'test.vue',
            code: '<template><input data-testid /></template>',
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: '<template><input data-testid="" /></template>',
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: '<template><select></select></template>',
            errors: [ERROR_MSG_MISSING_TESTID_KEY]
        },
        {
            filename: 'test.vue',
            code: '<template><select data-testid></select></template>',
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: '<template><select data-testid=""></select></template>',
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: '<template><textarea></textarea></template>',
            errors: [ERROR_MSG_MISSING_TESTID_KEY]
        },
        {
            filename: 'test.vue',
            code: '<template><textarea data-testid></textarea></template>',
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: '<template><textarea data-testid=""></textarea></template>',
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
    ]
});
