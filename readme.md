<p align="center">
  <img alt="Logo" src="https://raw.githubusercontent.com/tdeekens/react-memoise/master/logo.jpg" /><br /><br />
</p>

<h2 align="center">📚 react-memoise - declaratively memoise a computation in a React component 🧠</h2>
<p align="center">
  <i>Given a <Memoise> component pass it some props and a computation and it will re-render with a memoised result.</i>
</p>

<p align="center">
  <em>
  ❤️
  React
  · Jest
  · Prettier
  · Flow
  · Enzyme
  · ESLint
  · Babel
  · Rollup
  🙏
  </em>
</p>

<p align="center">
  <a href="https://circleci.com/gh/tdeekens/react-memoise">
    <img alt="CircleCI Status" src="https://circleci.com/gh/tdeekens/react-memoise.svg?style=shield&circle-token=63ee7a0e1c766b6b76da6f7ba4c7b9f2a7876191">
  </a>
  <a href="https://codecov.io/gh/tdeekens/react-memoise">
    <img alt="Codecov Coverage Status" src="https://img.shields.io/codecov/c/github/tdeekens/react-memoise.svg?style=flat-square">
  </a>
  <img alt="Made with Coffee" src="https://img.shields.io/badge/made%20with-%E2%98%95%EF%B8%8F%20coffee-yellow.svg">
</p>

## Installation

Just `yarn add react-memoise` or `npm i react-memoise`.

## Documentation & Examples

#### Using the Function as a Child pattern

```jsx
import Memoise from 'react-memoise';

const ParentComponent = props => (
  <Memoise args={[props.a, props.b]} compute={(a, b => a * b)}>
    {computedValue => <code>{computedValue}</code>}
  </Memoise>
);
```

#### Using a render-prop

```jsx
import Memoise from 'react-memoise';

const ParentComponent = props =>
  <Memoise args={[props.a, props.b]} compute={(a, b => a * b)} render={computedValue => <code>{computedValue}</code>}>
```

#### Using a component

```jsx
import Memoise from 'react-memoise';

const ConsumerComponent = props => <code>{props.computedValue}</code>

const ParentComponent = props =>
  <Memoise args={[props.a, props.b]} compute={(a, b => a * b)} component={ConsumerComponent}>
```

#### Customization

You can pass in an `areArgsEqual` prop with the signature of `(prevArgs: Args, nextArgs: Args) => boolean` to customise the equality check which defaults to a shallow equal.
