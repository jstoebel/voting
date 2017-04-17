import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { Link } from 'react-router';
import PieChart from '../../public/js/components/polls/pie_chart';
import Arc from '../../public/js/components/polls/arc';
import factory from '../factories';
import sinon from 'sinon';
import _ from 'underscore'

// https://github.com/airbnb/enzyme/issues/341
import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

describe("<PieChart />", () => {

  var wrapper,
    pieData,
    expectedProps;

  beforeEach( done => {

    factory.attrs('poll')
      .then( attrs => {

        pieData = attrs.options.map( (option, i) =>{
          return {value: option.votes, label: `${option.name}: ${option.votes}`}
        } )


        const colorsStub = (i) => {
          return "#000000"
        }
        expectedProps = { x: 100, y: 100, data: pieData, outerRadius: 100,
          innerRadius: 50, colors: colorsStub
        }

        wrapper = shallow(<PieChart {...expectedProps} />);

        done();
      }).catch( err => {
        done(err)
      })
  })

  it("contains an Arc", done => {
    expect(wrapper.find(Arc)).to.have.length(1);
    done();
  })

  describe("passes props to Arc", () => {

    var actualProps;

    beforeEach( done => {
      actualProps = wrapper.find(Arc).first().props();
      done();
    })

    ["innerRadius", 'outerRadius'].forEach( prop => {

      it(`passes ${prop}`, done => {
        expect(expectedProps[prop]).to.equal(actualProps.prop)
      })

    }) // loop

  }) // inner describe

});
