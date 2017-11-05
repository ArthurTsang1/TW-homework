/*
 * Do a unit test for phycical agents module.
 * These tow class would be test: 'Services' and 'PhysicalAgents'
 */

import assert from 'assert';
import Services from '../src/modules/AgentServices'

// prepare test data of services for Services class
let originalServices = [
	{
		service_name: "bjstdmngbgr02.thoughtworks.com",
		service_id: "sdlkfj2ods2",
		status: 0, // 0 represent idle, 1 represent building
		address: "192.168.1.2",
		path: "/var/lib/cruise-agent",
		resources: ["Ubuntu", "firefox3", "core-duo"]
	},	{
		service_name: "bjstdmngbgr03.thoughtworks.com",
		service_id: "sdlkfj2ods3",
		status: 1, // 0 represent idle, 1 represent building
		address: "192.168.1.3",
		path: "/var/lib/cruise-agent",
		resources: [ "Ubuntu", "firefox3", "mysql", "core-duo" ]
	},	{
		service_name: "bjstdmngbgr04.thoughtworks.com",
		service_id: "sdlkfj2ods4",
		status: 1, // 0 represent idle, 1 represent building
		address: "192.168.1.4",
		path: "/var/lib/cruise-agent",
		resources: [ "Ubuntu", "firefox3", "mysql", "core-duo" ]
	},	{
		service_name: "bjstdmngbgr05.thoughtworks.com",
		service_id: "sdlkfj2ods5",
		status: 0, // 0 represent idle, 1 represent building
		address: "192.168.1.5",
		path: "/var/lib/cruise-agent",
		resources: [ "Ubuntu", "firefox3", "core-duo" ]
	},
];

const service1 = new Services([]);
const service2 = new Services(originalServices);

describe('#physical-agents-test.js',function() {
	describe('#Services', function() {
		before(function() {
			console.log('Services class test begin:');
		});

		it('(new Services([])).services.length should be 0.', function() {
			assert.strictEqual(service1.services.length, 0);
		});
		it('(new Services([services])).services.length should equal "services.length".', function() {
			assert.strictEqual(service2.services.length, 4);
		});
		it('setServices(services) should get same size instance.', function() {
			assert.strictEqual(service1.setServices(originalServices).services.length, 4);
		});
		it('addService(service) should make instance size +1', function() {
			assert.strictEqual(service2.addService({
				service_name: "bjstdmngbgr06.thoughtworks.com",
				service_id: "sdlkfj2ods6",
				status: 0,
				address: "192.168.1.6",
				path: "/var/lib/cruise-agent",
				resources: [ "Ubuntu", "firefox3", "core-duo" ]
			}).services.length, 5)
		});
		it('getServiceById(serviceId) should get nothing if the ID is not in it.', function() {
			assert.strictEqual(service1.getServiceById('testId'), undefined)
		});
		it('getServiceById(serviceId) should get a service if the ID is in it.', function() {
			assert.strictEqual(typeof service1.getServiceById('sdlkfj2ods4'), 'object')
		});
		it('addResource(resource, serviceIndex) should increase 1 resource.', function() {
			assert.strictEqual(service1.addResource('docker', 0).services[0].resources.length, 4);
		});
		it('removeResource(resource, serviceIndex) should decrease 1 resource.', function() {
			assert.strictEqual(service1.removeResource('docker', 0).services[0].resources.length, 3);
		});

		after(function() {
			console.log('Services class test end.');
		});
	});
})