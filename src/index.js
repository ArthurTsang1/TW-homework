/**
 * ThoughtWorks homework.
 *
 * This file is the entry point of the project.
 */

import 'normalize.css';
import './css/index.less';
import 'babel-polyfill';

import PhysicalAgents from "./js/PhysicalAgents"; // PhysicalAgents class contains physical agents data and DOM operation methods

// emulate original data from API
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

let physicalAgents = new PhysicalAgents(originalServices, '.content__detailes'); // initialize physical agents data
physicalAgents.initList(); // render HTML and bind event callbacks
physicalAgents.showSummary({idleSelector: '.summary__idle_number', buildingSelector: '.summary__building_number'});