// @flow

import React, { PureComponent, type Node, type ComponentType } from 'react';
import warning from 'warning';
import { shallowEqual } from 'fast-equals';

type Args = any;
type Func = (args: Args) => any;
type Props = {
  compute: (args: Args) => any,
  args: Args,
  areArgsEqual?: (prevArgs: Args, nextArgs: Args) => boolean,
  component: ComponentType<any>,
  render?: () => Node,
  children?: React.Component<any> | (() => Node),
};

export function memoise(
  fn: Func,
  areArgsEqual?: <T>(prevArgs: T, nextArgs: T) => boolean = shallowEqual
): Func {
  let lastArgs = null;
  let lastResult = null;

  return function() {
    if (!areArgsEqual(lastArgs, arguments)) {
      lastResult = fn(...arguments);
    }

    lastArgs = arguments;

    return lastResult;
  };
}

const isEmptyChildren = (children: Node): boolean =>
  React.Children.count(children) === 0;

export default class Memoise extends PureComponent<Props> {
  static displayName = 'Memoise';
  static defaultProps = {
    component: null,
    render: null,
    children: null,
  };

  memoisedCompute = memoise(this.props.compute, this.props.areArgsEqual);
  computedValue = this.memoisedCompute(...this.props.args);

  componentWillUnmount() {
    warning(
      this.props.args && typeof this.props.compute === 'function',
      'react-memoise: Please always provide a `compute` and `args` prop.'
    );
  }

  componentWillReceiveProps(nextProps: Props) {
    this.computedValue = this.memoisedCompute(...nextProps.args);
  }

  render(): Node {
    if (this.props.component)
      return React.createElement(this.props.component, {
        computedValue: this.computedValue,
      });

    if (typeof this.props.render === 'function')
      return this.props.render(this.computedValue);

    if (typeof this.props.children === 'function')
      return this.props.children(this.computedValue);

    return null;
  }
}
