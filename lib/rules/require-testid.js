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
    },

    create: function(context) {
        const isFormElement = ({ name }) => ['input', 'button', 'select', 'textarea'].includes(name)

        const hasBindClick = ({ startTag: { attributes }}) => attributes.find(isBindClick)

        const isBindClick = (attr) =>
            (attr.key.name === 'on' || get(attr, 'key.name.name') === 'on') &&
            (attr.key.argument === 'click' || get(attr, 'key.argument.name') === 'click')

        const isClickable = (node) => isFormElement(node) || hasBindClick(node)

        const isDataTestIdAttribute = (attr) =>
            attr.key.name === ATTR_TESTID ||
            ((attr.key.argument === ATTR_TESTID || attr.key.argument === PROP_TESTID) ||
            (get(attr, 'key.argument.name') === ATTR_TESTID || get(attr, 'key.argument.name') === PROP_TESTID))

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
                        message: ERROR_MSG_MISSING_TESTID_KEY
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
