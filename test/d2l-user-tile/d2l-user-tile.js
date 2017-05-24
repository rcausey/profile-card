/* global describe, beforeEach, it, expect, fixture */

'use strict';

describe('<d2l-user-tile>', function() {
	var component;

	beforeEach(function() {
		component = fixture('basic');
		Polymer.dom.flush();
	});

	describe('smoke tests', function() {
		it('is instantiated', function() {
			expect(component).to.exist;
		});
	});

	describe('given that the tile should render the appropriate data provided', function() {
		describe('when the `icon` attribute is not provided', function() {
			it('should render the default icon only', function() {
				expect(component.querySelector('d2l-icon')).to.exist;
				expect(component.querySelector('d2l-image')).to.not.exist;
			});
		});

		describe('when the `icon` attribute is provided for a valid image', function() {
			beforeEach(function() {
				component = fixture('with-icon');
				Polymer.dom.flush();
			});

			it('should render the custom icon only', function() {
				expect(component.querySelector('d2l-icon')).to.not.exist;
				expect(component.querySelector('d2l-image')).to.exist;
			});
		});
	});

	describe('content placeholders', function() {
		beforeEach(function() {
			component = fixture('with-placeholders');
		});

		describe('for name field', function() {
			it('should show a placeholder for the name when name is not set', function() {
				var name = component.$$('.user-tile-name:not(.text-placeholder)');
				var placeholder = component.$$('.user-tile-name.text-placeholder');
				expect(name.getAttribute('hidden')).to.equal('');
				expect(placeholder.getAttribute('hidden')).to.be.null;
			});

			it('should hide the placeholder for the name when name is set', function() {
				component.name = '';
				var name = component.$$('.user-tile-name:not(.text-placeholder)');
				var placeholder = component.$$('.user-tile-name.text-placeholder');
				expect(name.getAttribute('hidden')).to.be.null;
				expect(placeholder.getAttribute('hidden')).to.equal('');
			});
		});

		describe('for school/grade field', function() {
			it('should show a placeholder when neither grade nor school is set', function() {
				var text = component.$$('.user-tile-school:not(.text-placeholder)');
				var placeholder = component.$$('.user-tile-school.text-placeholder');
				expect(text.getAttribute('hidden')).to.equal('');
				expect(placeholder.getAttribute('hidden')).to.be.null;
			});

			it('should hide the placeholder when school is set', function() {
				component.school = '';
				var text = component.$$('.user-tile-school:not(.text-placeholder)');
				var placeholder = component.$$('.user-tile-school.text-placeholder');
				expect(text.getAttribute('hidden')).to.be.null;
				expect(placeholder.getAttribute('hidden')).to.equal('');
			});

			it('should hide the placeholder when grade is set', function() {
				component.grade = '';
				var text = component.$$('.user-tile-school:not(.text-placeholder)');
				var placeholder = component.$$('.user-tile-school.text-placeholder');
				expect(text.getAttribute('hidden')).to.be.null;
				expect(placeholder.getAttribute('hidden')).to.equal('');
			});
		});
	});
});
