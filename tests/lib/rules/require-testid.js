/**
 * @fileoverview Require ${ATTR_TESTID} attribute on interactive elements
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
    ATTR_TESTID,
    ERROR_MSG_MISSING_TESTID_KEY,
    ERROR_MSG_MISSING_TESTID_VALUE,
    PROP_TESTID,
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
            code: `<template><button ${ATTR_TESTID}="my-form-button"></button></template>`
        },
        {
            filename: 'test.vue',
            code: `<template><input ${ATTR_TESTID}="my-form-input" /></template>`
        },
        {
            filename: 'test.vue',
            code: `<template><select ${ATTR_TESTID}="my-form-select"></select></template>`
        },
        {
            filename: 'test.vue',
            code: `<template><textarea ${ATTR_TESTID}="my-form-textarea"></textarea></template>`
        },
        {
            filename: 'test.vue',
            code: `<template><button :${ATTR_TESTID}="'my-form-button'"></button></template>`
        },
        {
            filename: 'test.vue',
            code: `<template><input :${ATTR_TESTID}="'my-form-input'" /></template>`
        },
        {
            filename: 'test.vue',
            code: `<template><select :${ATTR_TESTID}="'my-form-select'"></select></template>`
        },
        {
            filename: 'test.vue',
            code: `<template><textarea :${ATTR_TESTID}="'my-form-textarea'"></textarea></template>`
        },
        {
            filename: 'test.vue',
            code: `<template>
                <button
                class="accordion__toggle"
                ${ATTR_TESTID}="accordion-toggle"
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
            code: `
                <template>
                    <button
                    class="accordion__toggle"
                    role="button"
                    tabindex="0"
                    type="button"
                    :aria-expanded="isExpanded.toString()"
                    :aria-label="title"
                    :${ATTR_TESTID}="'accordion-toggle'"
                    @click.prevent="toggleAccordion"
                ></template>`,
        },
        {
            filename: 'test.vue',
            code: `
                <template>
                    <button
                    class="language-button"
                    :class="{ 'language-button--is-highlighted': isCurrent }"
                    :${ATTR_TESTID}="testId"
                    :disabled="isDisabled"
                    @click="onClick"
                >
                    {{ language.display_name }}
                    </button>
                </template>`
        },
        {
            filename: 'test.vue',
            code: `
                <template>
                    <span
                        :${PROP_TESTID}="testId"
                        @click="onClick"
                    >
                        {{ language.display_name }}
                    </span>
                </template>`
        },
        {
            filename: 'test.vue',
            code: `
                <template>
                    <span
                        :${PROP_TESTID}="testId"
                        @click="onClick"
                    >
                        {{ language.display_name }}
                    </span>
                </template>`
        },
        {
            filename: 'test.vue',
            code: `
            <base-button
                v-if="showCompleteGoalButton"
                light
                class="goal-preview__complete-goal"
                :${PROP_TESTID}="dataTestid"
                :isLoading="isGoalCompleting"
                @click="onCompleteGoal"
            >
                {{ $t(options.slug) }}
            </base-button>`
        }


    ],
    invalid: [
        {
            filename: 'test.vue',
            code: `<template><button></button></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_KEY]
        },
        {
            filename: 'test.vue',
            code: `<template><button ${ATTR_TESTID}></button></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template><button ${ATTR_TESTID}=""></button></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template><button :${ATTR_TESTID}></button></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template><button :${ATTR_TESTID}=""></button></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template><input /></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_KEY]
        },
        {
            filename: 'test.vue',
            code: `<template><input ${ATTR_TESTID} /></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template><input ${ATTR_TESTID}="" /></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template><input :${ATTR_TESTID} /></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template><input :${ATTR_TESTID}="" /></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template><select></select></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_KEY]
        },
        {
            filename: 'test.vue',
            code: `<template><select ${ATTR_TESTID}></select></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template><select ${ATTR_TESTID}=""></select></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template><select :${ATTR_TESTID}></select></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template><select :${ATTR_TESTID}=""></select></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template><textarea></textarea></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_KEY]
        },
        {
            filename: 'test.vue',
            code: `<template><textarea ${ATTR_TESTID}></textarea></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template><textarea ${ATTR_TESTID}=""></textarea></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template><textarea :${ATTR_TESTID}></textarea></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template><textarea :${ATTR_TESTID}=""></textarea></template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
        {
            filename: 'test.vue',
            code: `<template>
                <button
                class="accordion__toggle"
                ${ATTR_TESTID}
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
                :${ATTR_TESTID}
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
                ${ATTR_TESTID}=""
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
                :${ATTR_TESTID}=""
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
            code: `
                <template>
                    <span
                        @click="onClick"
                    >
                        {{ language.display_name }}
                    </span>
                </template>`,
            errors: [ERROR_MSG_MISSING_TESTID_KEY]
        },
        {
            filename: 'test.vue',
            code: `
                <template>
                    <span
                        :${ATTR_TESTID}
                        @click="onClick"
                    >
                        {{ language.display_name }}
                    </span>
                </template>`,
            errors: [ERROR_MSG_MISSING_TESTID_VALUE]
        },
    ]
});
