const ATTR_TESTID = 'data-testid'
const PROP_TESTID = 'dataTestid'

module.exports = {
  ATTR_TESTID,
  PROP_TESTID,
  ERROR_MSG_MISSING_TESTID_KEY: `Interactive elements must contain a \`${ATTR_TESTID}\` attribute or  \`:${PROP_TESTID}\` prop.`,
  ERROR_MSG_MISSING_TESTID_VALUE: `\`${ATTR_TESTID}\` or \`:${PROP_TESTID}\` cannot be empty.`,
}
