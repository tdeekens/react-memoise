import React from 'react';
import { mount } from 'enzyme';
import Memoise from './memoise';

describe('rendering', () => {
  describe('with FaaC', () => {
    let props;
    let wrapper;

    beforeEach(() => {
      const Component = props => (
        <Memoise args={[props.a, props.b]} compute={(a, b) => a * b}>
          {computedValue => <div>{computedValue}</div>}
        </Memoise>
      );
      wrapper = mount(<Component a={3} b={4} />);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the computed value', () => {
      expect(wrapper).toHaveText('12');
    });
  });

  describe('with render-prop', () => {
    let props;
    let wrapper;

    beforeEach(() => {
      const Component = props => (
        <Memoise
          args={[props.a, props.b]}
          compute={(a, b) => a * b}
          render={computedValue => <div>{computedValue}</div>}
        />
      );
      wrapper = mount(<Component a={3} b={4} />);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the computed value', () => {
      expect(wrapper).toHaveText('12');
    });
  });

  describe('with component', () => {
    let props;
    let wrapper;
    let ChildComponent;
    beforeEach(() => {
      ChildComponent = props => <div>{props.computedValue}</div>;
      const Component = props => (
        <Memoise
          args={[props.a, props.b]}
          compute={(a, b) => a * b}
          component={ChildComponent}
        />
      );
      wrapper = mount(<Component a={3} b={4} />);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the computed value', () => {
      expect(wrapper).toHaveText('12');
    });
  });

  describe('when changing props', () => {
    let renderSpy;
    let computeSpy;
    let props;
    let wrapper;

    beforeEach(() => {
      renderSpy = jest.fn();
      computeSpy = jest.fn();
      const Component = props => (
        <Memoise
          args={[props.a, props.b]}
          compute={(a, b) => {
            computeSpy(a, b);
            return { value: a * b };
          }}
        >
          {memoised => {
            renderSpy(memoised);
            return <div>{memoised.value}</div>;
          }}
        </Memoise>
      );
      wrapper = mount(<Component a={3} b={4} />);
    });

    describe('to the same value', () => {
      beforeEach(() => {
        wrapper.setProps({ a: 3 });
      });

      it('should invoke render twice', () => {
        expect(renderSpy).toHaveBeenCalledTimes(2);
      });

      it('should invoke `compute` once', () => {
        expect(computeSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('to a different value', () => {
      beforeEach(() => {
        wrapper.setProps({ a: 7 });
      });

      it('should invoke render twice', () => {
        expect(renderSpy).toHaveBeenCalledTimes(2);
      });

      it('should invoke `compute` twice', () => {
        expect(computeSpy).toHaveBeenCalledTimes(2);
      });
    });
  });
});
