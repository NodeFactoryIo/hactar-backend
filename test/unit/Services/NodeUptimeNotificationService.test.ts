import {createSandbox, SinonSandbox, SinonStub} from "sinon";
import {NodeUptimeNotificationService} from "../../../src/Services/NodeUptimeNotificationService";
import {EmailService} from "../../../src/Services/EmailService";
import {UserService} from "../../../src/Services/UserService";
import {NodeService} from "../../../src/Services/NodeService";
import {NodeStatusService} from "../../../src/Services/NodeStatusService";
import sinon from "sinon";
import {NodeUptime} from "../../../src/Models/NodeUptime";
import {User} from "../../../src/Models/User";
import config from "../../../src/Config/Config";
import {Node} from "../../../src/Models/Node";
import * as chai from "chai";
// eslint-disable-next-line @typescript-eslint/no-require-imports
import sinonChai = require('sinon-chai');
import {NodeStatus} from "../../../src/Models/NodeStatus";

chai.should();
chai.use(sinonChai);

describe("NodeUptimeNotificationService", function () {

    let sandbox: SinonSandbox;

    let emailService: EmailService;
    let sendEmailStub: SinonStub<any>;

    let userService: UserService;
    let getUserByPkStub: SinonStub<any>;

    let nodeService: NodeService;
    let getNodeByPkStub: SinonStub<any>;

    let nodeStatusService: NodeStatusService;
    let updateNodeStatusStub: SinonStub<any>;
    let createNodeStatusStub: SinonStub<any>;
    let getNodeStatusByNodeIdStub: SinonStub<any>;

    // prepared test data
    const testNodeId = 1;
    const nodeUptimeWorking = {nodeId: testNodeId, isWorking: true} as NodeUptime;
    const nodeUptimeNotWorking = {nodeId: testNodeId, isWorking: false} as NodeUptime;
    // eslint-disable-next-line @typescript-eslint/camelcase
    const testUser = {email: "user@email.com", id: 1, hash_password: "ps"} as User;
    const testNode = {id: 1, userId: 1, address: "t0101", url: "mynodes.com/1", notifications: true} as Node;

    let nodeUptimeNotificationService: NodeUptimeNotificationService;

    beforeEach(function () {
        sandbox = createSandbox();

        emailService = new EmailService();
        sendEmailStub = sinon.stub(emailService, "sendEmailNotification");

        userService = new UserService();
        getUserByPkStub = sinon.stub(userService, "getUserByPk");
        getUserByPkStub.returns(testUser);

        nodeService = new NodeService();
        getNodeByPkStub = sinon.stub(nodeService, "getNodeByPk");
        getNodeByPkStub.returns(testNode);

        nodeStatusService = new NodeStatusService();
        updateNodeStatusStub = sinon.stub(nodeStatusService, "updateNodeStatus");
        createNodeStatusStub = sinon.stub(nodeStatusService, "storeNodeStatus");
        getNodeStatusByNodeIdStub = sinon.stub(nodeStatusService, "getNodeStatusByNodeId");

        nodeUptimeNotificationService = new NodeUptimeNotificationService(
            emailService,
            userService,
            nodeService,
            nodeStatusService
        )
    });

    afterEach(function () {
        sandbox.restore();
        sendEmailStub.restore();
        getUserByPkStub.restore();
        getNodeByPkStub.restore();
        updateNodeStatusStub.restore();
        createNodeStatusStub.restore();
        getNodeStatusByNodeIdStub.restore();
    });

    // NODE_STATUS: null, LATEST NODE_UPTIME: isWorking = true
    it('should create new node status on node_status: null and node_uptime.isWorking: true', async () => {
        getNodeStatusByNodeIdStub.returns(null);

        await nodeUptimeNotificationService.processNodeUptime(nodeUptimeWorking)

        getNodeStatusByNodeIdStub.should.been.calledOnceWith(testNode.id);
        sendEmailStub.should.not.been.called;
        createNodeStatusStub.should.been.calledOnceWith(testNode.id, true, true);
    });

    // NODE_STATUS: null, LATEST NODE_UPTIME: isWorking = false
    // eslint-disable-next-line max-len
    it('should create new node status and send mail notification on node_status: null and node_uptime.isWorking: false', async () => {
        getNodeStatusByNodeIdStub.returns(null);

        await nodeUptimeNotificationService.processNodeUptime(nodeUptimeNotWorking);

        getNodeStatusByNodeIdStub.should.been.calledOnceWith(testNode.id);
        sendEmailStub.should.been.calledOnceWith(
            testUser, sinon.match.any, config.sendinblue.nodeUptimeNotifEmailTemplateId
        );
        createNodeStatusStub.should.been.calledOnceWith(testNode.id, false, true);
    });

    // NODE_STATUS: isUp = true, LATEST NODE_UPTIME: isWorking = true
    it('should call no actions on node_status.isUp: true and node_uptime.isWorking: true', async () => {
        getNodeStatusByNodeIdStub.returns({isUp: true, isReported: true} as NodeStatus);

        await nodeUptimeNotificationService.processNodeUptime(nodeUptimeWorking);

        getNodeStatusByNodeIdStub.should.been.calledOnceWith(testNode.id);
        sendEmailStub.should.not.been.called;
        updateNodeStatusStub.should.not.been.called;
    });

    // NODE_STATUS: isUp = true, LATEST NODE_UPTIME: isWorking = false
    // eslint-disable-next-line max-len
    it('should update node status and send mail notification on node_status.isUp: true and node_uptime.isWorking: false', async () => {
        getNodeStatusByNodeIdStub.returns({isUp: true, isReported: true} as NodeStatus);

        await nodeUptimeNotificationService.processNodeUptime(nodeUptimeNotWorking);

        getNodeStatusByNodeIdStub.should.been.calledOnceWith(testNode.id);
        sendEmailStub.should.been.calledOnceWith(
            testUser, sinon.match.any, config.sendinblue.nodeUptimeNotifEmailTemplateId
        );
        updateNodeStatusStub.should.been.calledOnceWith(testNode.id, false, true);
    });

    // NODE_STATUS: isUp = false && isReported = true, LATEST NODE_UPTIME: isWorking = true
    // eslint-disable-next-line max-len
    it('should update node status on node_status.isUp: false, node_status.isReported: true and node_uptime.isWorking: true', async () => {
        getNodeStatusByNodeIdStub.returns({isUp: false, isReported: true} as NodeStatus);

        await nodeUptimeNotificationService.processNodeUptime(nodeUptimeWorking);

        getNodeStatusByNodeIdStub.should.been.calledOnceWith(testNode.id);
        sendEmailStub.should.not.been.called;
        updateNodeStatusStub.should.been.calledOnceWith(testNode.id, true, true);
    });

    // NODE_STATUS: isUp = false && isReported = true, LATEST NODE_UPTIME: isWorking = false
    // eslint-disable-next-line max-len
    it('should call no actions on node_status.isUp: false, node_status.isReported: true and node_uptime.isWorking: false', async () => {
        getNodeStatusByNodeIdStub.returns({isUp: false, isReported: true} as NodeStatus);

        await nodeUptimeNotificationService.processNodeUptime(nodeUptimeNotWorking);

        getNodeStatusByNodeIdStub.should.been.calledOnceWith(testNode.id);
        sendEmailStub.should.not.been.called;
        updateNodeStatusStub.should.not.been.called;
    });

    // NODE_STATUS: isUp = false && isReported = false, LATEST NODE_UPTIME: isWorking = true
    // eslint-disable-next-line max-len
    it('should update node status on node_status.isUp: false, node_status.isReported: false and node_uptime.isWorking: true', async () => {
        getNodeStatusByNodeIdStub.returns({isUp: false, isReported: false} as NodeStatus);

        await nodeUptimeNotificationService.processNodeUptime(nodeUptimeWorking);

        getNodeStatusByNodeIdStub.should.been.calledOnceWith(testNode.id);
        sendEmailStub.should.not.been.called;
        updateNodeStatusStub.should.been.calledOnceWith(testNode.id, true, true);
    });

    // NODE_STATUS: isUp = false && isReported = false, LATEST NODE_UPTIME: isWorking = false
    // eslint-disable-next-line max-len
    it('should update node status and send mail notification on node_status.isUp: false, node_status.isReported: false and node_uptime.isWorking: false', async () => {
        getNodeStatusByNodeIdStub.returns({isUp: false, isReported: false} as NodeStatus);

        await nodeUptimeNotificationService.processNodeUptime(nodeUptimeNotWorking);

        getNodeStatusByNodeIdStub.should.been.calledOnceWith(testNode.id);
        sendEmailStub.should.been.calledOnceWith(
            testUser, sinon.match.any, config.sendinblue.nodeUptimeNotifEmailTemplateId
        );
        updateNodeStatusStub.should.been.calledOnceWith(testNode.id, false, true);
    });
});