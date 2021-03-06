/* global describe, beforeEach, afterEach, it, expect, fixture, sinon */

'use strict';

describe('<d2l-user-tile-auto>', function() {
	var component,
		sandbox,
		userUrl = 'https://example.com',
		token = 'some-oauth-token';

	beforeEach(function() {
		component = fixture('basic');
		sandbox = sinon.sandbox.create();
	});

	afterEach(function() {
		sandbox.restore();
	});

	it('is instantiated', function() {
		expect(component).to.exist;
	});

	describe('fetching user data', function() {
		it('should not generate the user request if the URL is empty', function(done) {
			var spy = sandbox.spy(component, '_onUserChange');
			var stub = sandbox.stub(component, 'generateUserRequest');
			component.token = token;
			setTimeout(function() {
				expect(spy.called).to.be.true;
				expect(stub.called).to.be.false;
				done();
			});
		});

		it('should not generate the user request if the token is empty', function(done) {
			var spy = sandbox.spy(component, '_onUserChange');
			var stub = sandbox.stub(component, 'generateUserRequest');
			component.userUrl = userUrl;
			setTimeout(function() {
				expect(spy.called).to.be.true;
				expect(stub.called).to.be.false;
				done();
			});
		});

		it('should generate the user request when both token and URL are set', function(done) {
			var spy = sandbox.spy(component, '_onUserChange');
			var stub = sandbox.stub(component, 'generateUserRequest');
			component.token = token;
			component.userUrl = userUrl;
			setTimeout(function() {
				expect(spy.called).to.be.true;
				expect(stub.calledWith(userUrl, token, sinon.match({ background: true }))).to.be.true;
				done();
			});
		});

		it('sets the properties on the internal <d2l-user-tile> appropriately', function(done) {
			var innerTile = component.$$('d2l-user-tile');
			sandbox.stub(innerTile, '_onImageLoadFailure', function() {});
			sandbox.stub(component, 'generateUserRequest', function() {
				component._name = 'name';
				component._iconUrl = 'iconUrl';
				component._backgroundUrl = 'backgroundUrl';
				component._backgroundColor = 'backgroundColor';
			});

			component.token = token;
			component.userUrl = userUrl;
			setTimeout(function() {
				expect(innerTile.name).to.equal('name');
				expect(innerTile.icon).to.equal('iconUrl');
				expect(innerTile.background).to.equal('backgroundUrl');
				expect(innerTile.backgroundColor).to.equal('backgroundColor');
				done();
			});
		});
	});

	describe('content placeholders', function(done) {
		it('should set the placeholder property on the internal <d2l-user-tile>', function() {
			component = fixture('with-placeholders');
			var internalTile = component.$$('d2l-user-tile');
			setTimeout(function() {
				expect(internalTile.placeholders).to.be.true;
				done();
			}, 200);
		});
	});
});
