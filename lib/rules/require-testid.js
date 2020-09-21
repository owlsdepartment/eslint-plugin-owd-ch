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
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {
        const { defineTemplateBodyVisitor } = context.parserServices

        const isFormElement = ({ name }) => {
            return ['input', 'button', 'select', 'textarea'].includes(name)
        }

        const hasDataTestIdAttributeKey = (node) => {
            return node.startTag.attributes.find(attr => attr.key.name === 'data-testid' || attr.key.argument.name === 'data-testid')
        }

        const hasDataTestIdAttributeValue = (node) => {
            return node.startTag.attributes.find(attr => attr.value && (attr.value.value || attr.value.expression))
        }

        // ----------------------------------------------------------------------
        // Public
        // ----------------------------------------------------------------------

        return defineTemplateBodyVisitor({
            "VElement"(node) {
                if (!isFormElement(node)) return

                if (!hasDataTestIdAttributeKey(node)) {
                    context.report({
                        node: node.startTag,
                        loc: node.startTag.loc,
                        message: ERROR_MSG_MISSING_TESTID_KEY
                    })
                } else if (!hasDataTestIdAttributeValue(node)) {
                    context.report({
                        node: node.startTag,
                        loc: node.startTag.loc,
                        message: ERROR_MSG_MISSING_TESTID_VALUE
                    })
                }
            }
        })
    }
};
