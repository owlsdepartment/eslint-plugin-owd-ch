# eslint-plugin-owd-ch

Custom eslint rules for Changing Health

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-owd-ch`:

```
$ npm install eslint-plugin-owd-ch --save-dev
```


## Usage

Add `owd-ch` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "owd-ch"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "owd-ch/rule-name": 2
    }
}
```

## Supported Rules

`owd-ch/require-testid`: Require `data-testid` with interactive elements
