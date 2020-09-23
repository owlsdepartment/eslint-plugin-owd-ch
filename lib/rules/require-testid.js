/**
 * @fileoverview Require data-testid attribute on form elements
 * @author jędrzej
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const {
    ERROR_MSG_MISSING_TESTID_KEY,
    ERROR_MSG_MISSING_TESTID_VALUE,
 } = require('../../data')

module.exports = {
    meta: {
        docs: {
            description: "Require `data-testid` with form elements",
            recommended: false,
        },
    },

    create: function(context) {
        const isFormElement = ({ name }) => ['input', 'button', 'select', 'textarea'].includes(name)

        const hasBindClick = ({ startTag: { attributes }}) => attributes.find(isBindClick)

        const isBindClick = (attr) =>
            (attr.key.name === 'on' || (attr.key.name && attr.key.name.name === 'on')) &&
            (attr.key.argument === 'click' || (attr.key.argument && attr.key.argument.name === 'click'))

        const isClickable = (node) => isFormElement(node) || hasBindClick(node)

        const isDataTestIdAttribute = (attr) =>
            attr.key.name === 'data-testid' ||
            (attr.key.argument === 'data-testid' ||
            (attr.key.argument && attr.key.argument.name === 'data-testid'))

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
