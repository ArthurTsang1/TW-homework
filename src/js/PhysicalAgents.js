/*
 * Subclass of Services, this class is more about view and DOM operations.
 * @class PhysicalAgents
 * @param {Array} services
 * @param {String} containerSelector - the physical agents container's selector
 */

import Services from '../modules/AgentServices';

class PhysicalAgents extends Services {
	constructor(services = [], containerSelector) {
		super(services);
		this.container = document.querySelector(containerSelector);
	}

	// init this model and render HTML to page
	initList() {
		const context = this;
		let htmlFragment = document.createDocumentFragment();
		context.services.forEach((service, index) => {
			let li = document.createElement('li');
			li.className = 'clearfix details__detail' + ' ' + ['details__detail_idle', 'details__detail_building'][service.status];
			li.innerHTML = context.renderOneAgent(service);
			li.addEventListener('click', function(e) {
				const target = e.target;
				if (target.className.includes('resource__delete')) {
					context.removeAgentResource(e, index);
				} else if (target.className.includes('detail__resources_add')) {
					context.showAddResource(e, index);
				} else if (target.className.includes('buttons__button_confirm')) {
					context.confirmAddResource(e, index);
				} else if (target.className.includes('buttons__button_cancel')) {
					context.cancelAddResource(e, index);
				}
			}, false);
			htmlFragment.appendChild(li);
		});
		context.container.innerHTML = '';
		context.container.appendChild(htmlFragment);

		return context;
	}

	// renderOneAgent is used in return a physical agent's HTML string
	renderOneAgent(service) {
		const status = service.status;
		const statusName = ['idle', 'building'][status];
		const statusClass = ['details__detail_idle', 'details__detail_building'][status];
    let htmlString = `<div class="pull-left detail__wrapper">
      <div class="detail__row">
        <h3 class="detail__title">${service.service_name}</h3>
        <ul class="detail__configs" title="${statusName} | ${service.address} | ${service.path}">
          <li class="inline-block configs__config">${statusName}</li>
          <li class="inline-block configs__config">${service.address}</li>
          <li class="inline-block configs__config">${service.path}</li>
        </ul>
      </div>
      <div class="clearfix detail__row">
        <span style="font-weight: bold;">+</span>
        <a class="detail__resources_add">Specify Resources</a>
        <ul class="inline-block detail__resources">
          <span>Resources:</span>` +
          (service.resources.map(resource => {
          	return `<li class="inline-block resources__resource">
            	<span>${resource}</span><a class="inline-block resource__delete" data-resource="${resource}"></a>
          	</li>`;
          })).join('') +
        `</ul>
        <a class="pull-right detail__switch" href="#">Deny</a>
        <div class="hidden add-resources__dialog">
          <p class="dialog__cavet">(separate multiple resources name with commas)</p>
          <input class="dialog__input" type="text">
          <div class="dialog__buttons">
            <button class="buttons__button buttons__button_confirm" type="button">Add resources</button>
            <button class="buttons__button buttons__button_cancel" type="button">Close</button>
          </div>
        </div>
      </div>
    </div>
    <span class="pull-left detail__pic"></span>`;
    return htmlString;
	}

	// make a summary of idle/building and render to elements corresponding to selectors
	showSummary({idleSelector, buildingSelector}) {
		document.querySelector(idleSelector).innerText = this.services.filter(service => service.status === 0).length;
		document.querySelector(buildingSelector).innerText = this.services.filter(service => service.status === 1).length;
		return this;
	}

	// show add-resource dialog
	showAddResource(event, serviceIndex) {
		const context = this, target = event.target, addDialog = target.parentNode.children[4];
		const dialogClassName = addDialog.className;
		if(dialogClassName.includes('hidden')) {
			addDialog.className = dialogClassName.split(' ').filter(className => className !== 'hidden').join(' ');
		}
	}

	// confirm add resource to agent
	confirmAddResource(event, serviceIndex) {
		const context = this, target= event.target, dialog = target.parentNode.parentNode, newResourcesStr = dialog.children[1].value;
		if (/^([\w-_]+,\s*\b)*[\w-_]+\s*$/.test(newResourcesStr)) { // check the input format
			const newResources = newResourcesStr.split(/,\s*\b/), oldResources = context.services[serviceIndex].resources;

			// add resource to model
			newResources.forEach(newResource => {
				// filter resource which is not included by exsit resources
				if (!oldResources.includes(newResource)) {
					oldResources.push(newResource);
					const resourcesList = dialog.parentNode.children[2];
					const li = document.createElement('li');
					li.className = 'inline-block resources__resource';
					li.innerHTML = `<span>${newResource}</span><a class="inline-block resource__delete" data-resource="${newResource}"></a>`;
        	resourcesList.appendChild(li);
				}
				dialog.children[1].value = ''; // reset input value
				dialog.className = dialog.className + ' hidden'; // hide the add dialog
			})
		} else {
			alert('Please separate multiple resources name with commas. (e.g. "Ubuntu, mysql")');
		}
	}

	// close nad reset the add-resource dialog
	cancelAddResource(event, serviceIndex) {
		const target= event.target, dialog = target.parentNode.parentNode;
		dialog.children[1].value = ''; // reset input value
		dialog.className = dialog.className + ' hidden'; // hide the add dialog
		return this;
	}

	// remove a resource from agent's resources
	removeAgentResource(event, serviceIndex) {
		const context = this, target = event.target, resource = target.getAttribute('data-resource');
		if (confirm(`Confirm to delete resource ${resource}?`)) {
			context.removeResource(resource, serviceIndex);
			target.parentNode.parentNode.removeChild(target.parentNode);
		}
		return context;
	}
}

export default PhysicalAgents;