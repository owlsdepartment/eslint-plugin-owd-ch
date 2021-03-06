/**
 * @fileoverview Require data-testid attribute on interactive elements
 * @author jędrzej
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const { get } = require('lodash')
const {
    ATTR_TESTID,
    ERROR_MSG_MISSING_TESTID_KEY,
    ERROR_MSG_MISSING_TESTID_VALUE,
    PROP_TESTID,
 } = require('../../data')

module.exports = {
    meta: {
        docs: {
            description: "Require `data-testid` with interactive elements",
            recommended: false,
        },
        fixable: 'code'
    },

    create: function(context) {
        const isFormElement = ({ name }) => ['input', 'button', 'select', 'textarea'].includes(name)

        const hasBindClick = ({ startTag: { attributes }}) => attributes.find(isBindClick)

        const isBindClick = (attr) => {
            const isNameVOn = attr.key.name === 'on' || get(attr, 'key.name.name') === 'on'
            const isArgumentClick = attr.key.argument === 'click' || get(attr, 'key.argument.name') === 'click'

            return isNameVOn && isArgumentClick
        }

        const isClickable = (node) => isFormElement(node) || hasBindClick(node)

        const isDataTestIdAttribute = (attr) => {
            const isKeyNameTestid = attr.key.name === ATTR_TESTID
            const isKeyArgumentTestid = attr.key.argument === ATTR_TESTID || attr.key.argument === PROP_TESTID.toLowerCase()
            const isKeyArgumentNameTestid = get(attr, 'key.argument.name') === ATTR_TESTID || get(attr, 'key.argument.name') === PROP_TESTID.toLowerCase()

            return isKeyNameTestid || isKeyArgumentTestid || isKeyArgumentNameTestid
        }

        const hasValue = (attr) =>
            attr.value && (attr.value.value || attr.value.expression)

        // ----------------------------------------------------------------------
        // Public
        // ----------------------------------------------------------------------

        return context.parserServices.defineTemplateBodyVisitor({
            "VElement"(node) {
                if (!isClickable(node)) return

                const dataTestIdAttribute = node.startTag.attributes.find(isDataTestIdAttribute)

                if (!dataTestIdAttribute) {
                    context.report({
                        node: node.startTag,
                        loc: node.startTag.loc,
                        message: ERROR_MSG_MISSING_TESTID_KEY,
                    })
                } else if (!hasValue(dataTestIdAttribute)) {
                    context.report({
                        node: node.startTag,
                        loc: node.startTag.loc,
                        message: ERROR_MSG_MISSING_TESTID_VALUE
                    })
                }
            }
        })
    }
}
