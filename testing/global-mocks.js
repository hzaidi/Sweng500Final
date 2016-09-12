var siteConfig = window.siteConfig = {
	idm: {
		enabled: 'true',
		identityGatewayBaseUri: 'https://idgatewayawsstage.flqa.net/',
    	clientId: 'mocked',
    	productId: 'mocked',
    	baseUri: 'http://localhost.fldev.net:3000/access'
	}
}

beforeEach(module('aesop'));
