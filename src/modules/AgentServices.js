/**
 * Abstraction of Agents' data, one agent is one service.
 * @class Services
 * @param {Array} services
 */
class Services {
	constructor(services = []) {
		this.services = services;
	}

	setServices(services = []) {
		if (Array.isArray(services)) {
			this.services = services;
		}
		return this;
	}

	addService(service) {
		if (service) {
			this.services.push(service);
		}
		return this;
	}

	getServiceById(serviceId) {
		if (serviceId) {
			return this.services.find(item => {
				return item.service_id === serviceId
			});
		} else {
			return;
		}
	}

	addResource(resource, serviceIndex) {
		if (resource && typeof serviceIndex === 'number') {
			this.services[serviceIndex].resources.push(resource);
		}
		return this;
	}

	removeResource(resource, serviceIndex) {
		if (resource && typeof serviceIndex === 'number') {
			let resources = this.services[serviceIndex].resources;
			this.services[serviceIndex].resources = resources.filter(item => item !== resource);
		}
		return this;
	}
}

export default Services;