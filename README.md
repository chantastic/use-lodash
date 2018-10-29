# use-lodash
A really terrible React Hook that is illustrative in other ways

## Don't use this
This is a terrible idea for so many reasons.  
But it's an instructive way to think about custom state Hooks.

## Play

https://codesandbox.io/s/011jx4nyql

## Implementation

```jsx
import React, { useState } from "react";
import lodash from "lodash";

function useLodash(initialSubject) {
  let [subject, updateSubject] = useState(initialSubject);

  let updaters = {};

  Object.keys(lodash.prototype).forEach(
    name =>
      (updaters[name] = (...args) =>
        updateSubject(lodash[name](subject, ...args)))
  );

  return {
    subject,
    ...updaters
  };
}
```

## Usage

You can use any function here: https://lodash.com/docs/4.17.10

Example:

```jsx
import ReactDOM from "react-dom";

function App() {
  let { subject: list, concat, without } = useLodash(["one", "two", "three"]);
  return (
    <ul>
      {list.map(item => <li key={item}>{item}</li>)}
      <button type="submit" onClick={() => concat(["four"])}>
        concat "four"
      </button>
      <button type="submit" onClick={() => without("two")}>
        without "two"
      </button>
    </ul>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```