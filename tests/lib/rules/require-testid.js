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
        parser: 'babel-eslint',
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
        {
            filename: 'test.vue',
            code: `<template><button :data-testid="'my-form-button'"></button></template>`
        },
        {
            filename: 'test.vue',
            code: `<template><input :data-testid="'my-form-input'" /></template>`
        },
        {
            filename: 'test.vue',
            code: `<template><select :data-testid="'my-form-select'"></select></template>`
        },
        {
            filename: 'test.vue',
            code: `<template><textarea :data-testid="'my-form-textarea'"></textarea></template>`
        },
        {
            filename: 'test.vue',
            code: `<template>
                <button
                class="accordion__toggle"
                data-testid="accordion-toggle"
                role="button"
                tabindex="0"
                type="button"
                :aria-expanded="isExpanded.toString()"
                :aria-label="title"
                @click.prevent="toggleAccordion"
            ></template>`,
        },
        {
            filename: 'test.vue',
            code: `<template>
                <button
                class="accordion__toggle"
                role="button"
                tabindex="0"
                type="button"
                :aria-expanded="isExpanded.toString()"
                :aria-label="title"
                :data-testid="'accordion-toggle'"
                @click.prevent="toggleAccordion"
            ></template>`,
        },
        {
            filename: 'test.vue',
            code: `<template>
                <button
                class="language-button"
                :class="{ 'language-button--is-highlighted': isCurrent }"
                :data-testid="testId"
                :disabled="isDisabled"
                @click="onClick">
                    {{ language.display_name }}
                </button>
            </template>`
        }
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
            code: '<template><button :data-testid></button></template>',
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: '<template><button :data-testid=""></button></template>',
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
            code: '<template><input :data-testid /></template>',
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: '<template><input :data-testid="" /></template>',
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
            code: '<template><select :data-testid></select></template>',
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: '<template><select :data-testid=""></select></template>',
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
        {
            filename: 'test.vue',
            code: '<template><textarea :data-testid></textarea></template>',
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: '<template><textarea :data-testid=""></textarea></template>',
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template>
                <button
                class="accordion__toggle"
                data-testid
                role="button"
                tabindex="0"
                type="button"
                :aria-expanded="isExpanded.toString()"
                :aria-label="title"
                @click.prevent="toggleAccordion"
            ></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template>
                <button
                class="accordion__toggle"
                :data-testid
                role="button"
                tabindex="0"
                type="button"
                :aria-expanded="isExpanded.toString()"
                :aria-label="title"
                @click.prevent="toggleAccordion"
            ></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template>
                <button
                class="accordion__toggle"
                data-testid=""
                role="button"
                tabindex="0"
                type="button"
                :aria-expanded="isExpanded.toString()"
                :aria-label="title"
                @click.prevent="toggleAccordion"
            ></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template>
                <button
                class="accordion__toggle"
                :data-testid=""
                role="button"
                tabindex="0"
                type="button"
                :aria-expanded="isExpanded.toString()"
                :aria-label="title"
                @click.prevent="toggleAccordion"
            ></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
    ]
});
